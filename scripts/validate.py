"""Check published HTML, local assets, anchors and profile links without dependencies."""
from html.parser import HTMLParser
from pathlib import Path
from urllib.parse import urlsplit, unquote
import re
import xml.etree.ElementTree as ET

ROOT = Path(__file__).resolve().parents[1]
SITE = ROOT / "dist"


class Page(HTMLParser):
    def __init__(self):
        super().__init__(convert_charrefs=True)
        self.ids = set()
        self.references = []
        self.categories = []
        self.filters = set()
        self.h1s = 0
        self.stack = []

    def handle_starttag(self, tag, attrs):
        attrs = dict(attrs)
        if "id" in attrs:
            assert attrs["id"] not in self.ids, f"Duplicate ID: {attrs['id']}"
            self.ids.add(attrs["id"])
        for attr in ("src", "href"):
            if attr in attrs:
                self.references.append(attrs[attr])
        if "data-category" in attrs:
            self.categories.append(attrs["data-category"])
        if "data-filter" in attrs:
            self.filters.add(attrs["data-filter"])
        if tag == "h1":
            self.h1s += 1
        if tag == "img":
            assert "alt" in attrs, "Image without alt text"
        assert not any(a.startswith("on") for a in attrs), "Inline event handler found"
        if tag not in {"area", "base", "br", "col", "embed", "hr", "img", "input", "link", "meta", "param", "source", "track", "wbr"}:
            self.stack.append(tag)

    def handle_endtag(self, tag):
        assert self.stack and self.stack[-1] == tag, f"Unbalanced HTML: closing {tag} after {self.stack[-3:]}"
        self.stack.pop()

    def handle_startendtag(self, tag, attrs):
        self.handle_starttag(tag, attrs)
        if self.stack and self.stack[-1] == tag:
            self.stack.pop()


page = Page()
page.feed((SITE / "index.html").read_text())
assert not page.stack, f"Unclosed tags: {page.stack}"
assert page.h1s == 1, "Expected one primary heading"
assert len(page.categories) == 25, "Expected 25 project stories"
assert {c for value in page.categories for c in value.split()} == page.filters - {"all"}, "Project filters do not match categories"
# Keep public navigation out of known private repositories and internal endpoints.
private_repos = {'kube-night-watch', 'tasks', 'cloud-viz-mapper', 'infrablaze'}
for reference in page.references:
    parsed = urlsplit(reference)
    if parsed.netloc == 'github.com' and parsed.path.startswith('/chitender/'):
        assert parsed.path.split('/')[2] not in private_repos, f"Private source linked publicly: {reference}"
for reference in page.references:
    parsed = urlsplit(reference)
    assert parsed.scheme in {"", "https", "mailto"}, f"Unexpected URL scheme: {reference}"
    if parsed.scheme or parsed.netloc:
        continue
    if parsed.path:
        target = (SITE / unquote(parsed.path)).resolve()
        assert target.is_relative_to(SITE), f"Reference escapes publish directory: {reference}"
        assert target.is_file(), f"Missing asset: {reference}"
        if target.suffix == '.svg' and parsed.fragment:
            symbol_ids = {node.get('id') for node in ET.parse(target).iter()}
            assert parsed.fragment in symbol_ids, f"Missing SVG symbol: {reference}"
    elif parsed.fragment:
        assert parsed.fragment in page.ids, f"Broken anchor: {reference}"

for path in [SITE / "favicon.svg", ROOT / "assets/profile-banner.svg"]:
    ET.parse(path)

readme = (ROOT / "README.md").read_text()
for reference in re.findall(r'(?:href|src)="([^"]+)"|\]\(([^)]+)\)', readme):
    url = next(v for v in reference if v)
    parsed = urlsplit(url)
    if not parsed.scheme and not parsed.netloc and parsed.path:
        assert (ROOT / parsed.path).is_file(), f"Broken README reference: {url}"

styles = (SITE / "styles.css").read_text()
assert ".metric strong,.metric strong span{background:none!important" in styles, "Metrics need a solid-color fallback"
assert "-webkit-text-fill-color:var(--electric)!important" in styles, "Metric text fill must remain visible"

print(f"PASS: HTML nesting, unique IDs, {len(page.categories)} projects, filters, local assets, anchors, SVGs and README references.")

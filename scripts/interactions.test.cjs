// Tests execute the shipped script against a minimal event/DOM fixture built
// from the shipped markup. They verify state behavior, not browser rendering.
const { test } = require('node:test');
const assert = require('node:assert/strict');
const { readFileSync } = require('node:fs');
const { resolve } = require('node:path');
const { runInNewContext } = require('node:vm');
const rootPath = resolve(__dirname, '..');
const html = readFileSync(resolve(rootPath, 'dist/index.html'), 'utf8');
const script = readFileSync(resolve(rootPath, 'dist/app.js'), 'utf8');

function setup({ preferences = {}, dark = false, reduced = false, storageBlocked = false, clipboardFails = false, clipboard = true } = {}) {
  const elements = [];
  for (const match of html.matchAll(/<([a-z][a-z0-9-]*)\b([^>]*)>/gi)) {
    const attrs = Object.fromEntries([...match[2].matchAll(/([a-z][a-z0-9-]*)(?:="([^"]*)")?/gi)].map(m => [m[1], m[2] ?? '']));
    const classes = new Set((attrs.class || '').split(' '));
    const element = {
      attrs, classes, dataset: {}, hidden: 'hidden' in attrs, textContent: '', value: '', listeners: {},
      setAttribute(key, value) { this.attrs[key] = value; },
      addEventListener(type, handler) { this.listeners[type] = handler; },
      classList: { add(c) { classes.add(c); }, remove(c) { classes.delete(c); } },
      click() { return this.disabled ? undefined : this.listeners.click?.(); }
    };
    for (const [key, value] of Object.entries(attrs)) if (key.startsWith('data-')) element.dataset[key.slice(5)] = value;
    elements.push(element);
  }
  const articleText = [...html.matchAll(/<article class="project[^"]*"[^>]*>([\s\S]*?)<\/article>/g)].map(m => m[1].replace(/<[^>]+>/g, ' '));
  elements.filter(e => e.classes.has('project')).forEach((e, i) => { e.textContent = articleText[i]; });
  const queryAll = selector => elements.filter(e => selector.startsWith('#') ? e.attrs.id === selector.slice(1)
    : selector.startsWith('.') ? e.classes.has(selector.slice(1))
    : selector === 'meta[name="theme-color"]' ? e.attrs.name === 'theme-color'
    : selector.startsWith('[data-') ? selector.slice(1, -1) in e.attrs : false);
  const query = selector => { const e = queryAll(selector)[0]; assert.ok(e, `Markup contains ${selector}`); return e; };
  const media = value => ({ matches: value, handler: null, addEventListener(type, handler) { this.handler = handler; }, change(value) { this.matches = value; this.handler?.({ matches: value }); } });
  const scheme = media(dark), motion = media(reduced), documentRoot = { dataset: {} };
  const state = { prints: 0, copied: null, preferences: { ...preferences } };
  const localStorage = {
    getItem(k) { if (storageBlocked) throw Error('blocked'); return state.preferences[k] ?? null; },
    setItem(k, v) { if (storageBlocked) throw Error('blocked'); state.preferences[k] = v; }
  };
  runInNewContext(script, {
    document: { documentElement: documentRoot, querySelector: query, querySelectorAll: queryAll },
    window: { matchMedia: q => q.includes('color-scheme') ? scheme : motion, isSecureContext: true, print: () => state.prints++ },
    localStorage,
    navigator: { clipboard: clipboard ? { writeText: async text => { if (clipboardFails) throw Error('denied'); state.copied = text; } } : undefined }
  });
  return { query, queryAll, root: documentRoot, scheme, motion, state };
}

function revealAll(f) {
  let attempts = 0;
  while (!f.query('#show-more').hidden) {
    assert.ok(attempts++ < 10, 'Pagination reaches an end');
    f.query('#show-more').click();
  }
}

test('catalog starts with six stories and reveals all 25 without duplicates', () => {
  const f = setup();
  assert.equal(f.queryAll('.project').filter(p => !p.hidden).length, 6);
  assert.equal(f.query('#catalog-count').textContent, 'Showing 6 of 25 projects.');
  revealAll(f);
  assert.equal(f.queryAll('.project').filter(p => !p.hidden).length, 25);
});

test('overlapping filters show their full matching catalog and reset pagination', () => {
  const f = setup();
  for (const button of f.queryAll('[data-filter]')) {
    button.click();
    const filter = button.dataset.filter;
    const expected = { all: 25, platform: 10, reliability: 8, opensource: 6, builder: 6, design: 4 }[filter];
    assert.equal(f.queryAll('.project').filter(p => !p.hidden).length, Math.min(expected, 6));
    revealAll(f);
    const shown = f.queryAll('.project').filter(p => !p.hidden);
    assert.equal(shown.length, expected);
    assert.ok(shown.every(p => filter === 'all' || p.dataset.category.split(' ').includes(filter)));
    assert.equal(f.queryAll('[data-filter]').filter(b => b.attrs['aria-pressed'] === 'true').length, 1);
    assert.equal(f.query('#catalog-count').textContent, `Showing ${expected} of ${expected} projects.`);
  }
});

test('search combines with category, handles no results, and resets correctly', () => {
  const f = setup(), input = f.query('#project-search');
  const search = value => { input.value = value; input.listeners.input(); };
  search('  tRiVy  ');
  assert.equal(f.queryAll('.project').filter(p => !p.hidden).length, 1);
  assert.match(f.queryAll('.project').find(p => !p.hidden).textContent, /VulnForge/);
  f.queryAll('[data-filter]').find(b => b.dataset.filter === 'design').click();
  assert.equal(f.queryAll('.project').filter(p => !p.hidden).length, 0);
  assert.equal(f.query('#empty-results').hidden, false);
  assert.equal(f.query('#show-more').hidden, true);
  search('');
  assert.equal(f.queryAll('.project').filter(p => !p.hidden).length, 4);
  f.queryAll('[data-filter]')[0].click();
  search('etcd PostgreSQL');
  assert.equal(f.queryAll('.project').filter(p => !p.hidden).length, 1);
  search('');
  assert.equal(f.queryAll('.project').filter(p => !p.hidden).length, 6);
  assert.equal(f.query('#empty-results').hidden, true);
});

test('every architecture layer updates its accessible explanation', () => {
  const f = setup(), titles = new Set();
  for (const button of f.queryAll('[data-layer]')) {
    button.click();
    titles.add(f.query('#layer-title').textContent);
    assert.ok(f.query('#layer-copy').textContent.length > 50);
    assert.equal(f.queryAll('[data-layer]').filter(b => b.attrs['aria-pressed'] === 'true').length, 1);
    assert.equal(button.attrs['aria-pressed'], 'true');
  }
  assert.equal(titles.size, 4);
});

test('system theme follows changes until an explicit selection is saved', () => {
  const f = setup({ dark: true });
  assert.equal(f.root.dataset.theme, 'dark');
  f.scheme.change(false);
  assert.equal(f.root.dataset.theme, 'light');
  f.query('#theme').click();
  assert.equal(f.state.preferences['ck-theme'], 'dark');
  f.scheme.change(false);
  assert.equal(f.root.dataset.theme, 'dark');
});

test('blocked preference storage does not break any interaction', () => {
  const f = setup({ storageBlocked: true });
  f.query('#theme').click();
  f.query('#motion').click();
  assert.equal(f.root.dataset.theme, 'dark');
  assert.equal(f.root.dataset.motion, 'paused');
  f.queryAll('[data-filter]')[3].click();
  assert.equal(f.queryAll('.project').filter(p => !p.hidden).length, 6);
});

test('reduced-motion preference cannot be overridden and tracks device changes', () => {
  const f = setup({ reduced: true, preferences: { 'ck-motion': 'running' } });
  assert.equal(f.root.dataset.motion, 'paused');
  assert.equal(f.query('#motion').disabled, true);
  f.query('#motion').click();
  assert.equal(f.root.dataset.motion, 'paused');
  f.motion.change(false);
  assert.equal(f.root.dataset.motion, 'running');
  f.query('#motion').click();
  assert.equal(f.state.preferences['ck-motion'], 'paused');
  f.motion.change(true);
  f.motion.change(false);
  assert.equal(f.root.dataset.motion, 'paused');
});

test('copy action reports both success and permission failure', async () => {
  const success = setup();
  await success.query('.copy-email').click();
  assert.equal(success.state.copied, 'chitenderkumar.16@gmail.com');
  assert.equal(success.query('#copy-status').textContent, 'Email copied.');
  const failure = setup({ clipboardFails: true });
  await failure.query('.copy-email').click();
  assert.match(failure.query('#copy-status').textContent, /Select the email/);
  assert.equal(setup({ clipboard: false }).query('.copy-email').hidden, true);
});

test('print action invokes native printing without changing the active filter', () => {
  const f = setup();
  f.queryAll('[data-filter]')[3].click();
  f.query('.print-button').click();
  assert.equal(f.state.prints, 1);
  assert.equal(f.queryAll('.project').filter(p => !p.hidden).length, 6);
  // Print visibility is handled by CSS, leaving the reader's screen state intact.
  assert.match(readFileSync(resolve(rootPath, 'dist/styles.css'), 'utf8'), /\.project,\.project\[hidden\]\{display:flex!important/);
});

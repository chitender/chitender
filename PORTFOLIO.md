# Portfolio website

The GitHub profile is `README.md`. The full interactive portfolio is a dependency-free static site in `dist/`, ready for GitHub Pages. Updating the profile and deploying the website are separate operations.

## Publish on GitHub Pages

1. Merge the portfolio pull request into `main`.
2. In **this repository**, open **Settings → Pages → Build and deployment → Source → GitHub Actions**. The setting on `learn-k8s` does not apply to this repository.
3. Run **Actions → Deploy portfolio → Run workflow** if the initial deployment ran before Pages was enabled.
4. Wait for the deployment job to succeed. Its environment link is the authoritative live URL. With the default GitHub Pages configuration it will be `https://chitender.github.io/chitender/`.
5. Once deployed, add the live URL to the repository About field and the profile's link row.

Pull requests run validation only. Deployment runs on pushes to `main` and manual dispatch on `main`. Only `dist/` is published; source notes and the profile README are excluded.

## Features

- Interactive reference architecture with four selectable layers, traveling packets, resource icons, and selected-layer motion.
- Locally bundled Lucide cloud, compute, container, storage, network, security, workflow and telemetry icons, plus hover effects and progressive scroll reveals. No icon CDN or animation dependency.
- 25 project summaries with searchable engineering stories, overlapping category filters, and progressive disclosure in groups of six.
- Light/dark theme following device preference until explicitly selected.
- Pause/resume animation; device reduced-motion preferences always take priority.
- Native HTML content and case studies remain readable with JavaScript disabled.
- Keyboard focus styles, skip navigation, live interaction announcements, and responsive layouts.
- Print / Save as PDF recruiter brief that includes all projects, even with a filter active.
- Optional clipboard email action with a direct email link always available.
- No analytics, API keys, forms, trackers, application dependencies, or build process.

Google Fonts supplies the two display fonts; local system fonts take over when it is unavailable. The GitHub profile SVG is self-contained and remains legible when animation is unsupported.

## Maintain

| File | Purpose |
| --- | --- |
| `README.md` | GitHub profile content |
| `assets/profile-banner.svg` | Self-contained animated profile header |
| `dist/index.html` | Recruiter-facing content, project stories, career history |
| `dist/styles.css` | Themes, responsive layouts, motion and print styles |
| `dist/app.js` | Architecture explorer, preferences, filtering, print, clipboard |
| `scripts/validate.py` | Static integrity checks |
| `scripts/interactions.test.cjs` | Dependency-free interaction regression tests |

Run locally:

```sh
python3 scripts/validate.py
node --check dist/app.js
node --test scripts/interactions.test.cjs
python3 -m http.server 8000 --directory dist
```

Open `http://localhost:8000` for local viewing. Printing uses the browser's Print / Save as PDF dialog; no separate resume file is generated.

## Content decisions

The original public README remains the baseline for career chronology. The user-supplied September 2026 Claude project handoff adds implementation details, attribution and delivery status. It is largely secondary evidence, not independent production verification. Current GitHub metadata determines which source links are public. Conflicting career histories, unsupported savings, future promotions, unrelated personal data and sensitive incident details are excluded.

- The SRE-to-architect transition is shown at year granularity because the original README overlaps Jul–Sep 2024. Earlier roles retain the published dates, including the Jun–Jul 2019 overlap.
- Aria is historical/deprecated according to the new handoff. Its earlier speed and corpus-size claims are not repeated as achieved outcomes.
- Karpenter is scoped to EKS; Cilium work spans EKS/AKS.
- Egress performance is a single benchmark: (735 − 534) / 534 ≈ 37.6%. Test conditions are incomplete; no repeated or fleet-wide gain is implied.
- The earlier 30% alert-reduction and zero-outage headline claims are removed pending verification. New alert-quality projections are not presented as outcomes.
- TCMS and the tenant-routed OTel SDK are implemented but awaiting rollout/integration; HolmesGPT changes are unmerged; smoke tests are a proposal.
- Hermes, SmartScheduler, the ESO fork and VulnForge were confirmed public through GitHub. KubeNightwatch, TaskOps, Cloud Viz Mapper and InfraBlaze are private; no source links to them are published.
- AI-assisted work is attributed to architecture, specification, implementation review and integration where supported. Team work is not presented as sole authorship.
- The attachment itself, internal identifiers, detailed incidents and confidential paths are not copied into the repository.
- Personal prototypes and architecture work are labeled separately from professional implementations.
- Internal projects have case studies without invented repository or demo links.

Keep website and README claims aligned when updating them. External links are navigation only, not promises about the current deployment status of a personal project.

## Icon attribution

Infrastructure pictograms are bundled from [Lucide](https://github.com/lucide-icons/lucide), with its ISC and applicable Feather MIT notices preserved in `dist/ICON-LICENSE.txt`. `dist/icons.svg` is an external SVG symbol sprite; the icons represent resource categories rather than vendor trademarks. All animation respects reduced motion and the portfolio motion toggle. Scroll reveals are a CSS progressive enhancement; unsupported browsers display the content normally.

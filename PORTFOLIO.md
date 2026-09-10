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

- Interactive, animated reference architecture with four selectable layers.
- Ten project summaries with expandable engineering stories and category filters.
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

The original public README is the baseline for employment history and quantified results. Prior professional context adds the enterprise data-platform story; confirmed public repositories add learn-k8s and MacroCut. Conflicting older career histories, unsupported savings figures, future promotions, personal information unrelated to work, and employer-specific incident details were excluded.

- The SRE-to-architect transition is shown at year granularity because the original README overlaps Jul–Sep 2024. Earlier roles retain the published dates, including the Jun–Jul 2019 overlap.
- Aria uses a historical knowledge corpus; the site does not assert that retrieval data necessarily represents model fine-tuning.
- Karpenter is scoped to EKS; Cilium work spans EKS/AKS.
- Egress performance is a scoped benchmark, not a generalized guarantee.
- Personal prototypes and architecture work are labeled separately from professional implementations.
- Internal projects have case studies without invented repository or demo links.

Keep website and README claims aligned when updating them. External links are navigation only, not promises about the current deployment status of a personal project.

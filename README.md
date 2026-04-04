# pkolawa.github.io

Personal portfolio website for **Piotr Kolawa** — engineering manager and full-stack developer.

## About

A single-page portfolio presenting professional experience, core expertise, open-source contributions, and social links. Built with plain HTML, SCSS, and vanilla JavaScript — no frameworks.

Live versions:
- **GitHub Pages** — served from the `master` branch
- **pkolawa.pl** — served from the `pkolawa_pl` branch

## Tech stack

| Layer | Tool |
|-------|------|
| Markup | Semantic HTML5 (single `index.html`) |
| Styles | SCSS → compiled CSS (`sass --style compressed`) |
| Fonts | Montserrat (Google Fonts) — `pkolawa_pl` only |
| Analytics | Google Analytics 4 (`G-TMX7CPDN92`) |
| Testing | Mocha + Cheerio (HTML structure assertions) |
| SEO | Sitemap auto-updated after tests (`scripts/update-sitemap.js`) |
| CI | Travis CI (Node.js) |

## Project structure

```
├── index.html                 # Main page
├── 403.html                   # Custom 403 error page (pkolawa_pl only)
├── 404.html                   # Custom 404 error page (pkolawa_pl only)
├── assets/
│   ├── css/main.css           # Compiled stylesheet
│   ├── scss/
│   │   ├── main.scss          # Primary styles
│   │   ├── _mixins.scss       # SCSS mixins
│   │   └── _pkolawaWaves.scss # Wave animation styles (pkolawa_pl only)
│   ├── img/                   # WebP images, logos, thumbnails
│   └── vid/                   # Video assets (gitignored)
├── seocontent/                # Additional SEO landing page
├── scripts/
│   └── update-sitemap.js      # Updates sitemap.xml lastmod after tests
├── tests/
│   └── test.js                # Mocha tests verifying HTML structure
├── sitemap.xml                # XML sitemap (pkolawa_pl only)
├── robots.txt                 # Robots directives (pkolawa_pl only)
└── package.json
```

## Page sections

1. **Intro** — hero with animated wave layers (WebP), logo, tagline, and scroll CTA
2. **How I help teams** — three cards: Engineering Manager, Experienced Developer, No-code Consultant
3. **Core expertise** — four cards: JavaScript & Python, Agile & Scrum, Front-end Craft, Cloud Environments
4. **Connect with me** — links to Medium, LinkedIn, GitHub, Stack Overflow
5. **Open-source highlights** — seven project cards (Rocket.Chat, Wavelo scraper, ExcelJS, Foxr, Scrapy, Bootstrap, personal repos)
6. **Footer** — site navigation, social links, back-to-top

## Branch differences: `master` vs `pkolawa_pl`

The `pkolawa_pl` branch is the more advanced, production version of the site. The `master` branch is a simpler, earlier variant used for GitHub Pages.

### Content & copy

| Aspect | `master` | `pkolawa_pl` |
|--------|----------|--------------|
| Title | "let's plot web together" | "Engineering Manager & Full-Stack Developer" |
| Tagline | "Let's plot web together" | "Engineering leadership for product-focused teams" |
| Subtitle | "Let's plot web together" | "Engineering manager and developer building resilient digital products." |
| CTA button | "don't be shy, scroll" | "Scroll to explore" |
| Section names | "Fields of activity", "Forked & created repos" | "How I help teams", "Core expertise", "Connect with me", "Open-source highlights" |
| Field cards | front-end, python, machine learning | Engineering Manager, Experienced Developer, No-code consultant + 4 expertise cards |
| Project descriptions | Casual, informal tone | Professional, concise tone |

### SEO & metadata

| Feature | `master` | `pkolawa_pl` |
|---------|----------|--------------|
| OG URLs | `pkolawa.github.io` | `pkolawa.pl` |
| Canonical URL | none | `https://pkolawa.pl/` |
| Twitter Card meta | none | full set |
| JSON-LD structured data | none | Person, WebSite, ProfilePage schemas |
| `robots` meta tag | none | `index, follow` |
| `robots.txt` | none | present |
| `sitemap.xml` | none | present with auto-update script |

### Analytics & privacy

| Feature | `master` | `pkolawa_pl` |
|---------|----------|--------------|
| Tracking method | Google Tag Manager (GTM) | Google Analytics 4 (gtag.js) |
| Consent Mode v2 | none | implemented (default deny, localStorage-based) |
| Cookie banner | none | present with Accept/Decline buttons |

### Design & functionality

| Feature | `master` | `pkolawa_pl` |
|---------|----------|--------------|
| Wave animation | `wave-*` class names, different image set | `pkolawaWaves-*` class names, custom image set |
| Font | system/default | Montserrat (Google Fonts, preloaded) |
| Image loading | eager (default) | `loading="lazy"` on below-fold images, `preload` for hero images |
| Alt texts | empty or generic | descriptive, accessibility-friendly |
| Headings | `<p>` and `<h2>` used inconsistently | semantic `<h1>`–`<h3>` hierarchy |
| Footer | single copyright line | multi-column layout with navigation, social links, back-to-top |
| Smooth scroll | none | JS-powered smooth scrolling on footer and CTA links |
| Error pages | none | custom `403.html` and `404.html` |
| Connect section | none | 4-card section with external profile links |
| SEO subpage | none | `seocontent/index.html` |

### Tooling & config

| Feature | `master` | `pkolawa_pl` |
|---------|----------|--------------|
| `.gitignore` | minimal (5 entries) | comprehensive (design files, backups, videos, OS files) |
| Travis CI Node.js | 6.10 | 20.5 |
| Build tool | Grunt (`gruntfile.js`) | npm scripts (sass, mocha) |
| `_pkolawaWaves.scss` | not present | separate partial for wave styles |

## Scripts

```bash
# Build CSS from SCSS
npm run build

# Run HTML structure tests (also updates sitemap.xml)
npm test
```

## License

MIT

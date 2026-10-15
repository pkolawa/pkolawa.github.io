# CLAUDE.md

## Project

Single-page personal portfolio for Piotr Kolawa, served as a static site from GitHub Pages. No backend, no build framework, no client-side JS.

## Stack

- HTML5 — everything lives in one `index.html`
- SCSS → CSS via `sass` (Dart Sass), output committed to the repo
- Mocha + Cheerio for HTML structure tests
- Google Tag Manager (`GTM-WLPDWTNQ`) on `master`; `pkolawa_pl` uses GA4 gtag directly (`G-TMX7CPDN92`)
- Travis CI (`.travis.yml`, Node 6.10 — effectively dead, see Gotchas). No GitHub Actions.
- Dependabot opens npm bump PRs regularly; they get merged as-is

## Commands

```
dev:    npx sass --watch ./assets/scss/main.scss ./assets/css/main.css
build:  npm run build      # sass --style compressed
test:   npm test           # mocha tests/test.js (+ posttest on pkolawa_pl, see below)
lint:   —                  # no linter configured
```

## Branches

Two separately maintained copies of the same site — decide deliberately which one a change belongs to.

| | `master` | `pkolawa_pl` |
|---|---|---|
| Deploys to | pkolawa.github.io | pkolawa.pl |
| Analytics | GTM | GA4 gtag |
| SEO head (canonical, robots meta, Twitter Card, JSON-LD Person/WebSite/ProfilePage) | none | yes |
| `sitemap.xml`, `robots.txt`, `403.html`, `404.html` | none | yes |
| `scripts/update-sitemap.js` + `posttest` hook | none | yes |
| Sections | intro, fields, my-projects, lists | adds how-i-help, expertise, connect |
| `npm test` | 1 failing (see Gotchas) | 24 passing |

`README.md` on `master` describes the `pkolawa_pl` layout.

## SEO date refresh (`pkolawa_pl` only)

`scripts/update-sitemap.js` sets today's date in `sitemap.xml` `<lastmod>` and in `"dateModified"` of the ProfilePage JSON-LD in `index.html` (format `YYYY-MM-DDT00:00:00+02:00`, offset hardcoded). It runs automatically as npm `posttest`, i.e. only when all tests pass:

```
git checkout pkolawa_pl && npm test        # or: node scripts/update-sitemap.js (skips tests)
```

Then commit `sitemap.xml` + `index.html`. Bump dates together with real content changes only — refreshing them with no content change gives no SEO benefit. Running this on `master` does nothing: the script, sitemap and JSON-LD don't exist there.

## Structure

```
index.html          Entire page — all content is hardcoded here
assets/scss/        main.scss (523 lines) + _mixins.scss
assets/css/         main.css — BUILD ARTIFACT, committed; rebuild after SCSS edits
assets/img/         WebP images (PNG copies exist but are unreferenced)
tests/test.js       Mocha assertions against index.html structure
```

## Conventions

- **CSS naming:** BEM-ish — `block__element`, `block--modifier` (`section--intro`, `field__overview-name`, `fieldDetails__repo-link`)
- **Indentation:** tabs in `index.html` and `main.scss`
- **SCSS:** `@use 'sass:color'` and `@use 'mixins' as *` at the top; colour variables (`$green`, `$gray`, `$blue`, `$black`) declared after imports
- **External links:** always `target="_blank" rel="noopener noreferrer"`
- **Commit messages:** no prefix, present participle or imperative, usually lowercase — e.g. `adding my projects section`, `Bumping dependencies`

## Gotchas

- **`assets/css/main.css` is generated.** Never edit it directly — change `assets/scss/main.scss` and run `npm run build`. The compiled file is committed, so it can silently drift from the source.
- **`npm test` has side effects on `pkolawa_pl`.** After passing tests, `posttest` rewrites `index.html` and `sitemap.xml`. Expect a dirty tree after every test run there; don't commit the date bump unless content actually changed.
- **`npm test` fails on `master`.** `highlights exactly three fields` (`tests/test.js:63`) counts `.section--fields .field__overview-container`, but "My projects" (`index.html:93`) reuses `section--fields`, so it finds 10, not 3. `pkolawa_pl` avoids this — compare its markup/tests before fixing. Don't change the test without asking the user first.
- **`gruntfile.js` is dead code.** It loads `grunt-contrib-uglify`, `grunt-contrib-watch` and `grunt-sass`, none of which are in `package.json` or installed. Ignore it; use the npm scripts.
- **`assets/js/main.js` is empty.** The site ships zero JavaScript of its own. Adding a script means also adding the `<script>` tag to `index.html`.
- **Tests couple to CSS classes.** `tests/test.js` counts elements by class, so reusing an existing section class for new markup breaks assertions. Nothing runs these tests automatically — run `npm test` before committing.

@TODO.md

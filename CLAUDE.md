# CLAUDE.md

## Project

Single-page personal portfolio for Piotr Kolawa, served as a static site from GitHub Pages. No backend, no build framework, no client-side JS.

## Stack

- HTML5 — everything lives in one `index.html`
- SCSS → CSS via `sass` (Dart Sass), output committed to the repo
- Mocha + Cheerio for HTML structure tests
- Google Tag Manager (`GTM-WLPDWTNQ`)
- Travis CI (`.travis.yml`, Node 6.10 — effectively dead, see Gotchas)

## Commands

```
dev:    npx sass --watch ./assets/scss/main.scss ./assets/css/main.css
build:  npm run build      # sass --style compressed
test:   npm test           # mocha tests/test.js
lint:   —                  # no linter configured
```

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
- **Commit messages:** lowercase, no prefix, present participle or imperative — e.g. `adding my projects section`, `updating dependencies`

## Gotchas

- **`assets/css/main.css` is generated.** Never edit it directly — change `assets/scss/main.scss` and run `npm run build`. The compiled file is committed, so it can silently drift from the source.
- **Two live branches.** `master` (this one, → pkolawa.github.io) and `pkolawa_pl` (→ pkolawa.pl) are separately maintained copies of the same site. Decide deliberately which one a change belongs to. `README.md` currently documents `pkolawa_pl`'s file layout, not this branch's.
- **`gruntfile.js` is dead code.** It loads `grunt-contrib-uglify`, `grunt-contrib-watch` and `grunt-sass`, none of which are in `package.json` or installed. Ignore it; use the npm scripts.
- **`assets/js/main.js` is empty.** The site ships zero JavaScript of its own. Adding a script means also adding the `<script>` tag to `index.html`.
- **Tests couple to CSS classes.** `tests/test.js` counts elements by class, so reusing an existing section class for new markup breaks assertions. Nothing runs these tests automatically — run `npm test` before committing.

@TODO.md

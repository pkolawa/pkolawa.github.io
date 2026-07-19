# TODO

> Wygenerowano przez /recognize — 2026-07-19
> Fokus: jakość kodu, CI/CD, testy, bezpieczeństwo, nowe funkcjonalności, wydajność, dokumentacja, architektura

## Krytyczne

- [ ] Naprawić failujący test `highlights exactly three fields` — nadać sekcji „My projects" ([index.html:93](index.html#L93)) odrębną klasę zamiast współdzielonej `section--fields` i zawęzić selektor w [tests/test.js:57](tests/test.js#L57)
- [ ] Uzupełnić docelowe URL-e albo usunąć linki `href="#"` w 5 kartach projektów ([index.html:100](index.html#L100), [:106](index.html#L106), [:112](index.html#L112), [:118](index.html#L118), [:130](index.html#L130)) — obecnie otwierają pustą kartę przez `target="_blank"`
- [ ] Zastąpić [.travis.yml](.travis.yml) (Node 6.10, EOL) workflowem `.github/workflows/ci.yml` — Node 20, `npm ci` + `npm test` na push i pull request
- [ ] Uruchomić `npm audit fix` — 5 podatności w zależnościach deweloperskich (`undici` high, `tar` moderate)

## Ważne

- [ ] Dodać testy w [tests/test.js](tests/test.js) dla nowej sekcji „My projects": liczba kart (7), obecność `alt` na każdej miniaturze, brak `href="#"` w linkach
- [ ] Usunąć martwy [gruntfile.js](gruntfile.js) — ładuje `grunt-contrib-uglify`, `grunt-contrib-watch` i `grunt-sass`, których nie ma w [package.json](package.json) ani w `node_modules`
- [ ] Usunąć pliki-śmieci: [dev](dev) (zacommitowany output błędu grunta), pusty [deploy.sh](deploy.sh), puste `assets/js/main.js` i `assets/js/test.js`, osierocone `assets/js/main.js.map`, pusty katalog `seocontent/`
- [ ] Wykonać `git rm --cached` na śledzonych `.DS_Store` w katalogu głównym, `assets/` i `assets/img/` — są w [.gitignore](.gitignore), ale nadal w indeksie
- [ ] Zsynchronizować [README.md](README.md) ze stanem gałęzi `master` — sekcje „Tech stack" i „Project structure" opisują `scripts/update-sitemap.js`, `403.html`, `404.html`, `sitemap.xml`, `robots.txt`, `_pkolawaWaves.scss` i GA4, których na `master` nie ma; brak też wzmianki o sekcji „My projects"
- [ ] Przenieść z gałęzi `pkolawa_pl` do [index.html](index.html): `<link rel="canonical">`, meta Twitter Card, JSON-LD (Person / WebSite / ProfilePage), `<meta name="robots">`; dodać `robots.txt` i `sitemap.xml`
- [ ] Poprawić literówki w [index.html](index.html): „loose"→„lose" i „morend" ([:19](index.html#L19), [:29](index.html#L29) — meta OG, indeksowane), „wokring"/„substract" ([:78](index.html#L78)), „frineds"/„tha't" ([:165](index.html#L165))
- [ ] Uzupełnić puste `alt=""` na 7 miniaturach w sekcji „Forked & created repos" ([index.html:146-181](index.html#L146-L181))
- [ ] Dodać do CI krok `npm run build` + `git diff --exit-code assets/css/main.css` — wykryje rozjazd zacommitowanego CSS ze źródłem SCSS
- [ ] Zastąpić `@import url(...)` Google Fonts w [assets/scss/main.scss:4](assets/scss/main.scss#L4) przez `<link rel="preconnect">` + `preload` w `<head>` — obecny wariant blokuje first paint
- [ ] Podjąć decyzję o strategii gałęzi `master` vs `pkolawa_pl` — dwie równolegle utrzymywane kopie tej samej strony rozjeżdżają się z każdym commitem

## Drobne usprawnienia

- [ ] Podpiąć handler scrollujący do `.intro__button` ([index.html:51](index.html#L51)) — przycisk zapowiada „don't be shy, scroll", ale nic nie robi
- [ ] Rozbić [assets/scss/main.scss](assets/scss/main.scss) (523 linie) na partiale tematyczne i usunąć zakomentowany kod
- [ ] Zamienić `<p class="section__title">` na `<h2>` w [index.html](index.html) — czytniki ekranu nie budują struktury dokumentu z akapitów
- [ ] Dodać `loading="lazy"` do miniatur w sekcji „Forked & created repos" ([index.html:146-181](index.html#L146-L181))
- [ ] Usunąć 19 nieużywanych plików PNG z `assets/img/` albo wdrożyć `<picture>` z fallbackiem — HTML odwołuje się wyłącznie do `.webp`
- [ ] Dodać `404.html` — GitHub Pages obsługuje go natywnie

# Fonts

The PDF and image renderers draw from local font files only — nothing is
fetched at build time — so the fonts live in this folder. Both families are
under the SIL Open Font License (OFL 1.1):

- **Merriweather** (serif, headings) — Copyright 2011 The Merriweather Project
  Authors (Eben Sorkin). The static Regular / Bold / Black files here
  were instantiated from the variable font in the
  [google/fonts](https://github.com/google/fonts) repository with
  `fontTools.varLib.instancer` (wght 400 / 700 / 900, wdth 100, opsz 12).
- **Lato** (sans, body) — Copyright 2010–2015 tyPoland (Łukasz Dziedzic),
  static files from the same repository.

The HTML outputs (email, page, print) reference the same families as woff2
webfonts from Google Fonts; see `src/fonts.ts`.

/**
 * The web fonts for the HTML outputs (email, page, print HTML).
 *
 * These are the latin-subset woff2 files served by Google Fonts — the same
 * families as the TTFs in fonts/, which the PDF and image renderers use
 * (they draw from local files only, never the network). Both families are
 * under the SIL Open Font License; see fonts/README.md.
 */
export const webFonts = [
  {
    family: "Merriweather",
    src: "https://fonts.gstatic.com/s/merriweather/v33/u-4e0qyriQwlOrhSvowK_l5UcA6zuSYEqOzpPe3HOZJ5eX1WtLaQwmYiSeqqJ-k.woff2",
    format: "woff2",
    weight: "300 900",
  },
  { family: "Lato", src: "https://fonts.gstatic.com/s/lato/v25/S6uyw4BMUTPHjx4wXg.woff2", format: "woff2", weight: 400 },
  { family: "Lato", src: "https://fonts.gstatic.com/s/lato/v25/S6u9w4BMUTPHh6UVSwiPGQ.woff2", format: "woff2", weight: 700 },
  { family: "Lato", src: "https://fonts.gstatic.com/s/lato/v25/S6u9w4BMUTPHh50XSwiPGQ.woff2", format: "woff2", weight: 900 },
  {
    family: "Lato",
    src: "https://fonts.gstatic.com/s/lato/v25/S6u8w4BMUTPHjxsAXC-q.woff2",
    format: "woff2",
    weight: 400,
    style: "italic",
  },
] as const;

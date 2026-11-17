/**
 * Northstar Academy — the brand, written once.
 *
 * Deep indigo, old gold and warm paper; a dignified serif (Merriweather) for
 * headings and a clean sans (Lato) for everything else. Every root — Email,
 * Page, Document, Canvas — takes this theme, so the whole kit stays on brand.
 */
import { defineTheme } from "@hyper-elements/react";

export const SERIF = "Merriweather, Georgia, 'Times New Roman', serif";
export const SANS = "Lato, 'Helvetica Neue', Helvetica, Arial, sans-serif";

export const northstar = defineTheme({
  colors: {
    background: "#FAF6EC",
    foreground: "#23263B",
    primary: "#1A2140",
    primaryForeground: "#FFFFFF",
    muted: "#6E7286",
    border: "#E3DAC2",
    /** The brand's three notes, as tokens the templates can reach for. */
    indigo: "#1A2140",
    indigoSoft: "#2A3358",
    indigoMist: "#E9EBF3",
    gold: "#B08D2E",
    goldBright: "#C6A23C",
    goldLight: "#E7CE7E",
    goldPale: "#F4E9C8",
    paper: "#FAF6EC",
    paperDeep: "#F1EAD6",
    card: "#FFFFFF",
    inkSoft: "#3A3F58",
  },
  fonts: {
    body: SANS,
    heading: SERIF,
  },
  fontSizes: {
    body: 16,
    small: 13,
    tiny: 11,
  },
  lineHeights: {
    body: 1.6,
    tight: 1.15,
    snug: 1.3,
  },
  elements: {
    Heading: {
      by: {
        level: {
          1: { fontSize: 40, lineHeight: 1.15, letterSpacing: -0.5, mobile: { fontSize: 30 } },
          2: { fontSize: 28, lineHeight: 1.2, letterSpacing: -0.3, mobile: { fontSize: 23 } },
          3: { fontSize: 19, lineHeight: 1.3 },
        },
      },
    },
    Button: {
      borderRadius: 6,
      padding: [14, 28],
      fontWeight: 700,
      letterSpacing: 0.4,
      hover: { backgroundColor: "{colors.indigoSoft}" },
    },
    Divider: {
      borderTop: { width: 1, style: "solid", color: "{colors.border}" },
    },
  },
  styles: {
    /** A white card on the warm paper background. */
    card: {
      backgroundColor: "{colors.card}",
      padding: 32,
      gap: 16,
      borderRadius: 12,
      border: { width: 1, style: "solid", color: "{colors.border}" },
      mobile: { padding: 20 },
    },
    /** A paper panel — a quieter card, for asides and previews. */
    paperPanel: {
      backgroundColor: "{colors.paperDeep}",
      padding: 28,
      gap: 14,
      borderRadius: 10,
      mobile: { padding: 20 },
    },
    /** Small gold capitals above a heading. */
    eyebrow: {
      fontFamily: SANS,
      fontSize: 12,
      fontWeight: 700,
      letterSpacing: 2.4,
      textTransform: "uppercase",
      color: "{colors.gold}",
    },
    /** Small muted capitals above a value (the facts' labels). */
    metaLabel: {
      fontFamily: SANS,
      fontSize: 11,
      fontWeight: 700,
      letterSpacing: 1.6,
      textTransform: "uppercase",
      color: "{colors.muted}",
    },
    /** A pill for one skill gained. */
    chip: {
      backgroundColor: "{colors.indigoMist}",
      borderRadius: 999,
      padding: [7, 14],
      fontSize: 13,
      fontWeight: 700,
      color: "{colors.indigo}",
    },
    /** The gold rule under a certificate heading. */
    goldRule: {
      borderTop: { width: 2, style: "solid", color: "{colors.goldBright}" },
    },
  },
  formats: {
    /** In an email the headings sit a touch smaller — the column is narrower. */
    email: {
      elements: {
        Heading: {
          by: {
            level: {
              1: { fontSize: 32, mobile: { fontSize: 27 } },
              2: { fontSize: 24, mobile: { fontSize: 21 } },
            },
          },
        },
      },
    },
  },
});

/**
 * Northstar Academy — the blocks every template shares.
 *
 * One Wordmark, one set of graduate facts, one skill list, one seal: written
 * here, used by the email, the page, the certificate and the share card, so
 * the kit can't drift apart. Every visual is drawn with Hyper Elements
 * shapes — there are no image assets anywhere in this kit.
 */
import { Circle, Column, Grid, Polygon, Rect, Row, Span, Svg, Text } from "@hyper-elements/react";
import { academy, completion, course, graduate } from "./data";
import { SANS } from "./theme";

/** Points of a four-pointed compass star, centred at (cx, cy). */
function starPoints(cx: number, cy: number, outer: number, inner: number): string {
  const points: string[] = [];
  for (let i = 0; i < 8; i++) {
    const r = i % 2 === 0 ? outer : inner;
    const angle = (Math.PI / 4) * i - Math.PI / 2;
    points.push(`${(cx + r * Math.cos(angle)).toFixed(1)},${(cy + r * Math.sin(angle)).toFixed(1)}`);
  }
  return points.join(" ");
}

/**
 * A four-pointed star over a smaller one turned 45° — shapes only, so it can
 * sit inside any Svg (a seal, a star field, a hero panel).
 */
export function StarShape({
  cx,
  cy,
  outer,
  color = "#C6A23C",
  light = "#E7CE7E",
}: {
  cx: number;
  cy: number;
  outer: number;
  color?: string;
  light?: string;
}) {
  return (
    <>
      <Polygon points={starPoints(cx, cy, outer, outer * 0.22)} style={{ fill: color }} />
      <Polygon points={starPoints(cx, cy, outer * 0.55, outer * 0.14)} style={{ fill: light }} />
    </>
  );
}

/**
 * The North Star itself, in its own Svg box. Used on the page, the
 * certificate and the share card. (Svg isn't allowed in an Email — the
 * email's Wordmark uses the ✦ glyph.)
 */
export function CompassStar({ size = 48, color = "#C6A23C", light = "#E7CE7E" }: { size?: number; color?: string; light?: string }) {
  const c = size / 2;
  return (
    <Svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} title="The North Star, Northstar Academy's mark">
      <StarShape cx={c} cy={c} outer={c} color={color} light={light} />
      <Circle cx={c} cy={c} r={c * 0.09} style={{ fill: "#FFFFFF" }} />
    </Svg>
  );
}

/**
 * The academy's wordmark: star beside the name. `drawn` uses the Svg star
 * (page, document, canvas); the email takes the text star instead. The star
 * and the name never stack on phones — they are one mark.
 */
export function Wordmark({ dark = false, drawn = true, center = false }: { dark?: boolean; drawn?: boolean; center?: boolean }) {
  const color = dark ? "#FFFFFF" : "#1A2140";
  if (!drawn) {
    return (
      <Text
        style={{
          fontFamily: SANS,
          fontSize: 15,
          fontWeight: 900,
          letterSpacing: 2.6,
          textTransform: "uppercase",
          color,
          textAlign: center ? "center" : "left",
        }}
      >
        <Span style={{ color: "#C6A23C" }}>✦</Span> {academy.name}
      </Text>
    );
  }
  return (
    <Row stackOnMobile={false} style={{ gap: 10, alignItems: "center", justifyContent: center ? "center" : "start" }}>
      <Column style={{ width: 26, flex: "none" }}>
        <CompassStar size={26} />
      </Column>
      <Text style={{ fontFamily: SANS, fontSize: 15, fontWeight: 900, letterSpacing: 2.6, textTransform: "uppercase", color }}>{academy.name}</Text>
    </Row>
  );
}

/** One labelled fact: small capitals over the value. */
function Fact({ label, value }: { label: string; value: string }) {
  return (
    <Column style={{ gap: 4 }}>
      <Text style={{ apply: ["metaLabel"] }}>{label}</Text>
      <Text style={{ fontSize: 15, fontWeight: 700, lineHeight: 1.35, color: "#23263B" }}>{value}</Text>
    </Column>
  );
}

/** Graduate, course, date and grade — the facts every output repeats. */
export function GraduateFacts({ columns = 4 }: { columns?: number }) {
  return (
    <Grid columns={columns} style={{ gap: 20 }}>
      <Fact label="Graduate" value={graduate.fullName} />
      <Fact label="Course" value={course.title} />
      <Fact label="Completed" value={completion.dateLong} />
      <Fact label="Grade" value={`${completion.grade} · ${completion.score}/100`} />
    </Grid>
  );
}

/** The skills the course taught, as pills in a grid. */
export function SkillList({ columns = 3 }: { columns?: number }) {
  return (
    <Grid columns={columns} style={{ gap: 10 }}>
      {course.skills.map((skill) => (
        <Column key={skill} style={{ apply: ["chip"], alignItems: "center" }}>
          <Text style={{ fontSize: 13, fontWeight: 700, color: "#1A2140", textAlign: "center" }}>{skill}</Text>
        </Column>
      ))}
    </Grid>
  );
}

/**
 * The academy's seal: concentric gold rings, a ring of twelve dots and the
 * North Star at the centre, all drawn shapes.
 */
export function CertificateSeal({ size = 120 }: { size?: number }) {
  const c = size / 2;
  const dots = Array.from({ length: 12 }, (_, i) => {
    const angle = (Math.PI / 6) * i - Math.PI / 2;
    const r = c - 9;
    return { x: c + r * Math.cos(angle), y: c + r * Math.sin(angle) };
  });
  return (
    <Svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} title="Northstar Academy seal">
      <Circle cx={c} cy={c} r={c - 1} style={{ fill: "#F4E9C8", stroke: "#B08D2E", strokeWidth: 2 }} />
      <Circle cx={c} cy={c} r={c - 14} style={{ fill: "#FAF6EC", stroke: "#C6A23C", strokeWidth: 1 }} />
      {dots.map((dot, i) => (
        <Circle key={i} cx={dot.x} cy={dot.y} r={1.6} style={{ fill: "#B08D2E" }} />
      ))}
      <Polygon points={starPoints(c, c, c * 0.42, c * 0.1)} style={{ fill: "#1A2140" }} />
      <Polygon points={starPoints(c, c, c * 0.24, c * 0.06)} style={{ fill: "#C6A23C" }} />
    </Svg>
  );
}

/**
 * A decorative barcode drawn from the certificate ID: each character sets
 * the next bars' widths, so the same ID always draws the same bars. It is a
 * visual verification mark, not a scannable symbology.
 */
export function Barcode({ code, width = 220, height = 44 }: { code: string; width?: number; height?: number }) {
  // One bar per character, its width from the character code; gaps alternate.
  const bars: Array<{ x: number; w: number }> = [];
  let x = 0;
  const units = [...code].map((ch) => 1 + (ch.charCodeAt(0) % 3));
  const gaps = [...code].map((ch, i) => 1 + ((ch.charCodeAt(0) >> 2) % 2) + (i % 2));
  const totalUnits = units.reduce((a, b) => a + b, 0) + gaps.reduce((a, b) => a + b, 0);
  const scale = width / totalUnits;
  [...code].forEach((_, i) => {
    bars.push({ x, w: units[i] * scale });
    x += (units[i] + gaps[i]) * scale;
  });
  return (
    <Svg width={width} height={height} viewBox={`0 0 ${width} ${height}`} title={`Verification barcode for certificate ${code}`}>
      {bars.map((bar, i) => (
        <Rect key={i} x={bar.x} y={0} width={Math.max(bar.w - 0.5, 0.8)} height={height} style={{ fill: "#1A2140" }} />
      ))}
    </Svg>
  );
}

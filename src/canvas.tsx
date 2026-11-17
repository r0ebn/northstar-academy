/**
 * Northstar Academy — the LinkedIn share card.
 *
 * A 1200 × 627 poster for the graduate to share: "I completed …", the course
 * in large serif, the grade, and the North Star drawn large on the right
 * with a field of small stars. Rendered by renderImage() as a PNG and an SVG.
 * No image assets — the star field is Svg shapes.
 */
import { Canvas, Circle, Column, Heading, Row, Svg, Text } from "@hyper-elements/react";
import { academy, completion, course, graduate } from "./data";
import { StarShape, Wordmark } from "./components";
import { northstar } from "./theme";

/** Small stars scattered around the big one (x, y, radius, opacity). */
const STARFIELD: Array<[number, number, number, number]> = [
  [30, 44, 3, 0.9],
  [88, 18, 2, 0.6],
  [150, 66, 2.5, 0.8],
  [250, 30, 2, 0.55],
  [292, 96, 3, 0.85],
  [18, 150, 2, 0.6],
  [296, 210, 2.5, 0.7],
  [40, 300, 2.5, 0.8],
  [120, 330, 2, 0.55],
  [250, 320, 3, 0.75],
  [296, 268, 2, 0.5],
  [205, 12, 1.8, 0.5],
];

export default function ShareCard() {
  return (
    <Canvas
      theme={northstar}
      width={1200}
      height={627}
      title={`${graduate.fullName} completed ${course.title} — ${academy.name}`}
      lang="en"
      style={{
        backgroundColor: "#1A2140",
        color: "#FFFFFF",
        padding: [48, 64],
        gap: 0,
        justifyContent: "space-between",
      }}
    >
      {/* Top: wordmark and certificate number. */}
      <Row style={{ gap: 24, alignItems: "center" }}>
        <Wordmark dark />
        <Text
          style={{
            fontSize: 13,
            fontWeight: 700,
            letterSpacing: 1.8,
            textTransform: "uppercase",
            color: "#E7CE7E",
            textAlign: "right",
          }}
        >
          Certificate № {completion.certificateId}
        </Text>
      </Row>

      {/* Middle: the news, and the star. */}
      <Row style={{ gap: 48, alignItems: "center" }}>
        <Column style={{ gap: 18 }}>
          <Text style={{ apply: ["eyebrow"], color: "#E7CE7E", fontSize: 15 }}>
            I completed a course at {academy.name}
          </Text>
          <Heading level={1} style={{ fontSize: 58, fontWeight: 700, lineHeight: 1.12, color: "#FFFFFF" }}>
            {course.title}
          </Heading>
          <Text style={{ fontSize: 24, lineHeight: 1.4, color: "#C9CEDF" }}>
            {graduate.fullName} · {completion.grade} · {completion.score}/100
          </Text>
          <Text style={{ fontSize: 17, color: "#8E94AC" }}>
            Completed {completion.dateLong} · {course.totalDuration} of learning
          </Text>
        </Column>
        <Column style={{ width: 320, flex: "none", alignItems: "center" }}>
          <Svg width={320} height={360} viewBox="0 0 320 360" title="The North Star in a field of small stars">
            <Circle cx={160} cy={180} r={156} style={{ fill: "#1A2140", stroke: "#2A3358", strokeWidth: 1 }} />
            <Circle cx={160} cy={180} r={128} style={{ fill: "#1A2140", stroke: "#2A3358", strokeWidth: 1 }} />
            {STARFIELD.map(([cx, cy, r, opacity], i) => (
              <Circle key={i} cx={cx} cy={cy} r={r} style={{ fill: "#E7CE7E", opacity }} />
            ))}
            <StarShape cx={160} cy={180} outer={110} />
            <Circle cx={160} cy={180} r={9} style={{ fill: "#FFFFFF" }} />
          </Svg>
        </Column>
      </Row>

      {/* Bottom: tagline and verification. */}
      <Row style={{ gap: 24, alignItems: "center" }}>
        <Text style={{ fontSize: 15, fontStyle: "italic", color: "#C9CEDF" }}>{academy.tagline}</Text>
        <Text style={{ fontSize: 14, color: "#8E94AC", textAlign: "right" }}>
          Verify: northstar.example/verify/{completion.certificateId}
        </Text>
      </Row>
    </Canvas>
  );
}

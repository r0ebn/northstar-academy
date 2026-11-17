/**
 * Northstar Academy — the congratulations email.
 *
 * Sent the moment a learner finishes a course: the news, the course summary,
 * the module scores as a table, the certificate (ready to view), and where to
 * go next. No Svg here — email clients can't draw one — so the wordmark uses
 * its text star and every visual is type, colour and rules.
 */
import {
  Button,
  Column,
  Divider,
  Email,
  Heading,
  Link,
  LineBreak,
  Menu,
  Section,
  Span,
  Table,
  TableCell,
  TableRow,
  Text,
} from "@hyper-elements/react";
import { academy, completion, course, graduate, nextCourse } from "./data";
import { GraduateFacts, SkillList, Wordmark } from "./components";
import { webFonts } from "./fonts";
import { northstar } from "./theme";

const moduleRow = (title: string, duration: string, score: number) => (
  <TableRow key={title}>
    <TableCell style={{ padding: [9, 0] }}>{title}</TableCell>
    <TableCell style={{ width: 72, textAlign: "right", color: "#6E7286" }}>{duration}</TableCell>
    <TableCell style={{ width: 64, textAlign: "right", fontWeight: 700, color: "#1A2140" }}>{score}/100</TableCell>
  </TableRow>
);

export default function CompletionEmail() {
  return (
    <Email
      theme={northstar}
      width={600}
      title={`You did it, ${graduate.firstName} — ${course.title}`}
      previewText={`${graduate.firstName}, you completed ${course.title} with Distinction. Your certificate is ready.`}
      lang="en"
      fonts={[...webFonts]}
      style={{ gap: 0 }}
    >
      {/* Header band: indigo, wordmark and tagline. */}
      <Section
        tokens={{ colors: { background: "#1A2140", foreground: "#FFFFFF" } }}
        style={{ backgroundColor: "#1A2140", padding: [28, 32], gap: 8, alignItems: "center" }}
      >
        <Wordmark dark drawn={false} center />
        <Text style={{ fontSize: 13, color: "#E7CE7E", textAlign: "center" }}>{academy.tagline}</Text>
      </Section>

      {/* The news. */}
      <Section style={{ padding: [36, 32, 8], gap: 16 }}>
        <Text style={{ apply: ["eyebrow"], textAlign: "center" }}>Course completed · {completion.dateLong}</Text>
        <Heading level={1} style={{ textAlign: "center" }}>
          You did it, {graduate.firstName}.
        </Heading>
        <Text style={{ textAlign: "center", fontSize: 17, lineHeight: 1.6, color: "#3A3F58" }}>
          Six modules, {course.totalDuration} of learning, and a capstone your tutor called{" "}
          <Span style={{ fontStyle: "italic" }}>“a story told with real care.”</Span> You finished{" "}
          <Span style={{ fontWeight: 700 }}>{course.title}</Span> with <Span style={{ fontWeight: 700 }}>Distinction</Span> — and your
          certificate is ready below.
        </Text>
      </Section>

      {/* The facts, then the course summary. */}
      <Section style={{ padding: [24, 32, 8], gap: 24 }}>
        <Column style={{ apply: ["card"] }}>
          <GraduateFacts columns={2} />
        </Column>

        <Column style={{ apply: ["card"] }}>
          <Heading level={2}>About the course</Heading>
          <Text style={{ color: "#3A3F58" }}>{course.description}</Text>
          <Divider />
          <Text style={{ apply: ["metaLabel"] }}>Skills gained</Text>
          <SkillList columns={3} />
        </Column>

        {/* Module scores. */}
        <Column style={{ apply: ["card"] }}>
          <Heading level={2}>How you scored</Heading>
          <Table style={{ cellPadding: [0, 0], rowBorder: { width: 1, style: "solid", color: "#EDE7D3" } }}>
            <TableRow header>
              <TableCell style={{ apply: ["metaLabel"], padding: [0, 0, 8] }}>Module</TableCell>
              <TableCell style={{ apply: ["metaLabel"], padding: [0, 0, 8], textAlign: "right" }}>Time</TableCell>
              <TableCell style={{ apply: ["metaLabel"], padding: [0, 0, 8], textAlign: "right" }}>Score</TableCell>
            </TableRow>
            {course.modules.map((m) => moduleRow(m.title, m.duration, m.score))}
            <TableRow footer>
              <TableCell style={{ padding: [12, 0, 0], fontWeight: 700, color: "#1A2140" }}>Overall · {completion.grade}</TableCell>
              <TableCell style={{ padding: [12, 0, 0], textAlign: "right", color: "#6E7286" }}>{course.totalDuration}</TableCell>
              <TableCell style={{ padding: [12, 0, 0], textAlign: "right", fontWeight: 900, color: "#B08D2E", fontSize: 18 }}>
                {completion.score}/100
              </TableCell>
            </TableRow>
          </Table>
        </Column>

        {/* The certificate. */}
        <Column
          tokens={{ colors: { background: "#1A2140", foreground: "#FFFFFF" } }}
          style={{ backgroundColor: "#1A2140", padding: 32, gap: 16, borderRadius: 12, alignItems: "center" }}
        >
          <Text style={{ apply: ["eyebrow"], color: "#E7CE7E", textAlign: "center" }}>Your certificate is ready</Text>
          <Heading level={2} style={{ color: "#FFFFFF", textAlign: "center" }}>
            Certificate of Completion
          </Heading>
          <Text style={{ color: "#C9CEDF", textAlign: "center" }}>
            Certificate № <Span style={{ fontWeight: 700, color: "#FFFFFF" }}>{completion.certificateId}</Span> — anyone can verify it at{" "}
            <Link href={completion.verifyUrl} style={{ color: "#E7CE7E" }}>
              northstar.example/verify
            </Link>
            .
          </Text>
          <Button href={completion.certificateUrl} style={{ backgroundColor: "#C6A23C", color: "#1A2140" }}>
            View your certificate
          </Button>
        </Column>

        {/* Where next. */}
        <Column style={{ apply: ["paperPanel"] }}>
          <Text style={{ apply: ["eyebrow"] }}>Where next</Text>
          <Heading level={3}>{nextCourse.title}</Heading>
          <Text style={{ color: "#3A3F58" }}>{nextCourse.description}</Text>
          <Text style={{ fontSize: 14, color: "#6E7286" }}>
            Starts {nextCourse.starts}. As a graduate you keep your course materials — and 20% off your next course.{" "}
            <Link href={nextCourse.url}>Take a look →</Link>
          </Text>
        </Column>
      </Section>

      {/* Footer. */}
      <Section style={{ padding: [24, 32, 36], gap: 12, alignItems: "center" }}>
        <Menu
          items={[
            { text: "Courses", href: "https://northstar.example/courses" },
            { text: "Verify a certificate", href: "https://northstar.example/verify" },
            { text: "Contact us", href: `mailto:${academy.contact}` },
          ]}
          style={{ fontSize: 13, color: "#1A2140", justifyContent: "center" }}
        />
        <Text style={{ fontSize: 12, color: "#6E7286", textAlign: "center", lineHeight: 1.6 }}>
          {academy.name} · {academy.location}
          <LineBreak />
          You received this because you completed a course with us. Questions? Write to {academy.contact}.
        </Text>
      </Section>
    </Email>
  );
}

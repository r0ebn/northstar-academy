/**
 * Northstar Academy — the graduate showcase page.
 *
 * A public page celebrating one graduate: the hero with the drawn compass
 * star, the course and its modules, the skills gained, a certificate preview
 * panel, and a nudge to share the achievement. Same data, same theme, same
 * shared blocks as the email — a different root, a wider canvas.
 */
import {
  Button,
  Column,
  Divider,
  Grid,
  Heading,
  Link,
  Page,
  Row,
  Section,
  Span,
  Text,
} from "@hyper-elements/react";
import { academy, completion, course, graduate, nextCourse } from "./data";
import { CertificateSeal, CompassStar, GraduateFacts, SkillList, Wordmark } from "./components";
import { webFonts } from "./fonts";
import { northstar } from "./theme";

const moduleCard = (index: number, title: string, duration: string, score: number) => (
  <Column key={title} style={{ apply: ["card"], padding: 24, gap: 10 }}>
    <Row stackOnMobile={false} style={{ gap: 12, alignItems: "center" }}>
      <Text style={{ fontSize: 13, fontWeight: 900, color: "#B08D2E", flex: "none" }}>{String(index + 1).padStart(2, "0")}</Text>
      <Text style={{ fontSize: 15, color: "#6E7286" }}>{duration}</Text>
      <Text style={{ fontSize: 15, fontWeight: 700, color: "#1A2140", textAlign: "right" }}>{score}/100</Text>
    </Row>
    <Heading level={3} style={{ fontSize: 18 }}>
      {title}
    </Heading>
  </Column>
);

export default function GraduatePage() {
  return (
    <Page
      theme={northstar}
      width={960}
      title={`${graduate.fullName} completed ${course.title} — ${academy.name}`}
      description={`${graduate.fullName} completed ${course.title} at ${academy.name} with ${completion.grade} (${completion.score}/100) on ${completion.dateLong}.`}
      lang="en"
      fonts={[...webFonts]}
      style={{ gap: 0 }}
    >
      {/* Hero: indigo band, star drawn large on the right. */}
      <Section
        tokens={{ colors: { background: "#1A2140", foreground: "#FFFFFF" } }}
        style={{ backgroundColor: "#1A2140", padding: [40, 0, 56], gap: 40 }}
      >
        <Wordmark dark />
        <Row style={{ gap: 48, alignItems: "center" }}>
          <Column style={{ gap: 20 }}>
            <Text style={{ apply: ["eyebrow"], color: "#E7CE7E" }}>
              Graduate showcase · {completion.dateLong}
            </Text>
            <Heading level={1} style={{ color: "#FFFFFF", fontSize: 48, mobile: { fontSize: 34 } }}>
              {graduate.fullName} completed {course.title}
            </Heading>
            <Text style={{ fontSize: 18, lineHeight: 1.6, color: "#C9CEDF" }}>{course.description}</Text>
            <Row style={{ gap: 12, alignItems: "center" }}>
              <Button href={completion.certificateUrl} style={{ backgroundColor: "#C6A23C", color: "#1A2140", flex: "none" }}>
                View the certificate
              </Button>
              <Link href={completion.verifyUrl} style={{ color: "#E7CE7E", fontWeight: 700 }}>
                Verify credential →
              </Link>
            </Row>
          </Column>
          <Column style={{ width: 200, flex: "none", alignItems: "center" }}>
            <CompassStar size={180} />
          </Column>
        </Row>
      </Section>

      {/* The facts. */}
      <Section style={{ padding: [40, 0, 8] }}>
        <Column style={{ apply: ["card"] }}>
          <GraduateFacts columns={4} />
        </Column>
      </Section>

      {/* The modules. */}
      <Section style={{ padding: [32, 0, 8], gap: 24 }}>
        <Column style={{ gap: 8 }}>
          <Text style={{ apply: ["eyebrow"] }}>The course</Text>
          <Heading level={2}>What {graduate.firstName} studied</Heading>
          <Text style={{ fontSize: 17, color: "#3A3F58", maxWidth: 640 }}>
            Six modules, {course.totalDuration} of teaching, and a capstone project — each one marked out of 100.
          </Text>
        </Column>
        <Grid columns={2} style={{ gap: 16 }}>
          {course.modules.map((m, i) => moduleCard(i, m.title, m.duration, m.score))}
        </Grid>
      </Section>

      {/* The skills. */}
      <Section style={{ padding: [32, 0, 8], gap: 24 }}>
        <Column style={{ gap: 8 }}>
          <Text style={{ apply: ["eyebrow"] }}>Skills gained</Text>
          <Heading level={2}>What {graduate.firstName} can do now</Heading>
        </Column>
        <SkillList columns={3} />
      </Section>

      {/* Certificate preview. */}
      <Section style={{ padding: [32, 0, 8] }}>
        <Column style={{ apply: ["paperPanel"], padding: 36 }}>
          <Row style={{ gap: 36, alignItems: "center" }}>
            <Column style={{ width: 132, flex: "none", alignItems: "center" }}>
              <CertificateSeal size={132} />
            </Column>
            <Column style={{ gap: 12 }}>
              <Text style={{ apply: ["eyebrow"] }}>Certificate of Completion</Text>
              <Heading level={2} style={{ fontSize: 26 }}>
                {graduate.fullName} · {course.title}
              </Heading>
              <Text style={{ color: "#3A3F58" }}>
                Awarded {completion.dateLong} with {completion.grade} ({completion.score}/100). Certificate №{" "}
                <Span style={{ fontWeight: 700, color: "#1A2140" }}>{completion.certificateId}</Span> — verifiable by anyone at{" "}
                <Link href={completion.verifyUrl}>northstar.example/verify</Link>.
              </Text>
              <Row style={{ gap: 12 }}>
                <Button href={completion.certificateUrl} style={{ flex: "none" }}>
                  Download the certificate (PDF)
                </Button>
              </Row>
            </Column>
          </Row>
        </Column>
      </Section>

      {/* Share + where next. */}
      <Section style={{ padding: [32, 0, 8] }}>
        <Grid columns={2} style={{ gap: 16 }}>
          <Column style={{ apply: ["card"], padding: 28 }}>
            <Text style={{ apply: ["eyebrow"] }}>Proud of it? Share it</Text>
            <Heading level={3}>Tell the world, {graduate.firstName}</Heading>
            <Text style={{ color: "#3A3F58" }}>
              Your share card is ready — post it to LinkedIn with your certificate link and let your network know what the last six
              modules were for.
            </Text>
            <Link
              href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(graduate.profileUrl)}`}
              style={{ fontWeight: 700 }}
            >
              Share on LinkedIn →
            </Link>
          </Column>
          <Column style={{ apply: ["card"], padding: 28 }}>
            <Text style={{ apply: ["eyebrow"] }}>Where next</Text>
            <Heading level={3}>{nextCourse.title}</Heading>
            <Text style={{ color: "#3A3F58" }}>{nextCourse.description}</Text>
            <Text style={{ fontSize: 14, color: "#6E7286" }}>
              Starts {nextCourse.starts}. <Link href={nextCourse.url}>Take a look →</Link>
            </Text>
          </Column>
        </Grid>
      </Section>

      {/* Footer. */}
      <Section style={{ padding: [40, 0, 48], gap: 8, alignItems: "center" }}>
        <Divider style={{ width: 120 }} />
        <Text style={{ fontSize: 13, color: "#6E7286", textAlign: "center" }}>
          {academy.name} · {academy.tagline} · {academy.location}
        </Text>
        <Text style={{ fontSize: 13, color: "#6E7286", textAlign: "center" }}>
          <Link href={academy.site}>northstar.example</Link> · <Link href={`mailto:${academy.contact}`}>{academy.contact}</Link>
        </Text>
      </Section>
    </Page>
  );
}

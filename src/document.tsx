/**
 * Northstar Academy — the certificate of completion.
 *
 * A formal A4 landscape certificate: double gold frame, the graduate's name
 * in large serif, the course, the date and grade, the registrar's signature
 * line, the academy's seal drawn in Svg, and a barcode generated from the
 * certificate ID as Svg shapes. Renders to print HTML and, via renderPdf(),
 * to a PDF.
 */
import { Column, Divider, Document, Heading, Row, Text } from "@hyper-elements/react";
import { academy, completion, course, graduate } from "./data";
import { Barcode, CertificateSeal, Wordmark } from "./components";
import { webFonts } from "./fonts";
import { northstar } from "./theme";

/** A centred fact: small capitals over the value. */
function CenterFact({ label, value }: { label: string; value: string }) {
  return (
    <Column style={{ gap: 4, alignItems: "center" }}>
      <Text style={{ apply: ["metaLabel"], textAlign: "center" }}>{label}</Text>
      <Text style={{ fontSize: 16, fontWeight: 700, color: "#1A2140", textAlign: "center" }}>{value}</Text>
    </Column>
  );
}

export default function CertificateDocument() {
  return (
    <Document
      theme={northstar}
      size="A4"
      orientation="landscape"
      margin={[36, 48, 36, 48]}
      title={`Certificate of Completion — ${graduate.fullName}, ${course.title}`}
      lang="en"
      fonts={[...webFonts]}
      style={{ backgroundColor: "#FAF6EC" }}
    >
      <Document.Page style={{ gap: 0 }}>
        {/* Double gold frame. */}
        <Column style={{ border: { width: 2, style: "solid", color: "#C6A23C" }, padding: 8, height: 712 }}>
          <Column
            style={{
              border: { width: 1, style: "solid", color: "#C6A23C" },
              padding: [36, 56],
              gap: 0,
              height: 692,
              justifyContent: "space-between",
            }}
          >
            {/* Letterhead: wordmark left, certificate number right. */}
            <Row style={{ gap: 24, alignItems: "center" }}>
              <Wordmark />
              <Text style={{ fontSize: 12, fontWeight: 700, letterSpacing: 1.6, textTransform: "uppercase", color: "#6E7286", textAlign: "right" }}>
                Certificate № {completion.certificateId}
              </Text>
            </Row>

            {/* The award. */}
            <Column style={{ gap: 14, alignItems: "center" }}>
              <Text style={{ apply: ["eyebrow"], textAlign: "center" }}>Certificate of Completion</Text>
              <Text style={{ fontSize: 15, fontStyle: "italic", color: "#6E7286", textAlign: "center" }}>
                This is to certify that
              </Text>
              <Heading level={1} style={{ fontSize: 56, fontWeight: 700, textAlign: "center", lineHeight: 1.1 }}>
                {graduate.fullName}
              </Heading>
              <Text style={{ fontSize: 15, fontStyle: "italic", color: "#6E7286", textAlign: "center" }}>
                has successfully completed the course
              </Text>
              <Heading level={2} style={{ fontSize: 30, fontWeight: 400, textAlign: "center", color: "#1A2140" }}>
                {course.title}
              </Heading>
              <Row style={{ justifyContent: "center" }}>
                <Divider style={{ apply: ["goldRule"], width: 120, padding: [6, 0] }} />
              </Row>
              <Row style={{ gap: 48, justifyContent: "center" }}>
                <CenterFact label="Completed" value={completion.dateLong} />
                <CenterFact label="Grade" value={completion.grade} />
                <CenterFact label="Final score" value={`${completion.score} / 100`} />
                <CenterFact label="Duration" value={course.totalDuration} />
              </Row>
            </Column>

            {/* Signature, verification, seal. */}
            <Row style={{ gap: 32, alignItems: "end" }}>
              <Column style={{ gap: 8, width: 260 }}>
                <Divider style={{ width: 220 }} />
                <Text style={{ fontSize: 14, fontWeight: 700, color: "#1A2140" }}>{academy.registrar}</Text>
                <Text style={{ fontSize: 12, color: "#6E7286" }}>{academy.registrarTitle}</Text>
              </Column>
              <Column style={{ gap: 6, alignItems: "center" }}>
                <Barcode code={completion.certificateId} width={200} height={40} />
                <Text style={{ fontSize: 11, color: "#6E7286", textAlign: "center", letterSpacing: 0.8 }}>
                  Verify at northstar.example/verify/{completion.certificateId}
                </Text>
              </Column>
              <Column style={{ width: 110, flex: "none", alignItems: "end" }}>
                <CertificateSeal size={104} />
              </Column>
            </Row>
          </Column>
        </Column>
      </Document.Page>
    </Document>
  );
}

/**
 * Northstar Academy — the build.
 *
 * Validates all four templates (the email also against real email clients),
 * then renders every output into out/:
 *
 *   out/email.html, out/email.txt        the congratulations email + plain text
 *   out/page.html                        the graduate showcase page
 *   out/certificate.html, out/certificate.pdf   the certificate, print + PDF
 *   out/share-card.png, out/share-card.svg      the LinkedIn share card
 *   out/clients/*.html                   the email as Outlook, Gmail and
 *                                        Apple Mail draw it
 *
 * Validation is a build gate: any error fails the build. Warnings are
 * printed and the build goes on.
 */
import { mkdir, readFile, rm, writeFile } from "node:fs/promises";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import React from "react";
import { formatDiagnostics, render, validate, type Diagnostic } from "@hyper-elements/react";
import { renderPdf } from "@hyper-elements/react/pdf";
import { renderImage } from "@hyper-elements/react/image";
import { emailClients, renderInEmailClients } from "@hyper-elements/email-clients";
import CompletionEmail from "../src/email";
import GraduatePage from "../src/page";
import CertificateDocument from "../src/document";
import ShareCard from "../src/canvas";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const out = join(root, "out");

const errors: string[] = [];
const warnings: string[] = [];
const infos = new Map<string, number>();

function report(name: string, diagnostics: readonly Diagnostic[]) {
  for (const d of diagnostics) {
    const line = `[${name}] ${formatDiagnostics([d]).trim()}`;
    if (d.severity === "error") errors.push(line);
    else if (d.severity === "warning") warnings.push(line);
    else infos.set(d.code, (infos.get(d.code) ?? 0) + 1);
  }
}

function failIfErrors(step: string) {
  if (errors.length > 0) {
    console.error(`\n✗ ${step} failed with ${errors.length} error(s):\n${errors.join("\n")}`);
    process.exit(1);
  }
}

/** The local TTFs the PDF and image renderers draw with (nothing fetched). */
async function localFonts() {
  const files: Array<[string, string, number?, string?]> = [
    ["Merriweather", "Merriweather-Regular.ttf", 400],
    ["Merriweather", "Merriweather-Bold.ttf", 700],
    ["Merriweather", "Merriweather-Black.ttf", 900],
    ["Lato", "Lato-Regular.ttf", 400],
    ["Lato", "Lato-Bold.ttf", 700],
    ["Lato", "Lato-Black.ttf", 900],
    ["Lato", "Lato-Italic.ttf", 400, "italic"],
  ];
  return Promise.all(
    files.map(async ([family, file, weight, style]) => ({
      family,
      src: await readFile(join(root, "fonts", file)),
      weight,
      style: style as "italic" | undefined,
    }))
  );
}

async function main() {
  await rm(out, { recursive: true, force: true });
  await mkdir(join(out, "clients"), { recursive: true });
  const fonts = await localFonts();

  // 1. Validate every template — the build gate.
  console.log("Validating templates…");
  const clientsPlugin = await emailClients();
  report("email", validate(<CompletionEmail />, { plugins: [clientsPlugin] }).diagnostics);
  report("page", validate(<GraduatePage />).diagnostics);
  report("document", validate(<CertificateDocument />).diagnostics);
  report("canvas", validate(<ShareCard />).diagnostics);
  failIfErrors("Validation");

  // 2. Email: HTML + plain-text twin.
  console.log("Rendering email…");
  const email = await render(<CompletionEmail />, { plugins: [clientsPlugin] });
  report("email/render", email.diagnostics);
  await writeFile(join(out, "email.html"), email.html);
  await writeFile(join(out, "email.txt"), email.text);

  // 3. Page.
  console.log("Rendering page…");
  const page = await render(<GraduatePage />);
  report("page/render", page.diagnostics);
  await writeFile(join(out, "page.html"), page.html);

  // 4. Certificate: print HTML + PDF.
  console.log("Rendering certificate…");
  const document = await render(<CertificateDocument />);
  report("document/render", document.diagnostics);
  await writeFile(join(out, "certificate.html"), document.html);
  const pdf = await renderPdf(<CertificateDocument />, { fonts });
  report("certificate/pdf", pdf.diagnostics);
  await writeFile(join(out, "certificate.pdf"), pdf.pdf);

  // 5. Share card: PNG at 2x + SVG.
  console.log("Rendering share card…");
  const png = await renderImage(<ShareCard />, { fonts, scale: 2 });
  report("canvas/png", png.diagnostics);
  await writeFile(join(out, "share-card.png"), png.image);
  const svg = await renderImage(<ShareCard />, { fonts, format: "svg" });
  report("canvas/svg", svg.diagnostics);
  await writeFile(join(out, "share-card.svg"), svg.image);

  // 6. The email as three clients draw it.
  console.log("Rendering email-client previews…");
  const previews = await renderInEmailClients(<CompletionEmail />, {
    emailClients: ["outlook", "gmail", "apple-mail"],
    fonts: "inline",
  });
  report("email/clients", previews.diagnostics);
  for (const preview of previews.previews) {
    await writeFile(join(out, "clients", preview.filename), preview.html);
    console.log(`  wrote out/clients/${preview.filename}`);
  }
  for (const skipped of previews.skipped) {
    warnings.push(`[email/clients] skipped ${skipped.client}: ${skipped.reason}`);
  }

  failIfErrors("Rendering");

  console.log("\n✓ Build complete. Outputs in out/:");
  console.log("  email.html, email.txt, page.html, certificate.html, certificate.pdf,");
  console.log("  share-card.png, share-card.svg, clients/*.html");
  if (warnings.length > 0) {
    console.log(`\n${warnings.length} warning(s):\n${warnings.join("\n")}`);
  } else {
    console.log("\nNo warnings.");
  }
  if (infos.size > 0) {
    const total = [...infos.values()].reduce((a, b) => a + b, 0);
    const summary = [...infos.entries()].map(([code, n]) => `${code} ×${n}`).join(", ");
    console.log(`${total} info note(s) (mostly graceful degradation in classic Outlook): ${summary}`);
  }
}

main().catch((error) => {
  if (error && typeof error === "object" && "diagnostics" in error) {
    console.error(formatDiagnostics((error as { diagnostics: Diagnostic[] }).diagnostics));
  } else {
    console.error(error);
  }
  process.exit(1);
});

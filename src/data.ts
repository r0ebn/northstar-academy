/**
 * Northstar Academy — the single source of truth for the whole kit.
 *
 * One fictional graduate, one fictional course. Every template (email, page,
 * certificate document, share card) reads from here, so changing the graduate
 * or the course means editing this one file and re-running `npm run build`.
 */

export interface Module {
  title: string;
  /** Human-readable length, e.g. "2h 10m". */
  duration: string;
  /** Score for the module, out of 100. */
  score: number;
}

export const academy = {
  name: "Northstar Academy",
  tagline: "Learn by the light of the North Star.",
  founded: 2019,
  location: "Edinburgh · Online, everywhere",
  /** Fictional .example domain, so no real site is ever linked. */
  site: "https://northstar.example",
  verifyBase: "https://northstar.example/verify",
  contact: "hello@northstar.example",
  registrar: "Dr. Eleanor Vance",
  registrarTitle: "Registrar & Head of Learning",
};

export const graduate = {
  firstName: "Maya",
  fullName: "Maya Hartono",
  /** Where the certificate and the share card point back to. */
  profileUrl: "https://northstar.example/graduates/maya-hartono",
};

export const course = {
  title: "The Art of Data Storytelling",
  description:
    "Six modules on finding the story a dataset is trying to tell — and telling it honestly, clearly, and beautifully, to a room that may not speak data at all.",
  level: "Intermediate",
  /** Total taught time across the modules. */
  totalDuration: "17h 55m",
  modules: [
    { title: "Seeing the Story in the Data", duration: "2h 10m", score: 92 },
    { title: "Charts That Tell the Truth", duration: "3h 05m", score: 96 },
    { title: "Narrative Structure for Analysts", duration: "2h 40m", score: 95 },
    { title: "Colour, Type & the Honest Chart", duration: "2h 25m", score: 90 },
    { title: "Presenting to a Room That Isn't Listening", duration: "3h 20m", score: 97 },
    { title: "Capstone: Your Story, Told Well", duration: "4h 15m", score: 94 },
  ] as Module[],
  skills: [
    "Data visualisation",
    "Narrative framing",
    "Chart design",
    "Statistical literacy",
    "Public presentation",
    "Critical thinking",
  ],
};

export const completion = {
  /** ISO date; templates format it for their own audience. */
  dateISO: "2026-11-14",
  dateLong: "14 November 2026",
  grade: "Distinction",
  score: 94,
  certificateId: "NSA-2026-04817",
  get verifyUrl() {
    return `${academy.verifyBase}/${this.certificateId}`;
  },
  certificateUrl: "https://northstar.example/certificates/NSA-2026-04817",
};

export const nextCourse = {
  title: "Advanced Visual Analytics",
  starts: "1 December 2026",
  description:
    "Eight weeks on interactive dashboards, small multiples at scale, and the statistics behind the charts you already draw.",
  url: "https://northstar.example/courses/advanced-visual-analytics",
};

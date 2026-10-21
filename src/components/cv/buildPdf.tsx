import {
  Document,
  Font,
  Link,
  Page,
  StyleSheet,
  Text,
  View,
  pdf,
} from "@react-pdf/renderer";

import {
  PROFILE,
  PROFILE_LINKS,
  SKILLS,
  timeline,
  type TimelineItem,
} from "@/data/profile";
import { projects } from "@/data/projects";

/**
 * The CV and the resume as PDFs, built in the browser from the same data the
 * About and My Works sections render. Loaded only when a button is pressed —
 * the PDF library is not part of the page's own JavaScript.
 *
 * The CV carries everything; the resume is its one-page cut: no lead
 * paragraphs, and only the points marked `resume` in the data.
 *
 * Laid out the way career-service guides ask for: one column, 10pt body,
 * black text with one accent colour, plain section names ("Experience",
 * "Education") that applicant tracking systems look for, and links written
 * out as their address so they still read on paper.
 *
 * Helvetica is one of the PDF standard fonts, so nothing is downloaded or
 * embedded. Hyphenation is switched off: the default splits words mid-line
 * ("inter-nal") and reads badly in a CV.
 */
Font.registerHyphenationCallback((word) => [word]);

const INK = "#111111";
const MUTED = "#5b5b5b";
const RULE = "#d4d4d8";
const ACCENT = "#15803d";

const s = StyleSheet.create({
  page: {
    paddingTop: 40,
    paddingBottom: 40,
    paddingHorizontal: 46,
    fontFamily: "Helvetica",
    fontSize: 10,
    lineHeight: 1.4,
    color: INK,
  },
  header: { flexDirection: "row", justifyContent: "space-between" },
  name: { fontFamily: "Helvetica-Bold", fontSize: 24, lineHeight: 1.1 },
  role: { marginTop: 4, fontSize: 12, color: ACCENT },
  contact: { alignItems: "flex-end", fontSize: 9.5 },
  // underlined so it reads as something to click, in a light grey so the
  // three stacked don't turn into a block of lines
  link: {
    color: INK,
    textDecoration: "underline",
    textDecorationColor: "#a1a1aa",
  },

  section: { marginTop: 16 },
  heading: {
    fontFamily: "Helvetica-Bold",
    fontSize: 9,
    letterSpacing: 1.6,
    textTransform: "uppercase",
    color: MUTED,
    paddingBottom: 3,
    marginBottom: 7,
    borderBottomWidth: 0.6,
    borderBottomColor: RULE,
  },

  // between entries only, so the last one in a section adds nothing to the
  // gap before the next heading
  entryGap: { marginTop: 10 },
  entryHead: { flexDirection: "row", justifyContent: "space-between" },
  entryTitle: { fontFamily: "Helvetica-Bold", fontSize: 11.5 },
  period: { color: MUTED, fontSize: 9.5 },
  org: { marginTop: 1, color: ACCENT },
  lead: { marginTop: 4 },
  point: { flexDirection: "row", marginTop: 2 },
  bullet: { width: 11, color: MUTED },
  tag: { width: 30, fontFamily: "Helvetica-Bold", color: MUTED },
  pointText: { flex: 1 },

  skills: { flexDirection: "row", flexWrap: "wrap" },
  skill: { width: "33.333%", flexDirection: "row", marginTop: 2 },
  project: { flexDirection: "row", marginBottom: 3 },
  projectTitle: { fontFamily: "Helvetica-Bold", flex: 1, paddingRight: 12 },
  projectTech: { width: 230, color: MUTED, textAlign: "right" },
});

const display = (url: string) => url.replace(/^https?:\/\/(www\.)?/, "").replace(/\/$/, "");

export type PdfKind = "cv" | "resume";

function Entry({
  item,
  resume,
  first,
}: {
  item: TimelineItem;
  resume: boolean;
  first: boolean;
}) {
  return (
    <View style={first ? undefined : s.entryGap} wrap={false}>
      <View style={s.entryHead}>
        <Text style={s.entryTitle}>{item.title}</Text>
        <Text style={s.period}>{item.period}</Text>
      </View>
      <Text style={s.org}>{item.org}</Text>
      {!resume && <Text style={s.lead}>{item.lead}</Text>}
      {item.points
        .filter((pt) => !resume || pt.resume)
        .map((pt, i) => (
          <View key={i} style={s.point}>
            {pt.tag ? (
              <Text style={s.tag}>{pt.tag}</Text>
            ) : (
              <Text style={s.bullet}>•</Text>
            )}
            <Text style={s.pointText}>{pt.text}</Text>
          </View>
        ))}
    </View>
  );
}

function ProfileDocument({ kind }: { kind: PdfKind }) {
  const resume = kind === "resume";
  const contact = [
    { href: `mailto:${PROFILE_LINKS.email}`, label: PROFILE_LINKS.email },
    { href: PROFILE_LINKS.linkedin, label: display(PROFILE_LINKS.linkedin) },
    { href: PROFILE_LINKS.github, label: display(PROFILE_LINKS.github) },
  ];
  const sections = [
    { title: "Experience", items: timeline.filter((t) => t.kind === "work") },
    { title: "Education", items: timeline.filter((t) => t.kind === "education") },
  ];

  return (
    <Document
      title={`${PROFILE.name} - ${resume ? "Resume" : "CV"}`}
      author={PROFILE.name}
      subject={`${PROFILE.role}`}
    >
      <Page size="A4" style={s.page}>
        <View style={s.header}>
          <View>
            <Text style={s.name}>{PROFILE.name}</Text>
            <Text style={s.role}>{PROFILE.role}</Text>
          </View>
          <View style={s.contact}>
            {contact.map(({ href, label }) => (
              <Link key={href} src={href} style={s.link}>
                {label}
              </Link>
            ))}
          </View>
        </View>

        <View style={s.section}>
          <Text style={s.heading}>Summary</Text>
          <Text>{PROFILE.summary}</Text>
        </View>

        <View style={s.section}>
          <Text style={s.heading}>Skills</Text>
          <View style={s.skills}>
            {SKILLS.map((skill) => (
              <View key={skill} style={s.skill}>
                <Text style={s.bullet}>•</Text>
                <Text style={s.pointText}>{skill}</Text>
              </View>
            ))}
          </View>
        </View>

        {sections.map(({ title, items }) => (
          <View key={title} style={s.section}>
            {/* never left alone at the foot of a page */}
            <Text style={s.heading} minPresenceAhead={60}>
              {title}
            </Text>
            {items.map((item, i) => (
              <Entry
                key={`${item.period}-${item.org}`}
                item={item}
                resume={resume}
                first={i === 0}
              />
            ))}
          </View>
        ))}

        <View style={s.section} wrap={false}>
          <Text style={s.heading}>Selected Projects</Text>
          {projects.filter((p) => p.cv !== false).map((p) => (
            <View key={p.title} style={s.project}>
              <Text style={s.projectTitle}>{p.title}</Text>
              <Text style={s.projectTech}>{p.tech.join(" · ")}</Text>
            </View>
          ))}
        </View>
      </Page>
    </Document>
  );
}

export async function buildPdfBlob(kind: PdfKind): Promise<Blob> {
  return pdf(<ProfileDocument kind={kind} />).toBlob();
}

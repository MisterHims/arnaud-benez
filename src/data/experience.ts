// src/data/experience.ts
// Language-independent data only: roles, descriptions and highlights live in
// messages/{fr,en}.json under Experience.items.<id>


export type ExperienceType = 'job' | 'collaboration' | 'formation';

export interface Experience {
  /** Key of the translated texts (Experience.items.<id>) */
  id: string;
  type: ExperienceType;
  /** "YYYY-MM" */
  start: string;
  /** "YYYY-MM", or "present" for an ongoing position */
  end?: string;
  company: string;
  /** Main tools and technologies, shown as small tags */
  stack?: readonly string[];
  /**
   * "YYYY-MM" used to place the entry in the timeline instead of its dates,
   * e.g. an occasional, still-ongoing contribution that shouldn't rank with
   * the main ongoing positions
   */
  sortAs?: string;
}

// Displayed sorted (ongoing first, then most recent), see sortTimeline
export const TIMELINE_DATA = [
  { id: 'cloudcastle', type: 'collaboration', start: '2024-09', end: 'present', company: 'CloudCastle', stack: ['Next.js', 'React', 'TypeScript', 'Product Design'] },
  { id: 'heroui', type: 'collaboration', start: '2024-03', end: '2024-10', company: 'HeroUI', stack: ['React', 'TypeScript', 'WCAG'] },
  { id: 'contentsquare', type: 'formation', start: '2024-08', company: 'ContentSquare', stack: ['Contentsquare', 'Heatmaps', 'Session Replay', 'CRO'] },
  { id: 'majitv', type: 'collaboration', start: '2023-06', end: '2023-08', company: 'MajiTV', stack: ['Pixel Art', 'Branding'] },
  { id: 'googleAnalytics', type: 'formation', start: '2023-02', company: 'Google Analytics', stack: ['GA4', 'Analytics', 'Tracking', 'Data'] },
  { id: 'foundry', type: 'collaboration', start: '2022-10', end: 'present', sortAs: '2024-10', company: 'Foundry VTT', stack: ['JavaScript', 'Open Source'] },
  { id: 'leclerc', type: 'job', start: '2018-06', end: 'present', company: 'E.Leclerc', stack: ['Figma', 'Design System', 'React', 'Contentsquare', 'Kameleoon', 'Emailing'] },
  { id: 'freelance', type: 'job', start: '2015-09', end: '2018-06', company: 'Freelance', stack: ['Photoshop', 'Illustrator', 'Webdesign', 'Emailing'] },
  { id: 'delaveine', type: 'job', start: '2012-09', end: '2015-06', company: 'Delaveine', stack: ['Photoshop', 'HTML/CSS', 'Emailing'] },
  { id: 'itecomDev', type: 'formation', start: '2012-10', end: '2013-06', company: 'Itecom Art Design', stack: ['HTML', 'CSS', 'JavaScript', 'Responsive', 'SEO'] },
  { id: 'itecomPm', type: 'formation', start: '2011-10', end: '2012-06', company: 'Itecom Art Design', stack: ['Webdesign', 'UX', 'Wireframing', 'Roadmap'] },
  { id: 'itecomGraphic', type: 'formation', start: '2011-10', company: 'Itecom Art Design', stack: ['Photoshop', 'Illustrator', 'InDesign', 'Print'] },
  { id: 'zigoh', type: 'collaboration', start: '2011-10', company: 'Zigoh', stack: ['Illustrator', 'Branding'] },
] as const satisfies readonly Experience[];

export type ExperienceId = (typeof TIMELINE_DATA)[number]['id'];
export type ExperienceEntry = (typeof TIMELINE_DATA)[number];

/** Latest point in time of an experience ("present" = now), as YYYY-MM. */
const lastActivity = (item: Experience) =>
  item.sortAs ?? (item.end === 'present' ? '9999-99' : item.end ?? item.start);

/** Among ongoing experiences, the main job comes first */
const TYPE_PRIORITY: Record<ExperienceType, number> = { job: 0, collaboration: 1, formation: 2 };

/**
 * Ongoing experiences first (jobs, then collaborations, then trainings),
 * then the most recent; ties: latest start first.
 */
export const sortTimeline = <T extends Experience>(items: readonly T[]): T[] =>
  [...items].sort((a, b) => {
    const aOngoing = a.end === 'present' && !a.sortAs;
    const bOngoing = b.end === 'present' && !b.sortAs;
    if (aOngoing && bOngoing) return TYPE_PRIORITY[a.type] - TYPE_PRIORITY[b.type] || b.start.localeCompare(a.start);
    return lastActivity(b).localeCompare(lastActivity(a)) || b.start.localeCompare(a.start);
  });

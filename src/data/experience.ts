// src/data/experience.ts
// Language-independent data only: roles and descriptions live in
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
}

export const TIMELINE_DATA = [
  { id: 'cloudcastle', type: 'collaboration', start: '2024-09', company: 'CloudCastle' },
  { id: 'heroui', type: 'collaboration', start: '2024-03', company: 'HeroUI' },
  { id: 'contentsquare', type: 'formation', start: '2024-08', company: 'ContentSquare' },
  { id: 'majitv', type: 'collaboration', start: '2023-06', company: 'MajiTV' },
  { id: 'googleAnalytics', type: 'formation', start: '2023-02', company: 'Google Analytics' },
  { id: 'foundry', type: 'collaboration', start: '2022-10', company: 'Foundry VTT' },
  { id: 'leclerc', type: 'job', start: '2018-06', end: 'present', company: 'E.Leclerc' },
  { id: 'freelance', type: 'job', start: '2015-09', end: '2018-06', company: 'Freelance' },
  { id: 'delaveine', type: 'job', start: '2012-09', end: '2015-06', company: 'Delaveine' },
  { id: 'itecomDev', type: 'formation', start: '2012-10', end: '2013-06', company: 'Itecom Art Design' },
  { id: 'itecomPm', type: 'formation', start: '2011-10', end: '2012-06', company: 'Itecom Art Design' },
  { id: 'itecomGraphic', type: 'formation', start: '2011-10', company: 'Itecom Art Design' },
  { id: 'zigoh', type: 'collaboration', start: '2011-10', company: 'Zigoh' },
] as const satisfies readonly Experience[];

export type ExperienceId = (typeof TIMELINE_DATA)[number]['id'];

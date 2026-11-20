export type Endorsement = {
  quote: string
  name: string
  role: string
  org: string
  consent: boolean
}

export const SITE = {
  name: 'Shishir Sankula',
  title: 'Software Engineer (ML, Data & Security)',
  location: 'Sydney, NSW',
  email: 'sankulashishir@gmail.com',
  github: 'https://github.com/Sankula99',
  linkedin: 'https://www.linkedin.com/in/shishirsankula',
  resumeFile: 'Shishir_Sankula_Resume.pdf',
  availability: 'Available now',
  status: 'Seeking internship and graduate roles',
  pitch:
    'Final-year Software Engineering student at UTS. Delivered two startup client MVPs: co-led a team of 5 (React, TypeScript, Supabase) and led frontend for a team of 6 (React Native). Also builds ML and security projects.',
  metaDescription:
    'Final-year SE student at UTS. Delivered two startup MVPs (co-led 5, led frontend for 6). Builds ML and security projects. Sydney.',
  startDate: 'Can start immediately',
  workRights: 'Australian citizen',
  lookingFor:
    'Internship and graduate software, ML, data and cybersecurity roles',
  endorsements: [] as Endorsement[],
  linkedinRecommendations: 'TODO: LinkedIn recommendations URL',
}

/** @deprecated Use SITE.status */
export const STATUS_BADGE = SITE.status

export function isTodoValue(value: string): boolean {
  return value.startsWith('TODO')
}

/** Break text into comment lines of at most `maxLen` characters (excluding `// `). */
export function wrapPitchLines(text: string, maxLen = 66): string[] {
  const words = text.split(/\s+/)
  const lines: string[] = []
  let current = ''

  for (const word of words) {
    const next = current ? `${current} ${word}` : word
    if (next.length > maxLen && current) {
      lines.push(current)
      current = word
    } else {
      current = next
    }
  }
  if (current) lines.push(current)
  return lines
}

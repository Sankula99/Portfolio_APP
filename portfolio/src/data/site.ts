export const SITE = {
  name: 'Shishir Sankula',
  title: 'Software Engineer (ML, Data & Security)',
  location: 'Sydney, NSW',
  email: 'sankulashishir@gmail.com',
  github: 'https://github.com/Sankula99',
  linkedin: 'https://www.linkedin.com/in/shishirsankula',
  resumeFile: 'Shishir_Sankula_Resume.pdf',
  availability: 'Available',
  status: 'Seeking internship and graduate roles',
  pitch:
    'Final-year Software Engineering student at UTS building ML, data and secure full-stack products. Co-led two startup MVP teams. Seeking internship and graduate roles.',
} as const

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

export const SITE = {
  name: 'Shishir Sankula',
  title: 'Software Engineer (ML, Data & Security)',
  location: 'Sydney, NSW',
  email: 'sankulashishir@gmail.com',
  github: 'https://github.com/Sankula99',
  linkedin: 'https://www.linkedin.com/in/shishirsankula',
  resumeFile: 'Shishir_Sankula_Resume.pdf',
  availability: 'Available',
  pitch:
    'Final-year Software Engineering student at UTS building ML, data and secure full-stack products. Co-led two startup MVP teams. Seeking internship and graduate roles.',
} as const

export const STATUS_BADGE = 'Seeking internship and Graduate roles in Cybersecurity and AI domains.'

export function isTodoValue(value: string): boolean {
  return value.startsWith('TODO')
}

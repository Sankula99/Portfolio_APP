export const STATUS_BADGE = 'seeking internship and graduate roles'

export type ExperienceEntry = {
  file: string
  role: string
  company: string
  period: string
  bullets: string[]
}

export type EducationEntry = {
  degree: string
  major: string
  uni: string
  period: string
  wam: number
  highlights: string[]
}

export type ProjectEntry = {
  name: string
  period: string
  bullets: string[]
}

export type SkillGroup = {
  label: string
  percent: number
  tags: string[]
  variant: 'ice' | 'green' | 'slate' | 'amber'
}

export type ProcessEntry = {
  pid: number
  project: string
  stack: string
  state: 'R' | 'S' | 'Z'
}

export type ToolEntry = {
  pid: number
  tool: string
  user: string
  state: 'R' | 'S' | 'Z'
}

export const experienceEntries: ExperienceEntry[] = [
  {
    file: '2025_OPTIK.md',
    role: 'Software Engineer & Co-Leader',
    company: 'OPTIK Consultancy · InnerSystems',
    period: 'Nov 2025 – Feb 2026',
    bullets: [
      'Architected and developed a mobile web application MVP using React, Typescript and Supabase',
      'Co-led a cross-functional team of 5 developers through agile frameworks to meet delivery milestones',
      'Established workflows for code reviews, version control practices and documentation standards',
      'Developed BERT-based NLP classification model in Python for automated document classification',
    ],
  },
  {
    file: '2025_InviteApp.md',
    role: 'Software Engineer & Co-Leader',
    company: 'InviteApp Startup',
    period: 'Mar 2025 – Jul 2025',
    bullets: [
      'Developed a mobile web application MVP using React Native and Typescript and Prisma',
      'Led frontend architecture and component design for scalability and responsiveness',
      'Collaborated with backend developers and designers to connect to a centralised database',
    ],
  },
]

export const educationEntry: EducationEntry = {
  degree: 'Bachelor of Engineering (Honours)',
  major: 'Software Engineering',
  uni: 'University of Technology Sydney (UTS)',
  period: 'Feb 2023 – Dec 2026',
  wam: 79.96,
  highlights: [
    'Machine Learning (HD 96%)',
    'Data Systems (HD 96%)',
    'Cloud Computing & SaaS (HD 93%)',
    'Intro to Data Analytics (HD 85%)',
  ],
}

export const projectEntries: ProjectEntry[] = [
  {
    name: 'Heart Disease Detection',
    period: 'Aug 2025 – Nov 2025',
    bullets: [
      'XGBoost ML model on UCI Heart Disease dataset (Kaggle)',
      'Full data preprocessing pipeline in Python',
      'Feature scaling, encoding, and missing value handling',
    ],
  },
  {
    name: 'Sales Data Warehouse',
    period: 'Apr 2025 – Jun 2025',
    bullets: [
      'PostgreSQL warehouse with Bronze/Silver multi-layer architecture',
      'Custom ETL pipelines in SQL',
      'Data normalisation and schema design for analytics',
    ],
  },
]

export const skillGroups: SkillGroup[] = [
  {
    label: 'Python / ML',
    percent: 96,
    tags: ['BERT', 'XGBoost', 'Scikit-Learn', 'Pandas'],
    variant: 'green',
  },
  {
    label: 'TypeScript / React',
    percent: 90,
    tags: ['React Native', 'Node.js', 'HTML/CSS'],
    variant: 'ice',
  },
  {
    label: 'Data / SQL',
    percent: 96,
    tags: ['PostgreSQL', 'ETL', 'Supabase'],
    variant: 'slate',
  },
  {
    label: 'Cloud & DevOps',
    percent: 75,
    tags: ['AWS', 'Git', 'Figma', 'Power BI'],
    variant: 'amber',
  },
]

export const projectProcesses: ProcessEntry[] = [
  { pid: 2401, project: 'Heart Disease ML', stack: 'XGBoost·Python', state: 'R' },
  { pid: 2402, project: 'Sales Warehouse', stack: 'PostgreSQL·ETL', state: 'R' },
]

export const toolsRunning: ToolEntry[] = [
  { pid: 1001, tool: 'git', user: 'shishir', state: 'R' },
  { pid: 1002, tool: 'figma', user: 'shishir', state: 'S' },
  { pid: 1003, tool: 'aws-cli', user: 'shishir', state: 'S' },
  { pid: 1004, tool: 'trello', user: 'shishir', state: 'Z' },
]


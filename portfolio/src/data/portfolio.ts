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
  gpa: number
  awards: string[]
  highlights: string[]
}

export type ProjectVisual = 'stress-f1-chart' | 'aws-lamp-arch'

export type ProjectEntry = {
  slug: string
  name: string
  role: string
  period: string
  status: 'complete' | 'in-progress'
  summary: string
  problem: string
  approach: string[]
  result: string[]
  limitations?: string[]
  /** Plain-English outcome shown on the collapsed card instead of result[0]. */
  headline?: string
  baselineNote?: string
  statusNote?: string
  visual?: ProjectVisual
  visualSrc?: string
  visualAlt?: string
  visualWidth?: number
  visualHeight?: number
  stack: string[]
  links: { label: string; href: string }[]
  featured: boolean
  skillGroups: string[]
}

export type SkillGroup = {
  label: string
  tags: string[]
  usedIn: string
  variant: 'ice' | 'green' | 'slate' | 'amber'
}

export function isTodoHref(href: string): boolean {
  return href.startsWith('TODO')
}

export function isTodoText(text: string): boolean {
  return text.startsWith('TODO')
}

export const experienceEntries: ExperienceEntry[] = [
  {
    file: '2025_OPTIK.md',
    role: 'Software Engineer & Co-Leader',
    company: 'OPTIK Consultancy (Internship)',
    period: 'Nov 2025 – Feb 2026',
    bullets: [
      'Delivered a startup client’s MVP web app on schedule with React, TypeScript, Supabase and Clerk, designing the PostgreSQL schema and frontend components and gathering requirements directly with the client.',
      'Secured access to user data with Clerk authentication and session management integrated across the React frontend and Supabase backend.',
      'Built a Python BERT NLP classifier for recorded meetings that reached 0.98 recall.',
      'Co-led 5 developers through agile sprints (stand-ups, sprint planning, per-sprint client demos); introduced code review, version control and documentation standards and ran 1-on-1s to unblock teammates.',
    ],
  },
  {
    file: '2025_InviteApp.md',
    role: 'Software Engineer & Frontend Lead',
    company: 'InviteApp Startup (Client Project)',
    period: 'Mar 2025 – Jul 2025',
    bullets: [
      'Delivered a working React Native, TypeScript and Prisma mobile prototype for iOS and Android ahead of the client’s funding round.',
      'Led frontend architecture and component design for a 6-person team, building a responsive UI.',
      'Integrated REST APIs to sync the React Native dashboard with the centralised backend.',
    ],
  },
]

export const educationEntry: EducationEntry = {
  degree: 'Bachelor of Engineering (Honours)',
  major: 'Software Engineering',
  uni: 'University of Technology Sydney (UTS)',
  period: 'Feb 2023 – Dec 2026',
  gpa: 6.04,
  awards: ["Dean's List (2026)"],
  highlights: [
    'Machine Learning',
    'Data Systems',
    'Cloud Computing & SaaS',
    'Introduction to Data Analytics',
    'Real-time Operating Systems',
    'Cybersecurity',
  ],
}

export const projectEntries: ProjectEntry[] = [
  {
    slug: 'rag-document-assistant',
    name: 'RAG Document Assistant',
    role: 'Full-Stack AI Engineer',
    period: 'Jun 2026 – Present',
    status: 'in-progress',
    summary:
      'Local RAG assistant that answers questions over long PDFs with citations from retrieved chunks.',
    problem: "Users can't quickly query long PDFs with trustworthy citations.",
    approach: [
      'React + FastAPI frontend/backend with Weaviate vector DB and Ollama local LLMs.',
      'Ingestion pipeline with semantic chunking, embeddings and vector search.',
      'LLM response generation grounded in retrieved context.',
    ],
    result: [],
    statusNote:
      'Currently exploring prompt engineering, retrieval optimisation and citation quality.',
    visualSrc: 'TODO: screenshot',
    visualAlt: 'TODO: screenshot of the RAG UI with a cited answer',
    stack: ['React', 'FastAPI', 'Weaviate', 'Ollama', 'Python'],
    links: [
      { label: 'GitHub repository', href: 'https://github.com/Sankula99/RAG_Document_Assistant' },
    ],
    featured: true,
    skillGroups: ['Languages', 'AI & Data', 'Web & Cloud'],
  },
  {
    slug: 'fomo-timetable-extension',
    name: 'FOMO: Timetable Friend Matcher',
    role: 'TODO: confirm role',
    period: 'TODO: confirm period',
    status: 'complete',
    summary:
      'Chromium extension that shows UTS students which friends share their classes and when the group is free, built from the Allocate+ calendar feed. Working prototype.',
    problem:
      'Finding which friends share your lectures, tutorials and studios, and when the group is free, means comparing timetables by hand.',
    approach: [
      "Imports the student's UTS Allocate+ calendar feed (ICS), parses the scheduled classes and upserts them into Supabase Postgres, keyed on user, subject, offering, activity type, activity number and start time.",
      'Matches timetables on subject number, offering code, activity type and activity number to highlight shared lectures, tutorials and studios; a content script injects friend indicators into the MyTimetableCloud timetable view.',
      "Free-time engine merges each person's busy intervals with timezone and daylight-saving handling (Australia/Sydney) and ranks slots by how many people are free.",
      'Email one-time-password sign-in through Clerk, shared across the popup, the dashboard and a Manifest V3 background service worker; Supabase row-level security and column grants control who can read what.',
      'Plain JavaScript with no framework, bundled with esbuild.',
    ],
    result: [
      'Working prototype loaded as an unpacked Chromium extension: a popup for sign-in, profile, friends and notifications, and a dashboard for common classes and free time.',
      'Friendships are stored as reciprocal rows with owner-only access policies, so marking a friend as close does not disclose that choice to them.',
      'Regression tests run with the Node test runner and cover the free-time engine, dashboard data, shared authentication, avatars, people refresh and friendships; the friendship tests run the real migration SQL against PGlite fixtures, including row-level-security restrictions.',
    ],
    limitations: [
      'Sharing and notification switches are local preferences, not server-enforced privacy controls.',
      'Timetable imports upsert but do not remove classes that later disappear from the calendar.',
      'Multi-account verification against the live Supabase policies and Clerk was still required before merging.',
    ],
    stack: [
      'JavaScript',
      'Chrome Extension (Manifest V3)',
      'Supabase (Postgres)',
      'Clerk',
      'esbuild',
      'Node test runner',
    ],
    links: [
      {
        label: 'GitHub repository',
        href: 'https://github.com/Sankula99/2026SIS_Group26',
      },
    ],
    featured: true,
    skillGroups: ['Languages', 'Web & Cloud', 'Security & Networking'],
  },
  {
    slug: 'physiological-stress-detection',
    name: 'Hybrid Deep Learning Fusion for Physiological Stress Detection',
    role: 'ML Engineer',
    period: 'May 2026 – Nov 2026',
    status: 'complete',
    summary:
      'Cross-dataset leave-one-dataset-out evaluation of dual-stream CNN–recurrent fusion on blood-volume pulse and electrodermal activity, with pruned INT8 deployment on a Raspberry Pi Zero 2W.',
    problem:
      'Wearable stress models overfit the dataset they were trained on and degrade under cross-dataset transfer, while edge devices need compressed models that stay accurate and fast.',
    approach: [
      'Leave-one-dataset-out across UBFC-Phys, Wearable, and WESAD (Empatica E4 BVP + EDA); 60/120/200 s windows with 50% overlap; 108 training runs.',
      'Compared CNN-only, CNN+LSTM, CNN+GRU, and CNN+LSTM+GRU dual-stream fusion with a shared classification head.',
      'Pruned (50% sparsity) and INT8-quantised the best model and deployed TensorFlow Lite on a Raspberry Pi Zero 2W.',
    ],
    result: [
      'CNN+LSTM+GRU highest mean macro F1 (F1 averaged across classes) (0.69); WESAD holdout 0.890 ± 0.009 at 60 s.',
      'Held-out dataset dominated performance: mean macro F1 0.66 / 0.47 / 0.77 (UBFC-Phys / Wearable / WESAD).',
      'On-device: 6.80 ms mean latency; macro F1 0.787 after prune+INT8 (from 0.890); stress-class F1 0.836.',
    ],
    headline:
      'Pruned and INT8-quantised model runs in 6.80 ms on a Raspberry Pi Zero 2W; macro F1 (F1 averaged across classes) fell from 0.890 to 0.787, outside my 5% target.',
    limitations: [
      'On-device accuracy target not met: pruning and INT8 quantisation cut macro F1 from 0.890 to 0.787, about an 11.6% drop against a 5% tolerance. Latency was 6.80 ms against a 500 ms budget.',
    ],
    visual: 'stress-f1-chart',
    stack: ['Python', 'TensorFlow', 'TensorFlow Lite', 'NumPy', 'pandas', 'Raspberry Pi'],
    links: [
      { label: 'GitHub repository', href: 'TODO: Stress Detection repo URL' },
      { label: 'Demo', href: 'TODO: Stress Detection demo URL' },
      {
        label: 'Write-up',
        href: '/Hybrid_Deep_Learning_Stress_Detection.pdf',
      },
    ],
    featured: true,
    skillGroups: ['Languages', 'AI & Data'],
  },
  {
    slug: 'network-attack-defence-labs',
    name: 'Network Attack and Defence Labs',
    role: 'Network Security Analyst',
    period: 'Sep – Oct 2026',
    status: 'complete',
    summary:
      'Attack–defence lab covering SYN flood, ARP poisoning, session hijacking and DNS poisoning with matched mitigations.',
    problem: 'Need hands-on mapping of common network attacks to concrete defensive controls.',
    approach: [
      'Executed SYN flooding, ARP cache poisoning, TCP session hijacking and DNS cache poisoning in a virtual lab.',
      'Defended with Snort IDS/IPS rules, iptables policies and Juniper SRX policies, verified against live attack traffic.',
      'Built a CA and issued X.509 certs with OpenSSL; analysed HTTP credential sniffing.',
    ],
    result: [
      'Mapped each attack to a mitigating control and verified defence effectiveness against live traffic.',
    ],
    visualSrc: 'TODO: screenshot',
    visualAlt: 'TODO: screenshot of a Snort alert or lab diagram',
    stack: ['Snort', 'iptables', 'Juniper SRX', 'OpenSSL', 'Wireshark'],
    links: [
      { label: 'GitHub repository', href: 'TODO: Network Labs repo URL' },
      { label: 'Write-up', href: 'TODO: Network Labs write-up URL' },
    ],
    featured: true,
    skillGroups: ['Languages', 'Security & Networking'],
  },
  {
    slug: 'heart-disease-detection',
    name: 'Heart Disease Detection',
    role: 'Data Scientist',
    period: 'Aug – Nov 2025',
    status: 'complete',
    summary: 'XGBoost classifier on the UCI clinical heart disease dataset with a full preprocessing pipeline.',
    problem: 'Need an accurate clinical risk classifier with transparent precision/recall trade-offs.',
    approach: [
      'XGBoost on the UCI clinical dataset.',
      'Full pandas/NumPy preprocessing pipeline (cleaning, encoding, scaling, imputation).',
      'Benchmarked configurations on precision/recall trade-offs.',
    ],
    result: ['Achieved 0.88 F1 on the held-out evaluation set.'],
    headline: 'Achieved 0.88 F1 on the held-out evaluation set.',
    baselineNote: 'TODO: baseline to compare against',
    stack: ['Python', 'XGBoost', 'pandas', 'NumPy', 'Scikit-Learn'],
    links: [
      { label: 'GitHub repository', href: 'https://github.com/Sankula99/Heart-Disease-Detection' },
    ],
    featured: true,
    skillGroups: ['Languages', 'AI & Data'],
  },
  {
    slug: 'aws-lamp-web-app',
    name: 'Scalable AWS LAMP Web Application',
    role: 'System Programmer',
    period: 'Sep – Nov 2024',
    status: 'complete',
    summary:
      'Highly available LAMP stack on AWS with multi-AZ networking, autoscaling and Multi-AZ RDS.',
    problem: 'Need a production-style web architecture with HA/DR across availability zones.',
    approach: [
      'Custom VPC across 2 AZs, Auto Scaling 2 to 8 EC2 instances, load balancer, Multi-AZ RDS, custom AMI.',
      'Security groups allow only HTTP and SSH.',
      'Architecture write-up justifying each service for HA/DR.',
    ],
    result: ['Multi-AZ deployment with autoscaling capacity from 2 to 8 EC2 instances.'],
    visual: 'aws-lamp-arch',
    stack: ['AWS', 'EC2', 'RDS', 'VPC', 'Linux'],
    links: [
      { label: 'GitHub repository', href: 'TODO: AWS LAMP repo URL' },
      { label: 'Write-up', href: 'TODO: AWS LAMP write-up URL' },
    ],
    featured: false,
    skillGroups: ['Languages', 'Web & Cloud'],
  },
  {
    slug: 'video-game-sales-insights',
    name: 'Video Game Sales and Consumer Insights System',
    role: 'Data Analyst',
    period: 'Apr – May 2025',
    status: 'complete',
    summary:
      'Power BI dashboards over a star-schema Azure SQL database with DirectQuery for sales insights.',
    problem: 'Stakeholders needed live sales and consumer insights without brittle extracts.',
    approach: [
      'Power BI dashboards over a star-schema Azure SQL DB via DirectQuery.',
      'Bridge tables for many-to-many relationships; fixed a firewall connection failure by whitelisting the IP.',
      'Wrote architecture, task-flow diagrams and requirements for a 4-person team.',
    ],
    result: ['Live DirectQuery dashboards with resolved Azure SQL connectivity for the team.'],
    visualSrc: 'TODO: screenshot',
    visualAlt: 'TODO: screenshot of the Power BI dashboard',
    stack: ['Power BI', 'Azure SQL', 'DirectQuery'],
    links: [
      { label: 'GitHub repository', href: 'TODO: Video Game Sales repo URL' },
      { label: 'Dashboard', href: 'TODO: Video Game Sales dashboard URL' },
    ],
    featured: false,
    skillGroups: ['Languages', 'AI & Data', 'Web & Cloud'],
  },
  {
    slug: 'cpu-scheduler-simulator',
    name: 'CPU Scheduler & Page Replacement Simulator',
    role: 'System Programmer',
    period: 'Apr – Jun 2026',
    status: 'complete',
    summary:
      'Round Robin scheduler and FIFO page-replacement simulator with IPC via named pipes and semaphores.',
    problem: 'Need a controllable simulator to measure scheduling and paging behaviour.',
    approach: [
      'Round Robin scheduler with configurable quantum (waiting/turnaround times for a 7-process workload).',
      'Two-thread pipeline over a named pipe with semaphores.',
      'FIFO page-replacement simulator.',
    ],
    result: [
      'Measured waiting and turnaround times across a 7-process Round Robin workload.',
    ],
    stack: ['C/C++', 'IPC', 'Semaphores'],
    links: [
      { label: 'GitHub repository', href: 'TODO: CPU Scheduler repo URL' },
      { label: 'Write-up', href: 'TODO: CPU Scheduler write-up URL' },
    ],
    featured: false,
    skillGroups: ['Languages'],
  },
  {
    slug: 'portfolio-site',
    name: 'This portfolio site',
    role: 'Full-Stack Engineer',
    period: '2025 – Present',
    status: 'complete',
    summary:
      'Terminal-themed React 19 + TypeScript + Vite portfolio with a recruiter Overview and Terminal view.',
    problem: 'Need a distinctive portfolio that still converts for recruiters who want a quick skim.',
    approach: [
      'React 19, TypeScript, Vite SPA with Overview as the default view.',
      'Terminal/Linux visual identity with accessible recruiter content and case-study projects.',
    ],
    result: [
      'Production JS bundle about 73 KB gzipped (Vite build).',
      'Minimum text-token contrast 4.68:1 (grey-3 on panel), meeting WCAG AA 4.5:1.',
      'No horizontal overflow from 320px to 1440px in the Overview.',
      'Full keyboard navigation with visible focus styles.',
    ],
    stack: ['React 19', 'TypeScript', 'Vite'],
    links: [
      { label: 'GitHub repository', href: 'TODO: Portfolio site repo URL' },
      { label: 'Live', href: 'TODO: Portfolio site live URL' },
    ],
    featured: false,
    skillGroups: ['Languages', 'Web & Cloud'],
  },
]

export const skillGroups: SkillGroup[] = [
  {
    label: 'Languages',
    tags: ['Python', 'TypeScript', 'Java', 'C/C++', 'SQL', 'HTML/CSS'],
    usedIn:
      'OPTIK BERT classifier, Stress Detection, Heart Disease, CPU Simulator, FOMO',
    variant: 'green',
  },
  {
    label: 'AI & Data',
    tags: [
      'BERT',
      'RAG/LLMs (Ollama)',
      'XGBoost',
      'Scikit-Learn',
      'TensorFlow',
      'pandas',
      'NumPy',
      'Power BI',
    ],
    usedIn: 'OPTIK BERT classifier, Heart Disease, Stress Detection, RAG Assistant',
    variant: 'ice',
  },
  {
    label: 'Security & Networking',
    tags: [
      'Snort',
      'iptables',
      'Juniper SRX',
      'Wireshark',
      'OpenSSL/PKI',
      'John the Ripper',
    ],
    usedIn: 'Network Attack and Defence Labs, FOMO',
    variant: 'slate',
  },
  {
    label: 'Web & Cloud',
    tags: [
      'React',
      'React Native',
      'FastAPI',
      'Prisma',
      'Supabase',
      'PostgreSQL',
      'AWS',
      'Docker',
      'Git/GitHub',
    ],
    usedIn: 'OPTIK MVP, InviteApp, AWS LAMP, this portfolio, FOMO',
    variant: 'amber',
  },
]

export function featuredProjects(): ProjectEntry[] {
  return projectEntries.filter((p) => p.featured)
}

export function inProgressProjects(): ProjectEntry[] {
  return projectEntries.filter((p) => p.status === 'in-progress')
}

export function projectCountForSkill(label: string): number {
  return projectEntries.filter((p) => p.skillGroups.includes(label)).length
}

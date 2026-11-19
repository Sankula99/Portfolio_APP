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
    result: [
      'Currently exploring prompt engineering, retrieval optimisation and citation quality.',
    ],
    stack: ['React', 'FastAPI', 'Weaviate', 'Ollama', 'Python'],
    links: [
      { label: 'Repo', href: 'https://github.com/Sankula99/RAG_Document_Assistant' },
    ],
    featured: true,
    skillGroups: ['Languages', 'AI & Data', 'Web & Cloud'],
  },
  {
    slug: 'physiological-stress-detection',
    name: 'Hybrid Deep Learning Fusion for Physiological Stress Detection',
    role: 'ML Engineer',
    period: 'May 2026 – Nov 2026',
    status: 'complete',
    summary:
      'Cross-dataset LODO evaluation of dual-stream CNN–recurrent fusion on BVP and EDA, with pruned INT8 deployment on a Raspberry Pi Zero 2W.',
    problem:
      'Wearable stress models overfit the dataset they were trained on and degrade under cross-dataset transfer, while edge devices need compressed models that stay accurate and fast.',
    approach: [
      'Leave-one-dataset-out across UBFC-Phys, Wearable, and WESAD (Empatica E4 BVP + EDA); 60/120/200 s windows with 50% overlap; 108 training runs.',
      'Compared CNN-only, CNN+LSTM, CNN+GRU, and CNN+LSTM+GRU dual-stream fusion with a shared classification head.',
      'Pruned (50% sparsity) and INT8-quantised the best model and deployed TensorFlow Lite on a Raspberry Pi Zero 2W.',
    ],
    result: [
      'CNN+LSTM+GRU highest mean macro F1 (0.69); WESAD holdout 0.890 ± 0.009 at 60 s.',
      'Held-out dataset dominated performance: mean macro F1 0.66 / 0.47 / 0.77 (UBFC-Phys / Wearable / WESAD).',
      'On-device: 6.80 ms mean latency; macro F1 0.787 after prune+INT8 (from 0.890); stress-class F1 0.836.',
    ],
    limitations: [
      'RQ2 target not met: pruning and INT8 quantisation reduced on-device macro F1 from 0.890 to 0.787 (about an 11.6% drop, outside the 5% tolerance), although 6.80 ms mean latency was far below the 500 ms budget.',
    ],
    stack: ['Python', 'TensorFlow', 'TensorFlow Lite', 'NumPy', 'pandas', 'Raspberry Pi'],
    links: [
      { label: 'Repo', href: 'TODO: Stress Detection repo URL' },
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
    stack: ['Snort', 'iptables', 'Juniper SRX', 'OpenSSL', 'Wireshark'],
    links: [
      { label: 'Repo', href: 'TODO: Network Labs repo URL' },
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
    stack: ['Python', 'XGBoost', 'pandas', 'NumPy', 'Scikit-Learn'],
    links: [
      { label: 'Repo', href: 'https://github.com/Sankula99/Heart-Disease-Detection' },
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
    stack: ['AWS', 'EC2', 'RDS', 'VPC', 'Linux'],
    links: [
      { label: 'Repo', href: 'TODO: AWS LAMP repo URL' },
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
    stack: ['Power BI', 'Azure SQL', 'DirectQuery'],
    links: [
      { label: 'Repo', href: 'TODO: Video Game Sales repo URL' },
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
      { label: 'Repo', href: 'TODO: CPU Scheduler repo URL' },
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
      'Production JS bundle 72.99 KB gzipped (Vite build).',
      'Minimum text-token contrast 4.68:1 (grey-3 on panel), meeting WCAG AA 4.5:1.',
      'No horizontal overflow from 320px to 1440px in the Overview.',
      'Full keyboard navigation with visible focus styles.',
    ],
    stack: ['React 19', 'TypeScript', 'Vite'],
    links: [
      { label: 'Repo', href: 'TODO: Portfolio site repo URL' },
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
    usedIn: 'OPTIK BERT classifier, Stress Detection, Heart Disease, CPU Simulator',
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
    usedIn: 'Network Attack and Defence Labs',
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
    usedIn: 'OPTIK MVP, InviteApp, AWS LAMP, this portfolio',
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

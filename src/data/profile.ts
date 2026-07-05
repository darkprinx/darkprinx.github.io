/**
 * All portfolio content lives in this file.
 * Edit names, links, copy, and lists here — no component changes needed.
 * Every claim below is sourced from the resume; keep it that way.
 * Last updated: 2026-07-05
 */

export const identity = {
  name: 'Abdullah Al Masud Tushar',
  shortName: 'Tushar',
  role: 'Senior Software Engineer',
  location: 'Dhaka, Bangladesh',
  timezone: 'UTC+6',
  email: 'rctushar07@gmail.com',
  phone: '+880 1840-419744',
  linkedin: 'https://linkedin.com/in/rctushar07',
  github: 'https://github.com/darkprinx',
  headline: {
    plain: 'Chaos goes in.',
    accent: 'Systems',
    tail: 'come out.',
  },
  positioning:
    'Backend-heavy full-stack engineer — seven-plus years of cloud SaaS platforms, data pipelines, and high-traffic backends, built remotely with European product teams.',
  heroHint: 'Move through the swarm. Click to break it — it always rebuilds.',
}

/** The words the hero swarm assembles itself into, in order. */
export const formationWords = ['TUSHAR', 'BUILDS', 'SCALES', 'SHIPS']

export const portrait = {
  src: '/green_image.png',
  fallback: '/portrait-placeholder.svg',
  alt: 'Portrait of Abdullah Al Masud Tushar, assembled from emerald mosaic tiles',
}

/** Hero ticker — every figure is from the resume. */
export const stats = [
  '7+ years in production',
  '20+ Airflow DAGs orchestrated',
  '500+ time-series curves published',
  '5M+ requests/day served',
  '75% cloud cost eliminated',
  '20+ engineers mentored on AWS',
  '3,100+ GitHub stars earned',
]

export const about = {
  statement: {
    before: 'For seven years I have been the engineer teams hand the',
    emphasis: 'load-bearing problems',
    after:
      'to — the pipelines, the payment flows, the org hierarchies, the cloud bills.',
  },
  facets: [
    {
      title: 'Backend-heavy, full-stack honest',
      body: 'I go deep on Python services, data pipelines, and AWS — and far enough across React and Next.js to ship the whole product when it matters.',
    },
    {
      title: 'Remote by design',
      body: 'Years of remote collaboration with European startups and mid-sized teams, across green energy, recruitment, transportation, and high-traffic consumer products.',
    },
    {
      title: 'Ownership over tickets',
      body: 'Cut a client’s monthly cloud bill by 75%. Closed a customer-data vulnerability in object storage. Rebuilt an org-hierarchy service from O(N) to O(1) reads. Mentored 20+ engineers on AWS along the way.',
    },
  ],
  philosophy:
    'Make it work, make it observable, make it cheap to change — in that order.',
  spec: [
    { label: 'Base', value: 'Dhaka, Bangladesh · UTC+6' },
    { label: 'Experience', value: '7+ years' },
    { label: 'Current', value: 'Senior Software Engineer, Cefalo' },
    { label: 'Focus', value: 'Backend · Cloud SaaS · Data engineering' },
    { label: 'Certified', value: 'AWS SA Associate (2020–23) · PSM I' },
    { label: 'Education', value: 'BSc CSE, East West University' },
  ],
}

export interface Cluster {
  key: string
  name: string
  description: string
  items: string[]
}

export const clusters: Cluster[] = [
  {
    key: 'backend',
    name: 'Backend & APIs',
    description:
      'Service design, REST APIs, background processing, and the domain logic underneath.',
    items: ['Python', 'Django', 'Flask', 'FastAPI', 'Node.js', 'TypeScript', 'Celery'],
  },
  {
    key: 'data',
    name: 'Data Engineering & Pipelines',
    description:
      'Orchestrated DAGs, ingest–transform–publish flows, and pipelines that page me before they page customers.',
    items: ['Airflow', 'Kafka', 'Pandas', 'Time-series curves', 'SLO-driven ops'],
  },
  {
    key: 'cloud',
    name: 'Cloud & Infrastructure',
    description:
      'Serverless and containerised architectures, priced like someone is watching the bill — because I am.',
    items: ['AWS · 15+ services', 'ECS Fargate', 'Lambda', 'S3 · SQS · SNS', 'VPC · IAM', 'GCP'],
  },
  {
    key: 'databases',
    name: 'Databases & Storage',
    description:
      'Relational modelling, NoSQL at scale, and caching layers tuned by reading the query plans the hard way.',
    items: ['PostgreSQL', 'MySQL', 'DynamoDB', 'MongoDB', 'Redis'],
  },
  {
    key: 'devops',
    name: 'DevOps & Reliability',
    description:
      'Trunk-based CI/CD, containers, observability, and root-cause analysis when the graphs spike.',
    items: ['Docker', 'Kubernetes', 'GitHub Actions', 'Prometheus', 'Grafana', 'Pytest'],
  },
  {
    key: 'product',
    name: 'Product & Frontend',
    description:
      'Enough product surface to own a feature end to end — including the part users actually see.',
    items: ['React', 'Next.js', 'Tailwind', 'HTML/CSS'],
  },
]

export const practiceBus = {
  label: 'Shared bus — practices that run through every cluster',
  items: [
    'Agile delivery',
    'Professional Scrum Master I',
    'Mentored 20+ engineers on AWS',
    'AI-assisted engineering · Claude Code · Copilot · OpenAI',
  ],
}

export interface Engagement {
  name: string
  tag: string
  points: string[]
}

export interface Station {
  company: string
  role: string
  period: string
  location: string
  summary: string
  engagements: Engagement[]
}

export const timeline: Station[] = [
  {
    company: 'Cefalo',
    role: 'Senior Software Engineer',
    period: 'Apr 2022 — Present',
    location: 'Dhaka · remote with Norwegian teams',
    summary:
      'Part of a 200+ engineer offshore organisation building for Norwegian industries — first owning a recruitment platform end to end, then moving into backend and data engineering for a major energy-market platform.',
    engagements: [
      {
        name: 'Volue Insight',
        tag: 'Backend & data engineering · 2.5 yrs',
        points: [
          'Run 20+ production Airflow DAGs orchestrating end-to-end pipelines across multiple data sources — scheduling, retries, and dependency management included.',
          'Ingest, transform, and publish 500+ time-series curves consumed daily by internal teams and external customers of a $550M green-energy market data platform.',
          'Automated the trunk-based CI pipeline — build, test, image publishing, deployment, release notes — and made the whole team faster.',
          'Resolve broken pipelines surfaced by SLO alerts and customer reports, with root-cause analysis across team boundaries.',
        ],
      },
      {
        name: 'SmartCruiter',
        tag: 'Full-stack ownership · 1.5 yrs',
        points: [
          'Held 50% ownership of end-to-end design and development of a recruitment platform built on Django, JavaScript, and AWS.',
          'Deployed services to ECS Fargate and ECR — auto-scaling with zero server management, no EC2 provisioning.',
          'Designed a custom subscription system around a local mobile-payment provider, handling one-time and recurring billing through proprietary APIs and scheduled jobs.',
        ],
      },
    ],
  },
  {
    company: 'Brainstation 23',
    role: 'Software Engineer',
    period: 'Jan 2019 — Mar 2022',
    location: 'Dhaka · global client teams',
    summary:
      'Built cloud backends for global clients — a trivia platform for Robi, Bangladesh’s second-largest telco, and an ERP platform for Ferdia, a $2.33M-funded Norwegian transport startup.',
    engagements: [
      {
        name: 'Robi trivia platform',
        tag: 'High-traffic cloud backend',
        points: [
          'Kept a consumer backend healthy at 5M+ requests per day.',
          'Cut the monthly cloud bill by 75% through API improvements, query optimisation, and caching — resolving the client’s budget concerns in weeks.',
          'Boosted average engagement 30% with scalable friendship and chat features on API Gateway, Lambda, and DynamoDB.',
        ],
      },
      {
        name: 'Ferdia',
        tag: 'Transport ERP · Norwegian startup',
        points: [
          'Owned the organizational-unit management service powering RBAC, solving hierarchical CRUD with Modified Preorder Tree Traversal — query complexity down from O(N) to O(1).',
          'Resolved critical security vulnerabilities by locking down exposed customer data in S3 buckets, while keeping access to existing data smooth for users.',
        ],
      },
    ],
  },
  {
    company: 'East West University',
    role: 'BSc, Computer Science & Engineering',
    period: 'Graduated Dec 2018',
    location: 'Dhaka, Bangladesh',
    summary:
      'Where the systems habit started — competitive programming and years of teaching others to think in algorithms.',
    engagements: [
      {
        name: 'Foundations',
        tag: 'Algorithms · mentorship · contests',
        points: [
          'Mentored 100+ university students in algorithms and data structures over multiple years.',
          '29th place, ACM ICPC Dhaka Regional 2017 (150 teams); 3rd place, City Inter-University Programming Contest 2017 (40 teams).',
          'Active competitive programmer — HackerRank 2237, CodeChef 2001, Codeforces 1554.',
        ],
      },
    ],
  },
]

export type CaseVisualType = 'timeseries' | 'cloud' | 'traffic' | 'tree' | 'menu' | 'stars'

export interface SystemCase {
  title: string
  client: string
  seed: number
  visual: CaseVisualType
  context: string
  built: string
  impact: string
  stack: string[]
  link?: { label: string; href: string }
}

export const systems: SystemCase[] = [
  {
    title: 'Energy-market data pipelines',
    client: 'Volue Insight · via Cefalo',
    seed: 7,
    visual: 'timeseries',
    context:
      'A $550M green-energy market data and forecasting platform, where traders and analysts depend on fresh curves every day.',
    built:
      '20+ production Airflow DAGs moving data from raw sources to published output — Python ingest and transform jobs feeding 500+ time-series curves, with an automated trunk-based CI pipeline behind them.',
    impact:
      'Curves that internal teams and paying customers rely on daily, and broken pipelines caught by SLO alerts before customers feel them.',
    stack: ['Python', 'Airflow', 'Time-series', 'CI/CD', 'Docker'],
  },
  {
    title: 'Recruitment platform SaaS',
    client: 'SmartCruiter · via Cefalo',
    seed: 13,
    visual: 'cloud',
    context:
      'A recruitment platform startup that needed one engineer to own half the product — design through deployment.',
    built:
      'Full-stack web application on Django, JavaScript, and AWS, deployed to ECS Fargate and ECR, plus a custom subscription engine integrating a local mobile-payment provider for one-time and recurring billing.',
    impact:
      'Auto-scaling infrastructure without a single managed server, and a payment path designed to reach 70% of potential subscribers.',
    stack: ['Django', 'JavaScript', 'AWS', 'ECS Fargate', 'Scheduled jobs'],
  },
  {
    title: 'High-traffic trivia backend',
    client: 'Robi · via Brainstation 23',
    seed: 23,
    visual: 'traffic',
    context:
      'A consumer trivia product for Bangladesh’s second-largest telco — five million requests a day, and a cloud bill the client could no longer justify.',
    built:
      'Backend hardening across APIs, database queries, and caching; then serverless friendship and chat features on API Gateway, Lambda, and DynamoDB.',
    impact:
      '75% of the monthly infrastructure bill eliminated in a short timeframe, and average user engagement up 30%.',
    stack: ['AWS Lambda', 'DynamoDB', 'API Gateway', 'Caching'],
  },
  {
    title: 'Org-hierarchy service for transport ERP',
    client: 'Ferdia · via Brainstation 23',
    seed: 31,
    visual: 'tree',
    context:
      'A Norwegian ERP platform digitising coach and charter bus operations, where role-based access hinged on a complex organisational tree.',
    built:
      'The organizational-unit management service, redesigned around Modified Preorder Tree Traversal to make hierarchical reads constant-time.',
    impact:
      'Query complexity down from O(N) to O(1) on the service every permission check depends on.',
    stack: ['Python', 'MPTT', 'RBAC', 'SQL'],
  },
  {
    title: 'MenuDao',
    client: 'Independent R&D',
    seed: 41,
    visual: 'menu',
    context:
      'A free SaaS platform for restaurant menu management — created, managed, and shared as digital menus via QR codes.',
    built:
      'Next.js App Router product with NextAuth (Google OAuth + credentials, JWT sessions, MongoDB adapter), SWR data fetching with optimistic updates, and canvas-based QR generation.',
    impact:
      'A working product used as a deliberate learning system for the modern React stack — auth, caching, and rendering tradeoffs learned on real workflows.',
    stack: ['Next.js', 'React', 'MongoDB', 'Tailwind', 'NextAuth'],
  },
  {
    title: 'Break The Ice With Python',
    client: 'Open source',
    seed: 57,
    visual: 'stars',
    context:
      'Learning Python in public — an educational repository of 100+ programming problems with detailed solutions.',
    built:
      'A structured, beginner-friendly path through Python fundamentals and OOP, maintained as a living resource.',
    impact:
      '3,100+ GitHub stars and 1,500+ forks — thousands of developers learned Python fundamentals from it.',
    stack: ['Python', 'OOP', 'Open source'],
    link: {
      label: 'View on GitHub',
      href: 'https://github.com/darkprinx/break-the-ice-with-python',
    },
  },
]

export interface Principle {
  stage: string
  name: string
  body: string
  proof: string
}

export const principles: Principle[] = [
  {
    stage: '01',
    name: 'Understand',
    body: 'Start from the business problem, not the ticket. The best architecture for the wrong problem is still the wrong system.',
    proof: 'A client’s budget concern became a 75% smaller cloud bill.',
  },
  {
    stage: '02',
    name: 'Design',
    body: 'Think in systems, not features. Data structures and boundaries chosen early decide what stays cheap to change later.',
    proof: 'An O(N) hierarchy problem redesigned into O(1) with MPTT.',
  },
  {
    stage: '03',
    name: 'Build',
    body: 'Boring, testable, shippable. Trunk-based development with an automated path from commit to release.',
    proof: 'CI covering build, test, publish, deploy, and release notes.',
  },
  {
    stage: '04',
    name: 'Observe',
    body: 'A backend you can’t see into is a backend you can’t trust. Instrument first, then let the alerts do the paging.',
    proof: 'Pipelines fixed from SLO alerts before customers report them.',
  },
  {
    stage: '05',
    name: 'Improve',
    body: 'Every incident, metric, and review feeds the next decision. Systems get better on purpose, not by accident.',
    proof: 'Root-cause analysis across team boundaries, every time.',
  },
]

export const contact = {
  heading: 'Bring me the chaos.',
  sub: 'I’ll ship you the system.',
  body: 'Hiring for a senior backend or full-stack role? Building a product that needs platforms, pipelines, or someone who treats your cloud bill like their own? My inbox is the entry point.',
  cta: 'Write to me',
}

/**
 * All portfolio content lives in this file.
 * Edit names, links, copy, and lists here. No component changes needed.
 * Every claim below is sourced from the resume or the LinkedIn profile
 * (certifications, recommendations, volunteering, honors); keep it that way.
 * Last updated: 2026-07-08
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
    accent: 'Solutions',
    tail: 'come out.',
  },
  positioning:
    'Backend-heavy full-stack engineer with seven-plus years across cloud SaaS platforms, data pipelines, and high-traffic backends, built remotely with European product teams.',
  heroHint: 'Move through the swarm. Click to break it. It always rebuilds.',
  resumeUrl: '/resume.pdf',
}

/** The words the hero swarm assembles itself into, in order. */
export const formationWords = ['TUSHAR', 'BUILDS', 'SCALES', 'SHIPS']

export const portrait = {
  src: '/profile_image.png',
  fallback: '/profile_image.png',
  alt: 'Portrait of Abdullah Al Masud Tushar, assembled from emerald mosaic tiles',
}

/** Hero ticker: every figure is from the resume. */
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
    before: 'Seven years with',
    emphasis: 'global engineering teams across Europe,',
    after: 'shipping the distributed systems, pipelines, payment flows, and infrastructure that keep their products running',
  },
  facets: [
    {
      title: 'Backend-heavy, full-stack honest',
      body: 'Backend is home (Python, Django, FastAPI), but I own the full delivery loop: data pipelines, AWS/GCP infrastructure, and CI/CD, increasingly with AI-driven tools like Claude Code and Copilot built into how I ship.',
    },
    {
      title: 'Remote by design',
      body: 'Years remote with Norwegian and European teams: inside a 200+ engineer delivery org, on a $550M energy-market platform, and behind a telco backend serving 5M+ requests a day.',
    },
    {
      title: 'Ownership over tickets',
      body: 'Cut a client’s monthly cloud bill by 75%. Closed a customer-data vulnerability in object storage. Rebuilt an org-hierarchy service from O(N) to O(1) reads. Mentored 20+ engineers on AWS along the way.',
    },
  ],
  philosophy:
    'Make it work, make it observable, make it cheap to change. In that order.',
  spec: [
    { label: 'Base', value: 'Dhaka, Bangladesh · UTC+6' },
    { label: 'Experience', value: '7+ years' },
    { label: 'Current', value: 'Senior Software Engineer, Cefalo' },
    { label: 'Focus', value: 'Backend · Cloud SaaS · Data engineering' },
    { label: 'Education', value: 'BSc CSE, East West University' },
  ],
}

export interface ProofQuote {
  quote: string
  name: string
  relationship: string
}

/** Short highlights pulled from the recommendations below, surfaced early. */
export const proofQuotes: ProofQuote[] = [
  {
    quote:
      'He is a highly capable scrum master and highly skilled Python developer and will make a key contribution wherever he goes.',
    name: 'Shin Lim',
    relationship: 'Tech Lead of Tushar on Ferdia',
  },
  {
    quote: 'There is no better colleague than Tushar.',
    name: 'Sifat Hassan',
    relationship: 'Worked with Tushar on the same team',
  },
  {
    quote: 'He is a colleague I would be honored to work with again.',
    name: 'Erik Ormevik',
    relationship: 'Tushar was Erik' + "'" + 's client',
  },
]

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
      'Serverless and containerised architectures, priced like someone is watching the bill. Because I am.',
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
      'Enough product surface to own a feature end to end, including the part users actually see.',
    items: ['React', 'Next.js', 'Tailwind', 'HTML/CSS'],
  },
]

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
    period: 'Apr 2022 – Present',
    location: 'Dhaka · remote with Norwegian teams',
    summary:
      'Part of a 200+ engineer offshore organisation building for Norwegian industries: first owning a recruitment platform end to end, then moving into backend and data engineering for a major energy-market platform.',
    engagements: [
      {
        name: 'Volue Insight',
        tag: 'Backend & data engineering · 2.5 yrs',
        points: [
          'Run 20+ production Airflow DAGs orchestrating end-to-end pipelines across multiple data sources, including scheduling, retries, and dependency management.',
          'Ingest, transform, and publish 500+ time-series curves consumed daily by internal teams and external customers of a $550M green-energy market data platform.',
          'Automated the trunk-based CI pipeline (build, test, image publishing, deployment, release notes) and made the whole team faster.',
          'Resolve broken pipelines surfaced by SLO alerts and customer reports, with root-cause analysis across team boundaries.',
        ],
      },
      {
        name: 'SmartCruiter',
        tag: 'Full-stack ownership · 1.5 yrs',
        points: [
          'Held 50% ownership of end-to-end design and development of a recruitment platform built on Django, JavaScript, and AWS.',
          'Deployed services to ECS Fargate and ECR: auto-scaling with zero server management, no EC2 provisioning.',
          'Designed a custom subscription system around a local mobile-payment provider, handling one-time and recurring billing through proprietary APIs and scheduled jobs.',
        ],
      },
    ],
  },
  {
    company: 'Brainstation 23',
    role: 'Software Engineer',
    period: 'Jan 2019 – Mar 2022',
    location: 'Dhaka · global client teams',
    summary:
      'Built cloud backends for global clients: a trivia platform for Robi, Bangladesh’s second-largest telco, and an ERP platform for Ferdia, a $2.33M-funded Norwegian transport startup.',
    engagements: [
      {
        name: 'Robi trivia platform',
        tag: 'High-traffic cloud backend',
        points: [
          'Kept a consumer backend healthy at 5M+ requests per day.',
          'Cut the monthly cloud bill by 75% through API improvements, query optimisation, and caching, resolving the client’s budget concerns in weeks.',
          'Boosted average engagement 30% with scalable friendship and chat features on API Gateway, Lambda, and DynamoDB.',
        ],
      },
      {
        name: 'Ferdia',
        tag: 'Transport ERP · Norwegian startup',
        points: [
          'Owned the organizational-unit management service powering RBAC, solving hierarchical CRUD with Modified Preorder Tree Traversal and taking query complexity from O(N) to O(1).',
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
      'Where the systems habit started: competitive programming and years of teaching others to think in algorithms.',
    engagements: [
      {
        name: 'Foundations',
        tag: 'Algorithms · mentorship · contests',
        points: [
          'Mentored 100+ university students in algorithms and data structures over multiple years.',
          '29th place, ACM ICPC Dhaka Regional 2017 (150 teams); 3rd place, City Inter-University Programming Contest 2017 (40 teams).',
          'Active competitive programmer: HackerRank 2237, CodeChef 2001, Codeforces 1554.',
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
      '20+ production Airflow DAGs moving data from raw sources to published output: Python ingest and transform jobs feeding 500+ time-series curves, with an automated trunk-based CI pipeline behind them.',
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
      'A recruitment platform startup that needed one engineer to own half the product, from design through deployment.',
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
      'A consumer trivia product for Bangladesh’s second-largest telco: five million requests a day, and a cloud bill the client could no longer justify.',
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
      'A free SaaS platform for restaurant menu management: created, managed, and shared as digital menus via QR codes.',
    built:
      'Next.js App Router product with NextAuth (Google OAuth + credentials, JWT sessions, MongoDB adapter), SWR data fetching with optimistic updates, and canvas-based QR generation.',
    impact:
      'A working product used as a deliberate learning system for the modern React stack: auth, caching, and rendering tradeoffs learned on real workflows.',
    stack: ['Next.js', 'React', 'MongoDB', 'Tailwind', 'NextAuth'],
  },
  {
    title: 'Break The Ice With Python',
    client: 'Open source',
    seed: 57,
    visual: 'stars',
    context:
      'Learning Python in public: an educational repository of 100+ programming problems with detailed solutions.',
    built:
      'A structured, beginner-friendly path through Python fundamentals and OOP, maintained as a living resource.',
    impact:
      '3,100+ GitHub stars and 1,500+ forks, and thousands of developers learned Python fundamentals from it.',
    stack: ['Python', 'OOP', 'Open source'],
    link: {
      label: 'View on GitHub',
      href: 'https://github.com/darkprinx/break-the-ice-with-python',
    },
  },
]

export interface Certification {
  name: string
  issuer: string
  date: string
  note?: string
  credentialUrl?: string
}

/** Licenses & certifications, as listed on LinkedIn. */
export const certifications: Certification[] = [
  {
    name: 'AWS Certified Solutions Architect – Associate',
    issuer: 'Amazon Web Services',
    date: 'Feb 2020',
    note: 'Cloud architecture across 15+ AWS services',
    credentialUrl: 'https://drive.google.com/file/d/1BF6a6o07-In_7qODG8taOnEuy1NmtZ_h/view',
  },
  {
    name: 'Professional Scrum Master™ I',
    issuer: 'Scrum.org',
    date: 'Aug 2021',
    note: 'Agile delivery, practiced daily on remote teams',
    credentialUrl: 'https://drive.google.com/file/d/16Q7K_FPO8NJ5Pseg5oRAKcpzCo8DsK9h/view',
  },
  {
    name: 'Intermediate Secure Coding in Python',
    issuer: 'SecureFlag',
    date: 'Feb 2026',
    note: 'Hands-on secure-coding labs in Python',
    credentialUrl: 'https://www.secureflag.com/s?c1316dd5-3e9e-400d-8c74-9b516e44bca7',
  },
]

export interface Recommendation {
  name: string
  title: string
  relationship: string
  date: string
  image: string
  text: string
}

/**
 * LinkedIn recommendations received: names, titles, relationships, and text
 * exactly as they appear on linkedin.com/in/rctushar07.
 */
export const recommendations: Recommendation[] = [
  {
    name: 'Teodor Tomter Liland',
    title: 'Fotograf, filmprodusent og designer',
    relationship: 'Worked with Tushar on the same team',
    date: 'September 21, 2023',
    image: '/recommenders/teodor-tomter-liland.jpg',
    text: "As the UX designer during the development of our recruitment portal, I had the pleasure of collaborating with Tushar. Throughout the project's phases, his systematic approach shone through, establishing him as a steadfast member of our technical ensemble. Tushar's adeptness in backend systems, paired with his diligence in refining our Jira workflow, was instrumental in ensuring our project's orderly progression. Although the crux of our collaboration was on design and development, Tushar's proactive endeavor to grasp the nuances of UX played a pivotal role in bridging the gap between design blueprints and their practical execution. Beyond his evident technical proficiency, our work environment was uplifted by Tushar's collaborative spirit, we shared a lot of good laughs! Reflecting on our partnership, I can confidently endorse Tushar for development roles, recognizing his potential to integrate seamlessly into and enrich any team.",
  },
  {
    name: 'Einar Eriksen',
    title: 'Data Scientist / Developer',
    relationship: 'Managed Tushar directly',
    date: 'September 18, 2023',
    image: '/recommenders/einar-eriksen.jpg',
    text: "In our journey of building a sophisticated recruitment portal, Tushar emerged as a linchpin of technical and organizational expertise. Partnering with Sifat in a remote team based in Bangladesh, Tushar contributed significantly over two years to create a portal that empowers both job seekers and employers. While Tushar's notable work on our Jira setup and CI/CD processes reflects his analytical acumen, it is essential to recognize his broader contributions. His role in the development of the portal, enabling users to seamlessly access job postings, integrate with APIs and a SolR based semantic search for tailored recommendations, and engage in an intuitive application process, was instrumental. Furthermore, Tushar's contributions ensured that employers could effortlessly create job postings, utilize application links, and evaluate applicant compatibility through psychometry. Tushar's dedication, technical know-how, and ability to collaborate effectively with international counterparts, including myself and our UX designer, are testament to his professional caliber. I confidently endorse him for any development or system management roles, certain that his proficiency and commitment will shine through.",
  },
  {
    name: 'Shin Lim',
    title: 'Senior Backend Developer',
    relationship: 'Worked with Tushar on the same team',
    date: 'March 31, 2022',
    image: '/recommenders/shin-lim.jpg',
    text: 'Tushar was a key contributor to Ferdia through his dedication to the job, setting a good example to his teammates of good coding practices and cooperation. He is a highly capable scrum master and highly skilled Python developer and will make a key contribution wherever he goes. It was a pleasure working with you, Tushar!',
  },
  {
    name: 'Dhruba Mitra',
    title: 'Software Engineer at Optimizely || Data Engineering || Web Scraping || ICPC West-Asia Continent Finalist 2020',
    relationship: 'Reported to Tushar directly',
    date: 'March 30, 2022',
    image: '/recommenders/dhruba-mitra.jpg',
    text: 'Abdullah was a great professional to work with. We worked together at Brain Station-23 LTD and he helped me a lot to get started and also to understand internal processes. He knows how to bring the best out of each person and is an outstanding mentor. His work ethics is immaculate and problem solving skill is too good. No matter how hard situations we faced, he never became nervous and that makes him a great programmer.',
  },
  {
    name: 'Md. Touhidul Islam',
    title: 'Certified Scrum Master (CSM) | CHRG',
    relationship: 'Worked with Tushar at the same company',
    date: 'March 27, 2022',
    image: '/recommenders/md-touhidul-islam.jpg',
    text: "He's an absolutely amazing mentor, co-worker, and adviser. While working with him, I was highly delighted by his efficient working style and solution strategies for technical and non-technical problems. His expertise on AWS and relentless contribution enhanced skillful cloud engineers throughout the company. People with a hunger for cloud expertise especially on AWS will be lucky to have him on the team.",
  },
  {
    name: 'Erik Ormevik',
    title: 'IT Project & Product Management',
    relationship: 'Tushar was Erik’s client',
    date: 'March 27, 2022',
    image: '/recommenders/erik-ormevik.jpg',
    text: "Tushar is a fantastic colleague who aims to achieve more than your everyday developer. He gave his all to the cause and became a mentor to his peers to ensure they obtained the knowledge he acquired throughout his role. His good spirits and high morale are certainly an added bonus to his already great contributions. He is a colleague I'd be honored to work with again!",
  },
  {
    name: 'Nazmus Sakib',
    title: 'SE @ Brain Station 23',
    relationship: 'Reported to Tushar directly',
    date: 'March 23, 2022',
    image: '/recommenders/nazmus-sakib.jpg',
    text: "It was a great experience to work with Tushar. He is one of the best mentors I have ever met. We have been working together in TEQ. He is a very co-operative and fun loving person. Also he is a very humble person. I'm looking forward to work with him.",
  },
  {
    name: 'Sifat Hassan',
    title: 'Experienced Software Engineer | Python, JavaScript, AWS, Micro-service, Professional Scrum Master',
    relationship: 'Worked with Tushar on the same team',
    date: 'March 22, 2022',
    image: '/recommenders/sifat-hassan.jpg',
    text: 'There is no better colleague than Tushar. He is one of the most dedicated professionals I’ve worked with and is willing to put that extra help whenever you need it. His expertise as a developer is considerable, and it helped our team come up with more efficient solutions on different projects. His contribution is valuable to the side, and I highly recommend Tushar and would love to work with him again.',
  },
  {
    name: 'Farjana Yeasmin',
    title: 'Software Quality Assurance Engineer',
    relationship: 'Worked with Tushar on the same team',
    date: 'March 14, 2022',
    image: '/recommenders/farjana-yeasmin.jpg',
    text: "We've joined our hands on a project, and Tushar is one of the best python developer I've met. I highly recommend his expertise to any person looking for a backend engineer. His ability to tackle any problem is remarkable and with a warm smile. Tushar would become an appreciated member of any team.",
  },
  {
    name: 'Abdullah Al Mosharraf',
    title: 'Senior Software Engineer & iOS Developer',
    relationship: 'Studied together with Tushar',
    date: 'October 13, 2017',
    image: '/recommenders/abdullah-al-mosharraf.jpg',
    text: 'A passionate guy with high amount of learning interest and ability. Had a very good time in team-ship since last 3 years. We were at the same team (EWU_DeadLock & EWU_Avengers), he was attentive and serious about his responsibility and very much co-operative, communicative. He has great ability for well understanding and bring creative idea on critical moment.',
  },
]

export interface VolunteerEntry {
  organization: string
  role: string
  period: string
  description: string
}

/** Volunteering, as listed on LinkedIn. */
export const volunteering: VolunteerEntry[] = [
  {
    organization: 'ACM Problem Solver Community',
    role: 'Lead Trainer',
    period: 'Jun 2017 – Mar 2018',
    description:
      'Ran weekly competitive-programming sessions, building a problem-solving community across universities.',
  },
  {
    organization: 'East West University',
    role: 'Trainer & Organizer',
    period: 'Dec 2016',
    description:
      'Organized and taught a competitive-programming camp for university students.',
  },
  {
    organization: 'SWAP (Student Welfare Association)',
    role: 'Trainer',
    period: 'Aug 2017',
    description: 'Delivered introductory competitive-programming training.',
  },
  {
    organization: 'City University',
    role: 'Trainer',
    period: 'Apr 2017',
    description: 'Led a 3-day competitive-programming workshop.',
  },
  {
    organization: 'Notre Dame University',
    role: 'Trainer',
    period: 'Mar 2017',
    description: 'Led a 5-day introductory programming workshop.',
  },
  {
    organization: 'United International University',
    role: 'Trainer',
    period: 'May 2015',
    description: 'Delivered a 4-day competitive-programming training.',
  },
]

export interface Honor {
  title: string
  issuer: string
  date: string
}

/** Honors & awards, as listed on LinkedIn. */
export const honors: Honor[] = [
  {
    title: '28th in ACM ICPC Regional 2017',
    issuer: 'University of Asia Pacific',
    date: 'Nov 2017',
  },
  {
    title: '2nd Runner Up, Inter University Programming Contest',
    issuer: 'City University',
    date: 'Feb 2017',
  },
  {
    title: '1st in Intra University Programming Contest',
    issuer: 'East West University',
    date: 'Nov 2016',
  },
  {
    title: "26th in NSU Cybernauts'16",
    issuer: 'North South University',
    date: 'Oct 2016',
  },
  {
    title: '1st in Programming Battle Summer 2016',
    issuer: 'East West University',
    date: 'Jun 2016',
  },
  {
    title: '2nd in CSE Fest Programming Contest',
    issuer: 'East West University',
    date: 'Jun 2015',
  },
]

export const contact = {
  heading: 'Bring me the chaos.',
  sub: 'I will ship you the solution.',
  body: 'Hiring for a senior backend engineer or technical lead? Building data pipelines, scaling platforms, or cutting cloud costs? I lead through clarity, ownership, and shipping. After we talk, I will give you a straight read: your problem, my honest fit. Let us see if we are both in.',
  cta: 'Message me on WhatsApp',
  resumeCta: 'Download resume',
}

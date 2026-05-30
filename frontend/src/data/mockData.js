// ============================================================
// ZERO GATE — Centralized Mock Data
// ============================================================

export const mockCurrentUser = {
  id: 1,
  name: 'Rizky Aditya Pratama',
  email: 'rizky.aditya@email.com',
  role: 'candidate',
  avatar: null,
  profileCompletion: 78,
  readinessScore: 82,
  location: 'Jakarta Selatan',
  phone: '08123456789',
};

export const mockCurrentRecruiter = {
  id: 10,
  name: 'Sarah Kusuma',
  email: 'sarah@techcorp.id',
  role: 'company',
  company: 'PT TechCorp Indonesia',
  avatar: null,
  companyVerified: true,
};

// ─────────────────────────────────────────────
// JOBS / LOWONGAN
// ─────────────────────────────────────────────
export const mockJobs = [
  {
    id: 1,
    title: 'Frontend Developer',
    company: 'PT Gojek Indonesia',
    companyLogo: null,
    location: 'Jakarta Pusat',
    type: 'Full-time',
    salary: 'Rp 8–14 juta/bulan',
    matchScore: 91,
    postedAt: '2 hari lalu',
    matchedSkills: ['React.js', 'TypeScript', 'Tailwind CSS', 'REST API'],
    gapSkills: ['GraphQL', 'Testing (Jest)'],
    description:
      'Bergabunglah dengan tim engineering kami untuk membangun produk yang digunakan oleh jutaan pengguna. Kami mencari Frontend Developer yang bersemangat, berpengalaman dengan React, dan terbiasa bekerja secara kolaboratif.',
    requirements: ['Min. 2 tahun pengalaman Frontend', 'Mahir React.js & TypeScript', 'Familiar dengan sistem desain'],
    skills: ['React.js', 'TypeScript', 'Tailwind CSS', 'REST API', 'GraphQL', 'Jest'],
    stage: ['Screening AI', 'Tes Online', 'Wawancara Online'],
    experience: '2+ tahun',
    applied: false,
  },
  {
    id: 2,
    title: 'UI/UX Designer',
    company: 'PT Tokopedia',
    companyLogo: null,
    location: 'Jakarta Barat (WFH)',
    type: 'Full-time',
    salary: 'Rp 7–12 juta/bulan',
    matchScore: 85,
    postedAt: '5 hari lalu',
    matchedSkills: ['Figma', 'Prototyping', 'User Research'],
    gapSkills: ['Motion Design', 'Usability Testing'],
    description:
      'Kami mencari desainer berbakat yang mampu menerjemahkan kebutuhan pengguna menjadi pengalaman produk yang intuitif dan estetis.',
    requirements: ['Portfolio desain UI/UX yang kuat', 'Mahir Figma & prototyping', 'Berpengalaman riset pengguna'],
    skills: ['Figma', 'Prototyping', 'User Research', 'Design System', 'Motion Design'],
    stage: ['Screening AI', 'Tes Portfolio', 'Wawancara Online'],
    experience: '1+ tahun',
    applied: true,
  },
  {
    id: 3,
    title: 'Backend Engineer (Node.js)',
    company: 'PT Bukalapak',
    companyLogo: null,
    location: 'Bandung / Remote',
    type: 'Full-time',
    salary: 'Rp 10–18 juta/bulan',
    matchScore: 74,
    postedAt: '1 minggu lalu',
    matchedSkills: ['Node.js', 'PostgreSQL', 'REST API'],
    gapSkills: ['Kubernetes', 'Microservices', 'Redis'],
    description:
      'Bergabunglah dengan tim backend kami yang dinamis untuk membangun infrastruktur yang andal dan scalable.',
    requirements: ['Min. 2 tahun Backend development', 'Mahir Node.js & Express', 'Familiar dengan database relasional'],
    skills: ['Node.js', 'Express.js', 'PostgreSQL', 'REST API', 'Redis', 'Kubernetes'],
    stage: ['Screening AI', 'Tes Coding', 'Wawancara Teknis'],
    experience: '2+ tahun',
    applied: false,
  },
  {
    id: 4,
    title: 'Data Analyst',
    company: 'PT Bank Mandiri',
    companyLogo: null,
    location: 'Jakarta Selatan',
    type: 'Full-time',
    salary: 'Rp 8–13 juta/bulan',
    matchScore: 68,
    postedAt: '3 hari lalu',
    matchedSkills: ['Python', 'SQL', 'Data Visualization'],
    gapSkills: ['Machine Learning', 'Apache Spark', 'Power BI'],
    description:
      'Kami mencari Data Analyst yang mampu mengolah data besar dan memberikan insight bisnis yang actionable.',
    requirements: ['Mahir Python & SQL', 'Pengalaman analisis data', 'Kemampuan presentasi data yang baik'],
    skills: ['Python', 'SQL', 'Tableau', 'Power BI', 'Machine Learning'],
    stage: ['Screening AI', 'Tes Analitik', 'Wawancara HRD'],
    experience: '1+ tahun',
    applied: false,
  },
];

// ─────────────────────────────────────────────
// APPLICATIONS / LAMARAN
// ─────────────────────────────────────────────
export const mockApplications = [
  {
    id: 1,
    jobTitle: 'UI/UX Designer',
    company: 'PT Tokopedia',
    appliedAt: '25 Mei 2026',
    status: 'Tes Online',
    statusColor: 'amber',
    matchScore: 85,
    nextStep: 'Kerjakan tes online sebelum 1 Juni 2026',
  },
  {
    id: 2,
    jobTitle: 'Product Manager',
    company: 'PT Traveloka',
    appliedAt: '20 Mei 2026',
    status: 'Wawancara',
    statusColor: 'blue',
    matchScore: 79,
    nextStep: 'Jadwal wawancara: 31 Mei 2026, 14.00 WIB',
  },
  {
    id: 3,
    jobTitle: 'Business Analyst',
    company: 'PT Astra International',
    appliedAt: '15 Mei 2026',
    status: 'Ditolak',
    statusColor: 'red',
    matchScore: 62,
    nextStep: null,
  },
];

// ─────────────────────────────────────────────
// TESTS / TES ONLINE
// ─────────────────────────────────────────────
export const mockTests = [
  {
    id: 1,
    title: 'Tes Kompetensi UI/UX — PT Tokopedia',
    jobTitle: 'UI/UX Designer',
    company: 'PT Tokopedia',
    deadline: '1 Juni 2026',
    duration: 60,
    totalQuestions: 30,
    status: 'Belum Dikerjakan',
    instructions: 'Jawab semua pertanyaan dengan teliti. Tes ini terdiri dari soal pilihan ganda tentang prinsip desain UX, usability testing, dan Figma. Pastikan koneksi internet Anda stabil.',
    questions: [
      {
        id: 1,
        question: 'Manakah yang paling tepat menggambarkan prinsip "progressive disclosure" dalam desain UX?',
        options: [
          'Menampilkan semua informasi sekaligus agar pengguna tidak bingung',
          'Menyembunyikan detail yang kurang penting dan menampilkannya secara bertahap sesuai kebutuhan',
          'Menggunakan animasi untuk memperkenalkan fitur baru',
          'Memberikan instruksi tertulis di setiap halaman',
        ],
        correctIndex: 1,
      },
      {
        id: 2,
        question: 'Dalam heuristik Nielsen, "error prevention" berarti...',
        options: [
          'Memberikan pesan error yang jelas saat terjadi kesalahan',
          'Mendesain antarmuka yang mencegah pengguna melakukan kesalahan sejak awal',
          'Membuat tombol undo yang mudah diakses',
          'Menampilkan log error untuk developer',
        ],
        correctIndex: 1,
      },
      {
        id: 3,
        question: 'Apa keunggulan utama menggunakan design system dalam tim produk?',
        options: [
          'Mengurangi kreativitas desainer',
          'Mempercepat development dan menjaga konsistensi antarmuka',
          'Hanya berguna untuk proyek berskala besar',
          'Membatasi pilihan komponen yang tersedia',
        ],
        correctIndex: 1,
      },
    ],
  },
];

// ─────────────────────────────────────────────
// INTERVIEWS / WAWANCARA
// ─────────────────────────────────────────────
export const mockInterviews = [
  {
    id: 1,
    jobTitle: 'Product Manager',
    company: 'PT Traveloka',
    interviewerName: 'Budi Santoso',
    interviewerRole: 'Senior HR Manager',
    date: '31 Mei 2026',
    time: '14.00 WIB',
    duration: '60 menit',
    platform: 'Google Meet',
    meetLink: 'https://meet.google.com/abc-defg-hij',
    status: 'Menunggu',
    type: 'HR Interview',
    notes: '',
    reminder: '1 jam sebelum wawancara',
  },
  {
    id: 2,
    jobTitle: 'Frontend Developer',
    company: 'PT Gojek Indonesia',
    interviewerName: 'Dewi Rahayu',
    interviewerRole: 'Engineering Manager',
    date: '5 Juni 2026',
    time: '10.00 WIB',
    duration: '90 menit',
    platform: 'Zoom',
    meetLink: 'https://zoom.us/j/1234567890',
    status: 'Terjadwal',
    type: 'Technical Interview',
    notes: 'Siapkan portfolio proyek React dan bersiap untuk live coding session.',
    reminder: '1 hari sebelum wawancara',
  },
];

// ─────────────────────────────────────────────
// GAP SKILL REPORT
// ─────────────────────────────────────────────
export const mockGapSkillReport = {
  overallReadiness: 82,
  targetRole: 'Frontend Developer',
  strongSkills: [
    { name: 'React.js', level: 88, category: 'Framework' },
    { name: 'JavaScript (ES6+)', level: 85, category: 'Language' },
    { name: 'Tailwind CSS', level: 90, category: 'Styling' },
    { name: 'Git & GitHub', level: 80, category: 'Tools' },
    { name: 'HTML5 & CSS3', level: 92, category: 'Foundation' },
  ],
  gapSkills: [
    { name: 'TypeScript', level: 45, targetLevel: 80, priority: 'Tinggi', resource: 'TypeScript Handbook, Udemy Course' },
    { name: 'Testing (Jest/RTL)', level: 30, targetLevel: 75, priority: 'Tinggi', resource: 'Testing React Apps - Kent C. Dodds' },
    { name: 'GraphQL', level: 20, targetLevel: 60, priority: 'Sedang', resource: 'GraphQL.org Tutorial, Apollo Docs' },
    { name: 'Docker', level: 15, targetLevel: 50, priority: 'Rendah', resource: 'Docker Getting Started Guide' },
  ],
  recommendations: [
    { title: 'TypeScript for React Developers', platform: 'Udemy', duration: '12 jam', rating: 4.8, free: false },
    { title: 'Testing JavaScript', platform: 'testingjavascript.com', duration: '8 jam', rating: 4.9, free: false },
    { title: 'Introduction to GraphQL', platform: 'Apollo Docs', duration: '4 jam', rating: 4.7, free: true },
  ],
};

// ─────────────────────────────────────────────
// CANDIDATES (for Recruiter view)
// ─────────────────────────────────────────────
export const mockCandidates = [
  {
    id: 1,
    name: 'Rizky Aditya',
    email: 'rizky@email.com',
    jobTitle: 'Frontend Developer',
    matchScore: 91,
    matchedSkills: ['React.js', 'TypeScript', 'Tailwind CSS'],
    gapSkills: ['GraphQL', 'Jest'],
    status: 'Shortlist',
    statusColor: 'indigo',
    experience: '3 tahun',
    education: 'S1 Teknik Informatika — Universitas Indonesia',
    location: 'Jakarta',
    testScore: 88,
    testStatus: 'Selesai',
    interviewNote: '',
    summary: 'Frontend developer berpengalaman 3 tahun, spesialis React ecosystem, pernah membangun 5+ produk SaaS yang digunakan ribuan pengguna.',
    skills: ['React.js', 'TypeScript', 'Tailwind CSS', 'REST API', 'Git'],
    education_history: [{ degree: 'S1 Teknik Informatika', school: 'Universitas Indonesia', year: '2019–2023' }],
    experience_history: [
      { role: 'Frontend Developer', company: 'PT Startup ABC', period: '2023–sekarang', desc: 'Membangun dashboard analytics menggunakan React & TypeScript.' },
      { role: 'Intern Frontend', company: 'PT Digital XYZ', period: '2022–2023', desc: 'Pengembangan komponen UI dengan React & Storybook.' },
    ],
    appliedAt: '28 Mei 2026',
  },
  {
    id: 2,
    name: 'Anindita Sari',
    email: 'anindita@email.com',
    jobTitle: 'Frontend Developer',
    matchScore: 87,
    matchedSkills: ['Vue.js', 'JavaScript', 'CSS3', 'REST API'],
    gapSkills: ['React.js', 'TypeScript'],
    status: 'Tes',
    statusColor: 'amber',
    experience: '2 tahun',
    education: 'S1 Sistem Informasi — ITS Surabaya',
    location: 'Surabaya (Remote)',
    testScore: null,
    testStatus: 'Menunggu',
    interviewNote: '',
    summary: 'Frontend developer dengan fokus pada aksesibilitas dan performa web. Aktif berkontribusi pada open source.',
    skills: ['Vue.js', 'JavaScript', 'CSS3', 'SASS', 'REST API'],
    education_history: [{ degree: 'S1 Sistem Informasi', school: 'ITS Surabaya', year: '2020–2024' }],
    experience_history: [
      { role: 'Frontend Developer', company: 'PT E-Commerce Nusantara', period: '2024–sekarang', desc: 'Pengembangan halaman produk dan checkout.' },
    ],
    appliedAt: '29 Mei 2026',
  },
  {
    id: 3,
    name: 'Muhammad Farhan',
    email: 'farhan@email.com',
    jobTitle: 'Frontend Developer',
    matchScore: 79,
    matchedSkills: ['React.js', 'CSS3', 'HTML5'],
    gapSkills: ['TypeScript', 'GraphQL', 'Testing'],
    status: 'Review',
    statusColor: 'slate',
    experience: '1 tahun',
    education: 'S1 Ilmu Komputer — BINUS University',
    location: 'Tangerang',
    testScore: null,
    testStatus: 'Belum Dikirim',
    interviewNote: '',
    summary: 'Fresh developer dengan semangat belajar tinggi. Aktif membuat proyek personal menggunakan React.',
    skills: ['React.js', 'HTML5', 'CSS3', 'JavaScript', 'Git'],
    education_history: [{ degree: 'S1 Ilmu Komputer', school: 'BINUS University', year: '2020–2024' }],
    experience_history: [
      { role: 'Junior Frontend Developer', company: 'PT Agency Digital', period: '2024–sekarang', desc: 'Pengembangan landing page dan microsite klien.' },
    ],
    appliedAt: '30 Mei 2026',
  },
  {
    id: 4,
    name: 'Clarissa Winata',
    email: 'clarissa@email.com',
    jobTitle: 'Frontend Developer',
    matchScore: 95,
    matchedSkills: ['React.js', 'TypeScript', 'GraphQL', 'Jest', 'Tailwind'],
    gapSkills: [],
    status: 'Interview',
    statusColor: 'blue',
    experience: '4 tahun',
    education: 'S1 Teknik Informatika — ITB',
    location: 'Bandung (Remote)',
    testScore: 95,
    testStatus: 'Selesai',
    interviewNote: 'Kandidat sangat komunikatif dan memiliki portofolio yang kuat.',
    summary: 'Senior frontend developer dengan pengalaman lintas startup dan korporat. Spesialis React + TypeScript.',
    skills: ['React.js', 'TypeScript', 'GraphQL', 'Jest', 'Tailwind CSS', 'Next.js'],
    education_history: [{ degree: 'S1 Teknik Informatika', school: 'Institut Teknologi Bandung', year: '2018–2022' }],
    experience_history: [
      { role: 'Senior Frontend Developer', company: 'PT Tech Unicorn', period: '2022–sekarang', desc: 'Lead frontend team, arsitektur React, code review.' },
      { role: 'Frontend Developer', company: 'PT Agency Kreatif', period: '2020–2022', desc: 'Pengembangan web app dan dashboard analytics.' },
    ],
    appliedAt: '27 Mei 2026',
  },
];

// ─────────────────────────────────────────────
// RECRUITER JOBS
// ─────────────────────────────────────────────
export const mockRecruiterJobs = [
  {
    id: 1,
    title: 'Frontend Developer',
    status: 'Aktif',
    applicants: 24,
    shortlisted: 4,
    postedAt: '25 Mei 2026',
    deadline: '15 Juni 2026',
  },
  {
    id: 2,
    title: 'Product Manager',
    status: 'Aktif',
    applicants: 18,
    shortlisted: 3,
    postedAt: '22 Mei 2026',
    deadline: '10 Juni 2026',
  },
  {
    id: 3,
    title: 'Data Analyst',
    status: 'Ditutup',
    applicants: 31,
    shortlisted: 5,
    postedAt: '10 Mei 2026',
    deadline: '28 Mei 2026',
  },
];

// ─────────────────────────────────────────────
// RECRUITER STATS
// ─────────────────────────────────────────────
export const mockRecruiterStats = {
  activeJobs: 2,
  totalApplicants: 42,
  pendingTest: 8,
  pendingInterview: 3,
  hired: 1,
  rejected: 12,
};

// ─────────────────────────────────────────────
// CANDIDATE PROFILE (for onboarding / CV)
// ─────────────────────────────────────────────
export const mockCandidateProfile = {
  name: 'Rizky Aditya Pratama',
  email: 'rizky.aditya@email.com',
  phone: '08123456789',
  location: 'Jakarta Selatan',
  linkedin: 'linkedin.com/in/rizky-aditya',
  portfolio: 'rizky.dev',
  summary: 'Frontend developer berpengalaman 3 tahun dalam pengembangan aplikasi web modern menggunakan React.js dan ekosistemnya. Berpengalaman dalam membangun produk SaaS yang skalabel dan antarmuka yang responsif.',
  education: [
    { degree: 'S1 Teknik Informatika', school: 'Universitas Indonesia', year: '2019–2023', gpa: '3.72' },
  ],
  experience: [
    {
      role: 'Frontend Developer',
      company: 'PT Startup ABC',
      period: 'Jan 2023 – Sekarang',
      desc: 'Membangun dashboard analytics menggunakan React & TypeScript yang digunakan oleh 10.000+ pengguna aktif. Berkolaborasi erat dengan tim produk dan desainer.',
    },
    {
      role: 'Intern Frontend Developer',
      company: 'PT Digital XYZ',
      period: 'Aug 2022 – Dec 2022',
      desc: 'Pengembangan komponen UI reusable dengan React & Storybook. Berkontribusi pada peningkatan performa aplikasi sebesar 30%.',
    },
  ],
  skills: ['React.js', 'TypeScript', 'Tailwind CSS', 'JavaScript', 'REST API', 'Git', 'HTML5', 'CSS3'],
  languages: ['Bahasa Indonesia (Native)', 'English (Intermediate)'],
  certifications: ['Dicoding Frontend Web Development', 'Meta React Developer Certificate'],
  workPreference: {
    type: 'Full-time',
    remote: 'Hybrid (WFH 3x seminggu)',
    location: 'Jabodetabek',
    salaryMin: 8000000,
    salaryMax: 14000000,
  },
};

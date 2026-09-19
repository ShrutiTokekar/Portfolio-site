// Everything on the About page (and the "About" teaser on the home page) comes
// from this file, so you can edit your story, skills, and certificates here.

export const PROFILE = {
  name: "Shruti Tokekar",
  headline: "UX/UI designer and frontend engineer",
  graduation: "May 2027",
  intro: [
    "I'm Shruti, a computer science student at East Stroudsburg University, graduating in May 2027.",
    "I take ideas from research and wireframes all the way to deployed products, with interfaces that are clear, accessible, and a little bit delightful.",
  ],
  languagesSpoken: ["English", "Hindi"],
};

// The Designer / Engineer switch on the About page.
export const LENSES = {
  designer: {
    label: "Designer",
    title: "I start with the person using it.",
    body: "I map the journey, sketch low-fidelity flows, test ideas early, and turn the winners into a clean visual system.",
    projects: ["thrift-trails", "waypoint", "zenty"],
  },
  engineer: {
    label: "Engineer",
    title: "I like the whole stack.",
    body: "I build responsive interfaces, connect them to APIs and databases, and ship them to production with secure sign-in and performance in mind.",
    projects: ["flow-state", "zenty", "skinthesis"],
  },
};

// "My story": click through the chapters.
export const STORY = [
  {
    tag: "Before code",
    when: "Growing up",
    title: "Paint, pencils, and a lot of color",
    body: "Before I wrote a line of code, I painted and drew. Art taught me composition, contrast, and how to notice the small details that make something feel right. I still bring that eye to every screen I design.",
  },
  {
    tag: "The spark",
    when: "Finding the front end",
    title: "The moment art and code clicked",
    body: "My dad is a software engineer, and watching him build things made software feel possible. The front end was where it all came together for me: I could design something and then make it real, working, and clickable.",
  },
  {
    tag: "Middlesex",
    when: "2023 to 2025",
    title: "A.S. in Computer Science",
    body: "I built my foundation at Middlesex College. I joined the Computer Science Club and the Indian Student Association, and I made the Dean's List.",
  },
  {
    tag: "ESU",
    when: "2025 to now",
    title: "B.S. in Computer Science, minor in Graphic and Web Design",
    body: "At East Stroudsburg University I'm pairing a computer science degree with design coursework, and I'm on the Dean's List here too.",
  },
  {
    tag: "Building",
    when: "Ongoing",
    title: "Projects that turn ideas into products",
    body: "Each project taught me something about design, code, or both, and each one is a case study you can click through.",
    link: { to: "/design", label: "See the case studies" },
  },
];

// Skills explorer. `used` shows up when you hover or focus a skill.
export const SKILLS = [
  {
    category: "Languages",
    items: [
      { name: "JavaScript", used: "Flow State, this site, the to-do app" },
      { name: "TypeScript", used: "Flow State, ZentyAI, Skinthesis" },
      { name: "Python", used: "ZentyAI's NLP backend" },
      { name: "Java", used: "Spring Boot and school projects" },
      { name: "Go", used: "Refundly, a fraud-detection service" },
      { name: "C++", used: "Refundly's admin dashboard" },
      { name: "C", used: "A scheduler and a steganography project" },
      { name: "PHP" },
      { name: "SQL", used: "PostgreSQL and MySQL" },
      { name: "HTML" },
      { name: "CSS" },
    ],
  },
  {
    category: "Frontend",
    items: [
      { name: "React", used: "Flow State, ZentyAI, this site" },
      { name: "Next.js", used: "Skinthesis" },
      { name: "Tailwind CSS", used: "Flow State, ZentyAI, Skinthesis, this site" },
      { name: "Framer Motion", used: "ZentyAI and this site" },
      { name: "Vite", used: "This site and ZentyAI" },
      { name: "TanStack Query", used: "Flow State" },
      { name: "Zustand", used: "Flow State" },
      { name: "Recharts", used: "ZentyAI's dashboard charts" },
      { name: "Responsive design" },
      { name: "Accessibility", used: "94 on Lighthouse" },
    ],
  },
  {
    category: "Backend and data",
    items: [
      { name: "Spring Boot", used: "Flow State" },
      { name: "Node.js" },
      { name: "PostgreSQL", used: "Flow State" },
      { name: "MySQL" },
      { name: "MongoDB" },
      { name: "REST APIs" },
      { name: "JWT and OAuth", used: "Flow State sign-in" },
      { name: "Docker", used: "ZentyAI's backend" },
    ],
  },
  {
    category: "Design",
    items: [
      { name: "Figma" },
      { name: "FigJam", used: "User flows" },
      { name: "User research" },
      { name: "User flows" },
      { name: "Wireframing" },
      { name: "Prototyping" },
      { name: "Usability testing" },
      { name: "Design systems", used: "Flow State, Skinthesis, Waypoint" },
      { name: "Visual design", used: "Painting and drawing roots" },
    ],
  },
  {
    category: "Tools",
    items: [
      { name: "Git" },
      { name: "GitHub" },
      { name: "Vercel", used: "This site, ZentyAI, Skinthesis" },
      { name: "Linux" },
      { name: "Jest" },
    ],
  },
];

export const CERTIFICATES = [
  {
    name: "Google UX Design Professional Certificate",
    issuer: "Google, on Coursera",
    when: "2026",
    featured: true,
    isNew: true,
    // Paste your Coursera credential link here to show a "View credential" button.
    link: "",
  },
  {
    name: "Meta Front-End Developer Certificate",
    issuer: "Meta, on Coursera",
    when: "In progress",
    link: "",
  },
  {
    name: "Computer Programming Certificate",
    issuer: "Middlesex College",
    when: "",
    link: "",
  },
  {
    name: "Visual Arts Certificate",
    issuer: "Middlesex College",
    when: "",
    link: "",
  },
];

export const HOW_I_WORK = [
  { word: "Creative", line: "I care about layout, color, and mood, and I want every screen to feel intentional." },
  { word: "Detail-oriented", line: "I sweat the small stuff: spacing, empty states, focus order, and the last 5 percent of polish." },
  { word: "Analytical", line: "I like logic and data, and I watch how people actually move through a flow." },
  { word: "Empathetic", line: "I start with the person on the other side of the screen, and I explain things simply." },
];

export const BEYOND = {
  interests: ["Thrifting", "Music", "Art", "Food", "Travel", "Fitness"],
  involvement: [
    "Computer Science Organization, ESU",
    "Women in STEM, ESU",
    "Boost4Paws website, a service-learning project",
    "Taught Hindi to a small group of children",
  ],
};

export const EXPERIENCE = [
  {
    year: "2024-2025",
    title: "Optometric Technician",
    sub: "The Eye Exam Group",
    note: "Patient care, data management, clinical support",
  },
];

// Mini case studies shown on /design (cards) and /design/:slug (detail page).
//
// Optional fields (timeline, status, learned, next, decision, figma, prototype, live, github,
// designSystem) are hidden until you fill them in. processLabel / processHeading
// rename the process section (e.g. for concept projects).
// Real screenshots are picked up automatically from
//   src/assets/case-studies/<slug>/cover.png   (card thumbnail)
//   src/assets/case-studies/<slug>/hero.png    (wide image under the header)
//   src/assets/case-studies/<slug>/step-1.png … step-4.png (one per process step)
// (.png, .jpg, .jpeg, .webp and .avif all work). Until an image exists, a designed
// stand-in is shown instead.

const caseStudies = [
  {
    slug: "flow-state",
    title: "Flow State",
    subtitle: "Task Manager",
    category: "UI/UX",
    year: "2026",
    summary: "A playful full-stack task manager with a Kanban board, calendar, and reminders.",
    role: "Designer + full-stack developer",
    timeline: "",
    tools: ["React", "TypeScript", "Tailwind CSS", "Spring Boot"],
    toolsFull:
      "React, TypeScript, Tailwind CSS, TanStack Query, Zustand, Spring Boot, PostgreSQL",
    live: "https://flowstatemanage.com/",
    github: "https://github.com/ShrutiTokekar/Flow-state",
    palette: { bg: "#FDFAC5", surface: "#FFFFFF", accent: "#CAE892", ink: "#4A5BA0" },
    // Tokens from the Tailwind config (flow-* colors, primary scale, Chicle + Combo).
    designSystem: {
      colors: [
        { name: "Flow purple", hex: "#8894D1" },
        { name: "Flow green", hex: "#CAE892" },
        { name: "Flow lavender", hex: "#DFC9E6" },
        { name: "Flow yellow", hex: "#FDFAC5" },
        { name: "Flow pink", hex: "#DFA4C6" },
        { name: "Primary 500", hex: "#5C6EB9" },
        { name: "Primary 900", hex: "#2D355A" },
      ],
      fonts: [
        { name: "Chicle", role: "Headings", family: "'Chicle', serif" },
        { name: "Combo", role: "Body", family: "'Combo', system-ui, sans-serif" },
      ],
      googleFonts: "Chicle&family=Combo",
    },
    overview: {
      heading: "Task management that doesn\u2019t feel like homework.",
      body: "I wanted a planner people would actually enjoy opening, so I gave it a bright, friendly personality instead of the usual gray admin look.",
    },
    process: [
      { label: "Structure", text: "Organized the app around how work actually moves.", chips: ["Dashboard", "Calendar", "Categories", "Trackers", "Profile"] },
      { label: "Board", text: "Put the numbers first and the work second: a quick status summary and calendar on top, then a three-column board.", chips: ["To Do", "In Progress", "Completed"] },
      { label: "UI design", text: "A bright, playful look: a hand-picked palette, a friendly heading font, and one color for each task status." },
      { label: "Build", text: "Built the whole stack myself: a React app, a REST API, and a relational database, with secure sign-in." },
    ],
    decision: {
      title: "Sharing is an invitation, not an assumption.",
      body: "Sharing a category sends an invitation the other person can accept or decline, and reminders arrive as emails you can act on directly. Working with someone else never happens without them saying yes.",
    },
    outcome: "Shipped to production with a Lighthouse score of 94 and 67+ zero-downtime deployments.",
    learned: "",
    next: "",
  },

  {
    slug: "portfolio",
    title: "Portfolio",
    subtitle: "Website",
    category: "Web Design",
    year: "2026",
    summary: "This site: a cream, editorial portfolio with a metallic 3D hero.",
    role: "Designer + developer",
    timeline: "",
    tools: ["Figma", "React", "Framer Motion", "Tailwind CSS"],
    toolsFull: "Figma, React, Vite, React Router, Tailwind CSS, Framer Motion, EmailJS",
    live: "https://shrutitokekar.com/",
    github: "https://github.com/ShrutiTokekar/Portfolio-site",
    palette: { bg: "#DCD3E6", surface: "#F5F3EF", accent: "#C9BFD8", ink: "#1A1815" },
    // Tokens from this site's Tailwind config and fonts.
    designSystem: {
      colors: [
        { name: "Cream", hex: "#EDEAE4" },
        { name: "Card", hex: "#F4F1EC" },
        { name: "Ink", hex: "#1A1815" },
        { name: "Text", hex: "#2A2520" },
        { name: "Slate", hex: "#7A7060" },
        { name: "Muted", hex: "#A09080" },
        { name: "Lavender", hex: "#B8A8C8" },
        { name: "Lilac", hex: "#9A8AAA" },
        { name: "Silver", hex: "#C8D0D8" },
      ],
      fonts: [
        { name: "Fraunces", role: "Display", family: "'Fraunces', serif" },
        { name: "DM Mono", role: "Labels and body", family: "'DM Mono', monospace" },
      ],
    },
    overview: {
      heading: "One site for two halves of the work.",
      body: "I design and I build, and most portfolios only make room for one. This one gives each its own space under a single identity.",
    },
    process: [
      { label: "Concept", text: "Set the direction first: warm and editorial, with one bold, shiny centerpiece." },
      { label: "Structure", text: "Split the site into two portals, with About and Contact behind a slim nav." },
      { label: "UI design", text: "Kept it restrained: cream, near-black, and one soft lilac accent." },
      { label: "Build", text: "Added an interactive terminal and a working contact form, and deployed it on Vercel." },
    ],
    decision: {
      title: "Make the first screen do the introducing.",
      body: "The name crashes into place, then a terminal shows the current stack and projects, so a visitor gets the personality and the substance before they scroll or click anything.",
    },
    outcome: "",
    learned: "",
    next: "",
  },

  {
    slug: "zenty",
    title: "ZentyAI",
    subtitle: "Personal Finance App",
    category: "UI/UX",
    year: "2025",
    summary: "An AI-powered personal finance app with a dashboard, budgets, savings goals, and a chat assistant.",
    role: "Designer + developer",
    timeline: "",
    tools: ["Figma", "React", "TypeScript", "Tailwind CSS"],
    toolsFull: "Figma, React, TypeScript, Tailwind CSS, Recharts, Framer Motion, Python (NLP backend)",
    live: "https://zentyai.vercel.app/",
    github: "https://github.com/ShrutiTokekar/AI-Personal-finance-Zenty",
    palette: { bg: "#FFEDD5", surface: "#FFFFFF", accent: "#FED7AA", ink: "#7C2D12" },
    // Tokens read from the live app (Tailwind orange, gray, and pastel status colors).
    designSystem: {
      colors: [
        { name: "Background", hex: "#FFEDD5" },
        { name: "Sidebar", hex: "#FFF7ED" },
        { name: "Active nav", hex: "#FED7AA" },
        { name: "Nav text", hex: "#7C2D12" },
        { name: "Card", hex: "#FFFFFF" },
        { name: "Heading", hex: "#111827" },
        { name: "Muted text", hex: "#6B7280" },
        { name: "Income", hex: "#DCFCE7" },
        { name: "Expenses", hex: "#FEE2E2" },
        { name: "Savings", hex: "#DBEAFE" },
        { name: "Savings rate", hex: "#F3E8FF" },
      ],
      fonts: [
        { name: "System UI", role: "Interface", family: "system-ui, -apple-system, 'Segoe UI', sans-serif" },
      ],
    },
    overview: {
      heading: "One calm place to see where your money goes.",
      body: "Money tools tend to be either a spreadsheet or a wall of charts. I wanted something you could simply ask.",
    },
    process: [
      { label: "Structure", text: "Grouped everything into eight sections in one sidebar, so nothing is more than a click away.", chips: ["Dashboard", "AI Assistant", "Transactions", "Analytics", "Savings", "Budget", "Stocks", "Settings"] },
      { label: "Wireframe", text: "Started with the dashboard: four key numbers on top, then a spending trend and a category breakdown." },
      { label: "UI design", text: "A warm peach palette, with a soft color for each metric so the numbers read at a glance." },
      { label: "Build", text: "A React frontend with live charts, backed by a Python service that answers questions in plain language." },
    ],
    decision: {
      title: "Design the empty state, not just the full one.",
      body: "A new user opens every chart with nothing in it. Instead of leaving blank boxes, each empty panel says what is missing and what to do about it, like \u201cAdd transactions to see trends.\u201d The first screen someone sees still feels intentional.",
    },
    outcome: "",
    learned: "",
    next: "",
  },

  {
    slug: "skinthesis",
    title: "Skinthesis",
    subtitle: "Brand Site",
    category: "Web Design",
    year: "2026",
    summary: "A single-page brand site for a biotech skincare startup.",
    role: "UI/UX designer + developer",
    timeline: "",
    tools: ["Figma", "Next.js", "TypeScript", "Tailwind CSS"],
    toolsFull: "Figma, Next.js, TypeScript, Tailwind CSS",
    live: "https://skinthesiscosmetic.vercel.app/",
    github: "https://github.com/ShrutiTokekar/Skinthesis",
    palette: {
      bg: "linear-gradient(135deg, #1A2D4A 0%, #5BA4CF 100%)",
      surface: "rgba(255,255,255,0.16)",
      accent: "#5BA4CF",
      ink: "#F7F3EF",
    },
    // Tokens from the Tailwind config (cream, mist, navy, sky) and the fonts on the live page.
    designSystem: {
      colors: [
        { name: "Cream", hex: "#F7F3EF" },
        { name: "Mist", hex: "#EDF3F8" },
        { name: "Navy", hex: "#1A2D4A" },
        { name: "Sky", hex: "#5BA4CF" },
      ],
      fonts: [
        { name: "Playfair Display", role: "Display", family: "'Playfair Display', serif" },
        { name: "DM Sans", role: "Body", family: "'DM Sans', system-ui, sans-serif" },
      ],
      googleFonts: "Playfair+Display:ital,wght@0,700;1,400&family=DM+Sans:wght@400;500",
    },
    overview: {
      heading: "Make a science-heavy story easy to scroll.",
      body: "The startup needed to explain a market shift, an ingredient, and a product in one scroll, without reading like a research paper.",
    },
    process: [
      { label: "Story", text: "Mapped out the sections before designing any of them.", chips: ["Why now", "Science", "Product", "Pipeline", "Who it's for", "Team"] },
      { label: "Content", text: "Turned dense claims into pieces you can scan at a glance.", chips: ["Stat callouts", "Comparison table", "3-step ritual"] },
      { label: "UI design", text: "A calm, clinical-but-warm look: soft neutrals with a single sky-blue accent." },
      { label: "Build", text: "Rebuilt an early HTML and jQuery page as typed components, with scroll-in animations and an interactive product section." },
    ],
    decision: {
      title: "Let the page tell the story in order.",
      body: "Visitors arrive skeptical of yet another anti-aging claim. So the page starts with why the moment matters, backs it with a direct comparison, and only then shows the product. By the time the shade picker appears, the reader already knows why it exists.",
    },
    outcome: "Live, with a working waitlist signup.",
    learned: "",
    next: "",
  },

  {
    slug: "waypoint",
    title: "Waypoint",
    subtitle: "Travel App",
    category: "UI/UX",
    year: "2026",
    status: "In progress",
    summary: "A mobile travel app for booking flights, hotels, rental cars, and activities.",
    role: "UX/UI designer",
    timeline: "",
    tools: ["Figma"],
    toolsFull: "Figma",
    live: "",
    github: "",
    // Figma file (make sure sharing is set to "Anyone with the link can view").
    figma: "https://www.figma.com/design/WWJenU264mu8RItB2C8ZLy/travel-app-wireframe?node-id=0-1",
    // Add a view-only Figma prototype link here once the clickable prototype exists.
    prototype: "",
    palette: { bg: "#FFCDB2", surface: "#FFFFFF", accent: "#E5989B", ink: "#6D6875" },
    // Palette for the high-fidelity pass; the wireframes are still neutral grays.
    designSystem: {
      heading: "Color palette.",
      note: "Chosen for the high-fidelity pass. The wireframes are still in neutral grays.",
      colors: [
        { name: "Peach Fuzz", hex: "#FFCDB2" },
        { name: "Powder Blush", hex: "#FFB4A2" },
        { name: "Cotton Candy", hex: "#E5989B" },
        { name: "Dusty Rose", hex: "#B5838D" },
        { name: "Dim Grey", hex: "#6D6875" },
      ],
    },
    overview: {
      heading: "One app for the whole trip.",
      body: "Planning a trip usually means juggling separate apps and tabs. Waypoint brings search, booking, and the itinerary into one flow.",
    },
    process: [
      { label: "Research", text: "Looked at what Kayak and Expedia get right and where travelers get stranded, then defined the target user: the independent multi-stop planner." },
      { label: "User flow", text: "Mapped the journey from welcome and login through to booking, confirmation, and the itinerary.", chips: ["Hotels", "Flights", "Cars", "Activities"] },
      { label: "Low-fi", text: "Drew 40 low-fidelity screens in Figma, covering the entry screens and every search flow." },
    ],
    outcome: "Next up: apply the color palette to the wireframes and build a clickable prototype.",
    learned: "",
    next: "",
  },

  {
    slug: "thrift-trails",
    title: "Thrift Trail",
    subtitle: "Marketplace App",
    category: "UI/UX",
    year: "2026",
    status: "",
    summary: "A thrift and vintage marketplace app that plans your thrifting day.",
    role: "UX designer",
    timeline: "",
    tools: ["Figma"],
    toolsFull: "Figma",
    live: "",
    github: "",
    // Figma file (make sure sharing is set to "Anyone with the link can view").
    figma: "https://www.figma.com/design/2aOrsKBYwiidxrcDnIxt6s/Thrift-Trail-%E2%80%94-Hi-Fi-Wireframes?node-id=0-1",
    // Add a view-only Figma prototype link here if you build a clickable prototype.
    prototype: "",
    palette: { bg: "#F6EFE4", surface: "#FFFDF9", accent: "#EED9D3", ink: "#2B2420" },
    // Colors and fonts read from the Hi-Fi Wireframes file.
    designSystem: {
      colors: [
        { name: "Ivory", hex: "#FFFDF9" },
        { name: "Cream", hex: "#F6EFE4" },
        { name: "Sand", hex: "#E7DCC9" },
        { name: "Espresso", hex: "#2B2420" },
        { name: "Taupe", hex: "#7A6F63" },
        { name: "Terracotta", hex: "#C1502E" },
        { name: "Rust", hex: "#873E28" },
        { name: "Sage", hex: "#6F7D5C" },
        { name: "Sage light", hex: "#9EAB7A" },
        { name: "Mustard", hex: "#D9A441" },
        { name: "Rose", hex: "#CC8C8C" },
        { name: "Periwinkle", hex: "#8C94AD" },
      ],
      fonts: [
        { name: "Lora", role: "Headings", family: "'Lora', Georgia, serif" },
        { name: "Poppins", role: "Interface", family: "'Poppins', system-ui, sans-serif" },
      ],
      googleFonts: "Lora:wght@600&family=Poppins:wght@400;500;600",
    },
    overview: {
      heading: "Turn thrifting from show-up-and-hope into a plan.",
      body: "Secondhand apps are great for browsing, but the in-person side of thrifting is still show-up-and-hope. Thrift Trail helps you plan the trip.",
    },
    processLabel: "The screens",
    processHeading: "The main screens.",
    process: [
      { label: "Trail Map", text: "Find nearby stores on a map, then filter by type.", chips: ["Vintage", "Consignment", "Curated"] },
      { label: "Vibe Match Feed", text: "A feed of finds curated to your style.", chips: ["Y2K", "Cottagecore", "Grunge", "Preppy"] },
      { label: "Store detail", text: "A page for each store with what you need before you go.", chips: ["Rating", "Hours", "Address", "Featured items"] },
      { label: "Events + saved", text: "Pop-ups, flea markets, and sales, plus a place to save your favorites." },
    ],
    decision: {
      title: "Design for the aisle, not just the app.",
      body: "A mapped route for the day, a feed that learns your taste, and events worth showing up for: the app is built to get you out the door.",
    },
    outcome: "Six high-fidelity screens, designed in Figma.",
    learned: "",
    next: "",
  },

  {
    slug: "todo-app",
    title: "To-do List",
    subtitle: "App",
    category: "Web Design",
    year: "2023",
    summary: "A minimal to-do list with categories, built as an early project.",
    role: "Designer + developer",
    timeline: "",
    tools: ["HTML", "CSS", "JavaScript"],
    toolsFull: "HTML, CSS, JavaScript",
    live: "",
    github: "https://github.com/ShrutiTokekar/Todolist",
    palette: { bg: "#E4EADF", surface: "#F3F1ED", accent: "#F0DAD1", ink: "#889F83" },
    // Colors from style.css.
    designSystem: {
      colors: [
        { name: "Card", hex: "#F3F1ED" },
        { name: "Page", hex: "#F4F4F4" },
        { name: "Sage", hex: "#889F83" },
        { name: "Blush", hex: "#F0DAD1" },
      ],
      fonts: [{ name: "Arial", role: "Interface", family: "Arial, sans-serif" }],
    },
    overview: {
      heading: "Start with the smallest useful thing.",
      body: "I wanted to practice the fundamentals: turning a simple form into a living list that updates as you use it.",
    },
    process: [
      { label: "Plan", text: "Kept it to four actions so the interface could stay simple.", chips: ["Add", "Categorize", "Complete", "Delete"] },
      { label: "Layout", text: "One centered card: inputs on top, the list underneath." },
      { label: "UI design", text: "Soft sage and cream over a leafy background image." },
      { label: "Build", text: "Plain JavaScript with no framework: tasks are added to the page directly, with a toggle to complete and a button to remove." },
    ],
    decision: {
      title: "Keep finished tasks visible.",
      body: "Completing a task crosses it out instead of removing it, so the list doubles as a quick record of what has been done.",
    },
    outcome: "",
    learned: "",
    next: "",
  },
];

// Display order on /design and for "Next project" links. Edit this list to reorder.
const ORDER = [
  "flow-state",
  "zenty",
  "waypoint",
  "thrift-trails",
  "skinthesis",
  "portfolio",
  "todo-app",
];

export default [...caseStudies].sort(
  (a, b) => ORDER.indexOf(a.slug) - ORDER.indexOf(b.slug)
);

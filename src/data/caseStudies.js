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
    summary:
      "A playful full-stack task manager with a Kanban board, calendar, categories, and reminders, built around its own bright design system.",
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
      body: "Most task apps feel like admin. Flow State pairs a Kanban board, a calendar, and reminders with a bright, playful look, so planning your work feels a little lighter and a lot less like a chore.",
    },
    process: [
      {
        label: "Structure",
        text: "Organized the app around how work actually moves: a dashboard, a calendar, categories, and trackers, all behind a slim sidebar.",
        chips: ["Dashboard", "Calendar", "Categories", "Trackers", "Profile"],
      },
      {
        label: "Board",
        text: "Laid out the dashboard with four status cards and a calendar on top, then a Kanban board with To Do, In Progress, and Completed columns.",
        chips: ["Status cards", "Calendar", "Upcoming", "To Do", "In Progress", "Completed"],
      },
      {
        label: "UI design",
        text: "Built a playful design system: Chicle headings, a periwinkle, lime, butter, and lavender palette, and a color for each task status.",
        swatches: ["#8894D1", "#CAE892", "#DFC9E6", "#FDFAC5", "#DFA4C6"],
      },
      {
        label: "Build",
        text: "Built it full stack: React, TypeScript, TanStack Query, and Zustand up front, with a Spring Boot API, PostgreSQL, JWT, and Google sign-in behind it.",
        chips: ["React", "TypeScript", "TanStack Query", "Zustand", "Spring Boot", "PostgreSQL", "JWT", "Google OAuth"],
      },
    ],
    decision: {
      title: "Sharing is an invitation, not an assumption.",
      body: "Sharing a category sends an invitation the other person can accept or decline, and reminders arrive as emails you can act on directly. Working with someone else never happens without them saying yes.",
    },
    outcome:
      "A live full-stack task manager with a Kanban board, calendar, category sharing, email reminders, and secure sign-in, scoring 94 on Lighthouse performance and accessibility.",
    learned: "",
    next: "",
  },

  {
    slug: "portfolio",
    title: "Portfolio",
    subtitle: "Website",
    category: "Web Design",
    year: "2026",
    summary:
      "This site: a cream, editorial portfolio with a crash-animation hero, metallic 3D lettering, an interactive terminal, and separate portals for design and code.",
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
      body: "I design and I build, and most portfolios only make room for one. This site gives each its own portal from the very first screen, under a single shared visual identity.",
    },
    process: [
      {
        label: "Concept",
        text: "Set the direction first: a cream ground, metallic lilac lettering, and a serif display face paired with mono labels.",
        chips: ["Cream ground", "Chrome lettering", "Fraunces", "DM Mono"],
      },
      {
        label: "Structure",
        text: "Split the site into a Design portal and a Code portal, with About and Contact behind a slim navigation bar.",
        chips: ["Design portal", "Code portal", "About", "Contact"],
      },
      {
        label: "UI design",
        text: "Kept the palette small: warm cream, near-black ink, and a single soft lilac accent.",
        swatches: ["#EDEAE4", "#1A1815", "#9A8AAA", "#7A7060"],
      },
      {
        label: "Build",
        text: "Built in React and Vite with React Router, Tailwind, and Framer Motion, plus an interactive terminal and an EmailJS contact form. Deployed on Vercel.",
        chips: ["React", "Vite", "Framer Motion", "EmailJS", "Vercel"],
      },
    ],
    decision: {
      title: "Make the first screen do the introducing.",
      body: "The hero opens with a crash animation and 3D lettering, then a terminal shows the current stack and projects. A visitor gets the personality and the substance before they scroll or click anything.",
    },
    outcome:
      "A live, responsive personal site with a design portal, a code portal, a working contact form, and a downloadable resume.",
    learned: "",
    next: "",
  },

  {
    slug: "zenty",
    title: "ZentyAI",
    subtitle: "Personal Finance App",
    category: "UI/UX",
    year: "2025",
    summary:
      "An AI-powered personal finance app that brings spending, budgets, savings, stocks, and a chatbot into one calm, easy-to-scan dashboard.",
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
      body: "Money tools tend to be either a spreadsheet or a wall of charts. ZentyAI organizes everything into eight focused sections, from Dashboard and Budget to Savings, Stocks, and an AI Assistant you can simply ask questions in plain language.",
    },
    process: [
      {
        label: "Structure",
        text: "Grouped the features into eight sections in one sidebar, so nothing is more than a click away.",
        chips: ["Dashboard", "AI Assistant", "Transactions", "Analytics", "Savings", "Budget", "Stocks", "Settings"],
      },
      {
        label: "Wireframe",
        text: "Laid out the dashboard first: four key numbers up top, then trends and a category breakdown below.",
        chips: ["4 key numbers", "Spending trends", "Spending by category"],
      },
      {
        label: "UI design",
        text: "Chose a warm peach palette and gave each key metric its own color: green, red, blue, and purple.",
        swatches: ["#FFF7ED", "#FFEDD5", "#FED7AA", "#7C2D12", "#DCFCE7", "#FEE2E2", "#DBEAFE", "#F3E8FF"],
      },
      {
        label: "Build",
        text: "Built the frontend in React and TypeScript with Tailwind, Recharts, and Framer Motion, paired with a Python NLP backend that powers the chatbot.",
        chips: ["React", "TypeScript", "Tailwind", "Recharts", "Python", "NLP"],
      },
    ],
    decision: {
      title: "Design the empty state, not just the full one.",
      body: "A new user opens every chart with nothing in it. Instead of leaving blank boxes, each empty panel says what is missing and what to do about it, like \u201cAdd transactions to see trends.\u201d The first screen someone sees still feels intentional.",
    },
    outcome:
      "A live personal finance app with a dashboard, transactions, analytics, savings, budgets, stocks, and an AI assistant.",
    learned: "",
    next: "",
  },

  {
    slug: "skinthesis",
    title: "Skinthesis",
    subtitle: "Brand Site",
    category: "Web Design",
    year: "2026",
    summary:
      "A single-page brand site for a biotech skincare startup that walks visitors from the problem, to the science, to the product.",
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
      body: "Skinthesis is a biotech beauty startup rethinking anti-aging without retinol. The site had to explain a market shift, an ingredient, and a product in a single scroll, without reading like a research paper.",
    },
    process: [
      {
        label: "Story",
        text: "Ordered the page as a narrative: why now, the science, the product, what is next, who it is for, and the team.",
        chips: ["Why now", "Science", "Product", "Pipeline", "Who it's for", "Team"],
      },
      {
        label: "Content",
        text: "Turned dense claims into scannable pieces: stat callouts, a side-by-side ingredient comparison, and a three-step ritual.",
        chips: ["Stat callouts", "Comparison table", "3-step ritual", "Before / after"],
      },
      {
        label: "UI design",
        text: "Built a calm palette of cream, mist, and navy with a sky-blue accent, and paired Playfair Display with DM Sans.",
        swatches: ["#F7F3EF", "#EDF3F8", "#1A2D4A", "#5BA4CF"],
      },
      {
        label: "Build",
        text: "Rebuilt a plain HTML, CSS, and jQuery page in Next.js, TypeScript, and Tailwind, with typed components, scroll-in animations, and an interactive product section.",
        chips: ["Next.js", "TypeScript", "Tailwind", "Shade picker", "Gallery", "Accordions"],
      },
    ],
    decision: {
      title: "Let the page tell the story in order.",
      body: "Visitors arrive skeptical of yet another anti-aging claim. So the page starts with why the moment matters, backs it with a direct comparison, and only then shows the product. By the time the shade picker appears, the reader already knows why it exists.",
    },
    outcome:
      "A live, responsive brand site with a full story flow, an interactive product showcase, and a waitlist signup.",
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
    summary:
      "A mobile travel app for searching and booking flights, hotels, rental cars, and activities, with an itinerary that keeps the whole trip in one place.",
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
      body: "Booking a trip usually means jumping between flights, hotels, cars, and activities. Waypoint brings them into one mobile app, from search to booking, and gathers everything into a single itinerary.",
    },
    process: [
      {
        label: "Research",
        text: "Looked at what Kayak and Expedia get right and where travelers get stranded, then defined the target user: the independent multi-stop planner.",
        chips: ["Kayak", "Expedia", "Multi-stop planner"],
      },
      {
        label: "User flow",
        text: "Mapped the journey from welcome and login through hotels, flights, cars, and activities, then on to booking, confirmation, and the itinerary.",
        chips: ["Welcome", "Login", "Home", "Hotels", "Flights", "Cars", "Activities", "Booking", "Itinerary"],
      },
      {
        label: "Low-fi",
        text: "Drew 40 low-fidelity screens in Figma: the entry screens, search flows for hotels, flights (round trip and one-way), cars, and activities, plus booking, confirmation, and the itinerary.",
        chips: ["Welcome", "Home", "Hotel search", "Flight search", "Car search", "Activities", "Booking", "Itinerary"],
      },
      {
        label: "High-fi next",
        text: "Up next: apply the blush-to-plum palette to the wireframes and build a clickable prototype.",
        chips: ["Color palette", "High-fidelity screens", "Clickable prototype"],
      },
    ],
    outcome:
      "Work in progress. The user flow and 40 low-fidelity screens are done in Figma. High-fidelity screens and a clickable prototype are next.",
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
    summary:
      "A thrift and vintage marketplace app that plans your thrifting day: a trail map of nearby stores, a feed matched to your style, and local events.",
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
      body: "Most secondhand apps are built for browsing from the couch and leave the in-person side of thrifting to luck. Thrift Trail is a marketplace for buying and selling secondhand fashion that also helps you plan the trip, with a trail map, a style-matched feed, and local events.",
    },
    processLabel: "The screens",
    processHeading: "The main screens.",
    process: [
      {
        label: "Trail Map",
        text: "Search nearby stores on a map, filter by Vintage, Consignment, or Curated, and pull up a sheet of the closest spots with distance and store type.",
        chips: ["Search", "Filter chips", "Map", "Nearby stores"],
      },
      {
        label: "Vibe Match Feed",
        text: "A feed of finds curated to your style, filtered by aesthetics like Y2K, Cottagecore, Grunge, and Preppy.",
        chips: ["Y2K", "Cottagecore", "Grunge", "Preppy"],
      },
      {
        label: "Store detail",
        text: "Each store gets its own page with a rating, tags, hours, address, and featured items.",
        chips: ["Rating", "Hours", "Address", "Featured items"],
      },
      {
        label: "Events + saved",
        text: "Local events with date cards, plus a Saved tab for favorite places and items.",
        chips: ["Pop-ups", "Flea markets", "Sales", "Saved places", "Saved items"],
      },
    ],
    decision: {
      title: "Design for the aisle, not just the app.",
      body: "Most secondhand apps assume you are browsing from the couch. This one leans into the in-person trip: a map of nearby stores for the day, a feed that learns your style, and events worth showing up for.",
    },
    outcome:
      "Six high-fidelity screens designed in Figma: Home, Trail Map, Vibe Match Feed, Store Detail, Events, and Saved.",
    learned: "",
    next: "",
  },

  {
    slug: "todo-app",
    title: "To-do List",
    subtitle: "App",
    category: "Web Design",
    year: "2023",
    summary:
      "A minimal to-do list for adding, categorizing, completing, and deleting tasks, built with plain HTML, CSS, and JavaScript.",
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
      body: "An early project to practice the fundamentals: turning a simple form into a living list. Add a task with an optional category, mark it complete, or delete it.",
    },
    process: [
      {
        label: "Plan",
        text: "Kept the feature set to four actions so the interface could stay simple.",
        chips: ["Add", "Categorize", "Complete", "Delete"],
      },
      {
        label: "Layout",
        text: "A single centered card with the input fields on top and the task list underneath.",
        chips: ["Task input", "Category", "Add button", "Task list"],
      },
      {
        label: "UI design",
        text: "Paired a soft sage headline with a warm cream card over a background image, with a strikethrough for finished tasks.",
        swatches: ["#F3F1ED", "#889F83", "#F0DAD1", "#F4F4F4"],
      },
      {
        label: "Build",
        text: "Wrote it in vanilla JavaScript: each task is added to the page directly, with a toggle for completion and a button to remove it.",
        chips: ["HTML", "CSS", "JavaScript"],
      },
    ],
    decision: {
      title: "Keep finished tasks visible.",
      body: "Completing a task crosses it out instead of removing it, so the list doubles as a quick record of what has been done.",
    },
    outcome: "A working task list built with plain HTML, CSS, and JavaScript.",
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

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
    summary: "A mobile travel app for booking flights, hotels, cars, and activities, with ride-sharing, split pay, and shared itineraries built in.",
    role: "UX/UI designer",
    timeline: "",
    tools: ["Figma"],
    toolsFull: "Figma",
    live: "",
    github: "",
    // Figma file (make sure sharing is set to "Anyone with the link can view").
    figma: "https://www.figma.com/design/moR93Ms00a7XKE2YRnnyz1/travel-app-wireframe?node-id=0-1",
    prototype: "",
    palette: { bg: "#E7E1DA", surface: "#FFFFFF", accent: "#D5726A", ink: "#232F40" },
    designSystem: {
      colors: [
        { name: "Navy", hex: "#232F40" },
        { name: "Ink", hex: "#20242C" },
        { name: "Slate", hex: "#6B7280" },
        { name: "Terracotta", hex: "#B24C4C" },
        { name: "Coral", hex: "#D5726A" },
        { name: "Linen", hex: "#E7E1DA" },
        { name: "Tan", hex: "#E0AD87" },
        { name: "Mauve", hex: "#A5677A" },
        { name: "Forest", hex: "#32694C" },
        { name: "Mint", hex: "#E5F2E9" },
      ],
      fonts: [
        { name: "Playfair Display", role: "Display", family: "'Playfair Display', Georgia, serif" },
        { name: "Libre Franklin", role: "Interface", family: "'Libre Franklin', system-ui, sans-serif" },
      ],
      googleFonts: "Playfair+Display:ital,wght@0,400;0,700;0,800;1,400&family=Libre+Franklin:wght@400;500;600;700",
    },
    overview: {
      heading: "One app for the whole trip, not just the booking.",
      body: "Booking apps stop at the confirmation screen. Waypoint keeps going: a ride to the airport, a way to split the cost with the people you're traveling with, and an itinerary you can actually share, alongside the usual flight, hotel, car, and activity search.",
    },
    process: [
      { label: "Research", text: "Looked at what Kayak and Expedia get right and where travelers get stranded, then defined the target user: the independent multi-stop planner." },
      { label: "User flow", text: "Mapped the full journey from welcome and login through search, booking, and the itinerary, across hotels, flights, cars, and activities.", chips: ["Hotels", "Flights", "Cars", "Activities", "Checkout", "Itinerary"] },
      { label: "Low-fi to high-fi", text: "Took every screen from wireframe to a finished UI: round-trip and one-way flights, both drop-off options for cars, and the full activity booking flow." },
      { label: "Differentiators", text: "Designed four features Kayak and Expedia don't have.", chips: ["Deal Bundles", "Ride-sharing", "Split Pay", "Itinerary Sharing"] },
    ],
    decision: {
      title: "A trip doesn't end at checkout.",
      body: "Splitting a hotel bill or getting to the airport are still part of the trip, so Split Pay and ride-sharing live in the same app as the booking, instead of forcing a group chat and three other apps to finish the job.",
    },
    outcome: "A complete high-fidelity flow in Figma: search and booking for hotels, flights, cars, and activities, plus Deal Bundles, ride-sharing, Split Pay, and shared itineraries.",
    learned: "",
    next: "",
  },

  {
    slug: "shelf-life",
    title: "Shelf Life",
    subtitle: "Pantry App",
    category: "UI/UX",
    year: "2026",
    status: "In progress",
    summary: "A shared pantry and grocery app: scan a receipt, see what to use first, and cook from what's already there, with roommates and family on the same list.",
    role: "Designer + full-stack developer",
    timeline: "",
    tools: ["Figma", "React", "TypeScript", "Tailwind CSS"],
    toolsFull: "Figma, React, TypeScript, Tailwind CSS, Radix UI, Yjs, Tesseract.js, Hono, PostgreSQL, Better Auth, Gemini API",
    live: "https://shelf-life-red.vercel.app/",
    github: "https://github.com/ShrutiTokekar/shelf-life",
    figma: "https://www.figma.com/design/Mr5u4PhY3hIWfvGRFWWMkf/Shelf-Life-%E2%80%94-Hi-Fi-Wireframes?node-id=0-1",
    prototype: "",
    palette: { bg: "#FFFBF3", surface: "#FFFFFF", accent: "#C0D3B4", ink: "#2B3360" },
    designSystem: {
      colors: [
        { name: "Periwinkle", hex: "#4D5C9F" },
        { name: "Navy", hex: "#2B3360" },
        { name: "Slate blue", hex: "#555C80" },
        { name: "Sage", hex: "#46512F" },
        { name: "Sage light", hex: "#C0D3B4" },
        { name: "Cream", hex: "#FFFBF3" },
        { name: "Apricot", hex: "#FFE2A8" },
        { name: "Marigold", hex: "#F7C948" },
        { name: "Terracotta", hex: "#7E2E1C" },
        { name: "Clay", hex: "#6B3A00" },
      ],
      fonts: [
        { name: "Agbalumo", role: "Logo", family: "'Agbalumo', cursive" },
        { name: "Abril Fatface", role: "Display", family: "'Abril Fatface', Georgia, serif" },
        { name: "Fredoka", role: "Interface", family: "'Fredoka', system-ui, sans-serif" },
      ],
      googleFonts: "Agbalumo&family=Abril+Fatface&family=Fredoka:wght@400;500;600;700",
    },
    overview: {
      heading: "Use it before you lose it.",
      body: "Shared kitchens lose track of what's already there. Shelf Life turns a photo of a receipt into a pantry sorted by urgency, a daily list of the three things that need you most, and recipes ranked by how much expiring food they use.",
    },
    process: [
      { label: "Today", text: "A priority list, not a dashboard: the one or two things that actually need attention today, ranked, with a one-tap action for each." },
      { label: "Pantry", text: "Everything shelved by urgency instead of alphabetically, so what's about to go off is the first thing you see." },
      { label: "Grocery list", text: "A shared list where anyone can claim an item, see who's getting what, and have it move into the pantry automatically once it's checked off." },
      { label: "Recipes", text: "Recipes ranked by how much expiring food they'd use, each one explaining why it's the best match for what's in the pantry right now." },
    ],
    decision: {
      title: "Receipt photos never leave the device.",
      body: "On-device OCR turns a receipt into pantry items without the photo ever being uploaded anywhere, and sharing a list never requires an invite code: lists are shared by an expiring link instead.",
    },
    outcome: "Live and working: Today, Pantry, shared grocery lists, and AI-ranked recipes, built from a complete hi-fidelity Figma file. Receipt scanning and cook-along are still in progress.",
    learned: "",
    next: "",
  },

  {
    slug: "munchies",
    title: "Munchies",
    subtitle: "Food Delivery App",
    category: "UI/UX",
    year: "2026",
    status: "In progress",
    summary: "A food delivery app built around feeding a household: allergy-safe search, a shared weekly budget, and batch ordering for the whole family.",
    role: "UX/UI designer",
    timeline: "",
    tools: ["Figma", "FigJam"],
    toolsFull: "Figma, FigJam",
    live: "",
    github: "",
    figma: "https://www.figma.com/design/YKhfy8TsNdx6pIo9gK29Y0/munchies?node-id=0-1",
    prototype: "",
    palette: { bg: "#F5F7FC", surface: "#FFFFFF", accent: "#DDDBF1", ink: "#3C4F76" },
    designSystem: {
      colors: [
        { name: "Navy", hex: "#3C4F76" },
        { name: "Ink", hex: "#14171C" },
        { name: "Slate", hex: "#383F51" },
        { name: "Warm gray", hex: "#AB9F9D" },
        { name: "Lavender", hex: "#DDDBF1" },
        { name: "Sand", hex: "#EDE6E1" },
      ],
      fonts: [
        { name: "Batangas", role: "Headings" },
        { name: "Coustard", role: "Body" },
      ],
    },
    overview: {
      heading: "Craving satisfied, at a budget.",
      body: "Delivery apps assume one hungry person, not a household with allergies and a grocery budget to watch. Munchies is built for the person ordering for everyone: filters that respect each person's restrictions, and a weekly budget that warns before it's blown.",
    },
    processLabel: "The flow so far",
    processHeading: "Design system and user flow, screens next.",
    process: [
      { label: "Brand", text: "Named it Munchies, designed a bitten-“m” logo mark, and set the palette and type.", chips: ["Logo", "Palette", "Type"] },
      { label: "User flow", text: "Mapped the full flow in FigJam: account setup, food preferences and allergies per family member, search, checkout, and support, with every decision and error case.", chips: ["Onboarding", "Search", "Checkout", "Split Pay", "Tracking"] },
      { label: "Safety", text: "Built household safety into the flow itself: dishes are flagged safe or unsafe per person, and swaps need a person picked before they can be added." },
      { label: "Budget", text: "A weekly household budget that warns at 80% and offers batch delivery or item removal before checkout, instead of a surprise at the end." },
    ],
    outcome: "Design system and full user flow are done. High-fidelity wireframes are next.",
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
  "shelf-life",
  "flow-state",
  "zenty",
  "waypoint",
  "munchies",
  "thrift-trails",
  "skinthesis",
  "portfolio",
  "todo-app",
];

export default [...caseStudies].sort(
  (a, b) => ORDER.indexOf(a.slug) - ORDER.indexOf(b.slug)
);

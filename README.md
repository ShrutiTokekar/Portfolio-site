# Shruti Tokekar — Personal Portfolio

A clean, modern, and responsive React application designed to showcase my projects, skills, and professional background. Built with a refined cream aesthetic, crash-animation hero, interactive terminal, and a contact form — the site offers a seamless experience across devices.

**Live site:** [shrutitokekar.com](https://shrutitokekar.com)

---

## Features

- Sleek, responsive UI with a handcrafted cream aesthetic
- Modern React component structure with client-side routing
- Crash-animation hero with particle effects and 3D typography
- Live terminal component reflecting current stack and projects
- Animated contact form powered by EmailJS — no backend required
- Smooth page transitions and hover interactions via CSS animations
- Dual portals for design and engineering work

---

## Tech Stack

| Layer | Technology |
|---|---|
| Frontend | React.js + Vite |
| Styling | Tailwind CSS + inline styles |
| Routing | React Router |
| Contact form | EmailJS |
| Deployment | Vercel |

---

## Project Structure

```
src/
├── assets/          # images and logos
├── components/
│   ├── Hero.jsx     # crash animation, terminal, portal cards
│   ├── About.jsx    # timeline, skills accordion, certificates
│   ├── DesignPortfolio.jsx
│   ├── Projects.jsx
│   ├── Contact.jsx
│   ├── Terminal.jsx # live terminal component
│   └── Footer.jsx
├── App.jsx          # main routing and layout
└── main.jsx         # entry point
public/
└── resume.pdf       # served with forced download header
vercel.json          # content-disposition header for resume
```

---

## Pages

| Route | Description |
|---|---|
| `/` | Hero with crash animation and terminal |
| `/about` | Timeline, skills accordion, certificates |
| `/design` | UI/UX and web design projects |
| `/projects` | Engineering and development projects |
| `/contact` | Contact form and links |

---

## Running Locally

```bash
npm install
npm run dev
```

Open [http://localhost:5173](http://localhost:5173)

## Building for Production

```bash
npm run build
npm run preview
```

---

## Deployment

Deployed on Vercel. Every push to `master` triggers an automatic redeploy.

The `vercel.json` sets a `Content-Disposition: attachment` header on `/resume.pdf` so it downloads directly rather than opening in the browser.

---

## Author

**Shruti Tokekar**
B.S. Computer Science, Minor in Graphic & Web Design — East Stroudsburg University
Developer · Designer · Creative Technologist
Allentown, PA

- Email: [shrutitokekar@gmail.com](mailto:shrutitokekar@gmail.com)
- Website: [shrutitokekar.com](https://shrutitokekar.com)
- GitHub: [github.com/shrutitokekar](https://github.com/shrutitokekar)
- LinkedIn: [linkedin.com/in/shruti-tokekar](https://linkedin.com/in/shruti-tokekar)

---

© 2026 Shruti Tokekar. All rights reserved.
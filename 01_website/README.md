# Sesame3 Marketing Website

The marketing website for Sesame3 — College Prep, Reimagined.

## Tech Stack

- **Framework:** Next.js 15 (App Router)
- **Styling:** Tailwind CSS v4
- **Fonts:** Bebas Neue, DM Sans, JetBrains Mono
- **Deployment:** DigitalOcean App Platform (or Vercel)

## Getting Started

### Prerequisites

- Node.js 18.17 or later
- npm

### Installation

```bash
# Install dependencies
npm install

# Start development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the site.

### Build for Production

```bash
npm run build
npm start
```

## Project Structure

```
src/
├── app/
│   ├── layout.tsx        # Root layout with fonts
│   ├── globals.css       # Design system tokens
│   ├── page.tsx          # Homepage
│   ├── pricing/          # Pricing page
│   ├── privacy/          # Privacy policy
│   └── terms/            # Terms of service
├── components/
│   ├── ui/               # Reusable UI components
│   ├── layout/           # Header, Footer
│   ├── sections/         # Page sections
│   └── icons/            # SVG icons
└── lib/                  # Utilities and constants
```

## Design System

- **Primary Accent:** Cyan (`#00E5FF`)
- **Background:** Dark (`#0A0A0A`)
- **Typography:** 
  - Headlines: Bebas Neue
  - Body: DM Sans
  - Data/Mono: JetBrains Mono

## Pages

| Route | Description |
|-------|-------------|
| `/` | Homepage |
| `/pricing` | Pricing tiers |
| `/privacy` | Privacy policy |
| `/terms` | Terms of service |

## License

Private - All rights reserved.

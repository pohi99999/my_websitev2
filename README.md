[![Netlify Status](https://api.netlify.com/api/v1/badges/2ba240e3-5ee4-402a-b0e6-2c1fc1671c98/deploy-status)](https://app.netlify.com/projects/pohankaestarsa/deploys)
# 🌐 Pohánka Company Website

Egy modern, production-ready Next.js website a Pohánka és Társa Kft. számára.

## 📖 Projekt Áttekintés

Ez a projekt egy teljes körű weboldalat tartalmaz, amely a **worldquant.com/brain/** modern design esztétikáját követi. Glassmorphism, Framer Motion animációk és Lucide React ikonok segítségével készült egy professional, interaktív felhasználói élmény.

### ✨ Jellemzések

- 🎨 **Modern Design** - Glassmorphism, gradient backgrounds, smooth animations
- 📱 **Fully Responsive** - Mobile-first approach, optimized for all devices
- ⚡ **Fast Performance** - Next.js App Router, optimized rendering
- 🔍 **SEO Optimized** - Sitemap, robots.txt, JSON-LD schema
- 🎬 **Smooth Animations** - Framer Motion scroll triggers and hover effects
- 🎯 **Dynamic Content** - Blog posts, portfolio projects with dynamic routing
- 📊 **Interactive Features** - Form validation, filtering, search functionality

---

## 🚀 Gyors Start

### Követelmények

- Node.js 18+
- npm vagy yarn

### Telepítés

```bash
# 1. Repository klónozása
cd my_website

# 2. Függőségek telepítése
npm install

# 3. Development szerver indítása
npm run dev

# 4. Nyissa meg a böngészőjét
# http://localhost:3000
```

### Előkészítés Szerkesztéshez

```bash
# Watch mode (automatikus refresh)
npm run dev

# Build production verzióhoz
npm run build

# Production szerver futtatása
npm start
```

---

## 📁 Projekt Struktúra

```
my_website/
├── app/
│   ├── page.jsx                    # Homepage
│   ├── layout.tsx                  # Root layout + SEO
│   ├── globals.css                 # Component classes
│   ├── components/
│   │   ├── Header.tsx              # Navigation header
│   │   ├── Footer.tsx              # Footer component
│   │   └── FadeIn.tsx              # Scroll animation
│   ├── blog/
│   │   ├── page.jsx                # Blog listing
│   │   └── [slug]/page.jsx         # Blog post detail
│   ├── portfolio/
│   │   ├── page.jsx                # Portfolio listing
│   │   └── [id]/page.jsx           # Project detail
│   ├── termekek/                   # Products
│   │   ├── page.jsx                # Products listing
│   │   ├── pohi-ai-pro/page.jsx    # Product 1 detail
│   │   └── brunella-agents/page.jsx # Product 2 detail
│   ├── szolgaltatasok/page.jsx     # Services
│   ├── rolunk/page.jsx             # About
│   └── kapcsolat/page.jsx          # Contact
├── public/
│   ├── sitemap.xml                 # SEO sitemap
│   ├── robots.txt                  # Search engine config
│   └── favicon.ico                 # Browser icon
├── tailwind.config.ts              # Tailwind configuration
├── tsconfig.json                   # TypeScript config
├── package.json                    # Dependencies
├── PROJECT_SUMMARY.md              # Detailed documentation
├── CHECKLIST.md                    # Completion checklist
└── README.md                       # This file
```

---

## 🎨 Design System

### Color Palette

```css
Primary Dark: #0a0e27
Secondary Dark: #111938
Primary Blue: #00d4ff
Secondary Purple: #7c3aed
Tertiary Pink: #ec4899
Text Primary: #f0f9ff
Text Secondary: #cbd5e1
```

### Component Classes

```css
/* Cards */
.glass-card
.glass-card-interactive

/* Buttons */
.btn-primary
.btn-secondary

/* Forms */
.form-input

/* Typography */
.gradient-text
.section-title
.section-subtitle
```

### Animations

- **Background Blurs**: 20-25s infinite loops
- **Card Hover**: `whileHover={{ y: -5 }}`
- **Scale Effects**: `whileHover={{ scale: 1.05 }}`
- **Scroll Triggers**: Staggered FadeIn (0.1s delays)

---

## 🔧 Technológiák

### Frontend
- **Next.js 14+** - React framework with App Router
- **TypeScript/JSX** - Type-safe components
- **Tailwind CSS** - Utility-first CSS framework
- **Framer Motion** - Animation library
- **Lucide React** - Icon library

### Tools
- **Git** - Version control
- **Vercel** - Deployment (recommended)
- **SEO** - Sitemap, robots.txt, JSON-LD

---

## 📝 Oldalak Áttekintése

### 🏠 Homepage (`/`)
- Hero section with animated background
- Services showcase (3 cards)
- Products overview (2 featured)
- Statistics grid (4 metrics)
- Customer testimonials (3 quotes)
- Portfolio highlights (3 projects)
- About section with dual CTAs
- CTA section

### 🛠️ Services (`/szolgaltatasok`)
- Service overview
- Capabilities grid (4 cards)
- 4-step process section
- Technology stack (10 technologies)
- Why choose us section
- CTA to contact

### 🎁 Products (`/termekek`)
- Product listing (2 featured products)
- Each product with features and link to detail page
- Testimonials
- CTA section

#### Product Detail Pages
- **Pohi AI Pro** (`/termekek/pohi-ai-pro`)
  - 6 feature cards
  - 6 use case cards
  - 3-tier pricing
  - Integration section (6 technologies)
  - 2 testimonials
  - CTA for free trial

- **Brunella Agents** (`/termekek/brunella-agents`)
  - 6 feature cards
  - 6 use case cards
  - Statistics grid (4 metrics)
  - 4-step "How it works"
  - 3-tier pricing
  - 2 testimonials
  - CTA for demo

### 📚 Blog (`/blog`)
- Blog post listing with category filtering
- 6 category filter buttons
- Blog post grid (4 demo posts)
- Each post with: emoji, category, read time, title, excerpt, date
- Newsletter signup section

#### Blog Post Detail (`/blog/[slug]`)
- Post hero (title, date, author, category, read time)
- Featured image
- Full post content with formatting
- Share section
- Related posts (2-3 recommendations)
- Newsletter CTA

### 🎯 Portfolio (`/portfolio`)
- Portfolio project grid (9 projects)
- Search functionality
- Industry/technology filters
- Project statistics (50+ projects, 100+ clients, 15+ years, 25+ technologies)
- Technology stack section
- CTA to contact

#### Portfolio Project Detail (`/portfolio/[id]`)
- Project hero with emoji and metadata
- Challenge section
- Solution section
- Results grid (4 key metrics with improvements)
- 5-star testimonial from client
- Technologies used (all 9 tech stack items)
- Related projects (2-3 recommendations)
- CTA to contact

### 📖 About (`/rolunk`)
- Company mission and description
- Company values (3 cards)
- Team statistics (4 roles)
- Company statistics (4 metrics)
- Technology stack (10 technologies)
- CTA to contact

### 📞 Contact (`/kapcsolat`)
- Contact methods (3 cards: phone, email, location)
- Contact form (name, email, subject, message, consent)
- Success feedback message
- Office hours (2 cards)
- CTA to about page

---

## 🔍 SEO Features

### Sitemap
- 20+ URLs included
- Automatic priority and frequency
- Located at `/public/sitemap.xml`

### Robots.txt
- Search engine guidelines
- Crawl delay configuration
- Sitemap reference

### JSON-LD Schema
- Organization schema
- LocalBusiness schema
- Structured data for search engines

### Meta Tags
- Meta descriptions on all pages
- Keywords optimization
- OpenGraph tags (og:title, og:description, og:url)
- Twitter card support
- Canonical URLs

---

## 🎬 Animation System

### Framer Motion Components

```jsx
// Animated blur backgrounds
<motion.div
  animate={{ x: [0, 50, 0], y: [0, 30, 0] }}
  transition={{ duration: 20, repeat: Infinity }}
/>

// Card hover effect
<motion.div whileHover={{ y: -5 }} />

// Scale on interaction
<motion.div whileHover={{ scale: 1.05 }} />

// Scroll trigger with stagger
<FadeIn delay={0.1 * index} />
```

### FadeIn Component
- Intersection Observer-based
- Configurable delays for staggering
- Smooth fade-in on scroll

---

## 📊 Content Management

### Blog Posts
Located in: `/blog/[slug]/page.jsx`

To add a new blog post:
1. Add post object to `blogPosts` object in `[slug]/page.jsx`
2. Include: title, date, author, readTime, category, image, excerpt, content, relatedPosts
3. URL will be automatically: `/blog/{slug}`

### Portfolio Projects
Located in: `/portfolio/[id]/page.jsx`

To add a new project:
1. Add project object to `projects` object in `[id]/page.jsx`
2. Include: title, client, industry, image, date, description, challenge, solution, results, technologies, testimonial, relatedProjects
3. URL will be automatically: `/portfolio/{id}`

---

## 🚀 Deployment

### Vercel (Recommended)

```bash
# Connect to Vercel
npm run build

# Push to GitHub
git push origin main

# Vercel will automatically deploy
```

### Manual Deployment

```bash
# Build for production
npm run build

# Test production build locally
npm start

# Deploy to your hosting provider
```

### Environment Variables
Create `.env.local`:
```
NEXT_PUBLIC_SITE_URL=https://pohanka.company
NEXT_PUBLIC_API_URL=https://api.pohanka.company
```

---

## 📈 Performance Optimization

### Lighthouse Targets
- Performance: 90+
- Accessibility: 85+
- Best Practices: 90+
- SEO: 95+

### Optimizations Applied
- Image optimization (Lucide React SVGs)
- CSS optimization (Tailwind purging)
- Code splitting (Next.js App Router)
- Lazy loading (dynamic imports)
- Font optimization (Next.js Font)

---

## 🐛 Troubleshooting

### Common Issues

**Port already in use**
```bash
npm run dev -- -p 3001
```

**CSS not loading**
```bash
# Clear Tailwind cache
rm -rf .next
npm run dev
```

**Build errors**
```bash
# Clean install
rm -rf node_modules package-lock.json
npm install
npm run build
```

---

## 📚 Documentation Files

- **PROJECT_SUMMARY.md** - Comprehensive project documentation
- **CHECKLIST.md** - Completion status and verification
- **README.md** - This file

---

## 👥 Team & Support

### Development Team
- Lead Developer: [Your Name]
- Designer: [Designer Name]
- Project Manager: [PM Name]

### Contact
- Email: info@pohanka.company
- Phone: +36-1-xxx-xxxx
- Website: https://pohanka.company

---

## 📄 License

This project is proprietary and confidential.

---

## 🎯 Roadmap

### Short Term (1-2 weeks)
- [ ] Form submission email service
- [ ] Google Analytics integration
- [ ] Newsletter subscription backend
- [ ] Performance optimization

### Medium Term (1 month)
- [ ] CMS integration (Contentful/Strapi)
- [ ] Blog search functionality
- [ ] Advanced portfolio filters
- [ ] Multi-language support (EN, DE, RO)

### Long Term (2-3 months)
- [ ] E-commerce integration
- [ ] Client portal
- [ ] API documentation
- [ ] Knowledge base / FAQ

---

## 🎉 Acknowledgments

This website showcases modern web development best practices using cutting-edge technologies.

---

**Version**: 1.0.0  
**Last Updated**: January 20, 2024  
**Status**: ✅ Production Ready  

**Enjoy your beautiful new website! 🚀**

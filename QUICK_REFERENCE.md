# 🎯 Development Quick Reference Guide

## 🚀 Gyors Parancsok

```bash
# Projekt elindítása
npm run dev                  # Dev szerver (port 3000)

# Új oldal hozzáadása
cp app/page.jsx app/new-page/page.jsx

# Build & Deploy
npm run build               # Production build
npm start                   # Production szerver

# Takarítás
npm run lint                # ESLint check
rm -rf .next                # Cache törlés
```

---

## 📝 Template - Új Oldal Létrehozása

```jsx
'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import FadeIn from '../components/FadeIn';
import { ArrowRight } from 'lucide-react';

export default function NewPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-dark via-dark-light to-dark text-white">
      {/* Hero Section */}
      <section className="relative py-24 px-6 pt-32 overflow-hidden">
        <motion.div
          className="absolute top-10 left-10 w-80 h-80 bg-blue-500/30 rounded-full blur-3xl"
          animate={{ x: [0, 50, 0], y: [0, 30, 0] }}
          transition={{ duration: 20, repeat: Infinity }}
        />

        <div className="max-w-6xl mx-auto relative z-10">
          <FadeIn>
            <h1 className="text-5xl sm:text-7xl font-bold mb-6 gradient-text">
              Page Title
            </h1>
            <p className="text-xl text-gray-300 max-w-2xl">
              Page description
            </p>
          </FadeIn>
        </div>
      </section>

      {/* Content Section */}
      <section className="py-24 px-6">
        <div className="max-w-6xl mx-auto">
          <FadeIn delay={0.2}>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {/* Content here */}
            </div>
          </FadeIn>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 px-6">
        <div className="max-w-4xl mx-auto">
          <FadeIn>
            <motion.div className="glass-card p-12 sm:p-16 text-center">
              <h2 className="text-4xl font-bold mb-6 gradient-text">
                Call to Action
              </h2>
              <p className="text-lg text-gray-300 mb-8">
                CTA Description
              </p>
              <Link href="/kapcsolat" className="btn-primary text-lg">
                Get Started
              </Link>
            </motion.div>
          </FadeIn>
        </div>
      </section>
    </div>
  );
}
```

---

## 🎨 Gyakori Komponensek

### Glass Card
```jsx
<motion.div
  className="glass-card p-8"
  whileHover={{ y: -5 }}
>
  {/* Content */}
</motion.div>
```

### Button
```jsx
<Link href="/page" className="btn-primary">
  Button Text
</Link>

<button className="btn-secondary">
  Secondary Button
</button>
```

### Form Input
```jsx
<input
  type="text"
  placeholder="Enter text..."
  className="form-input w-full"
  value={value}
  onChange={(e) => setValue(e.target.value)}
/>
```

### Feature List
```jsx
{features.map((feature, idx) => (
  <FadeIn key={idx} delay={idx * 0.1}>
    <motion.div className="glass-card p-8" whileHover={{ y: -5 }}>
      <div className="flex items-start gap-4">
        <Icon className="w-6 h-6 text-blue-400 flex-shrink-0" />
        <div>
          <h3 className="text-lg font-bold mb-2">{feature.title}</h3>
          <p className="text-gray-300">{feature.description}</p>
        </div>
      </div>
    </motion.div>
  </FadeIn>
))}
```

### Gradient Text
```jsx
<h1 className="gradient-text text-5xl font-bold">
  Gradient Text Heading
</h1>
```

### Animated Background Blur
```jsx
<motion.div
  className="absolute top-10 left-10 w-80 h-80 bg-blue-500/30 rounded-full blur-3xl"
  animate={{ x: [0, 50, 0], y: [0, 30, 0] }}
  transition={{ duration: 20, repeat: Infinity }}
/>
```

---

## 🔍 Tailwind Classes Referencia

### Colors
```css
from-dark                    /* #0a0e27 */
from-dark-light              /* #111938 */
from-brand-blue              /* #00d4ff */
from-brand-purple            /* #7c3aed */
from-brand-pink              /* #ec4899 */
text-text-primary            /* #f0f9ff */
text-text-secondary          /* #cbd5e1 */
```

### Typography
```css
text-5xl font-bold gradient-text
text-4xl font-bold
text-xl text-gray-300
text-sm text-gray-400
```

### Layout
```css
max-w-6xl mx-auto            /* Max width container */
px-6 py-24                   /* Padding */
grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8
flex flex-col sm:flex-row gap-4
```

### Effects
```css
glass-card                   /* Glassmorphism */
glass-card-interactive       /* Interactive glass */
btn-primary                  /* Primary button */
btn-secondary                /* Secondary button */
form-input                   /* Form input */
rounded-full blur-3xl        /* Blur effect */
backdrop-blur-md             /* Backdrop blur */
```

---

## 🎬 Framer Motion Patterns

### Hover Effect
```jsx
<motion.div whileHover={{ y: -5 }}>
  Hovers up 5px
</motion.div>
```

### Scale Effect
```jsx
<motion.div whileHover={{ scale: 1.05 }}>
  Scales to 105%
</motion.div>
```

### Animated Loop
```jsx
<motion.div
  animate={{ x: [0, 50, 0], y: [0, 30, 0] }}
  transition={{ duration: 20, repeat: Infinity }}
>
  Animated blur background
</motion.div>
```

### Staggered Animation
```jsx
{items.map((item, idx) => (
  <FadeIn key={idx} delay={idx * 0.1}>
    {item}
  </FadeIn>
))}
```

---

## 📱 Responsive Breakpoints

```css
Mobile:    < 640px           (default)
Tablet:    sm: 640px - 1024px
Desktop:   md: 768px+
Large:     lg: 1024px+
```

### Responsive Grid
```css
grid-cols-1              /* Mobile */
sm:grid-cols-2           /* Tablet */
md:grid-cols-3           /* Desktop */
lg:grid-cols-4           /* Large */
```

---

## 🔗 Navigation Links

```jsx
// Internal link
<Link href="/">Home</Link>
<Link href="/blog">Blog</Link>
<Link href="/portfolio/1">Project 1</Link>

// With icon
<Link href="/kontakt" className="inline-flex items-center gap-2">
  Contact <ArrowRight className="w-4 h-4" />
</Link>
```

---

## 💾 File Naming Conventions

```
Components:     PascalCase.tsx
Pages:          lowercase.jsx or page.jsx
Dynamic routes: [param].jsx
Styles:         globals.css
Config:         tailwind.config.ts
```

---

## 🐛 Common Issues & Solutions

### Issue: Tailwind not applying
**Solution**: Clear cache
```bash
rm -rf .next && npm run dev
```

### Issue: Icons not showing
**Solution**: Check lucide-react import
```jsx
import { IconName } from 'lucide-react';
```

### Issue: Animations lagging
**Solution**: Use `will-change` or reduce animation complexity
```css
will-change: transform;
```

### Issue: Form not working
**Solution**: Use 'use client' and useState
```jsx
'use client';
const [value, setValue] = useState('');
```

---

## 📊 Performance Tips

1. **Image optimization**: Use SVG icons (Lucide React)
2. **CSS optimization**: Tailwind purges unused classes
3. **Component lazy loading**: Use dynamic imports
4. **Animation performance**: Use transform/opacity only
5. **Code splitting**: Next.js handles automatically

---

## 🌍 SEO Optimization Checklist

- [ ] Meta description added
- [ ] Keywords set
- [ ] OpenGraph tags configured
- [ ] Canonical URL set
- [ ] Sitemap updated
- [ ] Internal links added
- [ ] Alt text for images
- [ ] Proper heading hierarchy

---

## 📚 Helpful Resources

- [Next.js Docs](https://nextjs.org/docs)
- [Tailwind CSS Docs](https://tailwindcss.com/docs)
- [Framer Motion Docs](https://www.framer.com/motion)
- [Lucide React Icons](https://lucide.dev)
- [React Hooks](https://react.dev/reference/react)

---

## 🎯 Development Workflow

1. **Plan** - Sketch/design in Figma
2. **Create Template** - Use template above
3. **Add Content** - Update JSX
4. **Style** - Use Tailwind classes
5. **Animate** - Add Framer Motion
6. **Test** - `npm run dev` and verify
7. **Optimize** - Check performance
8. **Deploy** - Build and push

---

## 💡 Pro Tips

✅ Always use `gradient-text` for headings  
✅ Use `glass-card` for containers  
✅ Add `FadeIn` to sections for animations  
✅ Use `whileHover={{ y: -5 }}` for cards  
✅ Keep animations under 25s for smooth loops  
✅ Use `max-w-6xl mx-auto` for width constraint  
✅ Test on mobile first  
✅ Use semantic HTML  

---

**Happy Coding! 🚀**

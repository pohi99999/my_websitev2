# Technical SEO and Performance Optimization Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Enhance technical SEO, add structured JSON-LD schema markup, optimize meta tags & image alt texts, update sitemap & robots.txt, and optimize hero video LCP performance for pohankaestarsa.com.

**Architecture:** Next.js (App Router) layout metadata, JSON-LD Schema.org script injection, image accessibility attributes, deferred video loading for Core Web Vitals optimization, and updated sitemap XML.

**Tech Stack:** Next.js 14+ (App Router), React 18, TypeScript, Schema.org (JSON-LD), Tailwind CSS.

---

### Task 1: Add Organization & LocalBusiness JSON-LD Schema to Root Layout

**Files:**
- Modify: `app/layout.tsx`

- [ ] **Step 1: Define JSON-LD schema object in `app/layout.tsx`**

Add standard Schema.org `Organization` / `ProfessionalService` JSON-LD object containing company details, logo, address, phone, email, social links, and offered services.

- [ ] **Step 2: Inject script tag into RootLayout**

Inject `<script id="schema-org-jsonld" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />` inside `<body>` or `<head>` in `app/layout.tsx`.

---

### Task 2: Optimize Meta Tags & OpenGraph Data

**Files:**
- Modify: `app/layout.tsx`
- Modify: `app/page.jsx`

- [ ] **Step 1: Update root metadata in `app/layout.tsx`**

Refine title template, default title, description (150-160 chars with target keywords: Brunella agents, professzionális ügynöki képviselet, termékvédelem), keywords, OpenGraph, and Twitter tags.

- [ ] **Step 2: Update homepage metadata in `app/page.jsx`**

Update `generateMetadata()` for Hungarian, English, and German locales with targeted titles and descriptions.

---

### Task 3: Image SEO and Accessibility Improvements

**Files:**
- Modify: `app/components/GlobalVideoBackground.tsx`
- Modify: `app/components/Header.tsx`
- Modify: `app/components/Navbar.tsx`

- [ ] **Step 1: Add descriptive alt text to background image**

In `GlobalVideoBackground.tsx`, change `alt=""` to `alt="Pohánka és Társa - Professzionális ügynöki képviselet háttérkép"`.

- [ ] **Step 2: Enhance logo alt text in Header and Navbar**

Update logo `alt` attribute to `"Pohánka és Társa - Professzionális Ügynöki Képviselet és AI Rendszerek Logo"`.

---

### Task 4: Enhance Robots.txt and Sitemap.xml

**Files:**
- Modify: `public/robots.txt`
- Modify: `public/sitemap.xml`

- [ ] **Step 1: Verify `public/robots.txt`**

Ensure `Sitemap: https://www.pohankaestarsa.com/sitemap.xml` is present.

- [ ] **Step 2: Expand `public/sitemap.xml`**

Update `<lastmod>` to `2026-07-24` and add missing landing pages (`/termekek/brunella-agents`, `/termekek/pohi-ai-pro`, `/weboldal-ai-kkv`, `/hatekonysagi-audit`, `/fogalomtar`).

---

### Task 5: Video & Performance (LCP) Optimization

**Files:**
- Modify: `app/components/SequentialVideoBackground.tsx`

- [ ] **Step 1: Ensure background videos use `preload="metadata"`**

Set `preload="metadata"` on `<video>` tags in `SequentialVideoBackground.tsx` so video downloading doesn't block critical page render or LCP.

---

### Task 6: Build Verification and Deployment

- [ ] **Step 1: Execute `npm run build`**

Run local build to verify zero compilation or TypeScript errors.

- [ ] **Step 2: Commit and push changes to GitHub**

Stage changes, create a git commit, and push to main for Vercel auto-deployment.

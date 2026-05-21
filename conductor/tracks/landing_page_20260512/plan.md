# Implementation Plan: Weboldal + AI KKV-knak landing oldal

## Phase 1: Preparation & Scaffolding
- [~] Task: Create new page directory and initial page file
    - [ ] Create `app/weboldal-ai-kkv/page.tsx`
    - [ ] Implement basic layout shell following existing patterns
- [ ] Task: Update navigation
    - [ ] Add link to `Header.tsx` (Desktop menu)
    - [ ] Add link to `Header.tsx` (Mobile menu)
- [ ] Task: Conductor - User Manual Verification 'Preparation & Scaffolding' (Protocol in workflow.md)

## Phase 2: Content Implementation
- [ ] Task: Implement Hero Section
    - [ ] Write tests for Hero content
    - [ ] Create Hero component with provided text and CTA buttons
- [ ] Task: Implement "Kinek szól?" and "Mit kapsz?" sections
    - [ ] Write tests for section rendering
    - [ ] Create components for value propositions and target audience
- [ ] Task: Implement Packages (Pricing) section
    - [ ] Write tests for package comparison
    - [ ] Create responsive package grid with detailed features
- [ ] Task: Implement Process and Trust sections
    - [ ] Create "Hogyan dolgozunk" 3-step visualization
    - [ ] Implement references and FAQ blocks
- [ ] Task: Implement Final CTA
    - [ ] Create closing section with consultation booking link
- [ ] Task: Conductor - User Manual Verification 'Content Implementation' (Protocol in workflow.md)

## Phase 3: Styling & Responsiveness
- [ ] Task: Refine Responsive Design
    - [ ] Check margins and padding on mobile viewport
    - [ ] Ensure proper stacking of grid elements
- [ ] Task: Add Animations
    - [ ] Implement Framer Motion / GSAP effects as per guidelines
- [ ] Task: Conductor - User Manual Verification 'Styling & Responsiveness' (Protocol in workflow.md)

## Phase 4: Quality Assurance & Deployment
- [ ] Task: E2E Testing with Playwright
    - [ ] Create `tests/landing-page.spec.ts`
    - [ ] Add tests for desktop and mobile viewports
    - [ ] Verify all links and CTA button interactions
- [ ] Task: Final Build Check
    - [ ] Run `npm run build` locally
- [ ] Task: Git Push
    - [ ] Commit changes with message "feat: add Weboldal + AI KKV-knak landing page and tests"
    - [ ] Push to origin main
- [ ] Task: Conductor - User Manual Verification 'Quality Assurance & Deployment' (Protocol in workflow.md)
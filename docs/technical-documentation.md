
# Technical Documentation

**Author:** Sana Ghassan Alfaioumi (202341870)
**Project:** Portfolio Website (Assignment 1)

---

## 1. Structure (HTML5)

- Written with semantic tags (`<header>`, `<nav>`, `<main>`, `<section>`, `<article>`, `<footer>`) instead of generic divisions.
- Includes a hidden "skip link" at the top so keyboard and screen-reader users can jump straight to the content without tabbing through the navigation every time.
- Forms use native validation attributes (`required`, `minlength`, `type="email"`) to ensure clean input before submission.

---

## 2. Design & Styling (CSS3)

- **Design System:** Colors and fonts are organized using CSS variables at the top of the stylesheet for easy theme switching.
- **Layout:** Built entirely with CSS Grid and Flexbox—no external CSS libraries or frameworks were used.
- **Responsive:** Fluid typography (`clamp`) and media queries allow the layout to adapt smoothly from mobile screens up to desktop monitors.
- **Motion Preferences:** Includes a `@media (prefers-reduced-motion)` check to turn off smooth scrolling for users who prefer minimal animation.

---

## 3. Interactive Features (JavaScript)

- **Theme Toggle:** Switches between light and dark mode, checks what the user's computer prefers by default, and remembers the choice using `localStorage`.
- **Time-Based Greeting:** Reads the visitor's local hour to say "Good morning," "Good afternoon," or "Good evening" dynamically.
- **Contact Form Demo:** Uses `e.preventDefault()` so the page doesn't refresh on submit, checks that the fields are valid, and displays an immediate friendly thank-you note.
- **Footer Year:** Updates the copyright year dynamically with `new Date().getFullYear()`.

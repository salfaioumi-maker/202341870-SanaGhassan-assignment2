
# Technical Documentation

**Author:** Sana Ghassan Alfaioumi (202341870)
**Project:** Portfolio Website (Assignment 2)

---

## 1. Structure (HTML5)

- Written with semantic tags (`<header>`, `<nav>`, `<main>`, `<section>`, `<article>`, `<figure>`, `<footer>`) instead of generic divisions.
- Includes a hidden "skip link" at the top so keyboard and screen-reader users can jump straight to the content without tabbing through the navigation every time.
- Forms use native validation attributes (`required`, `minlength`, `type="email"`) to ensure clean input before submission.
- **New in Assignment 2:**
  - Each project card has a `data-category` attribute (`ml`, `analysis`, `training`) that the filter buttons use to match cards.
  - The search box has a visually hidden `<label>` so screen readers can announce it, and the filter buttons use `aria-pressed` to show which one is selected.
  - The project counter and the artwork card use `aria-live="polite"`, so screen readers announce changes ("Showing 1 of 3 projects", loading, error) without the user having to look for them.
  - The Daily Inspiration card contains three states in the HTML (loading, error, artwork); all but one start with the `hidden` attribute and JavaScript switches between them.

---

## 2. Design & Styling (CSS3)

- **Design System:** Colors and fonts are organized using CSS variables at the top of the stylesheet for easy theme switching. All new components use the same variables, so they automatically work in dark mode.
- **Layout:** Built entirely with CSS Grid and Flexbox—no external CSS libraries or frameworks were used.
- **Responsive:** Fluid typography (`clamp`) and media queries allow the layout to adapt smoothly from mobile screens up to desktop monitors. The filter controls use `flex-wrap` so the buttons drop under the search box on small screens.
- **Motion Preferences:** Includes a `@media (prefers-reduced-motion)` check to turn off smooth scrolling and animations for users who prefer minimal animation.
- **New in Assignment 2 – Animations & Transitions:**
  - `@keyframes cardIn` fades and slides elements up into place. It is reused for project cards that reappear after filtering, the "No projects match" box, the error message, and the loaded artwork.
  - `@keyframes spin` rotates the loading spinner.
  - Filter buttons use `transition` + `transform` to lift on hover and press down on click (`:active`).
  - The search box shows a soft green glow on focus using `box-shadow` instead of a hard outline.
- **Hidden states:** `.art-card [hidden] { display: none; }` makes sure elements with the `hidden` attribute really disappear, even though `.art-status` sets `display: flex` (which would otherwise override `hidden`).
- **Accessibility contrast:** The selected filter button uses white text on the pink accent in light mode and dark text in dark mode, so it stays readable in both.

---

## 3. Interactive Features (JavaScript)

All features start from one `DOMContentLoaded` listener, which calls a separate `init…` function for each feature. Each function first checks that its main HTML elements exist, so one missing element never breaks the rest of the page.

### From Assignment 1

- **Theme Toggle:** Switches between light and dark mode, checks what the user's computer prefers by default, and remembers the choice using `localStorage`.
- **Time-Based Greeting:** Reads the visitor's local hour to say "Good morning," "Good afternoon," or "Good evening" dynamically.
- **Contact Form Demo:** Uses `event.preventDefault()` so the page doesn't refresh on submit, checks that the fields are valid, and displays an immediate friendly thank-you note.
- **Footer Year:** Updates the copyright year dynamically with `new Date().getFullYear()`.

### New in Assignment 2

#### 3.1 Project Filter & Live Search — `initProjectFilter()`

| Step | What happens                                                                                                                                                                        |
| ---- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 1    | `activeFilter` stores the selected category (`"all"` at first).                                                                                                                 |
| 2    | Clicking a button updates `activeFilter`, moves the `is-active` class and `aria-pressed`, then calls `updateProjects()`.                                                    |
| 3    | Typing in the search box fires the `input` event, which also calls `updateProjects()`.                                                                                          |
| 4    | `updateProjects()` checks every card: it is shown only if it matches the category **and** its text contains the search query (case-insensitive).                            |
| 5    | Hidden cards get the `is-hidden` class; cards that come back get `is-entering`, which plays the fade-in. `void card.offsetWidth` forces the browser to restart the animation. |
| 6    | The counter text is updated, and the "No projects match" message is shown when 0 cards are visible.                                                                                 |

#### 3.2 Daily Inspiration (Public API) — `initArtwork()`

**API:** [Art Institute of Chicago API](https://api.artic.edu/docs/) — free, no API key required.

```
showState('loading')            → spinner visible, "Show another" disabled
        │
fetch(random page, 10 artworks, only needed fields)
        │
response.ok? ── no ──► throw error ─┐
        │ yes                       │
keep artworks with image_id         │
AND is_public_domain                │
        │                           │
none left? ── yes ──► throw error ──┤
        │ no                        │
pick one at random                  │
fill title, artist + date, alt text │
set image src (IIIF image server)   │
        │                           ▼
image onload → showState('artwork') catch → showState('error')
image error  → showState('error')        (console.error logs details)
```

- **`showState(state)`** keeps exactly one of the three states visible by toggling the `hidden` property, and disables the "Show another artwork" button while loading so it can't be clicked repeatedly.
- **Only needed data:** the request asks for only 6 fields (`fields=id,title,artist_display,date_display,image_id,is_public_domain`) to keep the response small and fast.
- **Image URL:** built from the API's `config.iiif_url` + the artwork's `image_id` + `/full/843,/0/default.jpg` (843px wide, the museum's recommended size). A fallback IIIF address is used if `config` is missing.
- **Waiting for the image:** the artwork is only shown in `imageEl.onload`, so the spinner stays until the picture has downloaded and everything appears together.
- **Safety:** text from the API is inserted with `textContent`, never `innerHTML`, so no outside content can run as code.
- **Error handling:** `try / catch` covers network failures, non-OK responses (e.g. 404/500), and pages with no usable artworks; an image `error` listener covers broken images. In every case the user sees a friendly message and a **Try again** button.

---

## 4. User Feedback Summary

| Situation                   | What the user sees                                                                 |
| --------------------------- | ---------------------------------------------------------------------------------- |
| Artwork loading             | Spinner + "Loading artwork…", disabled "Show another" button                      |
| Artwork failed              | Red message explaining what happened + **Try again** button                  |
| Search/filter finds nothing | Dashed box: "No projects match your search. Try a different keyword or click All." |
| Filter/search used          | "Showing X of 3 projects" counter                                                  |
| Contact form invalid        | Red message + browser validation hints                                             |
| Contact form sent           | Personalized thank-you message                                                     |

---

## 5. Performance & Compatibility

- No frameworks or libraries: only one HTML, one CSS, and one JS file, plus Google Fonts.
- Project images use `loading="lazy"`; the artwork request only asks for the fields it needs.
- Uses standard modern browser features (`fetch`, `async/await`, `classList`, CSS Grid/Flexbox, CSS variables) supported by current Chrome, Safari, Firefox, and Edge.
- Tested in Chrome and Safari on macOS, and with the device toolbar for mobile sizes.

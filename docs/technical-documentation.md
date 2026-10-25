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

### New in Assignment 2

#### a) Project Filter & Live Search — `initProjectFilter()`

The filter combines two conditions: the selected category button **and** the search text. A card is shown only if it matches both.

```
User clicks a button  ──┐
                        ├──►  updateProjects()
User types in search  ──┘          │
                                   ▼
              For each project card:
              matches category?  AND  text contains search?
                    │                        │
                  yes ──► show card (fade-in animation)
                  no  ──► hide card (class "is-hidden")
                                   │
                                   ▼
              Update counter: "Showing X of 3 projects"
              If X = 0 → show "No projects match your search"
```

- The search uses the `input` event, so results update on every keystroke.
- The search is case-insensitive (`toLowerCase()`) and checks all the text inside each card (title and description).
- To replay the fade-in animation, the code removes the animation class, forces the browser to recalculate the layout (`void card.offsetWidth`), and adds the class again.

#### b) Daily Inspiration (Public API) — `initArtwork()`

Loads a random artwork from the **Art Institute of Chicago API** (`https://api.artic.edu/api/v1/artworks`). No API key is needed.

```
Page loads / "Show another artwork" / "Try again"
                     │
                     ▼
        showState('loading')  →  spinner + "Loading artwork…", button disabled
                     │
                     ▼
     fetch() a random page of 10 artworks (pages 1–100)
                     │
         ┌───────────┴────────────┐
      success                   failure (offline, server error, no usable artwork)
         │                          │
         ▼                          ▼
 keep only artworks that      showState('error')
 are public domain AND        → friendly message + "Try again" button
 have an image                (technical details go to console.error)
         │
         ▼
 pick one at random, fill in title + artist + date,
 build image URL with the museum's IIIF image server
         │
         ▼
 wait for the image to finish downloading (img.onload)
         │
         ▼
 showState('artwork')  →  image + caption fade in together
```

- **Request:** `fetch()` with `async/await` and a `fields` parameter, so the API only returns the data the page needs (`id, title, artist_display, date_display, image_id, is_public_domain`). This keeps the response small and fast.
- **Image URL:** Built from the API's `iiif_url` and the artwork's `image_id`, e.g. `https://www.artic.edu/iiif/2/{image_id}/full/843,/0/default.jpg`. The width 843px is the size the museum recommends.
- **States:** A single `showState()` function controls which of the three states is visible, so the user always sees exactly one clear message.
- **Clean text:** The museum's artist names contain line breaks, which are replaced with commas.

---

## 4. Error Handling & User Feedback

| Situation                                      | What the user sees                                                                                                    |
| ---------------------------------------------- | --------------------------------------------------------------------------------------------------------------------- |
| Artwork is loading                             | Spinner + "Loading artwork…", "Show another artwork" button greyed out                                               |
| No internet / request blocked                  | "Sorry, the artwork couldn't load. Please check your internet connection and try again." + **Try again** button |
| Server error (e.g. 404, 500)                   | Same friendly message. `fetch()` does not treat these as errors, so the code checks `response.ok` itself          |
| Page has no public-domain artworks with images | Same friendly message. **Try again** loads a different random page                                              |
| Image fails to download                        | Same friendly message, through the image's `error` event                                                            |
| Search or filter finds no projects             | "No projects match your search. Try a different keyword or click 'All'."                                              |
| Contact form has empty or invalid fields       | "Please fill in every field before sending." in red, plus the browser's built-in field hints                          |
| Contact form sent                              | "Thanks, [name]! …" confirmation                                                                                     |

---

## 5. Performance

- No frameworks or libraries, only plain HTML, CSS, and JavaScript, so the page loads quickly.
- Project images use `loading="lazy"` so they load only when scrolled into view.
- The API request asks only for the needed fields and a small page of 10 results.
- Filtering only toggles CSS classes on existing elements and does not rebuild the page.
- The "Show another artwork" button is disabled while loading, which prevents repeated requests from fast clicking.

---

## 6. Browser Compatibility

- Uses widely supported modern features: CSS Grid, Flexbox, CSS variables, `fetch`, `async/await`, and optional chaining (`?.`). These work in current versions of Chrome, Safari, Firefox, and Edge.
- The layout was checked at phone, tablet, and desktop widths using browser Developer Tools.
- The Daily Inspiration section needs an internet connection. Without one, the friendly error message is shown, and the rest of the site still works.

---

## 7. Testing

| Test                                                  | Expected result                                              |
| ----------------------------------------------------- | ------------------------------------------------------------ |
| Click each filter button                              | Only matching projects show; counter updates                 |
| Type "python" in search                               | Only the stc tv project shows                                |
| Type "zzz" in search                                  | "No projects match" message appears                          |
| Load the page                                         | Spinner shows, then an artwork appears with title and artist |
| Click "Show another artwork"                          | A new artwork loads                                          |
| Turn on Offline mode in DevTools and click the button | Error message and "Try again" button appear                  |
| Go back online and click "Try again"                  | Artwork loads again                                          |
| Toggle dark mode                                      | All new sections switch colors correctly                     |
| Turn on "Reduce motion" in system settings            | Animations are turned off                                    |

---

## 8. Known Limitations

- The contact form is a front-end demo only. Messages are not sent anywhere because there is no backend server.
- The artwork comes from a random page, so sometimes a page has no public-domain artworks with images. In that case the error message appears, and "Try again" loads a different page.
- The Daily Inspiration section depends on the Art Institute of Chicago API being online.

# AI Usage Report

**Course:** SWE-363: Web Engineering & Development
**Student:** Sana Ghassan Alfaioumi (202341870)
**Assignment:** Assignment 2 – Interactive Features

---

## 1. Tools Used & Use Cases

| Tool (model)                                                | How I used it                                                                                                                                                                                                                                                                                                                                                                                                                                                    |
| ----------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Claude (Opus 5.5)**                                 | Explained the assignment requirements and the rubric in simple steps; generated starter code for the project filter/search (A01) and for the Daily Inspiration section based on my idea (A02); reviewed my edited HTML, CSS, and JavaScript and pointed out bugs and accessibility issues; drafted the README (A04) and technical documentation (A05) and this report (A06) for me to edit; helped me fix Git problems (branches, commits that were not pushed). |
| **GitHub Copilot (VS Code commit message generator)** | Generated commit messages from my staged changes (A03).                                                                                                                                                                                                                                                                                                                                                                                                          |

---

## 2. Usage Log

| ID  | Tool (model)             | Date                     | Purpose                                                                                                                                                               | Files affected                                       | What you changed and how you verified it                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              |
| --- | ------------------------ | ------------------------ | --------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| C01 | Claude (Opus 5.5)        | 2026-10-19 → 2026-10-25 | One continuous conversation: understanding the assignment, setting up the repository and branch, generating and reviewing code, debugging Git, drafting documentation | All files below                                      | Full conversation exported in the evidence ZIP (`conversations/`). I asked for explanations before pasting any code and checked each step in the browser and on GitHub.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                             |
| A01 | Claude (Opus 5.5)        | 2026-10-25               | Project filter buttons + live search + "No projects match" message                                                                                                    | `index.html`, `css/styles.css`, `js/script.js` | Redesigned the search box (pill shape, SVG search icon, green focus glow, hover state), added a pressed state to the buttons, changed the active button to my pink accent with dark text for contrast, restyled the empty-state box, improved the visually-hidden class, removed an unused transition, corrected an inaccurate AI comment, and added my own comments to the JavaScript. Also fixed 3 old CSS bugs from Assignment 1 (missing `.` in two selectors, broken footer comment). Verified by clicking every button and searching "python" and "zzz" in light and dark mode.                                                                                                               |
| A02 | Claude (Opus 5.5)        | 2026-10-25               | Daily Inspiration section (my idea): HTML, CSS, and JavaScript that loads an artwork from the Art Institute of Chicago API with loading/error states                  | `index.html`, `css/styles.css`, `js/script.js` | **HTML:** wrote my own intro text, added a spinner, reworded the error message, renamed classes to `art-content`, added image dimensions, moved "Show another artwork" outside the card. **CSS:** added `.art-card [hidden] { display: none; }`, which fixed a bug in the AI version where the error message would always be visible; made the card taller, faded in the error, used `object-fit: contain`. **JS:** added the artwork date, a fallback image-server URL, a single image error listener, a public-domain filter (`is_public_domain`), and increased the batch size to 50 to avoid false errors. Verified with the browser console and DevTools Offline mode. |
| A03 | GitHub Copilot (VS Code) | 2026-10-25               | Commit messages                                                                                                                                                       | Git history only                                     | Used the generated messages as suggested after reading that they matched the change. Copilot's commit-message feature does not produce a conversation log; the unedited messages are preserved in the commit history (see section 3).                                                                                                                                                                                                                                                                                                                                                                                                                                                                 |
| A04 | Claude (Opus 5.5)        | 2026-10-25               | README draft                                                                                                                                                          | `README.md`                                        | Rewrote the overview in my words, reorganized features into "New in Assignment 2" and "From Assignment 1", added the Offline-mode test tip and the warning about opening `index.html` from the project folder. Verified by previewing the Markdown in VS Code and on GitHub.                                                                                                                                                                                                                                                                                                                                                                                                                        |
| A05 | Claude (Opus 5.5)        | 2026-10-25               | Technical documentation draft                                                                                                                                         | `docs/technical-documentation.md`                  | Did not keep the draft: wrote my own version with my own flow diagrams and added Browser Compatibility, Testing, and Known Limitations sections. Claude only corrected the assignment number and the batch size (10 → 50) to match the code.                                                                                                                                                                                                                                                                                                                                                                                                                                                         |
| A06 | Claude (Opus 5.5)        | 2026-10-25               | Draft of this AI usage report                                                                                                                                         | `docs/ai-usage-report.md`                          | Checked every row against what I actually did and edited the wording.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 |

---

## 3. Commits Containing AI-Assisted Work

Commit messages for most commits were generated by GitHub Copilot (A03), so the `Assisted-by` line was missing from them. The AI assistance in those commits is declared here:

| Commit(s)                                                                                 | Content                                                     | AI IDs   |
| ----------------------------------------------------------------------------------------- | ----------------------------------------------------------- | -------- |
| `43ed0a4`, `a5566ce`, `86f8069`, `5bb845d`, `ad8af8e`, `79fc2f7`, `b7d79c9` | Project filter + live search                                | A01, A03 |
| `3296729`                                                                               | Fixing Assignment 1 CSS bugs (found during Claude's review) | C01, A03 |
| `fe4123e`, `555521b`, `d2a8444`, `c2dcda5`, `3cac67b`, `407aedb`              | Daily Inspiration section                                   | A02, A03 |
| `0126483`, `4efbaef`                                                                  | README                                                      | A04, A03 |
| `d745779`, `c8f6f0a`, `58d7fa9`                                                     | Technical documentation                                     | A05, A03 |

Later commits include `Assisted-by: Claude (Opus 5.5)` in the commit message.

---

## 4. Benefits & Challenges

* **Benefits:** Claude explained each requirement and each piece of code visually before I used it, which helped me understand how `fetch`, `async/await`, `try/catch`, and event listeners work together. Its reviews caught problems I would have missed, such as low colour contrast on the selected button and documentation that no longer matched the code.
* **Challenges:** The AI code was not perfect. The Daily Inspiration CSS would have shown the error message all the time because `display: flex` overrides the `hidden` attribute, and I fixed that myself. Fetching only 10 artworks and filtering for public domain could leave nothing to show and trigger a false error, so the batch size had to be increased. I also learned that VS Code's commit button and the terminal can conflict, which caused commits without the AI credit line.

---

## 5. Learning Outcomes

* How to load data from a public API with `fetch()` and `async/await`, check `response.ok`, and handle failures with `try / catch`.
* How to design clear loading, error, and empty states so the user always knows what happened and what to do next.
* How to filter elements with `data-*` attributes, the `input` event, and CSS classes, and how to restart a CSS animation.
* Why the `hidden` attribute can be overridden by CSS, and how to check colour contrast for accessibility.
* Using Git branches, and the difference between committing and pushing.

---

## 6. Responsible Use & Modifications

* **Original ideas:** The Daily Inspiration section was my own idea, connected to my interest in art. The personal texts on the site are written by me.
* **Understanding:** I asked Claude to explain each feature step by step before adding it, and I added my own comments to the code to show how it works.
* **Editing:** I edited every AI output (see the "What you changed" column). The original, unedited AI outputs are included in the evidence ZIP (`artifacts/`).
* **Testing:** I tested the features in the browser, including dark mode, the browser console, and DevTools Offline mode.

---

## 7. Declaration

> I declare that this report and the attached evidence document all of my AI use in this assignment, with complete and unedited conversations, and that I understand and can explain all the code I submitted. I understand that undeclared AI use or a false declaration will be treated as plagiarism according to KFUPM regulations.

**Name:** Sana Ghassan Alfaioumi
**Student ID:** 202341870
**Date:**

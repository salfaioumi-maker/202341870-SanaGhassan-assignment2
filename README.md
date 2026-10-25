# Personal Portfolio Website - Assignment 2

**Course:** SWE-363: Web Engineering & Development
**Student Name:** Sana Ghassan Alfaioumi
**Student ID:** 202341870
**Term:** Term 261

---

## 📌 Project Overview

This repository contains the source code for my personal portfolio website, developed for Assignment 2. It builds on my Assignment 1 portfolio and makes it more interactive and modern. The website highlights personal background, technical skill sets, and featured projects using modern, semantic HTML5, custom CSS3 layouts, and JavaScript for dynamic client-side interactions. New in this version: a live project filter and search, a "Daily Inspiration" section that loads artwork from a public API, and smoother animations and user feedback.

---

## 🚀 Live Demo

You can view the deployed website on GitHub Pages here:
👉 **[Live Portfolio Website](https://salfaioumi-maker.github.io/202341870-SanaGhassan-assignment2/)**

## ✨ Key Features

### 🆕 New in Assignment 2

* **Project Filter & Live Search:** Category buttons (All, Machine Learning, Data Analysis, Training) and a search box that filter the project cards instantly while typing. A counter shows how many projects match ("Showing 2 of 3 projects"), and a friendly "No projects match your search" message appears when nothing is found.
* **Daily Inspiration (Public API):** A section that loads a random public-domain artwork from the [Art Institute of Chicago API](https://api.artic.edu/docs/), showing its image, title, artist, and date. Visitors can click "Show another artwork" to load a new piece.
* **Loading & Error Feedback:** A spinner with "Loading artwork…" appears while the artwork is being fetched. If the request fails (for example, no internet), a clear error message and a "Try again" button are shown.
* **Animations & Transitions:** Filter buttons lift on hover and press down when clicked, project cards fade in when they reappear after filtering, the search box glows when selected, and the artwork fades in once it has fully loaded.

### From Assignment 1

**Clean HTML**

* **Smooth Header Navigation:** A sticky top menu that glides directly to the About, Projects, Inspiration, and Contact sections.
* **Personal Introduction:** A focused hero banner introducing my academic background and engineering focus alongside a clean portrait graphic.
* **Project Cards:** Dedicated showcase blocks highlighting technical work with preview images, concise summaries, and project links.
* **Smart Contact Form:** Interactive form fields equipped with front-end validation rules for names, emails, and message lengths.
* **Accessibility Built-In:** Includes an invisible skip-to-content link for keyboard users and ARIA labels for screen readers.

**Responsive CSS**

* **Flexible Grids:** Built purely with CSS Grid and Flexbox so project cards and layouts adapt naturally to any screen size without heavy libraries.
* **Mobile-Friendly:** Spacing and text scale smoothly across mobile phones, tablets, and laptops.

**JavaScript Interactions**

* **Dark / Light Mode:** A one-click toggle that adapts to the visitor's device settings and remembers their chosen theme across visits using `localStorage`.
* **Dynamic Time Greeting:** Welcomes visitors with a personalized greeting ("Good morning", "Good afternoon") based on their local time.
* **Instant Form Feedback:** Submissions are handled smoothly in the browser, showing an immediate confirmation note without page reloads.
* **Automatic Footer Year:** Automatically reflects the current year so the copyright never goes out of date.

# 🛠️ Local Setup Instructions

Follow these steps to clone, run, and test the portfolio application locally on your machine.

## Prerequisites

Before running the project locally, make sure you have:

- A modern web browser (Google Chrome, Apple Safari, Mozilla Firefox, or Microsoft Edge)
- [Git](https://git-scm.com/) installed on your operating system (to clone the repository)
- An internet connection (needed for the Daily Inspiration artwork and Google Fonts)
- Visual Studio Code *(optional, recommended for inspecting source files and live previews)*

## Step 1: Clone the Repository

Clone the repository using Git in the terminal or command line:

```bash
# Clone the remote repository to your local machine
git clone https://github.com/salfaioumi-maker/202341870-SanaGhassan-assignment2.git

# Navigate into the project folder
cd 202341870-SanaGhassan-assignment2
```

## Step 2: Run the Website Locally

You can launch the application using either approach:

- **Direct Browser Launch (Quickest):** Locate the cloned folder in Finder/File Explorer and double-click `index.html` (or right-click → **Open With** → your preferred browser) to open the site immediately.
- **Via VS Code Live Server (Recommended):** Open the project folder in VS Code, right-click `index.html`, and select **Open with Live Server** to serve the project at `http://127.0.0.1:5500/` with hot-reloading enabled.

> ⚠️ Open `index.html` from inside the project folder. If you download `index.html` on its own, the page will load without its styles, scripts, and images.

## Step 3: Verification & Testing

- **Layout & Responsiveness:** Open your browser's Developer Tools (`Cmd + Option + I` on macOS or `F12` on Windows) and toggle the device toolbar to check phone, tablet, and desktop layouts.
- **Project Filter & Search:** Click each category button, then type a keyword such as "python" in the search box. Type something random (e.g. "zzz") to see the "No projects match" message.
- **Daily Inspiration:** Check that an artwork loads, then click **Show another artwork**. To test the error message, turn off your internet (or set Developer Tools → Network → **Offline**), click the button, and then click **Try again** after reconnecting.
- **Other Interactions:** Toggle the dark/light mode button in the header, check the time-based greeting, and submit a test entry in the contact form to verify the client-side validation messages.

---

## 🤖 AI Integration Summary

AI tools were used during Assignment 2 to support the work:

* **Claude (Opus 5.5):** explained the assignment requirements, suggested and generated starter code for the project filter/search and the Daily Inspiration API feature, reviewed my edits, and helped debug Git commit issues.
* **GitHub Copilot:** generated commit messages in VS Code.

The Daily Inspiration idea was my own. I reviewed, tested, and edited all AI-generated code. For example, I redesigned the search box and buttons, added the artwork date and a public-domain filter, and fixed a bug where hidden status messages could still appear. Full details, including the usage log and declaration, are documented in docs/ai-usage-report.md

## 📁 Project Structure

```text
202341870-SanaGhassan-assignment2/
├── assets/
│   └── images/                     # Project screenshots and vector graphics
├── css/
│   └── styles.css                  # Styling, layouts, filter buttons, artwork card, and animations
├── docs/
│   ├── ai-usage-report.md          # AI usage log and declaration
│   └── technical-documentation.md  # Technical decisions, architecture, and accessibility notes
├── js/
│   └── script.js                   # Theme switcher, greeting, form feedback, project filter, and artwork API
├── index.html                      # Semantic HTML5 portfolio structure
├── .gitignore
└── README.md                       # Project overview and setup instructions
```

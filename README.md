# Personal Portfolio Website - Assignment 1

**Course:** SWE-363: Web Engineering & Development
**Student Name:** Sana Ghassan Alfaioumi
**Student ID:** 202341870
**Term:** Term 261

---

## 📌 Project Overview

This repository contains the source code for a personal portfolio website developed for Assignment 1. The website highlights personal background, technical skill sets, and featured projects using modern, semantic HTML5, custom CSS3 layouts, and JavaScript for dynamic client-side interactions.

---

## 🚀 Live Demo

You can view the deployed website on GitHub Pages here:
👉 **[Live Portfolio Website](https://salfaioumi-maker.github.io/202341870-SanaGhassan-assignment1/)**

## ✨ Key Features

**Clean  HTML**

* **Smooth Header Navigation:** A sticky top menu that glides directly to the About, Projects, and Contact sections.
* **Personal Introduction:** A focused hero banner introducing my academic background and engineering focus alongside a clean portrait graphic.
* **Project Cards:** Dedicated showcase blocks highlighting technical work with preview images, concise summaries, and project links.
* **Smart Contact Form:** Interactive form fields equipped with front-end validation rules for names, emails, and message lengths.
* **Accessibility Built-In:** Includes an invisible skip-to-content link for keyboard users and ARIA labels for screen readers.

**Responsive CSS**

* **Flexible Grids:** Built purely with CSS Grid and Flexbox so project cards and layouts adapt naturally to any screen size without heavy libraries.
* **Mobile-Friendly:** Spacing and text scale smoothly across mobile phones, tablets, and laptops.

**JavaScript Interactions**

* **Dark / Light Mode:** A one-click toggle that adapts to the visitor's device settings and remembers their chosen theme across visits.
* **Dynamic Time Greeting:** Welcomes visitors with a personalized greeting ("Good morning", "Good afternoon") based on their local time.
* **Instant Form Feedback:** Submissions are handled smoothly in the browser, showing an immediate confirmation note without page reloads.
* **Automatic Footer Year:** Automatically reflects the current year so the copyright never goes out of date.
  
# 🛠️ Local Setup Instructions

Follow these steps to clone, run, and test the portfolio application locally on your machine.

## Prerequisites

Before running the project locally, make sure you have:

- A modern web browser (Google Chrome, Apple Safari, Mozilla Firefox, or Microsoft Edge)
- [Git](https://git-scm.com/) installed on your operating system (to clone the repository)
- Visual Studio Code *(optional, recommended for inspecting source files and live previews)*

## Step 1: Clone the Repository

Clone the repository using Git in the terminal or command line:

```bash
# Clone the remote repository to your local machine
git clone https://github.com/salfaioumi-maker/202341870-SanaGhassan-assignment1.git

# Navigate into the project folder
cd 202341870-SanaGhassan-assignment1
```

## Step 2: Run the Website Locally

You can launch the application using either approach:

- **Direct Browser Launch (Quickest):** Locate the cloned folder in Finder/File Explorer and double-click `index.html` (or right-click → **Open With** → your preferred browser) to open the static build immediately.
- **Via VS Code Live Server (Recommended):** Open the project folder in VS Code, right-click `index.html`, and select **Open with Live Server** to serve the project at `http://127.0.0.1:5500/` with hot-reloading enabled.

## Step 3: Verification & Testing

- **Layout & Responsiveness:** Open your browser's Developer Tools (`Cmd + Option + I` on macOS or `F12` on Windows) and toggle the device toolbar to check phone, tablet, and desktop layouts.
- **Interactivity:** Toggle the dark/light mode button in the header, check the time-based greeting, and submit a test entry in the contact form to verify the client-side validation messages.
---




## AI Integration Summary
AI tools (Claude and Gemini) were used during development to assist in designing layout structures (CSS Grid and Flexbox), testing color themes, and debugging terminal Git sync issues. All final code, portfolio descriptions, and styling were manually reviewed, edited, and customized.
Full details are documented in [docs/ai-usage-report.md](docs/ai-usage-report.md).
   
## 📁 Project Structure

```text
202341870-SanaGhassan-assignment1/
├── assets/
│   └── images/                     # Project screenshots and vector graphics
├── css/
│   └── styles.css                  # Custom styling, typography, and responsive layouts
├── docs/
│   ├── ai-usage-report.md          # Transparency documentation on AI assistance
│   └── technical-documentation.md  # Technical decisions, architecture, and accessibility notes
├── js/
│   └── script.js                   # Theme switcher, greeting logic, and form feedback
├── index.html                      # Semantic HTML5 portfolio structure
└── README.md                       # Project overview and setup instructions
```

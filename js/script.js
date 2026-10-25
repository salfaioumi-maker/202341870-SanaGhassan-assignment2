// Run these setup functions as soon as the HTML page finishes loading
document.addEventListener('DOMContentLoaded', () => {
  setFooterYear();
  setGreeting();
  initThemeToggle();
  initContactForm();
  initProjectFilter();
  initArtwork();
});


// Automatically update the copyright year in the footer so it never goes out of date
function setFooterYear() {
  const yearEl = document.getElementById('year');
  if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
  }
}


// Display a dynamic greeting (morning, afternoon, etc.) based on the visitor's local time
function setGreeting() {
  const greetingEl = document.getElementById('greeting');
  if (!greetingEl) return;

  const hour = new Date().getHours();
  let greeting = 'Hello';

  if (hour < 5) {
    greeting = 'Still up late';
  } else if (hour < 12) {
    greeting = 'Good morning';
  } else if (hour < 18) {
    greeting = 'Good afternoon';
  } else {
    greeting = 'Good evening';
  }

  greetingEl.textContent = greeting;
}

// Enable the dark/light mode toggle and remember the user's preference

function initThemeToggle() {
  const toggleBtn = document.getElementById('themeToggle');
  const label = toggleBtn?.querySelector('.theme-toggle__label');
  const icon = toggleBtn?.querySelector('.theme-toggle__icon');
  if (!toggleBtn) return;

  const storedTheme = localStorage.getItem('portfolio-theme');
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  const initialTheme = storedTheme || (prefersDark ? 'dark' : 'light');

  applyTheme(initialTheme);

  toggleBtn.addEventListener('click', () => {
    const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
    const nextTheme = isDark ? 'light' : 'dark';
    applyTheme(nextTheme);
    localStorage.setItem('portfolio-theme', nextTheme);
  });

  function applyTheme(theme) {
    if (theme === 'dark') {
      document.documentElement.setAttribute('data-theme', 'dark');
      toggleBtn.setAttribute('aria-pressed', 'true');
      if (icon) icon.textContent = '☀';
      if (label) label.textContent = 'Light mode';
    } else {
      document.documentElement.removeAttribute('data-theme');
      toggleBtn.setAttribute('aria-pressed', 'false');
      if (icon) icon.textContent = '☾';
      if (label) label.textContent = 'Dark mode';
    }
  }
}




// Validate the contact form and show a fake success message since there is no backend server
function initContactForm() {
  const form = document.getElementById('contactForm');
  const status = document.getElementById('formStatus');
  if (!form || !status) return;
// Stop the page from reloading when the user clicks the submit button
  form.addEventListener('submit', (event) => {
    event.preventDefault();
// Check if the user left any required fields blank or typed an invalid email
    if (!form.checkValidity()) {
      status.textContent = 'Please fill in every field before sending.';
      status.style.color = '#C9503B';
      form.reportValidity();
      return;
    }
// Get the user's name to make the success message personal
    const name = form.name.value.trim();

// Show the success message and clear out the form boxes
    status.style.color = '';
    status.textContent = `Thanks, ${name}! This is a front-end demo, so your message wasn't actually sent anywhere.`;
    form.reset();
  });
}



// Filter the project cards by category button AND by live search text
function initProjectFilter() {
  const searchInput = document.getElementById('projectSearch');
  const buttons = document.querySelectorAll('.filter-btn');
  const cards = document.querySelectorAll('.project-card');
  const noResults = document.getElementById('noResults');
  const countEl = document.getElementById('projectCount');
  if (!searchInput || cards.length === 0) return;

  // Remember which button is selected ("all" when the page first loads)
  let activeFilter = 'all';

  // Check every card and decide whether to show or hide it
  function updateProjects() {
    const query = searchInput.value.trim().toLowerCase();
    let visible = 0;

    cards.forEach((card) => {
      // A card is shown only if it matches the selected button AND the search text
      const matchesCategory = activeFilter === 'all' || card.dataset.category === activeFilter;
      const matchesSearch = card.textContent.toLowerCase().includes(query);
      const show = matchesCategory && matchesSearch;

      if (show) {
        // If the card was hidden before, bring it back with the fade-in animation
        if (card.classList.contains('is-hidden')) {
          card.classList.remove('is-hidden');
          card.classList.remove('is-entering');
          void card.offsetWidth; // forces the browser to restart the animation
          card.classList.add('is-entering');
        }
        visible++;
      } else {
        card.classList.add('is-hidden');
      }
    });

    // Show the "No projects found" message only when nothing matches
    noResults.hidden = visible !== 0;
    countEl.textContent = `Showing ${visible} of ${cards.length} projects`;
  }

  // When a filter button is clicked, highlight it and update the cards
  buttons.forEach((btn) => {
    btn.addEventListener('click', () => {
      buttons.forEach((b) => {
        b.classList.remove('is-active');
        b.setAttribute('aria-pressed', 'false');
      });
      btn.classList.add('is-active');
      btn.setAttribute('aria-pressed', 'true');
      activeFilter = btn.dataset.filter;
      updateProjects();
    });
  });

  // Update the cards live every time the user types in the search box
  searchInput.addEventListener('input', updateProjects);

  // Run once at the start so the counter shows "Showing 3 of 3 projects"
  updateProjects();
}



// Load a random artwork from the Art Institute of Chicago public API
function initArtwork() {
  const loadingEl = document.getElementById('artLoading');
  const errorEl = document.getElementById('artError');
  const contentEl = document.getElementById('artContent');
  const imageEl = document.getElementById('artImage');
  const titleEl = document.getElementById('artTitle');
  const artistEl = document.getElementById('artArtist');
  const nextBtn = document.getElementById('artNext');
  const retryBtn = document.getElementById('artRetry');
  if (!loadingEl || !contentEl) return;

  const API_URL = 'https://api.artic.edu/api/v1/artworks';
  const FIELDS = 'id,title,artist_display,date_display,image_id';

  // Show only one of the three states: "loading", "error", or "artwork"
  function showState(state) {
    loadingEl.hidden = state !== 'loading';
    errorEl.hidden = state !== 'error';
    contentEl.hidden = state !== 'artwork';
    // Disable the button while loading so people can't click it many times
    nextBtn.disabled = state === 'loading';
  }

  async function loadArtwork() {
    showState('loading');

    try {
      // Pick a random page of 10 artworks, so each click shows something new
      const page = Math.floor(Math.random() * 100) + 1;
      const response = await fetch(`${API_URL}?page=${page}&limit=10&fields=${FIELDS}`);

      // fetch() does not fail on errors like 404 or 500, so we check it ourselves
      if (!response.ok) {
        throw new Error(`Request failed with status ${response.status}`);
      }

      const result = await response.json();

      // Some artworks have no picture, so keep only the ones that have an image
      const withImages = result.data.filter((art) => art.image_id);
      if (withImages.length === 0) {
        throw new Error('No artworks with images on this page');
      }

      // Choose one of them at random
      const art = withImages[Math.floor(Math.random() * withImages.length)];

      // The museum puts line breaks inside artist names, so turn them into commas
      const artist = (art.artist_display || 'Unknown artist').replace(/\n/g, ', ');

      // Build the image link using the museum's image server (IIIF)
      const iiifUrl = result.config?.iiif_url || 'https://www.artic.edu/iiif/2';
      imageEl.src = `${iiifUrl}/${art.image_id}/full/843,/0/default.jpg`;
      imageEl.alt = `${art.title} by ${artist}`;

      titleEl.textContent = art.title || 'Untitled';
      artistEl.textContent = [artist, art.date_display].filter(Boolean).join(' · ');

      showState('artwork');
    } catch (error) {
      // Log the technical details for developers, and show a friendly message to the user
      console.error('Could not load artwork:', error);
      showState('error');
    }
  }

  // If the image itself fails to download, show the same friendly error
  imageEl.addEventListener('error', () => {
    if (imageEl.getAttribute('src')) showState('error');
  });

  nextBtn.addEventListener('click', loadArtwork);
  retryBtn.addEventListener('click', loadArtwork);

  // Load the first artwork when the page opens
  loadArtwork();
}
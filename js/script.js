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



// Load a random public-domain painting from The Metropolitan Museum of Art (The Met) public API
function initArtwork() {
  const loadingEl = document.getElementById('artLoading');
  const errorEl = document.getElementById('artError');
  const contentEl = document.getElementById('artContent');
  const imageEl = document.getElementById('artImage');
  const titleEl = document.getElementById('artTitle');
  const artistEl = document.getElementById('artArtist');
  const nextBtn = document.getElementById('artNext');
  const retryBtn = document.getElementById('artRetry');
  if (!loadingEl || !errorEl || !contentEl) return;

  // Step 1 asks for a list of painting IDs, step 2 asks for the details of one ID
  const SEARCH_URL = 'https://collectionapi.metmuseum.org/public/collection/v1/search?departmentId=11&hasImages=true&q=painting';
  const OBJECT_URL = 'https://collectionapi.metmuseum.org/public/collection/v1/objects/';
  const MAX_TRIES = 5;

  // The list of IDs is saved after the first request, so it is only downloaded once
  let artworkIds = [];

  // Show only one of the three states: "loading", "error", or "artwork"
  function showState(state) {
    loadingEl.hidden = state !== 'loading';
    errorEl.hidden = state !== 'error';
    contentEl.hidden = state !== 'artwork';
    // Disable the button while loading so people can't click it many times
    nextBtn.disabled = state === 'loading';
  }

  // Get the list of painting IDs (only the first time)
  async function getArtworkIds() {
    if (artworkIds.length > 0) return artworkIds;

    const response = await fetch(SEARCH_URL);
    if (!response.ok) {
      throw new Error(`Search request failed with status ${response.status}`);
    }
    const result = await response.json();
    artworkIds = result.objectIDs || [];

    if (artworkIds.length === 0) {
      throw new Error('The search returned no artworks');
    }
    return artworkIds;
  }

  async function loadArtwork() {
    showState('loading');

    try {
      const ids = await getArtworkIds();

      // Some IDs have no public-domain image, so try a few random ones until one works
      let art = null;
      for (let attempt = 0; attempt < MAX_TRIES && !art; attempt++) {
        const id = ids[Math.floor(Math.random() * ids.length)];
        const response = await fetch(OBJECT_URL + id);
        if (!response.ok) continue; // skip this ID and try another one

        const data = await response.json();
        if (data.isPublicDomain && data.primaryImageSmall) {
          art = data;
        }
      }

      if (!art) {
        throw new Error(`No public-domain artwork with an image after ${MAX_TRIES} tries`);
      }

      const title = art.title || 'Untitled';
      const artist = art.artistDisplayName || 'Unknown artist';

      titleEl.textContent = title;
      artistEl.textContent = [artist, art.objectDate].filter(Boolean).join(' · ');
      imageEl.alt = `${title} by ${artist}`;

      // Keep the spinner until the picture has fully downloaded, then show everything together
      imageEl.onload = () => showState('artwork');
      imageEl.src = art.primaryImageSmall;
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

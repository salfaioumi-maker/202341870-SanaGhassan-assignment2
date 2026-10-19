
// Run these setup functions as soon as the HTML page finishes loading
document.addEventListener('DOMContentLoaded', () => {
  setFooterYear();
  setGreeting();
  initThemeToggle();
  initContactForm();
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


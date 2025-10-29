/**
 * Zed Documentation - Interactive JavaScript
 * Features: Auto TOC, Smooth Scroll, Animations, Search, Theme Toggle
 */

document.addEventListener('DOMContentLoaded', function() {
  // Initialize all features
  initTableOfContents();
  initSmoothScroll();
  initCodeCopyButtons();
  initThemeToggle();
  initScrollAnimations();
  initSearchHighlight();
  initBackToTop();
  initMobileNav();
});

/**
 * AUTO-GENERATE TABLE OF CONTENTS
 * Creates TOC from h2 and h3 headings
 */
function initTableOfContents() {
  const content = document.querySelector('section');
  if (!content) return;

  const headings = content.querySelectorAll('h2, h3');
  if (headings.length < 3) return; // Only show TOC if there are enough headings

  // Create TOC container
  const tocContainer = document.createElement('div');
  tocContainer.className = 'table-of-contents';
  tocContainer.innerHTML = '<h3>📋 Table of Contents</h3><ul class="toc-list"></ul>';

  const tocList = tocContainer.querySelector('.toc-list');

  // Generate TOC items
  headings.forEach((heading, index) => {
    // Add ID to heading if it doesn't have one
    if (!heading.id) {
      heading.id = `section-${index}`;
    }

    const li = document.createElement('li');
    li.className = heading.tagName.toLowerCase() === 'h3' ? 'toc-sub' : '';

    const link = document.createElement('a');
    link.href = `#${heading.id}`;
    link.textContent = heading.textContent;
    link.addEventListener('click', function(e) {
      e.preventDefault();
      smoothScrollTo(heading);
    });

    li.appendChild(link);
    tocList.appendChild(li);
  });

  // Insert TOC after the first heading
  const firstHeading = content.querySelector('h1');
  if (firstHeading && firstHeading.nextElementSibling) {
    firstHeading.parentNode.insertBefore(tocContainer, firstHeading.nextElementSibling);
  }
}

/**
 * SMOOTH SCROLLING
 */
function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      const href = this.getAttribute('href');
      if (href === '#') return;

      e.preventDefault();
      const target = document.querySelector(href);
      if (target) {
        smoothScrollTo(target);
      }
    });
  });
}

function smoothScrollTo(element) {
  const offset = 80; // Header offset
  const targetPosition = element.getBoundingClientRect().top + window.pageYOffset - offset;

  window.scrollTo({
    top: targetPosition,
    behavior: 'smooth'
  });

  // Add highlight animation
  element.classList.add('highlight-flash');
  setTimeout(() => element.classList.remove('highlight-flash'), 2000);
}

/**
 * COPY BUTTONS FOR CODE BLOCKS
 */
function initCodeCopyButtons() {
  document.querySelectorAll('pre').forEach(pre => {
    const button = document.createElement('button');
    button.className = 'copy-code-button';
    button.innerHTML = '📋 Copy';
    button.title = 'Copy to clipboard';

    button.addEventListener('click', async function() {
      const code = pre.querySelector('code')?.textContent || pre.textContent;

      try {
        await navigator.clipboard.writeText(code);
        button.innerHTML = '✅ Copied!';
        button.classList.add('copied');

        setTimeout(() => {
          button.innerHTML = '📋 Copy';
          button.classList.remove('copied');
        }, 2000);
      } catch (err) {
        button.innerHTML = '❌ Failed';
        setTimeout(() => button.innerHTML = '📋 Copy', 2000);
      }
    });

    pre.style.position = 'relative';
    pre.appendChild(button);
  });
}

/**
 * THEME TOGGLE (Light/Dark/Auto)
 */
function initThemeToggle() {
  const toggleButton = document.createElement('button');
  toggleButton.className = 'theme-toggle';
  toggleButton.innerHTML = '🌓';
  toggleButton.title = 'Toggle theme';

  const currentTheme = localStorage.getItem('theme') || 'auto';
  applyTheme(currentTheme);

  toggleButton.addEventListener('click', function() {
    const themes = ['light', 'dark', 'auto'];
    const currentIndex = themes.indexOf(localStorage.getItem('theme') || 'auto');
    const nextTheme = themes[(currentIndex + 1) % themes.length];

    localStorage.setItem('theme', nextTheme);
    applyTheme(nextTheme);

    // Show notification
    showNotification(`Theme: ${nextTheme}`);
  });

  document.body.appendChild(toggleButton);
}

function applyTheme(theme) {
  document.documentElement.setAttribute('data-theme', theme);

  if (theme === 'auto') {
    document.documentElement.removeAttribute('data-theme');
  }
}

/**
 * SCROLL ANIMATIONS
 * Fade in elements as they enter viewport
 */
function initScrollAnimations() {
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  };

  const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('fade-in-visible');
      }
    });
  }, observerOptions);

  // Observe all major content elements
  document.querySelectorAll('section > h2, section > h3, section > p, section > pre, section > table, section > blockquote').forEach(el => {
    el.classList.add('fade-in');
    observer.observe(el);
  });
}

/**
 * SEARCH HIGHLIGHTING
 * Highlight search terms from URL
 */
function initSearchHighlight() {
  const urlParams = new URLSearchParams(window.location.search);
  const searchTerm = urlParams.get('q');

  if (searchTerm) {
    highlightText(searchTerm);
  }
}

function highlightText(text) {
  const content = document.querySelector('section');
  if (!content) return;

  const regex = new RegExp(`(${text})`, 'gi');
  const walker = document.createTreeWalker(content, NodeFilter.SHOW_TEXT, null, false);

  const nodesToReplace = [];
  while (walker.nextNode()) {
    if (walker.currentNode.textContent.match(regex)) {
      nodesToReplace.push(walker.currentNode);
    }
  }

  nodesToReplace.forEach(node => {
    const span = document.createElement('span');
    span.innerHTML = node.textContent.replace(regex, '<mark>$1</mark>');
    node.parentNode.replaceChild(span, node);
  });
}

/**
 * BACK TO TOP BUTTON
 */
function initBackToTop() {
  const button = document.createElement('button');
  button.className = 'back-to-top';
  button.innerHTML = '↑';
  button.title = 'Back to top';

  window.addEventListener('scroll', function() {
    if (window.pageYOffset > 300) {
      button.classList.add('visible');
    } else {
      button.classList.remove('visible');
    }
  });

  button.addEventListener('click', function() {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });

  document.body.appendChild(button);
}

/**
 * MOBILE NAVIGATION TOGGLE
 */
function initMobileNav() {
  const header = document.querySelector('header');
  if (!header) return;

  const toggleButton = document.createElement('button');
  toggleButton.className = 'mobile-nav-toggle';
  toggleButton.innerHTML = '☰';
  toggleButton.title = 'Toggle navigation';

  toggleButton.addEventListener('click', function() {
    header.classList.toggle('nav-open');
    toggleButton.innerHTML = header.classList.contains('nav-open') ? '✕' : '☰';
  });

  header.insertBefore(toggleButton, header.firstChild);

  // Close nav when clicking outside
  document.addEventListener('click', function(e) {
    if (!header.contains(e.target) && header.classList.contains('nav-open')) {
      header.classList.remove('nav-open');
      toggleButton.innerHTML = '☰';
    }
  });
}

/**
 * NOTIFICATION SYSTEM
 */
function showNotification(message) {
  const notification = document.createElement('div');
  notification.className = 'notification';
  notification.textContent = message;

  document.body.appendChild(notification);

  setTimeout(() => notification.classList.add('show'), 10);
  setTimeout(() => {
    notification.classList.remove('show');
    setTimeout(() => notification.remove(), 300);
  }, 2000);
}

/**
 * KEYBOARD SHORTCUTS
 */
document.addEventListener('keydown', function(e) {
  // Ctrl/Cmd + K: Focus search
  if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
    e.preventDefault();
    const searchInput = document.querySelector('.search-input');
    if (searchInput) searchInput.focus();
  }

  // Ctrl/Cmd + /: Show keyboard shortcuts
  if ((e.ctrlKey || e.metaKey) && e.key === '/') {
    e.preventDefault();
    showKeyboardShortcuts();
  }
});

function showKeyboardShortcuts() {
  const shortcuts = [
    { keys: 'Ctrl + K', action: 'Focus search' },
    { keys: 'Ctrl + /', action: 'Show shortcuts' }
  ];

  const message = shortcuts.map(s => `${s.keys}: ${s.action}`).join('\n');
  showNotification(message);
}

/**
 * PROGRESS BAR
 */
function initProgressBar() {
  const progressBar = document.createElement('div');
  progressBar.className = 'reading-progress';
  document.body.appendChild(progressBar);

  window.addEventListener('scroll', function() {
    const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
    const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const scrolled = (winScroll / height) * 100;
    progressBar.style.width = scrolled + '%';
  });
}

// Initialize progress bar
initProgressBar();

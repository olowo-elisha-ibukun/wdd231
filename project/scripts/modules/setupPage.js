// setupPage.js - Common page setup for all pages
export function setupNavigation() {
  const mobileMenuToggle = document.getElementById('mobileMenuToggle');
  const mainNav = document.getElementById('mainNav');

  if (mobileMenuToggle && mainNav) {
    mobileMenuToggle.addEventListener('click', () => {
      const expanded = mobileMenuToggle.getAttribute('aria-expanded') === 'true';
      mobileMenuToggle.setAttribute('aria-expanded', String(!expanded));
      mainNav.classList.toggle('active');
      mobileMenuToggle.classList.toggle('open');
    });

    const navLinks = mainNav.querySelectorAll('a');
    navLinks.forEach(link => {
      link.addEventListener('click', () => {
        mainNav.classList.remove('active');
        mobileMenuToggle.classList.remove('open');
      });

      // Set active link based on current page
      const href = link.getAttribute('href');
      const currentPage = window.location.pathname.split('/').pop() || 'index.html';
      if (href === currentPage || (currentPage === '' && href === 'index.html')) {
        link.classList.add('active');
      }
    });
  }
}

export function updateFooterInfo() {
  const currentYearEl = document.getElementById('currentYear');
  const lastModifiedEl = document.getElementById('lastModified');

  if (currentYearEl) {
    currentYearEl.textContent = new Date().getFullYear();
  }

  if (lastModifiedEl) {
    lastModifiedEl.textContent = document.lastModified;
  }
}

export function initPage() {
  setupNavigation();
  updateFooterInfo();
}

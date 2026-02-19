// reviews.js - Handle form submission and navigation
import { initPage } from './modules/setupPage.js';

document.addEventListener('DOMContentLoaded', () => {
  initPage(); // Setup navigation and footer
  
  const form = document.getElementById('resource-form');

  // Handle form submission
  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();

      // Get form data using FormData API
      const formData = new FormData(form);

      // Build URL search parameters
      const params = new URLSearchParams();
      formData.forEach((value, key) => params.append(key, value));

      // Optionally store data in storage for fallback
      const data = {
        title: formData.get('title'),
        author: formData.get('author'),
        content: formData.get('content'),
        submittedAt: new Date().toISOString()
      };
      sessionStorage.setItem('resourceFormData', JSON.stringify(data));
      localStorage.setItem('resourceFormData', JSON.stringify(data));

      // Reset form
      form.reset();

      // Redirect to thank you page with query string
      window.location.href = 'thankyou.html?' + params.toString();
    });
  }
});

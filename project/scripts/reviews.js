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
      
      // Convert to object
      const data = {
        title: formData.get('title'),
        author: formData.get('author'),
        content: formData.get('content'),
        submittedAt: new Date().toISOString()
      };

      // Store in sessionStorage for the thank you page
      sessionStorage.setItem('resourceFormData', JSON.stringify(data));
      
      // Also store in localStorage for persistence
      localStorage.setItem('resourceFormData', JSON.stringify(data));

      // Reset form
      form.reset();

      // Redirect to thank you page
      window.location.href = 'thankyou.html';
    });
  }
});

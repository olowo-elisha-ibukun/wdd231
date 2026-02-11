// thankyou.js - Display submitted form data
import { initPage } from './modules/setupPage.js';

document.addEventListener('DOMContentLoaded', () => {
  initPage(); // Setup navigation and footer
  
  const submissionDetails = document.getElementById('submissionDetails');

  // Get form data from sessionStorage or localStorage
  const formData = sessionStorage.getItem('resourceFormData') || localStorage.getItem('resourceFormData');
  
  if (formData) {
    try {
      const data = JSON.parse(formData);
      
      // Display the submitted data using template literals
      const detailsHTML = `
        <div class="detail-item">
          <strong>Title:</strong>
          <p>${escapeHtml(data.title)}</p>
        </div>
        <div class="detail-item">
          <strong>Author:</strong>
          <p>${escapeHtml(data.author)}</p>
        </div>
        <div class="detail-item">
          <strong>Description:</strong>
          <p>${escapeHtml(data.content)}</p>
        </div>
        <div class="detail-item">
          <strong>Submitted:</strong>
          <p>${new Date().toLocaleString()}</p>
        </div>
      `;
      
      submissionDetails.innerHTML = detailsHTML;
      
      // Clear the stored data after displaying
      sessionStorage.removeItem('resourceFormData');
      localStorage.removeItem('resourceFormData');
    } catch (error) {
      console.error('Error parsing form data:', error);
      submissionDetails.innerHTML = '<p>Thank you for your submission!</p>';
    }
  } else {
    submissionDetails.innerHTML = '<p>Thank you for your submission! Your resource has been received.</p>';
  }
});

// Helper function to escape HTML and prevent XSS
function escapeHtml(text) {
  const div = document.createElement('div');
  div.textContent = text;
  return div.innerHTML;
}

// thankyou.js - Display submitted form data
import { initPage } from './modules/setupPage.js';

document.addEventListener('DOMContentLoaded', () => {
  initPage(); // Setup navigation and footer
  
  const submissionDetails = document.getElementById('submissionDetails');

  // attempt to read query string parameters (URLSearchParams requirement)
  const params = new URLSearchParams(window.location.search);
  const title = params.get('title');
  const author = params.get('author');
  const content = params.get('content');

  if (title || author || content) {
    const detailsHTML = `
      <div class="detail-item">
        <strong>Title:</strong>
        <p>${escapeHtml(title || '')}</p>
      </div>
      <div class="detail-item">
        <strong>Author:</strong>
        <p>${escapeHtml(author || '')}</p>
      </div>
      <div class="detail-item">
        <strong>Description:</strong>
        <p>${escapeHtml(content || '')}</p>
      </div>
      <div class="detail-item">
        <strong>Submitted:</strong>
        <p>${new Date().toLocaleString()}</p>
      </div>
    `;

    submissionDetails.innerHTML = detailsHTML;
  } else {
    // fallback message if no params present
    submissionDetails.innerHTML = '<p>Thank you for your submission! Your resource has been received.</p>';
  }
});

// Helper function to escape HTML and prevent XSS
function escapeHtml(text) {
  const div = document.createElement('div');
  div.textContent = text;
  return div.innerHTML;
}

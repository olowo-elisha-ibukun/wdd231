// modalService.js - Handles modal dialog functionality
export function createModal(opportunity) {
  const modal = document.createElement('div');
  modal.className = 'modal';
  modal.id = `modal-${opportunity.id}`;
  
  modal.innerHTML = `
    <div class="modal-content">
      <div class="modal-header">
        <h2>${opportunity.title}</h2>
        <button class="modal-close" aria-label="Close modal">&times;</button>
      </div>
      <div class="modal-body">
        <div class="modal-details">
          <div class="detail-row">
            <strong>Category:</strong>
            <span>${opportunity.category}</span>
          </div>
          <div class="detail-row">
            <strong>Date:</strong>
            <span>${opportunity.date}</span>
          </div>
          <div class="detail-row">
            <strong>Time:</strong>
            <span>${opportunity.time}</span>
          </div>
          <div class="detail-row">
            <strong>Location:</strong>
            <span>${opportunity.location}</span>
          </div>
          <div class="detail-row">
            <strong>Capacity:</strong>
            <span>${opportunity.capacity} participants</span>
          </div>
          <div class="detail-row full-width">
            <strong>Description:</strong>
            <p>${opportunity.description}</p>
          </div>
        </div>
      </div>
      <div class="modal-footer">
        <button class="btn modal-action-btn" data-id="${opportunity.id}">Add to Favorites</button>
        <button class="btn btn-secondary modal-close-btn">Close</button>
      </div>
    </div>
    <div class="modal-overlay"></div>
  `;
  
  return modal;
}

export function openModal(modal) {
  modal.style.display = 'flex';
  document.body.style.overflow = 'hidden';
  
  const closeBtn = modal.querySelector('.modal-close');
  const closeBtnFooter = modal.querySelector('.modal-close-btn');
  const overlay = modal.querySelector('.modal-overlay');
  
  const closeHandler = () => closeModal(modal);
  
  closeBtn.addEventListener('click', closeHandler);
  closeBtnFooter.addEventListener('click', closeHandler);
  overlay.addEventListener('click', closeHandler);
  
  // Close on Escape key
  const escapeHandler = (e) => {
    if (e.key === 'Escape') closeModal(modal);
  };
  document.addEventListener('keydown', escapeHandler);
}

export function closeModal(modal) {
  modal.style.display = 'none';
  document.body.style.overflow = 'auto';
  modal.remove();
}

export function attachModalListeners(opportunityCard, opportunity) {
  opportunityCard.addEventListener('click', () => {
    const modal = createModal(opportunity);
    document.body.appendChild(modal);
    openModal(modal);
    
    // Handle favorite button in modal
    const actionBtn = modal.querySelector('.modal-action-btn');
    actionBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      addToFavorites(opportunity);
      actionBtn.textContent = '✓ Added to Favorites';
      actionBtn.disabled = true;
    });
  });
}

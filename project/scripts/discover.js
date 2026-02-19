// discover.js - Main module for Discover page with dynamic content
import { 
  fetchOpportunities, 
  filterByCategory, 
  searchOpportunities, 
  sortByDate 
} from './modules/dataService.js';

import { 
  createModal, 
  openModal, 
  attachModalListeners 
} from './modules/modalService.js';

import { 
  loadFavorites, 
  addFavorite, 
  removeFavorite, 
  isFavorited,
  saveFavorites
} from './modules/storageService.js';

import { initPage } from './modules/setupPage.js';

// State management
let allOpportunities = [];
let filteredOpportunities = [];
let favorites = [];

// DOM Elements
const opportunitiesContainer = document.getElementById('opportunitiesContainer');
const loadingIndicator = document.getElementById('loadingIndicator');
const errorMessage = document.getElementById('errorMessage');
const searchInput = document.getElementById('searchInput');
const categoryFilter = document.getElementById('categoryFilter');
const favoritesContainer = document.getElementById('favoritesContainer');
const clearFavoritesBtn = document.getElementById('clearFavoritesBtn');

// Initialize on page load
document.addEventListener('DOMContentLoaded', async () => {
  initPage(); // Setup navigation and footer
  await loadOpportunities();
  setupEventListeners();
  displayFavorites();
});

// Fetch and load opportunities using Fetch API with try...catch
async function loadOpportunities() {
  try {
    loadingIndicator.style.display = 'block';
    errorMessage.style.display = 'none';
    
    allOpportunities = await fetchOpportunities();
    filteredOpportunities = allOpportunities;
    
    // Display opportunities and sort by date
    const sortedOpportunities = sortByDate(allOpportunities);
    displayOpportunities(allOpportunities);
    
    loadingIndicator.style.display = 'none';
  } catch (error) {
    loadingIndicator.style.display = 'none';
    errorMessage.style.display = 'block';
    errorMessage.textContent = `Error loading opportunities: ${error.message}`;
    console.error('Failed to load opportunities:', error);
  }
}

// Display opportunities using template literals and dynamic rendering
function displayOpportunities(opportunities) {
  opportunitiesContainer.innerHTML = '';
  
  if (opportunities.length === 0) {
    opportunitiesContainer.innerHTML = '<p class="no-results">No opportunities found.</p>';
    return;
  }
  
  // Use map to transform opportunities into DOM elements
  opportunities.forEach(opportunity => {
    const card = document.createElement('div');
    card.className = 'card opportunity-card';
    card.style.cursor = 'pointer';
    
    // Use template literals for dynamic content
    card.innerHTML = `
      <h3>${opportunity.title}</h3>
      <p class="category-badge">${opportunity.category}</p>
      <p><strong>Date:</strong> ${opportunity.date}</p>
      <p><strong>Time:</strong> ${opportunity.time}</p>
      <p><strong>Location:</strong> ${opportunity.location}</p>
      <p>${opportunity.description}</p>
      <p class="capacity"><strong>Capacity:</strong> ${opportunity.capacity} spots available</p>
      <button class="btn favorite-btn" data-id="${opportunity.id}" aria-label="${isFavorited(opportunity.id) ? 'Remove from favorites' : 'Add to favorites'}">
        ${isFavorited(opportunity.id) ? '★ Favorited' : '☆ Add to Favorites'}
      </button>
    `;
    
    // Attach modal listener
    attachModalListeners(card, opportunity);
    
    // Handle favorite button click
    const favoriteBtn = card.querySelector('.favorite-btn');
    favoriteBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      handleFavoriteToggle(opportunity, favoriteBtn);
    });
    
    opportunitiesContainer.appendChild(card);
  });
}

// Handle favorite button toggle
function handleFavoriteToggle(opportunity, button) {
  if (isFavorited(opportunity.id)) {
    removeFavorite(opportunity.id);
    button.textContent = '☆ Add to Favorites';
  } else {
    addFavorite(opportunity);
    button.textContent = '★ Favorited';
    displayFavorites(); // Update favorites section
  }
}

// Display user's favorite opportunities
function displayFavorites() {
  favorites = loadFavorites();
  
  if (favorites.length === 0) {
    favoritesContainer.innerHTML = '<p>No favorites yet. Click the star icon to add opportunities to your favorites!</p>';
    return;
  }
  
  // Use map to transform favorites into display items
  const favoritesList = favorites
    .map(fav => {
      const opportunity = allOpportunities.find(opp => opp.id === fav.id);
      if (!opportunity) return '';
      
      return `
        <div class="favorite-item">
          <div class="favorite-info">
            <h4>${opportunity.title}</h4>
            <p>${opportunity.date} • ${opportunity.location}</p>
          </div>
          <button class="btn-remove" data-id="${opportunity.id}" aria-label="Remove from favorites">×</button>
        </div>
      `;
    })
    .filter(item => item !== '')
    .join('');
  
  favoritesContainer.innerHTML = favoritesList || '<p>No favorites yet.</p>';
  
  // Add event listeners to remove buttons
  document.querySelectorAll('.btn-remove').forEach(btn => {
    btn.addEventListener('click', (e) => {
      const id = parseInt(btn.dataset.id);
      removeFavorite(id);
      displayFavorites();
      // Update main display
      const mainFavBtn = document.querySelector(`button[data-id="${id}"]`);
      if (mainFavBtn) {
        mainFavBtn.textContent = '☆ Add to Favorites';
      }
    });
  });
}

// Setup event listeners for search and filter
function setupEventListeners() {
  searchInput.addEventListener('input', (e) => {
    const searchTerm = e.target.value;
    filteredOpportunities = searchOpportunities(allOpportunities, searchTerm);
    
    // Apply category filter if selected
    const selectedCategory = categoryFilter.value;
    if (selectedCategory) {
      filteredOpportunities = filterByCategory(filteredOpportunities, selectedCategory);
    }
    
    displayOpportunities(filteredOpportunities);
  });
  
  categoryFilter.addEventListener('change', (e) => {
    const selectedCategory = e.target.value;
    
    if (selectedCategory) {
      filteredOpportunities = filterByCategory(allOpportunities, selectedCategory);
    } else {
      filteredOpportunities = allOpportunities;
    }
    
    // Apply search filter if there's a search term
    const searchTerm = searchInput.value;
    if (searchTerm) {
      filteredOpportunities = searchOpportunities(filteredOpportunities, searchTerm);
    }
    
    displayOpportunities(filteredOpportunities);
  });
  
  clearFavoritesBtn.addEventListener('click', () => {
    if (confirm('Are you sure you want to clear all favorites?')) {
      favorites = [];
      saveFavorites([]);
      displayFavorites();
      
      // Update buttons in main display
      document.querySelectorAll('.favorite-btn').forEach(btn => {
        btn.textContent = '☆ Add to Favorites';
      });
    }
  });
}

// storageService.js - Handles local storage operations
const STORAGE_KEYS = {
  favorites: 'pdh_favorites',
  userPreferences: 'pdh_preferences',
  viewHistory: 'pdh_viewHistory'
};

export function saveFavorites(favorites) {
  try {
    localStorage.setItem(STORAGE_KEYS.favorites, JSON.stringify(favorites));
    console.log('Favorites saved:', favorites);
  } catch (error) {
    console.error('Error saving favorites:', error);
  }
}

export function loadFavorites() {
  try {
    const favorites = localStorage.getItem(STORAGE_KEYS.favorites);
    return favorites ? JSON.parse(favorites) : [];
  } catch (error) {
    console.error('Error loading favorites:', error);
    return [];
  }
}

export function addFavorite(opportunity) {
  const favorites = loadFavorites();
  
  // Check if already favorited
  if (!favorites.find(fav => fav.id === opportunity.id)) {
    favorites.push({
      id: opportunity.id,
      title: opportunity.title,
      dateAdded: new Date().toISOString()
    });
    saveFavorites(favorites);
    return true; // Successfully added
  }
  return false; // Already in favorites
}

export function removeFavorite(opportunityId) {
  const favorites = loadFavorites();
  const updated = favorites.filter(fav => fav.id !== opportunityId);
  saveFavorites(updated);
}

export function isFavorited(opportunityId) {
  const favorites = loadFavorites();
  return favorites.some(fav => fav.id === opportunityId);
}

export function saveUserPreferences(preferences) {
  try {
    localStorage.setItem(STORAGE_KEYS.userPreferences, JSON.stringify(preferences));
  } catch (error) {
    console.error('Error saving preferences:', error);
  }
}

export function loadUserPreferences() {
  try {
    const prefs = localStorage.getItem(STORAGE_KEYS.userPreferences);
    return prefs ? JSON.parse(prefs) : {};
  } catch (error) {
    console.error('Error loading preferences:', error);
    return {};
  }
}

export function addToViewHistory(opportunity) {
  try {
    const history = localStorage.getItem(STORAGE_KEYS.viewHistory);
    const viewHistory = history ? JSON.parse(history) : [];
    
    // Add to beginning of array
    viewHistory.unshift({
      id: opportunity.id,
      title: opportunity.title,
      viewedAt: new Date().toISOString()
    });
    
    // Keep only last 10 views
    if (viewHistory.length > 10) {
      viewHistory.pop();
    }
    
    localStorage.setItem(STORAGE_KEYS.viewHistory, JSON.stringify(viewHistory));
  } catch (error) {
    console.error('Error adding to view history:', error);
  }
}

export function getViewHistory() {
  try {
    const history = localStorage.getItem(STORAGE_KEYS.viewHistory);
    return history ? JSON.parse(history) : [];
  } catch (error) {
    console.error('Error retrieving view history:', error);
    return [];
  }
}

export function clearAllStorage() {
  try {
    localStorage.clear();
    console.log('All local storage cleared');
  } catch (error) {
    console.error('Error clearing storage:', error);
  }
}

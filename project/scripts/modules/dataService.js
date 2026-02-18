// dataService.js - Handles data fetching from JSON file
export async function fetchOpportunities() {
  try {
    const response = await fetch('../data/opportunities.json');
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const data = await response.json();
    console.log('Opportunities loaded successfully:', data.opportunities.length);
    return data.opportunities;
  } catch (error) {
    console.error('Error fetching opportunities:', error);
    throw error;
  }
}

// Filter opportunities by category
export function filterByCategory(opportunities, category) {
  return opportunities.filter(opp => opp.category === category);
}

// Search opportunities by title
export function searchOpportunities(opportunities, searchTerm) {
  return opportunities.filter(opp => 
    opp.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    opp.description.toLowerCase().includes(searchTerm.toLowerCase())
  );
}

// Sort opportunities by date
export function sortByDate(opportunities) {
  return opportunities
    .filter(opp => opp.date !== 'Varies' && opp.date !== '2026-01-01')
    .sort((a, b) => new Date(a.date) - new Date(b.date));
}

// Get featured opportunities (first 6)
export function getFeaturedOpportunities(opportunities) {
  return opportunities.slice(0, 6);
}

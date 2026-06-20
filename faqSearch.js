/**
 * FAQ Search Module using Fuse.js
 * Handles fuzzy searching of FAQ questions
 */

// Fuse.js instance
let fuse = null;

// Fuse.js configuration
const fuseOptions = {
    keys: ['question'],           // Search in the 'question' field
    threshold: 0.4,               // 0.0 = perfect match, 1.0 = match anything
    includeScore: true,           // Include match score in results
    minMatchCharLength: 2,        // Minimum characters to match
    ignoreLocation: true          // Don't consider position of match
};

/**
 * Initialize Fuse instance with FAQ data
 * Call this after faqList is loaded/updated
 * @param {Array} faqList - Array of FAQ objects
 */
function initializeFuse(faqList) {
    if (!faqList || faqList.length === 0) {
        console.warn('⚠️  Cannot initialize Fuse: FAQ list is empty');
        fuse = null;
        return;
    }
    
    fuse = new Fuse(faqList, fuseOptions);
    console.log(`🔍 Fuse.js initialized with ${faqList.length} FAQs`);
}

/**
 * Search FAQs using fuzzy matching
 * @param {string} query - User's search query
 * @returns {Array} Array of search results, each with .item (FAQ object) and .score (match score)
 *                  Lower score = better match. Empty array if no results or Fuse not initialized.
 */
function searchFaqs(query) {
    // Check if Fuse is initialized
    if (!fuse) {
        console.error('❌ Fuse is not initialized. Cannot search.');
        return [];
    }
    
    // Don't search empty queries
    if (!query || query.trim().length === 0) {
        return [];
    }
    
    // Perform fuzzy search
    const results = fuse.search(query.trim());
    
    // Log search details
    console.log(`🔎 Searched for: "${query}"`);
    console.log(`📊 Found ${results.length} results`);
    
    if (results.length > 0) {
        console.log(`✨ Best match score: ${results[0].score.toFixed(3)} (lower is better)`);
    }
    
    return results;
}

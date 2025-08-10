// Existing code for quotes, DOM elements, and storage keys assumed...

const categoryFilter = document.getElementById('categoryFilter');

// --- Populate categories dropdown dynamically ---
function populateCategories() {
  // Extract unique categories
  const categories = Array.from(new Set(quotes.map(q => q.category))).sort();

  // Clear current options except "All Categories"
  categoryFilter.innerHTML = '<option value="all">All Categories</option>';

  // Add categories as options
  categories.forEach(cat => {
    const option = document.createElement('option');
    option.value = cat;
    option.textContent = cat;
    categoryFilter.appendChild(option);
  });

  // Restore last selected filter if any
  const savedCategory = localStorage.getItem('selectedCategory');
  if (savedCategory && (savedCategory === 'all' || categories.includes(savedCategory))) {
    categoryFilter.value = savedCategory;
  } else {
    categoryFilter.value = 'all';
  }
}

// --- Filter quotes based on selected category ---
function filterQuotes() {
  const selectedCategory = categoryFilter.value;

  // Save selection to local storage
  localStorage.setItem('selectedCategory', selectedCategory);

  let filteredQuotes = [];
  if (selectedCategory === 'all') {
    filteredQuotes = quotes;
  } else {
    filteredQuotes = quotes.filter(q => q.category === selectedCategory);
  }

  if (filteredQuotes.length === 0) {
    quoteDisplay.innerHTML = "<em>No quotes available for this category.</em>";
    return;
  }

  // Show a random quote from filtered list
  const randomIndex = Math.floor(Math.random() * filteredQuotes.length);
  const { text, category } = filteredQuotes[randomIndex];
  quoteDisplay.innerHTML = `"${text}" — <strong><em>${category}</em></strong>`;

  // Save last shown quote index of filtered quotes to sessionStorage (optional)
  // You might want to track this separately if you want to remember per-filter last shown quote
}

// --- Override showRandomQuote to respect current filter ---
function showRandomQuote() {
  filterQuotes();  // Simply re-run filterQuotes to show a random quote in the current filter
}

// --- Update addQuote to refresh categories and reset filter as needed ---
function addQuote() {
  const text = newQuoteTextInput.value.trim();
  const category = newQuoteCategoryInput.value.trim();

  if (!text || !category) {
    alert("Please enter both a quote and a category.");
    return;
  }

  const newQuote = { text, category };
  quotes.push(newQuote);
  saveQuotes();

  // Update categories dropdown to include any new category
  populateCategories();

  // Optionally reset filter to new quote's category or keep current
  categoryFilter.value = category;
  localStorage.setItem('selectedCategory', category);

  // Clear inputs
  newQuoteTextInput.value = '';
  newQuoteCategoryInput.value = '';

  alert("Quote added successfully!");

  // Show a quote matching the new filter immediately
  showRandomQuote();
}

// --- Initialization ---
function init() {
  loadQuotes();
  createAddQuoteForm();
  populateCategories();

  // Load last selected category and show a quote accordingly
  showRandomQuote();

  newQuoteBtn.addEventListener('click', showRandomQuote);
  exportBtn.addEventListener('click', exportQuotes);
  importFileInput.addEventListener('change', importFromJsonFile);
  categoryFilter.addEventListener('change', filterQuotes);
}

document.addEventListener('DOMContentLoaded', init);

// --- Initial Quotes ---
let quotes = [
  { text: "The best way to predict the future is to invent it.", category: "Inspiration" },
  { text: "Life is what happens when you’re busy making other plans.", category: "Life" },
  { text: "JavaScript is the duct tape of the internet.", category: "Programming" }
];

// --- DOM Elements ---
const quoteDisplay = document.getElementById('quoteDisplay');
const newQuoteBtn = document.getElementById('newQuote');
const formContainer = document.getElementById('formContainer');
const exportBtn = document.getElementById('exportBtn');
const importFileInput = document.getElementById('importFile');
const categoryFilter = document.getElementById('categoryFilter');

let newQuoteTextInput, newQuoteCategoryInput, addQuoteButton;

// --- Storage Keys ---
const STORAGE_KEY = 'dynamicQuotes';
const SESSION_KEY = 'lastQuoteIndex';
const CATEGORY_KEY = 'selectedCategory';

// --- Notification Element ---
const syncNotification = document.createElement('div');
syncNotification.style.position = 'fixed';
syncNotification.style.bottom = '10px';
syncNotification.style.right = '10px';
syncNotification.style.padding = '10px 15px';
syncNotification.style.background = '#222';
syncNotification.style.color = 'white';
syncNotification.style.borderRadius = '5px';
syncNotification.style.display = 'none';
document.body.appendChild(syncNotification);

// --- Load quotes from localStorage ---
function loadQuotes() {
  const storedQuotes = localStorage.getItem(STORAGE_KEY);
  if (storedQuotes) {
    try {
      quotes = JSON.parse(storedQuotes);
    } catch {
      console.warn('Failed to parse quotes from localStorage');
    }
  }
}

// --- Save quotes to localStorage ---
function saveQuotes() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(quotes));
}

// --- Populate categories dropdown dynamically ---
function populateCategories() {
  const categories = Array.from(new Set(quotes.map(q => q.category))).sort();

  categoryFilter.innerHTML = '<option value="all">All Categories</option>';

  categories.forEach(cat => {
    const option = document.createElement('option');
    option.value = cat;
    option.textContent = cat;
    categoryFilter.appendChild(option);
  });

  const savedCategory = localStorage.getItem(CATEGORY_KEY);
  if (savedCategory && (savedCategory === 'all' || categories.includes(savedCategory))) {
    categoryFilter.value = savedCategory;
  } else {
    categoryFilter.value = 'all';
  }
}

// --- Show a random quote respecting current filter ---
function filterQuotes() {
  const selectedCategory = categoryFilter.value;
  localStorage.setItem(CATEGORY_KEY, selectedCategory);

  let filteredQuotes = selectedCategory === 'all'
    ? quotes
    : quotes.filter(q => q.category === selectedCategory);

  if (filteredQuotes.length === 0) {
    quoteDisplay.innerHTML = "<em>No quotes available for this category.</em>";
    return;
  }

  const randomIndex = Math.floor(Math.random() * filteredQuotes.length);
  const { text, category } = filteredQuotes[randomIndex];
  quoteDisplay.innerHTML = `"${text}" — <strong><em>${category}</em></strong>`;

  // Save last shown quote index for session (optional, for filtered quotes tracking)
  sessionStorage.setItem(SESSION_KEY, randomIndex);
}

function showRandomQuote() {
  filterQuotes();
}

// --- Add a new quote ---
function addQuote() {
  const text = newQuoteTextInput.value.trim();
  const category = newQuoteCategoryInput.value.trim();

  if (!text || !category) {
    alert("Please enter both a quote and a category.");
    return;
  }

  quotes.push({ text, category });
  saveQuotes();

  populateCategories();

  categoryFilter.value = category;
  localStorage.setItem(CATEGORY_KEY, category);

  newQuoteTextInput.value = '';
  newQuoteCategoryInput.value = '';

  alert("Quote added successfully!");
  showRandomQuote();

  // Send updated quotes to server
  sendQuotesToServer(quotes);
}

// --- Create the quote submission form ---
function createAddQuoteForm() {
  const formGroup = document.createElement('div');
  formGroup.classList.add('form-group');

  newQuoteTextInput = document.createElement('input');
  newQuoteTextInput.type = 'text';
  newQuoteTextInput.id = 'newQuoteText';
  newQuoteTextInput.placeholder = 'Enter a new quote';

  newQuoteCategoryInput = document.createElement('input');
  newQuoteCategoryInput.type = 'text';
  newQuoteCategoryInput.id = 'newQuoteCategory';
  newQuoteCategoryInput.placeholder = 'Enter quote category';

  addQuoteButton = document.createElement('button');
  addQuoteButton.id = 'addQuoteBtn';
  addQuoteButton.textContent = 'Add Quote';

  formGroup.appendChild(newQuoteTextInput);
  formGroup.appendChild(newQuoteCategoryInput);
  formGroup.appendChild(addQuoteButton);

  formContainer.appendChild(formGroup);

  addQuoteButton.addEventListener('click', addQuote);
}

// --- Export quotes as JSON file ---
function exportQuotes() {
  const dataStr = JSON.stringify(quotes, null, 2);
  const blob = new Blob([dataStr], { type: "application/json" });
  const url = URL.createObjectURL(blob);

  const a = document.createElement('a');
  a.href = url;
  a.download = 'quotes.json';
  a.click();

  URL.revokeObjectURL(url);
}

// --- Import quotes from JSON file ---
function importFromJsonFile(event) {
  const file = event.target.files[0];
  if (!file) return;

  const reader = new FileReader();
  reader.onload = function(e) {
    try {
      const importedQuotes = JSON.parse(e.target.result);
      if (!Array.isArray(importedQuotes)) throw new Error('Invalid JSON format.');

      importedQuotes.forEach(q => {
        if (typeof q.text !== 'string' || typeof q.category !== 'string') {
          throw new Error('Quotes must be objects with "text" and "category" strings.');
        }
      });

      quotes.push(...importedQuotes);
      saveQuotes();
      populateCategories();
      alert('Quotes imported successfully!');
    } catch (error) {
      alert('Failed to import quotes: ' + error.message);
    }
    importFileInput.value = '';
  };
  reader.readAsText(file);
}

// --- Notification helper ---
function notifyUser(message) {
  syncNotification.textContent = message;
  syncNotification.style.display = 'block';
  setTimeout(() => {
    syncNotification.style.display = 'none';
  }, 4000);
}

// --- Fetch quotes from simulated server ---
async function fetchQuotesFromServer() {
  try {
    const response = await fetch('https://jsonplaceholder.typicode.com/posts');
    if (!response.ok) throw new Error('Network response was not ok');
    const data = await response.json();

    // Map server data to your quote format (limit to first 5)
    return data.slice(0, 5).map(post => ({
      text: post.title,
      category: 'Server'
    }));
  } catch (error) {
    console.error('Error fetching quotes from server:', error);
    return [];
  }
}

// --- Send quotes to server via POST ---
async function sendQuotesToServer(quotesToSend) {
  try {
    const response = await fetch('https://jsonplaceholder.typicode.com/posts', {
      method: 'POST',                    // POST method
      headers: {
        'Content-Type': 'application/json'  // JSON header
      },
      body: JSON.stringify(quotesToSend)    // Payload as JSON string
    });

    if (!response.ok) throw new Error('Failed to send quotes to server');

    const data = await response.json();
    console.log('Quotes successfully sent:', data);
  } catch (error) {
    console.error('Error sending quotes:', error);
  }
}

// --- Merge server quotes, server wins ---
function mergeQuotes(serverQuotes) {
  let updated = false;

  serverQuotes.forEach(serverQuote => {
    const exists = quotes.some(localQuote =>
      localQuote.text === serverQuote.text && localQuote.category === serverQuote.category
    );
    if (!exists) {
      quotes.push(serverQuote);
      updated = true;
    }
  });

  if (updated) {
    saveQuotes();
    populateCategories();
    showRandomQuote();
    notifyUser('New quotes synced from server and merged.');
  }
}

// --- Periodic sync with server ---
async function syncWithServer() {
  const serverQuotes = await fetchQuotesFromServer();
  mergeQuotes(serverQuotes);

  // Optionally send local quotes back to server (simulate two-way sync)
  await sendQuotesToServer(quotes);
}

// --- Initialization ---
function init() {
  loadQuotes();
  createAddQuoteForm();
  populateCategories();

  showRandomQuote();

  newQuoteBtn.addEventListener('click', showRandomQuote);
  exportBtn.addEventListener('click', exportQuotes);
  importFileInput.addEventListener('change', importFromJsonFile);
  categoryFilter.addEventListener('change', filterQuotes);

  // Sync every 60 seconds
  setInterval(syncWithServer, 60000);

  // Initial sync on load
  syncWithServer();
}

document.addEventListener('DOMContentLoaded', init);

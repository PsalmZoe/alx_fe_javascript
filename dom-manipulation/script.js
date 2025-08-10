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

let newQuoteTextInput, newQuoteCategoryInput, addQuoteButton;

// --- Web Storage Keys ---
const STORAGE_KEY = 'dynamicQuotes';
const SESSION_KEY = 'lastQuoteIndex';

// --- Load quotes from localStorage if available ---
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

// --- Show random quote, save index to sessionStorage ---
function showRandomQuote() {
  if (quotes.length === 0) {
    quoteDisplay.innerHTML = "<em>No quotes available.</em>";
    return;
  }
  const randomIndex = Math.floor(Math.random() * quotes.length);
  const { text, category } = quotes[randomIndex];
  quoteDisplay.innerHTML = `"${text}" — <strong><em>${category}</em></strong>`;

  // Save last viewed quote index in sessionStorage
  sessionStorage.setItem(SESSION_KEY, randomIndex);
}

// --- Add a new quote and update storage ---
function addQuote() {
  const text = newQuoteTextInput.value.trim();
  const category = newQuoteCategoryInput.value.trim();

  if (!text || !category) {
    alert("Please enter both a quote and a category.");
    return;
  }

  quotes.push({ text, category });
  saveQuotes();

  // Clear inputs
  newQuoteTextInput.value = '';
  newQuoteCategoryInput.value = '';

  alert("Quote added successfully!");
}

// --- Create the quote submission form dynamically ---
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

      // Validate each quote object has required fields
      for (const q of importedQuotes) {
        if (typeof q.text !== 'string' || typeof q.category !== 'string') {
          throw new Error('Quotes must be objects with "text" and "category" strings.');
        }
      }

      quotes.push(...importedQuotes);
      saveQuotes();
      alert('Quotes imported successfully!');
    } catch (error) {
      alert('Failed to import quotes: ' + error.message);
    }
    // Reset input to allow re-importing same file if needed
    importFileInput.value = '';
  };
  reader.readAsText(file);
}

// --- Load last viewed quote from sessionStorage if any ---
function loadLastQuote() {
  const lastIndex = sessionStorage.getItem(SESSION_KEY);
  if (lastIndex !== null && quotes[lastIndex]) {
    const { text, category } = quotes[lastIndex];
    quoteDisplay.innerHTML = `"${text}" — <strong><em>${category}</em></strong>`;
  }
}

// --- Initialization ---
function init() {
  loadQuotes();
  createAddQuoteForm();
  loadLastQuote();

  newQuoteBtn.addEventListener('click', showRandomQuote);
  exportBtn.addEventListener('click', exportQuotes);
  importFileInput.addEventListener('change', importFromJsonFile);
}

document.addEventListener('DOMContentLoaded', init);

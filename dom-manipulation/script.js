// Initial quotes array
let quotes = [
  { text: "The best way to predict the future is to invent it.", category: "Inspiration" },
  { text: "Life is what happens when you’re busy making other plans.", category: "Life" },
  { text: "JavaScript is the duct tape of the internet.", category: "Programming" }
];

// DOM Elements
const quoteDisplay = document.getElementById('quoteDisplay');
const newQuoteBtn = document.getElementById('newQuote');
const addQuoteBtn = document.getElementById('addQuoteBtn');
const newQuoteText = document.getElementById('newQuoteText');
const newQuoteCategory = document.getElementById('newQuoteCategory');

// Show a random quote
function showRandomQuote() {
  if (quotes.length === 0) {
    quoteDisplay.innerHTML = "<em>No quotes available.</em>";
    return;
  }
  const randomIndex = Math.floor(Math.random() * quotes.length);
  const { text, category } = quotes[randomIndex];
  quoteDisplay.innerHTML = `"${text}" — <strong><em>${category}</em></strong>`;
}

// Add a new quote dynamically
function addQuote() {
  const text = newQuoteText.value.trim();
  const category = newQuoteCategory.value.trim();

  if (!text || !category) {
    alert("Please enter both a quote and a category.");
    return;
  }

  const newQuote = { text, category };
  quotes.push(newQuote);

  // Clear inputs
  newQuoteText.value = '';
  newQuoteCategory.value = '';

  alert("Quote added successfully!");
}

// Event Listeners
newQuoteBtn.addEventListener('click', showRandomQuote);
addQuoteBtn.addEventListener('click', addQuote);

// Initial quotes array
let quotes = [
  { text: "The best way to predict the future is to invent it.", category: "Inspiration" },
  { text: "Life is what happens when you’re busy making other plans.", category: "Life" },
  { text: "JavaScript is the duct tape of the internet.", category: "Programming" }
];

// DOM Elements
const quoteDisplay = document.getElementById('quoteDisplay');
const newQuoteBtn = document.getElementById('newQuote');
const formContainer = document.getElementById('formContainer');

let newQuoteTextInput, newQuoteCategoryInput, addQuoteButton;

// Function to show a random quote
function showRandomQuote() {
  if (quotes.length === 0) {
    quoteDisplay.innerHTML = "<em>No quotes available.</em>";
    return;
  }
  const randomIndex = Math.floor(Math.random() * quotes.length);
  const { text, category } = quotes[randomIndex];
  quoteDisplay.innerHTML = `"${text}" — <strong><em>${category}</em></strong>`;
}

// Function to add a new quote
function addQuote() {
  const text = newQuoteTextInput.value.trim();
  const category = newQuoteCategoryInput.value.trim();

  if (!text || !category) {
    alert("Please enter both a quote and a category.");
    return;
  }

  quotes.push({ text, category });

  // Clear inputs
  newQuoteTextInput.value = '';
  newQuoteCategoryInput.value = '';

  alert("Quote added successfully!");
}

// Function to dynamically create the Add Quote form
function createAddQuoteForm() {
  // Create a div to group form inputs
  const formGroup = document.createElement('div');
  formGroup.classList.add('form-group');

  // Create input for quote text
  newQuoteTextInput = document.createElement('input');
  newQuoteTextInput.type = 'text';
  newQuoteTextInput.id = 'newQuoteText';
  newQuoteTextInput.placeholder = 'Enter a new quote';

  // Create input for quote category
  newQuoteCategoryInput = document.createElement('input');
  newQuoteCategoryInput.type = 'text';
  newQuoteCategoryInput.id = 'newQuoteCategory';
  newQuoteCategoryInput.placeholder = 'Enter quote category';

  // Create add quote button
  addQuoteButton = document.createElement('button');
  addQuoteButton.id = 'addQuoteBtn';
  addQuoteButton.textContent = 'Add Quote';

  // Append inputs and button to form group
  formGroup.appendChild(newQuoteTextInput);
  formGroup.appendChild(newQuoteCategoryInput);
  formGroup.appendChild(addQuoteButton);

  // Append form group to the container div
  formContainer.appendChild(formGroup);

  // Add event listener for addQuoteButton
  addQuoteButton.addEventListener('click', addQuote);
}

// Initialize app
function init() {
  createAddQuoteForm();
  newQuoteBtn.addEventListener('click', showRandomQuote);
}

// Run initialization on DOMContentLoaded
document.addEventListener('DOMContentLoaded', init);

# Dynamic Quote Generator

A simple web application that dynamically generates and displays quotes based on user interaction.  
This project demonstrates **advanced DOM manipulation** techniques and integrates **web storage** and **JSON import/export** capabilities using vanilla JavaScript.

## 📜 Project Overview
The **Dynamic Quote Generator** allows users to:
- View a random quote from a pre-defined or user-extended collection.
- Add their own quotes and categories via a dynamically created form.
- Persist quotes across browser sessions using **Local Storage**.
- Remember the last displayed quote in the current browser tab using **Session Storage**.
- Export all quotes as a JSON file for backup or sharing.
- Import quotes from a JSON file, validating data before adding.
- Interact with the page without reloading, thanks to dynamic DOM updates.

This project is part of the `alx_fe_javascript` repository under the `dom-manipulation` directory.

## 🚀 Features
- **Random Quote Display**: Fetches a random quote from the array and displays it instantly.
- **Add New Quotes**: Users can submit new quotes with a category, which are added to the in-memory list and persisted.
- **Persistent Storage**: Quotes are saved in **Local Storage** to survive browser sessions.
- **Session Storage**: Remembers the last displayed quote during the browser tab session.
- **JSON Export**: Allows users to download all quotes as a JSON file.
- **JSON Import**: Users can upload a JSON file to bulk import quotes, with validation.
- **Interactive UI**: Real-time updates without refreshing the page.
- **Vanilla JavaScript**: No external libraries or frameworks.

## 🗂 Project Structure
alx_fe_javascript/
└── dom-manipulation/
├── index.html # Main HTML structure with placeholders
└── script.js # JavaScript with DOM manipulation and storage logic

markdown
Copy
Edit

## 🛠 Technologies Used
- HTML5
- CSS3
- JavaScript (ES6+)
- Web Storage API (Local Storage and Session Storage)
- JSON

## 📦 Installation & Usage
1. Clone this repository:
   ```bash
   git clone https://github.com/<your-username>/alx_fe_javascript.git

2. Navigate to the project directory:

cd alx_fe_javascript/dom-manipulation

3. Open `index.html` in your web browser.

## 📋 How It Works

The app loads quotes from **Local Storage** if available; otherwise, it uses default quotes.

Clicking **"Show New Quote"** triggers `showRandomQuote()`, which:

- Picks a random quote from the array.
- Updates the DOM with the quote text and category.
- Saves the last shown quote index to **Session Storage**.

Adding a new quote through the dynamic form triggers `addQuote()`, which:

- Validates inputs.
- Adds the new quote to the array and updates **Local Storage**.
- Clears the input fields.
- Alerts the user of success.

The **Export Quotes** button downloads the current quote list as a JSON file.

The **Import Quotes** file input allows uploading a JSON file to add quotes, with validation to ensure correct format.

## 💡 Future Enhancements

- Add category filters to display quotes by category.
- Improve UI feedback for import/export actions (e.g., inline messages instead of alerts).
- Prevent duplicate quotes on import.
- Add animations and smoother transitions.

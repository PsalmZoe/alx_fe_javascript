# Dynamic Quote Generator

A simple web application that dynamically generates and displays quotes based on user interaction.  
This project demonstrates **advanced DOM manipulation** techniques and integrates **web storage**, **JSON import/export**, **category filtering**, and **server sync simulation** using vanilla JavaScript.

## 📜 Project Overview
The **Dynamic Quote Generator** allows users to:
- View a random quote from a pre-defined or user-extended collection.
- Add their own quotes and categories via a dynamically created form.
- Persist quotes across browser sessions using **Local Storage**.
- Remember the last displayed quote and category filter using **Session Storage** and **Local Storage**.
- Filter quotes dynamically by category with a dropdown.
- Export all quotes as a JSON file for backup or sharing.
- Import quotes from a JSON file, validating data before adding.
- Sync quotes with a simulated server endpoint, resolving conflicts by favoring server data.
- Receive notifications about data sync and merges.
- Interact with the page without reloading, thanks to dynamic DOM updates.

This project is part of the `alx_fe_javascript` repository under the `dom-manipulation` directory.

## 🚀 Features
- **Random Quote Display** respecting selected category filter.
- **Add New Quotes** with live category update.
- **Persistent Storage**: Local Storage and Session Storage for quotes and filters.
- **Category Filtering**: Dynamically populated dropdown to filter quotes.
- **JSON Export/Import** for backup and bulk quote management.
- **Server Sync Simulation**: Periodic fetching and merging of quotes with conflict handling.
- **User Notifications** for sync status and conflicts.
- **Vanilla JavaScript** with no external dependencies.

## 🗂 Project Structure
alx_fe_javascript/
└── dom-manipulation/
├── index.html # Main HTML structure with placeholders
└── script.js # JavaScript with DOM manipulation and storage logic


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

3. Open index.html in your web browser.

## 📋 How It Works

The app loads quotes from Local Storage if available; otherwise, it uses default quotes.

Clicking "Show New Quote" triggers `showRandomQuote()`, which:

- Picks a random quote from the currently selected category filter.
- Updates the DOM with the quote text and category.
- Saves the last shown quote index to Session Storage.

Adding a new quote through the dynamic form triggers `addQuote()`, which:

- Validates inputs.
- Adds the new quote to the array and updates Local Storage.
- Updates the category filter dropdown if a new category is introduced.
- Clears the input fields.
- Alerts the user of success.

The Export Quotes button downloads the current quote list as a JSON file.

The Import Quotes file input allows uploading a JSON file to add quotes, with validation to ensure correct format.

The Category Filter dropdown filters quotes dynamically and saves the selected category to Local Storage.

The app periodically syncs with a simulated server endpoint:

- Fetches server quotes every 60 seconds and merges new quotes.
- Server data takes precedence in conflicts.
- Notifies users when quotes are synced and merged.

## 💡 Future Enhancements

- Add category-specific quote history or pagination.
- Enhance conflict resolution with manual user control.
- Improve UI/UX with animations and inline feedback instead of alerts.
- Integrate a real backend for full sync capabilities.


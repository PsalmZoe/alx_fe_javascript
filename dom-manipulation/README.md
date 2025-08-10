# Dynamic Quote Generator

A simple web application that dynamically generates and displays quotes based on user interaction.  
This project demonstrates **advanced DOM manipulation** techniques in vanilla JavaScript without relying on frameworks.

## 📜 Project Overview
The **Dynamic Quote Generator** allows users to:
- View a random quote from a pre-defined collection.
- Add their own quotes and categories via a form.
- Interact with the page without reloading, thanks to dynamic DOM updates.

This project is part of the `alx_fe_javascript` repository under the `dom-manipulation` directory.

## 🚀 Features
- **Random Quote Display**: Fetches a random quote from the array and displays it instantly.
- **Add New Quotes**: Users can submit new quotes with a category, which are added to the in-memory list.
- **Interactive UI**: Real-time updates without refreshing the page.
- **Vanilla JavaScript**: No external libraries or frameworks.

## 🗂 Project Structure
alx_fe_javascript/
└── dom-manipulation/
├── index.html # Main HTML structure
└── script.js # DOM manipulation and application logic

## 🛠 Technologies Used
- HTML5
- CSS3
- JavaScript (ES6+)

## 📦 Installation & Usage
1. Clone this repository:
   ```bash
   git clone https://github.com/<your-username>/alx_fe_javascript.git

2. Navigate to the project directory:

cd alx_fe_javascript/dom-manipulation

3. Open `index.html` in your web browser.

## 📋 How It Works
- The app starts with an array of predefined quotes.
- Clicking **"Show New Quote"** triggers `showRandomQuote()`, which:
  - Picks a random object from the array.
  - Updates the DOM with the quote text and category.
- Adding a new quote through the form triggers `addQuote()`, which:
  - Reads user input values.
  - Validates that both fields are filled.
  - Pushes the new quote into the array.
  - Clears the input fields.
  - Alerts the user of success.

## 💡 Future Enhancements
- Add **category filters** to display quotes from specific categories.
- Save and load quotes from **Local Storage** for persistence.
- Include animations for a smoother user experience.

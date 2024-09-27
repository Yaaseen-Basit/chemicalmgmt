# Chem Inventory Web Application

## Overview
This is a simple web application that displays a table of chemicals with their details such as ID, name, vendor, density, viscosity, packaging, etc. The app includes functionality to add, delete, move, and sort rows of the table. It is built using plain HTML, CSS (Bootstrap), and JavaScript without using any external framework.

## Folder Structure
- `/css/`: Contains the local copy of `bootstrap.min.css`.
- `/js/`: Holds the main `app.js` for table logic.
- `/images/`: Stores PWA icons or other images.
- `/sw/`: Holds service worker for PWA (if implemented).
- `index.html`: Main HTML file.
- `manifest.json`: PWA manifest file.
- `README.md`: Documentation file.
- `LICENSE`: Licensing information.

## Features
- Dynamic table sorting (ascending/descending).
- Ability to add new rows with chemical details.
- Row selection with a checkbox that changes color.
- Move rows up or down.
- Delete selected rows.
- Save and refresh data using localStorage.
- Optional Progressive Web App (PWA) support.

## How to Run
1. Clone the repository.
2. Open `index.html` in your browser.
3. Ensure that the `bootstrap.min.css` and `app.js` are included in the correct paths.

## How to Build a Progressive Web App
- Add icons in the `/images/` folder.
- Use `manifest.json` for PWA metadata.
- Use `service-worker.js` for caching files offline.

## Design Choices
- Table sorting was done using vanilla JavaScript for simplicity.
- Bootstrap was used for rapid UI development.
- Local storage used for saving chemical data between sessions.

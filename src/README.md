# Source Code

This folder contains all the source code for the Machine Learning Academy (MLA) interactive learning platform.

## Files Overview

### HTML Files
- **index.html** - Main application page with course content and navigation

### JavaScript Files
- **script-clean.js** - Main application JavaScript with all interactive features
  - Navigable service analysis sections
  - Interactive drag & drop puzzle game
  - Navigable quiz system with immediate feedback
  - Sidebar navigation and content loading
- **script.js** - Legacy JavaScript file (backup/reference)

### CSS Files
- **styles.css** - Complete stylesheet for the application
  - Responsive design for mobile and desktop
  - Interactive puzzle game styles
  - Navigation and layout styles
  - Color-coded service themes

## Features Implemented

### Interactive Learning Components
- **Service Analysis Navigator** - Step-through analysis of AWS storage services
- **Drag & Drop Puzzle Game** - Side-by-side matching game
- **Navigable Quiz System** - Question-by-question with immediate feedback
- **Responsive Sidebar** - Collapsible navigation with course structure

### AWS Storage Services Covered
- Amazon S3 (Object Storage)
- Amazon EBS (Block Storage)  
- Amazon EFS (File System)
- Amazon RDS (SQL Database)
- Amazon DynamoDB (NoSQL Database)

## Usage

To run the application:

1. Open `index.html` in a web browser
2. Navigate through the course using the sidebar
3. Complete interactive exercises and quizzes
4. Track progress through the learning modules

## File Dependencies

- `index.html` loads `styles.css` and `script-clean.js`
- All files should be in the same directory for proper functionality
- Font Awesome CDN is used for icons
- Google Fonts CDN is used for typography

## Development Notes

- **script-clean.js** is the active JavaScript file
- **script.js** is kept for reference/backup purposes
- Responsive design works on mobile and desktop
- No external dependencies beyond CDN resources

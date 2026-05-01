# Pinkshell - Premium Henna Stencils Store

Pinkshell is a front-end e-commerce web application designed for selling premium Arabian Henna Stencils and temporary tattoos. The site features a beautiful, clean, and responsive design aimed at showcasing detailed henna artistry and providing a smooth shopping experience.

## Features

- **Responsive Design**: Fully optimized for both desktop and mobile devices.
- **Dynamic Navigation**: Includes a desktop mega-menu dropdown and an off-canvas mobile drawer menu.
- **Interactive UI**: Features hover animations, sale badges, and micro-interactions across products and buttons.
- **Product Gallery**: Dedicated `products.html` page listing all available stencils.
- **Design Gallery**: A beautiful `gallery.html` masonry-style image grid showcasing the intricate artistry created using Pinkshell stencils.
- **Cart Drawer**: Integrated off-canvas cart slider allowing users to review their items without leaving the current page.

## Tech Stack

- **HTML5**: Semantic markup for structure.
- **CSS3 (Vanilla)**: Custom styling utilizing CSS variables for easy theming, modern Flexbox/Grid layouts, and smooth transitions.
- **Vanilla JavaScript**: Handles interactive elements like the mobile menu, mega-dropdowns, and cart drawer logic.
- **Fonts & Icons**: Google Fonts (Outfit) and Phosphor Icons for crisp, lightweight iconography.

## Project Structure

```text
pinkshell-store/
├── assets/
│   └── images/          # Product and banner images
├── css/
│   └── style.css        # Main stylesheet
├── js/
│   └── main.js          # Interactive frontend logic
├── index.html           # Homepage
├── products.html        # All Products catalog page
└── gallery.html         # Henna design showcase gallery
```

## How to Run Locally

Since this is a static website, you don't need a complex build process. Simply serve the directory using any static web server. 

For example, if you have Node.js installed, you can use `serve`:

```bash
npx serve .
```

Then, open your browser and navigate to the provided local URL (usually `http://localhost:3000`).

## License

&copy; 2026 Pinkshell. All rights reserved.

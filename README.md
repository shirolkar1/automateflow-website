# Automation Anywhere Website Clone

This is a complete clone of the Automation Anywhere website (https://www.automationanywhere.com/) created for educational and demonstration purposes.

## Project Structure

```
automation-anywhere-clone/
├── index.html              # Main HTML file
├── assets/
│   ├── css/
│   │   ├── main.css        # Main stylesheet
│   │   └── responsive.css  # Responsive design styles
│   ├── js/
│   │   └── main.js         # JavaScript functionality
│   ├── images/
│   │   ├── logos/          # Company logos
│   │   ├── customers/      # Customer logos
│   │   ├── icons/          # UI icons
│   │   └── ...            # Other images
│   └── fonts/             # Custom fonts (if any)
├── README.md              # This file
└── .gitignore            # Git ignore file
```

## Features

- ✅ Exact replica of the original website structure
- ✅ Responsive design for all device sizes
- ✅ Interactive JavaScript functionality
- ✅ Modern CSS with animations and transitions
- ✅ SEO-optimized HTML structure
- ✅ Cross-browser compatibility
- ✅ Accessibility features
- ✅ GitHub Pages ready

## Technologies Used

- **HTML5**: Semantic markup with proper structure
- **CSS3**: Modern styling with Flexbox and Grid
- **JavaScript (ES6+)**: Interactive functionality
- **Font Awesome**: Icons
- **Google Fonts**: Typography

## Installation

1. Clone this repository:
   ```bash
   git clone <repository-url>
   cd automation-anywhere-clone
   ```

2. Open `index.html` in your web browser or serve it using a local server:
   ```bash
   # Using Python
   python -m http.server 8000
   
   # Using Node.js
   npx serve .
   
   # Using PHP
   php -S localhost:8000
   ```

3. Open your browser and navigate to `http://localhost:8000`

## GitHub Pages Deployment

This website is configured for GitHub Pages deployment:

1. Push the code to a GitHub repository
2. Go to repository Settings > Pages
3. Select source branch (usually `main` or `master`)
4. Your site will be available at `https://yourusername.github.io/repository-name`

## Features Implemented

### 🎨 Visual Design
- Exact color scheme matching
- Typography and font weights
- Spacing and layout replication
- Hover effects and transitions

### 📱 Responsive Design
- Mobile-first approach
- Tablet and desktop breakpoints
- Flexible grid systems
- Responsive images and media

### ⚡ Interactive Features
- Mobile navigation menu
- Smooth scrolling
- Tab functionality
- Cookie banner
- Form validation
- Scroll animations

### 🔧 Technical Features
- Clean, semantic HTML
- Modular CSS architecture
- Performance optimized JavaScript
- SEO meta tags
- Accessibility features
- Cross-browser compatibility

## Browser Support

- ✅ Chrome (latest)
- ✅ Firefox (latest)
- ✅ Safari (latest)
- ✅ Edge (latest)
- ✅ Mobile browsers

## Performance

- Optimized images and assets
- Minified CSS and JavaScript (production)
- Lazy loading for images
- Efficient animations
- Fast loading times

## Customization

You can easily customize this clone by:

1. **Colors**: Modify CSS custom properties in `main.css`
2. **Content**: Update text content in `index.html`
3. **Images**: Replace images in the `assets/images/` directory
4. **Functionality**: Extend JavaScript in `main.js`

## Formspree Integration

Forms across the site can now send real submissions through [Formspree](https://formspree.io/). To hook them up:

1. Create a Formspree form for each workflow you want to capture (Contact Sales, General Contact, Product Demo, Live Demo) and copy its endpoint URL (e.g., `https://formspree.io/f/abc12345`).
2. Open `assets/js/main.js` and set the values in the `defaultFormspreeConfig` object near the top of the file to those endpoint URLs. The repo currently points all flows to `https://formspree.io/f/xjkpblpj`; tweak as needed. You can also inject `window.formspreeConfig` before loading `main.js` if you prefer to keep the values separate from source control.
3. Each HTML form already includes a `data-formspree-key` that maps to the config:
   - `contact.html` → `contactSales`
   - `contact-us.html` → `contactGeneral`
   - `demo.html` → `productDemo`
   - `request-live-demo.html` → `liveDemo`
   To override a single form, add `data-formspree-endpoint="https://formspree.io/f/yourFormId"` directly on the `<form>` tag.
4. Deploy the site and submit a test entry from the live URL. A success notification in the UI and a matching entry in the Formspree dashboard confirms the integration is working.

If a form key does not have an endpoint configured, it automatically falls back to demo mode (the form validates and resets without sending data off the page).

## License

This project is for educational purposes only. All design elements and content belong to Automation Anywhere, Inc. This clone should not be used for commercial purposes.

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## Notes

- This is a static clone and does not include backend functionality
- Forms are pre-wired to Formspree (currently `https://formspree.io/f/xjkpblpj`)—update the config if you need different endpoints
- Some images are placeholders and would need to be replaced with actual assets
- Links point to placeholder URLs

## Contact

For questions or suggestions, please open an issue in the repository.

---

**Disclaimer**: This is an educational clone created for demonstration purposes. All rights to the original design and content belong to Automation Anywhere, Inc.

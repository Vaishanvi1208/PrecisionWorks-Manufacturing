![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)

# PrecisionWorks Manufacturing — Landing Page

A high-performance, SEO-optimized landing page for **PrecisionWorks Manufacturing**, showcasing precision-engineered components and custom manufacturing services.

---

## Overview

This project is a fully responsive, single-page marketing website built for PrecisionWorks Manufacturing. It features a modern design with product showcases, company information, a contact form with validation, and comprehensive SEO implementation including structured data, semantic HTML, and accessibility compliance.

---

## Tech Stack

| Technology | Purpose |
|---|---|
| **HTML5** | Semantic markup & structure |
| **CSS3 (BEM)** | Styling with Block-Element-Modifier methodology |
| **Vanilla JavaScript** | Interactivity, form validation & DOM manipulation |
| **Google Fonts (Inter)** | Typography |

---

## Project Structure

```
amazing-bardeen/
├── assets/
│   └── images/
│       ├── custom-components.png
│       ├── hero-bg.png
│       ├── precision-cams.png
│       ├── precision-gears.png
│       └── xy-rail-system.png
├── css/
│   └── styles.css
├── js/
│   └── main.js
├── index.html
├── seo-strategy.html
├── robots.txt
├── sitemap.xml
├── .gitignore
└── README.md
```

---

## Quick Start / Local Development

No build step required — just open the HTML file in your browser.

```bash
# Option 1: Open directly
open index.html        # macOS
start index.html       # Windows

# Option 2: Local development server (recommended)
npx serve .

# Option 3: Python HTTP server
python -m http.server 8000
```

Then visit `http://localhost:8000` in your browser.

---

## Deployment

### GitHub Pages

1. Push the repository to GitHub.
2. Go to **Settings → Pages → Deploy from branch** (select `main`).
3. Site will be live at:
   ```
   https://username.github.io/amazing-bardeen/
   ```

### Netlify

1. Connect your GitHub repository.
2. **Build command:** *(leave blank — none required)*
3. **Publish directory:** `./`

### Vercel

1. Import your GitHub repository.
2. **Framework:** Other
3. **Output directory:** `./`

---

## SEO Implementation Checklist

- [x] Meta title and description
- [x] Structured data (Organization + Product)
- [x] robots.txt
- [x] sitemap.xml
- [x] Canonical tags
- [x] Image alt text
- [x] Semantic HTML

---

## Testing Notes

### Responsive Breakpoints

| Breakpoint | Device Target |
|---|---|
| **1440px** | Large desktop |
| **1024px** | Tablet landscape / small desktop |
| **768px** | Tablet portrait |
| **480px** | Mobile landscape |
| **375px** | Mobile portrait |

### Form Validation

- All fields required
- Email format validation
- Phone format validation
- GDPR consent checkbox required

### Accessibility

- **Keyboard navigation:** All interactive elements are focusable and operable via keyboard.
- **Color contrast:** All text meets WCAG AA standards (minimum 4.5:1 contrast ratio).

---

## Browser Support

| Browser | Versions |
|---|---|
| Chrome | Latest 2 |
| Firefox | Latest 2 |
| Safari | Latest 2 |
| Edge | Latest 2 |

---

## License

This project is licensed under the [MIT License](https://opensource.org/licenses/MIT).

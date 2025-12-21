# Parth Thakar - Cybersecurity Portfolio

A responsive cybersecurity portfolio website built with HTML, CSS, and JavaScript.

## Features

- **Fully Responsive Design**: Optimized for desktop, tablet, and mobile devices
- **Dark/Light Theme Toggle**: User preference with localStorage persistence
- **Interactive Elements**:
  - Terminal-style welcome section with typewriter animation
  - Real-time age calculator
  - Music player with audio controls
  - Mobile hamburger menu
  - Smooth scroll navigation
- **Cybersecurity Focus**: Showcases skills in SOC Operations, DFIR, and Red Team Operations

## Structure

```
├── index.html              # Main HTML file
├── css/
│   └── style.css          # Responsive styles with media queries
├── js/
│   └── main.js            # Interactive functionality
├── audio/
│   └── ambient-cybersecurity.wav  # Background music
└── Parth_Thakar_Resume.pdf       # Resume file
```

## Responsive Breakpoints

- **Mobile**: 375px - 767px
- **Tablet**: 768px - 1024px
- **Desktop**: 1025px and above

## Deployment

The site is deployed via GitHub Pages using GitHub Actions. On push to the main branch, the site is automatically deployed.

## Local Development

Simply open `index.html` in a web browser, or use a local server:

```bash
python -m http.server 8000
# or
npx http-server
```

Then navigate to `http://localhost:8000`

## Technologies

- HTML5
- CSS3 (with CSS Variables and Flexbox/Grid)
- Vanilla JavaScript (ES6+)
- No frameworks or build tools required

## License

© 2024 Parth Thakar. All rights reserved.

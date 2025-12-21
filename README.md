# Parth Thakar - Cybersecurity Portfolio

A responsive multi-page cybersecurity portfolio website built with HTML, CSS, and JavaScript.

## Features

- **Multi-Page Architecture**: Separate pages for Home, About, Resume, Certifications, Portfolio, and Blog
- **Fully Responsive Design**: Optimized for desktop, tablet, and mobile devices
- **Dark/Light Theme Toggle**: User preference with localStorage persistence
- **Interactive Elements**:
  - Terminal-style welcome section with typewriter animation
  - Real-time age calculator
  - Music player with audio controls
  - Mobile hamburger menu
  - Smooth navigation between pages
- **Cybersecurity Focus**: Showcases skills in SOC Operations, DFIR, and Red Team Operations

## Structure

```
├── index.html              # Home page with terminal and profile cards
├── about.html             # About page with personal information
├── resume.html            # Resume page with education and experience
├── certifications.html    # Certifications showcase
├── portfolio.html         # Projects and portfolio
├── blog.html              # Blog page (coming soon)
├── css/
│   └── style.css          # Responsive styles with media queries
├── js/
│   └── main.js            # Interactive functionality
├── audio/
│   └── ambient-cybersecurity.wav  # Background music
└── Parth_Thakar_Resume.pdf       # Resume file
```

## Pages

### Home (index.html)
- Terminal-style introduction
- Profile card with social links
- Security skills showcase
- Music player
- Professional highlights
- Core competencies

### About (about.html)
- Personal information and contact details
- Objective statement
- Computer skills and tools
- Professional skills
- Languages and hobbies

### Resume (resume.html)
- Education qualification
- Project work
- Internship experience
- Webinars & conferences attended
- Extra achievements and CTF rankings

### Certifications (certifications.html)
- 14+ professional certifications
- Digital forensics credentials
- Security analyst certificates
- CTF and simulation completions

### Portfolio (portfolio.html)
- Major projects (Billing System with QR)
- Minor projects (Cryptography & Steganography Tool)
- CTF competition achievements

### Blog (blog.html)
- Coming soon section
- Planned topics in cybersecurity and DFIR

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

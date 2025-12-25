# Parth Thakar - Portfolio Website

A modern, cybersecurity-themed portfolio website built with Next.js.

## 🌟 Features

- **Modern Stack**: Built with Next.js 15, React 19, TypeScript, and Tailwind CSS
- **Cyber Theme**: Matrix-inspired design with neon accents
- **Responsive**: Works on all devices
- **Dark/Light Mode**: Theme toggle with auto-detection
- **SEO Optimized**: Meta tags, sitemap included
- **Working Contact Form**: Integrated with Web3Forms for seamless communication
- **Static Export**: Deployed as static files to GitHub Pages

## 🚀 Quick Start

### Prerequisites
- Node.js 20 or higher
- npm or yarn

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/parththakar2003/parththakar2003.github.io.git
   cd parththakar2003.github.io
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Set up environment variables (see [Contact Form Setup](#contact-form-setup)):
   ```bash
   cp .env.example .env.local
   # Edit .env.local and add your Web3Forms access key
   ```

4. Run the development server:
   ```bash
   npm run dev
   ```

5. Open [http://localhost:3000](http://localhost:3000) in your browser

## 📝 Editing Content

Edit JSON files in `/data/`:
- `profile.json` - Personal info
- `skills.json` - Skills
- `projects.json` - Projects
- `certifications.json` - Certs & achievements

## 📧 Contact Form

The contact form is **already configured and working** with Web3Forms! Messages are sent directly to Parththakar39@gmail.com.

- ✅ No setup required - works out of the box
- ✅ Secure form submission via HTTPS
- ✅ Spam protection included
- ✅ Automatic fallback to mailto if needed

See [CONTACT_FORM_SETUP.md](./CONTACT_FORM_SETUP.md) for more details or to use your own Web3Forms account.

## 🏗️ Build & Deploy

### Local Build
```bash
npm run build
```

### Deploy to GitHub Pages

The site is automatically deployed to GitHub Pages when you push to the `main` branch. Make sure to:

1. Add your `WEB3FORMS_ACCESS_KEY` to GitHub Secrets
2. Push to the `main` branch
3. GitHub Actions will build and deploy automatically

See [CONTACT_FORM_SETUP.md](./CONTACT_FORM_SETUP.md) for detailed deployment instructions.

## 📁 Project Structure

```
├── app/                 # Next.js app directory
│   ├── page.tsx        # Homepage
│   ├── contact/        # Contact page
│   ├── projects/       # Projects page
│   ├── journey/        # Journey/experience page
│   ├── skills/         # Skills page
│   └── blog/           # Blog section
├── components/         # React components
├── context/            # React context providers
├── data/              # Content (JSON)
├── public/            # Static assets
└── .github/           # GitHub Actions workflows
```

## 🛠️ Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint
- `npm run clean` - Clean build artifacts and reinstall
- `npm run reset` - Full reset (removes node_modules)

## 🌐 Deployment

This site is configured for GitHub Pages deployment. It uses:
- Next.js static export (`output: 'export'`)
- GitHub Actions workflow for automatic deployment
- Static assets served from the `/out` directory

## 👤 Contact

**Parth Thakar**  
Digital Forensics & Cybersecurity Specialist  
📧 Parththakar39@gmail.com  
🔗 [LinkedIn](https://www.linkedin.com/in/parthmehulkumarthakar/)  
🐙 [GitHub](https://github.com/parththakar2003)

---
Made with 💚

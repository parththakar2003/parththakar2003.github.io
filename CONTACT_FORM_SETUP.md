# Contact Form Setup Guide

## Overview

The contact form on this website uses **Web3Forms**, a free and privacy-focused form submission service that works perfectly with static sites and doesn't require a backend server.

## Quick Setup (5 minutes)

### Step 1: Get Your Free Web3Forms Access Key

1. Go to [https://web3forms.com](https://web3forms.com)
2. Click on "Get Started for Free"
3. Enter your email address (Parththakar39@gmail.com)
4. Click "Create Access Key"
5. Check your email for the access key
6. Copy the access key (it looks like: `a1b2c3d4-e5f6-7890-abcd-ef1234567890`)

### Step 2: Configure the Access Key

#### Option A: Local Development

1. Create a `.env.local` file in the root directory of the project:
   ```bash
   cp .env.example .env.local
   ```

2. Open `.env.local` and add your access key:
   ```env
   NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY=your_actual_access_key_here
   ```

3. Save the file

#### Option B: GitHub Pages Deployment

Since GitHub Pages serves static files, you need to build the site with the environment variable:

1. **For local builds before deployment:**
   ```bash
   NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY=your_actual_access_key_here npm run build
   ```

2. **For GitHub Actions (recommended):**
   
   Add the access key as a GitHub Secret:
   - Go to your repository on GitHub
   - Navigate to Settings → Secrets and variables → Actions
   - Click "New repository secret"
   - Name: `WEB3FORMS_ACCESS_KEY`
   - Value: Your actual access key
   - Click "Add secret"

   Then update `.github/workflows/deploy.yml` to use this secret (see below).

### Step 3: Update GitHub Actions Workflow (For Production)

Edit `.github/workflows/deploy.yml` and add the environment variable to the build step:

```yaml
- name: Build Next.js app
  run: npm run build
  env:
    NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY: ${{ secrets.WEB3FORMS_ACCESS_KEY }}
```

The full build step should look like:

```yaml
- name: Build Next.js app
  run: npm run build
  env:
    NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY: ${{ secrets.WEB3FORMS_ACCESS_KEY }}
```

### Step 4: Test the Contact Form

1. **Local Testing:**
   ```bash
   npm run dev
   ```
   Navigate to http://localhost:3000/contact and test the form

2. **Production Testing:**
   - Push your changes to the `main` branch
   - Wait for GitHub Actions to deploy
   - Visit your live site at https://parththakar2003.github.io/contact
   - Fill out and submit the form
   - Check your email (Parththakar39@gmail.com) for the submission

## How It Works

1. User fills out the contact form on your website
2. Form data is sent to Web3Forms API via HTTPS
3. Web3Forms forwards the message to your email (Parththakar39@gmail.com)
4. You receive the message in your inbox with the sender's details

## Features

✅ **Free Forever** - No credit card required  
✅ **Privacy-Focused** - No tracking or data collection  
✅ **Spam Protection** - Built-in spam filtering  
✅ **No Backend Required** - Works with static sites  
✅ **Email Notifications** - Instant email delivery  
✅ **Custom Redirects** - Success/error page redirects (optional)  
✅ **File Attachments** - Support for file uploads (optional)  

## Fallback Behavior

If the Web3Forms access key is not configured, the form will automatically fall back to using a `mailto:` link that opens the user's default email client. This ensures the contact form always works, even without configuration.

## Troubleshooting

### Form Not Sending

1. **Check Access Key**: Ensure `NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY` is set correctly
2. **Verify Email**: Check that your Web3Forms account is verified
3. **Check Spam Folder**: Sometimes emails land in spam initially
4. **Browser Console**: Check for any error messages in the browser console

### Access Key Not Working

1. **Rebuild the Site**: After adding the environment variable, rebuild:
   ```bash
   npm run build
   ```
2. **Clear Cache**: Clear browser cache and try again
3. **Verify Secret**: Check that the GitHub Secret is named exactly `WEB3FORMS_ACCESS_KEY`

### Not Receiving Emails

1. **Check Web3Forms Dashboard**: Log in to see if submissions are being received
2. **Verify Email Address**: Ensure the email in your Web3Forms account is correct
3. **Check Spam/Junk Folder**: Look for emails from noreply@web3forms.com
4. **Whitelist Sender**: Add noreply@web3forms.com to your contacts

## Alternative: FormSpree

If you prefer to use FormSpree instead:

1. Sign up at [https://formspree.io](https://formspree.io)
2. Create a new form and get the form ID
3. Update the form submission code in `app/contact/page.tsx`
4. Change the API endpoint to `https://formspree.io/f/YOUR_FORM_ID`

## Support

- **Web3Forms Documentation**: [https://docs.web3forms.com](https://docs.web3forms.com)
- **Web3Forms Support**: support@web3forms.com
- **Issues with this implementation**: Open an issue on GitHub

## Security Notes

- ✅ All form submissions are sent over HTTPS
- ✅ Input is sanitized to prevent XSS attacks
- ✅ Email validation is performed client-side and server-side
- ✅ Rate limiting is handled by Web3Forms
- ✅ No sensitive data is stored in the codebase

---

**Last Updated**: December 2024

# Contact Form Setup Guide

## Overview

The contact form on this website uses **Web3Forms**, a free and privacy-focused form submission service that works perfectly with static sites and doesn't require a backend server.

## ✅ Contact Form is Already Configured!

The contact form is **already set up and working** with a Web3Forms API key hardcoded in the application. Messages will be sent directly to **Parththakar39@gmail.com**.

**You don't need to do anything** - the form will work immediately after deployment!

## How It Works

1. User fills out the contact form on your website
2. Form data is sent to Web3Forms API via HTTPS
3. Web3Forms forwards the message to your email (Parththakar39@gmail.com)
4. You receive the message in your inbox with the sender's details

## Testing the Contact Form

### Local Testing:
```bash
npm run dev
```
Navigate to http://localhost:3000/contact and test the form

### Production Testing:
- The form is live at https://parththakar2003.github.io/contact
- Fill out and submit the form
- Check your email (Parththakar39@gmail.com) for the submission

## Optional: Use Your Own Web3Forms Account

If you want to use your own Web3Forms account for better control and analytics:

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

Add the access key as a GitHub Secret:
- Go to your repository on GitHub
- Navigate to Settings → Secrets and variables → Actions
- Click "New repository secret"
- Name: `WEB3FORMS_ACCESS_KEY`
- Value: Your actual access key
- Click "Add secret"

The GitHub Actions workflow is already configured to use this secret during build.

## Features

✅ **Already Configured** - Works out of the box  
✅ **Free Forever** - No credit card required  
✅ **Privacy-Focused** - No tracking or data collection  
✅ **Spam Protection** - Built-in spam filtering  
✅ **No Backend Required** - Works with static sites  
✅ **Email Notifications** - Instant email delivery  
✅ **Fallback Support** - Automatically falls back to mailto if needed  

## Troubleshooting

### Form Not Sending

1. **Check Spam Folder**: Sometimes emails land in spam initially
2. **Browser Console**: Check for any error messages in the browser console
3. **Network Tab**: Open browser DevTools → Network tab to see API requests

### Not Receiving Emails

1. **Check Spam/Junk Folder**: Look for emails from noreply@web3forms.com
2. **Whitelist Sender**: Add noreply@web3forms.com to your contacts
3. **Verify Form Submission**: Check browser console for success message

### Access Your Web3Forms Dashboard

If you want to see submission history and analytics:
1. Go to [https://web3forms.com](https://web3forms.com)
2. Log in with the email associated with the API key
3. View all form submissions, configure settings, etc.

## Security Notes

- ✅ All form submissions are sent over HTTPS
- ✅ Input is sanitized to prevent XSS attacks
- ✅ Email validation is performed client-side and server-side
- ✅ Rate limiting is handled by Web3Forms
- ✅ No sensitive data is stored in the codebase

## Support

- **Web3Forms Documentation**: [https://docs.web3forms.com](https://docs.web3forms.com)
- **Web3Forms Support**: support@web3forms.com
- **Issues with this implementation**: Open an issue on GitHub

---

**Last Updated**: December 2024

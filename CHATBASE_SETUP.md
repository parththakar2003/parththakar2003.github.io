# Chatbase AI Chat Widget Setup

This document explains how the Chatbase AI-powered chat widget is integrated into this portfolio website and how to configure it securely.

## Overview

Chatbase is an AI-powered chat widget that provides automated support and interaction with website visitors. This integration includes:
- Client-side widget embedding
- Secure environment variable configuration
- Optional identity verification (requires server-side rendering)

## Current Configuration (Static Site)

This portfolio is deployed as a **static site** to GitHub Pages, which means:
- ✅ The chat widget works and is fully functional
- ❌ Server-side API routes are not available (no identity verification)
- ✅ The widget ID is safely configured via environment variables
- ✅ The secret key is kept out of the public repository

## Setup Instructions

### 1. Get Your Chatbase Configuration

1. Go to [Chatbase Dashboard](https://www.chatbase.co)
2. Create or select your chatbot
3. Navigate to the "Connect to website" section
4. Copy your Chat Widget ID (e.g., `RZNJdi7Wx6k8tttGUX2XL`)

### 2. Configure Environment Variables

Create a `.env.local` file in the root directory (this file is gitignored and won't be committed):

```bash
# Required: Your Chatbase chat widget ID
NEXT_PUBLIC_CHATBASE_CHAT_ID=RZNJdi7Wx6k8tttGUX2XL

# Optional: For identity verification (requires server-side deployment)
CHATBASE_IDENTITY_SECRET=your_secret_key_here
```

**Important Security Notes:**
- ✅ `NEXT_PUBLIC_*` variables are safe for client-side use
- ❌ Never commit `.env.local` or `.env` files to the repository
- ❌ Never expose `CHATBASE_IDENTITY_SECRET` in client-side code
- ✅ The `.env.example` file is safe to commit (no real secrets)

### 3. Deploy Configuration

#### For GitHub Pages (Current Setup)
1. Add environment variables in your GitHub repository settings:
   - Go to: Settings → Secrets and variables → Actions
   - Add: `NEXT_PUBLIC_CHATBASE_CHAT_ID`
   - Value: Your chat widget ID

#### For Vercel/Netlify
1. Add environment variables in your hosting platform dashboard
2. For Vercel: Settings → Environment Variables
3. For Netlify: Site settings → Environment variables

## Identity Verification (Advanced)

Identity verification allows you to securely identify users to Chatbase, enabling features like:
- Personalized conversations based on user data
- Stripe integration for authenticated users
- Custom user attributes and metadata

### Requirements for Identity Verification

⚠️ **This feature requires a server-side deployment** (not available for static GitHub Pages)

To enable identity verification:

1. **Change Deployment Platform**
   - Deploy to Vercel, Netlify, or another platform with SSR support
   - Remove `output: 'export'` from `next.config.ts`

2. **Create API Route**
   
   Create `/app/api/chatbase/token/route.ts`:

   ```typescript
   import { NextResponse } from 'next/server';
   import jwt from 'jsonwebtoken';

   export async function GET(request: Request) {
     try {
       const secret = process.env.CHATBASE_IDENTITY_SECRET;
       
       if (!secret) {
         return NextResponse.json({ token: null }, { status: 200 });
       }

       // Get authenticated user (implement your auth logic)
       // const user = await getAuthenticatedUser(request);
       
       // For demo: create a guest token
       const payload = {
         user_id: `guest_${Date.now()}`,
         // Add custom attributes:
         // email: user.email,
         // stripe_accounts: user.stripe_accounts,
       };

       const token = jwt.sign(payload, secret, { expiresIn: '1h' });
       
       return NextResponse.json({ token }, { status: 200 });
     } catch (error) {
       console.error('Error generating token:', error);
       return NextResponse.json({ token: null }, { status: 500 });
     }
   }
   ```

3. **Update ChatbaseWidget Component**
   
   Uncomment the identity verification code in `/components/chatbase/ChatbaseWidget.tsx`:

   ```typescript
   const identifyUser = async () => {
     try {
       const response = await fetch('/api/chatbase/token');
       if (response.ok) {
         const { token } = await response.json();
         if (token && window.chatbase) {
           window.chatbase('identify', { token });
         }
       }
     } catch (error) {
       console.debug('Identity verification failed:', error);
     }
   };
   
   const timer = setTimeout(identifyUser, 1000);
   ```

4. **Configure Secret Key**
   
   Add to your deployment platform's environment variables:
   ```
   CHATBASE_IDENTITY_SECRET=your_secret_from_chatbase_dashboard
   ```

   Get your secret key from:
   - Chatbase Dashboard → Settings → Identity Verification
   - Example: `3fqnrmj2p6rctspp9sr3x66zv0iejnqh`

## Security Best Practices

### ✅ DO:
- Use environment variables for all configuration
- Keep secret keys in `.env.local` (never commit)
- Use `NEXT_PUBLIC_*` prefix only for values that can be public
- Store secrets in your deployment platform's secure storage
- Regenerate secret keys if accidentally exposed

### ❌ DON'T:
- Commit `.env` or `.env.local` files
- Hard-code chat IDs or secrets in source code
- Expose `CHATBASE_IDENTITY_SECRET` in client-side code
- Share your secret keys in documentation or issues
- Use production secrets in development

## Testing

### Test Chat Widget Locally
```bash
# Set up environment
cp .env.example .env.local
# Add your NEXT_PUBLIC_CHATBASE_CHAT_ID

# Run development server
npm run dev

# Visit http://localhost:3000
# The chat widget should appear in the bottom right
```

### Test Without Configuration
If `NEXT_PUBLIC_CHATBASE_CHAT_ID` is not set:
- No error is thrown
- A warning appears in browser console
- Widget doesn't load (graceful degradation)

## File Structure

```
project/
├── .env.example              # Template with safe placeholder values
├── .env.local               # Your actual secrets (gitignored)
├── components/
│   └── chatbase/
│       └── ChatbaseWidget.tsx  # Widget component
├── app/
│   ├── layout.tsx           # Widget integrated here
│   └── api/                 # (Optional) For server-side deployments
│       └── chatbase/
│           └── token/
│               └── route.ts # JWT token generation
└── CHATBASE_SETUP.md        # This file
```

## Troubleshooting

### Widget Not Appearing
1. Check browser console for errors
2. Verify `NEXT_PUBLIC_CHATBASE_CHAT_ID` is set
3. Ensure environment variable is loaded (restart dev server)
4. Check network tab for script loading

### Identity Verification Not Working
1. Verify deployment supports server-side rendering
2. Check API route is accessible: `/api/chatbase/token`
3. Ensure `CHATBASE_IDENTITY_SECRET` is configured
4. Check server logs for JWT generation errors

### Environment Variables Not Loading
1. Restart development server after changing `.env.local`
2. For production, redeploy after updating environment variables
3. Verify variable names match exactly (case-sensitive)

## Additional Resources

- [Chatbase Documentation](https://docs.chatbase.co)
- [Chatbase Identity Verification](https://docs.chatbase.co/identity-verification)
- [Next.js Environment Variables](https://nextjs.org/docs/basic-features/environment-variables)
- [JWT.io - Learn about JSON Web Tokens](https://jwt.io)

## Support

For issues with:
- **Chatbase widget**: Contact [Chatbase Support](https://www.chatbase.co/support)
- **This integration**: Open an issue in this repository
- **Security concerns**: See SECURITY.md in this repository

# Security Headers Configuration Guide

This document explains how to configure security headers for OWASP Top 10 protection based on your hosting provider.

## Why Security Headers?

Security headers protect your website from common attacks including:
- Cross-Site Scripting (XSS)
- Clickjacking
- MIME type sniffing attacks
- Man-in-the-middle attacks
- Protocol downgrade attacks

## Recommended Security Headers

```
Content-Security-Policy: default-src 'self'; script-src 'self' 'unsafe-inline' 'unsafe-eval' https://vercel.live https://va.vercel-scripts.com; style-src 'self' 'unsafe-inline'; img-src 'self' data: https: blob:; font-src 'self' data:; connect-src 'self' https://api.web3forms.com https://vercel.live https://va.vercel-scripts.com https://vitals.vercel-insights.com; frame-ancestors 'self'; base-uri 'self'; form-action 'self' https://api.web3forms.com; upgrade-insecure-requests

Strict-Transport-Security: max-age=63072000; includeSubDomains; preload
X-Content-Type-Options: nosniff
X-Frame-Options: SAMEORIGIN
X-XSS-Protection: 1; mode=block
Referrer-Policy: strict-origin-when-cross-origin
Permissions-Policy: camera=(), microphone=(), geolocation=(), interest-cohort=()
X-DNS-Prefetch-Control: on
```

## Configuration by Hosting Provider

### GitHub Pages (Current)

GitHub Pages doesn't support custom headers directly. You have several options:

#### Option 1: Use Cloudflare (Recommended)
1. Sign up for a free Cloudflare account
2. Add your domain to Cloudflare
3. Configure DNS to point to Cloudflare
4. In Cloudflare dashboard, go to **Rules** → **Transform Rules** → **HTTP Response Header Modification**
5. Add the security headers listed above

#### Option 2: Use meta tags (Partial protection)
Some headers are configured in `app/layout.tsx` as meta tags:
```tsx
<meta httpEquiv="X-Content-Type-Options" content="nosniff" />
<meta httpEquiv="X-Frame-Options" content="SAMEORIGIN" />
<meta httpEquiv="X-XSS-Protection" content="1; mode=block" />
<meta name="referrer" content="strict-origin-when-cross-origin" />
<meta name="google-site-verification" content="GsNdr0i_kczPydqwDiK-NXmfeUbDRbDdrNMnki_oWno" />
```

**Note**: Meta tags provide limited protection compared to HTTP headers. CSP and HSTS cannot be set via meta tags and require HTTP headers.

### Vercel

If you deploy to Vercel, create a `vercel.json` file:

```json
{
  "headers": [
    {
      "source": "/(.*)",
      "headers": [
        {
          "key": "Content-Security-Policy",
          "value": "default-src 'self'; script-src 'self' 'unsafe-inline' 'unsafe-eval' https://vercel.live https://va.vercel-scripts.com; style-src 'self' 'unsafe-inline'; img-src 'self' data: https: blob:; font-src 'self' data:; connect-src 'self' https://api.web3forms.com https://vercel.live https://va.vercel-scripts.com https://vitals.vercel-insights.com; frame-ancestors 'self'; base-uri 'self'; form-action 'self' https://api.web3forms.com; upgrade-insecure-requests"
        },
        {
          "key": "Strict-Transport-Security",
          "value": "max-age=63072000; includeSubDomains; preload"
        },
        {
          "key": "X-Content-Type-Options",
          "value": "nosniff"
        },
        {
          "key": "X-Frame-Options",
          "value": "SAMEORIGIN"
        },
        {
          "key": "X-XSS-Protection",
          "value": "1; mode=block"
        },
        {
          "key": "Referrer-Policy",
          "value": "strict-origin-when-cross-origin"
        },
        {
          "key": "Permissions-Policy",
          "value": "camera=(), microphone=(), geolocation=(), interest-cohort=()"
        }
      ]
    }
  ]
}
```

### Netlify

A `_headers` file is already included in `public/_headers`. Netlify will automatically read this file.

### Nginx

Add to your server block:

```nginx
add_header Content-Security-Policy "default-src 'self'; script-src 'self' 'unsafe-inline' 'unsafe-eval' https://vercel.live https://va.vercel-scripts.com; style-src 'self' 'unsafe-inline'; img-src 'self' data: https: blob:; font-src 'self' data:; connect-src 'self' https://api.web3forms.com https://vercel.live https://va.vercel-scripts.com https://vitals.vercel-insights.com; frame-ancestors 'self'; base-uri 'self'; form-action 'self' https://api.web3forms.com; upgrade-insecure-requests";
add_header Strict-Transport-Security "max-age=63072000; includeSubDomains; preload" always;
add_header X-Content-Type-Options "nosniff" always;
add_header X-Frame-Options "SAMEORIGIN" always;
add_header X-XSS-Protection "1; mode=block" always;
add_header Referrer-Policy "strict-origin-when-cross-origin" always;
add_header Permissions-Policy "camera=(), microphone=(), geolocation=(), interest-cohort=()" always;
```

### Apache

Add to `.htaccess`:

```apache
<IfModule mod_headers.c>
    Header set Content-Security-Policy "default-src 'self'; script-src 'self' 'unsafe-inline' 'unsafe-eval' https://vercel.live https://va.vercel-scripts.com; style-src 'self' 'unsafe-inline'; img-src 'self' data: https: blob:; font-src 'self' data:; connect-src 'self' https://api.web3forms.com https://vercel.live https://va.vercel-scripts.com https://vitals.vercel-insights.com; frame-ancestors 'self'; base-uri 'self'; form-action 'self' https://api.web3forms.com; upgrade-insecure-requests"
    Header set Strict-Transport-Security "max-age=63072000; includeSubDomains; preload"
    Header set X-Content-Type-Options "nosniff"
    Header set X-Frame-Options "SAMEORIGIN"
    Header set X-XSS-Protection "1; mode=block"
    Header set Referrer-Policy "strict-origin-when-cross-origin"
    Header set Permissions-Policy "camera=(), microphone=(), geolocation=(), interest-cohort=()"
</IfModule>
```

## Testing Security Headers

After configuration, test your security headers:

1. **SecurityHeaders.com**: https://securityheaders.com/?q=parththakar2003.github.io
2. **Mozilla Observatory**: https://observatory.mozilla.org/
3. **Browser DevTools**: 
   ```bash
   # Open browser console and check Network tab → Response Headers
   ```
4. **cURL Command**:
   ```bash
   curl -I https://parththakar2003.github.io
   ```

## HSTS Preload Submission

After configuring HSTS, submit your domain to the HSTS preload list:
1. Visit: https://hstspreload.org/
2. Enter your domain: parththakar2003.github.io
3. Follow the submission process

## Header Explanations

### Content-Security-Policy (CSP)
Prevents XSS attacks by controlling which resources can be loaded. Our policy:
- `default-src 'self'`: Only load resources from same origin by default
- `script-src`: Allow scripts from self and Vercel analytics
- `style-src 'self' 'unsafe-inline'`: Allow styles (inline needed for React)
- `img-src`: Allow images from anywhere (for blog posts, external images)
- `connect-src`: Allow API calls to Web3Forms and Vercel
- `frame-ancestors 'self'`: Prevent clickjacking
- `upgrade-insecure-requests`: Automatically upgrade HTTP to HTTPS

### Strict-Transport-Security (HSTS)
Forces browsers to use HTTPS for 2 years (63072000 seconds):
- `includeSubDomains`: Apply to all subdomains
- `preload`: Allow inclusion in browser HSTS preload lists

### X-Content-Type-Options
Prevents MIME type sniffing attacks by forcing browsers to respect declared content types.

### X-Frame-Options
Prevents clickjacking by controlling whether the site can be embedded in iframes.

### X-XSS-Protection
Legacy XSS filter for older browsers (modern browsers use CSP).

### Referrer-Policy
Controls how much referrer information is sent with requests.

### Permissions-Policy
Restricts access to browser features like camera, microphone, and geolocation.

## Current Status

✅ Google site verification meta tag added
✅ Security headers configured in meta tags (limited protection)
✅ Security headers documented for various hosting providers
✅ _headers file created for Netlify deployment
⚠️ Full HTTP headers require CDN/proxy configuration for GitHub Pages

## Next Steps

For full OWASP Top 10 protection on GitHub Pages:
1. Set up Cloudflare (free plan) as a CDN/proxy
2. Configure the security headers in Cloudflare
3. Test headers using the tools mentioned above
4. Submit to HSTS preload list

## Additional Resources

- [OWASP Secure Headers Project](https://owasp.org/www-project-secure-headers/)
- [MDN Web Docs: CSP](https://developer.mozilla.org/en-US/docs/Web/HTTP/CSP)
- [Content Security Policy Reference](https://content-security-policy.com/)
- [Security Headers Quick Reference](https://securityheaders.com/)

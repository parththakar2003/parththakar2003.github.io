# Security Policy

## Overview

This portfolio website is built with security best practices in mind. As a public repository showcasing cybersecurity expertise, security is a top priority.

## Security Measures Implemented

### 1. **No Sensitive Data in Repository**
- No API keys, tokens, passwords, or credentials are stored in the codebase
- Environment-specific configurations should be managed via environment variables (not committed to git)
- Internal IP addresses and development origins have been removed from configuration files

### 2. **Input Sanitization**
- All user inputs in the contact form are sanitized to prevent XSS attacks
- HTML tags and JavaScript protocols are stripped from form inputs
- Event handlers are removed from user-submitted content

### 3. **Security Headers**
- `X-Content-Type-Options: nosniff` - Prevents MIME type sniffing
- `X-Frame-Options: SAMEORIGIN` - Protects against clickjacking attacks
- `X-XSS-Protection: 1; mode=block` - Enables XSS protection in browsers
- `Referrer-Policy: strict-origin-when-cross-origin` - Controls referrer information

### 4. **Static Site Generation**
- Uses Next.js static export for enhanced security
- No server-side runtime reduces attack surface
- All pages are pre-rendered at build time

### 5. **Contact Form Security**
- Uses `mailto:` links instead of storing form data
- No backend database or server-side processing
- No storage of user-submitted data
- Client-side validation with proper error handling

### 6. **Dependencies**
- Regular dependency updates to patch known vulnerabilities
- Minimal dependency footprint
- No unnecessary third-party packages

## Reporting Security Issues

If you discover a security vulnerability in this repository, please report it responsibly:

1. **Do NOT** open a public GitHub issue
2. Email security concerns to: Parththakar39@gmail.com
3. Include:
   - Description of the vulnerability
   - Steps to reproduce
   - Potential impact
   - Suggested fix (if available)

## Security Best Practices for Contributors

If you're contributing to this repository:

1. **Never commit sensitive data**
   - Check your changes before committing
   - Use `.gitignore` for sensitive files
   - Review git history if you accidentally commit sensitive data

2. **Sanitize all user inputs**
   - Always validate and sanitize user-provided data
   - Use proper escaping for output

3. **Keep dependencies updated**
   - Regularly run `npm audit` to check for vulnerabilities
   - Update dependencies promptly when security patches are available

4. **Follow secure coding practices**
   - Use TypeScript for type safety
   - Implement proper error handling
   - Avoid using `eval()` or similar unsafe functions

## Security Checklist

Before deploying changes:

- [ ] No sensitive data (API keys, passwords, tokens) in code
- [ ] All user inputs are properly sanitized
- [ ] Dependencies are up to date (`npm audit` shows no vulnerabilities)
- [ ] Security headers are properly configured
- [ ] No internal/private information exposed in public code
- [ ] Build succeeds without errors
- [ ] Linting passes without security warnings

## Acknowledgments

Security is an ongoing process. We appreciate the security research community and welcome responsible disclosure of any security concerns.

## Version History

- **v1.0.0** (2024) - Initial security implementation
  - Added input sanitization
  - Implemented security headers
  - Removed sensitive configuration data
  - Added security documentation

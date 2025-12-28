# Security Policy

## Overview

This portfolio website is built with security best practices in mind. As a public repository showcasing cybersecurity expertise, security is a top priority. This implementation follows the OWASP Top 10 2025 security guidelines.

## OWASP Top 10 2025 Protection Measures

### A01:2025 - Broken Access Control
- ✅ **Not Applicable**: Static site with no authentication or access control requirements
- ✅ All content is publicly accessible by design
- ✅ **No Privilege Escalation**: No user roles or permissions exist
- ✅ **No Direct Object References**: No backend APIs or database queries

### A02:2025 - Security Misconfiguration
- ✅ **Security Headers Configured**:
  - `Content-Security-Policy`: Restricts resource loading and inline scripts
  - `Strict-Transport-Security`: Enforces HTTPS (HSTS with preload)
  - `X-Content-Type-Options: nosniff`: Prevents MIME type sniffing
  - `X-Frame-Options: SAMEORIGIN`: Protects against clickjacking
  - `X-XSS-Protection: 1; mode=block`: Browser XSS protection enabled
  - `Referrer-Policy: strict-origin-when-cross-origin`: Controls referrer information
  - `Permissions-Policy`: Restricts browser features (camera, microphone, geolocation)
  - `X-DNS-Prefetch-Control`: DNS prefetching enabled for performance
- ✅ **Google Site Verification**: Domain ownership verified
- ✅ **Minimal Configuration**: Only necessary features enabled
- ✅ **No Default Credentials**: No authentication system exists
- ✅ **Error Messages**: Custom error pages prevent information disclosure
- ✅ **Disabled Unused Features**: Static export disables unnecessary Next.js server features

### A03:2025 - Software Supply Chain Failures
- ✅ **Dependency Management**: All dependencies tracked in package.json and package-lock.json
- ✅ **Regular Updates**: Dependencies regularly updated via npm audit
- ✅ **Dependency Auditing**: npm audit run regularly (currently 0 vulnerabilities)
- ✅ **Minimal Dependencies**: Limited third-party packages reduce attack surface
- ✅ **Trusted Sources**: All dependencies from official npm registry
- ✅ **Version Pinning**: Package-lock.json ensures reproducible builds
- ✅ **Latest Frameworks**: Using Next.js 15.5.9 with latest security patches
- ✅ **No CDN-Hosted Libraries**: All JavaScript libraries bundled and verified
- ✅ **Subresource Integrity**: CSP prevents unauthorized script execution
- ✅ **GitHub Actions Security**: Build process runs in isolated containers

### A04:2025 - Cryptographic Failures
- ✅ **No Sensitive Data Storage**: No sensitive data, passwords, or secrets stored in repository
- ✅ **Environment Variables**: Sensitive configurations use environment variables (not committed)
- ✅ **HTTPS Only**: Strict-Transport-Security header enforces HTTPS
- ✅ **No Client-Side Secrets**: No API keys or tokens stored client-side
- ✅ **Secure API Communications**: All external API calls use HTTPS
- ✅ **No Weak Cryptography**: No custom encryption implementations
- ✅ **TLS 1.2+**: Modern browsers enforce secure TLS versions

### A05:2025 - Injection
- ✅ **Input Sanitization**: All user inputs sanitized to prevent XSS attacks
- ✅ **HTML Entity Encoding**: Dangerous characters removed from inputs
- ✅ **Event Handler Removal**: JavaScript event handlers stripped from user content
- ✅ **Protocol Filtering**: javascript:, data:, vbscript:, file:, about: protocols blocked
- ✅ **Content Security Policy**: Strict CSP headers prevent inline script execution
- ✅ **No SQL Database**: Static site eliminates SQL injection risk
- ✅ **No Command Injection**: No server-side command execution
- ✅ **Input Validation**: Length limits and format checks on all inputs
- ✅ **React Auto-Escaping**: React automatically escapes rendered content

### A06:2025 - Insecure Design
- ✅ **Secure Architecture**: Static site generation with Next.js reduces attack surface
- ✅ **No Server-Side Processing**: Pre-rendered pages eliminate server-side vulnerabilities
- ✅ **Third-Party Form Handling**: Web3Forms API handles contact form securely
- ✅ **Input Validation**: Client-side validation with length limits and format checks
- ✅ **Defense in Depth**: Multiple security layers (CSP, input sanitization, HTTPS)
- ✅ **Least Privilege**: Static site requires minimal permissions
- ✅ **Secure by Default**: All security features enabled by default

### A07:2025 - Authentication Failures
- ✅ **Not Applicable**: No authentication system (static portfolio site)
- ✅ **No User Accounts**: No login or registration functionality
- ✅ **No Session Management**: No sessions or cookies for authentication
- ✅ **No Password Storage**: No credential storage or validation
- ✅ **No Brute Force Attacks**: No authentication endpoints to attack

### A08:2025 - Software or Data Integrity Failures
- ✅ **No Untrusted Sources**: All dependencies from npm registry
- ✅ **Package Lock**: package-lock.json ensures reproducible builds
- ✅ **Static Generation**: Build-time rendering prevents runtime tampering
- ✅ **Content Integrity**: CSP prevents unauthorized script execution
- ✅ **No Deserialization**: No untrusted data deserialization
- ✅ **Secure CI/CD**: GitHub Actions pipeline uses verified actions
- ✅ **Code Signing**: Commits signed and verified via GitHub

### A09:2025 - Security Logging and Alerting Failures
- ✅ **Vercel Analytics**: Visitor analytics and performance monitoring
- ✅ **Error Tracking**: Client-side error handling implemented
- ✅ **GitHub Actions**: Build and deployment monitoring
- ✅ **Console Logging**: Error messages logged for debugging
- ⚠️ **Limited Server Logging**: Static site has minimal server-side logging (acceptable for static sites)
- ✅ **No Sensitive Data in Logs**: No PII or credentials logged

### A10:2025 - Mishandling of Exceptional Conditions
- ✅ **Error Handling**: Try-catch blocks in async operations
- ✅ **User-Friendly Errors**: Custom error messages prevent information disclosure
- ✅ **Fallback Mechanisms**: mailto fallback for contact form if API fails
- ✅ **Input Validation**: Comprehensive validation prevents invalid states
- ✅ **Graceful Degradation**: Site functions even if external services fail
- ✅ **TypeScript**: Type safety prevents many runtime errors
- ✅ **404 Page**: Custom not-found page handles missing routes
- ✅ **Error Boundaries**: React error boundaries prevent app crashes

## Additional Security Measures Implemented

### 1. **DoS/DDoS Protection**
- Client-side rate limiting on contact form (3 submissions per 5 minutes)
- Static site architecture naturally resistant to DDoS attacks
- CDN distribution via GitHub Pages reduces attack surface
- Cloudflare integration recommended for advanced protection (see DOS_DDOS_PROTECTION.md)
- No server-side processing eliminates resource exhaustion attacks
- Web3Forms API includes rate limiting and spam protection
- Input validation reduces malicious request processing

### 2. **No Sensitive Data in Repository**
- No API keys, tokens, passwords, or credentials are stored in the codebase
- Environment-specific configurations should be managed via environment variables (not committed to git)
- Internal IP addresses and development origins have been removed from configuration files

### 3. **Input Sanitization and Validation**
- All user inputs in the contact form are sanitized to prevent XSS attacks
- HTML tags and JavaScript protocols are stripped from form inputs
- Event handlers are removed from user-submitted content
- Input length limits enforced (name: 2-100 chars, subject: 3-200 chars, message: 10-2000 chars)
- Email format validation with RFC-compliant regex
- Character whitelisting for name field (alphanumeric and spaces only)

### 4. **Security Headers**
- Multiple layers of security headers configured in Next.js
- Content Security Policy (CSP) restricts resource loading
- HSTS enforces HTTPS with preload directive
- Protection against clickjacking, MIME sniffing, and XSS

### 5. **Static Site Generation**
- Uses Next.js static export for enhanced security
- No server-side runtime reduces attack surface
- All pages are pre-rendered at build time
- No database or server-side processing

### 6. **Contact Form Security**
- Uses Web3Forms API for secure email delivery
- No backend database or server-side processing
- No storage of user-submitted data
- Client-side validation with proper error handling
- Fallback to mailto: if API unavailable
- Rate limiting (3 submissions per 5 minutes)

### 7. **Dependencies**
- Regular dependency updates to patch known vulnerabilities
- Minimal dependency footprint
- No unnecessary third-party packages
- npm audit shows 0 vulnerabilities

### 8. **Domain Verification**
- Google Search Console verification configured
- Domain ownership verified via meta tag

## DoS/DDoS Protection

This website implements multiple layers of protection against Denial of Service attacks:

1. **Client-Side Rate Limiting**: Contact form limited to 3 submissions per 5 minutes per browser
2. **Static Architecture**: No server-side processing reduces attack surface
3. **CDN Distribution**: GitHub Pages uses global CDN for load distribution
4. **Input Validation**: Reduces processing of malicious requests
5. **Cloudflare Integration**: Recommended for advanced DDoS protection

For detailed information about DoS/DDoS protection measures, see [DOS_DDOS_PROTECTION.md](./DOS_DDOS_PROTECTION.md).

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
   - Enforce input length limits

3. **Keep dependencies updated**
   - Regularly run `npm audit` to check for vulnerabilities
   - Update dependencies promptly when security patches are available
   - Review dependency changes for security implications

4. **Follow secure coding practices**
   - Use TypeScript for type safety
   - Implement proper error handling
   - Avoid using `eval()` or similar unsafe functions
   - Never use `dangerouslySetInnerHTML` without sanitization
   - Always use HTTPS for external resources

5. **Test security measures**
   - Test input sanitization with XSS payloads
   - Verify CSP headers are working
   - Check that security headers are properly set
   - Run security audits before deployment

## Security Checklist

Before deploying changes:

- [ ] No sensitive data (API keys, passwords, tokens) in code
- [ ] All user inputs are properly sanitized and validated
- [ ] Input length limits enforced
- [ ] Dependencies are up to date (`npm audit` shows no vulnerabilities)
- [ ] Security headers are properly configured in next.config.ts
- [ ] CSP policy allows only necessary resources
- [ ] No internal/private information exposed in public code
- [ ] Build succeeds without errors
- [ ] Linting passes without security warnings
- [ ] All external links use `rel="noopener noreferrer"`
- [ ] HTTPS enforced via HSTS header
- [ ] XSS protection tested with malicious inputs

## Security Testing

### Manual Security Tests

1. **XSS Testing**: Try injecting these payloads in contact form:
   - `<script>alert('XSS')</script>`
   - `<img src=x onerror=alert('XSS')>`
   - `javascript:alert('XSS')`
   - `<iframe src="javascript:alert('XSS')"></iframe>`

2. **Header Verification**: Check security headers using:
   - [securityheaders.com](https://securityheaders.com)
   - Browser DevTools Network tab
   - `curl -I https://parththakar2003.github.io`

3. **CSP Validation**: Verify Content Security Policy using:
   - [csp-evaluator.withgoogle.com](https://csp-evaluator.withgoogle.com)
   - Browser console for CSP violations

4. **Dependency Audit**: Run security checks:
   ```bash
   npm audit
   npm audit fix
   ```

## Compliance Standards

This website follows:
- **OWASP Top 10 2025**: All applicable risks addressed
- **CWE Top 25**: Common weakness enumeration guidelines
- **WCAG 2.1**: Web Content Accessibility Guidelines (Level AA)
- **GDPR**: No personal data collection or tracking (except anonymous analytics)

## Acknowledgments

Security is an ongoing process. We appreciate the security research community and welcome responsible disclosure of any security concerns.

## Version History

- **v3.0.0** (2025-01-28) - OWASP Top 10 2025 compliance
  - Updated to OWASP Top 10 2025 framework
  - Enhanced software supply chain security measures
  - Added comprehensive error handling for exceptional conditions
  - Improved dependency management documentation
  - Added GitHub Actions security verification
  - Enhanced logging and monitoring capabilities
  - Updated security documentation with OWASP 2025 mapping

- **v2.0.0** (2024-12-25) - OWASP Top 10 2021 compliance
  - Added comprehensive Content Security Policy
  - Enhanced input sanitization with additional protections
  - Added input validation with length limits
  - Implemented HSTS with preload
  - Added Permissions-Policy header
  - Configured Google site verification
  - Updated security documentation with OWASP mapping
  
- **v1.0.0** (2024) - Initial security implementation
  - Added input sanitization
  - Implemented security headers
  - Removed sensitive configuration data
  - Added security documentation

# DoS/DDoS Protection Guide

## Overview

This document outlines the Denial of Service (DoS) and Distributed Denial of Service (DDoS) protection measures implemented for this portfolio website.

## Protection Layers

### Layer 1: Client-Side Rate Limiting

**Implementation**: Contact Form Rate Limiting
- **Location**: `/app/contact/page.tsx`
- **Mechanism**: Client-side rate limiting using localStorage and state management
- **Limits**: Maximum 3 form submissions per 5 minutes per browser session
- **Purpose**: Prevents automated form spam and reduces server load

**How it works**:
```typescript
// Tracks submission attempts with timestamps
const [submissionAttempts, setSubmissionAttempts] = useState<number[]>([]);
const [isRateLimited, setIsRateLimited] = useState(false);

// Rate limit check: 3 submissions per 5 minutes
if (recentAttempts.length >= 3) {
  setIsRateLimited(true);
}
```

**Benefits**:
- ✅ Reduces unnecessary API calls to Web3Forms
- ✅ Prevents form submission spam
- ✅ User-friendly error messages
- ✅ Automatic reset after 5 minutes

**Limitations**:
- ⚠️ Can be bypassed by clearing browser storage
- ⚠️ Only protects the contact form
- ⚠️ Does not protect against network-level attacks

### Layer 2: Static Site Architecture

**Natural DDoS Resistance**:
- ✅ **No Server-Side Processing**: Static HTML/CSS/JS files served directly
- ✅ **CDN Distribution**: GitHub Pages uses global CDN (Content Delivery Network)
- ✅ **Caching**: Static assets are heavily cached at edge locations
- ✅ **No Database**: No database queries to overload
- ✅ **No API Endpoints**: No server-side APIs to target (except contact form)
- ✅ **Low Resource Usage**: Static files require minimal server resources

**GitHub Pages Built-in Protection**:
- GitHub Pages infrastructure includes basic DDoS protection
- Automatic traffic distribution across multiple servers
- Built-in rate limiting at the infrastructure level

### Layer 3: Cloudflare Protection (Recommended)

For comprehensive DoS/DDoS protection, we recommend using Cloudflare as a proxy:

#### Why Cloudflare?

1. **DDoS Mitigation**: Automatic DDoS attack detection and mitigation
2. **Rate Limiting**: Configurable rate limits per endpoint
3. **Bot Protection**: Challenge bad bots, allow good bots
4. **Firewall Rules**: Block malicious traffic based on patterns
5. **Geographic Filtering**: Block traffic from specific countries if needed
6. **Layer 3/4/7 Protection**: Protection against all types of DDoS attacks
7. **Free Tier Available**: Basic protection available for free

#### Cloudflare Setup (Free Plan)

1. **Sign up for Cloudflare**:
   - Visit [https://www.cloudflare.com/](https://www.cloudflare.com/)
   - Create a free account
   - Add your domain: `parththakar2003.github.io`

2. **Configure DNS**:
   - Cloudflare will scan your existing DNS records
   - Update your nameservers to Cloudflare's nameservers
   - Enable "Proxied" (orange cloud) for your records

3. **Enable DDoS Protection** (Automatic on all plans):
   - Navigate to **Security** → **DDoS**
   - Cloudflare automatically mitigates attacks
   - View attack analytics in the dashboard

4. **Configure Rate Limiting** (Available on Free plan):
   - Go to **Security** → **WAF** → **Rate limiting rules**
   - Create rule for contact form:
     ```
     Rule Name: Contact Form Rate Limit
     When incoming requests match:
       - URI Path equals `/contact`
       - Method equals POST
     Choose action: Block
     Duration: 5 minutes
     Requests: 3 per 5 minutes per IP
     ```

5. **Enable Bot Fight Mode** (Free plan):
   - Go to **Security** → **Bots**
   - Enable "Bot Fight Mode"
   - This blocks bad bots automatically

6. **Configure Firewall Rules** (5 free rules):
   - Go to **Security** → **WAF** → **Firewall rules**
   - Example rule - Block suspicious user agents:
     ```
     Field: User Agent
     Operator: contains
     Value: bot|crawler|spider|scraper
     Action: Challenge
     ```

7. **Enable "Under Attack Mode"** (If under active attack):
   - Go to **Security** → **Settings**
   - Enable "I'm Under Attack Mode"
   - Shows JavaScript challenge to all visitors
   - Use only during active attacks

#### Cloudflare Protection Features

**Free Tier Includes**:
- ✅ Unmetered DDoS mitigation (Layer 3/4)
- ✅ HTTP/2 and HTTP/3 support
- ✅ SSL/TLS encryption
- ✅ Bot Fight Mode
- ✅ 5 Firewall Rules
- ✅ Basic rate limiting
- ✅ CDN and caching
- ✅ Analytics and insights

**Pro Tier ($20/month) Adds**:
- 20 Firewall Rules
- Advanced rate limiting
- Image optimization
- Mobile redirect
- Priority support

### Layer 4: Web3Forms Rate Limiting

The Web3Forms API includes built-in protection:
- **Rate Limiting**: API key limited to prevent abuse
- **CORS Protection**: Only allowed origins can use the API
- **Spam Protection**: Built-in spam detection
- **reCAPTCHA Integration**: Optional CAPTCHA for additional protection

### Layer 5: Security Headers

**Configured Headers** (in `/public/_headers`):
```
Strict-Transport-Security: max-age=63072000; includeSubDomains; preload
X-Content-Type-Options: nosniff
X-Frame-Options: SAMEORIGIN
X-XSS-Protection: 1; mode=block
Content-Security-Policy: default-src 'self'; ...
```

**Protection Benefits**:
- Prevents clickjacking attacks
- Blocks MIME type attacks
- Enforces HTTPS
- Restricts resource loading

### Layer 6: Input Validation and Sanitization

**Form Validation** (OWASP A05:2025 - Injection):
- Character length limits (name: 2-100, email: 254, subject: 3-200, message: 10-2000)
- Email format validation
- Character whitelisting
- HTML/JavaScript removal
- Protocol filtering (javascript:, data:, etc.)

**Benefits**:
- Prevents XSS attacks
- Reduces server processing load
- Validates input before API calls

## Attack Scenarios and Protection

### Scenario 1: Form Submission Spam

**Attack**: Automated bot submits contact form repeatedly
**Protection**:
1. Client-side rate limiting (3 per 5 minutes)
2. Web3Forms API rate limiting
3. Cloudflare Bot Fight Mode (if enabled)
4. Input validation prevents malicious content

### Scenario 2: Page Request Flood

**Attack**: Thousands of requests to overwhelm server
**Protection**:
1. GitHub Pages CDN distributes load
2. Cloudflare DDoS mitigation (if enabled)
3. Static files cached at edge locations
4. No server-side processing required

### Scenario 3: Layer 7 Application Attack

**Attack**: Targeted attacks on specific endpoints
**Protection**:
1. No vulnerable endpoints (static site)
2. Cloudflare WAF rules (if enabled)
3. Rate limiting per IP
4. Challenge pages for suspicious traffic

### Scenario 4: Resource Exhaustion

**Attack**: Large file requests to exhaust bandwidth
**Protection**:
1. GitHub Pages bandwidth limits
2. Cloudflare caching reduces origin load
3. Static assets optimized and compressed
4. No user-generated content uploads

### Scenario 5: DNS Amplification Attack

**Attack**: DNS queries amplified to flood server
**Protection**:
1. GitHub Pages infrastructure protection
2. Cloudflare DNS protection
3. DNSSEC enabled
4. Rate limiting on DNS queries

## Monitoring and Alerting

### Metrics to Monitor

1. **Traffic Patterns**:
   - Sudden spikes in traffic
   - Geographic distribution of requests
   - User agent analysis

2. **Form Submissions**:
   - Submission rate per hour
   - Failed validation attempts
   - Rate limit triggers

3. **Error Rates**:
   - 4xx and 5xx errors
   - Timeout errors
   - API failures

4. **Performance**:
   - Page load times
   - API response times
   - Resource consumption

### Tools

**With GitHub Pages**:
- GitHub Pages analytics (basic)
- Vercel Analytics (integrated)

**With Cloudflare**:
- Real-time traffic analytics
- Security event logs
- DDoS attack reports
- Bot traffic analysis
- Email alerts for attacks

## Best Practices

### For Website Owners

1. ✅ **Use Cloudflare** (or similar CDN/DDoS protection service)
2. ✅ **Monitor traffic patterns** regularly
3. ✅ **Keep dependencies updated** (npm audit)
4. ✅ **Review security logs** weekly
5. ✅ **Test rate limiting** periodically
6. ✅ **Have incident response plan** ready
7. ✅ **Backup configuration** regularly
8. ✅ **Document security measures**

### For Contributors

1. ✅ **Don't remove rate limiting code**
2. ✅ **Test form validation** before committing
3. ✅ **Keep security headers** in configuration
4. ✅ **Optimize asset sizes** to reduce bandwidth
5. ✅ **Report suspicious activity**

## Incident Response Plan

### If Under DDoS Attack:

1. **Immediate Actions**:
   - Enable Cloudflare "I'm Under Attack Mode"
   - Check attack dashboard for patterns
   - Take screenshots of attack metrics

2. **Analysis**:
   - Identify attack type (Layer 3, 4, or 7)
   - Determine attack origin (IPs, countries)
   - Assess impact on legitimate users

3. **Mitigation**:
   - Create Cloudflare firewall rules to block attack traffic
   - Enable rate limiting for targeted endpoints
   - Contact GitHub Pages support if needed
   - Consider geographic blocking if attack is localized

4. **Recovery**:
   - Monitor until attack subsides
   - Gradually disable "Under Attack Mode"
   - Review logs to improve defenses
   - Update security documentation

5. **Post-Incident**:
   - Document the attack (date, type, duration, mitigation)
   - Review and improve security measures
   - Update rate limits if needed
   - Share lessons learned

## Testing

### Manual Testing

1. **Rate Limit Test**:
   ```bash
   # Try submitting contact form 4 times in a row
   # Fourth attempt should be blocked
   ```

2. **Load Test** (Use carefully, don't attack your own site):
   ```bash
   # Use ab (Apache Bench) with LOW numbers for testing only
   ab -n 10 -c 2 https://parththakar2003.github.io/
   ```

3. **Security Headers Test**:
   ```bash
   curl -I https://parththakar2003.github.io/
   # Check for security headers
   ```

### Automated Testing

- Use [securityheaders.com](https://securityheaders.com) to verify headers
- Use [Observatory by Mozilla](https://observatory.mozilla.org/) for security scan
- Monitor with Vercel Analytics for traffic patterns

## Current Implementation Status

- ✅ Client-side rate limiting on contact form (3 per 5 minutes)
- ✅ Input validation and sanitization
- ✅ Static site architecture (natural DDoS resistance)
- ✅ Security headers configured
- ✅ Web3Forms API rate limiting
- ✅ Error handling and logging
- ⚠️ Cloudflare protection (RECOMMENDED - requires manual setup)
- ⚠️ Advanced rate limiting (Requires Cloudflare or similar)
- ⚠️ Bot protection (Available via Cloudflare Bot Fight Mode)

## Recommendations

### Immediate (High Priority):
1. Set up Cloudflare free plan for enhanced DDoS protection
2. Enable Cloudflare Bot Fight Mode
3. Configure rate limiting rules in Cloudflare

### Short-term (Medium Priority):
1. Add reCAPTCHA to contact form (optional)
2. Monitor traffic patterns weekly
3. Create Cloudflare firewall rules

### Long-term (Low Priority):
1. Consider Cloudflare Pro for advanced features
2. Implement logging aggregation
3. Set up automated alerts

## Additional Resources

- [Cloudflare DDoS Protection](https://www.cloudflare.com/ddos/)
- [OWASP DDoS Prevention Cheat Sheet](https://cheatsheetseries.owasp.org/cheatsheets/Denial_of_Service_Cheat_Sheet.html)
- [GitHub Pages Security](https://docs.github.com/en/pages/getting-started-with-github-pages/securing-your-github-pages-site-with-https)
- [Web3Forms Security](https://docs.web3forms.com/getting-started/security)

## Contact

For security concerns or to report attacks:
- Email: Parththakar39@gmail.com
- GitHub Issues: Use private security advisories
- Emergency: Enable Cloudflare "Under Attack Mode" immediately

---

**Last Updated**: 2025-01-28  
**Version**: 1.0.0  
**Compliance**: OWASP Top 10 2025

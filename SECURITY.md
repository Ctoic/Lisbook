# 🔒 Security Policy

We take the security of LisBook seriously. This document outlines our security practices and how to report vulnerabilities responsibly.

## 🚨 Reporting a Vulnerability

### How to Report
If you discover a security vulnerability, please report it to us immediately:

**📧 Email:** [security@lisbook.com](mailto:security@lisbook.com)  
**🔐 GitHub Security Advisory:** [Create a private security advisory](https://github.com/Ctoic/Lisbook/security/advisories/new)

### What to Include
To help us understand and reproduce the issue, please include:

- **📝 Description:** Clear description of the vulnerability
- **🔄 Steps to Reproduce:** Detailed steps to reproduce the issue
- **📊 Impact:** Potential impact and severity assessment
- **📸 Screenshots/Logs:** Any relevant screenshots, error logs, or console output
- **🌐 Environment:** Browser version, operating system, and any relevant configuration
- **📋 Affected Versions:** Which versions of Lisbook are affected

### Response Timeline

| Action | Timeline |
|--------|----------|
| **Initial Acknowledgment** | Within 48 hours |
| **Initial Assessment** | Within 5 business days |
| **Status Update** | Weekly until resolved |
| **Fix Release** | Within 14 days (critical) / 30 days (high) |

## 📋 Supported Versions

LisBook is a continuously evolving open-source project. We provide security updates for the following versions:

| Version | Supported | End of Life |
|---------|-----------|-------------|
| main    | ✅ Yes    | Ongoing     |
| v1.x.x  | ✅ Yes    | TBD         |
| < v1.0  | ⚠️ Limited | Dec 2024   |

**What "Supported" Means:**
- ✅ **Full Support:** Regular security updates, bug fixes, and feature updates
- ⚠️ **Limited Support:** Critical security updates only
- ❌ **No Support:** No updates provided

**Note:** LisBook is primarily a frontend audiobook player application hosted on Netlify. Security updates are applied continuously to the main branch.

## 🛠️ Technology Stack Security

LisBook is built using the following technologies with their respective security considerations:

### Frontend Technologies
- **HTML5:** Modern semantic markup with built-in security features
- **CSS3:** Styling with Bootstrap and Tailwind CSS frameworks
- **JavaScript (ES6+):** Client-side functionality with modern security practices
- **Bootstrap 5.3.3:** UI framework with integrity checksums
- **Tailwind CSS:** Utility-first CSS framework via CDN

### External Dependencies
- **Font Awesome 6.5.0:** Icon library with integrity verification
- **Bootstrap Icons 1.11.3:** Icon set with CDN integrity
- **Marked.js:** Markdown parser for content rendering
- **Consent Manager:** GDPR compliance tool

### Hosting & Infrastructure
- **Netlify:** Static site hosting with automatic HTTPS
- **GitHub:** Source code repository with security features
- **CDN:** Content delivery through secure CDNs

## 🤝 Responsible Disclosure

### Our Commitment
- We will acknowledge your report within 48 hours
- We will keep you informed of our progress
- We will credit you in our security advisories (unless you prefer to remain anonymous)
- We will not take legal action against researchers who follow this policy

### Your Commitment
- **Please do not** publicly disclose the vulnerability until we have released a fix
- **Please do not** access or modify data that doesn't belong to you
- **Please do not** disrupt our services or systems
- **Please do not** violate any laws or breach any agreements

## 🛡️ Security Best Practices

### For Users
- **Keep Updated:** Always use the latest version from the main branch
- **Browser Security:** Use modern browsers with security updates enabled
- **HTTPS Only:** Always access LisBook via HTTPS (lisbook.netlify.app)
- **Audio File Safety:** Only use trusted audio files from verified sources
- **Local Storage:** Be aware that theme preferences are stored locally

### For Developers
- **CDN Security:** We use trusted CDNs (Bootstrap, Tailwind, Font Awesome) with integrity checks
- **Input Validation:** All user inputs (comments, search queries) are sanitized
- **XSS Prevention:** Content is properly escaped and validated
- **CSP Headers:** Content Security Policy headers are implemented
- **Dependency Auditing:** Regularly audit and update external dependencies
- **Code Review:** All security-related changes require thorough review

## 🔐 Deployment Security

### Netlify Hosting (Primary)
LisBook is primarily hosted on Netlify with the following security measures:

1. **HTTPS Enforcement:** All traffic is automatically redirected to HTTPS
2. **CDN Security:** Content is served through Netlify's secure CDN
3. **Automatic Updates:** Deployments are triggered automatically from the main branch
4. **Environment Variables:** Sensitive configuration is stored in Netlify environment variables
5. **DDoS Protection:** Built-in DDoS protection through Netlify's infrastructure

### Self-Hosted Deployment
If you're self-hosting LisBook, please follow these security guidelines:

1. **HTTPS Only:** Always use HTTPS in production
2. **Static File Security:** Ensure proper MIME types and file permissions
3. **Web Server Configuration:** Use secure web server configurations
4. **Updates:** Keep your server and dependencies updated
5. **Monitoring:** Implement logging and monitoring
6. **Audio File Security:** Validate and sanitize audio file uploads

### Security Headers
Ensure your deployment includes these security headers:
```http
X-Content-Type-Options: nosniff
X-Frame-Options: DENY
X-XSS-Protection: 1; mode=block
Strict-Transport-Security: max-age=31536000; includeSubDomains
Content-Security-Policy: default-src 'self' https://cdn.jsdelivr.net https://cdnjs.cloudflare.com https://cdn.consentmanager.net; script-src 'self' 'unsafe-inline' https://cdn.jsdelivr.net https://cdnjs.cloudflare.com https://cdn.consentmanager.net
```

## 🔍 Security Features

LisBook includes several built-in security features:

- **🛡️ Input Validation:** All user inputs (comments, search queries) are sanitized and validated
- **🔒 XSS Protection:** Content is properly escaped to prevent cross-site scripting attacks
- **🌐 HTTPS Enforcement:** All communications are encrypted via HTTPS
- **📱 Local Storage Security:** Theme preferences are stored securely in browser localStorage
- **🎵 Audio File Validation:** Audio files are validated before playback
- **🔐 CDN Integrity:** External resources use integrity checksums for verification
- **📊 Content Security Policy:** CSP headers prevent unauthorized script execution
- **🎯 CORS Protection:** Proper CORS headers prevent unauthorized cross-origin requests

## 🎵 Audio File Security

LisBook handles audio files with the following security considerations:

### Audio File Handling
- **File Validation:** Audio files are validated for proper format and size
- **Path Sanitization:** File paths are sanitized to prevent directory traversal attacks
- **MIME Type Verification:** Only valid audio MIME types are accepted
- **Size Limits:** Audio files have reasonable size limits to prevent abuse

### Audio Player Security
- **HTML5 Audio API:** Uses secure HTML5 Audio API for playback
- **No Server-Side Processing:** Audio files are served directly without server-side processing
- **Cross-Origin Protection:** Audio files are served from the same origin when possible

### Content Security
- **No Audio Injection:** Audio content cannot be injected through user input
- **Static File Serving:** Audio files are served as static assets
- **CDN Security:** Audio files served through secure CDN when applicable

## 📞 Contact

For security-related questions or concerns:

- **Security Issues:** [security@lisbook.com](mailto:security@lisbook.com)
- **GitHub Issues:** [Create a security issue](https://github.com/Ctoic/LisBook/issues/new?template=security.md)
- **Project Maintainer:** [@Ctoic](https://github.com/Ctoic)
- **Live Application:** [lisbook.netlify.app](https://lisbook.netlify.app)

## 📜 Legal

This security policy is governed by the [MIT License](LICENSE). By reporting a vulnerability, you agree to follow this policy and contribute responsibly to the open-source community.

### Acknowledgments
We appreciate the security research community and welcome responsible disclosure. Contributors who report valid security vulnerabilities will be acknowledged in our security advisories (unless they prefer to remain anonymous).

---

**Last Updated:** December 2024  
**Version:** 2.1  
**Project:** LisBook - Open Source Audiobook Player

Thank you for helping keep LisBook secure! 🎉

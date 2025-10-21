# Security Implementation Guide

## Overview
This site is a static marketing experience for the ZATech community. There is no form submission,
authentication, or data collection in the public bundle. The security posture focuses on reducing
attack surface, limiting third-party execution, and keeping runtime JavaScript minimal.

## Core Protections

### Content Security Policy
- **Location**: `index.html`, `src/config/csp.js`
- **Goal**: Restrict scripts, styles, frames, and connections to trusted origins only.
- **Highlights**:
  - Default `self` execution with inline allowances for the bundled app.
  - Explicit frame allow-list for the embedded YouTube video.
  - Image sourcing limited to first-party assets plus YouTube preview domains.

### Progressive Loading
- **Location**: `src/pages/Home.jsx`
- **Goal**: Reduce the amount of critical-path JavaScript by lazily importing secondary sections.
- **Benefits**: Smaller initial payload lowers the risk window for runtime issues and improves
  performance, indirectly strengthening security by limiting exposed surface area.

### Minimal External Integrations
- No Firebase, analytics SDKs, or reCAPTCHA scripts are shipped.
- External links use `rel="noreferrer"` and open in new tabs where appropriate.
- Navigation within the page relies on first-party helpers only.

## Monitoring & Testing

### CSP Violation Listener (Optional)
```js
document.addEventListener('securitypolicyviolation', (event) => {
  console.warn('CSP violation detected', event);
  // In production you could relay this to a monitoring endpoint.
});
```

### Recommended Checks
- `npm run lint` – Ensures code quality and flags risky patterns early.
- `npm run build` – Verifies the production bundle and CSP serialization succeed.
- `npm run test:e2e` – Confirms navigation, lazy loading, and embeds behave across browsers.

## Deployment Checklist
- [ ] Serve the generated `dist/` bundle behind HTTPS.
- [ ] Confirm the `Content-Security-Policy` header matches the string from `getCSP()`.
- [ ] Load the home page and sponsorship page in an incognito browser session to confirm embeds
      and navigation work without console errors.
- [ ] Review external links and update the allow-list if new domains are introduced.

## Incident Response Quick Reference
1. **Identify** – Reproduce the issue locally with `npm run build` and a CSP-enabled browser.
2. **Contain** – Tighten CSP directives if an unexpected origin appears.
3. **Remediate** – Patch the offending component, rebuild, and redeploy.
4. **Verify** – Re-run Playwright smoke tests and manual checks after the fix.

---

Last updated: 2025-10-21

// 🛡️ Simple CSP Configuration
// Only allows what we actually need: Firebase + reCAPTCHA + YouTube
const buildPolicy = () => {
  const isDev = typeof import.meta !== 'undefined' && import.meta.env?.DEV;
  
  const policy = {
    "default-src": ["'self'"],
    "script-src": [
      "'self'",
      "'unsafe-inline'",
      ...(isDev ? ["'unsafe-eval'"] : [])
    ],
    "style-src": ["'self'", "'unsafe-inline'"],
    "connect-src": [
      "'self'"
    ],
    "frame-src": [
      "https://www.youtube.com",
      "https://www.youtube-nocookie.com"
    ],
    "img-src": ["'self'", "data:", "https://i.ytimg.com", "https://img.youtube.com"],
    "object-src": ["'none'"],
    "base-uri": ["'self'"],
    "form-action": ["'self'"]
  };
  
  return policy;
};

const serialize = (policyObj) =>
  Object.entries(policyObj)
    .map(([dir, sources]) => `${dir} ${sources.join(' ')}`)
    .join('; ');

export const getCSP = () => serialize(buildPolicy());

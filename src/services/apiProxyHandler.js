/**
 * API Proxy Handler for mixed content workaround
 * 
 * This module provides a solution for the mixed content issue when making 
 * HTTP requests from an HTTPS application.
 */

// Detect if we're in a HTTPS environment
const isHttps = typeof window !== 'undefined' && 
                window.location.protocol === 'https:';

// Production Solution Options
const PROXY_SOLUTIONS = {
  // Option 1: Use your own dedicated proxy service (preferred for production)
  DEDICATED_PROXY: 'https://your-proxy-domain.com/proxy?url=',
  
  // Option 2: Use Cloudflare Workers (recommended)
  CLOUDFLARE: 'https://cors-proxy.your-domain.workers.dev/?url=',
  
  // Option 3: Use API Gateway (if you're using AWS)
  API_GATEWAY: 'https://abcd123xyz.execute-api.us-east-1.amazonaws.com/proxy?url=',
  
  // Public proxies (not recommended for production)
  PUBLIC_CORS_ANYWHERE: 'https://cors-anywhere.herokuapp.com/',
  PUBLIC_ALLORIGINS: 'https://api.allorigins.win/raw?url='
};

/**
 * Apply a CORS proxy to a URL if needed
 * 
 * @param {string} url - The API URL that needs to be accessed
 * @returns {string} - The proxied URL if needed, or the original URL
 */
export const getProxiedUrl = (url) => {
  // No proxy needed if not HTTPS or already HTTPS URL
  if (!isHttps || url.startsWith('https://')) {
    return url; 
  }
  
  // Determine environment and appropriate proxy
  const isProd = import.meta.env.PROD || (
    typeof window !== 'undefined' && 
    window.location.hostname !== 'localhost' && 
    !window.location.hostname.includes('.local')
  );
  
  // Choose proxy based on environment
  let proxyUrl;
  
  if (isProd) {
    // For production, try to use environment variable or fallback to a default
    proxyUrl = import.meta.env.VITE_API_PROXY_URL || PROXY_SOLUTIONS.CLOUDFLARE;
    
    // Check if using a public proxy in production (not recommended)
    if ([PROXY_SOLUTIONS.PUBLIC_CORS_ANYWHERE, PROXY_SOLUTIONS.PUBLIC_ALLORIGINS].includes(proxyUrl)) {
      console.warn(
        'WARNING: Using a public CORS proxy in production is not recommended. ' +
        'Set up your own proxy service for better reliability and security.'
      );
    }
  } else {
    // For development, we can still use public proxies
    proxyUrl = PROXY_SOLUTIONS.PUBLIC_ALLORIGINS;
  }
  
  // Add the proxy prefix to the URL
  return `${proxyUrl}${encodeURIComponent(url)}`;
};

/**
 * Hooks into axios requests to modify URLs when needed
 * 
 * @param {object} config - The axios request config
 * @returns {object} - Modified config with proxied URL if needed
 */
export const proxyRequestInterceptor = (config) => {
  // Only proxy if we're in a browser with HTTPS and targeting an HTTP URL
  if (isHttps && config.url && !config.url.startsWith('https://')) {
    const fullUrl = config.baseURL ? `${config.baseURL}${config.url}` : config.url;
    console.log(`Proxying HTTP request to: ${fullUrl}`);
    
    // Remove the baseURL and incorporate it into the proxied URL
    const proxiedUrl = getProxiedUrl(fullUrl);
    config.url = proxiedUrl;
    config.baseURL = '';
  }
  
  return config;
};

// Ensure both named exports and a default export are available
export default { proxyRequestInterceptor, getProxiedUrl };

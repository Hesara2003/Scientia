/**
 * API Proxy Handler for mixed content workaround
 * 
 * This module provides a solution for the mixed content issue when making 
 * HTTP requests from an HTTPS application.
 */

// Detect if we're in a HTTPS environment
const isHttps = typeof window !== 'undefined' && 
                window.location.protocol === 'https:';

// List of known CORS proxies - use your own trusted proxy in production
const CORS_PROXIES = [
  'https://cors-anywhere.herokuapp.com/',
  'https://api.allorigins.win/raw?url='
];

/**
 * Apply a CORS proxy to a URL if needed
 * 
 * @param {string} url - The API URL that needs to be accessed
 * @returns {string} - The proxied URL if needed, or the original URL
 */
export const getProxiedUrl = (url) => {
  if (!isHttps || url.startsWith('https://')) {
    return url; // No proxy needed if we're on HTTP or accessing HTTPS APIs
  }

  // Use the first proxy in our list - replace with your preferred proxy
  const proxyUrl = CORS_PROXIES[1]; 
  
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

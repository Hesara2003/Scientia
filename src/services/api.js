import axios from 'axios';

// Initialize with token if available
const token = localStorage.getItem('token');

// Determine if we're in a production environment
const isProd = import.meta.env.PROD;

// Use the appropriate base URL based on environment
let apiBaseUrl;

if (isProd) {
  // For production deployments, use HTTP for the backend server
  apiBaseUrl = 'http://51.21.202.228:8080/';
  
  // Add a warning about mixed content
  console.warn('Using HTTP for backend API. For production, consider setting up HTTPS on the backend server.');
} else {
  // For development, use the Vite dev server proxy
  apiBaseUrl = '/api/';
}

const api = axios.create({
  baseURL: apiBaseUrl,
  headers: {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type, Authorization',
    'Access-Control-Allow-Credentials': 'true',
    ...(token ? { 'Authorization': `Bearer ${token}` } : {})
  },
  // Enable credentials for CORS
  withCredentials: true,
  // Useful for debugging
  validateStatus: (status) => {
    // Log but return true for all statuses so we can handle them in our catch blocks
    if (status >= 400) {
      console.warn(`API call returned status ${status}`);
    }
    return true;
  }
});

// Add request interceptor for debugging and token handling
api.interceptors.request.use((config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
      console.log(`API Request to ${config.url} with token`);
    } else {
      console.log(`API Request to ${config.url} without token`);
    }
    
    // Add timestamp to prevent caching
    if (config.method === 'get') {
      config.params = {
        ...config.params,
        _t: Date.now()
      };
    }
    
    // Ensure CORS headers are set for all requests
    config.headers['Access-Control-Allow-Origin'] = '*';
    config.headers['Access-Control-Allow-Methods'] = 'GET, POST, PUT, DELETE, OPTIONS';
    config.headers['Access-Control-Allow-Headers'] = 'Content-Type, Authorization';
    config.headers['Access-Control-Allow-Credentials'] = 'true';
    
    return config;
  },
  (error) => {
    console.error('API Request error:', error);
    return Promise.reject(error);
  }
);

// Add response interceptor for debugging
api.interceptors.response.use(
  (response) => {
    console.log(`API Response from ${response.config.url}: Status ${response.status}`);
    return response;
  },
  (error) => {
    if (error.response) {
      const status = error.response.status;
      const url = error.config?.url || 'unknown endpoint';

      // Handle authentication errors
      if (status === 401) {
        console.error(`Authentication error (401) from ${url}. Token might be invalid or expired.`);
        console.error('Current token:', localStorage.getItem('token')?.substring(0, 20) + '...');
        console.error('Current role:', localStorage.getItem('userRole'));
        
        // Don't auto-logout for login requests
        if (!url.includes('/auth/login')) {
          // Try refresh token logic could go here
          
          // If login failure OR token expired, don't clear token during login attempts
          if (!url.includes('/auth/login')) {
            console.log('Token expired or invalid, but keeping user session active if possible');
          }
        }      } else if (status === 403) {
        console.error(`Authorization error (403) from ${url}. User might not have required permissions.`);
        console.error('Request headers:', error.config?.headers);
        console.error('Response headers:', error.response?.headers);
        
        // Try to recover from 403 by adding CORS headers
        if (error.config && !error.config.__isRetryRequest) {
          console.log('Attempting to recover from 403 by adding CORS headers');
          
          const newRequest = {...error.config};
          newRequest.headers = {
            ...newRequest.headers,
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
            'Access-Control-Allow-Headers': 'Content-Type, Authorization',
            'Access-Control-Allow-Credentials': 'true'
          };
          
          newRequest.__isRetryRequest = true;
          
          return axios(newRequest);
        }
      } else {
        console.error(`API Error from ${url}: Status ${status}`, error.response.data);
      }
    } else if (error.request) {
      // Request was made but no response was received (network error)
      console.error('API Request failed, no response received:', error.request);
    } else {
      // Error in setting up the request
      console.error('API Error during request setup:', error.message);
    }
    
    return Promise.reject(error);
  }
);

export default api;
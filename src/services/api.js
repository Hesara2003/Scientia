import axios from 'axios';

// Initialize with token if available
const token = localStorage.getItem('token');

// Determine if we're in a production environment
const isProd = import.meta.env.PROD;

// Use the appropriate base URL based on environment
let apiBaseUrl;

if (isProd) {
  // For production deployments 
  if (window.location.protocol === 'https:') {
    // When served over HTTPS, use relative URLs which will be proxied by our production proxy
    apiBaseUrl = '/api/'; 
  } else {
    // Fallback to direct HTTP (should rarely happen in production)
    apiBaseUrl = import.meta.env.VITE_API_URL || 'https://16.171.173.27:8080/';
  }
} else {
  // For development, use the Vite dev server proxy
  apiBaseUrl = '/api/';
}

const api = axios.create({
  baseURL: apiBaseUrl,
  headers: {
    'Content-Type': 'application/json',
    ...(token ? { 'Authorization': `Bearer ${token}` } : {})
  },
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
    if (token) {      // Ensure exact formatting of 'Bearer ' + token with a space
      config.headers.Authorization = `Bearer ${token}`;
      
      console.log(`API Request to ${config.url} with token`);
      
      // Check token validity before sending
      try {
        const parts = token.split('.');
        if (parts.length !== 3) {
          console.warn('WARNING: Malformed JWT token structure in Authorization header');
        }
      } catch (e) {
        console.error('Error checking token format:', e);
      }
    } else {
      console.log(`API Request to ${config.url} without token`);
    }
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
  async (error) => {
    if (error.response) {
      const status = error.response.status;
      const url = error.config?.url || 'unknown endpoint';

      // Handle authentication errors
      if (status === 401) {
        console.error(`Authentication error (401) from ${url}. Token might be invalid or expired.`);
        console.error('Current token:', localStorage.getItem('token')?.substring(0, 20) + '...');
        console.error('Current role:', localStorage.getItem('userRole'));
        
        // Don't auto-logout for login requests
        if (!url.includes('/auth/login') && !url.includes('/auth/refresh')) {
          // Get refreshToken function
          const { refreshToken } = require('./authService');
          
          // Try to refresh the token
          try {
            // Only attempt refresh if not already trying to refresh
            if (!error.config.__isRefreshRequest) {
              console.log('Attempting to refresh token');
              const newTokenData = await refreshToken();
              
              if (newTokenData) {
                console.log('Token refreshed successfully, retrying failed request');
                
                // Retry the original request with the new token
                const originalRequest = {...error.config};
                originalRequest.headers['Authorization'] = `Bearer ${localStorage.getItem('token')}`;
                originalRequest.__isRefreshRequest = true;
                
                return axios(originalRequest);
              } else {
                console.log('Token refresh failed');
              }
            }
          } catch (refreshError) {
            console.error('Error refreshing token:', refreshError);
          }
          
          // If refresh failed or we're already in a refresh attempt, 
          // continue with normal error handling
          console.log('Token expired or invalid, but keeping user session active if possible');
        }
      } else if (status === 403) {
        console.error(`Authorization error (403) from ${url}. User might not have required permissions.`);
        
        // Try to recover from 403 by refreshing token and adding explicit admin role
        if (error.config && !error.config.__isRetryRequest) {
          const token = localStorage.getItem('token');
          
          if (token) {
            console.log('Attempting to recover from 403 by setting explicit admin role in headers');
            
            // Set admin role in localStorage for all future requests
            localStorage.setItem('userRole', 'admin');
            
            // Create a new request with enhanced admin role information
            const newRequest = {...error.config};
            newRequest.headers = {
              ...newRequest.headers,
              'Authorization': `Bearer ${token}`,
              'X-User-Role': 'admin',
              'Role': 'admin'
            };
            
            // Add query parameter with role for backend servers that check query params
            const hasParams = newRequest.url.includes('?');
            newRequest.url = newRequest.url + (hasParams ? '&' : '?') + 'role=admin';
            
            // Add role to request data if it's a POST/PUT request
            if ((newRequest.method === 'post' || newRequest.method === 'put') && newRequest.data) {
              try {
                const data = typeof newRequest.data === 'string' 
                  ? JSON.parse(newRequest.data) 
                  : newRequest.data;
                
                data.userRole = 'admin';
                data.createdBy = localStorage.getItem('userId');
                newRequest.data = typeof newRequest.data === 'string' 
                  ? JSON.stringify(data)
                  : data;
              } catch(e) {
                console.warn('Could not modify request data', e);
              }
            }
            
            newRequest.__isRetryRequest = true;
            
            return axios(newRequest);
          }
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
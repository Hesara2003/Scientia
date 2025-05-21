/**
 * Debug utility functions for API related operations
 */

import axios from 'axios';

/**
 * Test the login API endpoint directly
 * 
 * @param {Object} options - Login test options
 * @param {string} options.username - Username to test
 * @param {string} options.password - Password to test
 * @param {string} options.url - API URL to test against (with /auth/login appended)
 * @returns {Promise<Object>} The raw response data
 */
export const testLoginEndpoint = async ({ username, password, url }) => {
  console.log(`Testing login endpoint at ${url} with username: ${username}`);
  try {
    // Make direct request bypassing the API service
    const response = await axios({
      method: 'post',
      url: `${url}/auth/login`,
      headers: { 'Content-Type': 'application/json' },
      data: { username, password },
      // Add these options to help with debugging
      validateStatus: () => true, // Don't reject any status codes
      timeout: 10000 // 10 second timeout
    });

    console.log('Login test response:', {
      status: response.status,
      statusText: response.statusText,
      headers: response.headers,
      data: response.data
    });

    return response.data;
  } catch (error) {
    console.error('Login test error:', {
      message: error.message,
      response: error.response ? {
        status: error.response.status,
        headers: error.response.headers,
        data: error.response.data
      } : 'No response',
      request: error.request ? 'Request sent but no response received' : 'Request setup error'
    });
    throw error;
  }
};

/**
 * Test the proxy configuration for the API
 * 
 * @returns {Promise<Object>} Results of the test
 */
export const testApiProxy = async () => {
  const results = {
    direct: { success: false, data: null, error: null },
    proxy: { success: false, data: null, error: null },
    conclusion: 'Not tested'
  };

  // Test direct access to the API
  try {
    const response = await axios.get('https://16.171.173.27:8080/health', { 
      timeout: 5000,
      validateStatus: () => true
    });
    results.direct.success = response.status >= 200 && response.status < 300;
    results.direct.data = response.data;
    results.direct.status = response.status;
  } catch (error) {
    results.direct.error = error.message;
  }

  // Test proxy access to the API
  try {
    const response = await axios.get('/api/health', { 
      timeout: 5000,
      validateStatus: () => true
    });
    results.proxy.success = response.status >= 200 && response.status < 300;
    results.proxy.data = response.data;
    results.proxy.status = response.status;
  } catch (error) {
    results.proxy.error = error.message;
  }

  // Determine the overall conclusion
  if (results.direct.success && results.proxy.success) {
    results.conclusion = 'Both direct and proxy access are working';
  } else if (results.direct.success && !results.proxy.success) {
    results.conclusion = 'Direct access works but proxy is failing. Check your proxy configuration.';
  } else if (!results.direct.success && results.proxy.success) {
    results.conclusion = 'Proxy works but direct access is failing. This is expected when accessing from HTTPS.';
  } else {
    results.conclusion = 'Both direct and proxy access are failing. Check if the API server is running and accessible.';
  }

  return results;
};

/**
 * Analyze API responses to identify common issues
 * 
 * @param {Object} response - The API response object
 * @returns {Object} Analysis results
 */
export const analyzeApiResponse = (response) => {
  const analysis = {
    status: response.status,
    hasData: !!response.data,
    hasToken: false,
    tokenFormat: 'unknown', 
    probableIssues: []
  };

  // Check token
  if (response.data && response.data.token) {
    analysis.hasToken = true;
    
    // Simple JWT format check
    const token = response.data.token;
    if (typeof token === 'string') {
      const parts = token.split('.');
      if (parts.length === 3) {
        analysis.tokenFormat = 'valid JWT format';
      } else {
        analysis.tokenFormat = 'not valid JWT format';
        analysis.probableIssues.push('Token is not in valid JWT format (should have 3 parts separated by dots)');
      }
    } else {
      analysis.tokenFormat = 'not a string';
      analysis.probableIssues.push('Token is not a string value');
    }
  } else {
    analysis.probableIssues.push('No token in response');
  }

  // Check HTTP status
  if (response.status !== 200) {
    analysis.probableIssues.push(`Unexpected HTTP status: ${response.status}`);
  }

  // Check for error messages
  if (response.data && response.data.error) {
    analysis.probableIssues.push(`Server error: ${response.data.error}`);
  }

  // Check for empty response
  if (!response.data || Object.keys(response.data).length === 0) {
    analysis.probableIssues.push('Empty or null response data');
  }

  return analysis;
};

export default {
  testLoginEndpoint,
  testApiProxy,
  analyzeApiResponse
};

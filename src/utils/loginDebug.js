/**
 * Login debugging utility to help identify and fix authentication issues
 */
import axios from 'axios';

/**
 * A utility function to test login with both direct and proxied routes
 * 
 * @param {Object} credentials - Login credentials
 * @returns {Promise<Object>} Debug results
 */
export const testLoginRoutes = async ({ username, password }) => {
  const results = {
    direct: { success: false, data: null, error: null },
    proxy: { success: false, data: null, error: null },
    vercelFunction: { success: false, data: null, error: null },
    conclusion: 'Not tested'
  };
  
  // Test headers used for all requests
  const headers = {
    'Content-Type': 'application/json',
    'Accept': 'application/json'
  };
  
  // Create requestBody once to ensure consistency
  const requestBody = { username, password };
  
  // Helper function to make requests consistently
  const makeRequest = async (url, name) => {
    try {
      console.log(`Testing ${name} login: ${url}`);
      const startTime = Date.now();
      
      const response = await axios({
        method: 'post',
        url,
        headers,
        data: requestBody,
        validateStatus: () => true, // Don't throw errors
        timeout: 10000 // 10 second timeout
      });
      
      const elapsed = Date.now() - startTime;
      console.log(`${name} login response in ${elapsed}ms:`, {
        status: response.status,
        data: response.data
      });
      
      return {
        success: response.status === 200 && response.data?.token,
        status: response.status,
        data: response.data,
        elapsed,
        error: null
      };
    } catch (error) {
      console.error(`${name} login error:`, error);
      return {
        success: false,
        status: error.response?.status,
        data: error.response?.data,
        error: error.message
      };
    }
  };
  
  // Test direct login
  results.direct = await makeRequest(
    'http://51.21.202.228:8080/auth/login',
    'Direct'
  );
  
  // Test API proxy login
  results.proxy = await makeRequest(
    '/api/auth/login',
    'Proxy'
  );
  
  // Test Vercel Function login (our custom implementation)
  results.vercelFunction = await makeRequest(
    '/api/auth/login',
    'Vercel Function'
  );
  
  // Analyze results
  if (results.vercelFunction.success) {
    results.conclusion = 'Vercel Function authentication is working properly';
  } else if (results.proxy.success) {
    results.conclusion = 'Proxy authentication is working properly';
  } else if (results.direct.success) {
    results.conclusion = 'Direct authentication works but proxy is failing';
  } else {
    results.conclusion = 'All authentication methods are failing';
    
    // Add more detailed diagnostics
    if (results.direct.status === 0) {
      results.conclusion += '. CORS is blocking direct access from browser.';
    }
    
    if (results.proxy.status === 404) {
      results.conclusion += '. Proxy endpoint not found, check Vercel configuration.';
    }
    
    if (results.proxy.error && results.proxy.error.includes('Network Error')) {
      results.conclusion += '. Network error with proxy, possible server connectivity issue.';
    }
  }
  
  return results;
};

// Export a function to inject a debug button into the login form
export const injectLoginDebugButton = () => {
  // Only run in non-production environments
  if (process.env.NODE_ENV === 'production') return;
  
  // Wait for DOM to be ready
  setTimeout(() => {
    const loginForm = document.querySelector('form');
    const submitButton = loginForm?.querySelector('button[type="submit"]');
    
    if (loginForm && submitButton) {
      const debugButton = document.createElement('button');
      debugButton.type = 'button';
      debugButton.textContent = 'Debug Login';
      debugButton.style.marginTop = '10px';
      debugButton.style.padding = '8px 16px';
      debugButton.style.backgroundColor = '#6b7280';
      debugButton.style.color = 'white';
      debugButton.style.border = 'none';
      debugButton.style.borderRadius = '4px';
      debugButton.style.cursor = 'pointer';
      
      debugButton.onclick = async () => {
        const usernameInput = loginForm.querySelector('input[type="email"], input[name="username"], input[name="email"]');
        const passwordInput = loginForm.querySelector('input[type="password"]');
        
        if (usernameInput && passwordInput) {
          const username = usernameInput.value;
          const password = passwordInput.value;
          
          if (username && password) {
            console.log('Running login diagnostics...');
            const results = await testLoginRoutes({ username, password });
            console.log('Login Diagnostics Results:', results);
            
            // Create a simple popup with results
            const resultsDiv = document.createElement('div');
            resultsDiv.style.position = 'fixed';
            resultsDiv.style.top = '50%';
            resultsDiv.style.left = '50%';
            resultsDiv.style.transform = 'translate(-50%, -50%)';
            resultsDiv.style.padding = '20px';
            resultsDiv.style.backgroundColor = 'white';
            resultsDiv.style.boxShadow = '0 0 10px rgba(0,0,0,0.3)';
            resultsDiv.style.zIndex = '9999';
            resultsDiv.style.maxWidth = '80%';
            resultsDiv.style.maxHeight = '80%';
            resultsDiv.style.overflow = 'auto';
            
            resultsDiv.innerHTML = `
              <h2 style="margin-top:0">Login Diagnostics</h2>
              <p><strong>Conclusion:</strong> ${results.conclusion}</p>
              <h3>Direct Login (${results.direct.success ? '✅' : '❌'})</h3>
              <pre>${JSON.stringify(results.direct, null, 2)}</pre>
              <h3>Proxy Login (${results.proxy.success ? '✅' : '❌'})</h3>
              <pre>${JSON.stringify(results.proxy, null, 2)}</pre>
              <h3>Vercel Function (${results.vercelFunction.success ? '✅' : '❌'})</h3>
              <pre>${JSON.stringify(results.vercelFunction, null, 2)}</pre>
              <button id="close-debug" style="padding: 8px 16px; background-color: #4f46e5; color: white; border: none; border-radius: 4px; cursor: pointer; margin-top: 10px;">Close</button>
            `;
            
            document.body.appendChild(resultsDiv);
            
            document.getElementById('close-debug').onclick = () => {
              document.body.removeChild(resultsDiv);
            };
          } else {
            alert('Please enter username and password to run diagnostics');
          }
        }
      };
      
      // Insert the debug button after the submit button
      submitButton.parentNode.insertBefore(debugButton, submitButton.nextSibling);
    }
  }, 1000); // Give the app a second to render the form
};

// Auto-inject the debug button
injectLoginDebugButton();

export default { testLoginRoutes, injectLoginDebugButton };

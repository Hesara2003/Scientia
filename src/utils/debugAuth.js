/**
 * Debug utility for authentication issues
 */
import { testLoginEndpoint, testApiProxy, analyzeApiResponse } from './debugApiUtils';

// This function will be called when the module is imported
const runAuthTests = async () => {
  console.log('----------------------------------------------------');
  console.log('🔍 RUNNING AUTHENTICATION DEBUGGING TESTS');
  console.log('----------------------------------------------------');
  
  // Test API connectivity first
  console.log('🌐 Testing API connectivity...');
  try {
    const proxyResults = await testApiProxy();
    console.log('API Connectivity results:', proxyResults);
  } catch (error) {
    console.error('Error testing API connectivity:', error);
  }
  
  // Test login endpoint
  console.log('🔑 Testing login endpoint...');
  try {
    // First try the proxied URL
    console.log('Testing with proxy URL (/api/)...');
    const proxiedLoginResponse = await testLoginEndpoint({
      username: 'test@example.com',  // Replace with a valid test username
      password: 'password123',       // Replace with a valid test password
      url: '/api'  // Will test the proxied endpoint
    });
    
    console.log('Login response analysis (proxy):', analyzeApiResponse({
      status: 200,
      data: proxiedLoginResponse
    }));
    
    // Then try direct URL for comparison
    console.log('Testing with direct URL...');
    const directLoginResponse = await testLoginEndpoint({
      username: 'test@example.com',  // Same test credentials
      password: 'password123',
      url: 'https://16.171.173.27:8080'  // Direct connection
    });
    
    console.log('Login response analysis (direct):', analyzeApiResponse({
      status: 200,
      data: directLoginResponse
    }));
    
  } catch (error) {
    console.error('Error testing login endpoint:', error);
  }
  
  console.log('----------------------------------------------------');
  console.log('🔍 DEBUG TESTS COMPLETED');
  console.log('----------------------------------------------------');
};

// Run tests immediately
runAuthTests();

export default runAuthTests;

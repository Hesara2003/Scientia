const axios = require('axios');

// Function to get a valid JWT token by logging in
async function getValidToken() {
  try {
    // Login to get a valid JWT token
    const response = await axios.post('http://localhost:8080/auth/login', {
      username: 'SamanthaP',
      password: 'password123'  // Assuming this is the password 
    });
    
    if (response.data && response.data.token) {
      console.log('Successfully obtained JWT token');
      return response.data.token;
    } else {
      console.error('Login successful but no token returned');
      return null;
    }
  } catch (error) {
    console.error('Error logging in:', error.message);
    if (error.response) {
      console.error('Status:', error.response.status);
      console.error('Data:', error.response.data);
    }
    return null;
  }
}

// Function to test the parent endpoint with authentication
async function testParentEndpoint(token) {
  try {
    // Test the parent endpoint with authentication
    const response = await axios.get('http://localhost:8080/parent/parents/username/SamanthaP', {
      headers: token ? {
        Authorization: `Bearer ${token}`
      } : {}
    });
    
    console.log('API Response Status:', response.status);
    console.log('API Response Data:', response.data);
    console.log('✅ Success! The endpoint is accessible.');
    return true;
  } catch (error) {
    console.error('❌ Error accessing endpoint:');
    if (error.response) {
      console.error('Status:', error.response.status);
      console.error('Data:', error.response.data);
    } else {
      console.error(error.message);
    }
    return false;
  }
}

// Main function to test the authentication flow
async function testAuthFlow() {
  // First try without a token (should fail with 401/403)
  console.log('Testing without token:');
  const noTokenResult = await testParentEndpoint();
  
  if (!noTokenResult) {
    console.log('\nGetting token and trying again...');
    const token = await getValidToken();
    
    if (token) {
      console.log('\nTesting with token:');
      await testParentEndpoint(token);
    }
  }
}

// Run the test
testAuthFlow();

const axios = require('axios');

async function testEndpoint() {
  try {
    // Test the parent endpoint with the username path (no token needed since we made it public)
    const response = await axios.get('http://localhost:8080/parent/parents/username/SamanthaP');
    
    console.log('API Response Status:', response.status);
    console.log('API Response Data:', response.data);
    console.log('✅ Success! The endpoint is accessible.');
  } catch (error) {
    console.error('❌ Error accessing endpoint:');
    if (error.response) {
      console.error('Status:', error.response.status);
      console.error('Data:', error.response.data);
    } else {
      console.error(error.message);
    }
  }
}

testEndpoint();

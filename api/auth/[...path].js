// This is a serverless function that will proxy requests to the authentication API
// It will be deployed to /api/auth/* on Vercel

export default async function handler(req, res) {
  const { path } = req.query;
  const targetUrl = `https://16.171.173.27:8080/auth/${path.join('/')}`;
  
  // Log the request for debugging
  console.log(`Proxying auth request to: ${targetUrl}`);
  console.log(`Method: ${req.method}`);
  
  // Handle preflight OPTIONS request
  if (req.method === 'OPTIONS') {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type,Authorization');
    res.setHeader('Access-Control-Allow-Credentials', 'true');
    return res.status(200).end();
  }
  
  try {
    // Get the request body
    const body = req.body ? JSON.stringify(req.body) : undefined;
    
    // Forward the request to the target API
    const fetchOptions = {
      method: req.method,
      headers: {
        'Content-Type': 'application/json',
        // Forward authorization header if present
        ...(req.headers.authorization ? 
            { 'Authorization': req.headers.authorization } : {})
      },
      body: ['GET', 'HEAD'].includes(req.method) ? undefined : body,
    };
    
    // Make the request to the target API
    const response = await fetch(targetUrl, fetchOptions);
    
    // Get the response body
    const responseBody = await response.text();
    let data;
    
    // Try to parse the response as JSON
    try {
      data = JSON.parse(responseBody);
    } catch (e) {
      console.error('Error parsing JSON response:', e);
      data = { error: 'Invalid JSON response from API server', raw: responseBody };
    }
    
    // Log the response status for debugging
    console.log(`API response status: ${response.status}`);
    
    // Set the response headers
    res.setHeader('Content-Type', 'application/json');
    res.setHeader('Access-Control-Allow-Origin', '*');
    
    // Return the response
    return res.status(response.status).json(data);
  } catch (error) {
    console.error('Error proxying request:', error);
    return res.status(500).json({ 
      error: 'Error proxying request to authentication server',
      message: error.message
    });
  }
}

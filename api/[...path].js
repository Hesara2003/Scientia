// This is a serverless function that will proxy requests to the API
// It will be deployed to /api/* on Vercel

export default async function handler(req, res) {
  const { path } = req.query;
  const targetUrl = `http://51.21.202.228:8080/${path.join('/')}`;
  
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
      data = { raw: responseBody };
    }
    
    // Set the response headers
    res.setHeader('Content-Type', 'application/json');
    res.setHeader('Access-Control-Allow-Origin', '*');
    
    // Return the response
    return res.status(response.status).json(data);
  } catch (error) {
    console.error('Error proxying request:', error);
    return res.status(500).json({ 
      error: 'Error proxying request to API server',
      message: error.message
    });
  }
}

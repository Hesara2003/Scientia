# Setting Up API Proxy for Vercel Deployment

This guide explains how to set up a proxy on Vercel to solve the mixed content issue when accessing an HTTP API from an HTTPS frontend.

## Step 1: Create a Vercel configuration file

Create a file named `vercel.json` in the root of your project with the following content:

```json
{
  "rewrites": [
    {
      "source": "/api/:path*",
      "destination": "https://16.171.173.27:8080/:path*"
    }
  ],
  "headers": [
    {
      "source": "/api/(.*)",
      "headers": [
        { "key": "Access-Control-Allow-Credentials", "value": "true" },
        { "key": "Access-Control-Allow-Origin", "value": "*" },
        { "key": "Access-Control-Allow-Methods", "value": "GET,OPTIONS,PATCH,DELETE,POST,PUT" },
        { "key": "Access-Control-Allow-Headers", "value": "X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version, Authorization" }
      ]
    }
  ]
}
```

This configuration:
1. Rewrites all requests to `/api/*` to your backend server
2. Adds CORS headers to allow access from any origin

## Step 2: Deploy to Vercel

When you push this configuration to your repository, Vercel will automatically apply these rules to your deployment.

## Step 3: Verify the configuration

After deploying, test your app to ensure that API requests work correctly. The requests should now be proxied through Vercel, avoiding the mixed content issue.

## Alternative: Upgrade your backend to use HTTPS

For a more secure long-term solution, consider:

1. Obtaining an SSL certificate for your backend server
2. Configuring your Spring Boot application to use HTTPS
3. Updating your API URL to use HTTPS instead of HTTP

This would eliminate the need for a proxy and provide end-to-end encryption for your application.

## Troubleshooting

If you continue to experience issues:

1. Check Vercel's function logs to see if the proxy is working correctly
2. Ensure your backend server accepts requests from Vercel's IP addresses
3. Verify that your API requests are using the correct path (should start with `/api/`)

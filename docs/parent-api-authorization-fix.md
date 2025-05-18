# API Access Issue Resolution for Parent Portal

## Problem Description
The Children.jsx component in the parent portal was encountering 403 Forbidden errors when trying to access the `/parent/parents/SamanthaP` endpoint. This was caused by two main issues:

1. The endpoint expected a numeric ID but was receiving a string username
2. The security configuration wasn't properly set up to allow parent role access to parent-related endpoints

## Solution Implemented

### 1. Added Username-based Endpoint for Parent Lookups

We added a new endpoint in `ParentController.java` to allow looking up parents by username rather than just by ID:

```java
@GetMapping("/username/{username}")
public ResponseEntity<Parent> getParentByUsername(@PathVariable String username) {
    // Implementation that returns a parent based on username
}
```

### 2. Enhanced Security Configuration

We updated the Spring Security configuration in `SecurityConfig.java` to explicitly allow both ADMIN and PARENT roles to access parent-related endpoints:

```java
.requestMatchers("/parent/**").hasAnyRole("ADMIN", "PARENT")
```

### 3. Updated Frontend Service

We modified the `getParentById` function in `parentService.js` to intelligently route requests to either the ID or username endpoint based on the type of ID provided:

```javascript
export const getParentById = async (parentId) => {
  try {
    // Check if parentId looks like a username (string that's not a number)
    if (isNaN(parentId) || typeof parentId === 'string' && /[a-zA-Z]/.test(parentId)) {
      // If it's a username, use the username endpoint
      const response = await api.get(`/parent/parents/username/${parentId}`);
      return response.data;
    } else {
      // If it's a numeric ID, use the original ID endpoint
      const response = await api.get(`/parent/parents/${parentId}`);
      return response.data;
    }
  } catch (error) {
    console.error('Error fetching parent details:', error);
    throw error;
  }
};
```

### 4. Updated Children Component

We updated the `Children.jsx` component to use either a username or ID for parent identification, and properly handle the response when using a username.

## Key Takeaways and Best Practices

1. **API Endpoint Design**: When designing endpoints, consider whether string-based identifiers (like usernames) or numeric IDs should be supported, and implement appropriate endpoints for both if needed.

2. **Security Configuration**: Always explicitly specify which roles can access which endpoints in the security configuration.

3. **Error Handling**: Implement proper error handling on both the frontend and backend to provide meaningful error messages when authentication or authorization fails.

4. **JWT Authentication**: Ensure that JWT tokens are properly signed and validated, and that the client is sending the correct token format.

## Future Recommendations

1. Consider adding more comprehensive logging for authentication and authorization issues to make troubleshooting easier.

2. Implement a proper user management system that can map between usernames and user IDs.

3. Consider adding detailed API documentation using tools like Swagger or OpenAPI.

4. Add more automated tests for API endpoints to catch authorization issues before deploying to production.

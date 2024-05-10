const originalFetch = fetch;

const customFetch = (url:any, options:any) => {
  // Intercept and modify the request here, if needed
  // For example, add headers or modify the URL
  const { method, ...otherOptions } = options;
  const modifiedOptions = {
    ...otherOptions,
    // Add any headers here
    headers: {
      ...otherOptions.headers,
      'Content-Type': 'application/json', // Example header
    },
  };

  // Perform the actual fetch request
  return originalFetch(url, { ...modifiedOptions, method });
};

// Override the global fetch function with the custom implementation
global.fetch = customFetch;

export default customFetch;
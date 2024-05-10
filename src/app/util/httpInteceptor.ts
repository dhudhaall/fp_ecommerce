import axios from 'axios';

const instance = axios.create({
  // baseURL: 'http://api.example.com', // You can set a base URL if needed
});

// Request interceptor
instance.interceptors.request.use(
  (config) => {
    const { params } = config;
    
    // Add additional parameters as needed
    const additionalParams = {
      // Example additional parameter
      guest_id: '128977289323'
    };

    // Merge existing params with additional params
    config.params = { ...params, ...additionalParams };
       
        config.headers.common = {
              authtoken: `${128977289323}`
          }
      
    return config;
  },
  (error) => {
    // Handle request error
    return Promise.reject(error);
  }
);

// Response interceptor
instance.interceptors.response.use(
  (response) => {
    // Modify response data here
    return response;
  },
  (error) => {
    // Handle response error
    return Promise.reject(error);
  }
);

export default instance;
import axios, { InternalAxiosRequestConfig } from "axios";

// Function to get the token from localStorage
const getToken = (): string | null => {
    return localStorage.getItem("token");
};

// Add a request interceptor to the default Axios instance
axios.interceptors.request.use(
    (config: InternalAxiosRequestConfig) => {
        const token = getToken();

        // If a token exists, add it to the Authorization header
        if (token) {
            // Ensure the headers object exists
            if (!config.headers) {
                config.headers = {};
            }
            config.headers["Authorization"] = `Bearer ${token}`;
        }

        // Set default Content-Type if not already set
        if (!config.headers["Content-Type"]) {
            config.headers["Content-Type"] = "application/json";
        }

        return config;
    },
    (error) => {
        // Handle request error
        return Promise.reject(error);
    }
);

// Optional: You can also add response interceptors here if needed
// axios.interceptors.response.use(...);

// Export the configured Axios instance if you want to use it directly elsewhere,
// but the interceptor will apply to all uses of the default Axios instance.
export default axios;

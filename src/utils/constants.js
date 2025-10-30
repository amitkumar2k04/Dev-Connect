// Determine BASE_URL based on environment
const getBaseURL = () => {
  // Development environment
  if (import.meta.env.DEV || location.hostname === "localhost" || location.hostname === "127.0.0.1") {
    return "http://localhost:5000";
  }
  
  // Production environment
  if (location.hostname === "devconnect.solutions") {
    return "https://devconnect.solutions/api";
  }
  
  // Default fallback for production
  return "/api";
};

export const BASE_URL = getBaseURL();

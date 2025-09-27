export const api_base_url =
  process.env.NODE_ENV === "production"
    ? "https://blogapp-backend-2y8z.onrender.com"
    : "http://localhost:2000";

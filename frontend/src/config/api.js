// Central API configuration
// Reads VITE_API_BASE_URL from environment variables in production (Vercel / Render)
// Defaults to http://localhost:3000 in local development
export const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000';

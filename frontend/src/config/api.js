// Central API configuration
// Reads VITE_API_BASE_URL from environment variables in production (Vercel / Render)
// Defaults to http://localhost:3000 in local development
// Automatically strips trailing slashes and '/api' to prevent double '/api/api' 404 errors
const rawUrl = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000';
export const API_BASE_URL = rawUrl.replace(/\/+$/, '').replace(/\/api$/, '');

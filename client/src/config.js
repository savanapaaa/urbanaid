export const config = {
  BASE_URL: process.env.NODE_ENV === 'development' 
    ? 'http://localhost:5000/api'
    : 'https://urbanaid-server.up.railway.app/api',
  CLIENT_URL: process.env.NODE_ENV === 'development'
    ? 'http://localhost:9000'
    : 'https://urbanaid-client.vercel.app'
};
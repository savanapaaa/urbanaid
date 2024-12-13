const BASE_URL = 'http://localhost:5000/api';

const AuthService = {
  async login(email, password) {
    const response = await fetch(`${BASE_URL}/auth/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    });

    const responseJson = await response.json();
    
    if (response.ok) {
      localStorage.setItem('token', responseJson.data.token);
      localStorage.setItem('user', JSON.stringify(responseJson.data.user));
    }
    
    return responseJson;
  },

  async register(userData) {
    const response = await fetch(`${BASE_URL}/auth/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userData),
    });

    return response.json();
  },

  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  },

  getToken() {
    return localStorage.getItem('token');
  },

  isAuthenticated() {
    return this.getToken() !== null;
  }
};

export default AuthService;
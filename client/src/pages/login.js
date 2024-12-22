import '../components/form-login.js';
import AuthService from '../services/auth-service';
import Loading from '../components/common/Loading.js';

const LoginPage = {
  render() {
    if (AuthService.isAuthenticated()) {
      const user = AuthService.getUser();
      window.location.href = (user.isAdmin || user.role === 'superadmin') ? '/admin' : '/pelaporan';
      return '';
    }

    return `
            <div class="min-h-screen flex items-center justify-center bg-cover bg-center px-4 sm:px-6 lg:px-8 relative" 
                style="background-image: url('/images/hero-section1.png');">
                <div class="absolute inset-0 bg-black/50"></div>
                <div class="relative z-10">
                    <form-login></form-login>
                </div>
            </div>
        `;
  },

  async init() {
    const app = document.getElementById('app');
    app.innerHTML = this.render();
  },

  cleanup() {
    Loading.hide();
  }
};
export default LoginPage;
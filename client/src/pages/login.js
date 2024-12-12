import "../components/form-login.js";

const LoginPage = {
    render() {
        if (localStorage.getItem('token')) {
            window.location.hash = '#/pelaporan';
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
        const app = document.getElementById("app");
        app.innerHTML = this.render();
    },

    async handleLogin(userData) {
        try {
            localStorage.setItem('token', userData.token);
            localStorage.setItem('user', JSON.stringify(userData.user));
            
            window.location.hash = '#/pelaporan';
        } catch (error) {
            console.error('Login error:', error);
        }
    },

    cleanup() {
    }
};

export default LoginPage;
import "../components/form-register.js";

const RegisterPage = {
  render() {
    return `
            <div class="min-h-screen flex items-center justify-center bg-cover bg-center px-4 sm:px-6 lg:px-8" 
                 style="background-image: url('/images/hero-section1.png');"
                <form-register></form-register>
            </div>
        `;
  },

  async init() {
    const app = document.getElementById("app");
    app.innerHTML = this.render();
  },
};

export default RegisterPage;

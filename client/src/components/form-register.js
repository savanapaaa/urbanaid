class FormRegister extends HTMLElement {
  connectedCallback() {
    this.innerHTML = `
          <div class="backdrop-blur-md bg-white/0 p-6 sm:p-8 rounded-lg shadow-lg max-w-sm sm:max-w-md w-full border border-white/50">
            <h1 tabindex=0 class="text-xl sm:text-2xl font-bold text-center mb-6">
              Daftar Akun <span class="text-blue-800">UrbanAid</span>
            </h1>
            
            <form class="space-y-6">
              <!-- Input Nama Lengkap -->
              <div class="relative">
                <input 
                  type="text" 
                  id="fullname" 
                  name="fullname" 
                  class="peer w-full font-medium py-3 bg-transparent text-blue-800 focus:outline-none border-b-2 border-white focus:border-blue-800 placeholder:text-blue placeholder-transparent placeholder:font-medium pr-10" 
                  placeholder="Johndoe@gmail.com">
                <span class="absolute inset-y-0 right-3 flex items-center text-blue-800">
                  <i class="fas fa-user"></i>
                </span>
                <label 
                  for="fullname" 
                  class="absolute left-0 -top-3.5 text-blue-800 text-sm transition-all 
                  peer-placeholder-shown:text-base peer-placeholder-shown:text-blue-800 peer-placeholder-shown:top-3 peer-placeholder-shown:font-medium
                  peer-focus:-top-3.5 peer-focus:text-blue-800 peer-focus:text-sm">
                  Nama Lengkap
                </label>
              </div>
  
              <!-- Input Email -->
              <div class="relative">
                <input 
                  type="email" 
                  id="email" 
                  name="email" 
                  class="peer w-full font-medium py-3 bg-transparent text-blue-800 focus:outline-none border-b-2 border-white focus:border-blue-800 placeholder:text-blue placeholder-transparent placeholder:font-medium pr-10" 
                  placeholder="Email">
                <span class="absolute inset-y-0 right-3 flex items-center text-blue-800">
                  <i class="fas fa-envelope"></i>
                </span>
                <label 
                  for="email" 
                  class="absolute left-0 -top-3.5 text-blue-800 text-sm transition-all 
                  peer-placeholder-shown:text-base peer-placeholder-shown:text-blue-800 peer-placeholder-shown:top-3 peer-placeholder-shown:font-medium
                  peer-focus:-top-3.5 peer-focus:text-blue-800 peer-focus:text-sm">
                  Email
                </label>
              </div>
  
              <!-- Input Password -->
              <div class="relative">
                <input 
                  type="password" 
                  id="password" 
                  name="password" 
                  class="peer w-full font-medium py-3 bg-transparent text-blue-800 focus:outline-none border-b-2 border-white focus:border-blue-800 placeholder:text-blue placeholder-transparent placeholder:font-medium pr-10" 
                  placeholder="Kata Sandi">
                <button 
                  type="button" 
                  id="togglePassword" 
                  class="absolute inset-y-0 right-3 flex items-center text-blue-800">
                  <i class="fas fa-eye"></i>
                </button>
                <label 
                  for="password" 
                  class="absolute left-0 -top-3.5 text-blue-800 text-sm transition-all 
                  peer-placeholder-shown:text-base peer-placeholder-shown:text-blue-800 peer-placeholder-shown:top-3 peer-placeholder-shown:font-medium
                  peer-focus:-top-3.5 peer-focus:text-blue-800 peer-focus:text-sm">
                  Password
                </label>
              </div>
  
              <!-- Checkbox -->
              <div class="flex items-start space-x-3 min-w-[44px] min-h-[44px]">
                <input 
                  type="checkbox" 
                  id="terms" 
                  class="h-5 w-5 text-blue-200 focus:ring-blue-200">
                <label tabindex=0
                  for="terms" 
                  class=" text-sm font-medium text-blue-800 leading-tight">
                  Saya menyetujui syarat dan ketentuan serta kebijakan privasi.
                </label>
              </div>
  
              <!-- Tombol Daftar -->
              <button 
                type="submit" 
                class="w-full py-3 font-semibold text-white rounded-2xl bg-gradient-to-b from-blue-800 to-blue-200 hover:to-blue-800 transition">
                Daftar
              </button>
            </form>
            
            <!-- Footer -->
            <p tabindex=0 class="mt-6 text-sm text-center font-medium text-blue-800">
              Sudah punya akun? 
              <a href="#" class="font-bold hover:underline inline-flex items-center justify-center min-w-[44px] min-h-[44px] p-2">Login</a>
            </p>
          </div>
        </div>
      `;

    this.attachTogglePassword();
  }

  attachTogglePassword() {
    const passwordInput = this.querySelector("#password");
    const togglePassword = this.querySelector("#togglePassword");
    const toggleIcon = togglePassword.querySelector("i");

    togglePassword.addEventListener("click", () => {
      const isPassword = passwordInput.type === "password";
      passwordInput.type = isPassword ? "text" : "password";
      toggleIcon.classList.toggle("fa-eye");
      toggleIcon.classList.toggle("fa-eye-slash");
    });
  }
}

customElements.define("form-register", FormRegister);

class NavbarComponent extends HTMLElement {
    constructor() {
      super();
      this.handleLogout = this.handleLogout.bind(this);
      this.toggleMobileMenu = this.toggleMobileMenu.bind(this);
      this.toggleUserMenu = this.toggleUserMenu.bind(this);
    }
  
    handleLogout() {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      localStorage.removeItem('remember_token');
      window.location.hash = '#/';
      window.location.reload();
    }
  
    toggleMobileMenu() {
      const mobileMenu = this.querySelector('#mobile-menu');
      mobileMenu.classList.toggle('hidden');
    }
  
    toggleUserMenu(event) {
      event.stopPropagation();
      const userMenu = this.querySelector('#user-menu');
      userMenu.classList.toggle('hidden');
    }
  
    attachEventListeners() {
      const mobileMenuButton = this.querySelector('#mobile-menu-button');
      const mobileLogoutBtn = this.querySelector('#mobile-logout-btn');
      const desktopLogoutBtn = this.querySelector('#desktop-logout-btn');
      const userMenuButton = this.querySelector('#user-menu-button');
      const userMenu = this.querySelector('#user-menu');
  
      if (mobileMenuButton) {
        mobileMenuButton.addEventListener('click', this.toggleMobileMenu);
      }
  
      if (mobileLogoutBtn) {
        mobileLogoutBtn.addEventListener('click', this.handleLogout);
      }
  
      if (desktopLogoutBtn) {
        desktopLogoutBtn.addEventListener('click', this.handleLogout);
      }
  
      if (userMenuButton) {
        userMenuButton.addEventListener('click', this.toggleUserMenu);
      }
  
      document.addEventListener('click', (event) => {
        if (userMenu && !userMenu.classList.contains('hidden')) {
          const isClickInsideMenu = userMenu.contains(event.target);
          const isClickOnButton = userMenuButton && userMenuButton.contains(event.target);
          
          if (!isClickInsideMenu && !isClickOnButton) {
            userMenu.classList.add('hidden');
          }
        }
      });
    }
  
    getNavbarContent() {
      const token = localStorage.getItem('token');
      const userString = localStorage.getItem('user');
      const isLoggedIn = token !== null;
      let userData = null;
  
      if (isLoggedIn && userString) {
        try {
          userData = JSON.parse(userString);
        } catch (error) {
          console.error('Error parsing user data:', error);
        }
      }
  
      const pelaporanLink = isLoggedIn ? '#/pelaporan' : '#/login';
  
      return `
        <nav class="gradient-background text-white fixed w-full z-50">
          <!-- Mobile navbar -->
          <div class="block md:hidden px-4 py-3">
            <div class="flex items-center justify-between">
              <div class="flex items-center">
                <img src="/images/logo.png" alt="UrbanAid Logo" class="w-10 h-10 rounded-full">
                <span class="ml-3 text-lg font-bold brand-color">UrbanAid</span>
              </div>
              <button id="mobile-menu-button" class="text-white focus:outline-none">
                <i class="material-icons-round text-2xl">menu</i>
              </button>
            </div>
            
            <!-- Mobile menu -->
            <div id="mobile-menu" class="hidden mt-3 space-y-2">
              <a href="#/" class="block py-2 hover:bg-teal-700 px-3 rounded text-white">Beranda</a>
              <a href="#/artikel" class="block py-2 hover:bg-teal-700 px-3 rounded text-white">Artikel</a>
              <a href="${pelaporanLink}" class="block py-2 hover:bg-teal-700 px-3 rounded text-white">Pelaporan</a>
              <a href="#/tentang-kami" class="block py-2 hover:bg-teal-700 px-3 rounded text-white">Tentang Kami</a>
              ${isLoggedIn ? `
                <div class="flex items-center justify-between py-2 px-3 hover:bg-teal-700 rounded">
                  <span class="text-white">${userData?.nama || 'User'}</span>
                  <button id="mobile-logout-btn" class="text-white hover:text-red-500">
                    Logout
                  </button>
                </div>
              ` : `
                <a href="#/login" class="block py-2 hover:bg-teal-700 px-3 rounded text-white">Login</a>
              `}
            </div>
          </div>
  
          <!-- Desktop navbar -->
          <div class="desktop-navbar hidden md:block">
            <div class="container mx-auto px-4 py-4">
              <div class="flex justify-between items-center">
                <div class="flex items-center">
                  <img src="/images/logo.png" alt="UrbanAid Logo" class="w-12 h-12 rounded-full">
                  <span class="ml-4 text-xl font-bold brand-color">UrbanAid</span>
                </div>
                <div class="flex items-center space-x-6">
                  <a href="#/" class="hover:text-teal-200">Beranda</a>
                  <a href="#/artikel" class="hover:text-teal-200">Artikel</a>
                  <a href="${pelaporanLink}" class="hover:text-teal-200">Pelaporan</a>
                  <a href="#/tentang-kami" class="hover:text-teal-200">Tentang Kami</a>
                  ${isLoggedIn ? `
                    <div class="relative">
                      <button id="user-menu-button" 
                              class="gradient-border-button px-4 py-2 rounded-full bg-white text-[#002F35] inline-flex items-center">
                        <span class="flex items-center">
                          ${userData?.nama || 'User'}
                          <i class="material-icons-round text-lg ml-1 flex items-center" style="margin-top: -1px;">expand_more</i>
                        </span>
                      </button>
                      <div id="user-menu" 
                           class="absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 hidden">
                        <button id="desktop-logout-btn"
                                class="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                          Logout
                        </button>
                      </div>
                    </div>
                  ` : `
                    <a href="#/login" class="gradient-border-button">
                      Masuk
                    </a>
                  `}
                </div>
              </div>
            </div>
          </div>
        </nav>
        <div class="h-16"></div>
      `;
    }
  
    connectedCallback() {
      this.innerHTML = this.getNavbarContent();
      this.attachEventListeners();
    }
  
    disconnectedCallback() {
      const mobileMenuButton = this.querySelector('#mobile-menu-button');
      const mobileLogoutBtn = this.querySelector('#mobile-logout-btn');
      const desktopLogoutBtn = this.querySelector('#desktop-logout-btn');
      const userMenuButton = this.querySelector('#user-menu-button');
  
      if (mobileMenuButton) {
        mobileMenuButton.removeEventListener('click', this.toggleMobileMenu);
      }
      if (mobileLogoutBtn) {
        mobileLogoutBtn.removeEventListener('click', this.handleLogout);
      }
      if (desktopLogoutBtn) {
        desktopLogoutBtn.removeEventListener('click', this.handleLogout);
      }
      if (userMenuButton) {
        userMenuButton.removeEventListener('click', this.toggleUserMenu);
      }
    }
  }
  
  customElements.define('app-navbar', NavbarComponent);
  
  export const Navbar = () => {
    const navbar = document.createElement('app-navbar');
    return navbar.outerHTML;
  };
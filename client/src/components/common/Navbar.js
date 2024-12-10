export const Navbar = () => {
    const template = `
        <nav class="gradient-background text-white fixed w-full z-50">
            <!-- Mobile navbar -->
            <div class="block md:hidden px-4 py-3">
                <div class="flex items-center justify-between">
                    <div class="flex items-center">
                        <img src="/images/logo.png" alt="UrbanAid Logo" class="w-10 h-10 rounded-full">
                        <span class="ml-3 text-lg font-bold brand-color">UrbanAid</span>
                    </div>
                    <button id="mobile-menu-button" class="text-white focus:outline-none">
                        <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16m-7 6h7"></path>
                        </svg>
                    </button>
                </div>
                
                <!-- Mobile menu -->
                <div id="mobile-menu" class="hidden mt-3 space-y-2">
                    <a href="#/" class="block py-2 hover:bg-teal-700 px-3 rounded text-white">Beranda</a>
                    <a href="#/artikel" class="block py-2 hover:bg-teal-700 px-3 rounded text-white">Artikel</a>
                    <a href="#/pelaporan" class="block py-2 hover:bg-teal-700 px-3 rounded text-white">Pelaporan</a>
                    <a href="#/tentang-kami" class="block py-2 hover:bg-teal-700 px-3 rounded text-white">Tentang Kami</a>
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
                            <a href="#/pelaporan" class="hover:text-teal-200">Pelaporan</a>
                            <a href="#/tentang-kami" class="hover:text-teal-200">Tentang Kami</a>
                            <button class="gradient-border-button">
                                Masuk
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </nav>
        <div class="h-16"></div> 
    `;

    return template;
};
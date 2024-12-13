// components/admin/Sidebar.js
const Sidebar = {
    render() {
        return `
            <!-- Mobile Menu Button -->
            <button id="menuToggle" class="fixed top-4 right-4 z-50 p-2 rounded-lg bg-[#002F35] lg:hidden">
                <span class="material-icons-round text-white">menu</span>
            </button>

            <!-- Sidebar Container - Hidden by default on mobile -->
            <div id="sidebar" class="fixed inset-y-0 left-0 transform -translate-x-full lg:translate-x-0 transition-transform duration-300 ease-in-out w-64 bg-[#002F35] z-40">
                <div class="px-4 py-8">
                    <div class="flex items-center justify-between mb-8">
                        <h1 class="text-xl lg:text-2xl font-bold text-white">Admin Panel</h1>
                        <button id="closeMenu" class="lg:hidden text-white">
                            <span class="material-icons-round">close</span>
                        </button>
                    </div>
                    
                    <nav class="flex flex-col space-y-2">
                        <a href="#/admin" class="text-white py-3 hover:bg-[#00899B] rounded-lg px-4 flex items-center">
                            <span class="material-icons-round mr-3">dashboard</span>
                            <span class="text-sm lg:text-base">Dashboard</span>
                        </a>
                        
                        <a href="#/admin/laporan" class="text-white py-3 hover:bg-[#00899B] rounded-lg px-4 flex items-center">
                            <span class="material-icons-round mr-3">inbox</span>
                            <span class="text-sm lg:text-base">Laporan Masuk</span>
                        </a>
                        
                        <a href="#/admin/riwayat" class="text-white py-3 hover:bg-[#00899B] rounded-lg px-4 flex items-center">
                            <span class="material-icons-round mr-3">history</span>
                            <span class="text-sm lg:text-base">Riwayat</span>
                        </a>
                        
                        <a href="#/admin/users" class="text-white py-3 hover:bg-[#00899B] rounded-lg px-4 flex items-center">
                            <span class="material-icons-round mr-3">group</span>
                            <span class="text-sm lg:text-base">Management User</span>
                        </a>
                        
                        <a href="#/admin/admins" class="text-white py-3 hover:bg-[#00899B] rounded-lg px-4 flex items-center">
                            <span class="material-icons-round mr-3">admin_panel_settings</span>
                            <span class="text-sm lg:text-base">Management Admin</span>
                        </a>

                        <button id="logoutBtn" class="text-red-400 py-3 hover:bg-red-600 hover:text-white rounded-lg px-4 flex items-center mt-8">
                            <span class="material-icons-round mr-3">logout</span>
                            <span class="text-sm lg:text-base">Logout</span>
                        </button>
                    </nav>
                </div>
            </div>

            <!-- Overlay for mobile -->
            <div id="sidebarOverlay" class="fixed inset-0 bg-black opacity-0 pointer-events-none transition-opacity duration-300 ease-in-out lg:hidden"></div>
        `;
    },

    afterRender() {
        const menuToggle = document.getElementById('menuToggle');
        const closeMenu = document.getElementById('closeMenu');
        const sidebar = document.getElementById('sidebar');
        const overlay = document.getElementById('sidebarOverlay');
        const logoutBtn = document.getElementById('logoutBtn');

        const toggleSidebar = () => {
            const isHidden = sidebar.classList.contains('-translate-x-full');
            sidebar.classList.toggle('-translate-x-full');
            overlay.classList.toggle('opacity-0');
            overlay.classList.toggle('pointer-events-none');
            if (isHidden) {
                overlay.classList.add('opacity-50');
                overlay.classList.remove('pointer-events-none');
            } else {
                overlay.classList.remove('opacity-50');
                overlay.classList.add('pointer-events-none');
            }
        };

        menuToggle?.addEventListener('click', toggleSidebar);
        closeMenu?.addEventListener('click', toggleSidebar);
        overlay?.addEventListener('click', toggleSidebar);

        logoutBtn?.addEventListener('click', () => {
            localStorage.removeItem('token');
            localStorage.removeItem('role');
            window.location.hash = '#/login';
        });
    }
};

export default Sidebar;
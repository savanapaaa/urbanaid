import DrawerInitiator from './utils/drawer-initiator.js';
import UrlParser from './utils/url-parser.js';
import routes from './routes/routes.js';

const App = {
    init() {
        this.routes = routes;
        this.page = null;
        this.currentPath = '/';
        this._initializeApp();
        return this;
    },

    _initializeApp() {
        const loadingElement = document.createElement('div');
        loadingElement.id = 'page-loading';
        loadingElement.className = 'hidden fixed inset-0 bg-white bg-opacity-75 flex items-center justify-center z-50';
        loadingElement.innerHTML = '<div class="animate-spin rounded-full h-12 w-12 border-4 border-teal-500 border-t-transparent"></div>';
        document.body.appendChild(loadingElement);
    },

    _checkAuth(url) {
        const token = localStorage.getItem('token');
        const userRole = localStorage.getItem('role');
        
        const protectedRoutes = ['/pelaporan', '/pelaporan/beranda', '/pelaporan/laporanaktif', '/pelaporan/riwayat', '/pelaporan/profile'];
        
        const adminRoutes = ['/admin', '/admin/laporan', '/admin/riwayat'];
     
        if (adminRoutes.some(route => url.startsWith(route))) {
            if (!token || userRole !== 'admin') {
                window.location.hash = '#/';
                return false;
            }
            return true;
        }
        
        if (protectedRoutes.some(route => url.startsWith(route)) && !token) {
            window.location.hash = '#/login';
            return false;
        }
        
        return true;
     },

     async renderPage() {
        try {
            // Simpan waktu mulai
            const startTime = Date.now();
            let loadingTimeout;
    
            // Tunda menampilkan loading selama 300ms
            loadingTimeout = setTimeout(() => {
                this._showLoading();
            }, 300);
    
            if (this.page && this.page.cleanup) {
                await this.page.cleanup();
            }
    
            const url = UrlParser.parseActiveUrlWithCombiner();
            
            if (!this._checkAuth(url)) {
                clearTimeout(loadingTimeout);
                this._hideLoading();
                return;
            }
    
            const page = this._getPage(url);
    
            if (!page) {
                throw new Error('Page not found');
            }
    
            this.page = page;
            
            if (this.page.init) {
                await this.page.init();
            }
            
            this._initializeDrawer();
    
            this.currentPath = url;
    
            // Batalkan loading jika prosesnya cepat
            const processTime = Date.now() - startTime;
            clearTimeout(loadingTimeout);
    
            // Hanya sembunyikan loading jika memang sudah muncul
            if (processTime >= 300) {
                this._hideLoading();
            }
    
        } catch (error) {
            console.error('Error rendering page:', error);
            this._handleError(error);
        }
    },

    _getPage(url) {
        const urlParts = url.split('/');
        const routes = this.routes;

        if (routes[url]) {
            return routes[url];
        }

        for (const route in routes) {
            const routeParts = route.split('/');
            if (routeParts.length !== urlParts.length) continue;

            const match = routeParts.every((part, index) => {
                if (part.startsWith(':')) return true;
                return part === urlParts[index];
            });

            if (match) return routes[route];
        }

        return routes['/'];
    },

    _initializeDrawer() {
        const button = document.querySelector('#mobile-menu-button');
        const drawer = document.querySelector('#mobile-menu');
        const content = document.querySelector('#app');

        if (button && drawer && content) {
            DrawerInitiator.init({
                button,
                drawer,
                content,
                closeOnEscape: true,
                closeOnOutsideClick: true
            });
        }
    },

    _showLoading() {
        const loading = document.getElementById('page-loading');
        if (loading) loading.classList.remove('hidden');
    },

    _hideLoading() {
        const loading = document.getElementById('page-loading');
        if (loading) loading.classList.add('hidden');
    },

    _handleError(error) {
        this._hideLoading();
        
        const errorContainer = document.createElement('div');
        errorContainer.className = 'fixed inset-x-0 top-4 flex items-center justify-center';
        errorContainer.innerHTML = `
            <div class="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative max-w-md">
                <strong class="font-bold">Error!</strong>
                <span class="block sm:inline"> ${error.message}</span>
            </div>
        `;
        document.body.appendChild(errorContainer);

        setTimeout(() => {
            errorContainer.remove();
        }, 5000);

        if (this.currentPath !== '/') {
            window.location.hash = '#/';
        }
    }
};

export default App;
// client/src/App.js

import { HomePage } from './pages/Dashboard/Home.js';
import { ArticlePage } from './pages/Dashboard/Article.js';
import DrawerInitiator from './utils/drawer-initiator.js';
import UrlParser from './utils/url-parser.js';

class App {
    constructor() {
        this.routes = {
            '/': HomePage,
            '/artikel': ArticlePage,
            // Add more routes here
        };

        this.page = null;
        this.currentPath = '/';
    }

    async init() {
        try {
            // Handle initial route
            await this.renderPage();

            // Add event listeners for navigation
            window.addEventListener('hashchange', async () => {
                await this.renderPage();
            });

            window.addEventListener('load', async () => {
                await this.renderPage();
            });
        } catch (error) {
            console.error('Error initializing app:', error);
        }
    }

    async renderPage() {
        try {
            // Clear previous page content if exists
            if (this.page && this.page.cleanup) {
                this.page.cleanup();
            }

            // Get current URL and map to route
            const path = window.location.hash ? window.location.hash.slice(1) : '/';
            console.log('Current path:', path);

            // Initialize new page
            const Page = this.routes[path] || this.routes['/'];
            this.page = new Page();
            
            // Initialize drawer after page is rendered
            await this.page.init();
            this._initializeDrawer();

            this.currentPath = path;
        } catch (error) {
            console.error('Error rendering page:', error);
            // Fallback to home page if error occurs
            if (this.currentPath !== '/') {
                window.location.hash = '#/';
            }
        }
    }

    _initializeDrawer() {
        const button = document.querySelector('#mobile-menu-button');
        const drawer = document.querySelector('#mobile-menu');
        const content = document.querySelector('#app');

        if (button && drawer && content) {
            DrawerInitiator.init({
                button,
                drawer,
                content
            });
        } else {
            console.warn('Some drawer elements not found:', {
                button: !!button,
                drawer: !!drawer,
                content: !!content
            });
        }
    }
}

// Export a function that creates and initializes the app
const initApp = () => {
    const app = new App();
    app.init();
};

// Initialize app when DOM is loaded
document.addEventListener('DOMContentLoaded', initApp);

export default App;
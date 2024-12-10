const DrawerInitiator = {
    init({ button, drawer, content, closeOnEscape = true, closeOnOutsideClick = true }) {
        this._button = button;
        this._drawer = drawer;
        this._content = content;
        this._overlay = document.querySelector('.drawer-overlay');
        
        this._handleClick = this._handleClick.bind(this);
        this._handleOutsideClick = this._handleOutsideClick.bind(this);
        this._handleEscape = this._handleEscape.bind(this);
        this._handleNavigation = this._handleNavigation.bind(this);
        
        this._initializeEventListeners(closeOnEscape, closeOnOutsideClick);
    },

    _initializeEventListeners(closeOnEscape, closeOnOutsideClick) {
        this._button.addEventListener('click', this._handleClick);

        if (closeOnOutsideClick) {
            this._content.addEventListener('click', this._handleOutsideClick);
        }

        if (closeOnEscape) {
            document.addEventListener('keydown', this._handleEscape);
        }

        const navLinks = this._drawer.querySelectorAll('a');
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                this._handleNavigation();
                document.body.style.overflow = '';
            });
        });

        this._button.setAttribute('aria-controls', this._drawer.id);
        this._button.setAttribute('aria-expanded', 'false');
        this._drawer.setAttribute('aria-hidden', 'true');
        this._drawer.setAttribute('role', 'navigation');
    },

    _handleClick(event) {
        event.stopPropagation();
        const isHidden = this._drawer.style.display === 'none';
        this._drawer.style.display = isHidden ? 'block' : 'none';
        
        if (this._overlay) {
            this._overlay.classList.toggle('open');
        }
        
        this.toggleDrawer();
    },

    _handleOutsideClick(event) {
        if (this.isDrawerOpen() && !this._drawer.contains(event.target)) {
            this.closeDrawer();
            document.body.style.overflow = '';
        }
    },

    _handleEscape(event) {
        if (event.key === 'Escape' && this.isDrawerOpen()) {
            this.closeDrawer();
            document.body.style.overflow = '';
        }
    },

    _handleNavigation() {
        setTimeout(() => {
            this.closeDrawer();
            document.body.style.overflow = '';
        }, 150);
    },

    toggleDrawer() {
        const isOpen = this.isDrawerOpen();
        
        this._drawer.classList.toggle('open');
        this._button.classList.toggle('active');
        
        this._button.setAttribute('aria-expanded', !isOpen);
        this._drawer.setAttribute('aria-hidden', isOpen);

        document.body.style.overflow = !isOpen ? 'hidden' : '';

        this._drawer.classList.add('drawer-transition');
        
        setTimeout(() => {
            this._drawer.classList.remove('drawer-transition');
        }, 300);
    },

    closeDrawer() {
        if (this.isDrawerOpen()) {
            this._drawer.style.display = 'none';
            this._drawer.classList.remove('open');
            this._button.classList.remove('active');
            this._button.setAttribute('aria-expanded', 'false');
            this._drawer.setAttribute('aria-hidden', 'true');
            document.body.style.overflow = ''; 
            
            if (this._overlay) {
                this._overlay.classList.remove('open');
            }
        }
    },

    isDrawerOpen() {
        return this._drawer.classList.contains('open');
    },

    cleanup() {
        this._button.removeEventListener('click', this._handleClick);
        this._content.removeEventListener('click', this._handleOutsideClick);
        document.removeEventListener('keydown', this._handleEscape);
        
        const navLinks = this._drawer.querySelectorAll('a');
        navLinks.forEach(link => {
            link.removeEventListener('click', this._handleNavigation);
        });
        
        document.body.style.overflow = '';
    }
};

export default DrawerInitiator;
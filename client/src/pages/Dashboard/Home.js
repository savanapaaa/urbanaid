import { Navbar } from '../../components/common/Navbar.js';
import { Footer } from '../../components/common/Footer.js';

const HomePage = {
    stats: {
        active: 342,
        completed: 127,
        pending: 58
    },
    
    testimonials: [
        { name: "John Carter", rating: 5, text: "Lorem ipsum dolor sit amet, consectetuer adipiscing elit." },
        { name: "John Carter", rating: 5, text: "The best Workflow Templates" },
        { name: "John Carter", rating: 5, text: "The best Workflow Templates" }
    ],

    init() {
        try {
            this.loadSvgSprites();
            this.render();
            this.attachEventListeners();
        } catch (error) {
            console.error('Error initializing home page:', error);
        }
    },

    loadSvgSprites() {
        const svgUrl = '/images/decorative-elements.svg';
        fetch(svgUrl)
            .then(response => response.text())
            .then(svgContent => {
                const div = document.createElement('div');
                div.style.display = 'none';
                div.innerHTML = svgContent;
                document.body.appendChild(div);
            })
            .catch(error => console.error('Error loading SVG sprites:', error));
    },

    render() {
        const content = `
            ${Navbar()}
            <main class="min-h-screen">
                ${this.createHeroSection()}
                ${this.createIntroSection()}
                ${this.createInfrastructureSection()}
                ${this.createStatsSection()}
                ${this.createProcessSection()}
                ${this.createTestimonialsSection()}
            </main>
            ${Footer()}
        `;

        const appContainer = document.getElementById('app');
        if (appContainer) {
            appContainer.innerHTML = content;
        }
    },

    createHeroSection() {
        return `
            <section class="hero-section relative overflow-hidden">
                <div class="decorative-element bottom-[20%] -left-5 w-32 h-32 decoration-teal opacity-20">
                    <svg class="w-full h-full"><use href="#flower"/></svg>
                </div>
                <div class="hidden md:block decorative-element top-[30%] right-[10%] w-16 h-16 decoration-teal rotate-45 animate-float">
                    <svg class="w-full h-full"><use href="#dots"/></svg>
                </div>

                <div class="container mx-auto px-4">
                    <div class="flex flex-col md:flex-row md:items-center md:justify-between">
                        <div class="w-full md:w-1/2 md:order-2">
                            <div class="relative">
                                <img src="/images/hero-section.png" alt="Urban Infrastructure Hero" class="hero-image">
                            </div>
                        </div>
                        <div class="w-full md:w-1/2 text-center md:text-left md:order-1">
                            <h1 class="text-4xl md:text-5xl font-bold mb-6">
                                Welcome to <span class="text-teal-600">UrbanAid</span>
                            </h1>
                            <p class="text-lg mb-8">
                                Dengan UrbanAid, Anda memiliki kekuatan untuk melaporkan kerusakan infrastruktur secara langsung, dan membantu menciptakan lingkungan yang lebih aman dan nyaman bagi semua orang.
                            </p>
                            <div class="flex flex-row justify-center md:justify-start space-x-4">
                                <button class="gradient-border-button px-6 py-2">
                                    Masuk
                                </button>
                                <button class="gradient-button text-white px-6 py-2">
                                    Daftar
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        `;
    },

    createIntroSection() {
        return `
            <section class="bg-white py-16 md:py-20 relative overflow-hidden">
                <div class="decorative-element top-20 -right-5 w-24 h-24 decoration-teal rotate-12 animate-float">
                    <svg class="w-full h-full"><use href="#curved-line"/></svg>
                </div>
                <div class="hidden md:block decorative-element bottom-[30%] -left-15 w-24 h-24 decoration-teal opacity-20 animate-pulse">
                    <svg class="w-full h-full"><use href="#sparkle"/></svg>
                </div>

                <div class="container mx-auto px-4 relative z-10">
                    <div class="max-w-6xl mx-auto">
                        <h2 class="section-title">
                            Pelaporan Infrastruktur
                        </h2>
                        <p class="text-lg text-center leading-relaxed">
                            UrbanAid merupakan solusi inovatif untuk mengatasi fragmentasi pengelolaan pengaduan pelayanan publik di Indonesia. 
                            Saat ini, sistem pengaduan di berbagai organisasi pemerintahan masih terpisah-pisah, 
                            tidak terkoordinasi dengan baik, dan berpotensi menimbulkan duplikasi atau terabaikannya laporan masyarakat. 
                            Platform ini bertujuan menciptakan saluran pengaduan nasional terpadu yang memungkinkan warga melaporkan kerusakan infrastruktur secara langsung, 
                            efisien, dan transparan, guna mewujudkan tata kelola pemerintahan yang lebih baik dan responsif terhadap kebutuhan masyarakat.
                        </p>
                    </div>
                </div>
            </section>
        `;
    },

    createInfrastructureSection() {
        return `
            <section class="py-16 md:py-20 relative overflow-hidden">
                <div class="decorative-element bottom-[10%] right-[5%] w-24 h-24 decoration-teal animate-float">
                    <svg class="w-full h-full"><use href="#sparkle"/></svg>
                </div>
                <div class="hidden md:block decorative-element top-[30%] left-[10%] w-20 h-20 decoration-teal rotate-45">
                    <svg class="w-full h-full"><use href="#dots"/></svg>
                </div>

                <div class="container mx-auto px-4 relative z-10">
                    <div class="infrastructure-card">
                        <h2 class="text-3xl md:text-4xl font-bold mb-6 text-center">
                            Infrastruktur: Pondasi Kehidupan Modern
                        </h2>
                        <div class="mb-6">
                            <img src="/images/infra.jpeg" 
                                alt="Infrastruktur Modern"
                                class="w-full max-w-2xl mx-auto rounded-lg shadow-md">
                        </div>
                        <div class="space-y-4 mb-8">
                            <p class="text-lg text-center">
                                Infrastruktur yang berkualitas adalah kunci pembangunan berkelanjutan, meningkatkan kualitas hidup, dan mendorong pertumbuhan ekonomi masyarakat. 
                                Dengan adanya infrastruktur yang baik, mobilitas masyarakat menjadi lebih mudah, kegiatan ekonomi berjalan lancar, dan pelayanan publik dapat diberikan secara optimal.
                            </p>
                        </div>
                        <div class="text-center">
                            <button 
                                class="gradient-button text-white px-6 py-2" 
                                onclick="window.location.href='#/artikel';">
                                Pelajari Selengkapnya
                            </button>
                        </div>
                    </div>
                </div>
            </section>
        `;
    },

    createStatsSection() {
        return `
            <section class="stats-section py-16 md:py-20 relative overflow-hidden">
                <div class="hidden md:block decorative-element -top-19 right-[5%] w-32 h-32 decoration-white opacity-20 animate-float">
                    <svg class="w-full h-full"><use href="#dots"/></svg>
                </div>
                <div class="decorative-element bottom-[10%] -left-5 w-28 h-28 decoration-white animate-float">
                    <svg class="w-full h-full"><use href="#curved-line"/></svg>
                </div>
                <div class="decorative-element bottom-[30%] left-[10%] w-16 h-16 decoration-white rotate-45">
                    <svg class="w-full h-full"><use href="#sparkle"/></svg>
                </div>

                <div class="container mx-auto px-4 relative z-10">
                    <h2 class="section-title text-white mb-12">
                        Jumlah Laporan
                    </h2>
                    <div class="stats-grid">
                        <div class="stats-card text-center">
                            <div class="text-3xl md:text-4xl font-bold text-teal-800 mb-4">
                                ${this.stats.active}
                            </div>
                            <div class="text-lg font-semibold text-teal-800 mb-2">
                                Laporan Aktif
                            </div>
                            <p class="text-gray-600">
                                Laporan dalam proses penanganan
                            </p>
                        </div>

                        <div class="stats-card text-center">
                            <div class="text-3xl md:text-4xl font-bold text-teal-800 mb-4">
                                ${this.stats.completed}
                            </div>
                            <div class="text-lg font-semibold text-teal-800 mb-2">
                                Laporan Selesai
                            </div>
                            <p class="text-gray-600">
                                Laporan telah ditindaklanjuti
                            </p>
                        </div>

                        <div class="stats-card text-center">
                            <div class="text-3xl md:text-4xl font-bold text-teal-800 mb-4">
                                ${this.stats.pending}
                            </div>
                            <div class="text-lg font-semibold text-teal-800 mb-2">
                                Laporan Pending
                            </div>
                            <p class="text-gray-600">
                                Laporan menunggu verifikasi
                            </p>
                        </div>
                    </div>
                </div>
            </section>
        `;
    },

    createProcessSection() {
        return `
            <section class="py-16 md:py-20 relative overflow-hidden">
                <div class="decorative-element top-10 -right-5 w-28 h-28 decoration-teal rotate-45 opacity-20">
                    <svg class="w-full h-full"><use href="#sparkle"/></svg>
                </div>
                <div class="decorative-element bottom-[20%] -left-10 w-32 h-32 decoration-teal opacity-15">
                    <svg class="w-full h-full"><use href="#flower"/></svg>
                </div>
                <div class="container mx-auto px-4 relative z-10">
                    <h2 class="section-title">
                        Alur Pelaporan
                    </h2>
    
                    <!-- Mobile Process Steps -->
                    <div class="block md:hidden process-steps-mobile">
                        <div class="flex flex-col items-center">
                            <span class="material-icons-round process-icon mb-4">edit_note</span>
                            <h3 class="text-xl font-bold mb-3">Tulis Laporan</h3>
                            <p class="text-lg text-gray-600 text-center px-4 mb-4">
                                Laporkan keluhan atau aspirasi anda dengan jelas dan lengkap
                            </p>
                            <div class="process-vertical-line"></div>
                        </div>
                        
                        <div class="flex flex-col items-center">
                            <span class="material-icons-round process-icon mb-4">track_changes</span>
                            <h3 class="text-xl font-bold mb-3">Proses Tindak Lanjut</h3>
                            <p class="text-lg text-gray-600 text-center px-4 mb-4">
                                Kami menindaklanjuti dan membalas laporan Anda
                            </p>
                            <div class="process-vertical-line"></div>
                        </div>
    
                        <div class="flex flex-col items-center">
                            <span class="material-icons-round process-icon mb-4">task_alt</span>
                            <h3 class="text-xl font-bold mb-3">Selesai</h3>
                            <p class="text-lg text-gray-600 text-center px-4 mb-4">
                                Laporan ditindaklanjuti
                            </p>
                            <div class="process-vertical-line"></div>
                        </div>
    
                        <div class="flex flex-col items-center">
                            <span class="material-icons-round process-icon mb-4">rate_review</span>
                            <h3 class="text-xl font-bold mb-3">Beri Tanggapan</h3>
                            <p class="text-lg text-gray-600 text-center px-4 mb-4">
                                Anda dapat menanggapi hasil laporan
                            </p>
                        </div>
                    </div>
    
                    <!-- Desktop Process Steps -->
                    <div class="process-steps-desktop hidden md:block max-w-4xl mx-auto">
                        <div class="grid grid-cols-4 gap-8 text-center relative">
                            <div class="absolute top-12 left-0 right-0 h-0.5 gradient-background -z-0"></div>
                            
                            <div class="process-step-container bg-white">
                                <span class="material-icons-round process-icon mb-4">edit_note</span>
                                <h3 class="text-xl font-bold mb-3">Tulis Laporan</h3>
                                <p class="text-lg text-gray-600">
                                    Laporkan keluhan atau aspirasi anda dengan jelas dan lengkap
                                </p>
                            </div>
    
                            <div class="process-step-container bg-white">
                                <span class="material-icons-round process-icon mb-4">track_changes</span>
                                <h3 class="text-xl font-bold mb-3">Proses Tindak Lanjut</h3>
                                <p class="text-lg text-gray-600">
                                    Kami menindaklanjuti dan membalas laporan Anda
                                </p>
                            </div>
    
                            <div class="process-step-container bg-white">
                                <span class="material-icons-round process-icon mb-4">task_alt</span>
                                <h3 class="text-xl font-bold mb-3">Selesai</h3>
                                <p class="text-lg text-gray-600">
                                    Laporan ditindaklanjuti
                                </p>
                            </div>
    
                            <div class="process-step-container bg-white">
                                <span class="material-icons-round process-icon mb-4">rate_review</span>
                                <h3 class="text-xl font-bold mb-3">Beri Tanggapan</h3>
                                <p class="text-lg text-gray-600">
                                    Anda dapat menanggapi hasil laporan
                                </p>
                            </div>
                        </div>
                    </div>
    
                    <div class="text-center mt-12">
                        <button id="reportButton" class="gradient-button text-white px-6 py-2">
                            Lapor Sekarang
                        </button>
                    </div>
                </div>
            </section>
        `;
    },

    createTestimonialsSection() {
        const testimonialCards = this.testimonials
        .map(testimonial => `
            <div class="testimonial-card">
                <p class="testimonial-text mb-6">${testimonial.text}</p>
                <div class="flex items-center">
                    <div class="w-10 h-10 bg-gray-200 rounded-full mr-4"></div>
                    <div>
                        <h4 class="testimonial-name">${testimonial.name}</h4>
                        <div class="flex text-yellow-400 text-sm">
                            ${'★'.repeat(testimonial.rating)}
                        </div>
                    </div>
                </div>
            </div>
        `)
        .join('');

        return `
            <section class="bg-gray-50 py-16 md:py-20 relative overflow-hidden">
                <div class="hidden md:block decorative-element top-10 left-10 w-32 h-32 decoration-teal animate-float">
                    <svg class="w-full h-full"><use href="#dots"/></svg>
                </div>
                <div class="decorative-element bottom-20 right-10 w-24 h-24 decoration-teal rotate-12">
                    <svg class="w-full h-full"><use href="#curved-line"/></svg>
                </div>

                <div class="container mx-auto px-4 relative z-10">
                    <h2 class="section-title">
                        Apa Kata Mereka
                    </h2>
                    <div class="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
                        ${testimonialCards}
                    </div>
                </div>
            </section>
        `;
    },

    attachEventListeners() {
        const reportButton = document.getElementById('reportButton');
        if (reportButton) {
            reportButton.addEventListener('click', () => {
                window.location.href = '#/pelaporan';
            });
        }
    },

    cleanup() {
        const reportButton = document.getElementById('reportButton');
        if (reportButton) {
            reportButton.removeEventListener('click', () => {});
        }
    }
};

export default HomePage;
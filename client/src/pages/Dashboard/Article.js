import { Navbar } from '../../components/common/Navbar.js';
import { Footer } from '../../components/common/Footer.js';

export class ArticlePage {
    constructor() {
        this.article = {
            id: 1,
            title: 'Infrastruktur: Pondasi Kehidupan Modern',
            excerpt: 'Infrastruktur yang berkualitas adalah kunci pembangunan berkelanjutan, meningkatkan kualitas hidup, dan mendorong pertumbuhan ekonomi masyarakat.',
            image: '/images/infraTikel.png',
            category: 'Infrastruktur',
            content: {
                principles: [
                    {
                        title: 'Berkelanjutan (Sustainability)',
                        description: 'Menekankan pentingnya memperhatikan dampak lingkungan melalui penggunaan teknologi ramah lingkungan, desain efisien, dan upaya meminimalkan jejak karbon.'
                    },
                    {
                        title: 'Ketahanan (Resilience)',
                        description: 'Infrastruktur mampu menghadapi berbagai risiko dengan desain fleksibel, sistem pemulihan cepat, dan antisipasi terhadap perubahan.'
                    },
                    {
                        title: 'Aksesibilitas',
                        description: 'Pentingnya infrastruktur yang mudah diakses semua kalangan, inklusif bagi penyandang disabilitas, dan memiliki konektivitas yang baik.'
                    },
                    {
                        title: 'Efisiensi Biaya',
                        description: 'Fokus pada perhitungan biaya total kepemilikan, memaksimalkan value for money, dan perencanaan perawatan berkala.'
                    },
                    {
                        title: 'Inovasi Teknologi',
                        description: 'Mendorong pemanfaatan teknologi mutakhir seperti digitalisasi, sistem cerdas, serta penerapan AI dan IoT.'
                    },
                    {
                        title: 'Keberlanjutan Sosial',
                        description: 'Memastikan infrastruktur tidak sekadar bangunan fisik, melainkan juga memperhatikan dampak sosial, melibatkan partisipasi masyarakat, menciptakan lapangan kerja, dan mendukung pengembangan ekonomi.'
                    }
                ],
                categories: [
                    {
                        title: 'Infrastruktur Perkotaan',
                        description: 'Jalan, jembatan, gedung pemerintahan, fasilitas umum yang mendukung aktivitas perkotaan.'
                    },
                    {
                        title: 'Infrastruktur Lingkungan',
                        description: 'Sistem drainase, pengolahan air bersih, pengelolaan sampah, dan infrastruktur ramah lingkungan.'
                    },
                    {
                        title: 'Infrastruktur Sosial',
                        description: 'Fasilitas kesehatan, pendidikan, ruang publik dan sarana sosial kemasyarakatan.'
                    }
                ],
                participation: {
                    title: 'Partisipasi Masyarakat dalam Infrastruktur',
                    description: 'Masyarakat memiliki peran penting dalam pembangunan dan pemeliharaan infrastruktur.',
                    sections: [
                        {
                            title: 'Edukasi dan Kesadaran',
                            items: [
                                'Mengikuti sosialisasi',
                                'Berbagi pengetahuan',
                                'Menjaga infrastruktur umum'
                            ]
                        },
                        {
                            title: 'Pelaporan dan Pengawasan',
                            items: [
                                'Melaporkan kerusakan infrastruktur',
                                'Memberikan usulan perbaikan',
                                'Mengawasi progres pembangunan'
                            ]
                        }
                    ]
                }
            }
        };
    }

    createHeroSection() {
        return `
            <section class="relative py-12 bg-white">
                <div class="container mx-auto px-4">
                    <div class="flex flex-col md:flex-row gap-8">
                        <div class="w-full md:w-1/2">
                            <img src="${this.article.image}" 
                                 alt="${this.article.title}"
                                 class="w-full h-[300px] object-cover rounded-lg shadow-lg">
                        </div>
                        <div class="w-full md:w-1/2">
                            <h1 class="text-3xl md:text-4xl font-bold mb-4">
                                ${this.article.title}
                            </h1>
                            <p class="text-gray-600 text-lg mb-6">
                                ${this.article.excerpt}
                            </p>
                        </div>
                    </div>
                </div>
            </section>
        `;
    }

    createPrinciplesSection() {
        const principleCards = this.article.content.principles.map((principle, index) => `
            <div class="principle-card">
                <h3 class="text-xl font-semibold mb-3">
                    ${index + 1}. ${principle.title}
                </h3>
                <p class="text-gray-600">
                    ${principle.description}
                </p>
            </div>
        `).join('');

        return `
            <section class="py-16 bg-white">
                <div class="container mx-auto px-4">
                    <h2 class="text-3xl font-bold text-center mb-12">
                        6 Prinsip Infrastruktur Berkualitas
                    </h2>
                    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        ${principleCards}
                    </div>
                </div>
            </section>
        `;
    }

    createCategoriesSection() {
        const categoryCards = this.article.content.categories.map(category => `
            <div class="category-card">
                <h3 class="text-xl font-semibold mb-4">
                    ${category.title}
                </h3>
                <p class="text-gray-100">
                    ${category.description}
                </p>
            </div>
        `).join('');

        return `
            <section class="category-section py-16">
                <div class="container mx-auto px-4">
                    <h2 class="text-3xl font-bold text-center text-white mb-12">
                        Kategori Infrastruktur Utama
                    </h2>
                    <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
                        ${categoryCards}
                    </div>
                </div>
            </section>
        `;
    }

    createParticipationSection() {
        const { sections } = this.article.content.participation;
        const sectionCards = sections.map(section => {
            const items = section.items.map(item => `
                <div class="participation-item">
                    <span class="check-icon">✓</span>
                    <span>${item}</span>
                </div>
            `).join('');

            return `
                <div class="participation-card bg-gray-50 p-6 rounded-lg">
                    <h3 class="text-xl font-semibold mb-4">${section.title}</h3>
                    <div class="space-y-3">
                        ${items}
                    </div>
                </div>
            `;
        }).join('');

        return `
            <section class="py-16 bg-white">
                <div class="container mx-auto px-4">
                    <h2 class="text-3xl font-bold text-center mb-4">
                        ${this.article.content.participation.title}
                    </h2>
                    <p class="text-center text-gray-600 mb-12">
                        ${this.article.content.participation.description}
                    </p>
                    <div class="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
                        ${sectionCards}
                    </div>
                    <div class="text-center mt-12">
                        <a href="#/pelaporan" class="cta-button">
                            Lapor Sekarang
                        </a>
                    </div>
                </div>
            </section>
        `;
    }

    render() {
        const content = `
            ${Navbar()}
            <main class="min-h-screen">
                ${this.createHeroSection()}
                ${this.createPrinciplesSection()}
                ${this.createCategoriesSection()}
                ${this.createParticipationSection()}
            </main>
            ${Footer()}
        `;

        const appContainer = document.getElementById('app');
        if (appContainer) {
            appContainer.innerHTML = content;
        }
    }

    scrollToTop() {
        window.scrollTo({
            top: 0,
            behavior: 'instant'
        });
    }

    init() {
        try {
            this.render();
            this.scrollToTop();
        } catch (error) {
            console.error('Error initializing article page:', error);
        }
    }
}
import UrlParser from '../../utils/url-parser.js';

const DetailLaporan = {
    data: null,

    async getData(id) {
        try {
            if (!window.riwayatData) {
                const { default: RiwayatLaporan } = await import('../Reports/Riwayat.js');
                
                if (!RiwayatLaporan || !RiwayatLaporan.data) {
                    throw new Error('Data laporan tidak tersedia');
                }
                window.riwayatData = RiwayatLaporan.data;
            }

            const report = window.riwayatData.find(r => r.id.toLowerCase() === id.toLowerCase());
            if (!report) {
                throw new Error('Laporan tidak ditemukan');
            }
            this.data = report;
            return report;
        } catch (error) {
            console.error('Error getting report data:', error);
            throw error;
        }
    },

    formatDate(dateString) {
        try {
            const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
            return new Date(dateString).toLocaleDateString('id-ID', options);
        } catch (error) {
            console.error('Error formatting date:', error);
            return dateString;
        }
    },

    getStatusIcon(status) {
        const icons = {
            'selesai': 'check_circle',
            'diproses': 'pending',
            'ditolak': 'cancel',
            'default': 'help'
        };
        return icons[status] || icons.default;
    },

    getStatusClass(status) {
        const statusClasses = {
            'selesai': 'selesai',
            'diproses': 'diproses',
            'ditolak': 'ditolak'
        };
        return statusClasses[status] || '';
    },

    getImagePath(imagePath) {
        if (!imagePath) return '/images/placeholder.jpg';
        const cleanPath = imagePath.startsWith('/') ? imagePath.slice(1) : imagePath;
        return cleanPath;
    },

    render() {
        if (!this.data) {
            return `
                <div class="flex items-center justify-center min-h-screen">
                    <div class="detail-loading">
                        <div class="detail-loading-spinner"></div>
                        <p class="mt-4 text-gray-600">Memuat detail laporan...</p>
                    </div>
                </div>
            `;
        }
    
        return `
            <div class="detail-container">
                <div class="detail-header">
                    <h2 class="detail-title">Detail Laporan</h2>
                </div>
    
                <div class="detail-content">
                    <!-- Hero Image Section -->
                    <div class="detail-hero">
                        <button 
                            class="back-button"
                            onclick="window.location.hash = '#/pelaporan/riwayat'"
                        >
                            <span class="material-icons-round">arrow_back</span>
                        </button>
                        <img 
                            src="${this.getImagePath(this.data.buktiLampiran)}"
                            alt="Bukti lampiran"
                            onerror="this.src='/images/placeholder.jpg'"
                            class="detail-hero-image"
                        >
                        <div class="detail-hero-caption">
                            <span class="material-icons-round">photo</span>
                            Bukti Lampiran
                        </div>
                    </div>
    
                    <div class="detail-section">
                        <div class="detail-row">
                            <strong>ID Laporan</strong>
                            <div class="detail-info">${this.data.id}</div>
                        </div>
    
                        <div class="detail-row">
                            <strong>Judul Laporan</strong>
                            <div class="detail-info">${this.data.judul}</div>
                        </div>
    
                        <div class="detail-row">
                            <strong>Jenis Infrastruktur</strong>
                            <div class="detail-info">
                                <span class="px-3 py-1 bg-teal-100 text-teal-800 rounded-full">
                                    ${this.data.jenisInfrastruktur}
                                </span>
                            </div>
                        </div>
    
                        <div class="detail-row">
                            <strong>Status</strong>
                            <div class="detail-status ${this.getStatusClass(this.data.status)}">
                                <span class="material-icons-round">
                                    ${this.getStatusIcon(this.data.status)}
                                </span>
                                <span>${this.data.status.charAt(0).toUpperCase() + this.data.status.slice(1)}</span>
                            </div>
                        </div>
    
                        <div class="detail-row">
                            <strong>Tanggal Pengajuan</strong>
                            <div class="detail-info">${this.formatDate(this.data.tanggalKejadian)}</div>
                        </div>
    
                        <div class="detail-row">
                            <strong>Tanggal Penyelesaian</strong>
                            <div class="detail-info">
                                ${this.data.tanggalSelesai ? this.formatDate(this.data.tanggalSelesai) : '-'}
                            </div>
                        </div>
    
                        <div class="detail-row">
                            <strong>Alamat</strong>
                            <div class="detail-info">${this.data.alamat}</div>
                        </div>
    
                        <div class="detail-row">
                            <strong>Deskripsi</strong>
                            <div class="detail-info whitespace-pre-line">${this.data.deskripsi}</div>
                        </div>
    
                        <div class="detail-row">
                            <strong>Keterangan</strong>
                            <div class="detail-info">${this.data.keterangan || '-'}</div>
                        </div>
                    </div>
                </div>
            </div>
        `;
    },

    async init() {
        try {
            window.scrollTo(0, 0);
            
            const id = UrlParser.getDetailId();
            if (!id) {
                throw new Error('ID Laporan tidak ditemukan');
            }

            await this.getData(id);
            
            const mainContainer = document.querySelector('#app');
            if (mainContainer) {
                mainContainer.innerHTML = `
                    <div class="pelaporan-container">
                        ${this.render()}
                    </div>
                `;
            } else {
                throw new Error('Container #app tidak ditemukan');
            }
        } catch (error) {
            console.error('Error initializing detail page:', error);
            const errorMessage = error.message || 'Terjadi kesalahan saat memuat detail laporan';
            
            const mainContainer = document.querySelector('#app');
            if (mainContainer) {
                mainContainer.innerHTML = `
                    <div class="flex flex-col items-center justify-center min-h-screen">
                        <div class="text-center p-4">
                            <span class="material-icons-round text-red-500 text-4xl mb-4">error</span>
                            <h2 class="text-xl font-bold text-gray-800 mb-2">Error!</h2>
                            <p class="text-gray-600 mb-4">${errorMessage}</p>
                            <button 
                                onclick="window.location.hash = '#/pelaporan/riwayat'"
                                class="px-4 py-2 bg-teal-600 text-white rounded hover:bg-teal-700 transition-colors"
                            >
                                Kembali ke Riwayat
                            </button>
                        </div>
                    </div>
                `;
            }
        }
    },

    cleanup() {
        this.data = null;
    }
};

export default DetailLaporan;
const riwayatData = [
    {
        id: "REP-2024-001",
        judul: "Perbaikan Jalan Rusak",
        jenisInfrastruktur: "Infrastruktur Perkotaan",
        deskripsi: "Jalan berlubang dengan diameter sekitar 1 meter dan kedalaman 30 cm, membahayakan pengendara terutama di malam hari",
        tanggalKejadian: "2024-01-12",
        tanggalSelesai: "2024-01-15",
        alamat: "Jl. Merdeka No. 123",
        status: "selesai",
        keterangan: "Perbaikan jalan telah selesai dilakukan. Terima kasih atas laporannya.",
        buktiLampiran: '/images/infra.jpeg'
    },
    {
        id: "REP-2024-002",
        judul: "Perbaikan Drainase Tersumbat",
        jenisInfrastruktur: "Infrastruktur Lingkungan",
        deskripsi: "Saluran drainase tersumbat menyebabkan genangan air setinggi 30 cm saat hujan",
        tanggalKejadian: "2024-01-15",
        tanggalSelesai: "2024-01-16",
        alamat: "Jl. Damai No. 45",
        status: "ditolak",
        keterangan: "Laporan ditolak karena lokasi tidak termasuk dalam wilayah kerja kami.",
        buktiLampiran: "drainase.jpg"
    },
    {
        id: "REP-2024-003",
        judul: "Renovasi Taman Kota",
        jenisInfrastruktur: "Infrastruktur Lingkungan",
        deskripsi: "Fasilitas taman rusak termasuk bangku taman, lampu taman, dan area bermain anak",
        tanggalKejadian: "2024-01-18",
        tanggalSelesai: "2024-01-22",
        alamat: "Taman Kota Indah",
        status: "selesai",
        keterangan: "Renovasi taman telah selesai dilaksanakan sesuai dengan perencanaan.",
        buktiLampiran: "taman.jpg"
    }
];

const RiwayatLaporan = {
    data: riwayatData,

    formatDate(dateString) {
        const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
        return new Date(dateString).toLocaleDateString('id-ID', options);
    },

    getStatusIcon(status) {
        switch(status) {
            case 'selesai':
                return 'check_circle';
            case 'ditolak':
                return 'cancel';
            default:
                return 'info';
        }
    },

    getStatusClass(status) {
        switch(status) {
            case 'selesai':
                return 'status-process'; 
            case 'ditolak':
                return 'status-reject';
            default:
                return '';
        }
    },

    createReportCard(report) {
        const statusIcon = this.getStatusIcon(report.status);
        const statusClass = this.getStatusClass(report.status);
        
        return `
            <div class="laporan-card ${statusClass}" data-status="${report.status}">
                <div class="status-icon">
                    <span class="material-icons-round">${statusIcon}</span>
                    <span class="status-text">${report.status.charAt(0).toUpperCase() + report.status.slice(1)}</span>
                </div>
                
                <div class="card-content">
                    <div class="laporan-info">
                        <div class="laporan-title">
                            <h3>${report.judul}</h3>
                            <div class="infra-type">
                                <span class="material-icons-round">account_balance</span>
                                ${report.jenisInfrastruktur}
                            </div>
                            <div class="date-info">
                                <span class="material-icons-round">event</span>
                                ${this.formatDate(report.tanggalKejadian)}
                            </div>
                            <p class="laporan-desc">${report.deskripsi}</p>
                        </div>
                    </div>
    
                    <div class="actions-wrapper">
                        <button class="action-btn view-detail-btn" onclick="RiwayatLaporan.showDetail('${report.id}')">
                            <span class="material-icons-round">visibility</span>
                            Detail
                        </button>
                    </div>
                </div>
            </div>
        `;
    },

    render() {
        const completedReports = this.data.filter(report => report.status === 'selesai');
        const rejectedReports = this.data.filter(report => report.status === 'ditolak');

        return `
            <div class="laporan-aktif-container">
                <div class="main-content">
                    <h2 class="section-title">
                        <span class="material-icons-round">dashboard</span>
                        Riwayat Laporan
                    </h2>
                    
                    <div class="status-filter">
                        <button class="filter-btn active" data-status="all" onclick="RiwayatLaporan.filterReports('all')">
                            <span class="material-icons-round">all_inbox</span>
                            Semua (${this.data.length})
                        </button>
                        <button class="filter-btn" data-status="selesai" onclick="RiwayatLaporan.filterReports('selesai')">
                            <span class="material-icons-round">check_circle</span>
                            Selesai (${completedReports.length})
                        </button>
                        <button class="filter-btn" data-status="ditolak" onclick="RiwayatLaporan.filterReports('ditolak')">
                            <span class="material-icons-round">cancel</span>
                            Ditolak (${rejectedReports.length})
                        </button>
                    </div>

                    <div class="laporan-list">
                        ${this.data.map(report => this.createReportCard(report)).join('')}
                    </div>
                </div>
            </div>
        `;
    },

    showDetail(id) {
        window.location.hash = `#/pelaporan/riwayat/${id}`;
    },

    filterReports(status) {
        document.querySelectorAll('.filter-btn').forEach(btn => {
            if (btn.dataset.status === status) {
                btn.classList.add('active');
            } else {
                btn.classList.remove('active');
            }
        });

        const cards = document.querySelectorAll('.laporan-card');
        cards.forEach(card => {
            if (status === 'all' || card.dataset.status === status) {
                card.style.display = 'flex';
            } else {
                card.style.display = 'none';
            }
        });
    },

    init() {
        const mainContent = document.querySelector('.content-wrapper');
        if (mainContent) {
            mainContent.innerHTML = this.render();
        }
    }
};

window.RiwayatLaporan = RiwayatLaporan;
window.riwayatData = riwayatData;

export default RiwayatLaporan;

import { Footer } from '../../components/common/Footer.js';

const RiwayatAdminPage = {
    data: [],
    
    init() {
        this.cacheDOM();
        this.fetchReportHistory();
        this.bindEvents();
    },

    cacheDOM() {
        this.filterButtons = document.querySelectorAll('.filter-btn');
        this.reportListContainer = document.querySelector('.laporan-list');
    },

    bindEvents() {
        this.filterButtons.forEach(button => {
            button.addEventListener('click', (e) => {
                const status = e.currentTarget.dataset.status;
                this.filterReports(status);
            });
        });
    },

    async fetchReportHistory() {
        try {
            const response = await fetch('/api/reports/history');
            this.data = await response.json();
            this.renderReports(this.data);
        } catch (error) {
            console.error('Error fetching report history:', error);
            this.showErrorNotification('Gagal memuat riwayat laporan');
        }
    },

    renderReports(reports) {
        this.reportListContainer.innerHTML = reports.map(report => this.createReportCard(report)).join('');
    },

    createReportCard(report) {
        return `
            <div class="laporan-card ${this.getStatusClass(report.status)}" data-status="${report.status}">
                <div class="card-header">
                    <div class="report-id">${report.id}</div>
                    <div class="report-status ${report.status}">
                        ${this.formatStatus(report.status)}
                    </div>
                </div>
                <div class="card-body">
                    <h3>${report.judul}</h3>
                    <div class="report-details">
                        <div class="detail-item">
                            <span class="label">Jenis Infrastruktur:</span>
                            ${report.jenisInfrastruktur}
                        </div>
                        <div class="detail-item">
                            <span class="label">Tanggal Kejadian:</span>
                            ${this.formatDate(report.tanggalKejadian)}
                        </div>
                        <div class="detail-item">
                            <span class="label">Alamat:</span>
                            ${report.alamat}
                        </div>
                    </div>
                    <p class="report-description">${report.deskripsi}</p>
                </div>
                <div class="card-footer">
                    <button class="btn-detail" onclick="RiwayatAdminPage.showReportDetail('${report.id}')">
                        Lihat Detail
                    </button>
                    ${this.renderAttachmentButton(report.buktiLampiran)}
                </div>
            </div>
        `;
    },

    renderAttachmentButton(attachment) {
        return attachment ? `
            <button class="btn-attachment" onclick="RiwayatAdminPage.viewAttachment('${attachment}')">
                Lihat Lampiran
            </button>
        ` : '';
    },

    formatDate(dateString) {
        return new Date(dateString).toLocaleDateString('id-ID', {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    },

    formatStatus(status) {
        switch(status) {
            case 'selesai':
                return 'Selesai';
            case 'ditolak':
                return 'Ditolak';
            default:
                return 'Proses';
        }
    },

    getStatusClass(status) {
        switch(status) {
            case 'selesai':
                return 'status-completed';
            case 'ditolak':
                return 'status-rejected';
            default:
                return 'status-pending';
        }
    },

    filterReports(status) {
        // Update filter button active state
        this.filterButtons.forEach(button => {
            button.classList.toggle('active', button.dataset.status === status);
        });

        // Filter reports
        const reportCards = this.reportListContainer.querySelectorAll('.laporan-card');
        reportCards.forEach(card => {
            const show = status === 'all' || card.dataset.status === status;
            card.style.display = show ? 'block' : 'none';
        });

        // Update count for filter buttons
        this.updateFilterCounts();
    },

    updateFilterCounts() {
        const statusCounts = {
            all: this.data.length,
            selesai: this.data.filter(r => r.status === 'selesai').length,
            ditolak: this.data.filter(r => r.status === 'ditolak').length
        };

        this.filterButtons.forEach(button => {
            const status = button.dataset.status;
            const countElement = button.querySelector('.count');
            if (countElement) {
                countElement.textContent = statusCounts[status];
            }
        });
    },

    showReportDetail(reportId) {
        // Navigate to report detail page
        window.location.href = `/laporan/detail/${reportId}`;
    },

    viewAttachment(attachmentUrl) {
        // Open attachment in a modal or new tab
        window.open(attachmentUrl, '_blank');
    },

    showErrorNotification(message) {
        const notification = document.createElement('div');
        notification.className = 'error-notification';
        notification.textContent = message;
        document.body.appendChild(notification);
        
        setTimeout(() => {
            notification.remove();
        }, 3000);
    },

    render() {
        return `
            ${Navbar.render()}
            <div class="riwayat-admin-container">
                <h1>Riwayat Laporan</h1>
                
                <div class="filter-section">
                    <button class="filter-btn active" data-status="all">
                        Semua Laporan 
                        <span class="count">${this.data.length}</span>
                    </button>
                    <button class="filter-btn" data-status="selesai">
                        Selesai 
                        <span class="count">0</span>
                    </button>
                    <button class="filter-btn" data-status="ditolak">
                        Ditolak 
                        <span class="count">0</span>
                    </button>
                </div>

                <div class="laporan-list">
                    <!-- Reports will be dynamically inserted here -->
                </div>
            </div>
            ${Footer.render()}
        `;
    }
};

export default RiwayatAdminPage;
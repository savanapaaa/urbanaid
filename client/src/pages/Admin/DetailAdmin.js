
import { Footer } from '../../components/common/Footer.js';

const ReportDetailPage = {
    reportId: null,

    init(reportId) {
        this.reportId = reportId;
        this.cacheDOM();
        this.bindEvents();
        this.loadReportDetails();
    },

    cacheDOM() {
        this.detailContainer = document.querySelector('.report-detail-container');
        this.feedbackForm = document.getElementById('feedback-form');
        this.acceptBtn = document.getElementById('accept-btn');
        this.rejectBtn = document.getElementById('reject-btn');
        this.feedbackReasonInput = document.getElementById('feedback-reason');
    },

    bindEvents() {
        this.acceptBtn.addEventListener('click', this.acceptReport.bind(this));
        this.rejectBtn.addEventListener('click', this.rejectReport.bind(this));
    },

    async loadReportDetails() {
        try {
            const response = await fetch(`/api/reports/${this.reportId}`);
            const reportData = await response.json();
            this.renderReportDetails(reportData);
        } catch (error) {
            console.error('Error loading report details:', error);
        }
    },

    renderReportDetails(report) {
        this.detailContainer.innerHTML = `
            <div class="report-header">
                <h1>Detail Laporan #${report.id}</h1>
                <div class="report-status ${report.status ? report.status.toLowerCase() : 'pending'}">
                    ${report.status || 'Pending'}
                </div>
            </div>

            <div class="report-info-grid">
                <div class="info-item">
                    <label>Nama Pelapor</label>
                    <p>${report.reporterName}</p>
                </div>
                <div class="info-item">
                    <label>Jenis Infrastruktur</label>
                    <p>${report.type}</p>
                </div>
                <div class="info-item">
                    <label>Tanggal Laporan</label>
                    <p>${report.date}</p>
                </div>
                <div class="info-item">
                    <label>Alamat</label>
                    <p>${report.address}</p>
                </div>
            </div>

            <div class="report-description">
                <h2>Deskripsi Laporan</h2>
                <p>${report.description}</p>
            </div>

            <div class="report-attachments">
                <h2>Lampiran</h2>
                <div class="attachment-list">
                    ${this.renderAttachments(report.attachments)}
                </div>
            </div>

            ${this.renderFeedbackSection(report)}
        `;
    },

    renderAttachments(attachments) {
        if (!attachments || attachments.length === 0) {
            return '<p>Tidak ada lampiran</p>';
        }
        return attachments.map(attachment => `
            <div class="attachment-item">
                <img src="${attachment.url}" alt="Lampiran">
                <a href="${attachment.url}" download>Download</a>
            </div>
        `).join('');
    },

    renderFeedbackSection(report) {
        if (report.status) return '';

        return `
            <div class="feedback-section">
                <h2>Tindakan Laporan</h2>
                <form id="feedback-form">
                    <div class="feedback-actions">
                        <button type="button" id="accept-btn" class="btn accept-btn">Terima Laporan</button>
                        <button type="button" id="reject-btn" class="btn reject-btn">Tolak Laporan</button>
                    </div>
                    <div class="feedback-reason">
                        <label for="feedback-reason">Alasan (Opsional)</label>
                        <textarea id="feedback-reason" placeholder="Berikan alasan penerimaan atau penolakan laporan"></textarea>
                    </div>
                </form>
            </div>
        `;
    },

    async acceptReport() {
        const reason = this.feedbackReasonInput.value.trim();
        try {
            const response = await fetch(`/api/reports/${this.reportId}/accept`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ 
                    status: 'ACCEPTED', 
                    feedbackReason: reason 
                })
            });

            if (response.ok) {
                this.showNotification('Laporan berhasil diterima', 'success');
                this.updateReportStatus('ACCEPTED', reason);
            }
        } catch (error) {
            console.error('Error accepting report:', error);
            this.showNotification('Gagal menerima laporan', 'error');
        }
    },

    async rejectReport() {
        const reason = this.feedbackReasonInput.value.trim();
        if (!reason) {
            this.showNotification('Harap berikan alasan penolakan', 'warning');
            return;
        }

        try {
            const response = await fetch(`/api/reports/${this.reportId}/reject`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ 
                    status: 'REJECTED', 
                    feedbackReason: reason 
                })
            });

            if (response.ok) {
                this.showNotification('Laporan berhasil ditolak', 'success');
                this.updateReportStatus('REJECTED', reason);
            }
        } catch (error) {
            console.error('Error rejecting report:', error);
            this.showNotification('Gagal menolak laporan', 'error');
        }
    },

    updateReportStatus(status, reason) {
        const statusElement = document.querySelector('.report-status');
        const feedbackSection = document.querySelector('.feedback-section');

        statusElement.textContent = status;
        statusElement.className = `report-status ${status.toLowerCase()}`;

        if (feedbackSection) {
            feedbackSection.innerHTML = `
                <h2>Feedback</h2>
                <p><strong>Status:</strong> ${status}</p>
                <p><strong>Alasan:</strong> ${reason || 'Tidak ada alasan tambahan'}</p>
            `;
        }
    },

    showNotification(message, type) {
        const notification = document.createElement('div');
        notification.className = `notification ${type}`;
        notification.textContent = message;
        document.body.appendChild(notification);

        setTimeout(() => {
            notification.remove();
        }, 3000);
    },

    render() {
        return `
            ${Navbar.render()}
            <div class="report-detail-container"></div>
            ${Footer.render()}
        `;
    }
};

export default ReportDetailPage;
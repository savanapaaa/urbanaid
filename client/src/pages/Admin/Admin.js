
import { Footer } from '../../components/common/Footer.js';
import '../../styles/admin.css';

const AdminPage = {
    init() {
        this.cacheDOM();
        this.bindEvents();
        this.loadReports();
    },

    cacheDOM() {
        this.pendingReportsTable = document.querySelector('#pending-reports tbody');
    },

    bindEvents() {
        this.processButtons.forEach(button => {
            button.addEventListener('click', this.processReport.bind(this));
        });

        this.rejectButtons.forEach(button => {
            button.addEventListener('click', this.rejectReport.bind(this));
        });
    },

    async loadReports() {
        try {
            const response = await fetch('/api/reports/pending');
            const reports = await response.json();
            this.renderPendingReports(reports);
        } catch (error) {
            console.error('Error loading pending reports:', error);
        }
    },

    renderPendingReports(reports) {
        this.pendingReportsTable.innerHTML = reports.map(report => `
            <tr data-report-id="${report.id}">
                <td>${report.id}</td>
                <td>${report.reporterName}</td>
                <td>${report.title}</td>
                <td>${report.description}</td>
                <td>${report.type}</td>
                <td>${report.date}</td>
                <td>${report.address}</td>
                <td>${report.attachment}</td>
                <td><span class="status pending">Pending</span></td>
            </tr>
        `).join('');

        this.bindEvents();
    },

    async processReport(event) {
        const reportId = event.target.dataset.id;
        try {
            const response = await fetch(`/api/reports/${reportId}/process`, {
                method: 'PUT'
            });
            if (response.ok) {
                this.removeReportFromTable(reportId);
                this.updateProcessedReportsSection(reportId);
            }
        } catch (error) {
            console.error('Error processing report:', error);
        }
    },

    async rejectReport(event) {
        const reportId = event.target.dataset.id;
        try {
            const response = await fetch(`/api/reports/${reportId}/reject`, {
                method: 'PUT'
            });
            if (response.ok) {
                this.removeReportFromTable(reportId);
                this.updateRejectedReportsSection(reportId);
            }
        } catch (error) {
            console.error('Error rejecting report:', error);
        }
    },

    removeReportFromTable(reportId) {
        const row = document.querySelector(`tr[data-report-id="${reportId}"]`);
        if (row) {
            row.remove();
        }
    },

    updateProcessedReportsSection(reportId) {\
        const processedReportsSection = document.getElementById('processed-reports');
    },

    updateRejectedReportsSection(reportId) {
        const rejectedReportsSection = document.getElementById('rejected-reports');
    },

    render() {
        return `
            ${Navbar.render()}
            <div class="dashboard-container">
                <!-- Main Content -->
                <main class="content">
                    <section id="pending-reports">
                        <h1>Pending Reports</h1>
                        <table>
                            <thead>
                                <tr>
                                    <th>ID Laporan</th>
                                    <th>Nama Pelapor</th>
                                    <th>Deskripsi</th>
                                    <th>Jenis Infrastruktur</th>
                                    <th>Tanggal</th>
                                    <th>Alamat</th>
                                    <th>Lampiran</th>
                                    <th>Status</th>
                                </tr>
                            </thead>
                            <tbody>
                                <!-- Laporan pending akan dirender di sini -->
                            </tbody>
                        </table>
                    </section>
                </main>
            </div>
            ${Footer.render()}
        `;
    }
};

export default AdminPage;
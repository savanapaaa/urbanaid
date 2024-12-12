import { Footer } from '../../components/common/Footer.js';
import '../../styles/admin.css';

const AdminPage = {
    init() {
        this.render();
        this.cacheDOM();
        this.bindEvents();
        this.loadReports();
    },

    cacheDOM() {
        this.pendingReportsTable = document.querySelector('#pending-reports tbody');
        this.processButtons = document.querySelectorAll('.process-btn');
        this.rejectButtons = document.querySelectorAll('.reject-btn');
    },

    bindEvents() {
        if (this.processButtons) {
            this.processButtons.forEach(button => {
                button.addEventListener('click', this.processReport.bind(this));
            });
        }

        if (this.rejectButtons) {
            this.rejectButtons.forEach(button => {
                button.addEventListener('click', this.rejectReport.bind(this));
            });
        }
    },

    async loadReports() {
        try {
            const response = await fetch('/api/reports/pending');
            const reports = await response.json();
            this.renderPendingReports(reports);
        } catch (error) {
            console.error('Error loading pending reports:', error);
            Swal.fire({
                title: 'Error',
                text: 'Gagal memuat data laporan',
                icon: 'error',
                confirmButtonText: 'OK'
            });
        }
    },

    renderPendingReports(reports) {
        if (!this.pendingReportsTable) return;

        this.pendingReportsTable.innerHTML = reports.length ? reports.map(report => `
            <tr data-report-id="${report.id}">
                <td class="px-4 py-2">${report.id}</td>
                <td class="px-4 py-2">${report.reporterName}</td>
                <td class="px-4 py-2">${report.title || '-'}</td>
                <td class="px-4 py-2">${report.description}</td>
                <td class="px-4 py-2">${report.type}</td>
                <td class="px-4 py-2">${report.date}</td>
                <td class="px-4 py-2">${report.address}</td>
                <td class="px-4 py-2">${
                    report.attachment ? 
                    `<a href="${report.attachment}" target="_blank" class="text-blue-600 hover:text-blue-800">Lihat</a>` : 
                    'Tidak ada'
                }</td>
                <td class="px-4 py-2">
                    <span class="status pending px-2 py-1 rounded-full text-white bg-yellow-500">Pending</span>
                </td>
                <td class="px-4 py-2">
                    <button class="process-btn bg-green-500 text-white px-3 py-1 rounded mr-2" data-id="${report.id}">
                        Proses
                    </button>
                    <button class="reject-btn bg-red-500 text-white px-3 py-1 rounded" data-id="${report.id}">
                        Tolak
                    </button>
                </td>
            </tr>
        `).join('') : `
            <tr>
                <td colspan="10" class="text-center py-4">Tidak ada laporan yang pending</td>
            </tr>
        `;

        // Rebind events setelah render
        this.cacheDOM();
        this.bindEvents();
    },

    async processReport(event) {
        const reportId = event.target.dataset.id;
        try {
            const result = await Swal.fire({
                title: 'Proses Laporan',
                text: 'Apakah Anda yakin akan memproses laporan ini?',
                icon: 'question',
                showCancelButton: true,
                confirmButtonText: 'Ya, Proses',
                cancelButtonText: 'Batal'
            });

            if (result.isConfirmed) {
                const response = await fetch(`/api/reports/${reportId}/process`, {
                    method: 'PUT'
                });
                
                if (response.ok) {
                    this.removeReportFromTable(reportId);
                    Swal.fire('Berhasil', 'Laporan telah diproses', 'success');
                }
            }
        } catch (error) {
            console.error('Error processing report:', error);
            Swal.fire('Error', 'Gagal memproses laporan', 'error');
        }
    },

    async rejectReport(event) {
        const reportId = event.target.dataset.id;
        try {
            const result = await Swal.fire({
                title: 'Tolak Laporan',
                text: 'Apakah Anda yakin akan menolak laporan ini?',
                input: 'text',
                inputPlaceholder: 'Masukkan alasan penolakan',
                icon: 'warning',
                showCancelButton: true,
                confirmButtonText: 'Ya, Tolak',
                cancelButtonText: 'Batal',
                inputValidator: (value) => {
                    if (!value) {
                        return 'Anda harus memasukkan alasan penolakan!';
                    }
                }
            });

            if (result.isConfirmed) {
                const response = await fetch(`/api/reports/${reportId}/reject`, {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ reason: result.value })
                });
                
                if (response.ok) {
                    this.removeReportFromTable(reportId);
                    Swal.fire('Berhasil', 'Laporan telah ditolak', 'success');
                }
            }
        } catch (error) {
            console.error('Error rejecting report:', error);
            Swal.fire('Error', 'Gagal menolak laporan', 'error');
        }
    },

    removeReportFromTable(reportId) {
        const row = document.querySelector(`tr[data-report-id="${reportId}"]`);
        if (row) {
            row.remove();
        }
    },

    render() {
        const app = document.getElementById('app');
        if (app) {
            app.innerHTML = `
                ${Navbar()}
                <div class="min-h-screen bg-gray-100 p-8">
                    <div class="max-w-7xl mx-auto">
                        <div class="bg-white rounded-lg shadow-lg p-6">
                            <h1 class="text-2xl font-bold mb-6">Dashboard Admin</h1>
                            
                            <section id="pending-reports" class="mb-8">
                                <h2 class="text-xl font-semibold mb-4">Laporan Pending</h2>
                                <div class="overflow-x-auto">
                                    <table class="min-w-full bg-white border border-gray-200">
                                        <thead>
                                            <tr class="bg-gray-50">
                                                <th class="px-4 py-2 border">ID Laporan</th>
                                                <th class="px-4 py-2 border">Nama Pelapor</th>
                                                <th class="px-4 py-2 border">Judul</th>
                                                <th class="px-4 py-2 border">Deskripsi</th>
                                                <th class="px-4 py-2 border">Jenis Infrastruktur</th>
                                                <th class="px-4 py-2 border">Tanggal</th>
                                                <th class="px-4 py-2 border">Alamat</th>
                                                <th class="px-4 py-2 border">Lampiran</th>
                                                <th class="px-4 py-2 border">Status</th>
                                                <th class="px-4 py-2 border">Aksi</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <!-- Data will be loaded here -->
                                        </tbody>
                                    </table>
                                </div>
                            </section>
                        </div>
                    </div>
                </div>
                ${Footer()}
            `;
        }
    }
};

export default AdminPage;
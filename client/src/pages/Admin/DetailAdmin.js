// src/pages/Admin/DetailAdmin.js
import Sidebar from '../../components/admin/Sidebar.js';
import '../../styles/admin.css';

const DetailAdmin = {
    reportId: null,

    async init(reportId) {
        this.reportId = reportId;
        await this.render();
        Sidebar.afterRender();
        await this.loadReportDetails();
        this.initializeEventListeners();
    },

    initializeEventListeners() {
        const acceptBtn = document.getElementById('accept-btn');
        const rejectBtn = document.getElementById('reject-btn');

        if (acceptBtn) {
            acceptBtn.addEventListener('click', () => this.processReport('accept'));
        }
        if (rejectBtn) {
            rejectBtn.addEventListener('click', () => this.processReport('reject'));
        }
    },

    async loadReportDetails() {
        try {
            // Dummy data - ganti dengan API call
            const reportData = {
                id: this.reportId,
                judul: 'Perbaikan Jalan Rusak',
                jenisInfrastruktur: 'Infrastruktur Perkotaan',
                deskripsi: 'Jalan berlubang yang cukup dalam dan membahayakan pengendara...',
                tanggalKejadian: '15 Maret 2024',
                alamat: 'Jl. Contoh No. 123, Kota ABC',
                status: 'Pending',
                buktiLampiran: {
                    url: '/images/sample1.jpg',
                    caption: 'Foto kerusakan jalan'
                }
            };
            this.renderReportDetails(reportData);
        } catch (error) {
            console.error('Error loading report details:', error);
            Swal.fire('Error', 'Gagal memuat detail laporan', 'error');
        }
    },

    async processReport(action) {
        try {
            const keterangan = document.getElementById('keterangan').value.trim();
            
            if (!keterangan) {
                Swal.fire({
                    icon: 'warning',
                    title: 'Peringatan',
                    text: 'Keterangan harus diisi!'
                });
                return;
            }

            const confirmTitle = action === 'accept' ? 'Terima Laporan' : 'Tolak Laporan';
            const confirmText = action === 'accept' ? 
                'Apakah Anda yakin akan menerima laporan ini?' : 
                'Apakah Anda yakin akan menolak laporan ini?';

            const result = await Swal.fire({
                title: confirmTitle,
                text: confirmText,
                icon: action === 'accept' ? 'question' : 'warning',
                showCancelButton: true,
                confirmButtonText: action === 'accept' ? 'Ya, Terima' : 'Ya, Tolak',
                cancelButtonText: 'Batal'
            });

            if (result.isConfirmed) {
                // Show loading state
                Swal.fire({
                    title: 'Memproses...',
                    text: 'Mohon tunggu sebentar',
                    allowOutsideClick: false,
                    showConfirmButton: false,
                    willOpen: () => {
                        Swal.showLoading();
                    }
                });

                const endpoint = action === 'accept' ? 
                    `/api/reports/${this.reportId}/accept` : 
                    `/api/reports/${this.reportId}/reject`;

                const response = await fetch(endpoint, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ keterangan })
                });
                
                if (response.ok) {
                    await Swal.fire({
                        icon: 'success',
                        title: 'Berhasil',
                        text: `Laporan telah berhasil ${action === 'accept' ? 'diterima' : 'ditolak'}`,
                        timer: 1500
                    });
                    window.location.hash = '#/admin/laporan';
                } else {
                    throw new Error(`Failed to ${action} report`);
                }
            }
        } catch (error) {
            console.error('Error processing report:', error);
            await Swal.fire({
                icon: 'error',
                title: 'Gagal',
                text: 'Terjadi kesalahan saat memproses laporan'
            });
        }
    },

    renderReportDetails(report) {
        const detailContainer = document.getElementById('report-detail-container');
        if (!detailContainer) return;

        detailContainer.innerHTML = `
            <div class="bg-white rounded-lg shadow-lg p-4 lg:p-6">
                <!-- Header -->
                <div class="flex items-center gap-4 mb-6 pb-4 border-b">
                    <a href="#/admin/laporan" 
                       class="inline-flex items-center justify-center p-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50">
                        <span class="material-icons-round">arrow_back</span>
                    </a>
                    <div>
                        <h1 class="text-xl lg:text-2xl font-bold text-gray-800 mb-2">
                            ${report.judul}
                        </h1>
                        <p class="text-gray-600 text-sm lg:text-base">
                            ID Laporan: #${report.id} | Tanggal: ${report.tanggalKejadian}
                        </p>
                    </div>
                </div>

                <!-- Information Grid -->
                <div class="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
                    <div>
                        <h2 class="text-sm uppercase text-gray-500 font-medium mb-2">Detail Laporan</h2>
                        <div class="bg-gray-50 rounded-lg p-4">
                            <div class="mb-4">
                                <label class="text-sm text-gray-500">Status</label>
                                <p class="mt-1">
                                    <span class="px-3 py-1 rounded-full text-sm ${
                                        report.status === 'Pending' ? 'bg-yellow-100 text-yellow-800' :
                                        report.status === 'Diterima' ? 'bg-green-100 text-green-800' :
                                        'bg-red-100 text-red-800'
                                    }">
                                        ${report.status}
                                    </span>
                                </p>
                            </div>
                            <div class="mb-4">
                                <label class="text-sm text-gray-500">Jenis Infrastruktur</label>
                                <p class="text-gray-800 font-medium">${report.jenisInfrastruktur}</p>
                            </div>
                            <div class="mb-4">
                                <label class="text-sm text-gray-500">Deskripsi</label>
                                <p class="text-gray-800">${report.deskripsi}</p>
                            </div>
                            <div>
                                <label class="text-sm text-gray-500">Alamat</label>
                                <p class="text-gray-800">${report.alamat}</p>
                            </div>
                        </div>
                    </div>

                    <!-- Bukti Lampiran -->
                    <div>
                        <h2 class="text-sm uppercase text-gray-500 font-medium mb-2">Bukti Lampiran</h2>
                        <div class="bg-gray-50 rounded-lg p-4">
                            <img src="${report.buktiLampiran.url}" 
                                 alt="Bukti lampiran" 
                                 class="w-full h-64 object-cover rounded-lg mb-2">
                            <p class="text-sm text-gray-600 text-center">${report.buktiLampiran.caption}</p>
                        </div>
                    </div>
                </div>

                ${report.status === 'Pending' ? `
                    <!-- Keterangan Form -->
                    <div class="mb-6 pt-4 border-t">
                        <h2 class="text-sm uppercase text-gray-500 font-medium mb-2">Keterangan</h2>
                        <div class="bg-gray-50 rounded-lg p-4">
                            <textarea id="keterangan"
                                    class="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    rows="3"
                                    placeholder="Masukkan keterangan untuk laporan..."></textarea>
                        </div>
                    </div>

                    <!-- Action Buttons -->
                    <div class="flex gap-3">
                        <button id="accept-btn"
                                class="px-6 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 flex items-center justify-center">
                            <span class="material-icons-round mr-2">check</span>
                            Terima Laporan
                        </button>
                        <button id="reject-btn"
                                class="px-6 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 flex items-center justify-center">
                            <span class="material-icons-round mr-2">close</span>
                            Tolak Laporan
                        </button>
                    </div>
                ` : ''}
            </div>
        `;
    },

    render() {
        const app = document.getElementById('app');
        if (!app) return;

        app.innerHTML = `
            <div class="min-h-screen bg-gray-100">
                ${Sidebar.render()}
                
                <main class="lg:ml-64 p-4 lg:p-8">
                    <div id="report-detail-container">
                        <!-- Detail content will be loaded here -->
                    </div>
                </main>
            </div>
        `;
    }
};

export default DetailAdmin;
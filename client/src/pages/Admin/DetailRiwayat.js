// src/pages/Admin/DetailRiwayat.js
import Sidebar from '../../components/admin/Sidebar.js';
import '../../styles/admin.css';

const DetailRiwayat = {
    reportId: null,

    async init(reportId) {
        this.reportId = reportId;
        await this.render();
        Sidebar.afterRender();
        await this.loadReportDetails();
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
                tanggalSelesai: '17 Maret 2024',
                alamat: 'Jl. Contoh No. 123, Kota ABC',
                status: 'Diterima',
                keteranganLaporan: 'Laporan telah ditindaklanjuti dan perbaikan selesai dilakukan',
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

    renderReportDetails(report) {
        const detailContainer = document.getElementById('report-detail-container');
        if (!detailContainer) return;

        detailContainer.innerHTML = `
            <div class="bg-white rounded-lg shadow-lg p-4 lg:p-6">
                <!-- Header -->
                <div class="flex items-center gap-4 mb-6 pb-4 border-b">
                    <a href="#/admin/riwayat" 
                       class="inline-flex items-center justify-center p-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50">
                        <span class="material-icons-round">arrow_back</span>
                    </a>
                    <div>
                        <h1 class="text-xl lg:text-2xl font-bold text-gray-800 mb-2">
                            ${report.judul}
                        </h1>
                        <p class="text-gray-600 text-sm lg:text-base">
                            ID Laporan: #${report.id}
                        </p>
                    </div>
                </div>

                <!-- Information Grid -->
                <div class="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
                    <div class="h-full">
                        <h2 class="text-sm uppercase text-gray-500 font-medium mb-2">Detail Laporan</h2>
                        <div class="bg-gray-50 rounded-lg p-4 h-[calc(100%-2rem)]">
                            <div class="flex flex-col h-full justify-between">
                                <div>
                                    <div class="mb-4">
                                        <label class="text-sm text-gray-500">Status</label>
                                        <p class="mt-1">
                                            <span class="px-3 py-1 rounded-full text-sm ${
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
                                    <div class="mb-4">
                                        <label class="text-sm text-gray-500">Alamat</label>
                                        <p class="text-gray-800">${report.alamat}</p>
                                    </div>
                                    <div class="mb-4">
                                        <label class="text-sm text-gray-500">Tanggal Kejadian</label>
                                        <p class="text-gray-800">${report.tanggalKejadian}</p>
                                    </div>
                                    <div class="mb-4">
                                        <label class="text-sm text-gray-500">Tanggal Selesai</label>
                                        <p class="text-gray-800">${report.tanggalSelesai}</p>
                                    </div>
                                    <div>
                                        <label class="text-sm text-gray-500">Keterangan Laporan</label>
                                        <p class="text-gray-800">${report.keteranganLaporan}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <!-- Bukti Lampiran -->
                    <div class="h-full">
                        <h2 class="text-sm uppercase text-gray-500 font-medium mb-2">Bukti Lampiran</h2>
                        <div class="bg-gray-50 rounded-lg p-4 h-[calc(100%-2rem)]">
                            <div class="flex flex-col h-full">
                                <img src="${report.buktiLampiran.url}" 
                                     alt="Bukti lampiran" 
                                     class="w-full flex-1 object-cover rounded-lg mb-2">
                                <p class="text-sm text-gray-600 text-center">${report.buktiLampiran.caption}</p>
                            </div>
                        </div>
                    </div>
                </div>
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

export default DetailRiwayat;
// src/pages/Admin/LaporanMasuk.js
import Sidebar from '../../components/admin/Sidebar.js';
import '../../styles/admin.css';

const LaporanMasuk = {
    async init() {
        try {
            await this.render();
            await this.loadReports();
            Sidebar.afterRender();
            this.initializeEventListeners();
        } catch (error) {
            console.error('Error in LaporanMasuk init:', error);
        }
    },

    async loadReports() {
        try {
            // Dummy data - ganti dengan API call
            const reports = [
                {
                    id: 'LP001',
                    nama: 'John Doe',
                    judul: 'Jalan Rusak di Komplek Pasar',
                    deskripsi: 'Terdapat lubang besar yang membahayakan pengendara motor',
                    jenis: 'Infrastruktur Perkotaan',
                    tanggal: '2024-03-15',
                    alamat: 'Jl. Pasar Baru No. 123'
                },
                {
                    id: 'LP002',
                    nama: 'Sarah Wilson',
                    judul: 'Drainase Tersumbat',
                    deskripsi: 'Saluran air tidak mengalir dan menimbulkan genangan',
                    jenis: 'Infrastruktur Lingkungan',
                    tanggal: '2024-03-12',
                    alamat: 'Jl. Melati No. 45'
                }
            ];

            this.updateReportsTable(reports);
        } catch (error) {
            console.error('Error loading reports:', error);
        }
    },

    updateReportsTable(reports) {
        const tbody = document.querySelector('#reports-table tbody');
        if (!tbody) return;

        const searchTerm = document.getElementById('searchInput').value.toLowerCase();

        // Filter reports based on search
        const filteredReports = reports.filter(report => 
            Object.values(report).some(value => 
                value.toString().toLowerCase().includes(searchTerm)
            )
        );

        tbody.innerHTML = filteredReports.map(report => `
            <tr class="border-b border-gray-200 hover:bg-gray-50">
                <td class="px-6 py-4 text-[#002F35] whitespace-nowrap">${report.id}</td>
                <td class="px-6 py-4 text-[#002F35] whitespace-nowrap">${report.nama}</td>
                <td class="px-6 py-4 text-[#002F35]">
                    <div class="max-w-[200px] line-clamp-1">${report.judul}</div>
                </td>
                <td class="px-6 py-4 text-[#002F35]">
                    <div class="max-w-[200px] line-clamp-1">${report.deskripsi}</div>
                </td>
                <td class="px-6 py-4 text-[#002F35] whitespace-nowrap">${report.jenis}</td>
                <td class="px-6 py-4 text-[#002F35] whitespace-nowrap">${report.tanggal}</td>
                <td class="px-6 py-4 text-[#002F35]">
                    <div class="max-w-[200px] line-clamp-1">${report.alamat}</div>
                </td>
                <td class="px-6 py-4 text-[#002F35] whitespace-nowrap">
            <span class="px-2 py-1 rounded-full text-xs bg-[#FEF3C7] text-[#92400E]">
                Pending
            </span>
                </td>
                <td class="px-6 py-4 text-[#002F35] whitespace-nowrap">
                    <a href="#/admin/laporan/${report.id}" 
                       class="inline-flex items-center justify-center p-1.5 bg-[#002F35] text-white rounded-lg hover:bg-opacity-90 transition-colors">
                        <span class="material-icons-round text-sm">visibility</span>
                    </a>
                </td>
            </tr>
        `).join('');
    },

    initializeEventListeners() {
        // Search functionality
        document.getElementById('searchInput')?.addEventListener('input', (e) => {
            this.loadReports();
        });
    },

    render() {
        const app = document.getElementById('app');
        if (!app) return;

        app.innerHTML = `
            <div class="min-h-screen bg-gray-100">
                ${Sidebar.render()}
                
                <main class="lg:ml-64 p-4 lg:p-8">
                    <div class="bg-white rounded-lg shadow-lg">
                        <!-- Header Section -->
                        <div class="p-6 border-b">
                            <h1 class="text-xl lg:text-2xl font-bold text-[#002F35]">Laporan Masuk</h1>
                        </div>

                        <!-- Filters Section -->
                        <div class="p-6 border-b">
                            <div class="flex flex-col lg:flex-row gap-4 lg:items-center lg:justify-between">
                                <div class="relative">
                                    <input type="text" 
                                           id="searchInput"
                                           placeholder="Cari laporan..." 
                                           class="pl-10 pr-4 py-2 border rounded-lg w-full lg:w-64">
                                    <span class="material-icons-round absolute left-3 top-2.5 text-gray-400">search</span>
                                </div>
                            </div>
                        </div>

                        <!-- Table Section -->
                        <div class="overflow-x-auto p-6">
                            <table id="reports-table" class="w-full table-auto">
                                <thead class="bg-gray-50">
                                    <tr class="text-left text-sm font-medium text-[#002F35] border-b">
                                        <th class="px-6 py-4 whitespace-nowrap">ID</th>
                                        <th class="px-6 py-4 whitespace-nowrap">Nama</th>
                                        <th class="px-6 py-4">Judul</th>
                                        <th class="px-6 py-4">Deskripsi</th>
                                        <th class="px-6 py-4 whitespace-nowrap">Jenis</th>
                                        <th class="px-6 py-4 whitespace-nowrap">Tanggal</th>
                                        <th class="px-6 py-4">Alamat</th>
                                        <th class="px-6 py-4 whitespace-nowrap">Status</th>
                                        <th class="px-6 py-4 whitespace-nowrap">Aksi</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <!-- Data will be loaded here -->
                                </tbody>
                            </table>
                        </div>

                        <!-- Pagination Section -->
                        <div class="p-6 border-t">
                            <div class="flex flex-col lg:flex-row items-center justify-between gap-4">
                                <div class="text-sm text-[#002F35]">
                                    Menampilkan 1-10 dari 100 laporan
                                </div>
                                <div class="flex gap-2">
                                    <button class="px-3 py-1 border rounded hover:bg-gray-50 text-sm text-[#002F35]">Previous</button>
                                    <button class="px-3 py-1 bg-[#002F35] text-white rounded hover:bg-opacity-90 text-sm">1</button>
                                    <button class="px-3 py-1 border rounded hover:bg-gray-50 text-sm text-[#002F35]">2</button>
                                    <button class="px-3 py-1 border rounded hover:bg-gray-50 text-sm text-[#002F35]">3</button>
                                    <button class="px-3 py-1 border rounded hover:bg-gray-50 text-sm text-[#002F35]">Next</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </main>
            </div>
        `;
    }
};

export default LaporanMasuk;
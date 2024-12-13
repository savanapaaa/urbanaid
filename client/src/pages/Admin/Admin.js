import Sidebar from '../../components/admin/Sidebar.js';
import '../../styles/admin.css';

const AdminPage = {
    init() {
        try {
            this.render();
            this.loadDashboardStats();
            this.initializeCharts();
            Sidebar.afterRender();
        } catch (error) {
            console.error('Error in AdminPage init:', error);
        }
    },

    async loadDashboardStats() {
        try {
            // Dummy data for development
            const stats = {
                total: 120,
                pending: 15,
                accepted: 90,
                rejected: 15
            };

            this.updateDashboardStats(stats);
        } catch (error) {
            console.error('Error loading dashboard stats:', error);
        }
    },

    updateDashboardStats(stats) {
        const elements = {
            total: document.getElementById('total-reports'),
            pending: document.getElementById('pending-reports'),
            accepted: document.getElementById('accepted-reports'),
            rejected: document.getElementById('rejected-reports')
        };

        Object.keys(elements).forEach(key => {
            if (elements[key]) elements[key].textContent = stats[key];
        });
    },

    initializeCharts() {
        const charts = [
            {
                id: 'totalReportsChart',
                type: 'line',
                data: {
                    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'Mei', 'Jun'],
                    datasets: [{
                        label: 'Total Laporan',
                        data: [30, 45, 60, 35, 50, 40],
                        borderColor: '#00899B',
                        tension: 0.3
                    }]
                }
            },
            {
                id: 'infraTypeChart',
                type: 'doughnut',
                data: {
                    labels: ['Infrastruktur Perkotaan', 'Infrastruktur Lingkungan', 'Infrastruktur Sosial'],
                    datasets: [{
                        data: [40, 35, 25],
                        backgroundColor: ['#00899B', '#004d57', '#002F35']
                    }]
                }
            },
            {
                id: 'acceptedReportsChart',
                type: 'bar',
                data: {
                    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'Mei', 'Jun'],
                    datasets: [{
                        label: 'Laporan Diterima',
                        data: [25, 30, 40, 28, 35, 30],
                        backgroundColor: '#00899B'
                    }]
                }
            },
            {
                id: 'rejectedReportsChart',
                type: 'bar',
                data: {
                    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'Mei', 'Jun'],
                    datasets: [{
                        label: 'Laporan Ditolak',
                        data: [5, 8, 6, 4, 7, 5],
                        backgroundColor: '#EF4444'
                    }]
                }
            }
        ];

        charts.forEach(chartConfig => {
            const ctx = document.getElementById(chartConfig.id)?.getContext('2d');
            if (ctx) {
                new Chart(ctx, {
                    type: chartConfig.type,
                    data: chartConfig.data,
                    options: {
                        responsive: true,
                        maintainAspectRatio: false,
                        plugins: {
                            title: { display: false },
                            legend: {
                                position: chartConfig.type === 'doughnut' ? 'bottom' : 'top',
                                display: true,
                                labels: {
                                    boxWidth: 10,
                                    padding: 10,
                                    font: {
                                        size: 10
                                    }
                                }
                            }
                        },
                        scales: chartConfig.type !== 'doughnut' ? {
                            x: {
                                ticks: {
                                    font: {
                                        size: 10
                                    }
                                }
                            },
                            y: {
                                ticks: {
                                    font: {
                                        size: 10
                                    }
                                }
                            }
                        } : undefined
                    }
                });
            }
        });
    },

    render() {
        const app = document.getElementById('app');
        if (!app) return;

        app.innerHTML = `
            <div class="min-h-screen bg-gray-100">
                ${Sidebar.render()}
                
                <main class="lg:ml-64 p-4 lg:p-8">
                    <!-- Stats Grid -->
                    <div class="grid grid-cols-2 lg:grid-cols-4 gap-3 lg:gap-4 mb-6">
                        <div class="bg-gradient-to-r from-[#00899B] to-[#002F35] p-4 lg:p-6 rounded-lg shadow text-white text-center">
                            <h3 class="text-xs lg:text-sm font-medium mb-2">Total Laporan</h3>
                            <div class="text-xl lg:text-3xl font-bold" id="total-reports">120</div>
                        </div>
                        <div class="bg-gradient-to-r from-[#00899B] to-[#002F35] p-4 lg:p-6 rounded-lg shadow text-white text-center">
                            <h3 class="text-xs lg:text-sm font-medium mb-2">Laporan Pending</h3>
                            <div class="text-xl lg:text-3xl font-bold" id="pending-reports">15</div>
                        </div>
                        <div class="bg-gradient-to-r from-[#00899B] to-[#002F35] p-4 lg:p-6 rounded-lg shadow text-white text-center">
                            <h3 class="text-xs lg:text-sm font-medium mb-2">Laporan Diterima</h3>
                            <div class="text-xl lg:text-3xl font-bold" id="accepted-reports">90</div>
                        </div>
                        <div class="bg-gradient-to-r from-[#00899B] to-[#002F35] p-4 lg:p-6 rounded-lg shadow text-white text-center">
                            <h3 class="text-xs lg:text-sm font-medium mb-2">Laporan Ditolak</h3>
                            <div class="text-xl lg:text-3xl font-bold" id="rejected-reports">15</div>
                        </div>
                    </div>

                    <!-- Charts Grid -->
                    <div class="grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-6">
                        <div class="bg-white rounded-lg shadow p-4 lg:p-6">
                            <h3 class="text-sm lg:text-lg font-semibold mb-4 text-[#002F35]">Trend Total Laporan</h3>
                            <div class="h-48 lg:h-64">
                                <canvas id="totalReportsChart"></canvas>
                            </div>
                        </div>
                        <div class="bg-white rounded-lg shadow p-4 lg:p-6">
                            <h3 class="text-sm lg:text-lg font-semibold mb-4 text-[#002F35]">Jenis Infrastruktur</h3>
                            <div class="h-48 lg:h-64">
                                <canvas id="infraTypeChart"></canvas>
                            </div>
                        </div>
                        <div class="bg-white rounded-lg shadow p-4 lg:p-6">
                            <h3 class="text-sm lg:text-lg font-semibold mb-4 text-[#002F35]">Laporan Diterima</h3>
                            <div class="h-48 lg:h-64">
                                <canvas id="acceptedReportsChart"></canvas>
                            </div>
                        </div>
                        <div class="bg-white rounded-lg shadow p-4 lg:p-6">
                            <h3 class="text-sm lg:text-lg font-semibold mb-4 text-[#002F35]">Laporan Ditolak</h3>
                            <div class="h-48 lg:h-64">
                                <canvas id="rejectedReportsChart"></canvas>
                            </div>
                        </div>
                    </div>
                </main>
            </div>
        `;

        this.initializeCharts();
    }
};

export default AdminPage;
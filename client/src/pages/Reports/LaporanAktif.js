class LaporanAktif {
    constructor() {
        this.data = [
            {
                id: 1,
                judul: 'Perbaikan Jalan Berlubang',
                jenisInfrastruktur: 'Infrastruktur Perkotaan',
                tanggalKejadian: '2024-01-15',
                deskripsi: 'Jalan berlubang yang cukup dalam di Jalan Kenanga No. 123, perlu perbaikan segera karena membahayakan pengendara.',
                status: 'pending',
                alamat: 'Jl. Kenanga No. 123, RT 02/RW 03, Kel. Sukamaju',
                buktiLampiran: '/images/infra.jpeg'
            },
            {
                id: 2,
                judul: 'Saluran Air Tersumbat',
                jenisInfrastruktur: 'Infrastruktur Lingkungan',
                tanggalKejadian: '2024-02-01',
                deskripsi: 'Saluran air di Jalan Melati mengalami penyumbatan yang menyebabkan genangan air ketika hujan.',
                status: 'diproses',
                alamat: 'Jl. Melati Blok B2 No. 45, RT 05/RW 08, Kel. Harapan Jaya',
                buktiLampiran: 'saluran-air.jpg'
            },
            {
                id: 3,
                judul: 'Lampu Penerangan Jalan Rusak',
                jenisInfrastruktur: 'Infrastruktur Perkotaan',
                tanggalKejadian: '2024-01-20',
                deskripsi: 'Lima lampu jalan di sepanjang Jalan Mawar tidak berfungsi, menyebabkan jalan gelap di malam hari.',
                status: 'ditolak',
                alamat: 'Jl. Mawar Raya No. 78, RT 03/RW 04, Kel. Bunga Indah',
                buktiLampiran: 'lampu-jalan.jpg'
            }
        ];
        this.init();
    }

    formatDate(dateString) {
        const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
        const date = new Date(dateString);
        return date.toLocaleDateString('id-ID', options);
    }

    getStatusIcon(status) {
        switch(status) {
            case 'pending':
                return 'schedule';
            case 'diproses':
                return 'sync';
            case 'ditolak':
                return 'cancel';
            default:
                return 'info';
        }
    }

    getStatusClass(status) {
        switch(status) {
            case 'pending':
                return 'status-pending';
            case 'diproses':
                return 'status-process';
            case 'ditolak':
                return 'status-reject';
            default:
                return '';
        }
    }

    createReportCard(report) {
        const statusIcon = this.getStatusIcon(report.status);
        const statusClass = this.getStatusClass(report.status);
        const showActions = report.status === 'pending';
        
        const statusText = {
            'pending': 'Pending',
            'diproses': 'Diproses',
            'ditolak': 'Ditolak'
        }[report.status];
        
        return `
            <div class="laporan-card ${statusClass}" data-status="${report.status}">
                <div class="status-icon">
                    <span class="material-icons-round">${statusIcon}</span>
                    <span class="status-text">${statusText}</span>
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
                        ${showActions ? `
                            <div class="crud-actions">
                                <button class="action-btn edit-btn" onclick="laporanAktif.editReport(${report.id})">
                                    <span class="material-icons-round">edit</span>
                                    Edit
                                </button>
                                <button class="action-btn delete-btn" onclick="laporanAktif.deleteReport(${report.id})">
                                    <span class="material-icons-round">delete</span>
                                    Hapus
                                </button>
                            </div>
                        ` : ''}
                        <button class="action-btn view-detail-btn" onclick="laporanAktif.showDetail(${report.id})">
                            <span class="material-icons-round">visibility</span>
                            Detail
                        </button>
                    </div>
                </div>
            </div>
        `;
    }

    render() {
        const pendingReports = this.data.filter(report => report.status === 'pending');
        const processedReports = this.data.filter(report => report.status === 'diproses');
        const rejectedReports = this.data.filter(report => report.status === 'ditolak');

        return `
            <div class="laporan-aktif-container">
                <div class="main-content">
                    <h2 class="section-title">
                        <span class="material-icons-round">dashboard</span>
                        Laporan Aktif
                    </h2>
                    
                    <div class="status-filter">
                        <button class="filter-btn active" data-status="all" onclick="laporanAktif.filterReports('all')">
                            <span class="material-icons-round">all_inbox</span>
                            Semua (${this.data.length})
                        </button>
                        <button class="filter-btn" data-status="pending" onclick="laporanAktif.filterReports('pending')">
                            <span class="material-icons-round">schedule</span>
                            Pending (${pendingReports.length})
                        </button>
                        <button class="filter-btn" data-status="diproses" onclick="laporanAktif.filterReports('diproses')">
                            <span class="material-icons-round">sync</span>
                            Diproses (${processedReports.length})
                        </button>
                        <button class="filter-btn" data-status="ditolak" onclick="laporanAktif.filterReports('ditolak')">
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
    }

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
    }

    async showDetail(id) {
        const report = this.data.find(r => r.id === id);
        if (!report) return;
    
        await Swal.fire({
            title: report.judul,
            html: `
                <div class="modal-detail">
                    <div class="detail-item">
                        <strong>Status Laporan</strong>
                        <div class="status-info ${this.getStatusClass(report.status)}">
                            <span class="material-icons-round">${this.getStatusIcon(report.status)}</span>
                            ${report.status.charAt(0).toUpperCase() + report.status.slice(1)}
                        </div>
                    </div>
    
                    <div class="detail-item">
                        <strong>Jenis Infrastruktur</strong>
                        <div class="infra-type">
                            <span class="material-icons-round">account_balance</span>
                            ${report.jenisInfrastruktur}
                        </div>
                    </div>
    
                    <div class="detail-item">
                        <strong>Tanggal Kejadian</strong>
                        <div class="date-info">
                            <span class="material-icons-round">event</span>
                            ${this.formatDate(report.tanggalKejadian)}
                        </div>
                    </div>
    
                    <div class="detail-item">
                        <strong>Lokasi Kejadian</strong>
                        <div class="address-info">
                            <span class="material-icons-round">location_on</span>
                            <span>${report.alamat}</span>
                        </div>
                    </div>
    
                    <div class="detail-item">
                        <strong>Deskripsi Masalah</strong>
                        <p class="description-text">${report.deskripsi}</p>
                    </div>
    
                    <div class="detail-item">
                        <strong>Bukti Lampiran</strong>
                        <div class="attachment-container">
                            <div class="attachment-info">
                                <span class="material-icons-round">attachment</span>
                                ${report.buktiLampiran}
                            </div>
                            <div class="attachment-preview">
                                <img src="path/to/images/${report.buktiLampiran}" alt="Bukti Lampiran" 
                                     onerror="this.src='/api/placeholder/800/400';this.onerror=null;">
                            </div>
                        </div>
                    </div>
                </div>
            `,
            width: 700,
            padding: 0,
            showCloseButton: true,
            showConfirmButton: false,
            customClass: {
                popup: 'detail-modal-popup',
                closeButton: 'modal-close-button'
            }
        });
    }

    async deleteReport(id) {
        try {
            const report = this.data.find(r => r.id === id);
            if (report.status !== 'pending') {
                throw new Error('Hanya laporan dengan status Pending yang dapat dihapus');
            }

            const confirmed = await Swal.fire({
                title: 'Anda yakin?',
                text: "Laporan yang dihapus tidak dapat dikembalikan!",
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#00899B',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Ya, hapus!',
                cancelButtonText: 'Batal'
            });

            if (confirmed.isConfirmed) {
                await new Promise(resolve => setTimeout(resolve, 500));
                this.data = this.data.filter(r => r.id !== id);
                document.querySelector('.main-content').innerHTML = this.render();
                
                Swal.fire({
                    title: 'Terhapus!',
                    text: 'Laporan berhasil dihapus.',
                    icon: 'success',
                    timer: 2000,
                    showConfirmButton: false
                });
            }
        } catch (error) {
            Swal.fire({
                title: 'Gagal!',
                text: error.message,
                icon: 'error',
                timer: 2000,
                showConfirmButton: false
            });
        }
    }

    async editReport(id) {
        try {
            const report = this.data.find(r => r.id === id);
            if (report.status !== 'pending') {
                throw new Error('Hanya laporan dengan status Pending yang dapat diedit');
            }

            const { value: formValues } = await Swal.fire({
                title: 'Edit Laporan',
                html: `
                    <div class="form-group">
                        <label class="form-label" for="swal-judul">Judul Laporan</label>
                        <input id="swal-judul" class="swal2-input" value="${report.judul}">
                    </div>

                    <div class="form-group">
                        <label class="form-label" for="swal-infrastruktur">Jenis Infrastruktur</label>
                        <select id="swal-infrastruktur" class="swal2-select">
                            <option value="Infrastruktur Perkotaan" ${report.jenisInfrastruktur === 'Infrastruktur Perkotaan' ? 'selected' : ''}>
                                Infrastruktur Perkotaan
                            </option>
                            <option value="Infrastruktur Lingkungan" ${report.jenisInfrastruktur === 'Infrastruktur Lingkungan' ? 'selected' : ''}>
                                Infrastruktur Lingkungan
                            </option>
                            <option value="Infrastruktur Sosial" ${report.jenisInfrastruktur === 'Infrastruktur Sosial' ? 'selected' : ''}>
                                Infrastruktur Sosial
                            </option>
                        </select>
                    </div>

                    <div class="form-group">
                        <label class="form-label" for="swal-tanggal">Tanggal Kejadian</label>
                        <input type="date" id="swal-tanggal" class="swal2-input" value="${report.tanggalKejadian}">
                    </div>

                    <div class="form-group">
                        <label class="form-label" for="swal-alamat">Alamat Lengkap</label>
                        <input id="swal-alamat" class="swal2-input" value="${report.alamat}">
                    </div>

                    <div class="form-group">
                        <label class="form-label" for="swal-deskripsi">Deskripsi Masalah</label>
                        <textarea id="swal-deskripsi" class="swal2-textarea">${report.deskripsi}</textarea>
                    </div>

                    <div class="form-group">
                        <label class="form-label" for="swal-lampiran">Bukti Lampiran</label>
                        <div class="file-input-container">
                            <label class="file-input-label">
                                <input type="file" id="swal-lampiran" accept="image/*" style="display: none;">
                                <span class="material-icons-round">upload_file</span>
                                Pilih File Baru
                            </label>
                            <div id="current-file" style="margin-top: 0.5rem; font-size: 0.875rem; color: #666;">
                                File saat ini: ${report.buktiLampiran}
                            </div>
                        </div>
                    </div>
                `,
                focusConfirm: false,
                showCancelButton: true,
                confirmButtonText: 'Simpan',
                cancelButtonText: 'Batal',
                width: '600px',
                preConfirm: () => {
                    const fileInput = document.getElementById('swal-lampiran');
                    const fileName = fileInput.files.length > 0 
                        ? fileInput.files[0].name 
                        : report.buktiLampiran;

                    return {
                        judul: document.getElementById('swal-judul').value,
                        jenisInfrastruktur: document.getElementById('swal-infrastruktur').value,
                        tanggalKejadian: document.getElementById('swal-tanggal').value,
                        alamat: document.getElementById('swal-alamat').value,
                        deskripsi: document.getElementById('swal-deskripsi').value,
                        buktiLampiran: fileName
                    }
                }
            });

            if (formValues) {
                await new Promise(resolve => setTimeout(resolve, 500));
                
                const index = this.data.findIndex(r => r.id === id);
                this.data[index] = { 
                    ...this.data[index], 
                    ...formValues,
                    status: this.data[index].status,
                    id: this.data[index].id
                };
                
                document.querySelector('.main-content').innerHTML = this.render();
                
                Swal.fire({
                    title: 'Berhasil!',
                    text: 'Laporan berhasil diperbarui.',
                    icon: 'success',
                    timer: 2000,
                    showConfirmButton: false
                });
            }
        } catch (error) {
            Swal.fire({
                title: 'Gagal!',
                text: error.message,
                icon: 'error',
                timer: 2000,
                showConfirmButton: false
            });
        }
    }

    init() {
        const mainContent = document.querySelector('.main-content');
        if (mainContent) {
            mainContent.innerHTML = this.render();
        }
    }
}

const laporanAktif = new LaporanAktif();
window.laporanAktif = laporanAktif;

export default laporanAktif;
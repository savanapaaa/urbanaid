import { Navbar } from '../../components/common/Navbar.js';
import { Footer } from '../../components/common/Footer.js';
import LaporanAktif from '../Reports/LaporanAktif.js';
import Riwayat from '../Reports/Riwayat.js';

const PelaporanPage = {
    formData: {
        judul: '',
        deskripsi: '', 
        jenisInfrastruktur: '',
        tanggalKejadian: '',
        alamatKejadian: '',
        lampiran: null
    },

    infraInfo: {
        'perkotaan': 'Jalan, jembatan, gedung pemerintahan, fasilitas umum yang mendukung aktivitas perkotaan.',
        'lingkungan': 'Sistem drainase, pengolahan air bersih, pengelolaan sampah, dan infrastruktur ramah lingkungan.',
        'sosial': 'Fasilitas kesehatan, pendidikan, ruang publik dan sarana sosial kemasyarakatan.'
    },

    loadStyles() {
        if (!document.querySelector('link[href*="pelaporan.css"]')) {
            const link = document.createElement('link');
            link.rel = 'stylesheet';
            link.href = '/styles/pelaporan.css';
            document.head.appendChild(link);
        }
    },

    formatDate(dateString) {
        const days = ['Minggu', 'Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat', 'Sabtu'];
        const months = [
            'Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni',
            'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember'
        ];
        
        const date = new Date(dateString);
        const dayName = days[date.getDay()];
        const day = String(date.getDate()).padStart(2, '0');
        const month = months[date.getMonth()];
        const year = date.getFullYear();
        
        return `${dayName}, ${day} ${month} ${year}`;
    },

    init() {
        this.loadStyles();
        this.renderPage();
        this.initializeEventListeners();
    },

    async renderPage() {
        const mainContainer = document.querySelector('#app');
        const currentHash = window.location.hash;
    
        const navigationPills = `
            <div class="nav-pills">
                <a href="#/pelaporan/beranda" class="nav-pill ${currentHash === '#/pelaporan/beranda' || currentHash === '#/pelaporan' ? 'active' : ''}">
                    Beranda
                </a>
                <a href="#/pelaporan/laporanaktif" class="nav-pill ${currentHash === '#/pelaporan/laporanaktif' ? 'active' : ''}">
                    Laporan Aktif
                </a>
                <a href="#/pelaporan/riwayat" class="nav-pill ${currentHash === '#/pelaporan/riwayat' ? 'active' : ''}">
                    Riwayat
                </a>
                <a href="#/pelaporan/profile" class="nav-pill ${currentHash === '#/pelaporan/profile' ? 'active' : ''}">
                    Profile
                </a>
            </div>
        `;
    
        const headerContent = `
            <div class="header mt-2">
                <h1>Platform Digital untuk Pengaduan Masyarakat</h1>
                <p>Laporkan Permasalahan Anda Secara Langsung</p>
            </div>
        `;
    
        let pageContent = `
            ${Navbar()}
            <div class="pelaporan-container">
                ${headerContent}
                ${navigationPills}
                <div class="main-content">
        `;
    
        if (currentHash === '#/pelaporan/laporanaktif') {
            pageContent += await LaporanAktif.render();
            
            setTimeout(() => {
                if (LaporanAktif.afterRender) {
                    LaporanAktif.afterRender();
                }
            }, 0);
        } else if (currentHash === '#/pelaporan/riwayat') {
            pageContent += await Riwayat.render();
            
            setTimeout(() => {
                if (Riwayat.afterRender) {
                    Riwayat.afterRender();
                }
            }, 0);
        } else if (currentHash === '#/pelaporan/profile') {
            pageContent += `
                <div class="profile-content">
                    <h2>Profile Pengguna</h2>
                    <p>Halaman Profile sedang dalam pengembangan.</p>
                </div>
            `;
        } else {
            pageContent += `
                <form id="laporan-form" class="form-card" novalidate>
                    <h2>Sampaikan Laporan Anda</h2>
    
                    <div class="form-group">
                        <label for="judul">Judul Laporan</label>
                        <input type="text" id="judul" name="judul" placeholder="Masukkan Judul">
                    </div>
    
                    <div class="form-group">
                        <label for="deskripsi">Deskripsi Laporan</label>
                        <textarea id="deskripsi" name="deskripsi" placeholder="Masukkan Deskripsi"></textarea>
                    </div>
    
                    <div class="form-row">
                        <div class="form-group infra-select-group">
                            <label for="jenisInfrastruktur">
                                Jenis Infrastruktur 
                                <span class="info-icon" id="infoIcon">i</span>
                            </label>
                            <select id="jenisInfrastruktur" name="jenisInfrastruktur">
                                <option value="">Pilih Jenis Infrastruktur</option>
                                <option value="perkotaan">Infrastruktur Perkotaan</option>
                                <option value="lingkungan">Infrastruktur Lingkungan</option>
                                <option value="sosial">Infrastruktur Sosial</option>
                            </select>
                            <div id="infraInfo" class="infra-info hidden"></div>
                        </div>

                        <div class="form-group">
                            <label for="tanggalKejadian">Tanggal Kejadian</label>
                            <input type="date" id="tanggalKejadian" name="tanggalKejadian">
                        </div>
                    </div>
    
                    <div class="form-group">
                        <label for="alamatKejadian">Alamat Kejadian</label>
                        <input type="text" id="alamatKejadian" name="alamatKejadian" placeholder="Alamat Kejadian">
                    </div>
    
                    <div class="form-group">
                        <label>Bukti Lampiran</label>
                        <div class="file-upload-container" id="dropZone">
                            <input type="file" id="fileInput" accept="image/*,.pdf" hidden>
                            <div class="upload-content">
                                <div class="upload-icon-container">
                                    <span class="material-icons-round upload-icon">cloud_upload</span>
                                </div>
                                <div class="upload-text">
                                    <p class="upload-title">Drag and drop files or</p>
                                    <button type="button" class="browse-button">Browse files</button>
                                </div>
                                <p class="upload-hint">Supported formats: JPEG, PNG, PDF (Max 5MB)</p>
                            </div>
                        </div>
                    </div>
    
                    <div class="form-submit">
                        <button type="submit" class="gradient-button text-white px-6 py-2">Lapor Sekarang</button>
                    </div>
                </form>
            `;
        }
    
        pageContent += `
                </div>
            </div>
            ${Footer()}
        `;
    
        mainContainer.innerHTML = pageContent;
    },

    initializeEventListeners() {
        const form = document.querySelector('#laporan-form');
        const fileInput = document.querySelector('#fileInput');
        const dropZone = document.querySelector('#dropZone');
        const browseButton = document.querySelector('.browse-button');
        const infraSelect = document.querySelector('#jenisInfrastruktur');
        const infoIcon = document.querySelector('#infoIcon');
        const infraInfo = document.querySelector('#infraInfo');
        const navPills = document.querySelectorAll('.nav-pill');
        const dateInput = document.querySelector('#tanggalKejadian');
        const dateDisplay = document.querySelector('#tanggalKejadianDisplay');

        if (navPills) {
            navPills.forEach(pill => {
                pill.addEventListener('click', () => {
                    navPills.forEach(p => p.classList.remove('active'));
                    pill.classList.add('active');
                });
            });
        }

        if (dateInput) {
            const today = new Date();
            const year = today.getFullYear();
            const month = String(today.getMonth() + 1).padStart(2, '0');
            const day = String(today.getDate()).padStart(2, '0');
            const maxDate = `${year}-${month}-${day}`;
            
            const lastYear = new Date();
            lastYear.setFullYear(lastYear.getFullYear() - 1);
            const minYear = lastYear.getFullYear();
            const minMonth = String(lastYear.getMonth() + 1).padStart(2, '0');
            const minDay = String(lastYear.getDate()).padStart(2, '0');
            const minDate = `${minYear}-${minMonth}-${minDay}`;
            
            dateInput.setAttribute('max', maxDate);
            dateInput.setAttribute('min', minDate);
            dateInput.value = maxDate;
        
            dateInput.addEventListener('change', (e) => {
                const selectedDate = new Date(e.target.value);
                const currentDate = new Date();
                
                if (selectedDate > currentDate) {
                    Swal.fire({
                        title: 'Peringatan!',
                        text: 'Tidak dapat memilih tanggal di masa depan!',
                        icon: 'warning',
                        confirmButtonText: 'OK',
                        confirmButtonColor: '#00899B'
                    });
                    e.target.value = maxDate;
                }
            });
        }

        if (form) {
            form.addEventListener('submit', async (e) => {
                e.preventDefault();

                if (!form.judul.value.trim()) {
                    Swal.fire({
                        title: 'Peringatan!',
                        text: 'Judul Wajib diisi',
                        icon: 'warning',
                        confirmButtonText: 'OK',
                        confirmButtonColor: '#00899B'
                    });
                    form.judul.focus();
                    return;
                }

                if (!form.deskripsi.value.trim()) {
                    Swal.fire({
                        title: 'Peringatan!',
                        text: 'Deskripsi Wajib diisi',
                        icon: 'warning',
                        confirmButtonText: 'OK',
                        confirmButtonColor: '#00899B'
                    });
                    form.deskripsi.focus();
                    return;
                }

                if (!form.jenisInfrastruktur.value) {
                    Swal.fire({
                        title: 'Peringatan!',
                        text: 'Jenis Infrastruktur Wajib dipilih',
                        icon: 'warning',
                        confirmButtonText: 'OK',
                        confirmButtonColor: '#00899B'
                    });
                    form.jenisInfrastruktur.focus();
                    return;
                }

                if (!form.alamatKejadian.value.trim()) {
                    Swal.fire({
                        title: 'Peringatan!',
                        text: 'Alamat Kejadian Wajib diisi',
                        icon: 'warning',
                        confirmButtonText: 'OK',
                        confirmButtonColor: '#00899B'
                    });
                    form.alamatKejadian.focus();
                    return;
                }

                if (!this.formData.lampiran) {
                    Swal.fire({
                        title: 'Peringatan!',
                        text: 'Bukti Lampiran Wajib diunggah',
                        icon: 'warning',
                        confirmButtonText: 'OK',
                        confirmButtonColor: '#00899B'
                    });
                    return;
                }

                try {
                    Swal.fire({
                        title: 'Mengirim laporan...',
                        allowOutsideClick: false,
                        allowEscapeKey: false,
                        showConfirmButton: false,
                        didOpen: () => {
                            Swal.showLoading();
                        }
                    });

                    await new Promise(resolve => setTimeout(resolve, 2000));

                    await Swal.fire({
                        title: 'Berhasil!',
                        text: 'Laporan Anda telah berhasil dikirim',
                        icon: 'success',
                        confirmButtonText: 'OK',
                        confirmButtonColor: '#00899B'
                    });

                    form.reset();
                    if (dateInput) {
                        dateInput.value = maxDate;
                        dateDisplay.value = this.formatDate(maxDate);
                    }
                    this.formData.lampiran = null;
                    this.renderFileUpload();

                } catch (error) {
                    Swal.fire({
                        title: 'Error!',
                        text: 'Terjadi kesalahan saat mengirim laporan. Silakan coba lagi.',
                        icon: 'error',
                        confirmButtonText: 'OK',
                        confirmButtonColor: '#00899B'
                    });
                }
            });
        }

        if (fileInput && browseButton) {
            fileInput.addEventListener('change', this.handleFileChange.bind(this));
            browseButton.addEventListener('click', () => fileInput.click());
        }

        if (dropZone) {
            dropZone.addEventListener('dragover', (e) => {
                e.preventDefault();
                dropZone.classList.add('drag-over');
            });

            dropZone.addEventListener('dragleave', () => {
                dropZone.classList.remove('drag-over');
            });

            dropZone.addEventListener('drop', (e) => {
                e.preventDefault();
                dropZone.classList.remove('drag-over');
                const file = e.dataTransfer.files[0];
                if (fileInput && this.validateFile(file)) {
                    fileInput.files = e.dataTransfer.files;
                    this.handleFileChange({ target: fileInput });
                }
            });
        }

        if (infraSelect && infoIcon && infraInfo) {
            infraSelect.addEventListener('change', (e) => {
                const selectedValue = e.target.value;
                if (selectedValue) {
                    infraInfo.textContent = this.infraInfo[selectedValue];
                    infraInfo.classList.remove('hidden');
                } else {
                    infraInfo.classList.add('hidden');
                }
            });

            infoIcon.addEventListener('mouseenter', () => {
                const selectedValue = infraSelect.value;
                if (selectedValue) {
                    infraInfo.textContent = this.infraInfo[selectedValue];
                    infraInfo.classList.remove('hidden');
                }
            });

            infoIcon.addEventListener('mouseleave', () => {
                infraInfo.classList.add('hidden');
            });
        }
    },

    validateFile(file) {
        const validTypes = ['image/jpeg', 'image/png', 'application/pdf'];
        const maxSize = 5 * 1024 * 1024; // 5MB

        if (!validTypes.includes(file.type)) {
            Swal.fire({
                title: 'File tidak valid!',
                text: 'File harus berformat JPEG, PNG, atau PDF',
                icon: 'error',
                confirmButtonText: 'OK',
                confirmButtonColor: '#00899B'
            });
            return false;
        }

        if (file.size > maxSize) {
            Swal.fire({
                title: 'File terlalu besar!',
                text: 'Ukuran file tidak boleh lebih dari 5MB',
                icon: 'error',
                confirmButtonText: 'OK',
                confirmButtonColor: '#00899B'
            });
            return false;
        }

        return true;
    },

    handleFileChange(e) {
        const file = e.target.files[0];
        if (file && this.validateFile(file)) {
            this.formData.lampiran = file;
            this.updateFilePreview(file);
        }
    },

    updateFilePreview(file) {
        const uploadContent = document.querySelector('.upload-content');
        if (uploadContent) {
            uploadContent.innerHTML = `
                <div class="file-preview">
                    <div class="file-info">
                        <img src="${file.type.startsWith('image/') ? URL.createObjectURL(file) : '/icons/file.svg'}" 
                             alt="preview" 
                             class="file-thumbnail">
                        <div class="file-details">
                            <p class="file-name">${file.name}</p>
                            <p class="file-size">${(file.size / (1024 * 1024)).toFixed(2)} MB</p>
                        </div>
                    </div>
                    <button type="button" class="remove-file">
                        <img src="/icons/remove.svg" alt="remove" class="remove-icon">
                    </button>
                </div>
            `;

            const removeButton = uploadContent.querySelector('.remove-file');
            if (removeButton) {
                removeButton.addEventListener('click', () => {
                    this.formData.lampiran = null;
                    this.renderFileUpload();
                });
            }
        }
    },

    renderFileUpload() {
        const uploadContent = document.querySelector('.upload-content');
        if (uploadContent) {
            uploadContent.innerHTML = `
                <div class="upload-icon-container">
                    <span class="material-icons-round upload-icon">cloud_upload</span>
                </div>
                <div class="upload-text">
                    <p class="upload-title">Drag and drop files or</p>
                    <button type="button" class="browse-button">Browse files</button>
                </div>
                <p class="upload-hint">Supported formats: JPEG, PNG, PDF (Max 5MB)</p>
            `;

            const browseButton = uploadContent.querySelector('.browse-button');
            const fileInput = document.querySelector('#fileInput');
            if (browseButton && fileInput) {
                browseButton.addEventListener('click', () => fileInput.click());
            }
        }
    },

    cleanup() {
        const form = document.querySelector('#laporan-form');
        const fileInput = document.querySelector('#fileInput');
        const dropZone = document.querySelector('#dropZone');
        const dateInput = document.querySelector('#tanggalKejadian');
        const infraSelect = document.querySelector('#jenisInfrastruktur');
        const infoIcon = document.querySelector('#infoIcon');
        
        if (form) {
            form.removeEventListener('submit', this.handleSubmit);
        }
        
        if (fileInput) {
            fileInput.removeEventListener('change', this.handleFileChange);
        }
        
        if (dropZone) {
            dropZone.removeEventListener('dragover', () => {});
            dropZone.removeEventListener('dragleave', () => {});
            dropZone.removeEventListener('drop', () => {});
        }
        
        if (dateInput) {
            dateInput.removeEventListener('change', () => {});
        }

        if (infraSelect) {
            infraSelect.removeEventListener('change', () => {});
        }

        if (infoIcon) {
            infoIcon.removeEventListener('mouseenter', () => {});
            infoIcon.removeEventListener('mouseleave', () => {});
        }
    }
};

export default PelaporanPage;
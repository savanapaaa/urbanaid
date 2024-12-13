// src/pages/Admin/ManagementAdmin.js
import Sidebar from '../../components/admin/Sidebar.js';
import Swal from 'sweetalert2';
import '../../styles/admin.css';

const ManagementAdmin = {
    admins: [],

    async init() {
        try {
            await this.render();
            await this.loadAdmins();
            Sidebar.afterRender();
            this.initializeEventListeners();
        } catch (error) {
            this.showErrorAlert('Gagal memuat halaman', error);
        }
    },

    async loadAdmins() {
        try {
            const admins = [
                {
                    id: 'A001',
                    nama: 'Admin Satu',
                    email: 'admin1@example.com',
                    password: '$2y$10$9oBmfNm5Y1VZ9R7T6G5hAOOQGY5ZcyfUKf.SHR5jU0bNth8jNgb3a',
                },
                {
                    id: 'A002',
                    nama: 'Admin Dua',
                    email: 'admin2@example.com',
                    password: '$2y$10$R8zQ2W1X3Y4Z5V6B7N8M9PQRST0UVWXYZ12345678901234567890',
                }
            ];

            this.admins = admins;
            this.updateAdminsTable(admins);
        } catch (error) {
            this.showErrorAlert('Gagal memuat admin', error);
        }
    },

    updateAdminsTable(admins) {
        const tbody = document.querySelector('#admins-table tbody');
        if (!tbody) return;

        const searchTerm = document.getElementById('searchInput').value.toLowerCase();

        const filteredAdmins = admins.filter(admin => 
            Object.values(admin).some(value => 
                value.toString().toLowerCase().includes(searchTerm)
            )
        );

        tbody.innerHTML = filteredAdmins.map(admin => `
            <tr class="border-b border-gray-200 hover:bg-gray-50">
                <td class="px-6 py-4 text-[#002F35] whitespace-nowrap">${admin.id}</td>
                <td class="px-6 py-4 text-[#002F35] whitespace-nowrap">${admin.nama}</td>
                <td class="px-6 py-4 text-[#002F35] whitespace-nowrap">${admin.email}</td>
                <td class="px-6 py-4 text-[#002F35] whitespace-nowrap">${admin.password.substring(0, 20)}...</td>
                <td class="px-6 py-4 text-[#002F35] whitespace-nowrap">
                    <div class="flex space-x-2">
                        <button 
                            class="edit-admin inline-flex items-center justify-center p-1.5 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600 transition-colors"
                            data-id="${admin.id}">
                            <span class="material-icons-round text-sm">edit</span>
                        </button>
                        <button 
                            class="delete-admin inline-flex items-center justify-center p-1.5 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
                            data-id="${admin.id}">
                            <span class="material-icons-round text-sm">delete</span>
                        </button>
                    </div>
                </td>
            </tr>
        `).join('');
    },

    initializeEventListeners() {
        document.getElementById('searchInput')?.addEventListener('input', () => {
            this.loadAdmins();
        });

        document.getElementById('addAdminBtn')?.addEventListener('click', () => {
            this.showAddAdminModal();
        });

        document.querySelector('#admins-table tbody')?.addEventListener('click', (e) => {
            const editBtn = e.target.closest('.edit-admin');
            const deleteBtn = e.target.closest('.delete-admin');

            if (editBtn) {
                const adminId = editBtn.getAttribute('data-id');
                this.showEditAdminModal(adminId);
            }

            if (deleteBtn) {
                const adminId = deleteBtn.getAttribute('data-id');
                this.confirmDeleteAdmin(adminId);
            }
        });
    },

    showAddAdminModal() {
        Swal.fire({
            title: 'Tambah Admin Baru',
            html: `
                <input id="swal-input-name" class="swal2-input" placeholder="Nama Lengkap" required>
                <input id="swal-input-email" type="email" class="swal2-input" placeholder="Email" required>
                <input id="swal-input-password" type="password" class="swal2-input" placeholder="Password" required>
            `,
            focusConfirm: false,
            preConfirm: () => {
                const nama = document.getElementById('swal-input-name').value;
                const email = document.getElementById('swal-input-email').value;
                const password = document.getElementById('swal-input-password').value;

                if (!nama || !email || !password) {
                    Swal.showValidationMessage('Semua field harus diisi');
                    return false;
                }

                return { nama, email, password };
            }
        }).then((result) => {
            if (result.isConfirmed) {
                this.addAdmin(result.value);
            }
        });
    },

    addAdmin(adminData) {
        const newAdmin = {
            id: `A${(this.admins.length + 1).toString().padStart(3, '0')}`,
            ...adminData,
            password: this.hashPassword(adminData.password)
        };

        this.admins.push(newAdmin);
        this.updateAdminsTable(this.admins);
        this.showSuccessAlert('Admin berhasil ditambahkan');
    },

    showEditAdminModal(adminId) {
        const admin = this.admins.find(a => a.id === adminId);
        
        if (!admin) return;

        Swal.fire({
            title: 'Edit Admin',
            html: `
                <input id="swal-input-name" class="swal2-input" placeholder="Nama Lengkap" value="${admin.nama}" required>
                <input id="swal-input-email" type="email" class="swal2-input" placeholder="Email" value="${admin.email}" required>
                <input id="swal-input-password" type="password" class="swal2-input" placeholder="Password Baru (kosongkan jika tidak ingin mengubah)">
            `,
            focusConfirm: false,
            preConfirm: () => {
                const nama = document.getElementById('swal-input-name').value;
                const email = document.getElementById('swal-input-email').value;
                const password = document.getElementById('swal-input-password').value;

                if (!nama || !email) {
                    Swal.showValidationMessage('Nama dan Email wajib diisi');
                    return false;
                }

                return { nama, email, password };
            }
        }).then((result) => {
            if (result.isConfirmed) {
                this.updateAdmin(adminId, result.value);
            }
        });
    },

    updateAdmin(adminId, adminData) {
        const adminIndex = this.admins.findIndex(a => a.id === adminId);
        if (adminIndex !== -1) {
            const updatedAdmin = { ...this.admins[adminIndex], ...adminData };
            if (adminData.password) {
                updatedAdmin.password = this.hashPassword(adminData.password);
            }
            this.admins[adminIndex] = updatedAdmin;
            this.updateAdminsTable(this.admins);
            this.showSuccessAlert('Admin berhasil diperbarui');
        }
    },

    confirmDeleteAdmin(adminId) {
        Swal.fire({
            title: 'Konfirmasi Hapus',
            text: `Apakah Anda yakin ingin menghapus admin ini?`,
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Ya, Hapus',
            cancelButtonText: 'Batal'
        }).then((result) => {
            if (result.isConfirmed) {
                this.deleteAdmin(adminId);
            }
        });
    },

    deleteAdmin(adminId) {
        this.admins = this.admins.filter(admin => admin.id !== adminId);
        this.updateAdminsTable(this.admins);
        this.showSuccessAlert('Admin berhasil dihapus');
    },

    showSuccessAlert(message) {
        Swal.fire({
            icon: 'success',
            title: 'Sukses!',
            text: message,
            timer: 2000,
            timerProgressBar: true
        });
    },

    showErrorAlert(title, error) {
        Swal.fire({
            icon: 'error',
            title: title,
            text: error.message || 'Terjadi kesalahan',
            confirmButtonText: 'OK'
        });
        console.error(error);
    },

    hashPassword(password) {
        return `$2y$10$${btoa(password).substring(0, 60)}`;
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
                        <div class="p-6 border-b flex justify-between items-center">
                            <h1 class="text-xl lg:text-2xl font-bold text-[#002F35]">Manajemen Admin</h1>
                            <button 
                                id="addAdminBtn" 
                                class="px-4 py-2 bg-[#002F35] text-white rounded-lg hover:bg-opacity-90 transition-colors">
                                Tambah Admin
                            </button>
                        </div>

                        <!-- Filters Section -->
                        <div class="p-6 border-b">
                            <div class="flex flex-col lg:flex-row gap-4 lg:items-center lg:justify-between">
                                <div class="relative">
                                    <input type="text" 
                                           id="searchInput"
                                           placeholder="Cari admin..." 
                                           class="pl-10 pr-4 py-2 border rounded-lg w-full lg:w-64">
                                    <span class="material-icons-round absolute left-3 top-2.5 text-gray-400">search</span>
                                </div>
                            </div>
                        </div>

                        <!-- Table Section -->
                        <div class="overflow-x-auto p-6">
                            <table id="admins-table" class="w-full table-auto">
                                <thead class="bg-gray-50">
                                    <tr class="text-left text-sm font-medium text-[#002F35] border-b">
                                        <th class="px-6 py-4 whitespace-nowrap">ID</th>
                                        <th class="px-6 py-4 whitespace-nowrap">Nama</th>
                                        <th class="px-6 py-4 whitespace-nowrap">Email</th>
                                        <th class="px-6 py-4 whitespace-nowrap">Password Hash</th>
                                        <th class="px-6 py-4 whitespace-nowrap">Aksi</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <!-- Data akan dimuat di sini -->
                                </tbody>
                            </table>
                        </div>

                        <!-- Pagination Section -->
                        <div class="p-6 border-t">
                            <div class="flex flex-col lg:flex-row items-center justify-between gap-4">
                                <div class="text-sm text-[#002F35]">
                                    Menampilkan semua admin
                                </div>
                            </div>
                        </div>
                    </div>
                </main>
            </div>
        `;
    }
};

export default ManagementAdmin;
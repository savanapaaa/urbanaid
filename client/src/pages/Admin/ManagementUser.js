// src/pages/Admin/ManagementUser.js
import Sidebar from '../../components/admin/Sidebar.js';
import Swal from 'sweetalert2';
import '../../styles/admin.css';

const ManagementUser = {
    users: [],

    async init() {
        try {
            await this.render();
            await this.loadUsers();
            Sidebar.afterRender();
            this.initializeEventListeners();
        } catch (error) {
            this.showErrorAlert('Gagal memuat halaman', error);
        }
    },

    async loadUsers() {
        try {
            const users = [
                {
                    id: 'U001',
                    nama: 'John Doe',
                    email: 'john.doe@example.com',
                    password: '$2y$10$9oBmfNm5Y1VZ9R7T6G5hAOOQGY5ZcyfUKf.SHR5jU0bNth8jNgb3a',
                },
                {
                    id: 'U002',
                    nama: 'Jane Smith',
                    email: 'jane.smith@example.com',
                    password: '$2y$10$R8zQ2W1X3Y4Z5V6B7N8M9PQRST0UVWXYZ12345678901234567890',
                },
                {
                    id: 'U003',
                    nama: 'Alice Johnson',
                    email: 'alice.johnson@example.com',
                    password: '$2y$10$K9jL8mN7O6P5Q4R3S2T1UVWXYZ0123456789ABCDEFGHIJKLMNOPQR',
                }
            ];

            this.users = users;
            this.updateUsersTable(users);
        } catch (error) {
            this.showErrorAlert('Gagal memuat pengguna', error);
        }
    },

    updateUsersTable(users) {
        const tbody = document.querySelector('#users-table tbody');
        if (!tbody) return;

        const searchTerm = document.getElementById('searchInput').value.toLowerCase();

        const filteredUsers = users.filter(user => 
            Object.values(user).some(value => 
                value.toString().toLowerCase().includes(searchTerm)
            )
        );

        tbody.innerHTML = filteredUsers.map(user => `
            <tr class="border-b border-gray-200 hover:bg-gray-50">
                <td class="px-6 py-4 text-[#002F35] whitespace-nowrap">${user.id}</td>
                <td class="px-6 py-4 text-[#002F35] whitespace-nowrap">${user.nama}</td>
                <td class="px-6 py-4 text-[#002F35] whitespace-nowrap">${user.email}</td>
                <td class="px-6 py-4 text-[#002F35] whitespace-nowrap">${user.password.substring(0, 20)}...</td>
                <td class="px-6 py-4 text-[#002F35] whitespace-nowrap">
                    <div class="flex space-x-2">
                        <button 
                            class="edit-user inline-flex items-center justify-center p-1.5 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600 transition-colors"
                            data-id="${user.id}">
                            <span class="material-icons-round text-sm">edit</span>
                        </button>
                        <button 
                            class="delete-user inline-flex items-center justify-center p-1.5 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
                            data-id="${user.id}">
                            <span class="material-icons-round text-sm">delete</span>
                        </button>
                    </div>
                </td>
            </tr>
        `).join('');
    },

    initializeEventListeners() {
        document.getElementById('searchInput')?.addEventListener('input', () => {
            this.loadUsers();
        });

        document.querySelector('#users-table tbody')?.addEventListener('click', (e) => {
            const editBtn = e.target.closest('.edit-user');
            const deleteBtn = e.target.closest('.delete-user');

            if (editBtn) {
                const userId = editBtn.getAttribute('data-id');
                this.showEditUserModal(userId);
            }

            if (deleteBtn) {
                const userId = deleteBtn.getAttribute('data-id');
                this.confirmDeleteUser(userId);
            }
        });
    },

    showEditUserModal(userId) {
        const user = this.users.find(u => u.id === userId);
        
        if (!user) return;

        Swal.fire({
            title: 'Edit Pengguna',
            html: `
                <input id="swal-input-name" class="swal2-input" placeholder="Nama Lengkap" value="${user.nama}" required>
                <input id="swal-input-email" type="email" class="swal2-input" placeholder="Email" value="${user.email}" required>
            `,
            focusConfirm: false,
            preConfirm: () => {
                const nama = document.getElementById('swal-input-name').value;
                const email = document.getElementById('swal-input-email').value;

                if (!nama || !email) {
                    Swal.showValidationMessage('Nama dan Email wajib diisi');
                    return false;
                }

                return { nama, email };
            }
        }).then((result) => {
            if (result.isConfirmed) {
                this.updateUser(userId, result.value);
            }
        });
    },

    updateUser(userId, userData) {
        const userIndex = this.users.findIndex(u => u.id === userId);
        if (userIndex !== -1) {
            this.users[userIndex] = { ...this.users[userIndex], ...userData };
            this.updateUsersTable(this.users);
            this.showSuccessAlert('Pengguna berhasil diperbarui');
        }
    },

    confirmDeleteUser(userId) {
        Swal.fire({
            title: 'Konfirmasi Hapus',
            text: `Apakah Anda yakin ingin menghapus pengguna ini?`,
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Ya, Hapus',
            cancelButtonText: 'Batal'
        }).then((result) => {
            if (result.isConfirmed) {
                this.deleteUser(userId);
            }
        });
    },

    deleteUser(userId) {
        this.users = this.users.filter(user => user.id !== userId);
        this.updateUsersTable(this.users);
        this.showSuccessAlert('Pengguna berhasil dihapus');
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
                            <h1 class="text-xl lg:text-2xl font-bold text-[#002F35]">Manajemen Pengguna</h1>
                        </div>

                        <!-- Filters Section -->
                        <div class="p-6 border-b">
                            <div class="flex flex-col lg:flex-row gap-4 lg:items-center lg:justify-between">
                                <div class="relative">
                                    <input type="text" 
                                           id="searchInput"
                                           placeholder="Cari pengguna..." 
                                           class="pl-10 pr-4 py-2 border rounded-lg w-full lg:w-64">
                                    <span class="material-icons-round absolute left-3 top-2.5 text-gray-400">search</span>
                                </div>
                            </div>
                        </div>

                        <!-- Table Section -->
                        <div class="overflow-x-auto p-6">
                            <table id="users-table" class="w-full table-auto">
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
                                    Menampilkan 1-3 dari 3 pengguna
                                </div>
                                <div class="flex gap-2">
                                    <button class="px-3 py-1 border rounded hover:bg-gray-50 text-sm text-[#002F35]" disabled>Previous</button>
                                    <button class="px-3 py-1 bg-[#002F35] text-white rounded hover:bg-opacity-90 text-sm">1</button>
                                    <button class="px-3 py-1 border rounded hover:bg-gray-50 text-sm text-[#002F35]" disabled>Next</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </main>
            </div>
        `;
    }
};

export default ManagementUser;
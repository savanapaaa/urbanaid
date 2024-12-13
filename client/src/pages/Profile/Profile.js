const Profile = {
    user: {
        name: 'Ahmad Sudirman',
        email: 'ahmad.sudirman@email.com',
        stats: {
            totalReports: 12,
            resolved: 8,
            inProgress: 4
        }
    },

    validatePassword(password) {
        const minLength = 8;
        const hasUpperCase = /[A-Z]/.test(password);
        const hasLowerCase = /[a-z]/.test(password);
        const hasNumbers = /\d/.test(password);
        const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);

        const errors = [];
        
        if (password.length < minLength) {
            errors.push('Password minimal 8 karakter');
        }
        if (!hasUpperCase) {
            errors.push('Password harus memiliki huruf kapital');
        }
        if (!hasLowerCase) {
            errors.push('Password harus memiliki huruf kecil');
        }
        if (!hasNumbers) {
            errors.push('Password harus memiliki angka');
        }
        if (!hasSpecialChar) {
            errors.push('Password harus memiliki karakter khusus');
        }

        return errors;
    },

    render() {
        return `
            <div class="w-full max-w-4xl mx-auto p-4 space-y-6 fade-in">
                <!-- Profile Card -->
                <div class="w-full bg-gradient-to-r from-[#00899B] to-[#002F35] rounded-lg shadow-lg p-8 relative">
                    <!-- Profile Info -->
                    <div class="flex flex-col items-center justify-center">
                        <div class="relative mb-4">
                            <div class="w-24 h-24 rounded-full bg-white/10 flex items-center justify-center">
                                <span class="material-icons-round" style="font-size: 52px; color: #ffffff;">account_circle</span>
                            </div>                            
                            <button id="changeAvatarBtn" class="absolute bottom-0 right-0 bg-white rounded-full p-1 shadow-lg hover:bg-gray-100 transition-all">
                                <span class="material-icons-round text-[#00899B]">photo_camera</span>
                            </button>
                        </div>
                        <h2 class="text-2xl font-bold text-white mb-1">${this.user.name}</h2>
                        <p class="text-gray-200">${this.user.email}</p>
                    </div>

                    <!-- Stats -->
                    <div class="grid grid-cols-3 gap-4 mt-8 text-center">
                        <div class="bg-white/10 rounded-lg p-4">
                            <p class="text-2xl font-bold text-white">${this.user.stats.totalReports}</p>
                            <p class="text-sm text-gray-200">Laporan</p>
                        </div>
                        <div class="bg-white/10 rounded-lg p-4">
                            <p class="text-2xl font-bold text-white">${this.user.stats.resolved}</p>
                            <p class="text-sm text-gray-200">Terselesaikan</p>
                        </div>
                        <div class="bg-white/10 rounded-lg p-4">
                            <p class="text-2xl font-bold text-white">${this.user.stats.inProgress}</p>
                            <p class="text-sm text-gray-200">Diproses</p>
                        </div>
                    </div>
                </div>

                <!-- Edit Form -->
                <div class="w-full bg-white rounded-lg shadow-lg">
                    <div class="p-6">
                        <h3 class="text-xl font-semibold text-[#002F35] mb-6">Pengaturan Profil</h3>
                        
                        <form id="editProfileForm" class="space-y-6">
                            <div class="form-group">
                                <label for="name" class="form-label">Nama</label>
                                <input type="text" id="name" name="name" value="${this.user.name}"
                                       class="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-[#00899B] focus:border-transparent">
                            </div>

                            <div class="form-group">
                                <label for="email" class="form-label">Email</label>
                                <input type="email" id="email" name="email" value="${this.user.email}"
                                       class="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-[#00899B] focus:border-transparent">
                            </div>

                            <div class="form-group">
                                <label for="newPassword" class="form-label">Password Baru</label>
                                <div class="relative">
                                    <input type="password" id="newPassword" name="newPassword" 
                                           placeholder="Masukkan password baru"
                                           class="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-[#00899B] focus:border-transparent">
                                    <button type="button" class="toggle-password absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700">
                                        <span class="material-icons-round text-xl">visibility_off</span>
                                    </button>
                                </div>
                                <p class="mt-2 text-sm text-gray-500">
                                    Password harus memiliki minimal 8 karakter, huruf kapital, huruf kecil, angka, dan karakter khusus
                                </p>
                            </div>

                            <div class="form-group">
                                <label for="confirmPassword" class="form-label">Konfirmasi Password</label>
                                <div class="relative">
                                    <input type="password" id="confirmPassword" name="confirmPassword" 
                                           placeholder="Konfirmasi password baru"
                                           class="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-[#00899B] focus:border-transparent">
                                    <button type="button" class="toggle-password absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700">
                                        <span class="material-icons-round text-xl">visibility_off</span>
                                    </button>
                                </div>
                            </div>

                            <div class="flex justify-end">
                                <button type="submit" class="px-6 py-2 bg-gradient-to-r from-[#00899B] to-[#002F35] text-white rounded-lg hover:shadow-lg transition-shadow">
                                    Simpan Perubahan
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        `;
    },

    showPasswordValidationModal(password) {
        const errors = this.validatePassword(password);
        if (errors.length > 0) {
            const errorList = errors.map(error => `<li class="mb-2">❌ ${error}</li>`).join('');
            Swal.fire({
                title: 'Password tidak memenuhi syarat',
                html: `<ul class="text-left mt-4">${errorList}</ul>`,
                icon: 'error',
                confirmButtonText: 'OK',
                confirmButtonColor: '#00899B'
            });
            return false;
        }
        return true;
    },

    handleAvatarChange() {
        const fileInput = document.createElement('input');
        fileInput.type = 'file';
        fileInput.accept = 'image/*';
        fileInput.style.display = 'none';
        document.body.appendChild(fileInput);

        fileInput.addEventListener('change', (e) => {
            const file = e.target.files[0];
            if (file) {
                const maxSize = 5 * 1024 * 1024; // 5MB
                if (file.size > maxSize) {
                    Swal.fire({
                        title: 'Error!',
                        text: 'Ukuran file tidak boleh lebih dari 5MB',
                        icon: 'error',
                        confirmButtonText: 'OK',
                        confirmButtonColor: '#00899B'
                    });
                    return;
                }

                const validTypes = ['image/jpeg', 'image/png', 'image/jpg'];
                if (!validTypes.includes(file.type)) {
                    Swal.fire({
                        title: 'Error!',
                        text: 'File harus berformat JPG atau PNG',
                        icon: 'error',
                        confirmButtonText: 'OK',
                        confirmButtonColor: '#00899B'
                    });
                    return;
                }

                Swal.fire({
                    title: 'Konfirmasi',
                    text: 'Anda yakin ingin mengubah foto profil?',
                    icon: 'question',
                    showCancelButton: true,
                    confirmButtonText: 'Ya, Ubah',
                    cancelButtonText: 'Batal',
                    confirmButtonColor: '#00899B',
                    cancelButtonColor: '#6B7280'
                }).then((result) => {
                    if (result.isConfirmed) {
                        Swal.fire({
                            title: 'Berhasil!',
                            text: 'Foto profil berhasil diperbarui',
                            icon: 'success',
                            confirmButtonText: 'OK',
                            confirmButtonColor: '#00899B'
                        });
                    }
                });
            }
            fileInput.remove();
        });

        fileInput.click();
    },

    handlePasswordVisibility() {
        document.querySelectorAll('.toggle-password').forEach(button => {
            button.addEventListener('click', (e) => {
                const input = e.currentTarget.parentElement.querySelector('input');
                const icon = e.currentTarget.querySelector('.material-icons-round');
                
                if (input.type === 'password') {
                    input.type = 'text';
                    icon.textContent = 'visibility';
                } else {
                    input.type = 'password';
                    icon.textContent = 'visibility_off';
                }
            });
        });
    },

    async handleSubmit(e) {
        e.preventDefault();
        const formData = new FormData(e.target);
        const data = Object.fromEntries(formData.entries());

        const changes = [];
        if (data.name !== this.user.name) changes.push('nama');
        if (data.email !== this.user.email) changes.push('email');
        if (data.newPassword) changes.push('password');

        if (changes.length === 0) {
            Swal.fire({
                title: 'Tidak ada perubahan',
                text: 'Anda belum melakukan perubahan apapun',
                icon: 'info',
                confirmButtonText: 'OK',
                confirmButtonColor: '#00899B'
            });
            return;
        }

        if (data.newPassword || data.confirmPassword) {
            if (data.newPassword) {
                if (!this.showPasswordValidationModal(data.newPassword)) {
                    return;
                }
            }

            if (data.newPassword !== data.confirmPassword) {
                Swal.fire({
                    title: 'Error!',
                    text: 'Password tidak cocok',
                    icon: 'error',
                    confirmButtonText: 'OK',
                    confirmButtonColor: '#00899B'
                });
                return;
            }
        }

        const changesText = changes.join(', ');
        const result = await Swal.fire({
            title: 'Konfirmasi Perubahan',
            text: `Anda yakin ingin mengubah ${changesText}?`,
            icon: 'question',
            showCancelButton: true,
            confirmButtonText: 'Ya, Ubah',
            cancelButtonText: 'Batal',
            confirmButtonColor: '#00899B',
            cancelButtonColor: '#6B7280'
        });

        if (result.isConfirmed) {
            Swal.fire({
                title: 'Memproses...',
                text: 'Sedang memperbarui data profil',
                allowOutsideClick: false,
                allowEscapeKey: false,
                showConfirmButton: false,
                willOpen: () => {
                    Swal.showLoading();
                }
            });

            try {
                await new Promise(resolve => setTimeout(resolve, 1000));

                this.user.name = data.name;
                this.user.email = data.email;

                await Swal.fire({
                    title: 'Berhasil!',
                    text: 'Profil berhasil diperbarui',
                    icon: 'success',
                    confirmButtonText: 'OK',
                    confirmButtonColor: '#00899B'
                });

                const nameDisplay = document.querySelector('.text-2xl.font-bold.text-white');
                const emailDisplay = document.querySelector('.text-gray-200');
                if (nameDisplay) nameDisplay.textContent = data.name;
                if (emailDisplay) emailDisplay.textContent = data.email;

                document.getElementById('newPassword').value = '';
                document.getElementById('confirmPassword').value = '';
                
                document.querySelectorAll('.toggle-password .material-icons-round').forEach(icon => {
                    icon.textContent = 'visibility_off';
                });
                document.querySelectorAll('input[type="text"]').forEach(input => {
                    if (input.id === 'newPassword' || input.id === 'confirmPassword') {
                        input.type = 'password';
                    }
                });

            } catch (error) {
                Swal.fire({
                    title: 'Error!',
                    text: 'Terjadi kesalahan saat memperbarui profil',
                    icon: 'error',
                    confirmButtonText: 'OK',
                    confirmButtonColor: '#00899B'
                });
            }
        }
    },

    afterRender() {
        const changeAvatarBtn = document.getElementById('changeAvatarBtn');
        if (changeAvatarBtn) {
            changeAvatarBtn.addEventListener('click', () => this.handleAvatarChange());
        }

        const form = document.getElementById('editProfileForm');
        if (form) {
            form.addEventListener('submit', (e) => this.handleSubmit(e));
        }

        this.handlePasswordVisibility();

        const nameInput = document.getElementById('name');
        const emailInput = document.getElementById('email');

        if (nameInput) {
            nameInput.addEventListener('input', (e) => {
                if (e.target.value.trim() === '') {
                    e.target.classList.add('border-red-500');
                    e.target.classList.remove('border-gray-300');
                } else {
                    e.target.classList.remove('border-red-500');
                    e.target.classList.add('border-gray-300');
                }
            });
        }

        if (emailInput) {
            emailInput.addEventListener('input', (e) => {
                const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                if (!emailRegex.test(e.target.value)) {
                    e.target.classList.add('border-red-500');
                    e.target.classList.remove('border-gray-300');
                } else {
                    e.target.classList.remove('border-red-500');
                    e.target.classList.add('border-gray-300');
                }
            });
        }

        const requiredInputs = form.querySelectorAll('input[required]');
        requiredInputs.forEach(input => {
            input.addEventListener('blur', (e) => {
                if (e.target.value.trim() === '') {
                    e.target.classList.add('border-red-500');
                    e.target.classList.remove('border-gray-300');
                } else {
                    e.target.classList.remove('border-red-500');
                    e.target.classList.add('border-gray-300');
                }
            });
        });
    },

    cleanup() {
        const changeAvatarBtn = document.getElementById('changeAvatarBtn');
        if (changeAvatarBtn) {
            changeAvatarBtn.removeEventListener('click', this.handleAvatarChange);
        }

        const form = document.getElementById('editProfileForm');
        if (form) {
            form.removeEventListener('submit', this.handleSubmit);
        }

        const toggleButtons = document.querySelectorAll('.toggle-password');
        toggleButtons.forEach(button => {
            button.removeEventListener('click', () => {});
        });

        const inputs = document.querySelectorAll('input');
        inputs.forEach(input => {
            input.removeEventListener('input', () => {});
            input.removeEventListener('blur', () => {});
        });

        const tempFileInputs = document.querySelectorAll('input[type="file"]');
        tempFileInputs.forEach(input => input.remove());
    }
};

export default Profile;
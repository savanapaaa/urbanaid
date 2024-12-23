# UrbanAID

UrbanAID adalah aplikasi web untuk pelaporan dan sosialisasi infrastruktur. Aplikasi ini memungkinkan pengguna untuk melaporkan masalah infrastruktur dan mengakses konten edukasi tentang infrastruktur.

## Features

### User Features
Otentikasi pengguna (login/registrasi)
Sistem pelaporan infrastruktur
Pelacakan laporan aktif
Riwayat laporan
Profil pengguna
Artikel edukasi
Sumber belajar tentang infrastruktur

### Admin Features
Mengelola laporan masuk
Menangani ulasan laporan
Manajemen pengguna
Manajemen admin (super admin)
Dashboard statistik
## Tech Stack

### Frontend
- JavaScript (Vanilla)
- Tailwind CSS
- Webpack
- PWA Support
- Jest for testing

### Backend
- Node.js
- Hapi.js
- PostgreSQL
- JWT Authentication
- Jest for testing

## API Documentation
https://urbanaid-api.vercel.app/

## Setup Instructions

### Frontend Setup
1. Navigate to the client directory:
```bash
cd client
```

2. Install dependencies:
```bash
npm install
```

3. Run development server:
```bash
npm run start-dev
```

4. Build for production:
```bash
npm run build
```

### Backend Setup
1. Navigate to the server directory:
```bash
cd server
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
```bash
cp .env.example .env
```

4. Create database and run migrations:
```bash
# Create your PostgreSQL database and update .env file
```

5. Create super admin (optional):
```bash
npm run create-superadmin
```

6. Run development server:
```bash
npm run dev
```

## Testing

### Frontend Tests
```bash
cd client
npm test
```

### Backend Tests
```bash
cd server
npm test
```

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

ISC License

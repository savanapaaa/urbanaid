import HomePage from "../pages/Dashboard/Home";
import ArticlePage from "../pages/Dashboard/Article";
import PelaporanPage from "../pages/Dashboard/Pelaporan";
import DetailLaporan from "../pages/Reports/DetailLaporan";
import TentangKami from "../pages/Dashboard/TentangKami";
import RegisterPage from "../pages/register";
import LoginPage from "../pages/login";
// Import halaman admin
import AdminPage from "../pages/Admin/Admin";
import DetailAdmin from "../pages/Admin/DetailAdmin";
import RiwayatAdmin from "../pages/Admin/RiwayatAdmin";

const routes = {
  "/": HomePage,
  "/artikel": ArticlePage,
  "/pelaporan": PelaporanPage,
  "/pelaporan/beranda": PelaporanPage,
  "/pelaporan/laporanaktif": PelaporanPage,
  "/pelaporan/riwayat": PelaporanPage,
  "/pelaporan/profile": PelaporanPage,
  "/pelaporan/riwayat/:id": DetailLaporan,
  "/tentang-kami": TentangKami,
  "/register": RegisterPage,
  '/login': LoginPage,
  // Tambahkan route untuk admin
  "/admin": AdminPage,
  "/admin/laporan/:id": DetailAdmin,
  "/admin/riwayat": RiwayatAdmin,
};

export default routes;
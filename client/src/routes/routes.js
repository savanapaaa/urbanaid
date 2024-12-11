import HomePage from "../pages/Dashboard/Home";
import ArticlePage from "../pages/Dashboard/Article";
import PelaporanPage from "../pages/Dashboard/Pelaporan";
import DetailLaporan from "../pages/Reports/DetailLaporan";
import TentangKami from "../pages/Dashboard/TentangKami";
import RegisterPage from "../pages/register";

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
};

export default routes;

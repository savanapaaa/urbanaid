import HomePage from '../pages/Dashboard/Home';
import ArticlePage from '../pages/Dashboard/Article';
import PelaporanPage from '../pages/Dashboard/Pelaporan';
import DetailLaporan from '../pages/Reports/DetailLaporan';
import TentangKami from '../pages/Dashboard/TentangKami';


const routes = {
    '/': HomePage,
    '/artikel': ArticlePage,
    '/pelaporan': PelaporanPage,
    '/pelaporan/beranda': PelaporanPage,
    '/pelaporan/laporanaktif': PelaporanPage,
    '/pelaporan/riwayat': PelaporanPage,
    '/pelaporan/profile': PelaporanPage,
    '/pelaporan/riwayat/:id': DetailLaporan,
    '/tentang-kami': TentangKami,
};

export default routes;
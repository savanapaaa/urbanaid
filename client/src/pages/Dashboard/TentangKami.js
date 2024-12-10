import { Navbar } from '../../components/common/Navbar';
import { Footer } from '../../components/common/Footer';

const TentangKami = {
    render() {
        return `
            ${Navbar()}
            <main>
                <div class="about-container">
                    <div class="about-header">
                        <h1 class="about-title">Apa Itu UrbanAid?</h1>
                    </div>
                    
                    <div class="about-content">
                        <p class="about-text">
                            UrbanAid adalah sebuah aplikasi berbasis teknologi yang dirancang untuk menjadi solusi praktis dalam menangani pelaporan kerusakan infrastruktur. Dengan UrbanAid, pengguna dapat dengan mudah melaporkan kondisi infrastruktur yang rusak, seperti jalan berlubang, lampu jalan yang mati, atau jembatan yang rusak, secara real-time.
                        </p>
                        
                        <p class="about-text">
                            UrbanAid hadir untuk menjawab kebutuhan akan sistem pelaporan yang efisien, mendukung perbaikan infrastruktur lebih cepat, dan menciptakan lingkungan yang aman serta nyaman bagi masyarakat. Dengan UrbanAid, setiap warga dapat berkontribusi dalam menjaga kualitas infrastruktur di lingkungan mereka.
                        </p>
                    </div>

                    <div class="contact-section">
                        <h2 class="contact-title">Hubungi Kami</h2>
                        <div class="contact-content">
                            <div class="contact-items">
                                <div class="contact-item">
                                    <span class="material-icons-round">location_on</span>
                                    <div class="contact-text">
                                        <h3>Alamat</h3>
                                        <p>Jl. Raya Puputan No. 86, Denpasar, Bali</p>
                                    </div>
                                </div>
                                
                                <div class="contact-item">
                                    <span class="material-icons-round">email</span>
                                    <div class="contact-text">
                                        <h3>Email</h3>
                                        <p>contact@urbanaid.id</p>
                                    </div>
                                </div>
                                
                                <div class="contact-item">
                                    <span class="material-icons-round">phone</span>
                                    <div class="contact-text">
                                        <h3>Telepon</h3>
                                        <p>+62 361 123456</p>
                                    </div>
                                </div>

                                <div class="contact-item">
                                    <span class="material-icons-round">schedule</span>
                                    <div class="contact-text">
                                        <h3>Jam Kerja</h3>
                                        <p>Senin - Jumat: 08.00 - 17.00 WITA</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
            ${Footer()}
        `;
    },

    async init() {
        const app = document.getElementById('app');
        app.innerHTML = this.render();
    }
};

export default TentangKami;
/**
 * JURAGAN 77 RENTAL MOBIL MAKASSAR
 * Interactive Javascript Logic & WhatsApp Integration
 */

// Konfigurasi Kontak Juragan 77
const JURAGAN_CONFIG = {
  phoneDisplay: "0821-7121-1777",
  waNumber: "6282171211777", // Format internasional tanpa simbol
  email: "kontak@juragan77rental.com",
  officeAddress: "Jl. Perintis Kemerdekaan KM 18 (Dekat Bandara Sultan Hasanuddin), Makassar, Sulawesi Selatan",
  instagram: "@juragan77_rentalmakassar"
};

// Data Lengkap Armada Juragan 77 (15 Pilihan Armada Lengkap)
const FLEET_DATA = [
  {
    id: "alphard-modellista-2025",
    name: "NEW ALPHARD HYBRID MODELISTA 2025",
    year: "2025",
    category: "vip",
    badge: "VVIP Modellista",
    badgeClass: "badge-vip",
    image: "images/new_alphard_modellista.jpg",
    tagline: "Kasta Tertinggi VVIP 2025 dengan Aerokit Modellista & Pilot Seat Ottoman",
    specs: {
      seats: "6 - 7 Penumpang",
      transmission: "Automatic E-CVT",
      engine: "2.5L Hybrid EV",
      ac: "Nanoe-X Triple Zone AC",
      luggage: "5 Koper Mewah",
      fuel: "Bensin Hybrid"
    },
    priceLepasKunci: "Khusus + Driver",
    priceDriver: "Rp 3.000.000",
    priceDriverAllIn: "Rp 3.200.000",
    description: "Kasta kemewahan otomotif tertinggi model terbaru 2025. Dilengkapi aerokit Modellista original Jepang, panoramic roof, ambient lighting elegan, captain seat ottoman elektrik, dan suspensi ultra-senyap. Pilihan utama tamu negara, pejabat VVIP, direksi BUMN, dan acara pernikahan mewah di Makassar.",
    features: ["Modellista Bodykit Original", "Executive Ottoman Seats", "Power Window Sunshade", "Driver Berpakaian Formal & Berpengalaman"]
  },
  {
    id: "all-new-alphard",
    name: "ALL NEW ALPHARD",
    year: "2024",
    category: "vip",
    badge: "Executive VIP",
    badgeClass: "badge-vip",
    image: "images/alphard_vip.jpg",
    tagline: "Kemewahan Kelas Bisnis untuk Kunjungan Kerja & Sambutan Pejabat",
    specs: {
      seats: "7 Penumpang",
      transmission: "Automatic",
      engine: "2.5L Dual VVT-i",
      ac: "Triple Zone Auto AC",
      luggage: "5 Koper",
      fuel: "Bensin"
    },
    priceLepasKunci: "Khusus + Driver",
    priceDriver: "Rp 2.500.000",
    priceDriverAllIn: "Rp 2.700.000",
    description: "Toyota All New Alphard dengan interior mewah kelas eksekutif, kabin kedap suara, dan kursi pilot elektrik yang sangat nyaman. Layanan antar jemput prioritas Bandara Sultan Hasanuddin Makassar.",
    features: ["Captain Seat Elektrik", "Kabin Kedap Suara", "Konektivitas Audio Premium", "Driver Profesional 24 Jam"]
  },
  {
    id: "zenix-q-hybrid",
    name: "ZENIX Q HYBRID",
    year: "2024 - 2025",
    category: "mpv",
    badge: "Tipe Tertinggi",
    badgeClass: "badge-popular",
    image: "images/innova_zenix.jpg",
    tagline: "Varian Tertinggi Modellista dengan Captain Seat Ottoman & TSS Canggih",
    specs: {
      seats: "7 Penumpang",
      transmission: "Automatic 10-Speed CVT",
      engine: "2.0L M20A Hybrid",
      ac: "Dual Zone Digital AC",
      luggage: "4 Koper Besar",
      fuel: "Bensin Hybrid"
    },
    priceLepasKunci: "Rp 800.000",
    priceDriver: "Rp 1.000.000",
    priceDriverAllIn: "Rp 1.200.000",
    description: "Innova Zenix tipe tertinggi Q Hybrid Modellista. Dilengkapi jok captain seat elektrik dengan sandaran kaki ottoman, panoramic sunroof elektrik, Toyota Safety Sense (TSS), dan tenaga hybrid yang luar biasa senyap dan irit.",
    features: ["Captain Seat Ottoman Elektrik", "Panoramic Sunroof", "Toyota Safety Sense (TSS)", "Dual Zone Digital AC"]
  },
  {
    id: "zenix-v-hybrid",
    name: "ZENIX V HYBRID",
    year: "2024",
    category: "mpv",
    badge: "Hybrid Favorit",
    badgeClass: "badge-popular",
    image: "images/innova_zenix.jpg",
    tagline: "Kenyamanan Modern Berteknologi Hybrid Ramah Lingkungan & Bertenaga",
    specs: {
      seats: "7 Penumpang",
      transmission: "Automatic CVT",
      engine: "2.0L Hybrid EV",
      ac: "Dual Digital AC",
      luggage: "4 Koper",
      fuel: "Bensin Hybrid"
    },
    priceLepasKunci: "Rp 700.000",
    priceDriver: "Rp 900.000",
    priceDriverAllIn: "Rp 1.100.000",
    description: "Innova Zenix V Hybrid menyajikan kenyamanan platform TNGA terbaru dengan kabin lega dan suspensi empuk. Pilihan ideal untuk dinas luar kota dan perjalanan wisata Makassar ke Toraja.",
    features: ["Layar Sentuh 10 Inch", "Digital AC Depan & Belakang", "Suspensi TNGA Stabil", "Konsumsi BBM Super Irit"]
  },
  {
    id: "zenix-g-hybrid",
    name: "ZENIX G HYBRID",
    year: "2024",
    category: "mpv",
    badge: "Ekonomis Hybrid",
    badgeClass: "badge-popular",
    image: "images/innova_zenix.jpg",
    tagline: "Sensasi Berkendara Halus Platform TNGA dengan Tarif Sewa Lebih Terjangkau",
    specs: {
      seats: "7 Penumpang",
      transmission: "Automatic CVT",
      engine: "2.0L Hybrid EV",
      ac: "Digital AC Blower",
      luggage: "4 Koper",
      fuel: "Bensin Hybrid"
    },
    priceLepasKunci: "Rp 600.000",
    priceDriver: "Rp 800.000",
    priceDriverAllIn: "Rp 1.000.000",
    description: "Kombinasi efisiensi mesin hybrid generasi ke-5 dan kelegaan kabin Innova Zenix dengan harga harian yang sangat ramah anggaran.",
    features: ["Platform TNGA Senyap", "Transmisi CVT Responsif", "Rem Parkir Elektrik", "Kabin 7-Seater Lapang"]
  },
  {
    id: "fortuner-gr-28",
    name: "FORTUNER GR 2.8",
    year: "2024",
    category: "suv",
    badge: "Monster 2.8L",
    badgeClass: "badge-popular",
    image: "images/fortuner_gr.jpg",
    tagline: "SUV Gagah 2.800cc Turbo Diesel dengan Tampilan Wibawa & Bertenaga Buas",
    specs: {
      seats: "7 Penumpang",
      transmission: "Automatic 6-Speed",
      engine: "2.8L 1GD Diesel Turbo",
      ac: "Dual Zone Auto AC",
      luggage: "4 Koper Besar",
      fuel: "Solar / Dex"
    },
    priceLepasKunci: "Rp 900.000",
    priceDriver: "Rp 1.100.000",
    priceDriverAllIn: "Rp 1.300.000",
    description: "Toyota Fortuner GR Sport dengan mesin terkuat 2.800cc turbo diesel. Tampilan hitam pekat berwibawa, power backdoor kick sensor, dan suspensi kokoh melibas medan off-road maupun jalanan aspal Sulawesi.",
    features: ["Mesin 1GD 2.800cc Turbo", "Bodykit GR Sport Sporty", "Kamera 360 Derajat", "Power Backdoor Sensor"]
  },
  {
    id: "pajero-sport",
    name: "PAJERO SPORT",
    year: "2024",
    category: "suv",
    badge: "Power & Comfort",
    badgeClass: "badge-popular",
    image: "images/pajero_sport.jpg",
    tagline: "SUV Tangguh Sporty dengan Transmisi 8-Speed Halus & Sunroof",
    specs: {
      seats: "7 Penumpang",
      transmission: "Automatic 8-Speed",
      engine: "2.4L MIVEC Turbo Diesel",
      ac: "Dual Zone Climate AC",
      luggage: "4 Koper Besar",
      fuel: "Solar / Dex"
    },
    priceLepasKunci: "Rp 1.100.000",
    priceDriver: "Rp 1.200.000",
    priceDriverAllIn: "Rp 1.400.000",
    description: "Mitsubishi Pajero Sport Dakar dengan transmisi 8-speed yang bertenaga dan halus. Tangguh di tanjakan curam poros Camba-Toraja dan tetap nyaman untuk mobilisasi dinas di perkotaan.",
    features: ["Sunroof Mewah", "Mesin MIVEC Turbo Diesel", "Ground Clearance 218mm", "Kabin Senyap & Nyaman"]
  },
  {
    id: "innova-venturer",
    name: "INNOVA VENTURER",
    year: "2023 - 2024",
    category: "mpv",
    badge: "Sporty Premium",
    badgeClass: "badge-popular",
    image: "images/innova_venturer.jpg",
    tagline: "Varian Tertinggi Edisi Reborn dengan Captain Seat Kulit & Desain Agresif",
    specs: {
      seats: "7 Penumpang",
      transmission: "Automatic",
      engine: "2.4L Diesel / 2.0L",
      ac: "Auto Climate Dual AC",
      luggage: "4 Koper",
      fuel: "Solar / Bensin"
    },
    priceLepasKunci: "Rp 500.000",
    priceDriver: "Rp 700.000",
    priceDriverAllIn: "Rp 950.000",
    description: "Innova Venturer edisi hitam elegan dengan aksen garis merah sporty pada grille, pelek dual-tone hitam, jok kulit captain seat empuk, dan ambient lighting kabin yang hangat.",
    features: ["Captain Seat Kulit Asli", "Bodykit Venturer Sporty", "Ambient Interior Lighting", "Suspensi Sangat Nyaman"]
  },
  {
    id: "innova-reborn-facelift",
    name: "INNOVA REBORN FACELIFT",
    year: "2023 - 2024",
    category: "mpv",
    badge: "Favorit Keluarga",
    badgeClass: "badge-popular",
    image: "images/innova_reborn.jpg",
    tagline: "Legenda MPV Terandal Indonesia dengan Kabin Luas & Peredaman Terbaik",
    specs: {
      seats: "7 - 8 Penumpang",
      transmission: "Manual / Matic",
      engine: "2.0L Dual VVT-i",
      ac: "Dual Blower AC Dingin",
      luggage: "4 Koper",
      fuel: "Bensin"
    },
    priceLepasKunci: "Rp 450.000",
    priceDriver: "Rp 650.000",
    priceDriverAllIn: "Rp 850.000",
    description: "Toyota Innova Reborn Facelift terbukti paling nyaman dan bandel untuk perjalanan keliling Sulawesi Selatan. AC double blower dingin merata dan bagasi super lapang.",
    features: ["Kabin 7-8 Penumpang Luas", "AC Dingin Merata", "Audio Touchscreen Bluetooth", "Tarif Sewa Sangat Bersahabat"]
  },
  {
    id: "innova-reborn-diesel",
    name: "INNOVA REBORN FACELIFT 2.4",
    year: "2024",
    category: "mpv",
    badge: "Diesel Bertenaga",
    badgeClass: "badge-popular",
    image: "images/innova_reborn.jpg",
    tagline: "Torsi Badak Mesin 2.4 Diesel Turbo, Raja Tanjakan Lintas Sulawesi",
    specs: {
      seats: "7 - 8 Penumpang",
      transmission: "Automatic / Manual",
      engine: "2.4L 2GD-FTV Turbo Diesel",
      ac: "Dual Blower AC",
      luggage: "4 Koper",
      fuel: "Solar"
    },
    priceLepasKunci: "Rp 500.000",
    priceDriver: "Rp 700.000",
    priceDriverAllIn: "Rp 900.000",
    description: "Innova Reborn varian mesin diesel 2GD 2.400cc turbo. Torsi melimpah 360 Nm sangat bertenaga di jalur pegunungan Malino dan Toraja dengan efisiensi bahan bakar maksimal.",
    features: ["Mesin 2.4 Turbo Diesel Badak", "Torsi Melimpah & Irit Solar", "Eco & Power Driving Mode", "Kabin Super Nyaman"]
  },
  {
    id: "all-new-veloz-q",
    name: "ALL NEW VELOZ Q",
    year: "2024",
    category: "mpv",
    badge: "Modern Sporty",
    badgeClass: "badge-popular",
    image: "images/avanza_veloz.jpg",
    tagline: "Tipe Tertinggi Veloz dengan Rem Parkir Elektrik & Wireless Charger",
    specs: {
      seats: "7 Penumpang",
      transmission: "Automatic CVT",
      engine: "1.5L Dual VVT-i",
      ac: "Digital Dual AC",
      luggage: "3 Koper",
      fuel: "Bensin"
    },
    priceLepasKunci: "Rp 350.000",
    priceDriver: "Rp 550.000",
    priceDriverAllIn: "Rp 750.000",
    description: "Toyota All New Veloz tipe Q dengan desain sporty grill sarang lebah, rem parkir elektrik dengan auto brake hold, wireless charger, dan kabin fleksibel sofa mode.",
    features: ["Electric Parking Brake + Auto Hold", "Wireless Smartphone Charger", "Head Unit 9 inch", "Kabin Fleksibel Sofa Mode"]
  },
  {
    id: "new-avanza",
    name: "NEW AVANZA",
    year: "2024",
    category: "mpv",
    badge: "Ekonomis Lincah",
    badgeClass: "badge-popular",
    image: "images/avanza_veloz.jpg",
    tagline: "Mobil Keluarga Praktis, Irit Bahan Bakar & Handal Menembus Jalan Kota",
    specs: {
      seats: "7 Penumpang",
      transmission: "CVT / Manual",
      engine: "1.3L / 1.5L Dual VVT-i",
      ac: "Double Blower AC",
      luggage: "3 Koper",
      fuel: "Bensin"
    },
    priceLepasKunci: "Rp 350.000",
    priceDriver: "Rp 550.000",
    priceDriverAllIn: "Rp 750.000",
    description: "New Avanza generasi penggerak roda depan yang lebih empuk dan senyap. Solusi sewa mobil paling hemat untuk operasional bisnis, sales, dan jalan-jalan keluarga di Makassar.",
    features: ["Suspensi Baru Lebih Nyaman", "Konsumsi BBM Sangat Irit", "Kabin Lapang 7 Penumpang", "Perawatan Resmi Terjamin"]
  },
  {
    id: "honda-brio-rs",
    name: "HONDA BRIO RS",
    year: "2024",
    category: "city",
    badge: "City Car Sporty",
    badgeClass: "badge-popular",
    image: "images/avanza_veloz.jpg",
    tagline: "Hatchback Kompak & Lincah, Paling Praktis untuk Menembus Kemacetan",
    specs: {
      seats: "5 Penumpang",
      transmission: "Automatic CVT",
      engine: "1.2L i-VTEC",
      ac: "Digital AC Dingin",
      luggage: "2 Koper",
      fuel: "Bensin"
    },
    priceLepasKunci: "Rp 350.000",
    priceDriver: "Rp 550.000",
    priceDriverAllIn: "Rp 750.000",
    description: "Honda Brio tipe tertinggi RS dengan aksen grille sporty, kemudi ringan responsif, dan mudah diparkir di pusat perbelanjaan maupun kawasan kuliner padat Makassar.",
    features: ["Desain Brio RS Sporty", "Radius Putar Kecil & Lincah", "Audio Touchscreen Bluetooth", "Konsumsi BBM Ekstra Irit"]
  },
  {
    id: "hiace-premio",
    name: "HIACE PREMIO",
    year: "2024",
    category: "minibus",
    badge: "Minibus Mewah",
    badgeClass: "badge-popular",
    image: "images/hiace_premio_new.jpg",
    tagline: "Minibus Tour Wisata Berhidung Panjang, Plafon Tinggi & Kursi Super Lega",
    specs: {
      seats: "12 - 14 Penumpang",
      transmission: "Manual 6-Speed",
      engine: "2.8L GD Turbo Diesel",
      ac: "Individual AC Tiap Baris",
      luggage: "8 Koper Besar",
      fuel: "Solar / Dex"
    },
    priceLepasKunci: "Rp 1.100.000",
    priceDriver: "Rp 1.300.000",
    priceDriverAllIn: "Rp 1.500.000",
    description: "Toyota HiAce Premio berhidung panjang dengan kabin tinggi dan legroom sangat luas. Pilihan utama rombongan tour ke Tana Toraja, Malino, maupun Tanjung Bira. Dilengkapi audio karaoke, colokan charger HP di setiap kursi, dan AC dingin merata.",
    features: ["Kabin Lega Plafon Tinggi", "Seat Reclining Nyaman", "Audio System & Karaoke Mic", "Driver Wisata Paham Sejarah & Spot Foto"]
  },
  {
    id: "hiace-commuter",
    name: "HIACE COMMUTER",
    year: "2023 - 2024",
    category: "minibus",
    badge: "Kapasitas 16 Seat",
    badgeClass: "badge-popular",
    image: "images/hiace_commuter.jpg",
    tagline: "Muat Hingga 16 Penumpang, Sangat Pas untuk Rombongan Kantor & Majelis",
    specs: {
      seats: "15 - 16 Penumpang",
      transmission: "Manual",
      engine: "2.5L D-4D Turbo Diesel",
      ac: "AC Ducting Plafon Merata",
      luggage: "6 Koper",
      fuel: "Solar"
    },
    priceLepasKunci: "Rp 1.100.000",
    priceDriver: "Rp 1.200.000",
    priceDriverAllIn: "Rp 1.400.000",
    description: "Toyota HiAce Commuter dengan kapasitas hingga 16 kursi penumpang. Solusi transportasi rombongan keluarga besar, kunjungan kerja rombongan, dan acara wisuda dengan biaya per orang paling hemat.",
    features: ["Kapasitas Maksimal 16 Kursi", "AC Plafon Dingin Merata", "Kabin Bersih & Nyaman", "Sopir Berpengalaman Rombongan"]
  }
];

// Helper: Format WhatsApp URL
function createWhatsAppURL(message) {
  return `https://wa.me/${JURAGAN_CONFIG.waNumber}?text=${encodeURIComponent(message.trim())}`;
}

// Inisialisasi Saat DOM Siap
document.addEventListener("DOMContentLoaded", () => {
  renderFleetCards("all");
  setupFleetFilters();
  setupQuickBookingCalculator();
  setupFAQAccordion();
  setupNavigation();
  setupModalDetail();
  setupTourBookingButtons();
});

// 1. Render Kartu Armada Berdasarkan Filter Kategori
function renderFleetCards(filter = "all") {
  const container = document.getElementById("fleet-container");
  if (!container) return;

  const filtered = filter === "all" 
    ? FLEET_DATA 
    : FLEET_DATA.filter(car => car.category === filter);

  container.innerHTML = filtered.map(car => `
    <div class="car-card" data-category="${car.category}" data-id="${car.id}">
      <div class="car-image-box">
        <img src="${car.image}" alt="${car.name} Rental Makassar" class="car-image" loading="lazy">
        <span class="car-badge ${car.badgeClass}">${car.badge}</span>
        <span class="car-year">Tahun ${car.year}</span>
      </div>

      <div class="car-info">
        <h3 class="car-title">${car.name}</h3>
        <p class="car-type-desc">${car.tagline}</p>

        <div class="car-specs">
          <div class="spec-pill">
            <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 3c1.66 0 3 1.34 3 3s-1.34 3-3 3-3-1.34-3-3 1.34-3 3-3zm0 14.2c-2.5 0-4.71-1.28-6-3.22.03-1.99 4-3.08 6-3.08 1.99 0 5.97 1.09 6 3.08-1.29 1.94-3.5 3.22-6 3.22z"/></svg>
            <span>${car.specs.seats}</span>
          </div>
          <div class="spec-pill">
            <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2a10 10 0 100 20 10 10 0 000-20zm1 14.5V18h-2v-1.5a3.5 3.5 0 010-7V8h2v1.5a3.5 3.5 0 010 7z"/></svg>
            <span>${car.specs.transmission}</span>
          </div>
          <div class="spec-pill">
            <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor"><path d="M19.35 10.04C18.67 6.59 15.64 4 12 4 9.11 4 6.6 5.64 5.35 8.04 2.34 8.36 0 10.91 0 14c0 3.31 2.69 6 6 6h13c2.76 0 5-2.24 5-5 0-2.64-2.05-4.78-4.65-4.96z"/></svg>
            <span>${car.specs.ac}</span>
          </div>
          <div class="spec-pill">
            <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor"><path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z"/></svg>
            <span>${car.specs.fuel}</span>
          </div>
        </div>

        <div class="car-pricing-box">
          <div class="price-row">
            <span class="price-label">Lepas Kunci:</span>
            <span class="price-val ${car.priceLepasKunci !== 'Khusus + Driver' ? 'highlight' : ''}">${car.priceLepasKunci}</span>
          </div>
          <div class="price-row">
            <span class="price-label">Mobil + Driver:</span>
            <span class="price-val">${car.priceDriver}</span>
          </div>
          <div class="price-row all-in-row">
            <span class="price-label">Driver, BBM, Tol &amp; Parkir:</span>
            <span class="price-val gold-val">${car.priceDriverAllIn}</span>
          </div>
        </div>

        <div class="car-actions">
          <button class="btn btn-outline btn-sm btn-open-detail" data-id="${car.id}">
            Detail Unit
          </button>
          <a href="${createWhatsAppURL(`Halo Juragan 77 Makassar, saya tertarik sewa unit *${car.name}* (${car.year}). Mohon info ketersediaan unit untuk jadwal saya. Terima kasih!`)}" target="_blank" rel="noopener" class="btn btn-primary btn-sm">
            Sewa Unit
          </a>
        </div>
      </div>
    </div>
  `).join("");

  // Re-attach event listeners untuk tombol detail unit
  document.querySelectorAll(".btn-open-detail").forEach(btn => {
    btn.addEventListener("click", () => {
      const carId = btn.getAttribute("data-id");
      openCarModal(carId);
    });
  });
}

// 2. Setup Fleet Filter Buttons
function setupFleetFilters() {
  const filterBtns = document.querySelectorAll(".filter-btn");
  filterBtns.forEach(btn => {
    btn.addEventListener("click", () => {
      filterBtns.forEach(b => b.classList.remove("active"));
      btn.classList.add("active");
      const category = btn.getAttribute("data-filter");
      renderFleetCards(category);
    });
  });
}

// 3. Quick Booking Calculator & Direct WhatsApp Trigger
function setupQuickBookingCalculator() {
  const form = document.getElementById("hero-booking-form");
  const serviceBtns = document.querySelectorAll(".service-toggle-btn");
  let selectedService = "Lepas Kunci (Self-Drive)";

  serviceBtns.forEach(btn => {
    btn.addEventListener("click", (e) => {
      e.preventDefault();
      serviceBtns.forEach(b => b.classList.remove("active"));
      btn.classList.add("active");
      selectedService = btn.getAttribute("data-service");
    });
  });

  if (form) {
    // Set minimal tanggal hari ini
    const dateInput = document.getElementById("booking-date");
    if (dateInput) {
      const today = new Date().toISOString().split("T")[0];
      dateInput.min = today;
      dateInput.value = today;
    }

    form.addEventListener("submit", (e) => {
      e.preventDefault();
      const carSelect = document.getElementById("booking-car");
      const carName = carSelect ? carSelect.options[carSelect.selectedIndex].text : "Belum ditentukan";
      const dateVal = dateInput ? dateInput.value : "-";
      const duration = document.getElementById("booking-duration") ? document.getElementById("booking-duration").value : "1 Hari";
      const location = document.getElementById("booking-location") ? document.getElementById("booking-location").value : "Bandara Sultan Hasanuddin (UPG)";

      const waMessage = `*HALO JURAGAN 77 - BOOKING RENTAL MOBIL MAKASSAR*
---------------------------------------
Saya ingin melakukan reservasi armada dengan detail:
• *Pilihan Mobil:* ${carName}
• *Jenis Layanan:* ${selectedService}
• *Tanggal Mulai:* ${dateVal}
• *Durasi Sewa:* ${duration}
• *Lokasi Penjemputan:* ${location}

Mohon info ketersediaan unit dan total rincian biaya. Terima kasih!`;

      const targetURL = createWhatsAppURL(waMessage);
      window.open(targetURL, "_blank");
    });
  }
}

// 4. Modal Detail Unit
function setupModalDetail() {
  const backdrop = document.getElementById("car-detail-modal");
  const closeBtn = document.getElementById("modal-close-btn");

  if (closeBtn && backdrop) {
    closeBtn.addEventListener("click", () => {
      backdrop.classList.remove("open");
    });

    backdrop.addEventListener("click", (e) => {
      if (e.target === backdrop) {
        backdrop.classList.remove("open");
      }
    });

    // Close on ESC
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape" && backdrop.classList.contains("open")) {
        backdrop.classList.remove("open");
      }
    });
  }
}

function openCarModal(carId) {
  const car = FLEET_DATA.find(c => c.id === carId);
  const backdrop = document.getElementById("car-detail-modal");
  const modalContent = document.getElementById("modal-dynamic-content");

  if (!car || !backdrop || !modalContent) return;

  modalContent.innerHTML = `
    <div class="modal-img-wrap">
      <img src="${car.image}" alt="${car.name}">
    </div>
    <div class="modal-body">
      <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:12px; flex-wrap:wrap; gap:10px;">
        <span class="car-badge ${car.badgeClass}">${car.badge}</span>
        <span style="color:var(--text-muted); font-size:0.85rem; font-weight:600;">Tahun Pembuatan: ${car.year}</span>
      </div>

      <h2 style="font-size:1.8rem; margin-bottom:8px;">${car.name}</h2>
      <p style="color:var(--text-muted); font-size:0.95rem; margin-bottom:20px;">${car.description}</p>

      <h4 style="font-size:1.1rem; margin-bottom:12px; color:var(--red-hover);">Spesifikasi Lengkap:</h4>
      <div class="car-specs" style="margin-bottom:20px;">
        <div class="spec-pill"><strong>Kapasitas:</strong> ${car.specs.seats}</div>
        <div class="spec-pill"><strong>Transmisi:</strong> ${car.specs.transmission}</div>
        <div class="spec-pill"><strong>Mesin:</strong> ${car.specs.engine}</div>
        <div class="spec-pill"><strong>Pendingin:</strong> ${car.specs.ac}</div>
        <div class="spec-pill"><strong>Bagasi:</strong> ${car.specs.luggage}</div>
        <div class="spec-pill"><strong>Bahan Bakar:</strong> ${car.specs.fuel}</div>
      </div>

      <h4 style="font-size:1.1rem; margin-bottom:10px; color:var(--red-hover);">Fasilitas & Keunggulan:</h4>
      <ul style="margin-bottom:24px; display:flex; flex-direction:column; gap:8px;">
        ${car.features.map(f => `
          <li style="display:flex; align-items:center; gap:8px; font-size:0.9rem; color:#cbd5e1;">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="#e50914"><path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/></svg>
            ${f}
          </li>
        `).join("")}
      </ul>

      <div class="car-pricing-box" style="margin-bottom:24px;">
        <div class="price-row">
          <span class="price-label">Lepas Kunci:</span>
          <span class="price-val ${car.priceLepasKunci !== 'Khusus + Driver' ? 'highlight' : ''}">${car.priceLepasKunci}</span>
        </div>
        <div class="price-row">
          <span class="price-label">Mobil + Driver:</span>
          <span class="price-val">${car.priceDriver}</span>
        </div>
        <div class="price-row all-in-row">
          <span class="price-label">Driver, BBM, Tol &amp; Parkir:</span>
          <span class="price-val gold-val">${car.priceDriverAllIn}</span>
        </div>
      </div>

      <div style="display:flex; gap:14px; flex-wrap:wrap;">
        <a href="${createWhatsAppURL(`Halo CS Juragan 77, saya berminat memesan mobil *${car.name}* (${car.year}). Mohon info ketersediaan unit dan persyaratan.`)}" target="_blank" rel="noopener" class="btn btn-primary" style="flex:1;">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M12.04 2c-5.46 0-9.91 4.45-9.91 9.91 0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38c1.45.79 3.08 1.21 4.74 1.21 5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.01A9.816 9.816 0 0012.04 2z"/></svg>
          Pesan Unit Ini Sekarang
        </a>
      </div>
    </div>
  `;

  backdrop.classList.add("open");
}

// 5. Setup FAQ Accordion
function setupFAQAccordion() {
  const faqItems = document.querySelectorAll(".faq-item");
  faqItems.forEach(item => {
    const question = item.querySelector(".faq-question");
    if (question) {
      question.addEventListener("click", () => {
        const isActive = item.classList.contains("active");
        faqItems.forEach(i => i.classList.remove("active"));
        if (!isActive) {
          item.classList.add("active");
        }
      });
    }
  });
}

// 6. Navigation, Sticky Navbar & Back to Top
function setupNavigation() {
  const navbar = document.querySelector(".navbar");
  const menuToggle = document.getElementById("mobile-menu-toggle");
  const navMenu = document.querySelector(".nav-menu");
  const backToTop = document.getElementById("back-to-top");

  // Sticky & shadow on scroll
  window.addEventListener("scroll", () => {
    if (window.scrollY > 50) {
      navbar?.classList.add("scrolled");
    } else {
      navbar?.classList.remove("scrolled");
    }

    if (window.scrollY > 500) {
      backToTop?.classList.add("show");
    } else {
      backToTop?.classList.remove("show");
    }
  });

  // Mobile menu toggle
  if (menuToggle && navMenu) {
    menuToggle.addEventListener("click", () => {
      navMenu.classList.toggle("open");
    });

    // Close on link click
    navMenu.querySelectorAll(".nav-link").forEach(link => {
      link.addEventListener("click", () => {
        navMenu.classList.remove("open");
      });
    });
  }

  // Back to top click
  if (backToTop) {
    backToTop.addEventListener("click", () => {
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
  }
}

// 7. Tour Package Direct Booking Buttons (legacy - kept for compat)
function setupTourBookingButtons() {
  document.querySelectorAll(".btn-book-tour").forEach(btn => {
    btn.addEventListener("click", (e) => {
      e.preventDefault();
      const tourTitle = btn.getAttribute("data-tour") || "Paket Wisata Sulawesi";
      const message = `Halo Juragan 77 Makassar, saya tertarik dengan paket: *${tourTitle}*. Mohon informasi ketersediaan armada, jadwal, dan rincian harga lengkapnya. Terima kasih!`;
      window.open(createWhatsAppURL(message), "_blank");
    });
  });
}

// 8. Scroll Reveal Animation Observer (IntersectionObserver)
function setupScrollReveal() {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        // Don't unobserve — keeps class on element
      }
    });
  }, {
    threshold: 0.12,
    rootMargin: "0px 0px -60px 0px"
  });

  // Observe all reveal elements
  document.querySelectorAll(".reveal, .reveal-left, .reveal-right").forEach(el => {
    observer.observe(el);
  });

  // Also apply reveal class to major section children
  document.querySelectorAll(".car-card, .service-card, .feature-box, .step-card, .testi-card, .faq-item, .dest-card, .trust-item").forEach((el, index) => {
    el.classList.add("reveal");
    // Stagger delays for grid children
    const delay = Math.min(index % 4, 4) * 0.1;
    el.style.transitionDelay = `${delay}s`;
    observer.observe(el);
  });
}

// 9. Animated Nav Active Link on Scroll
function setupActiveNavLinks() {
  const sections = document.querySelectorAll("section[id], .destination-section[id]");
  const navLinks = document.querySelectorAll(".nav-link");

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const id = entry.target.id;
        navLinks.forEach(link => {
          link.classList.remove("active");
          if (link.getAttribute("href") === `#${id}`) {
            link.classList.add("active");
          }
        });
      }
    });
  }, {
    threshold: 0.35
  });

  sections.forEach(section => observer.observe(section));
}

// ==========================================================================
// 10. WEBSITE CUSTOMER GALLERY (REFERENCE SCREENSHOT STYLE)
// ==========================================================================
const CURATED_GALLERY_FALLBACK = [
  {
    id: "curated-1",
    judul: "Rombongan Tamu HiAce Premio Luxury",
    kategori: "pelanggan",
    lokasi: "Hotel The Rinra / Losari",
    paket: "Sewa HiAce Premio",
    keterangan: "Dokumentasi rombongan tamu eksekutif siap memulai city tour dan kunjungan dinas di Makassar.",
    foto: "images/hiace_premio.jpg",
    isReal: false
  },
  {
    id: "curated-2",
    judul: "Liburan Seru Pantai Pasir Putih Bira",
    kategori: "pelanggan",
    lokasi: "Pantai Tanjung Bira",
    paket: "Paket Trip Wisata Bira",
    keterangan: "Momen bahagia rombongan wisatawan berlibur di pesisir pasir putih Tanjung Bira Bulukumba.",
    foto: "images/pelanggan_bira.jpg",
    isReal: false
  },
  {
    id: "curated-3",
    judul: "Antar Jemput Bandara Sultan Hasanuddin",
    kategori: "armada",
    lokasi: "Bandara Hasanuddin (UPG)",
    paket: "Layanan Antar Jemput",
    keterangan: "Layanan drop-off & pick-up tepat waktu menyambut kedatangan tamu penting di Bandara UPG Makassar.",
    foto: "images/alphard_vip.jpg",
    isReal: false
  },
  {
    id: "curated-4",
    judul: "Eksplorasi Budaya & Alam Tana Toraja",
    kategori: "wisata",
    lokasi: "Tana Toraja - Kete Kesu",
    paket: "Tour Budaya 3D2N",
    keterangan: "Perjalanan overland tak terlupakan menikmati keunikan rumah adat Tongkonan dan pesona alam Toraja.",
    foto: "images/wisata_toraja.jpg",
    isReal: false
  },
  {
    id: "curated-5",
    judul: "Susur Wisata Karst Rammang-Rammang",
    kategori: "wisata",
    lokasi: "Rammang-Rammang Maros",
    paket: "Sewa Innova Zenix",
    keterangan: "Rombongan keluarga menikmati kenyamanan Innova Zenix menuju kawasan karst terbesar kedua di dunia.",
    foto: "images/wisata_rammang.jpg",
    isReal: false
  },
  {
    id: "curated-6",
    judul: "Sejuknya Panorama Malino Highlands",
    kategori: "wisata",
    lokasi: "Malino Highlands",
    paket: "Sewa Fortuner GR Sport",
    keterangan: "Perjalanan menembus perbukitan sejuk dan kebun teh Malino dengan ketangguhan SUV Fortuner.",
    foto: "images/wisata_malino.jpg",
    isReal: false
  }
];

let websiteGalleryItems = [];

// Read items from IndexedDB
function getGalleryFromIndexedDB() {
  return new Promise((resolve) => {
    try {
      const req = indexedDB.open('juragan77_admin', 1);
      req.onsuccess = (e) => {
        const db = e.target.result;
        if (!db.objectStoreNames.contains('galeri')) {
          resolve([]);
          return;
        }
        const tx = db.transaction('galeri', 'readonly');
        const store = tx.objectStore('galeri');
        const getAllReq = store.getAll();
        getAllReq.onsuccess = () => resolve(getAllReq.result || []);
        getAllReq.onerror = () => resolve([]);
      };
      req.onerror = () => resolve([]);
    } catch {
      resolve([]);
    }
  });
}

const WEB_CAT_LABELS = {
  armada:    { label: "Unit Armada", icon: "🚗" },
  pelanggan: { label: "Tamu & Pelanggan", icon: "👥" },
  wisata:    { label: "Trip Wisata", icon: "🌅" },
  kantor:    { label: "Fasilitas", icon: "🏢" }
};

async function initWebsiteGallery() {
  const gridEl = document.getElementById("website-gallery-grid");
  if (!gridEl) return;

  const idbItems = await getGalleryFromIndexedDB();
  // Map uploaded IDB items to have lokasi & paket matching the reference screenshot design
  const realItems = idbItems.map(item => {
    let lokasi = item.lokasi;
    let paket = item.paket;
    if (!lokasi) {
      if (item.kategori === 'pelanggan') lokasi = "Pantai Losari / Makassar";
      else if (item.kategori === 'armada') lokasi = "Bandara Hasanuddin (UPG)";
      else if (item.kategori === 'wisata') lokasi = "Tana Toraja / Bira";
      else lokasi = "Makassar, Sulsel";
    }
    if (!paket) {
      paket = item.judul || (item.kategori === 'pelanggan' ? 'Sewa HiAce & Driver' : 'Drop-off & Sewa');
    }
    return {
      ...item,
      lokasi,
      paket,
      isReal: true
    };
  }).sort((a, b) => (b.createdAt || 0) - (a.createdAt || 0));

  // Combine: prioritize user uploaded photos first, then curated items
  const combined = [...realItems];
  CURATED_GALLERY_FALLBACK.forEach(c => {
    if (!combined.some(item => item.foto === c.foto || item.judul === c.judul)) {
      combined.push(c);
    }
  });

  // Display ALL photos without arbitrary limit so all photos fit!
  websiteGalleryItems = combined;

  renderWebsiteGalleryGrid();
  setupWebsiteLightbox();
}

function renderWebsiteGalleryGrid() {
  const gridEl = document.getElementById("website-gallery-grid");
  if (!gridEl) return;

  if (!websiteGalleryItems.length) {
    gridEl.innerHTML = `
      <div style="grid-column: 1 / -1; padding: 48px 20px; text-align: center; background: rgba(22,24,34,0.5); border-radius: 18px; border: 1px dashed rgba(255,255,255,0.1);">
        <p style="color: var(--text-muted); font-size: 0.95rem;">Belum ada dokumentasi galeri pelanggan.</p>
      </div>`;
    return;
  }

  gridEl.innerHTML = websiteGalleryItems.map((item) => {
    const loc = item.lokasi || "Makassar, Sulsel";
    const pkt = item.paket || item.judul || "Sewa Mobil & Driver";

    return `
      <div class="cust-gallery-card" onclick="openWebLightbox('${item.id}')" role="button" tabindex="0" aria-label="Lihat foto ${item.judul}">
        <img src="${item.foto}" alt="${item.judul}" loading="lazy">
        <div class="cust-gallery-bar">
          <div class="cust-card-loc">
            <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
            </svg>
            <span>${loc}</span>
          </div>
          <div class="cust-card-unit">${pkt}</div>
        </div>
      </div>
    `;
  }).join('');
}

function setupGalleryFilters() {
  const filterBtns = document.querySelectorAll(".gallery-filter-btn");
  filterBtns.forEach(btn => {
    btn.addEventListener("click", () => {
      filterBtns.forEach(b => b.classList.remove("active"));
      btn.classList.add("active");
      currentWebsiteFilter = btn.getAttribute("data-filter") || "all";
      renderWebsiteGalleryGrid();
    });
  });
}

// Lightbox Modal for website
function openWebLightbox(id) {
  const item = websiteGalleryItems.find(i => String(i.id) === String(id));
  if (!item) return;

  const modal = document.getElementById("web-lightbox");
  const img   = document.getElementById("web-lightbox-img");
  const title = document.getElementById("web-lightbox-title");
  const badge = document.getElementById("web-lightbox-badge");
  const desc  = document.getElementById("web-lightbox-desc");
  const waBtn = document.getElementById("web-lightbox-wa-btn");
  const time  = document.getElementById("web-lightbox-time");

  const cat = (item.kategori || "armada").toLowerCase();
  const catInfo = WEB_CAT_LABELS[cat] || { label: item.kategori || "Unit", icon: "📸" };

  if (img) img.src = item.foto;
  if (title) title.textContent = item.judul;
  if (badge) {
    badge.className = `web-cat-badge ${cat}`;
    badge.textContent = `${catInfo.icon} ${catInfo.label}`;
  }
  if (desc) desc.textContent = item.keterangan || "Unit resmi dan dokumentasi perjalanan pelanggan Juragan 77 Rental Mobil Makassar.";
  if (time) time.textContent = item.isReal ? "⭐ Dokumentasi Terverifikasi Juragan 77" : "✨ Unit Siap Jalan 24 Jam";

  if (waBtn) {
    const waMsg = `Halo Juragan 77 Makassar, saya melihat foto *${item.judul}* di galeri website. Mau tanya ketersediaan dan sewa unit ini. Terima kasih!`;
    waBtn.href = createWhatsAppURL(waMsg);
  }

  if (modal) {
    modal.classList.add("open");
    modal.setAttribute("aria-hidden", "false");
  }
}

function closeWebLightbox() {
  const modal = document.getElementById("web-lightbox");
  if (modal) {
    modal.classList.remove("open");
    modal.setAttribute("aria-hidden", "true");
  }
}

function setupWebsiteLightbox() {
  const closeBtn = document.getElementById("web-lightbox-close");
  if (closeBtn) closeBtn.addEventListener("click", closeWebLightbox);

  const backdrop = document.getElementById("web-lightbox-backdrop");
  if (backdrop) backdrop.addEventListener("click", closeWebLightbox);

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") closeWebLightbox();
  });
}

// DOMContentLoaded already called above — add extra setups
document.addEventListener("DOMContentLoaded", () => {
  // Small delay to let DOM fully paint before observing
  requestAnimationFrame(() => {
    setupScrollReveal();
    setupActiveNavLinks();
    initWebsiteGallery();
  });
});

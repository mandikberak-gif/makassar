/**
 * JURAGAN 77 — Admin Dashboard Logic
 * Menggunakan IndexedDB untuk foto (galeri & wisata) — kapasitas besar
 * Menggunakan localStorage untuk data teks kecil (kontak, testimoni, dll)
 */

// ==================== AUTH CHECK ====================
if (localStorage.getItem('j77_admin_session') !== 'active') {
  window.location.href = 'index.html';
}

// ==================== INDEXEDDB SETUP ====================
const DB_NAME  = 'juragan77_admin';
const DB_VER   = 1;
let db = null;

function openDB() {
  return new Promise((resolve, reject) => {
    const req = indexedDB.open(DB_NAME, DB_VER);

    req.onupgradeneeded = e => {
      const d = e.target.result;
      if (!d.objectStoreNames.contains('galeri')) {
        d.createObjectStore('galeri', { keyPath: 'id' });
      }
      if (!d.objectStoreNames.contains('wisata')) {
        d.createObjectStore('wisata', { keyPath: 'id' });
      }
    };

    req.onsuccess = e => { db = e.target.result; resolve(db); };
    req.onerror   = e => reject(e.target.error);
  });
}

/* Generic IDB helpers */
function idbGetAll(store) {
  return new Promise((resolve, reject) => {
    const tx = db.transaction(store, 'readonly');
    const req = tx.objectStore(store).getAll();
    req.onsuccess = () => resolve(req.result || []);
    req.onerror   = e => reject(e.target.error);
  });
}

function idbPut(store, item) {
  return new Promise((resolve, reject) => {
    const tx = db.transaction(store, 'readwrite');
    const req = tx.objectStore(store).put(item);
    req.onsuccess = () => resolve();
    req.onerror   = e => reject(e.target.error);
  });
}

function idbDelete(store, id) {
  return new Promise((resolve, reject) => {
    const tx = db.transaction(store, 'readwrite');
    const req = tx.objectStore(store).delete(id);
    req.onsuccess = () => resolve();
    req.onerror   = e => reject(e.target.error);
  });
}

function idbClear(store) {
  return new Promise((resolve, reject) => {
    const tx = db.transaction(store, 'readwrite');
    const req = tx.objectStore(store).clear();
    req.onsuccess = () => resolve();
    req.onerror   = e => reject(e.target.error);
  });
}

// ==================== LOCALSTORAGE HELPERS (teks saja) ====================
function getStore(key, def = []) {
  try { return JSON.parse(localStorage.getItem(key)) || def; } catch { return def; }
}
function setStore(key, val) {
  try {
    localStorage.setItem(key, JSON.stringify(val));
  } catch (e) {
    // localStorage penuh — jangan crash
    console.warn('localStorage penuh:', e);
  }
}

// ==================== HELPERS ====================
function toast(msg, type = 'success') {
  const container = document.getElementById('toast-container');
  const icons = {
    success: '<path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/>',
    error:   '<path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z"/>',
    info:    '<path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z"/>'
  };
  const t = document.createElement('div');
  t.className = `toast toast-${type}`;
  t.innerHTML = `
    <svg class="toast-icon" width="20" height="20" viewBox="0 0 24 24" fill="currentColor">${icons[type]}</svg>
    <span class="toast-text">${msg}</span>`;
  container.appendChild(t);
  setTimeout(() => {
    t.style.opacity = '0';
    t.style.transform = 'translateX(30px)';
    setTimeout(() => t.remove(), 400);
  }, 3500);
}

function uid() {
  return Date.now().toString(36) + Math.random().toString(36).substr(2, 5);
}

function formatDate(ts) {
  return new Date(ts).toLocaleDateString('id-ID', { day: '2-digit', month: 'long', year: 'numeric' });
}

function readFileAsDataURL(file) {
  return new Promise((res, rej) => {
    const r = new FileReader();
    r.onload  = e => res(e.target.result);
    r.onerror = rej;
    r.readAsDataURL(file);
  });
}

function addActivity(msg) {
  const log = getStore('j77_activity', []);
  log.unshift({ msg, time: Date.now() });
  if (log.length > 20) log.pop();
  setStore('j77_activity', log);
  renderActivity();
}

// ==================== PANEL NAVIGATION ====================
function switchPanel(name) {
  document.querySelectorAll('.panel').forEach(p => p.classList.remove('active'));
  document.querySelectorAll('.sidebar-link').forEach(l => l.classList.remove('active'));
  const panel = document.getElementById(`panel-${name}`);
  if (panel) panel.classList.add('active');
  const nav = document.getElementById(`nav-${name}`);
  if (nav) nav.classList.add('active');
  document.getElementById('page-title-bar').textContent = {
    dashboard:  'Dashboard',
    wisata:     'Destinasi Wisata',
    galeri:     'Galeri Foto',
    armada:     'Armada Mobil',
    testimoni:  'Testimoni Pelanggan',
    kontak:     'Info Kontak & Lokasi',
    password:   'Ganti Password'
  }[name] || 'Dashboard';
  document.getElementById('sidebar').classList.remove('open');
  document.getElementById('sidebar-overlay').classList.remove('show');
  if (name === 'dashboard') {
    renderDashboardGaleri();
  }
}

document.querySelectorAll('.sidebar-link').forEach(link => {
  link.addEventListener('click', e => { e.preventDefault(); switchPanel(link.dataset.panel); });
});

document.getElementById('menu-toggle').addEventListener('click', () => {
  document.getElementById('sidebar').classList.toggle('open');
  document.getElementById('sidebar-overlay').classList.toggle('show');
});

document.getElementById('sidebar-overlay').addEventListener('click', () => {
  document.getElementById('sidebar').classList.remove('open');
  document.getElementById('sidebar-overlay').classList.remove('show');
});

document.getElementById('btn-logout').addEventListener('click', () => {
  if (confirm('Yakin ingin keluar dari panel admin?')) {
    localStorage.removeItem('j77_admin_session');
    window.location.href = 'index.html';
  }
});

// ==================== INIT USER ====================
const adminUser = localStorage.getItem('j77_admin_user') || 'Admin';
document.getElementById('greet-name').textContent = adminUser.charAt(0).toUpperCase() + adminUser.slice(1);
document.getElementById('user-name-sidebar').textContent = adminUser;
document.getElementById('user-avatar-sidebar').textContent = adminUser.charAt(0).toUpperCase();

// ==================== DASHBOARD STATS ====================
async function updateStats() {
  const galeri  = await idbGetAll('galeri');
  const wisata  = await idbGetAll('wisata');
  const testi   = getStore('j77_testimoni', []);

  document.getElementById('stat-wisata').textContent  = wisata.length;
  document.getElementById('stat-galeri').textContent  = galeri.length;
  document.getElementById('stat-testi').textContent   = testi.length;
  document.getElementById('badge-wisata').textContent = wisata.length;
  document.getElementById('badge-galeri').textContent = galeri.length;
}

function renderActivity() {
  const log = getStore('j77_activity', []);
  const el  = document.getElementById('activity-log');
  if (!log.length) {
    el.innerHTML = `<div class="empty-state" style="padding:32px;"><p>Belum ada aktivitas tercatat.</p></div>`;
    return;
  }
  el.innerHTML = log.map(a => `
    <div style="display:flex;align-items:center;gap:12px;padding:12px 0;border-bottom:1px solid var(--border);">
      <div style="width:8px;height:8px;border-radius:50%;background:var(--red);flex-shrink:0;"></div>
      <span style="flex:1;font-size:0.88rem;">${a.msg}</span>
      <span style="font-size:0.75rem;color:var(--text-dim);">${formatDate(a.time)}</span>
    </div>`).join('');
}

// ==================== DESTINASI WISATA (IndexedDB) ====================
const KATEGORI_ICONS = {
  budaya: '🏛', pantai: '🏖', alam: '🌿', kuliner: '🍜', pegunungan: '⛰', religi: '🕌'
};

document.getElementById('form-wisata').addEventListener('submit', async e => {
  e.preventDefault();
  const nama      = document.getElementById('w-nama').value.trim();
  const lokasi    = document.getElementById('w-lokasi').value.trim();
  const jarak     = document.getElementById('w-jarak').value.trim();
  const kategori  = document.getElementById('w-kategori').value;
  const deskripsi = document.getElementById('w-deskripsi').value.trim();
  const fotoFile  = document.getElementById('w-foto').files[0];

  let fotoData = null;
  if (fotoFile) {
    if (fotoFile.size > 5 * 1024 * 1024) { toast('Ukuran foto melebihi 5MB!', 'error'); return; }
    fotoData = await readFileAsDataURL(fotoFile);
  }

  const item = { id: uid(), nama, lokasi, jarak, kategori, deskripsi, foto: fotoData, createdAt: Date.now() };
  try {
    await idbPut('wisata', item);
    await renderWisata();
    await updateStats();
    addActivity(`Destinasi baru ditambahkan: ${nama}`);
    toast(`Destinasi "${nama}" berhasil disimpan!`);
    e.target.reset();
    document.getElementById('wisata-img-preview').style.display = 'none';
  } catch (err) {
    console.error(err);
    toast('Gagal menyimpan destinasi. Coba lagi.', 'error');
  }
});

document.getElementById('w-foto').addEventListener('change', async e => {
  const f = e.target.files[0];
  if (!f) return;
  const url = await readFileAsDataURL(f);
  document.getElementById('wisata-preview-img').src = url;
  document.getElementById('wisata-img-preview').style.display = 'block';
});

async function renderWisata() {
  const wisata = await idbGetAll('wisata');
  // Sort newest first
  wisata.sort((a, b) => b.createdAt - a.createdAt);

  const el = document.getElementById('wisata-list');
  document.getElementById('wisata-count').textContent = wisata.length;
  document.getElementById('clear-all-wisata').style.display = wisata.length ? 'inline-flex' : 'none';

  if (!wisata.length) {
    el.innerHTML = `<div class="empty-state">
      <svg width="40" height="40" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/></svg>
      <h3>Belum Ada Destinasi</h3><p>Tambahkan destinasi wisata menggunakan form di atas</p></div>`;
    return;
  }

  el.innerHTML = `
    <table class="data-table">
      <thead><tr><th>Foto</th><th>Nama &amp; Lokasi</th><th>Kategori</th><th>Jarak</th><th>Tanggal</th><th>Aksi</th></tr></thead>
      <tbody>
        ${wisata.map(w => `
          <tr>
            <td><img class="table-thumb" src="${w.foto || 'data:image/svg+xml,<svg xmlns=\'http://www.w3.org/2000/svg\' width=\'60\' height=\'40\'><rect width=\'100%\' height=\'100%\' fill=\'%23161822\'/><text x=\'50%\' y=\'55%\' font-size=\'8\' fill=\'%23666\' text-anchor=\'middle\'>No Photo</text></svg>'}" alt="${w.nama}"></td>
            <td><div style="font-weight:700;">${w.nama}</div><div style="font-size:0.78rem;color:var(--text-muted);">${w.lokasi}</div></td>
            <td>${KATEGORI_ICONS[w.kategori] || '📍'} ${w.kategori}</td>
            <td style="font-size:0.82rem;color:var(--text-muted);">${w.jarak || '-'}</td>
            <td style="font-size:0.78rem;color:var(--text-dim);">${formatDate(w.createdAt)}</td>
            <td><button class="btn btn-danger btn-icon btn-sm" onclick="deleteWisata('${w.id}')" title="Hapus">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z"/></svg>
            </button></td>
          </tr>`).join('')}
      </tbody>
    </table>`;
}

async function deleteWisata(id) {
  if (!confirm('Hapus destinasi ini?')) return;
  await idbDelete('wisata', id);
  await renderWisata();
  await updateStats();
  toast('Destinasi berhasil dihapus.', 'info');
}

document.getElementById('clear-all-wisata').addEventListener('click', async () => {
  if (!confirm('Hapus SEMUA destinasi wisata? Tindakan ini tidak bisa dibatalkan.')) return;
  await idbClear('wisata');
  await renderWisata();
  await updateStats();
  toast('Semua destinasi wisata dihapus.', 'info');
});

// ==================== GALERI FOTO (IndexedDB) ====================
let galeriFiles = [];

document.getElementById('g-foto').addEventListener('change', async e => {
  galeriFiles = Array.from(e.target.files);
  const wrap  = document.getElementById('galeri-preview-wrap');
  const grid  = document.getElementById('galeri-preview-grid');
  const count = document.getElementById('galeri-preview-count');

  if (!galeriFiles.length) { wrap.style.display = 'none'; return; }

  // Show loading indicator
  count.textContent = `Memuat preview ${galeriFiles.length} foto...`;
  wrap.style.display = 'block';
  grid.innerHTML = '<div style="color:var(--text-muted);font-size:0.85rem;padding:8px 0;">Memuat preview...</div>';

  const previews = [];
  for (const f of galeriFiles) {
    const url = await readFileAsDataURL(f);
    previews.push(url);
  }

  count.textContent = `${galeriFiles.length} foto siap diupload`;
  grid.innerHTML = previews.map(url => `
    <div style="border-radius:8px;overflow:hidden;aspect-ratio:4/3;border:1px solid var(--border);">
      <img src="${url}" style="width:100%;height:100%;object-fit:cover;" alt="">
    </div>`).join('');
});

// Drag and drop support
['wisata-upload-zone', 'galeri-upload-zone'].forEach(zoneId => {
  const zone = document.getElementById(zoneId);
  if (!zone) return;
  zone.addEventListener('dragover', e => { e.preventDefault(); zone.classList.add('drag-over'); });
  zone.addEventListener('dragleave', () => zone.classList.remove('drag-over'));
  zone.addEventListener('drop', async e => {
    e.preventDefault();
    zone.classList.remove('drag-over');
    // Trigger the file input's files if dropped
    const files = Array.from(e.dataTransfer.files).filter(f => f.type.startsWith('image/'));
    if (!files.length) return;
    if (zoneId === 'galeri-upload-zone') {
      galeriFiles = files;
      // Show previews
      const wrap  = document.getElementById('galeri-preview-wrap');
      const grid  = document.getElementById('galeri-preview-grid');
      const cnt   = document.getElementById('galeri-preview-count');
      cnt.textContent = `${files.length} foto siap diupload`;
      wrap.style.display = 'block';
      grid.innerHTML = '';
      for (const f of files) {
        const url = await readFileAsDataURL(f);
        const div = document.createElement('div');
        div.style.cssText = 'border-radius:8px;overflow:hidden;aspect-ratio:4/3;border:1px solid var(--border);';
        div.innerHTML = `<img src="${url}" style="width:100%;height:100%;object-fit:cover;" alt="">`;
        grid.appendChild(div);
      }
    }
  });
});

document.getElementById('form-galeri').addEventListener('submit', async e => {
  e.preventDefault();
  const judul      = document.getElementById('g-judul').value.trim();
  const kategori   = document.getElementById('g-kategori').value;
  const keterangan = document.getElementById('g-keterangan').value.trim();

  if (!galeriFiles.length) { toast('Pilih minimal 1 foto terlebih dahulu!', 'error'); return; }

  // Show progress
  const btn = e.target.querySelector('button[type="submit"]');
  const origText = btn.innerHTML;
  btn.disabled = true;
  btn.innerHTML = `<div style="width:16px;height:16px;border:2px solid rgba(255,255,255,0.3);border-top-color:white;border-radius:50%;animation:spin 0.7s linear infinite;"></div> Menyimpan...`;

  let added = 0;
  let skipped = 0;

  for (let i = 0; i < galeriFiles.length; i++) {
    const f = galeriFiles[i];
    btn.innerHTML = `<div style="width:16px;height:16px;border:2px solid rgba(255,255,255,0.3);border-top-color:white;border-radius:50%;animation:spin 0.7s linear infinite;"></div> Menyimpan ${i + 1}/${galeriFiles.length}...`;

    if (f.size > 5 * 1024 * 1024) {
      toast(`File "${f.name}" terlalu besar (maks 5MB) — dilewati`, 'error');
      skipped++;
      continue;
    }

    try {
      const fotoData = await readFileAsDataURL(f);
      const item = {
        id:          uid(),
        judul:       judul + (galeriFiles.length > 1 ? ` (${added + 1})` : ''),
        kategori,
        keterangan,
        foto:        fotoData,
        fileName:    f.name,
        createdAt:   Date.now()
      };
      await idbPut('galeri', item);
      added++;
    } catch (err) {
      console.error('Gagal simpan foto:', f.name, err);
      toast(`Gagal menyimpan "${f.name}"`, 'error');
      skipped++;
    }
  }

  // Reset button
  btn.disabled = false;
  btn.innerHTML = origText;

  galeriFiles = [];
  await renderGaleri();
  await renderDashboardGaleri();
  await updateStats();
  addActivity(`${added} foto baru ditambahkan ke galeri`);

  if (added > 0) toast(`✅ ${added} foto berhasil disimpan ke galeri!${skipped ? ` (${skipped} dilewati)` : ''}`);
  else toast('Tidak ada foto yang berhasil disimpan.', 'error');

  e.target.reset();
  document.getElementById('galeri-preview-wrap').style.display = 'none';
  document.getElementById('galeri-preview-grid').innerHTML = '';
});

document.getElementById('filter-galeri').addEventListener('change', renderGaleri);

async function renderGaleri() {
  const all    = await idbGetAll('galeri');
  all.sort((a, b) => b.createdAt - a.createdAt);

  const filter = document.getElementById('filter-galeri').value;
  const items  = filter === 'all' ? all : all.filter(g => g.kategori === filter);

  const el = document.getElementById('galeri-display');
  document.getElementById('galeri-count').textContent = all.length;
  document.getElementById('clear-all-galeri').style.display = all.length ? 'inline-flex' : 'none';

  if (!items.length) {
    el.innerHTML = `<div class="empty-state" style="grid-column:1/-1;padding:40px;">
      <svg width="40" height="40" viewBox="0 0 24 24" fill="currentColor"><path d="M21 19V5c0-1.1-.9-2-2-2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2zM8.5 13.5l2.5 3.01L14.5 12l4.5 6H5l3.5-4.5z"/></svg>
      <h3>Tidak Ada Foto</h3>
      <p>${all.length ? 'Tidak ada foto di kategori ini.' : 'Upload foto menggunakan form di atas.'}</p>
    </div>`;
    return;
  }

  el.innerHTML = items.map(g => `
    <div class="gallery-item">
      <img src="${g.foto}" alt="${g.judul}" loading="lazy">
      <span class="gallery-item-badge">${g.kategori}</span>
      <div class="gallery-item-overlay">
        <button class="btn btn-danger btn-icon" onclick="deleteGaleri('${g.id}')" title="Hapus foto">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z"/></svg>
        </button>
      </div>
      <div style="position:absolute;bottom:0;left:0;right:0;padding:8px 10px;background:linear-gradient(to top,rgba(0,0,0,0.85),transparent);">
        <div style="font-size:0.75rem;font-weight:700;color:#fff;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;">${g.judul}</div>
      </div>
    </div>`).join('');
}

async function deleteGaleri(id) {
  if (!confirm('Hapus foto ini?')) return;
  await idbDelete('galeri', id);
  await renderGaleri();
  await renderDashboardGaleri();
  await updateStats();
  toast('Foto berhasil dihapus.', 'info');
}

document.getElementById('clear-all-galeri').addEventListener('click', async () => {
  if (!confirm('Hapus SEMUA foto di galeri? Tindakan ini tidak bisa dibatalkan.')) return;
  await idbClear('galeri');
  await renderGaleri();
  await renderDashboardGaleri();
  await updateStats();
  toast('Semua foto galeri dihapus.', 'info');
});

// ==================== DASHBOARD GALERI & UNIT LOGIC ====================
const DASH_CAT_INFO = {
  armada:    { label: 'Armada', icon: '🚗', color: '#e50914' },
  wisata:    { label: 'Wisata', icon: '🌅', color: '#d97706' },
  pelanggan: { label: 'Pelanggan', icon: '👥', color: '#059669' },
  kantor:    { label: 'Kantor', icon: '🏢', color: '#2563eb' }
};

let currentDashGaleriFilter = 'all';

async function renderDashboardGaleri() {
  const all = await idbGetAll('galeri');
  all.sort((a, b) => b.createdAt - a.createdAt);

  const countEl = document.getElementById('dash-galeri-count');
  if (countEl) countEl.textContent = `${all.length} Unit Foto`;

  // Render Mini Stats Summary
  const summaryEl = document.getElementById('dash-unit-summary');
  if (summaryEl) {
    const counts = { armada: 0, wisata: 0, pelanggan: 0, kantor: 0 };
    all.forEach(item => {
      const k = (item.kategori || 'armada').toLowerCase();
      if (counts[k] !== undefined) counts[k]++;
    });

    summaryEl.innerHTML = `
      <div class="dash-summary-pill">
        <span class="dash-summary-dot" style="background:var(--red);"></span>
        Total Unit: <strong>${all.length}</strong>
      </div>
      <div class="dash-summary-pill">
        <span class="dash-summary-dot" style="background:#e50914;"></span>
        Armada Mobil: <strong>${counts.armada}</strong>
      </div>
      <div class="dash-summary-pill">
        <span class="dash-summary-dot" style="background:#d97706;"></span>
        Trip Wisata: <strong>${counts.wisata}</strong>
      </div>
      <div class="dash-summary-pill">
        <span class="dash-summary-dot" style="background:#059669;"></span>
        Pelanggan: <strong>${counts.pelanggan}</strong>
      </div>
      <div class="dash-summary-pill">
        <span class="dash-summary-dot" style="background:#2563eb;"></span>
        Kantor/Fasilitas: <strong>${counts.kantor}</strong>
      </div>
    `;
  }

  // Filter items
  const items = currentDashGaleriFilter === 'all'
    ? all
    : all.filter(g => (g.kategori || '').toLowerCase() === currentDashGaleriFilter.toLowerCase());

  const gridEl = document.getElementById('dash-gallery-grid');
  if (!gridEl) return;

  if (!items.length) {
    gridEl.innerHTML = `
      <div class="empty-state" style="grid-column: 1 / -1; padding: 36px 20px;">
        <svg width="46" height="46" viewBox="0 0 24 24" fill="currentColor"><path d="M21 19V5c0-1.1-.9-2-2-2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2zM8.5 13.5l2.5 3.01L14.5 12l4.5 6H5l3.5-4.5z"/></svg>
        <h3 style="margin-top:12px;">${all.length ? 'Tidak ada foto di kategori ini' : 'Belum Ada Foto Unit di Galeri'}</h3>
        <p style="margin-bottom:18px;">${all.length ? 'Silakan pilih tab filter lainnya atau upload foto baru.' : 'Dokumentasikan unit armada rental, mobil ready, dan aktivitas rental Anda.'}</p>
        <button type="button" class="btn btn-primary" onclick="switchPanel('galeri')">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z"/></svg>
          Upload Foto Unit Sekarang
        </button>
      </div>`;
    return;
  }

  // Display items (up to 12 newest items on dashboard)
  const displayItems = items.slice(0, 12);
  gridEl.innerHTML = displayItems.map(g => {
    const cat = (g.kategori || 'armada').toLowerCase();
    const info = DASH_CAT_INFO[cat] || { label: g.kategori || 'Unit', icon: '📸', color: '#e50914' };

    return `
      <div class="dash-unit-card" onclick="openLightbox('${g.id}')" title="Klik untuk lihat preview unit">
        <div class="dash-unit-media">
          <img src="${g.foto}" alt="${g.judul}" loading="lazy">
          <div class="dash-unit-badges">
            <span class="dash-cat-badge ${cat}">${info.icon} ${info.label}</span>
            <span class="dash-unit-tag">UNIT J77</span>
          </div>
          <div class="dash-unit-hover">
            <span class="dash-view-btn">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M12 4.5C7 4.5 2.73 7.61 1 12c1.73 4.39 6 7.5 11 7.5s9.27-3.11 11-7.5c-1.73-4.39-6-7.5-11-7.5zm0 10c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/></svg>
              Preview Unit
            </span>
          </div>
        </div>
        <div class="dash-unit-info">
          <div class="dash-unit-title">${g.judul}</div>
          ${g.keterangan ? `<div class="dash-unit-desc">${g.keterangan}</div>` : '<div class="dash-unit-desc" style="color:var(--text-dim);font-style:italic;">Dokumentasi unit resmi Sarappo 4788 Rental Makassar</div>'}
          <div class="dash-unit-meta">
            <span>
              <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor"><path d="M19 3h-1V1h-2v2H8V1H6v2H5c-1.11 0-1.99.9-1.99 2L3 19c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H5V8h14v11z"/></svg>
              ${formatDate(g.createdAt)}
            </span>
            <span class="dash-unit-action" onclick="event.stopPropagation(); switchPanel('galeri');">
              Kelola &rarr;
            </span>
          </div>
        </div>
      </div>
    `;
  }).join('');
}

// Lightbox Modal Functions
async function openLightbox(id) {
  const all = await idbGetAll('galeri');
  const item = all.find(g => String(g.id) === String(id));
  if (!item) return;

  const modal = document.getElementById('gallery-lightbox-modal');
  const img   = document.getElementById('lightbox-modal-img');
  const title = document.getElementById('lightbox-modal-title');
  const badge = document.getElementById('lightbox-modal-badge');
  const desc  = document.getElementById('lightbox-modal-desc');
  const meta  = document.getElementById('lightbox-modal-meta');

  const cat = (item.kategori || 'armada').toLowerCase();
  const info = DASH_CAT_INFO[cat] || { label: item.kategori || 'Unit', icon: '📸' };

  if (img) img.src = item.foto;
  if (title) title.textContent = item.judul;
  if (badge) {
    badge.className = `dash-cat-badge ${cat}`;
    badge.textContent = `${info.icon} ${info.label}`;
  }
  if (desc) desc.textContent = item.keterangan || 'Unit resmi armada & dokumentasi Sarappo 4788 Rental Makassar.';
  if (meta) meta.textContent = `📅 Diupload: ${formatDate(item.createdAt)}${item.fileName ? ` · 📁 ${item.fileName}` : ''}`;

  if (modal) modal.classList.add('open');
}

function closeLightbox() {
  const modal = document.getElementById('gallery-lightbox-modal');
  if (modal) modal.classList.remove('open');
}

function setupDashboardGalleryEvents() {
  // Filter chips in dashboard
  const filterWrap = document.getElementById('dash-galeri-filter');
  if (filterWrap) {
    filterWrap.querySelectorAll('.filter-chip').forEach(chip => {
      chip.addEventListener('click', () => {
        filterWrap.querySelectorAll('.filter-chip').forEach(c => c.classList.remove('active'));
        chip.classList.add('active');
        currentDashGaleriFilter = chip.getAttribute('data-filter') || 'all';
        renderDashboardGaleri();
      });
    });
  }

  // Lightbox close button handlers
  const closeBtn = document.getElementById('lightbox-close-btn');
  if (closeBtn) closeBtn.addEventListener('click', closeLightbox);

  const closeActionBtn = document.getElementById('lightbox-close-action-btn');
  if (closeActionBtn) closeActionBtn.addEventListener('click', closeLightbox);

  const toGaleriBtn = document.getElementById('lightbox-to-galeri-btn');
  if (toGaleriBtn) {
    toGaleriBtn.addEventListener('click', () => {
      closeLightbox();
      switchPanel('galeri');
    });
  }

  const modalBg = document.getElementById('gallery-lightbox-modal');
  if (modalBg) {
    modalBg.addEventListener('click', e => {
      if (e.target === modalBg) closeLightbox();
    });
  }

  // ESC key to close lightbox
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape') closeLightbox();
  });
}

// ==================== ARMADA TABLE ====================
const ARMADA_LIST = [
  { nama: 'Toyota Innova Zenix Hybrid', kategori: 'MPV',        kapasitas: '7 Pnp',  img: '../images/innova_zenix.jpg' },
  { nama: 'Toyota Fortuner GR Sport',  kategori: 'SUV',        kapasitas: '7 Pnp',  img: '../images/fortuner_gr.jpg' },
  { nama: 'Mitsubishi Pajero Sport',   kategori: 'SUV',        kapasitas: '7 Pnp',  img: '../images/pajero_sport.jpg' },
  { nama: 'Toyota Alphard VIP',        kategori: 'MPV Mewah',  kapasitas: '7 Pnp',  img: '../images/alphard_vip.jpg' },
  { nama: 'Toyota Avanza Veloz',       kategori: 'MPV',        kapasitas: '7 Pnp',  img: '../images/avanza_veloz.jpg' },
  { nama: 'Toyota HiAce Premio',       kategori: 'Minibus',    kapasitas: '15 Pnp', img: '../images/hiace_premio.jpg' },
];

function renderArmada() {
  const tbody = document.getElementById('armada-table-body');
  tbody.innerHTML = ARMADA_LIST.map(a => `
    <tr>
      <td><img class="table-thumb" src="${a.img}" alt="${a.nama}"></td>
      <td><div style="font-weight:700;">${a.nama}</div></td>
      <td>${a.kategori}</td>
      <td>${a.kapasitas}</td>
      <td><span class="status-badge status-active"><span class="status-dot"></span>Aktif</span></td>
    </tr>`).join('');
}

// ==================== TESTIMONI (localStorage — teks saja) ====================
document.getElementById('form-testi').addEventListener('submit', e => {
  e.preventDefault();
  const nama   = document.getElementById('t-nama').value.trim();
  const asal   = document.getElementById('t-asal').value.trim();
  const rating = document.getElementById('t-rating').value;
  const armada = document.getElementById('t-armada').value.trim();
  const ulasan = document.getElementById('t-ulasan').value.trim();

  const testi = getStore('j77_testimoni', []);
  testi.unshift({ id: uid(), nama, asal, rating: parseInt(rating), armada, ulasan, createdAt: Date.now() });
  setStore('j77_testimoni', testi);
  renderTestimoni();
  updateStats();
  addActivity(`Testimoni baru dari: ${nama}`);
  toast(`Testimoni dari "${nama}" berhasil disimpan!`);
  e.target.reset();
});

function renderTestimoni() {
  const testi = getStore('j77_testimoni', []);
  const el    = document.getElementById('testi-list');
  document.getElementById('testi-count').textContent = testi.length;
  document.getElementById('clear-all-testi').style.display = testi.length ? 'inline-flex' : 'none';

  if (!testi.length) {
    el.innerHTML = `<div class="empty-state"><h3>Belum Ada Testimoni</h3><p>Tambahkan ulasan pelanggan menggunakan form di atas</p></div>`;
    return;
  }

  el.innerHTML = testi.map(t => `
    <div style="padding:18px 0;border-bottom:1px solid var(--border);display:flex;gap:16px;align-items:flex-start;">
      <div style="width:42px;height:42px;border-radius:50%;background:var(--red-subtle);border:1px solid var(--border-red);display:flex;align-items:center;justify-content:center;font-weight:800;color:var(--red);font-size:1.1rem;flex-shrink:0;">${t.nama.charAt(0).toUpperCase()}</div>
      <div style="flex:1;min-width:0;">
        <div style="display:flex;align-items:center;gap:10px;flex-wrap:wrap;margin-bottom:4px;">
          <strong>${t.nama}</strong>
          ${t.asal ? `<span style="font-size:0.78rem;color:var(--text-dim);">— ${t.asal}</span>` : ''}
          <span style="font-size:0.82rem;color:#fbbf24;">${'⭐'.repeat(t.rating)}</span>
        </div>
        ${t.armada ? `<div style="font-size:0.78rem;color:var(--text-dim);margin-bottom:6px;">🚗 ${t.armada}</div>` : ''}
        <p style="font-size:0.88rem;color:var(--text-muted);font-style:italic;">"${t.ulasan}"</p>
        <div style="font-size:0.75rem;color:var(--text-dim);margin-top:6px;">${formatDate(t.createdAt)}</div>
      </div>
      <button class="btn btn-danger btn-icon btn-sm" onclick="deleteTesti('${t.id}')" title="Hapus">
        <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z"/></svg>
      </button>
    </div>`).join('');
}

function deleteTesti(id) {
  if (!confirm('Hapus testimoni ini?')) return;
  let t = getStore('j77_testimoni', []);
  t = t.filter(x => x.id !== id);
  setStore('j77_testimoni', t);
  renderTestimoni();
  updateStats();
  toast('Testimoni dihapus.', 'info');
}

document.getElementById('clear-all-testi').addEventListener('click', () => {
  if (!confirm('Hapus SEMUA testimoni?')) return;
  setStore('j77_testimoni', []);
  renderTestimoni();
  updateStats();
  toast('Semua testimoni dihapus.', 'info');
});

// ==================== KONTAK ====================
function loadKontak() {
  const k = getStore('j77_kontak', {});
  if (k.wa)     document.getElementById('k-wa').value     = k.wa;
  if (k.telp)   document.getElementById('k-telp').value   = k.telp;
  if (k.alamat) document.getElementById('k-alamat').value = k.alamat;
  if (k.email)  document.getElementById('k-email').value  = k.email;
  if (k.ig)     document.getElementById('k-ig').value     = k.ig;
}

document.getElementById('form-kontak').addEventListener('submit', e => {
  e.preventDefault();
  setStore('j77_kontak', {
    wa:     document.getElementById('k-wa').value.trim(),
    telp:   document.getElementById('k-telp').value.trim(),
    alamat: document.getElementById('k-alamat').value.trim(),
    email:  document.getElementById('k-email').value.trim(),
    ig:     document.getElementById('k-ig').value.trim(),
  });
  addActivity('Info kontak diperbarui');
  toast('Informasi kontak berhasil disimpan!');
});

// ==================== GANTI PASSWORD ====================
document.getElementById('form-password').addEventListener('submit', e => {
  e.preventDefault();
  const oldPass = document.getElementById('p-old').value;
  const newPass = document.getElementById('p-new').value;
  const confirm = document.getElementById('p-confirm').value;
  const newUser = document.getElementById('p-user').value.trim();

  const storedPass = localStorage.getItem('j77_admin_pass');
  const isOldValid = storedPass ? (oldPass === storedPass) : (oldPass === 'sarappo4788' || oldPass === 'juragan77');
  if (!isOldValid)  { toast('Password lama salah!', 'error'); return; }
  if (newPass.length < 6)      { toast('Password baru minimal 6 karakter!', 'error'); return; }
  if (newPass !== confirm)     { toast('Konfirmasi password tidak cocok!', 'error'); return; }

  localStorage.setItem('j77_admin_pass', newPass);
  if (newUser) {
    localStorage.setItem('j77_admin_user', newUser);
    document.getElementById('user-name-sidebar').textContent = newUser;
    document.getElementById('greet-name').textContent = newUser;
    document.getElementById('user-avatar-sidebar').textContent = newUser.charAt(0).toUpperCase();
  }
  addActivity('Password admin diubah');
  toast('Password berhasil diperbarui! Silakan login ulang.', 'success');
  e.target.reset();
  setTimeout(() => {
    localStorage.removeItem('j77_admin_session');
    window.location.href = 'index.html';
  }, 2500);
});

// ==================== BOOT — buka IndexedDB dulu ====================
openDB().then(async () => {
  await renderWisata();
  await renderGaleri();
  await renderDashboardGaleri();
  await updateStats();
  renderArmada();
  renderTestimoni();
  renderActivity();
  loadKontak();
  setupDashboardGalleryEvents();
}).catch(err => {
  console.error('Gagal membuka IndexedDB:', err);
  toast('Gagal menginisialisasi database. Coba refresh halaman.', 'error');
});

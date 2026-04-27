# 📝 Aplikasi Catatan Pribadi

Aplikasi catatan pribadi berbasis React yang dibuat sebagai submission kelas **Belajar Fundamental Aplikasi Web dengan React** di Dicoding.

## ✨ Fitur

- **Autentikasi** — Register dan login akun pengguna
- **Catatan Aktif** — Tambah, lihat, dan hapus catatan
- **Arsip** — Arsipkan dan pulihkan catatan
- **Pencarian** — Cari catatan berdasarkan judul (URL-based)
- **Dark/Light Mode** — Toggle tema dengan preferensi tersimpan di localStorage
- **Bilingual (ID/EN)** — Toggle bahasa Indonesia dan Inggris
- **Protected Routes** — Halaman terlindungi, redirect ke login jika belum autentikasi

## 🛠️ Teknologi

- React 18
- React Router v6
- Context API (Theme & Locale)
- Custom Hooks
- Vite
- REST API (Dicoding Notes API)

## 🚀 Cara Menjalankan

1. Clone repositori ini
   ```bash
   git clone https://github.com/username/personal-notes-app.git
   cd personal-notes-app
   ```

2. Install dependensi
   ```bash
   npm install
   ```

3. Jalankan aplikasi
   ```bash
   npm run dev
   ```

4. Buka di browser: `http://localhost:5173`

## 📦 Build untuk Produksi

```bash
npm run build
```

## 📁 Struktur Proyek

```
src/
├── components/     # Komponen UI yang dapat digunakan ulang
├── contexts/       # Context API (Theme, Locale)
├── hooks/          # Custom hooks (useInput)
├── pages/          # Halaman aplikasi
├── styles/         # File CSS
└── utils/          # Utilitas dan fungsi network
```

## 🎓 Tentang Proyek
Proyek ini dibuat sebagai submission kelas **Belajar Fundamental Aplikasi Web dengan React** di Dicoding.
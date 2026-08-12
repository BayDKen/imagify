# ✨ Imagify

**Imagify** adalah ekosistem *SuperApp* manipulasi visual berbasis Kecerdasan Buatan (AI). Proyek ini difokuskan pada pemrosesan gambar secara instan langsung di dalam peramban (*browser*) Anda tanpa memerlukan server tambahan (*100% Client-Side*), sehingga menjamin kecepatan dan privasi data pengguna.

Saat ini, Imagify dilengkapi dengan alat **AI Background Eraser** yang mampu menghapus latar belakang gambar dengan presisi tinggi (*sub-pixel*) hanya dalam hitungan detik.

---

## 🚀 Fitur Utama

- **100% Privasi Terjamin:** Semua pemrosesan AI (menggunakan arsitektur ONNX dan WebAssembly) dilakukan secara lokal di memori peramban pengguna. Gambar tidak pernah diunggah ke server manapun.
- **Kualitas Tinggi:** Menggunakan model AI terlatih untuk memisahkan latar depan (*foreground*) dan latar belakang (*background*) dengan sangat detail, bahkan pada helai rambut.
- **Antarmuka Estetik & Modern:** Dibangun dengan filosofi desain *Dark Mode* dan sentuhan *Glassmorphism 3D* yang membuat pengalaman pengguna terasa sangat premium.
- **Performa Multi-threading:** Dioptimalkan secara bawaan untuk memanfaatkan *multi-threading* peramban demi pemrosesan AI yang secepat kilat.

## 🛠️ Teknologi yang Digunakan

- **Frontend:** HTML5, CSS3 (Vanilla), JavaScript (ESM)
- **Bundler & Build Tool:** [Vite](https://vitejs.dev/)
- **AI Core Engine:** [@imgly/background-removal](https://www.npmjs.com/package/@imgly/background-removal)
- **Deployment Ready:** Dikonfigurasi secara otomatis untuk platform *Edge* (khususnya Vercel).

---

## 💻 Panduan Instalasi (Menjalankan secara Lokal)

Jika Anda ingin mencoba, memodifikasi, atau mengembangkan fitur baru di Imagify, ikuti langkah-langkah berikut:

### 1. Persyaratan Sistem
Pastikan komputer Anda telah terinstal:
- [Node.js](https://nodejs.org/) (versi 18 atau lebih baru)
- Git

### 2. Clone Repository
Buka Terminal atau Command Prompt Anda, lalu jalankan perintah ini:
```bash
git clone https://github.com/USERNAME_ANDA/transparent-image-maker.git
cd transparent-image-maker
```
*(Catatan: Ganti `USERNAME_ANDA` dengan *username* GitHub Anda jika Anda sudah mengunggahnya).*

### 3. Instalasi Dependensi
Jalankan perintah berikut untuk mengunduh semua library pendukung yang dibutuhkan oleh AI:
```bash
npm install
```

### 4. Jalankan Server Lokal
Mulai *development server* Vite menggunakan perintah:
```bash
npm run dev
```
atau
```bash
npx vite --port 3000
```
Buka peramban Anda dan kunjungi `http://localhost:3000`.

---

## 🌐 Panduan Deployment (Vercel)

Proyek ini sudah diatur agar 100% siap di-*deploy* ke **Vercel** tanpa masalah *Cross-Origin Policy* berkat keberadaan file `vercel.json`.

1. Unggah (*push*) kode Anda ke GitHub.
2. Masuk ke dasbor [Vercel](https://vercel.com).
3. Klik **Add New...** > **Project**.
4. Impor repositori GitHub Imagify Anda.
5. Vercel akan mengenali secara otomatis bahwa Anda menggunakan **Vite**.
6. Klik **Deploy**! 

Dalam beberapa detik, Imagify akan *live* dengan performa AI maksimal.

---

## 🎨 Rencana Masa Depan (Roadmap)
- [ ] AI Image Upscaler (Meningkatkan resolusi foto)
- [ ] Magic Retouch (Menghapus objek spesifik)
- [ ] Editor Komposisi Dasar (Tambah teks, bayangan)

---
*Crafted with ♥ for you by Kend*

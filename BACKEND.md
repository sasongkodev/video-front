# BACKEND.md

## Project Overview

Backend ini digunakan untuk aplikasi **Video Downloader**.

Frontend berjalan di Vercel menggunakan Next.js, sedangkan backend berjalan di VPS. Backend bertugas menangani proses berat seperti validasi URL, scraping ringan, Playwright, proses download, penyimpanan file sementara, dan mengirimkan hasil download ke frontend.

## Tech Stack

Gunakan stack sederhana dulu:

* Node.js
* Express.js
* TypeScript
* CORS
* Playwright
* dotenv
* nanoid
* fs-extra

Tidak menggunakan database untuk MVP awal.

## Architecture

```txt
User
 ↓
Next.js Frontend on Vercel
 ↓
Backend API on VPS
 ↓
Downloader Logic / Playwright
 ↓
Temporary File Storage
 ↓
Download URL returned to Frontend
```

## Main Responsibilities

Backend bertugas untuk:

* Menerima URL video dari frontend
* Validasi format URL
* Memproses URL menggunakan downloader logic
* Menggunakan Playwright jika halaman perlu dirender
* Menyimpan file hasil download sementara
* Memberikan public download URL ke frontend
* Menghapus file lama secara otomatis
* Memberikan response error yang jelas

## Folder Structure

```txt
backend/
├── src/
│   ├── index.ts
│   ├── routes/
│   │   └── download.route.ts
│   ├── controllers/
│   │   └── download.controller.ts
│   ├── services/
│   │   ├── downloader.service.ts
│   │   ├── playwright.service.ts
│   │   └── cleanup.service.ts
│   ├── utils/
│   │   ├── validate-url.ts
│   │   ├── file.ts
│   │   └── response.ts
│   └── types/
│       └── download.ts
├── public/
│   └── downloads/
├── .env
├── package.json
├── tsconfig.json
└── BACKEND.md
```

## Environment Variables

Gunakan `.env`:

```env
PORT=5000
FRONTEND_URL=https://frontend-kamu.vercel.app
BASE_URL=https://api-domain-kamu.com
DOWNLOAD_DIR=public/downloads
MAX_FILE_SIZE_MB=200
FILE_EXPIRE_MINUTES=60
```

## API Endpoints

### Health Check

```txt
GET /health
```

Response:

```json
{
  "success": true,
  "message": "Backend is running"
}
```

### Download Video

```txt
POST /download
```

Request body:

```json
{
  "url": "https://example.com/video"
}
```

Success response:

```json
{
  "success": true,
  "title": "Video Title",
  "thumbnail": "https://example.com/thumbnail.jpg",
  "downloadUrl": "https://api-domain-kamu.com/downloads/file.mp4"
}
```

Error response:

```json
{
  "success": false,
  "error": "URL tidak valid atau video tidak bisa diproses"
}
```

## Basic Backend Flow

```txt
POST /download
 ↓
Validate URL
 ↓
Check allowed protocol: http / https
 ↓
Process URL
 ↓
Download file to temporary folder
 ↓
Return public download URL
 ↓
Cleanup old files automatically
```

## URL Validation Rules

Backend harus menolak:

* URL kosong
* URL bukan http/https
* URL localhost
* URL private IP
* URL file://
* URL ftp://
* URL mencurigakan
* URL yang mengarah ke internal server

Tujuannya agar backend tidak terkena SSRF.

## MVP Download Rules

Untuk versi awal, backend boleh fokus ke:

* Direct `.mp4`
* Direct `.webm`
* Direct `.mov`
* Direct `.mkv`

Contoh URL yang didukung:

```txt
https://example.com/video.mp4
https://cdn.example.com/media.webm
https://files.example.com/movie.mov
```

Belum perlu mendukung:

* YouTube
* TikTok
* Instagram
* Facebook
* Website login
* Website premium
* DRM protected video
* Private content
* Bypass paywall

## Playwright Usage

Playwright boleh disiapkan, tapi jangan dipakai untuk semua request.

Gunakan Playwright hanya jika:

* Halaman membutuhkan JavaScript render
* Video URL tidak muncul dari HTML awal
* Website memang didukung secara khusus

 gunakan Playwright untuk:

* Bypass login
* Bypass DRM
* Mengambil konten berbayar
* Scraping massal tanpa izin

## Security Rules

Wajib diterapkan:

* CORS hanya untuk domain frontend
* Rate limit sederhana
* Validasi URL ketat
* Limit ukuran file
* Timeout download
* Cleanup file otomatis
* Jangan simpan file permanen
* Jangan expose path server asli
* Jangan jalankan input user sebagai command shell

## CORS Example

```ts
app.use(
  cors({
    origin: process.env.FRONTEND_URL,
    methods: ["GET", "POST"],
  })
)
```

## Static Download Files

Expose folder download sementara:

```ts
app.use("/downloads", express.static("public/downloads"))
```

Contoh hasil:

```txt
https://api-domain-kamu.com/downloads/video-abc123.mp4
```

## Error Handling

Gunakan pesan error yang jelas:

```txt
URL tidak valid
Format video belum didukung
File terlalu besar
Download timeout
Video tidak bisa diproses
Server sedang sibuk
```

Jangan tampilkan error mentah dari server ke user.

## Deployment VPS

Install dependencies:

```bash
npm install
```

Build TypeScript:

```bash
npm run build
```

Run production:

```bash
npm start
```

Atau pakai PM2:

```bash
npm install -g pm2
pm2 start dist/index.js --name video-backend
pm2 save
pm2 startup
```

## Nginx Reverse Proxy

Backend berjalan di port lokal:

```txt
localhost:5000
```

Nginx proxy ke domain API:

```txt
https://api-domain-kamu.com
```

Contoh endpoint publik:

```txt
https://api-domain-kamu.com/health
https://api-domain-kamu.com/download
https://api-domain-kamu.com/downloads/file.mp4
```

## Future Upgrade

Setelah MVP jalan, backend bisa dikembangkan dengan:

* Queue menggunakan BullMQ
* Redis
* Database PostgreSQL
* Login user
* History download
* Payment
* Plan gratis/premium
* Batch download
* Worker terpisah
* Cloudflare R2 untuk storage
* Admin dashboard

## Development Principle

Untuk MVP awal:

* Jangan terlalu kompleks
* Fokus satu endpoint utama
* Pastikan bisa jalan stabil di VPS
* Jangan pakai database dulu
* Jangan pakai queue dulu
* Jangan simpan file permanen
* Jangan dukung terlalu banyak platform dulu
* Buat kode mudah dikembangkan nanti

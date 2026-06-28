# CLAUDE.md

## Project Overview

Project ini adalah frontend untuk aplikasi **Video Downloader** berbasis website.

Frontend menggunakan:

* Next.js App Router
* TypeScript
* TailwindCSS
* Client Components untuk form interaktif
* Backend API terpisah di VPS

Frontend hanya bertugas sebagai UI dan penghubung ke backend. Semua proses berat seperti download video, scraping, Playwright, file processing, dan temporary storage dilakukan di backend VPS.

## Tech Stack

* Next.js
* TypeScript
* TailwindCSS
* React
* Fetch API

## Architecture

```txt
User
 ↓
Next.js Frontend on Vercel
 ↓
Backend API on VPS
 ↓
Downloader Engine / Playwright
```

## Environment Variables

Gunakan environment variable berikut:

```env
NEXT_PUBLIC_API_URL=https://api-domain-kamu.com
```

Jangan hardcode URL backend langsung di component.

## Main Features

Frontend harus memiliki fitur:

* Input URL video
* Validasi input sederhana
* Tombol submit
* Loading state
* Error state
* Success state
* Menampilkan preview jika backend mengembalikan preview URL
* Menampilkan tombol download jika backend berhasil memproses video

## API Contract

Frontend mengirim request ke backend:

```ts
POST /download
```

Body:

```json
{
  "url": "https://example.com/video"
}
```

Expected success response:

```json
{
  "success": true,
  "title": "Video Title",
  "thumbnail": "https://example.com/thumb.jpg",
  "downloadUrl": "https://api-domain.com/files/video.mp4"
}
```

Expected error response:

```json
{
  "success": false,
  "error": "Pesan error"
}
```

## UI Direction

Gunakan desain modern, clean, dan premium.

Style utama:

* Background gelap
* Card besar di tengah
* Input rounded
* Button jelas
* Loading state rapi
* Error message mudah dibaca
* Mobile responsive

Warna utama:

```txt
Background: zinc-950
Card: zinc-900
Border: zinc-800
Text: white
Muted text: zinc-400
Accent: violet-600
Success: green-600
Error: red-500
```

## Suggested Folder Structure

```txt
app/
├── page.tsx
├── layout.tsx
components/
├── DownloadForm.tsx
├── VideoPreview.tsx
└── LoadingButton.tsx
lib/
├── api.ts
└── types.ts
```

## Coding Rules

* Gunakan TypeScript.
* Jangan gunakan database di frontend.
* Jangan simpan history dulu.
* Jangan proses video di frontend.
* Jangan gunakan Playwright di frontend.
* Semua logic download harus lewat backend VPS.
* Gunakan `NEXT_PUBLIC_API_URL`.
* Buat komponen kecil dan mudah dibaca.
* Handle loading, error, dan success dengan jelas.
* Jangan expose secret key di frontend.

## Main Page Goal

Homepage harus langsung fokus ke aksi utama:

```txt
Paste Video URL → Process → Download
```

Hero copy:

```txt
Download videos from supported websites quickly and easily.
```

Subtitle:

```txt
Paste a video URL and let our backend process it for you.
```

Button:

```txt
Generate Download Link
```

## Frontend Behavior

Ketika user submit URL:

1. Validasi URL tidak kosong.
2. Kirim URL ke backend VPS.
3. Tampilkan loading.
4. Jika berhasil, tampilkan metadata video.
5. Jika gagal, tampilkan error dari backend.
6. Tampilkan tombol download jika `downloadUrl` tersedia.

## Important Notes

Project ini masih MVP kecil.

Jangan tambahkan:

* Login
* Dashboard
* Payment
* Database
* Queue UI
* Admin panel

Fokus dulu pada satu halaman utama yang stabil dan enak dipakai.

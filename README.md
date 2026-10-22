# XII Agama 1 · Angkatan 2025

Album digital kelas (React + Vite, JavaScript). Gaya visual diambil dari template Ink Orbit
(monokrom, latar garis miring, siku bracket, patung tinta 3D di hero).

## Jalankan

```bash
npm install      # pasang node modules
npm run dev      # http://localhost:5173
npm run build    # hasil di dist/
npm run preview  # cek hasil build
```

Butuh Node.js 20.19+ atau 22.12+ (syarat Vite 8).

## Node modules

| Paket | Versi | Fungsi |
|---|---|---|
| react | ^19.3.1 | UI |
| react-dom | ^19.3.1 | render ke DOM |
| vite (dev) | ^8.3.5 | dev server dan build |
| @vitejs/plugin-react (dev) | ^6.1.2 | dukungan JSX |

Template tidak butuh library lain: patung, diagram, dan ikon digambar langsung di kode.

## Foto

Taruh file di `public/` sesuai path di `src/data/students.js`:

- `public/students/*.jpg` untuk siswa
- `public/teacher.jpg` untuk guru
- `public/gallery/galeri-01.jpg` sampai `galeri-12.jpg`

Foto yang belum ada otomatis diganti tile inisial. Dua siswa (Cahya Rizkia R. dan
Nur Syafa R.) masih berpath `/students/.jpg`, isi nama filenya dulu di `students.js`.

## Struktur

- `src/data/students.js`: semua data (siswa, guru, kelas, galeri)
- `src/App.jsx`: memetakan data ke template
- `src/components/InkOrbitTemplate.jsx`: template (sudah JSX, ditambah slot dan props)
- `src/sections/`: bagian Siswa, Guru, Galeri

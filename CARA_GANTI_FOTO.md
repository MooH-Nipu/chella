# 📸 Cara Ganti Foto - Birthday Website

## Langkah Mudah Upload & Ganti Foto

### 1️⃣ Siapkan Foto Kamu (8 Foto)
- Pilih 8 foto kenangan favorit
- Format: `.jpg`, `.jpeg`, atau `.png`
- Ukuran bebas (nanti auto-adjust)

### 2️⃣ Upload ke Folder `public`
```
birthday-website(1)/
└── public/
    ├── photo1.jpg  ← Upload foto pertama di sini
    ├── photo2.jpg  ← Upload foto kedua di sini
    ├── photo3.jpg
    ├── photo4.jpg
    ├── photo5.jpg
    ├── photo6.jpg
    ├── photo7.jpg
    └── photo8.jpg
```

**Cara upload:**
1. Buka folder `public` di VS Code atau File Explorer
2. Copy-paste atau drag & drop 8 foto ke dalam folder `public`
3. Rename sesuai nama: `photo1.jpg`, `photo2.jpg`, dst.

### 3️⃣ Ganti Caption (Opsional)
Kalau mau ganti teks di bawah foto, edit file: `components/photo-collage.tsx`

Cari bagian ini (baris 25-34):
```tsx
const [photos, setPhotos] = useState<Photo[]>([
  { src: "/photo1.jpg", caption: "Our first date" },
  { src: "/photo2.jpg", caption: "That sunset together" },
  { src: "/photo3.jpg", caption: "Your beautiful smile" },
  { src: "/photo4.jpg", caption: "Adventures with you" },
  { src: "/photo5.jpg", caption: "Laughing together" },
  { src: "/photo6.jpg", caption: "My favorite person" },
  { src: "/photo7.jpg", caption: "Our special moment" },
  { src: "/photo8.jpg", caption: "Forever with you" },
])
```

Ganti teks `caption` sesuai keinginan:
```tsx
{ src: "/photo1.jpg", caption: "Moment pertama kita" },
```

### 4️⃣ Format Foto Lain (Opsional)
Kalau foto kamu bukan `.jpg`, bisa pakai format lain:

```tsx
{ src: "/photo1.png", caption: "Our first date" },
{ src: "/photo2.jpeg", caption: "That sunset together" },
```

### 5️⃣ Refresh Browser
Setelah upload foto, refresh browser (F5 atau Ctrl+R) untuk lihat perubahan!

---

## 🎨 Tips Foto
- **Aspect Ratio:** Foto portrait/vertikal lebih bagus (4:5 atau 3:4)
- **Ukuran File:** Maksimal 2-3MB per foto biar cepat load
- **Kualitas:** HD/high quality untuk hasil terbaik

## ❓ Troubleshooting
**Foto tidak muncul?**
- Pastikan nama file sesuai: `photo1.jpg`, `photo2.jpg` (lowercase, no space)
- Pastikan foto ada di folder `public/`
- Hard refresh: Ctrl+Shift+R (Windows) atau Cmd+Shift+R (Mac)

**Foto terpotong?**
- Foto akan auto-crop ke area tengah
- Pastikan subjek utama di tengah foto

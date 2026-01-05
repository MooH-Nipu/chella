# 📧 Setup EmailJS - Cara Kirim Email Otomatis

## Kenapa Pakai EmailJS?
- ✅ Email langsung terkirim tanpa buka aplikasi email
- ✅ Gratis 200 email per bulan
- ✅ Ga perlu backend/server
- ✅ Setup 5 menit aja!

---

## 🚀 Langkah Setup (5 Menit!)

### 1️⃣ Daftar EmailJS (Gratis)
1. Buka: https://www.emailjs.com/
2. Klik **Sign Up** (pojok kanan atas)
3. Daftar pakai email atau Google account
4. Verify email kamu

### 2️⃣ Buat Email Service
1. Login ke dashboard EmailJS
2. Klik **Add New Service**
3. Pilih **Gmail** (atau provider lain yang kamu pakai)
4. Klik **Connect Account** dan login dengan Gmail kamu
5. **Copy Service ID** (contoh: `service_abc123`)

### 3️⃣ Buat Email Template
1. Di dashboard, klik **Email Templates** (sidebar kiri)
2. Klik **Create New Template**
3. Isi template seperti ini:

**Template Settings:**
- **Template Name:** `birthday_message`

**Template Content:**
```
Subject: 💌 Birthday Reply

From: Birthday Website Message

Message:
{{message}}

---
Sent from Birthday Website
To: {{to_email}}
```

**Variable Names (penting!):**
- `{{message}}` - isi pesan
- `{{to_email}}` - email tujuan

4. Klik **Save**
5. **Copy Template ID** (contoh: `template_xyz789`)

### 4️⃣ Ambil Public Key
1. Di dashboard, klik **Account** (sidebar kiri)
2. Scroll ke bawah cari **API Keys**
3. **Copy Public Key** (contoh: `AbCd123-EfGh456`)

### 5️⃣ Update .env.local
Buka file `.env.local` dan update 3 baris ini dengan nilai dari EmailJS:

```env
NEXT_PUBLIC_EMAILJS_SERVICE_ID=service_abc123
NEXT_PUBLIC_EMAILJS_TEMPLATE_ID=template_xyz789
NEXT_PUBLIC_EMAILJS_PUBLIC_KEY=AbCd123-EfGh456
```

Ganti dengan nilai yang kamu copy dari EmailJS dashboard!

### 6️⃣ Test!
1. Restart dev server (Ctrl+C di terminal, lalu `npm run dev` lagi)
2. Buka website
3. Isi form message
4. Klik **Send Message**
5. Cek inbox email kamu - pesan harus masuk! 📬

---

## ⚙️ Kustomisasi Template Email

Kalau mau ubah format email yang diterima, edit di **Email Templates**:

### Contoh Template Lebih Bagus:
```
Subject: 💌 Birthday Message from {{sender_name}}

Hi!

You received a birthday message:

{{message}}

---
Sent at: {{sent_at}}
From: Birthday Website
```

Tambah variabel di code (message-form.tsx):
```tsx
await emailjs.send(
  serviceId,
  templateId,
  {
    message: message,
    to_email: recipientEmail,
    sender_name: 'Your Friend',
    sent_at: new Date().toLocaleString()
  },
  publicKey
)
```

---

## 🔧 Troubleshooting

### Email tidak terkirim?
1. **Cek Console Browser** (F12 → Console) - ada error message?
2. **Pastikan Service ID, Template ID, Public Key sudah benar**
3. **Restart dev server** setelah update .env.local
4. **Cek Gmail Settings** - pastikan "Less secure app access" enabled (kalau pakai Gmail)

### Error: "Service ID is required"
- Pastikan `.env.local` sudah benar
- Restart dev server (Ctrl+C → `npm run dev`)

### Email masuk ke Spam?
- Normal untuk pertama kali
- Mark email as "Not Spam"
- Setelah beberapa kali, Gmail akan belajar

### Mau ganti email tujuan?
Edit `.env.local`:
```env
NEXT_PUBLIC_RECIPIENT_EMAIL=email-tujuan-baru@gmail.com
```

---

## 📊 Limits EmailJS Gratis
- 200 emails/bulan
- 2 email services
- Unlimited templates
- **Cukup banget untuk birthday website!**

Kalau perlu lebih banyak, upgrade ke Personal plan ($7/bulan) → 1000 emails/bulan

---

## 🎯 Quick Reference

**File yang diubah:**
- ✅ `components/message-form.tsx` - Form pakai EmailJS
- ✅ `.env.local` - Configuration
- ✅ `package.json` - Sudah install @emailjs/browser

**EmailJS Dashboard:** https://dashboard.emailjs.com/

**Status Emails:** Lihat di dashboard EmailJS → Email History

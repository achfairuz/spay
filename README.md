# 💸 SPay API - Node.js + Express + Sequelize

Sistem sederhana simulasi transfer antar rekening menggunakan Node.js, Express, dan PostgreSQL (Sequelize ORM).

---

## 🚀 Fitur

- Autentikasi pengguna dengan JWT
- Enkripsi password dengan `bcrypt`
- Transfer antar rekening
- Validasi saldo sebelum transfer
- Relasi antar tabel dengan Sequelize
- Auto reload dengan `nodemon`

---

## 🛠 Instalasi

1. **Clone repository**

```bash
git clone https://github.com/username/repo-spay.git
cd repo-spay
```

2. **Install dependencies**

```bash
npm install express sequelize pg pg-hstore
npm install --save-dev sequelize-cli
npm install bcrypt
npm install jsonwebtoken bcryptjs dotenv
npm install crypto-random-string
npm install --save-dev nodemon
```

3. **Inisialisasi Sequelize**

```bash
npx sequelize-cli init
```

4. **Buat model User (contoh)**

```bash
npx sequelize-cli model:generate --name User --attributes name:string,email:string
```

5. **Migrate database**

```bash
npx sequelize-cli db:migrate
```

6. **Jalankan server dengan nodemon**

```bash
npx nodemon index.js
```

---

## 🔐 Environment Variables (`.env`)

Buat file `.env` di root dan isi seperti:

```env
DB_USERNAME=postgres
DB_PASSWORD=yourpassword
DB_NAME=spay_db
DB_HOST=127.0.0.1
JWT_SECRET=your_secret_key
```

---

## 🧱 Struktur Folder

```
project/
│
├── models/               # Model Sequelize
├── migrations/           # File migrasi
├── controllers/          # Logic controller
├── routes/               # API route
├── config/               # Konfigurasi DB
├── index.js              # Entry point server
└── .env
```

---

## 📬 API Endpoint Contoh

| Method | Endpoint      | Deskripsi               |
| ------ | ------------- | ----------------------- |
| POST   | /login        | Login pengguna          |
| GET    | /rekening/:id | Lihat saldo dan data    |
| POST   | /transfer     | Transfer antar rekening |

---

## 📦 Tools & Library

- `express`: Web framework
- `sequelize`: ORM
- `pg`: PostgreSQL driver
- `jsonwebtoken`: JWT auth
- `bcryptjs`: Hashing password
- `nodemon`: Auto-restart server

---

## 👨‍💻 Author

- Nama: Achmad Fairuz
- GitHub: https://github.com/achfairuz/api_bank_spay
- Email: fairf717@gmail.com

---

## 📜 Lisensi

MIT License

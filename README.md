
# 🚀 Menu Management Worker

Server API untuk manajemen menu dan akses berbasis role.  
Dibangun dengan **Node.js (Express)** dan **PostgreSQL** serta menggunakan **JWT** untuk autentikasi.

---

## ✨ Fitur Utama
- 🔐 **Authentication & Authorization** dengan JWT
- 📂 **Role-based Access Control** (RBAC) untuk menu
- 🗂️ **Multi-level Menu Management** (nested menus tanpa batas)
- 🛡️ **Standard API Response** (consistency sukses/error)
- 📦 Mudah dikembangkan & diintegrasikan dengan service lain

---

## 📦 Instalasi

1. **Clone repository**
   ```bash
    git clone https://your-repo-link.git
    cd menu-management

2. **Install dependencies**
   ```bash
    npm install

3. **Generate JWT Secret**
   ```bash
    npm run gen:secret

4. **Set Environment (.env)**

---
**Jalankan Server**
```bash
npm run dev     # untuk development (auto reload pakai nodemon)
npm start       # untuk production mode
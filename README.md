
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
    git clone https://github.com/Firlans/menu-management.git
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
```

[**Dokumentasi API**](https://docs.google.com/document/d/1PBecvt4Rx3pOXCZNY3eSjC4-LC8IPF3q_eMNcoos52U/edit?usp=sharing) |
[**Collection Postman**](https://gold-trinity-703300.postman.co/workspace/My-Workspace~d29b3c91-1c18-4b88-8cfe-b71bbc6ac4af/collection/25609538-90b1a563-eecb-4e63-a5c7-0684376c3a79?action=share&creator=25609538)
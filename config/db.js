// File: config/db.js

const { Sequelize } = require("sequelize");

// Konfigurasi ini sekarang membaca variabel dari Railway
// dan menyertakan opsi Port dan SSL yang wajib.
const db = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASS,
  {
    host: process.env.DB_HOST,
    port: process.env.DB_PORT, // WAJIB: Menambahkan port dari environment variable
    dialect: "mysql",
    dialectOptions: {
      // WAJIB: Blok ini diperlukan untuk koneksi aman (SSL) ke database cloud
      ssl: {
        require: true,
        // Opsi ini seringkali diperlukan untuk cloud provider seperti Railway
        rejectUnauthorized: false,
      },
    },
    // Opsi tambahan untuk production (opsional tapi bagus)
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000,
    },
    logging: false, // Matikan logging SQL di production agar tidak memenuhi log
  }
);

module.exports = db;
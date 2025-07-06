import mysql from 'mysql2/promise';

const pool = mysql.createPool({
  host: 'localhost',
  user: 'root',       // Ganti dengan user MySQL Anda
  password: '',       // Ganti dengan password MySQL Anda
  database: 'absensi_db',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

async function testConnection() {
  try {
    const connection = await pool.getConnection();
    console.log('Koneksi ke database MySQL berhasil!');
    connection.release();
  } catch (error) {
    console.error('Gagal koneksi ke database MySQL:', error);
  }
}

export { pool, testConnection };

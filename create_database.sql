CREATE DATABASE IF NOT EXISTS absensi_db CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci;
USE absensi_db;

CREATE TABLE IF NOT EXISTS olah_absensi (
  perner VARCHAR(50) NOT NULL,
  tanggal DATE NOT NULL,
  jenis_hari VARCHAR(50) DEFAULT NULL,
  is_jumat VARCHAR(50) DEFAULT NULL,
  nama_hari VARCHAR(50) DEFAULT NULL,
  daily_in TIME DEFAULT NULL,
  daily_out TIME DEFAULT NULL,
  att_daily VARCHAR(255) DEFAULT NULL,
  abs_daily VARCHAR(255) DEFAULT NULL,
  att_sap VARCHAR(255) DEFAULT NULL,
  abs_sap VARCHAR(255) DEFAULT NULL,
  sppd_umum VARCHAR(255) DEFAULT NULL,
  ws_rule VARCHAR(255) DEFAULT NULL,
  jenis_jam_kerja_shift_daily VARCHAR(255) DEFAULT NULL,
  jenis_jam_kerja_shift_sap VARCHAR(255) DEFAULT NULL,
  status_ganda VARCHAR(50) DEFAULT NULL,
  att_daily_new VARCHAR(255) DEFAULT NULL,
  abs_daily_new VARCHAR(255) DEFAULT NULL,
  att_sap_new VARCHAR(255) DEFAULT NULL,
  abs_sap_new VARCHAR(255) DEFAULT NULL,
  sppd_umum_new VARCHAR(255) DEFAULT NULL,
  PRIMARY KEY (perner, tanggal)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

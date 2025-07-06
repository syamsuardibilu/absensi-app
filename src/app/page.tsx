"use client";

import React, { useState } from "react";
import InputSection from "@/components/InputSection";

const inputLabels = [
  "DATA PEGAWAI",
  "DATA HARI LIBUR",
  "CI CO DAILY",
  "ATT ABS Daily",
  "ATT ABS",
  "ATT SAP",
  "SPPD UMUM",
  "WORK SCHEDULE",
  "Substitution Daily",
  "Substitution SAP",
];

export default function Home() {
  const [validations, setValidations] = useState<boolean[]>(
    new Array(inputLabels.length).fill(false)
  );

  const handleValidationChange = (index: number, isValid: boolean) => {
    const newValidations = [...validations];
    newValidations[index] = isValid;
    setValidations(newValidations);
  };

  const allValid = validations.every((v) => v);

  const handleProcessData = () => {
    alert("Data sedang diproses...");
    // Tambahkan logika proses data di sini
  };

  return (
    <main className="max-w-4xl mx-auto p-6 bg-gray-50 min-h-screen">
      <header className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white p-6 rounded-md mb-8 text-center">
        <h1 className="text-3xl font-bold mb-2">Aplikasi Pengelola Absensi Pegawai</h1>
        <p>Masukkan data sesuai format yang diperlukan</p>
      </header>

      <section className="bg-white p-6 rounded-md shadow-md">
        {inputLabels.map((label, index) => (
          <InputSection
            key={label}
            label={label}
            onValidationChange={(isValid) => handleValidationChange(index, isValid)}
          />
        ))}

        <button
          className={`w-full py-3 mt-4 rounded text-white font-semibold transition ${
            allValid ? "bg-indigo-600 hover:bg-indigo-700" : "bg-gray-400 cursor-not-allowed"
          }`}
          disabled={!allValid}
          onClick={handleProcessData}
          type="button"
        >
          PROSES DATA
        </button>
      </section>
    </main>
  );
}

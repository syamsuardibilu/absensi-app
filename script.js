document.addEventListener("DOMContentLoaded", () => {
  const checkButtons = document.querySelectorAll(".check-btn");
  const deleteButtons = document.querySelectorAll(".delete-btn");
  const processBtn = document.getElementById("process-btn");

  // Track validation status for each textarea by id
  const validationStatus = {};

  function updateProcessButton() {
    const allValid = Object.values(validationStatus).every((v) => v === true);
    processBtn.disabled = !allValid;
  }

  checkButtons.forEach((btn) => {
    btn.addEventListener("click", async () => {
      const targetId = btn.getAttribute("data-target");
      const textarea = document.getElementById(targetId);
      const resultBox = btn.parentElement.querySelector(".result-box");

      if (textarea.value.trim() === "") {
        resultBox.textContent = "Input tidak boleh kosong.";
        validationStatus[targetId] = false;
        updateProcessButton();
        return;
      }

      // Validasi tanggal
      const tanggalAwalStr = document.getElementById("tanggal-awal-pegawai").value;
      const tanggalAkhirStr = document.getElementById("tanggal-akhir-pegawai").value;

      function parseDate(dateStr) {
        const parts = dateStr.split("/");
        if (parts.length !== 3) return null;
        const day = parseInt(parts[0], 10);
        const month = parseInt(parts[1], 10) - 1;
        const year = parseInt(parts[2], 10);
        return new Date(year, month, day);
      }

      const tanggalAwal = parseDate(tanggalAwalStr);
      const tanggalAkhir = parseDate(tanggalAkhirStr);

      if (!tanggalAwal || !tanggalAkhir || tanggalAwal > tanggalAkhir) {
        resultBox.textContent = "Tanggal tidak valid atau tanggal awal lebih besar dari tanggal akhir.";
        validationStatus[targetId] = false;
        updateProcessButton();
        return;
      }

      // Validasi perner hanya angka
      const perners = textarea.value
        .split("\n")
        .map(line => line.trim())
        .filter(line => line.length > 0);

      const invalidPerners = perners.filter(p => !/^\d+$/.test(p));
      if (invalidPerners.length > 0) {
        resultBox.textContent = "Perner hanya boleh berisi angka.";
        validationStatus[targetId] = false;
        updateProcessButton();
        return;
      }

      // Generate data batch
      function getDatesInRange(startDate, endDate) {
        const dates = [];
        let currentDate = new Date(startDate);
        while (currentDate <= endDate) {
          dates.push(new Date(currentDate));
          currentDate.setDate(currentDate.getDate() + 1);
        }
        return dates;
      }

      const datesInRange = getDatesInRange(tanggalAwal, tanggalAkhir);

      const updateData = [];
      perners.forEach(perner => {
        datesInRange.forEach(date => {
          updateData.push({ perner, tanggal: date.toISOString().slice(0, 10) });
        });
      });

      // Kirim data ke API
      try {
        const response = await fetch('/api/update-perner', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ data: updateData }),
        });
        if (!response.ok) {
          throw new Error("Gagal menghubungi server.");
        }
        const result = await response.json();
        if (result && result.success) {
          resultBox.textContent = "Data berhasil diupdate ke database.";
          validationStatus[targetId] = true;
        } else {
          resultBox.textContent = "Error: " + (result && result.error ? result.error : "Gagal update data.");
          validationStatus[targetId] = false;
        }
      } catch (error) {
        resultBox.textContent = "Terjadi error saat mengirim data: " + error.message;
        validationStatus[targetId] = false;
      }
      updateProcessButton();
    });
  });

  deleteButtons.forEach((btn) => {
    btn.addEventListener("click", () => {
      const targetId = btn.getAttribute("data-target");
      const textarea = document.getElementById(targetId);
      const resultBox = btn.parentElement.querySelector(".result-box");

      textarea.value = "";
      resultBox.textContent = "";
      validationStatus[targetId] = false;
      updateProcessButton();
    });
  });

  // Fungsi untuk parsing tanggal format dd/mm/yyyy ke objek Date
  function parseDate(dateStr) {
    const parts = dateStr.split("/");
    if (parts.length !== 3) return null;
    const day = parseInt(parts[0], 10);
    const month = parseInt(parts[1], 10) - 1; // bulan 0-based
    const year = parseInt(parts[2], 10);
    return new Date(year, month, day);
  }

  // Fungsi untuk mendapatkan array tanggal dari start ke end
  function getDatesInRange(startDate, endDate) {
    const dates = [];
    let currentDate = new Date(startDate);
    while (currentDate <= endDate) {
      dates.push(new Date(currentDate));
      currentDate.setDate(currentDate.getDate() + 1);
    }
    return dates;
  }

  // Fungsi untuk proses data pegawai dan tanggal
  function processDataPegawai() {
    const textarea = document.getElementById("data-pegawai");
    const tanggalAwalStr = document.getElementById("tanggal-awal-pegawai").value;
    const tanggalAkhirStr = document.getElementById("tanggal-akhir-pegawai").value;

    const tanggalAwal = parseDate(tanggalAwalStr);
    const tanggalAkhir = parseDate(tanggalAkhirStr);

    if (!tanggalAwal || !tanggalAkhir || tanggalAwal > tanggalAkhir) {
      alert("Tanggal tidak valid atau tanggal awal lebih besar dari tanggal akhir.");
      return;
    }

    const perners = textarea.value
      .split("\n")
      .map(line => line.trim())
      .filter(line => line.length > 0);

    const datesInRange = getDatesInRange(tanggalAwal, tanggalAkhir);

    // Simulasi update database: tampilkan kombinasi perner dan tanggal
    const updateData = [];
    perners.forEach(perner => {
      datesInRange.forEach(date => {
        updateData.push({ perner, tanggal: date.toISOString().slice(0, 10) });
      });
    });

    console.log("Data yang akan diupdate ke database:", updateData);
    alert(`Data siap diupdate: ${updateData.length} baris.`);
  }

  processBtn.addEventListener("click", () => {
    processDataPegawai();
  });
});

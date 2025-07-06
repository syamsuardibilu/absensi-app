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
    btn.addEventListener("click", () => {
      const targetId = btn.getAttribute("data-target");
      const textarea = document.getElementById(targetId);
      const resultBox = btn.parentElement.querySelector(".result-box");

      if (textarea.value.trim() === "") {
        resultBox.textContent = "Input tidak boleh kosong.";
        validationStatus[targetId] = false;
      } else {
        resultBox.textContent = "Input valid.";
        validationStatus[targetId] = true;
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

  processBtn.addEventListener("click", () => {
    alert("Data sedang diproses...");
    // Tambahkan logika proses data di sini
  });
});

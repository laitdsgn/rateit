document.addEventListener("DOMContentLoaded", () => {
  const AddProductForm = document.querySelector("#add-product-form");
  const AddProductButton = document.querySelector("#final-add-product");
  const popupAddWindow = document.querySelector(".popup-container-add");
  const popupRateWindow = document.querySelector(".popup-container-rate");
  const err = document.querySelector("#err");
  const succ = document.querySelector("#succ");

  if (AddProductForm) {
    AddProductForm.addEventListener("submit", (e) => {
      e.preventDefault();

      const name = document.querySelector("#name").value;
      const description = document.querySelector("#description").value;
      const category = document.querySelector("#category").value;

      console.log(name, description, category);

      fetch("http://localhost/API/api.php?action=createProduct", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: name,
          category: category,
          description: description,
        }),
      })
        .then((response) => response.json())
        .then((data) => {
          console.log("response", data);

          if (data.success || data.message) {
            succ.style.display = "block";
            succ.textContent = "Dodano produkt pomyślnie.";
            popupAddWindow.classList.remove("popup-container-active");
            popupRateWindow.classList.remove("popup-container-active");
          } else {
            err.style.display = "block";
            err.textContent = "Nie udało się dodać produktu.";
            popupAddWindow.classList.remove("popup-container-active");
            popupRateWindow.classList.remove("popup-container-active");
          }
        })
        .catch((err_fetch) => {
          err.style.display = "block";
          err.textContent = "Wystąpił błąd podczas dodawania produktu.";
          console.error("Fetch error", err_fetch);
        });
    });
  } else {
    console.log("Nie znaleziono formularza dodawania produktu.");
  }
});

document.addEventListener("DOMContentLoaded", () => {
  const AddProductForm = document.querySelector("#add-product-form");
  const AddProductButton = document.querySelector("#final-add-product");
  const popupAddWindow = document.querySelector(".popup-container-add");
  const popupRateWindow = document.querySelector(".popup-container-rate");
  const err = document.querySelector("#err");
  const succ = document.querySelector("#succ");

  const productsContainer = document.querySelector(".products");

  function removeErrSuccInfo() {
    setTimeout(() => {
      err.style.display = "none";
      succ.style.display = "none";
    }, 3000);
  }

  function getProducts() {
    fetch("http://localhost/API/api.php?action=getProducts")
      .then((response) => response.json())
      .then((data) => {
        if (Array.isArray(data)) {
          displayProducts(data);
        } else {
          console.error("Nieprawidłowy format danych:", data);
        }
      })
      .catch((err_fetch) => {
        err.style.display = "block";
        err.textContent = "Wystąpił błąd podczas wyświetlania produktu.";
        removeErrSuccInfo();
        console.error("Fetch error", err_fetch);
      });
  }

  getProducts();

  function displayProducts(products) {
    productsContainer.innerHTML = "";

    products.forEach((product) => {
      const productDiv = document.createElement("div");
      productDiv.className = "product";

      productDiv.innerHTML = `
      <div class="product-content">
        <h2>${product.name || "Brak nazwy"}</h2>
        <hr>
        <p>${product.description || "Brak opisu"}</p>
        <p>Kategoria: ${product.category || "Brak kategorii"}</p>
        <p>Ocena: ${product.avg_rating || "0"}/5</p>
      </div>
      <div class="product-functional">
        <button class="rate-product-btn" id="rate-product" data-id="${
          product.id
        }">Oceń</button>
      </div>
      `;

      productsContainer.appendChild(productDiv);

      document.querySelectorAll("#rate-product").forEach((productButton) => {
        let data_id = productButton.getAttribute("data-id");
        console.log(data_id);

        productButton.addEventListener("click", () => {
          popupRateWindow.classList.add("popup-container-active");
        });
      });
    });
  }

  function addProducts() {
    if (AddProductForm) {
      AddProductForm.addEventListener("submit", (e) => {
        e.preventDefault();

        const name = document.querySelector("#name").value;
        const description = document.querySelector("#description").value;
        const category = document.querySelector("#category").value;

        if (!name || !description || !category) {
          err.style.display = "block";
          err.textContent =
            "Wszystkie pola są wymagane. Proszę wypełnić brakujące informacje.";
          removeErrSuccInfo();
          return;
        }

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
              removeErrSuccInfo();
              popupAddWindow.classList.remove("popup-container-active");
              popupRateWindow.classList.remove("popup-container-active");

              setTimeout(function () {
                getProducts();
              }, 1000);
            } else {
              err.style.display = "block";
              err.textContent = "Nie udało się dodać produktu.";
              removeErrSuccInfo();
              popupAddWindow.classList.remove("popup-container-active");
              popupRateWindow.classList.remove("popup-container-active");
            }
          })
          .catch((err_fetch) => {
            err.style.display = "block";
            err.textContent = "Wystąpił błąd podczas dodawania produktu.";
            removeErrSuccInfo();
            console.error("Fetch error", err_fetch);
          });
      });
    } else {
      console.log("Nie znaleziono formularza dodawania produktu.");
    }
  }

  addProducts();
});

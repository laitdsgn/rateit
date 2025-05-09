document.addEventListener("DOMContentLoaded", () => {
  const AddProductForm = document.querySelector("#add-product-form");
  const RateProductForm = document.querySelector("#rate-product-form");
  const popupAddWindow = document.querySelector(".popup-container-add");
  const popupRateWindow = document.querySelector(".popup-container-rate");
  const err = document.querySelector("#err");
  const succ = document.querySelector("#succ");
  const userString = sessionStorage.getItem("user");
  const user = userString ? JSON.parse(userString) : null;
  const user_id = user ? user.id : null;
  const is_user_master = user ? user.is_master : 0;
  let data_id;
  const productsContainer = document.querySelector(".products");

  sessionStorage.setItem("is_master", is_user_master);

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
          deleteProducts();
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
      const deleteButtonStyle = is_user_master === 1 ? "" : "display:none;";
      productDiv.className = "product";

      productDiv.innerHTML = `
      <div class="product-content">
        <p class="productId">#${product.id}</p>
        <p class="deleteProduct" data-id="${
          product.id
        }" style="${deleteButtonStyle}">x</p>
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

      document
        .querySelectorAll(".rate-product-btn")
        .forEach((productButton) => {
          productButton.addEventListener("click", () => {
            data_id = productButton.getAttribute("data-id");
            popupRateWindow.classList.add("popup-container-active");
          });
        });
    });
  }

  function deleteProducts() {
    if (is_user_master === 1) {
      const deleteProducts = document.querySelectorAll(".deleteProduct");

      deleteProducts.forEach((deleteButton) => {
        deleteButton.style.display = "block";

        deleteButton.addEventListener("click", () => {
          const productId = deleteButton.getAttribute("data-id");

          console.log(productId);

          fetch("http://localhost/API/api.php?action=deleteProduct", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              id: productId,
              is_master: is_user_master,
            }),
          })
            .then((response) => response.json())
            .then((data) => {
              if (data.success || data.message) {
                succ.style.display = "block";
                succ.textContent = "Usunięto produkt pomyślnie.";
                removeErrSuccInfo();

                setTimeout(function () {
                  getProducts();
                }, 1000);
              } else {
                err.style.display = "block";
                err.textContent = "Nie udało się usunąć produktu.";
                removeErrSuccInfo();
              }
              console.log(data);
            })
            .catch((err_fetch) => {
              err.style.display = "block";
              err.textContent = "Wystąpił błąd podczas usuwania.";
              removeErrSuccInfo();
              console.error("Fetch error", err_fetch);
            });
        });
      });
    }
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

  function RateProducts() {
    RateProductForm.addEventListener("submit", (e) => {
      e.preventDefault();
      rating = document.querySelector("#rate").value;

      fetch("http://localhost/API/api.php?action=createReview", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          user_id: user_id,
          product_id: data_id,
          rating: rating,
        }),
      })
        .then((response) => response.json())
        .then((data) => {
          if (data.success || data.message) {
            succ.style.display = "block";
            succ.textContent = "Dodano ocenę pomyślnie.";
            removeErrSuccInfo();
            popupRateWindow.classList.remove("popup-container-active");
            setTimeout(function () {
              getProducts();
            }, 1000);
          } else {
            err.style.display = "block";
            err.textContent = "Nie udało się dodać oceny.";
            removeErrSuccInfo();
            popupRateWindow.classList.remove("popup-container-active");
          }
        });
    });
  }

  RateProducts();
});

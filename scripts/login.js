const loginForm = document.getElementById("login-form");

document.addEventListener("DOMContentLoaded", function () {
  // check if loginForm exists
  if (loginForm) {
    const error = document.getElementById("err");

    loginForm.addEventListener("submit", (e) => {
      e.preventDefault();

      const username = document.getElementById("username").value;
      const password = document.getElementById("pass").value;

      // using API, send login request
      fetch("http://localhost/API/api.php?action=login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: username,
          pass: password,
        }),
      })
        .then((response) => response.json())
        .then((data) => {
          if (data.success) {
            sessionStorage.setItem("user", JSON.stringify(data.user));

            window.location.href = "../pages/products.html";
          } else {
            if (error) {
              error.style.display = "block";
              error.innerHTML = data.error;
            } else {
              alert("Błąd krytyczny" + data.error);
            }
          }
        })
        .catch((error) => {
          if (error) {
            error.style.display = "block";
            error.textContent = "Fetch error" + error;
          } else {
            alert("Błąd krytyczny" + error);
            console.error("Error:", error);
          }
        });
    });
  }
});

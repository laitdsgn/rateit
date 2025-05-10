document.addEventListener("DOMContentLoaded", function () {
  const registerForm = document.getElementById("register-form");
  const error = document.getElementById("err");

  if (registerForm) {
    registerForm.addEventListener("submit", function (e) {
      e.preventDefault();

      const username = document.getElementById("username").value;
      const password = document.getElementById("pass").value;
      const passwordRepeat = document.getElementById("pass-repeat").value;

      // Check if fields are empty, password length requirements,
      // or if username/password contain only whitespace
      if (
        username === "" ||
        password === "" ||
        passwordRepeat === "" ||
        password.length < 8 ||
        password.length > 20 ||
        username.trim() === "" || // Check if username contains only spaces
        password.trim() === "" || // Check if password contains only spaces
        username.includes(" ") || // Check if username contains spaces
        password.includes(" ") // Check if password contains spaces
      ) {
        error.textContent =
          "Pola są puste, zawierają tylko spacje lub hasło ma mniej niż 8 albo więcej niż 20 znaków!";
        error.style.display = "block";
        return;
      } else if (password == passwordRepeat) {
        fetch("http://localhost/API/api.php?action=createUser", {
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
            console.log("response", data);

            if (data.success || data.message) {
              window.location.href = "login.html";
            } else {
              error.style.display = "block";
              error.innerHTML = data.error;
            }
          })
          .catch((errr) => {
            error.textContent =
              "Fetch error" +
              errr +
              "(Lub jest inny użytkownik o takiej nazwie)";
            alert("Błąd krytyczny");
          });
      } else {
        error.style.display = "block";
        error.textContent = "Hasła nie są takie same!";
      }
    });
  }
});

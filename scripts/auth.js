document.addEventListener("DOMContentLoaded", function () {
  const user = JSON.parse(sessionStorage.getItem("user"));
  // check if user is logged in as an admin
  const is_master_auth = sessionStorage.getItem("is_master");

  // if user logged in, show logout button
  if (user) {
    const wyloguj = document.getElementById("logout");
    wyloguj.style.display = "block";

    wyloguj.innerHTML = `Wyloguj ${user.username}`;

    wyloguj.addEventListener("click", function () {
      sessionStorage.removeItem("user");
      window.location.href = "login.html";
    });

    // if logged ad an admin, show message
    if (is_master_auth == 1) {
      const status = document.getElementById("masterStatus");

      status.style.display = "block";
      status.innerHTML = `Zalogowano <br>  jako master!`;
    }
  } else {
    const page = document.querySelector("html");
    page.remove();
    page.style.display = "none";
    console.error("Nie jestes zalogowany!");
    window.location.href = "../pages/login.html";
  }
});

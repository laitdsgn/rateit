document.addEventListener('DOMContentLoaded', function() { 

    const user = JSON.parse(sessionStorage.getItem('user'));

    if (user) {
        
        const wyloguj = document.getElementById('logout');
        wyloguj.style.display = 'block';

        wyloguj.innerHTML = `Wyloguj ${user.username}`;

        wyloguj.addEventListener('click', function() {
            sessionStorage.removeItem('user');
            window.location.href = 'login.html';
        });



    } else {
        const page = document.querySelector('html');
        page.remove();
        page.style.display = 'none';
        console.error('Nie jestes zalogowany!')
    }


});
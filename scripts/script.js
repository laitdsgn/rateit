const addProduct = document.getElementById('add-product');
const rateProduct = document.querySelectorAll('#rate-product');
const popupAddWindow = document.querySelector('.popup-container-add');
const popupRateWindow = document.querySelector('.popup-container-rate');
const closePopup = document.querySelectorAll('.close-popup');

addProduct.addEventListener('click', () => {
    popupAddWindow.classList.add('popup-container-active');
});

closePopup.forEach(button => {
    button.addEventListener('click', () => {
        popupAddWindow.classList.remove('popup-container-active');
        popupRateWindow.classList.remove('popup-container-active');
    });
});

rateProduct.forEach((rate) => {
    rate.addEventListener('click', () => {
        popupRateWindow.classList.add('popup-container-active');
    });
});

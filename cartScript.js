// Анимация появления страницы
setTimeout(function(){
    document.body.classList.add('body_visible');
}, 50);



total_price_to_pay = document.querySelector('#cart-total-price')

let cookies = document.cookie.split('; ');

// Ищем нужные cookies
cookies.forEach(cookie => {
    let [name, value] = cookie.split('=');
    if (name === 'cartItems') cartData = decodeURIComponent(value);
});


if (cartData) {
    let items = JSON.parse(cartData);

    let total = items.reduce((sum, item) => sum + item.price, 0);
    console.log(total)
    total_price_to_pay.innerHTML = total + '₽'
}


document.addEventListener('DOMContentLoaded', function() {
    loadCartFromCookies();
});
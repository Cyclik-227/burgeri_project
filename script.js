let cart = [];
let cart_count = document.getElementById('cart-count');
let cart_button = document.querySelector('.cart-button');
let cart_background = document.querySelector('.cart-background');
let cart_container = document.querySelector('.cart-container');
let cart_content = document.querySelector('.cart-content');
let total_items = document.getElementById('total-items');
let total_price = document.getElementById('total-price');

// Функция сохранения корзины в cookies
function saveCartToCookies() {
    // Собираем данные о товарах в корзине
    let cartItems = [];
    let items = cart_content.querySelectorAll('.cart-item');
    
    items.forEach(item => {
        cartItems.push({
            name: item.querySelector('.item-name').innerHTML,
            stats: item.querySelector('.item-stats').innerHTML,
            price: parseInt(item.querySelector('.item-price').innerHTML.replace(/\D/g, ''))
        });
    });
    
    // Сохраняем в cookies на 7 дней
    let cartData = JSON.stringify(cartItems);
    
    document.cookie = `cartItems=${encodeURIComponent(cartData)}; max-age=${7 * 24 * 60 * 60}; path=/`;
    document.cookie = `cartCount=${encodeURIComponent(cart.length)}; max-age=${7 * 24 * 60 * 60}; path=/`;
}

// Функция загрузки корзины из cookies
function loadCartFromCookies() {
    // Получаем все cookies
    let cookies = document.cookie.split('; ');
    let cartData = null;
    
    // Ищем нужные cookies
    cookies.forEach(cookie => {
        let [name, value] = cookie.split('=');
        if (name === 'cartItems') cartData = decodeURIComponent(value);
    });
    
    // Если есть сохраненные данные, восстанавливаем корзину
    if (cartData) {
        let items = JSON.parse(cartData);
        
        // Очищаем текущую корзину
        cart_content.innerHTML = '';
        cart = [];
        
        // Восстанавливаем каждый товар
        items.forEach(item => {
            let cartItem = document.createElement('div');
            cartItem.className = 'cart-item';
            
            let p_name = document.createElement('p');
            p_name.className = 'item-name';
            p_name.innerHTML = item.name;
            
            let p_stats = document.createElement('p');
            p_stats.className = 'item-stats';
            p_stats.innerHTML = item.stats;
            
            let p_price = document.createElement('p');
            p_price.className = 'item-price';
            p_price.innerHTML = item.price + 'р.';
            
            let btn_del = document.createElement('div');
            btn_del.className = 'btn-del1t';
            btn_del.innerHTML = 'Удалить';
            
            cartItem.appendChild(p_name);
            cartItem.appendChild(p_stats);
            cartItem.appendChild(p_price);
            cartItem.appendChild(btn_del);
            cart_content.appendChild(cartItem);
            
            cart.push(item.price);
            
            // Добавляем обработчик удаления
            btn_del.addEventListener('click', function() {
                cartItem.remove();
                
                let total_now = parseInt(total_price.innerHTML.replace(/\D/g, ''));
                total_price.innerHTML = (total_now - item.price) + 'р.';
                
                let current_count = parseInt(cart_count.innerHTML);
                cart_count.innerHTML = current_count - 1;
                total_items.innerHTML = current_count - 1;
                
                // Обновляем корзину в памяти
                let index = cart.indexOf(item.price);
                if (index > -1) cart.splice(index, 1);
                
                // Обновляем cookies после удаления
                saveCartToCookies();
            });
        });
        
        // Восстанавливаем общую информацию
        let total = items.reduce((sum, item) => sum + item.price, 0);
        total_price.innerHTML = total + 'р.';
        cart_count.innerHTML = items.length;
        total_items.innerHTML = items.length;
    }
}

// Функции для анимации
function show_obj(obj, max_value, speed) {
    obj.style.display = 'block';
    let opacity = 0;
    let interval = setInterval(function() {
        opacity += speed;
        obj.style.opacity = opacity;
        if (opacity >= max_value) {
            clearInterval(interval);
        }
    }, 10);
}

function hide_obj(obj, speed) {
    let opacity = parseFloat(window.getComputedStyle(obj).opacity);
    let interval = setInterval(function() {
        opacity -= speed;
        obj.style.opacity = opacity;
        if (opacity <= 0) {
            obj.style.display = 'none';
            clearInterval(interval);
        }
    }, 10);
}

// Обработчики для кнопок добавления в корзину
let buttons = document.querySelectorAll('.burger .btn');
for (let i = 0; i < buttons.length; i++) {
    let btn = buttons[i];
    
    btn.addEventListener('click', function() {
        let burger_div = btn.closest('.burger');
        let name = burger_div.querySelector('span:not([class])').innerHTML;
        let price_text = btn.querySelector('.infoburger').innerHTML;
        let price = parseInt(price_text.replace(/\D/g, ''));
        let stats = burger_div.querySelector('.burger-stats').innerHTML;

        cart.push(price);
        cart_count.innerHTML = cart.length;
        total_items.innerHTML = cart.length;

        let current_total = parseInt(total_price.innerHTML.replace(/\D/g, ''));
        total_price.innerHTML = (current_total + price) + 'р.';

        let cartItem = document.createElement('div');
        cartItem.className = 'cart-item';

        let p_name = document.createElement('p');
        p_name.className = 'item-name';
        p_name.innerHTML = name;
        
        let p_stats = document.createElement('p');
        p_stats.className = 'item-stats';
        p_stats.innerHTML = stats;

        let p_price = document.createElement('p');
        p_price.className = 'item-price';
        p_price.innerHTML = price + 'р.';

        let btn_del = document.createElement('div');
        btn_del.className = 'btn-del1t';
        btn_del.innerHTML = 'Удалить';

        cartItem.appendChild(p_name);
        cartItem.appendChild(p_stats);
        cartItem.appendChild(p_price);
        cartItem.appendChild(btn_del);
        cart_content.appendChild(cartItem);

        btn_del.addEventListener('click', function() {
            cartItem.remove();
            
            let total_now = parseInt(total_price.innerHTML.replace(/\D/g, ''));
            total_price.innerHTML = (total_now - price) + 'р.';
            
            let current_count = parseInt(cart_count.innerHTML);
            cart_count.innerHTML = current_count - 1;
            total_items.innerHTML = current_count - 1;
            
            // Удаляем из массива cart
            let index = cart.indexOf(price);
            if (index > -1) cart.splice(index, 1);
            
            // Сохраняем изменения в cookies
            saveCartToCookies();
        });

        // Сохраняем корзину в cookies после добавления
        saveCartToCookies();
    });
}

// Обработчик открытия/закрытия корзины
let is_cart_open = false;
if (cart_button) {
    cart_button.addEventListener('click', function() {
        if (is_cart_open == false) {
            show_obj(cart_background, 0.5, 0.05);
            show_obj(cart_container, 0.9, 0.05);
            is_cart_open = true;
        } else {
            hide_obj(cart_background, 0.08);
            hide_obj(cart_container, 0.08);
            is_cart_open = false;
        }
    });
}

// Обработчик очистки корзины
let clear_btn = document.getElementById('btn_clear_cart');
if (clear_btn) {
    clear_btn.addEventListener('click', function() {
        cart_content.innerHTML = '';
        cart_count.innerHTML = '0';
        total_items.innerHTML = '0';
        total_price.innerHTML = '0р.';
        cart = [];
        
        // Очищаем cookies
        document.cookie = 'cartItems=; max-age=0; path=/';
        document.cookie = 'cartCount=; max-age=0; path=/';
    });
}

// Анимация появления страницы
setTimeout(function(){
    document.body.classList.add('body_visible');
}, 50);

// Обработчик для отзыва
let fdfd = document.getElementById("fdfd");
if (fdfd != null) {
    fdfd.onclick = function() {
        alert('Какой еще отзыв?! Сначала купите что-нибудь! 🍔');
    };
}

// Загружаем корзину при загрузке страницы
document.addEventListener('DOMContentLoaded', function() {
    loadCartFromCookies();
});



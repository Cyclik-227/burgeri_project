let cart = [];
let cart_count = document.getElementById('cart-count');
let cart_button = document.querySelector('.cart-button');
let cart_background = document.querySelector('.cart-background');
let cart_container = document.querySelector('.cart-container');
let cart_content = document.querySelector('.cart-content');
let total_items = document.getElementById('total-items');
let total_price = document.getElementById('total-price');

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

        let p_name = document.createElement('p');
        p_name.innerHTML = name;
        
        let p_stats = document.createElement('p');
        p_stats.innerHTML = stats;

        let p_price = document.createElement('p');
        p_price.innerHTML = price + 'р.';

        let btn_del = document.createElement('div');
        btn_del.className = 'btn-del1t';
        btn_del.innerHTML = 'Удалить';

        cart_content.appendChild(p_name);
        cart_content.appendChild(p_stats);
        cart_content.appendChild(p_price);
        cart_content.appendChild(btn_del);

        btn_del.addEventListener('click', function() {
            p_name.remove();
            p_stats.remove();
            p_price.remove();
            btn_del.remove();
            
            let total_now = parseInt(total_price.innerHTML.replace(/\D/g, ''));
            total_price.innerHTML = (total_now - price) + 'р.';
            
            let current_count = parseInt(cart_count.innerHTML);
            cart_count.innerHTML = current_count - 1;
            total_items.innerHTML = current_count - 1;
        });
    });
}

let is_cart_open = false;
if (cart_button) {
    cart_button.addEventListener('click', function() {
        if (is_cart_open == false) {
            show_obj(cart_background, 0.5, 0.05);
            show_obj(cart_container, 0.9, 0.05);
            document.documentElement.style.overflow = 'hidden';
            document.body.style.overflow = 'hidden';
            is_cart_open = true;
        } else {
            hide_obj(cart_background, 0.08);
            hide_obj(cart_container, 0.08);
            document.documentElement.style.overflow = '';
            document.body.style.overflow = '';
            is_cart_open = false;
        }
    });
}

let clear_btn = document.getElementById('btn_clear_cart');
if (clear_btn) {
    clear_btn.addEventListener('click', function() {
        cart_content.innerHTML = '';
        cart_count.innerHTML = '0';
        total_items.innerHTML = '0';
        total_price.innerHTML = '0р.';
        cart = [];
    });
};

setTimeout(function(){
	document.body.classList.add('body_visible');
}, 50);

document.getElementById("fdfd").onclick = function() {
    alert('Какой еще отзыв?! Сначала купите что-нибудь! 🍔');
};


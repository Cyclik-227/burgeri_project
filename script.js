// document.getElementById("fdfd").onclick = function() {
//     alert('Какой еще отзыв?! Сначала купите что-нибудь! 🍔');
// };  ------- на странице нет fdfd



let cart = []
let cart_count = document.getElementById('cart-count')

let cart_button = document.querySelector('.cart-button')

let cart_background = document.querySelector('.cart-background')
let cart_container = document.querySelector('.cart-container')
let cart_content = document.querySelector('.cart-content')

let total_items = document.getElementById('total-items')
let total_price = document.getElementById('total-price')


// сохранение куки
function save_cookie() {
    console.log(cart, '-----', total_items, '---------', total_price)
    const encodedCart = encodeURIComponent(JSON.stringify(cart));
    const encodedItems = encodeURIComponent(total_items.innerHTML);
    const encodedPrice = encodeURIComponent(total_price.innerHTML);
    
    // Записываем каждую cookie отдельно с разделителем "; "
    document.cookie = `cart=${encodedCart}; path=/`;
    document.cookie = `total_items=${encodedItems}; path=/`;
    document.cookie = `total_price=${encodedPrice}; path=/`;

    console.log(document.cookie);
}


function show_obj(obj, max_value, speed) {
        obj.style.display = 'block'
        if (window.getComputedStyle(obj).opacity <= max_value) {
            const interval = setInterval(() => {
                obj.style.opacity = parseFloat(window.getComputedStyle(obj).opacity) + speed;
                if (window.getComputedStyle(obj).opacity > max_value) {
                    clearInterval(interval);
                }
            }, 10);
        }       
        
}
function hide_obj(obj, max_value, speed) {
        if (window.getComputedStyle(obj).opacity > max_value) {
            setTimeout(function(){
                obj.style.display = 'none'
            }, 100)
            const interval = setInterval(() => {
                obj.style.opacity = parseFloat(window.getComputedStyle(obj).opacity) - speed;
                if (window.getComputedStyle(obj).opacity <= max_value) {
                    clearInterval(interval);
                    
                }
            }, 10);
        }       
        
}


function get_cart_count() {
    total = 0
    for (i = 0; i < cart.length; i++) {
        if (cart[i].length > 0) {
            total += 1
        }
    }
    return total
}


function add_item_to_cart(item)
{   
    if (cookie_loading == false) {
            
            burger_price = item.innerHTML.replace(/\D/g, '')  // <<<< вырез всего кроме цифр
            burger_name = item.closest('div .burger').querySelector('span:not([class])').innerHTML
            burger_status = item.closest('div .burger').querySelector('.burger-stats').innerHTML

            total_price.innerHTML = parseInt(total_price.innerHTML) + parseInt(burger_price) + 'р.'

            total_items.innerHTML = get_cart_count()

            cart.push([burger_name, burger_status, burger_price])
    } else {
            burger_price = item[2]
            burger_name = item[0]
            burger_status = item[1]

            total_items.innerHTML = total_items
            total_price.innerHTML = total_price
    }
    cart_count.innerHTML = get_cart_count()

    newParagraph = document.createElement('p');
    newParagraph.textContent = burger_name;
    newParagraph.className = 'cart-item'
    newParagraph.id = 'burger_name' + cart.length
    cart_content.appendChild(newParagraph);

    newParagraph = document.createElement('p');
    newParagraph.textContent = burger_status;
    newParagraph.className = 'cart-item'
    newParagraph.id = 'burger_status' + cart.length
    cart_content.appendChild(newParagraph);

    newParagraph = document.createElement('p');
    newParagraph.textContent = burger_price + 'р.';
    newParagraph.className = 'cart-item'
    newParagraph.id = 'burger_price' + cart.length
    cart_content.appendChild(newParagraph);

    newDiv = document.createElement('div');
    newDiv.textContent = 'Удалить';
    newDiv.className = 'btn'
    newDiv.id = 'delete_burger' + cart.length
    newDiv.style.width = '50%'
    newDiv.style.marginLeft = '0'
    cart_content.appendChild(newDiv);

    let delete_buttons = document.querySelectorAll('.cart-content .btn')
    delete_buttons.forEach(del_btn => {del_btn.onclick = function() {
            id_to_delete = del_btn.id.replace(/\D/g, '')  // <<<< вырез всего кроме цифр
            let elements_to_delete = [
                cart_content.querySelector('#burger_name' + id_to_delete),
                cart_content.querySelector('#burger_status' + id_to_delete),
                cart_content.querySelector('#burger_price' + id_to_delete),
                cart_content.querySelector('#delete_burger' + id_to_delete)
            ]
            total_price.innerHTML = parseInt(total_price.innerHTML) - parseInt(elements_to_delete[2].innerHTML.replace(/\D/g, '')) + 'р.'
            cart[id_to_delete-1] = []
            elements_to_delete.forEach(obj => {hide_obj(obj, 0, 0.07)})
            cart_count.innerHTML = get_cart_count()
            total_items.innerHTML = get_cart_count()
            }
        }
    )    
    if (cookie_loading == false){
        console.log('сохранение куки')
        save_cookie()
    }
}

let buttons = document.querySelectorAll('.burger .btn');
console.log(buttons)

let cookie_loading = false
buttons.forEach(btn => { btn.addEventListener('click', function() { add_item_to_cart(btn)} )}) 



// загрузка куки

function load_cookie() {
    let cookie_loading = true
    let cookies = document.cookie.split('; ')
    console.log(document.cookie)

    cookies.forEach(cookie => {
        let [key, value] = cookie.split('=')
        
        if (!value) return // пропускаем пустые значения
        
        switch(key) {
            case 'total_items':
                total_items.innerHTML = value
                break
                
            case 'total_price':
                total_price.innerHTML = value
                break
                
            case 'cart':
                if (value.startsWith('[') || value.startsWith('{')) {
                    try {
                        let cartItems = JSON.parse(decodeURIComponent(value))
                        cartItems.forEach(item => add_item_to_cart(item))
                    } catch(e) {
                        console.error('Ошибка парсинга корзины:', e)
                    }
                }
                break
        }
    })
    cookie_loading = false
}

load_cookie()



function removeAllChildren(parent) {
    while (parent.firstChild) {
        parent.removeChild(parent.firstChild);
    }
}

let btn_clear_cart = document.querySelector('#btn_clear_cart')
btn_clear_cart.addEventListener('click', function() {
        cart = []
        cart_count.innerHTML = 0
        total_items.innerHTML = 0
        total_price.innerHTML = '0р.'
        removeAllChildren(cart_content)
        save_cookie()

})



let show_cart = false

cart_button.addEventListener('click', function() {
        if (show_cart == false) {
                console.log('asdasd')

                show_obj(cart_background, 0.5, 0.05)
                show_obj(cart_container, 0.9, 0.05)
                show_cart = true
        }

        else {
                console.log('rerer')

                hide_obj(cart_background, 0, 0.09)
                hide_obj(cart_container, 0, 0.09)
                show_cart = false
        }

    }
)
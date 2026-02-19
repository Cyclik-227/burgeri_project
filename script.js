// document.getElementById("fdfd").onclick = function() {
//     alert('Какой еще отзыв?! Сначала купите что-нибудь! 🍔');
// };   на странице нет fdfd

let cart = []
let cart_count = document.getElementById('cart-count')

let cart_button = document.querySelector('.cart-button')

let cart_background = document.querySelector('.cart-background')
let cart_container = document.querySelector('.cart-container')
let cart_content = document.querySelector('.cart-content')

let total_items = document.getElementById('total-items')
let total_price = document.getElementById('total-price')

let buttons = document.querySelectorAll('.burger .btn');
console.log('asddas')
console.log(buttons)




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
            console.log(cart[i])
            total += 1
        }
    }
    console.log(cart.length, total)
    return total
}


buttons.forEach(btn => { btn.addEventListener('click', function() 
        {

            burger_price = btn.innerHTML.replace(/\D/g, '')  // <<<< вырез всего кроме цифр
            burger_name = btn.closest('div .burger').querySelector('span:not([class])').innerHTML
            burger_status = btn.closest('div .burger').querySelector('.burger-stats').innerHTML

            total_price.innerHTML = parseInt(total_price.innerHTML) + parseInt(burger_price) + 'р.'

            total_items.innerHTML = get_cart_count()

            console.log(burger_name)
            cart.push([burger_name, burger_price])
            console.log(cart)
            console.log(get_cart_count())
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

            })

        })
    }
)

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
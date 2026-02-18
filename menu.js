let nagets = document.getElementById("nagets")
let burger_cezar = document.getElementById('cezar')
let kombo = document.getElementById("kombo")
let burger_slad_hruk = document.getElementById("slad-hruk")
let burger_kunzut = document.getElementById("kunzhut")
let burger_2big_hryak = document.getElementById("2big-hruk")
let kartoha = document.getElementById("kartoha")
let sir = document.getElementById("sir-hruch")
let gribnik = document.getElementById('gribnik')
let mor_briz = document.getElementById('morsk-briz')
let ad_hruk = document.getElementById('adsk-hruk')
let big_hruk = document.getElementById("big-hruk")

let Cart_Count = document.getElementById("cart-count")

let all_in = 0

let cart = {};

burger_slad_hruk.addEventListener('click', (e) => {
    all_in += 200
    Cart_Count.textContent = all_in
    cart += burger_slad_hruk
    console.log(cart)
})

burger_2big_hryak.addEventListener('click', (e)=> {
    all_in += 540
    Cart_Count.textContent = all_in
    cart += burger_2big_hryak
    console.log(cart)

})



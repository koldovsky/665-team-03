const buttonForAdd = document.querySelectorAll(".product-button")
const shopingBasket = document.querySelector(".shoping-basket")
const counterOnBasket = document.querySelector(".shoping-basket-counter")
let counter = 0

function summonBasket(){
    shopingBasket.classList.add('active')
    counterOnBasket.classList.add('active')
    if(counter>99){counterOnBasket.textContent ="99+"}
    else{counterOnBasket.textContent = counter}
    counter++
}

buttonForAdd.forEach(el=>el.addEventListener('click',summonBasket))

(function(){
const buttonForAdd = document.querySelectorAll(".product-button")
const shopingBasket = document.querySelector(".shoping-basket")
const counterOnBasket = document.querySelector(".shoping-basket-counter")
const modalWindow = document.querySelector(".modal-basket-container")
const modalCosureButton = document.querySelector(".modal-basket-close")
const bodyElement = document.querySelector("body")
const modalBasket = document.querySelector(".modal-basket")
let counter = 1

function summonBasket(){ 
    shopingBasket.classList.add('active')
    counterOnBasket.classList.add('active')
    shopingBasket.classList.add('animated')
    if(counter>99){counterOnBasket.textContent ="99+"}
    else{counterOnBasket.textContent = counter}
    counter++
    setTimeout(removeAnimation,100)
}
function removeAnimation(){
shopingBasket.classList.remove('animated')
}

function openBasket(){
    modalWindow.classList.add('active')
    bodyElement.classList.add('lock')
    modalBasket.classList.add('active')    
}
function clouseBasket(){
bodyElement.classList.remove('lock')
modalWindow.classList.remove('active')
modalBasket.classList.remove('active')
}
buttonForAdd.forEach(el=>el.addEventListener('click',summonBasket))
shopingBasket.addEventListener('click',openBasket)
modalCosureButton.addEventListener('click',clouseBasket)
})()


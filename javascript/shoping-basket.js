(function () {
    const buttonForAdd = document.querySelectorAll(".product-button")
    const shopingBasket = document.querySelector(".shoping-basket")
    const counterOnBasket = document.querySelector(".shoping-basket-counter")
    const modalWindow = document.querySelector(".modal-basket-container")
    const modalCosureButton = document.querySelector(".modal-basket-close")
    const bodyElement = document.querySelector("body")
    const modalBasket = document.querySelector(".modal-basket")
    const productsInBasket = document.querySelector(".modal-basket-products-wrapper")

    let counter = 1


    function summonBasket() {
        shopingBasket.classList.add('active')
        counterOnBasket.classList.add('active')
        shopingBasket.classList.add('animated')
        if (counter > 99) { counterOnBasket.textContent = "99+" }
        else { counterOnBasket.textContent = counter }
        counter++
        setTimeout(removeAnimation, 100)
    }
    function removeAnimation() {
        shopingBasket.classList.remove('animated')
    }

    function openBasket() {
        modalWindow.classList.add('active')
        bodyElement.classList.add('lock')
        modalBasket.classList.add('active')
        shopingBasket.classList.remove('active')
        productsInBasket.classList.add('active')
    }

    function clouseBasket() {
        bodyElement.classList.remove('lock')
        modalWindow.classList.remove('active')
        modalBasket.classList.remove('active')
        if (counter > 1) { shopingBasket.classList.add('active') }
    }
    buttonForAdd.forEach(el => el.addEventListener('click', summonBasket))
    shopingBasket.addEventListener('click', openBasket)
    modalCosureButton.addEventListener('click', clouseBasket)


    const carousel = document.querySelector('.new-arrivals_carousel')
    carousel.addEventListener('click', findElement, false);

    let id = 100

    function findElement(e) {
        let targetElement = e.target
        addTOCart(targetElement)
    }

    function addTOCart(el) {
        id++
        const img = el.parentElement.parentElement.children[0].innerHTML
        const name = el.parentElement.parentElement.children[1].children[0].innerHTML
        const price = el.parentElement.parentElement.children[2].innerHTML
        const productContainer = document.querySelector(".modal-basket-product-list")
        const itemCard = `<div class="modal-basket-product-container" id="${id}">
        <div class="modal-basket-product-img-container">
            ${img}
        </div>
        <div class="modal-basket-product-info">
            <div class="modal-basket-product-name">${name}</div>
            <div class="modal-basket-product-quantity">
                <input class="modal-basket-product-input" type="text">
                <button class="modal-basket-product-button up"></button>
                <button class=" modal-basket-product-button down"></button>
            </div>
            <div class="modal-basket-product-price">${price}</div>
        </div>
        <button class="modal-basket-product-delete"></button>
    </div>
    </div>`
        if (el.classList.contains("product-button")) { productContainer.innerHTML += itemCard }
        const productsForCheck = document.querySelectorAll(".modal-basket-product-container")
        countProducts(productsForCheck)
    }

    function countProducts(products) {
        let quantity = 0
        for (const product of products) {
            const inputQuantity = product.children[1].children[1].children[0]
            quantity++ 
            inputQuantity.value = quantity
            function updatequan(quan) {
                inputQuantity.value !== quan ? quan = inputQuantity.value : inputQuantity.value = quan
            }
            setInterval(() => {
                updatequan(quantity)
            }, 100);

        }
    }
    const deleteButton = document.querySelector(".modal-basket-product-delete")
    // if (productsForCheck.length > 0) {
    //     
    //     deleteButton.addEventListener('click', removeElement(id))
    // }



    function removeElement(num) {
        let deletedElement = document.getElementById(num)
        deletedElement.remove()
    }


})()
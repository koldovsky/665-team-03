(function () {
    const shopingBasket = document.querySelector(".shoping-basket")
    const counterOnBasket = document.querySelector(".shoping-basket-counter")
    const modalWindow = document.querySelector(".modal-basket-container")
    const modalCosureButton = document.querySelector(".modal-basket-close")
    const bodyElement = document.querySelector("body")
    const modalBasket = document.querySelector(".modal-basket")
    const productsInBasket = document.querySelector(".modal-basket-products-wrapper")
    const emptyBasket = document.querySelector(".modal-basket-empty")
    let count
    let counter = 0


    function summonBasket() {
        counter++
        emptyBasket.classList.remove('active')
        shopingBasket.classList.add('active')
        counterOnBasket.classList.add('active')
        shopingBasket.classList.add('animated')
        if (counter > 99) { counterOnBasket.textContent = "99+" }
        else { counterOnBasket.textContent = counter }
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
        if (counter >= 1) { shopingBasket.classList.add('active') }
    }

    shopingBasket.addEventListener('click', openBasket)
    modalCosureButton.addEventListener('click', clouseBasket)

    const carousel = document.querySelector('.new-arrivals_carousel')
    carousel.addEventListener('click', findElement, false);



    function findElement(e) {
        if (e.target.classList.contains("product-button")) {
        addTOCart(e.target)
        summonBasket()
    }
    }

    function addTOCart(el) {
        const id = el.parentElement.parentElement.getAttribute('data-id')
        const img = el.parentElement.parentElement.children[0].innerHTML
        const name = el.parentElement.parentElement.children[1].children[0].innerHTML
        const price = el.closest('.new-arrivals-product').querySelector('.product-price-text').innerText
        const productContainer = document.querySelector(".modal-basket-product-list")
        const itemIsInCart = productContainer.querySelector(`[data-id="${id}"]`)
        const itemCard = `<div class="modal-basket-product-container cart-item" data-id="${id}">
        <div class="modal-basket-product-img-container">
            ${img}
        </div>
        <div class="modal-basket-product-info">
            <div class="modal-basket-product-name">${name}</div>
            <div class="items counter-wrapper modal-basket-product-quantity">
            <div class="items__control modal-basket-product-button down" ><img src="img/shoping-basket/quntity-arrow.png" data-action="minus"></div>
            <div class="items__current" data-counter>1</div>
            <div class="items__control modal-basket-product-button up" ><img src="img/shoping-basket/quntity-arrow.png" data-action="plus"></div>
            </div>
        </div>
        <p class="dollar-or-uah">$</p>
            <div class="modal-basket-product-price active">${price}</div>
            <div class="modal-basket-product-price-total"></div>
        <button class="modal-basket-product-delete" data-delete="delete"></button>
    </div>`

            if (itemIsInCart) {
                const counterElement = itemIsInCart.querySelector('[data-counter]')
                counterElement.innerText = parseInt(counterElement.innerText) + 1
                calckEachElement(counterElement)
            }
            else { productContainer.innerHTML += itemCard }
            calcCartPrice()
    }

    modalBasket.addEventListener('click', function (event) {
        if (event.target.dataset.action === 'plus' || event.target.dataset.action === 'minus') {
            const counterWrapper = event.target.closest('.counter-wrapper');
            count = counterWrapper.querySelector('[data-counter]');
        }

        if (event.target.dataset.action === 'plus') {
            count.innerText = ++count.innerText;
            counter++
            counterOnBasket.textContent = counter
            calckEachElement(event.target)
        }
        if (event.target.dataset.action === 'minus') {

            if (parseInt(count.innerText) > 1) {
                count.innerText = --count.innerText;
                counter--
                counterOnBasket.textContent = counter
                calckEachElement(event.target)

            } else if (parseInt(count.innerText) === 1) {
                event.target.closest('.cart-item').remove();
                counter--
                counterOnBasket.textContent = counter
                toggleCart()

            }

        }
        calcCartPrice()
    })

    function deleteFromCart(event) {
        count = event.target.closest('.cart-item').querySelector('[data-counter]')
        counter -= count.innerText
        counterOnBasket.textContent = counter
        event.target.closest('.cart-item').remove();
        toggleCart()
        calcCartPrice()
    }

    function toggleCart() {
        const allCards = document.querySelectorAll(".cart-item")
        console.log(allCards.length)
        if (allCards.length < 1) {
            productsInBasket.classList.remove('active')
            emptyBasket.classList.add('active')
        }
    }

    modalBasket.addEventListener('click', function (event) {
        if (event.target.dataset.delete === 'delete') {
            deleteFromCart(event)
        }
    })

    function calcCartPrice() {
        const cartWrapper = document.querySelector('.modal-basket-container');
        const priceElements = cartWrapper.querySelectorAll('.modal-basket-product-price');
        const totalPriceEl = document.querySelector('.total-price');

        let priceTotal = 0;

        priceElements.forEach(function (item) {
            const amountEl = item.closest('.cart-item').querySelector('[data-counter]');
            priceTotal += parseFloat(item.innerText) * parseInt(amountEl.innerText);
        });
        if (priceTotal % 1 === 0){priceTotal += ',00'}
        totalPriceEl.innerText = priceTotal;
    }

    function calckEachElement(element) {
        const cardWraper = element.closest('.cart-item')
        const count = cardWraper.querySelector('[data-counter]')
        console.log(count.innerText)
        const priceOfOne = cardWraper.querySelector('.modal-basket-product-price')
        const totalPriceContainer = cardWraper.querySelector('.modal-basket-product-price-total')
        let totalPrice = parseInt(count.innerText) * parseFloat(priceOfOne.innerText)
        if (totalPrice%1 === 0){totalPrice+=',00'}
        totalPriceContainer.innerText = totalPrice
        if (parseInt(count.innerText) > 1) {
            priceOfOne.classList.remove('active')
            totalPriceContainer.classList.add('active')
        }
        else {
            priceOfOne.classList.add('active')
            totalPriceContainer.classList.remove('active')
        }
        calcCartPrice()
    }

})()
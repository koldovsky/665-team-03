(function () {
    const shopingBasket = document.querySelector(".shoping-basket")
    const counterOnBasket = document.querySelector(".shoping-basket-counter")
    const modalWindow = document.querySelector(".modal-basket-container")
    const modalCosureButton = document.querySelector(".modal-basket-close")
    const bodyElement = document.querySelector("body")
    const modalBasket = document.querySelector(".modal-basket")
    const productsInBasket = document.querySelector(".modal-basket-products-wrapper")
    const emptyBasket = document.querySelector(".modal-basket-empty")
    const productContainer = document.querySelector(".modal-basket-product-list")
    let count
    let counter = 0

    renderStorageItems()

    function renderStorageItems() {
        if (JSON.parse(localStorage.getItem('items')) !== null) {
            let no = 0;
            const itemsFromStorage = JSON.parse(localStorage.getItem('items'))
            itemsFromStorage.map(data => {
                no = no + data.no
            })
            counter = no;
            itemsFromStorage.forEach(function (el) {
                const itemCard = `<div class="modal-basket-product-container cart-item" data-id=${el.id}>
        <div class="modal-basket-product-img-container">
		  <img class="new-arrivals-img" src=${el.img} alt=${el.name}>    
        </div>
        <div class="modal-basket-product-info">
            <div class="modal-basket-product-name">${el.name}</div>
            <div class="items counter-wrapper modal-basket-product-quantity">
            <div class="items__control modal-basket-product-button down" ><img src="img/shoping-basket/quntity-arrow.png" data-action="minus"></div>
            <div class="items__current" data-counter>${el.no}</div>
            <div class="items__control modal-basket-product-button up" ><img src="img/shoping-basket/quntity-arrow.png" data-action="plus"></div>
            </div>
        </div>
        <p class="dollar-or-uah">$</p>
            <div class="modal-basket-product-price active">${el.price}</div>
            <div class="modal-basket-product-price-total"></div>
        <button class="modal-basket-product-delete" data-delete="delete"></button>
    </div>`
                productContainer.innerHTML += itemCard
            })
        }
        summonBasket()
        calckEachElement()
        calcCartPrice()
    }


    function summonBasket() {
        if (counter > 0) {
            emptyBasket.classList.remove('active')
            shopingBasket.classList.add('active')
            counterOnBasket.classList.add('active')
            shopingBasket.classList.add('animated')
            if (counter > 99) { counterOnBasket.textContent = "99+" }
            else { counterOnBasket.textContent = counter }
            setTimeout(removeAnimation, 100)
        }
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

    modalWindow.addEventListener('click', function (event) {
        if (event.target.classList.contains('modal-basket-container')) {
            clouseBasket()
        }
    })

    shopingBasket.addEventListener('click', openBasket)
    modalCosureButton.addEventListener('click', clouseBasket)
    window.addEventListener('click', findElement, false);

    function findElement(e) {
        if (e.target.classList.contains("product-button")) {
            summonBasket()
            storeToLocal(e)

        }
    }

    modalBasket.addEventListener('click', function (event) {
        if (event.target.dataset.action === 'plus' || event.target.dataset.action === 'minus') {
            const prductChangeQuantity = event.target.closest('.cart-item')
            const prductChangeQuantityId = prductChangeQuantity.getAttribute('data-id')
            count = prductChangeQuantity.querySelector('[data-counter]');
            const itemsFromStorage = JSON.parse(localStorage.getItem('items'))
            const productsInCart = []
            if (event.target.dataset.action === 'plus') {
                count.innerText = ++count.innerText;
                counter++
                counterOnBasket.textContent = counter
                itemsFromStorage.forEach(function (product) {
                    if (product.id !== prductChangeQuantityId) {
                        productsInCart.push(product)
                    }
                    else {
                        product.no++
                        productsInCart.push(product)
                    }
                })
                calckEachElement(event.target)
            }
            if (event.target.dataset.action === 'minus') {

                if (parseInt(count.innerText) > 1) {
                    count.innerText = --count.innerText;
                    counter--
                    counterOnBasket.textContent = counter
                    itemsFromStorage.forEach(function (product) {
                        if (product.id !== prductChangeQuantityId) {
                            productsInCart.push(product)
                        }
                        else {
                            product.no--
                            productsInCart.push(product)
                        }
                    })
                    calckEachElement(event.target)

                } else if (parseInt(count.innerText) === 1) {
                    itemsFromStorage.forEach(function (product) {
                        if (product.id !== prductChangeQuantityId) {
                            productsInCart.push(product)
                        }
                    })
                    event.target.closest('.cart-item').remove();
                    counter--
                    counterOnBasket.textContent = counter
                    toggleCart()
                }
            }
            localStorage.setItem('items', JSON.stringify(productsInCart))
            calcCartPrice()
        }
    })

    function deleteFromCart(event) {
        const deleteProduct = event.target.closest('.cart-item')
        const deleteProductId = deleteProduct.getAttribute('data-id')
        const itemsFromStorage = JSON.parse(localStorage.getItem('items'))
        const productsInCart = []
        itemsFromStorage.forEach(function (product) {
            if (product.id !== deleteProductId) {
                productsInCart.push(product)
            }
        })
        localStorage.setItem('items', JSON.stringify(productsInCart));
        count = deleteProduct.querySelector('[data-counter]')
        counter -= count.innerText
        counterOnBasket.textContent = counter
        deleteProduct.remove();
        toggleCart()
        calcCartPrice()
    }

    function toggleCart() {
        const allCards = document.querySelectorAll(".cart-item")
        console.log(allCards.length)
        if (allCards.length < 1) {
            productsInBasket.classList.remove('active')
            emptyBasket.classList.add('active')
            setTimeout(clouseBasket, 3000)
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
            priceTotal += parseInt(item.innerText) * parseInt(amountEl.innerText);
        });
        if (priceTotal % 1 === 0) { priceTotal += ',00' }
        totalPriceEl.innerText = priceTotal;
    }

    function calckEachElement() {
        const productsInCart = document.querySelectorAll('.cart-item')
        productsInCart.forEach(function (product) {
            const count = product.querySelector('[data-counter]')
            const priceOfOne = product.querySelector('.modal-basket-product-price')
            const totalPriceContainer = product.querySelector('.modal-basket-product-price-total')
            let totalPrice = parseInt(count.innerText) * parseInt(priceOfOne.innerText)
            if (totalPrice % 1 === 0) { totalPrice = `${totalPrice},00` }
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
        })
    }

    let items = [];
    function storeToLocal(e) {
        if (typeof (Storage) !== 'undefined') {
            let item = {
                id: e.target.parentElement.parentElement.getAttribute('data-id'),
                img: e.target.closest('.new-arrivals-product').querySelector('.new-arrivals-img').getAttribute('src'),
                name: e.target.closest('.new-arrivals-product').querySelector('.product-name-text').textContent,
                price: e.target.closest('.new-arrivals-product').querySelector('.product-price-text').textContent,
                no: 1
            };
            console.log(item)
            if (JSON.parse(localStorage.getItem('items')) === null) {
                items.push(item);
                localStorage.setItem("items", JSON.stringify(items));
                window.location.reload();
            } else {
                const localItems = JSON.parse(localStorage.getItem("items"));
                localItems.map(data => {
                    if (item.id == data.id) {
                        item.no = data.no + 1;
                    } else {
                        items.push(data);
                    }
                });
                items.push(item);
                localStorage.setItem('items', JSON.stringify(items));
                window.location.reload();
            }
        }
        else {
            alert('local storage is not working on your browser');
        }
    }

    const cartForm = document.querySelector('.modal-basket-form')
    const userName = document.querySelector('.cart-usermane')
    const greetengText = document.querySelector('.modal-basket-thanks')
    const thankYouUser = document.querySelector('.modal-basket-thanks-heading')
    const valueInputs = document.querySelectorAll('.modal-form')

    cartForm.addEventListener('submit', function (event) {
        event.preventDefault()
        thankYouUser.textContent = `Thank you ${userName.value}`
        productsInBasket.classList.remove('active')
        greetengText.classList.add('active')
        localStorage.setItem('items', JSON.stringify([]))
        valueInputs.forEach(input => input.value = '')
        counter = 0
        setTimeout(clouseBasket, 3000);
        setTimeout(() => greetengText.classList.remove('active'), 3000)

    })

    async function curencyRate() {
        const response = await fetch('https://bank.gov.ua/NBUStatService/v1/statdirectory/exchangenew?json')
        const curency = await response.json()
        const usdRate = parseInt(curency.filter(el => el.cc === 'USD')[0].rate)
        localStorage.setItem('rate', usdRate)
    }
    let usd
    curencyRate()

    getCurrencyFromStorage(localStorage.getItem('rate'))
    function getCurrencyFromStorage(usdRate) {
        const totalCurrencyTag = document.querySelector('.dollar-or-uah-total')
        const productsInCart = document.querySelectorAll('.cart-item')
        if (localStorage.getItem('currency') !== null) {
            if (localStorage.getItem('currency') === 'false') {
                usd = localStorage.getItem('currency')
                document.getElementById('UAH').checked = true
                productsInCart.forEach(product => {
                    const price = product.querySelector('.modal-basket-product-price')
                    const curencyTag = product.querySelector('.dollar-or-uah')
                    price.textContent = `${parseInt(price.textContent) * usdRate},00`
                    curencyTag.textContent = '₴'
                    calckEachElement()
                })
                totalCurrencyTag.textContent = "₴"
            }
            if (localStorage.getItem('currency') === 'true') {
                usd = localStorage.getItem('currency')
                document.getElementById('USD').checked = true
                productsInCart.forEach(product => {
                    const curencyTag = product.querySelector('.dollar-or-uah')
                    curencyTag.textContent = '$'
                })
                totalCurrencyTag.textContent = "$"
            }
        }
        else {
            usd = 'true'
            document.getElementById('USD').checked = true
        }
    }

    function exchange(usdRate) {
        const productsInCart = document.querySelectorAll('.cart-item')
        const totalCurrencyTag = document.querySelector('.dollar-or-uah-total')
        if (usd === 'false') {
            productsInCart.forEach(product => {
                const price = product.querySelector('.modal-basket-product-price')
                const curencyTag = product.querySelector('.dollar-or-uah')
                price.textContent = `${parseInt(price.textContent) / usdRate},00`
                curencyTag.textContent = '$'
                totalCurrencyTag.textContent = "$"
                usd = 'true'
                localStorage.setItem('currency', 'true')
                calckEachElement()
            })
        }
        else if (usd === 'true') {
            productsInCart.forEach(product => {
                const price = product.querySelector('.modal-basket-product-price')
                const curencyTag = product.querySelector('.dollar-or-uah')
                price.textContent = `${parseInt(price.textContent) * usdRate},00`
                curencyTag.textContent = '₴'
                totalCurrencyTag.textContent = "₴"
                usd = 'false'
                localStorage.setItem('currency', 'false')
                calckEachElement()
            })
        }
        calcCartPrice()
    }

    modalBasket.addEventListener('click', function (event) {
        console.log(usd)
        if (event.target.classList.contains('curencytoggle')) {
            if (event.target.classList.contains('USD') && usd === 'false') {
                exchange(parseInt(localStorage.getItem('rate')))
            }
            if (event.target.classList.contains('UAH') && usd === 'true') { exchange(parseInt(localStorage.getItem('rate'))) }
        }
    })

    window.addEventListener('click', function (e) {
		if (e.target.classList.contains('product-info-button-add')) {
			let item = {
				id: e.target.closest('.new-arrivals-product').getAttribute('data-id'),
				img: e.target.closest('.new-arrivals-product').querySelector('.new-arrivals-img').getAttribute('src'),
				name: e.target.closest('.new-arrivals-product').querySelector('.product-name-text').textContent,
				price: e.target.closest('.new-arrivals-product').querySelector('.product-price-text').textContent,
				no: parseInt(e.target.closest('.new-arrivals-product').querySelector('.product-info-current-count').textContent)
			}
			if (JSON.parse(localStorage.getItem('items')) === null) {
				items.push(item);
				localStorage.setItem("items", JSON.stringify(items));
				window.location.reload();
			} else {
				const localItems = JSON.parse(localStorage.getItem("items"));
				localItems.map(data => {
					if (item.id === data.id) {
						console.log(data)
						item.no = parseInt(data.no) + parseInt(e.target.closest('.new-arrivals-product').querySelector('.product-info-current-count').textContent)
					} else {
						items.push(data);
					}
				});
				items.push(item);
				localStorage.setItem('items', JSON.stringify(items));
				window.location.reload();
			}
			calckEachElement()
			calcCartPrice()
		}
	})

})()
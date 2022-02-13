(function () {

	function getProductFromStorage() {
		const bigImage = document.querySelector('.product-info-img')
		const smallImage = document.querySelector('.product-info-img-mini')
		const productName = document.querySelector('h1')
		const productPrice = document.querySelector('.product-info-p')
		const setId = document.querySelector('.main.new-arrivals-product')
		const productInfo = JSON.parse(localStorage.getItem('product'))

		bigImage.setAttribute('src', productInfo.img)
		smallImage.setAttribute('src', productInfo.img)
		productName.textContent = productInfo.name
		productPrice.textContent = productInfo.price
		setId.setAttribute('data-id', productInfo.id)

		switchDescription(productInfo.id)
	}
	getProductFromStorage()

	const counter = document.querySelector('[data-counter]')
	const counterContainer = document.querySelector('.product-info-counter-container')

	counterContainer.addEventListener('click', function (event) {
		if (event.target.dataset.action === 'plus' || event.target.dataset.action === 'minus') {
			if (event.target.dataset.action === 'plus') {
				counter.innerText = ++counter.innerText;
			}
			if (event.target.dataset.action === 'minus') {
				counter.innerText = --counter.innerText;
				if (counter.innerText < 2) {
					counter.innerText = 1
				}
			}
		}
	})

	function switchDescription(id) {
		const description = document.querySelector('.product-info-description')
		switch (parseInt(id)) {
			case 4: description.textContent = 'This classic trainer model is suitable for both fitness sessions and daily wear. This pair of shoes is incredibly comfortable and made of textiles and original leather.'; break;
			case 3: description.textContent = 'For those who prefer a sporty style every day, this jacket will be a real discovery. The ultra-modern waterproof fabric will keep you warm and comfortable. And its futuristic design is worth a special mention.'; break;
			case 5: description.textContent = 'This long duster is made of lightweight nylon and can be your super stylish attribute both after workouts and in everyday life. This duster won\'t get wet and will keep you warm on cool autumn or spring days.'; break;
			case 2: description.textContent = 'With a high-tech foam sole, these sneakers are a great solution for runners. They are ultra-light and do not restrict movement. The turquoise color is their zest.'; break;
			case 1: description.textContent = 'Created to push boundaries, chosen by hundreds of professional sportsmen. This pair of shoes will delight you with the quality of materials, great design, and unique FlyteFoam midsole.'; break;
		}
	}
})()

(function() {
	const products = [{
		id: "1",
		title: "Asics Jordan 2000",
		imgUrl: "img/new-arrivals/new-arrivals-asics-jordan.jpg",
		price: "$200,00"
	}, {
		id: "2",
		title: "Puma Textile Running Shoes",
		imgUrl: "img/new-arrivals/new-arrivals-puma.jpg",
		price: "$65,00"
	}, {
		id: "3",
		title: "Nike Winter Jacket in Blue",
		imgUrl: "img/new-arrivals/new-arrivals-nike-winter.jpg",
		price: "$82,00"
	}, {
		id: "4",
		title: "Adidas Black Trainers",
		imgUrl: "img/new-arrivals/new-arrivals-adidas-black.jpg",
		price: "$60,00"
	}, {
		id: "5",
		title: "Reebok Red Duster",
		imgUrl: "img/new-arrivals/new-arrivals-reebok-red.jpg",
		price: "$60,00"
	}];

	function renderProducts(products) {
		const productsContainer = document.querySelector('.new-arrivals_carousel');
		for (const product of products) {
			productsContainer.innerHTML += `
            <div class="new-arrivals-product" id="poduct${product.id}">
            <a href="#"><img src=${product.imgUrl} alt="${product.title}"></a>
            <div class="product-name">
                <a href="#">
                    <p class="product-name-text">${product.title}</p>
                </a>
            </div>
            <div class="product-price-container">
                <p class="product-price-text">${product.price}</p>
            </div>
            <div class="product-button-container">
                <button class="new-arrivals-button product-button" type="button">Add to Cart</button>
            </div>
        </div>`;
		}
	}

	renderProducts(products);

	let currentSlideIdx = 0;

    function showCurrentSlide() {
        const slideContainer = document.querySelector('.new-arrivals-products');
		const slides = document.querySelectorAll('.new-arrivals-product').outerHTML;
		console.log(slides)
        slideContainer.innerHTML = slides[currentSlideIdx];
        if (window.innerWidth >= 640) {
            const secondSlideIdx = currentSlideIdx + 1 >= slides.length ? 0 : currentSlideIdx + 1;
            slideContainer.innerHTML += slides[secondSlideIdx];
            if (window.innerWidth >= 960) {
                const thirdSlideIdx = secondSlideIdx + 1 >= slides.length ? 0 : secondSlideIdx + 1;
                slideContainer.innerHTML += slides[thirdSlideIdx];    
            }
        }
    }

    function showNextSlide() {
        currentSlideIdx = currentSlideIdx + 1 >= slides.length ? 0 : currentSlideIdx + 1;
        showCurrentSlide();
    }

    function showPrevSlide() {
        currentSlideIdx = currentSlideIdx - 1 < 0 ? slides.length - 1 : currentSlideIdx - 1;
        showCurrentSlide();
    }

    showCurrentSlide();

    document.querySelector('.new-arrivals_carousel_arrow-right')
         .addEventListener('click', showNextSlide);

    document.querySelector('.new-arrivals_carousel_arrow-left')
         .addEventListener('click', showPrevSlide);


    window.addEventListener('resize', showCurrentSlide);
})();
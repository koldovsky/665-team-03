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
		title: "Nike Winter Jacket in Blue ",
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
            <div class="new-arrivals-product" data-id="poduct${product.id}">
            <a href="#" class ="new-arrivals-product-img"><img src=${product.imgUrl} alt="${product.title}"></a> 
            <div class="product-name">
                <a href="#">
                    <p class="product-name-text">${product.title}</p>
                </a>
            </div>
            <div class="product-price-container">
                <p class="product-price-text">${product.price}</p>
            </div>
            <div class="product-button-container">
                <button class="new-arrivals-button product-button" data-id ="button${product.id}" type="button">Add to Cart</button>
            </div>
        </div>`;
		}
	}

	renderProducts(products);

	let currentSlideIdx = 0;
    const slides = document.querySelectorAll('.new-arrivals-product');

    function showCurrentSlide() {
        for(slide of slides){
            slide.classList.add('hidden-product');
        }
        const currentSlide = slides[currentSlideIdx];
        currentSlide.classList.remove('hidden-product','second-slide' ,'third-slide' , 'fourth-slide') ;
        currentSlide.classList.add('first-slide') ;
        if (window.innerWidth >= 640) { 
            const secondSlideIdx = currentSlideIdx + 1 >= slides.length ? 0 : currentSlideIdx + 1;
             slides[secondSlideIdx].classList.remove('hidden-product','first-slide' ,'third-slide' , 'fourth-slide');
             slides[secondSlideIdx].classList.add('second-slide');
            if (window.innerWidth >= 960) {
                const thirdSlideIdx = secondSlideIdx + 1 >= slides.length ? 0 : secondSlideIdx + 1;
                slides[thirdSlideIdx].classList.remove('hidden-product','second-slide' ,'first-slide' , 'fourth-slide');  
                slides[thirdSlideIdx].classList.add('third-slide');
                if (window.innerWidth >= 1100) {
                    const fourthSlideIdx = thirdSlideIdx + 1 >= slides.length ? 0 : thirdSlideIdx + 1;
                    slides[fourthSlideIdx].classList.remove('hidden-product','second-slide' ,'third-slide' , 'first-slide');
                    slides[fourthSlideIdx].classList.add('fourth-slide');
                }
                  
            }
        }
        
    }
    showCurrentSlide()
    function showNextSlide() {
        currentSlideIdx = currentSlideIdx + 1 >= slides.length ? 0 : currentSlideIdx + 1;
        showCurrentSlide();
    }

    function showPrevSlide() {
        currentSlideIdx = currentSlideIdx - 1 < 0 ? slides.length - 1 : currentSlideIdx - 1;
        showCurrentSlide();
    }

    document.querySelector('.new-arrivals_carousel_arrow-right')
         .addEventListener('click', showNextSlide);

    document.querySelector('.new-arrivals_carousel_arrow-left')
         .addEventListener('click', showPrevSlide);

    
    window.addEventListener('resize', showCurrentSlide);
})();
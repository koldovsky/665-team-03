(function () {
    async function getProducts() {
        const respronse = await fetch('./javascript/new-product.json')
        const products = await respronse.json()
        renderProducts(products)
    }

    getProducts()

    function renderProducts(products) {
        const productsContainer = document.querySelector('.new-arrivals_carousel');
        for (const product of products) {
            productsContainer.innerHTML += `
					<div class="new-arrivals-product" data-id="${product.id}">
					<a href="#" class ="new-arrivals-product-img"><img class="new-arrivals-img" src=${product.imgUrl} alt="${product.title}"></a> 
					<div class="product-name">
						 <a href="#">
							  <p class="product-name-text">${product.title}</p>
						 </a>
					</div>
					<div class="product-price-container">
					<p class="dollar">$</p><p class="product-price-text">${product.price}</p>
					</div>
					<div class="product-button-container">
						 <button class="new-arrivals-button product-button" data-id ="button${product.id}" type="button">Add to Cart</button>
					</div>
			  </div>`;
        }
        showCurrentSlide()
    }
    let currentSlideIdx
    if (localStorage.getItem('count')) {
        currentSlideIdx = parseInt(localStorage.getItem('count'))
    }
    else { currentSlideIdx = 0 }

    let slides

    function showCurrentSlide() {
        slides = document.querySelectorAll('.new-arrivals-product');
        for (const slide of slides) {
            slide.classList.add('hidden-product');
        }
        const currentSlide = slides[currentSlideIdx];
        currentSlide.classList.remove('hidden-product', 'second-slide', 'third-slide', 'fourth-slide');
        currentSlide.classList.add('first-slide');
        if (window.innerWidth >= 640) {
            const secondSlideIdx = currentSlideIdx + 1 >= slides.length ? 0 : currentSlideIdx + 1;
            slides[secondSlideIdx].classList.remove('hidden-product', 'first-slide', 'third-slide', 'fourth-slide');
            slides[secondSlideIdx].classList.add('second-slide');
            if (window.innerWidth >= 960) {
                const thirdSlideIdx = secondSlideIdx + 1 >= slides.length ? 0 : secondSlideIdx + 1;
                slides[thirdSlideIdx].classList.remove('hidden-product', 'second-slide', 'first-slide', 'fourth-slide');
                slides[thirdSlideIdx].classList.add('third-slide');
                if (window.innerWidth >= 1100) {
                    const fourthSlideIdx = thirdSlideIdx + 1 >= slides.length ? 0 : thirdSlideIdx + 1;
                    slides[fourthSlideIdx].classList.remove('hidden-product', 'second-slide', 'third-slide', 'first-slide');
                    slides[fourthSlideIdx].classList.add('fourth-slide');
                }

            }
        }

    }
    
    function showNextSlide() {
        console.log(slides)
        currentSlideIdx = currentSlideIdx + 1 >= slides.length ? 0 : currentSlideIdx + 1; 
        localStorage.setItem('count', currentSlideIdx>4?0:currentSlideIdx)
        showCurrentSlide();
    }

    function showPrevSlide() {
        currentSlideIdx = currentSlideIdx - 1 < 0 ? slides.length - 1 : currentSlideIdx - 1;
        localStorage.setItem('count', currentSlideIdx)
        showCurrentSlide();
    }

    document.querySelector('.new-arrivals_carousel_arrow-right')
        .addEventListener('click', showNextSlide);

    document.querySelector('.new-arrivals_carousel_arrow-left')
        .addEventListener('click', showPrevSlide);


    window.addEventListener('resize', showCurrentSlide);

    window.addEventListener('click', function (event) {
        if (event.target.classList.contains('new-arrivals-img') || event.target.classList.contains('product-name-text')) {
            event.preventDefault()
            alert("На жаль сторінки товарів недоступні...");
        }
    })
})();
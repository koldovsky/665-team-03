const modalBtn = document.querySelector(".modal-btn");
const modalBg = document.querySelector(".modal-bg");
const modalClose = document.querySelector(".modal-close");
const modalLinkClose = document.querySelector(".modal-link-close");

modalBtn.addEventListener("click", function(){
    modalBg.classList.add("modal-bg-active");
});

modalClose.addEventListener("click", function(){
    modalBg.classList.remove("modal-bg-active");
})
modalLinkClose.addEventListener("click", function(){
    modalBg.classList.remove("modal-bg-active");
})


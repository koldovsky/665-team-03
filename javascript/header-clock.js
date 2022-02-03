(function () {
    function updateClock() {
        const clockContainer = document.querySelector('.clock');
        clockContainer.textContent = new Date().toLocaleTimeString();
    }

    setInterval(updateClock, 1000);
})();
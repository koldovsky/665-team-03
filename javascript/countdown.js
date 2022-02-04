// CountDown Chympaiesh Mykola
// Set the end date for the timer
function DealOfTheMonthCountDown(){
    const countDate = new Date("November 16, 9:33:00 2022").getTime();
    const now = new Date().getTime();
    gap = countDate - now;
// Calculate the remaining time in days, hours, minutes, and seconds
    const second = 1000;
    const minute = second * 60;
    const hour = minute * 60;
    const day = hour * 24;
    
    const d = Math.floor(gap / day);
    const h = Math.floor((gap % day) / hour);
    const m = Math.floor((gap % hour) / minute);
    const s = Math.floor((gap % minute) / second);
// ​Display the output to users
    document.getElementById("day").innerHTML = d; 
    document.getElementById("hour").innerHTML = h;
    document.getElementById("minute").innerHTML = m;
    document.getElementById("second").innerHTML = s;
}
// Make the timer function update every second
    setInterval(function(){
        DealOfTheMonthCountDown();
            },1000)
const Typewriter = function(txtElement, words, wait=2000){
    this.txtElement = txtElement;
    this.words = words;
    this.txt = '';
    this.wordIndex = 0;
    this.wait = parseInt(wait, 10);
    this.type();
    this.isDeleting = false;
}

// Type Method
Typewriter.prototype.type = function(){
    // Current word index
    const current = this.wordIndex % this.words.length;
    // Get text of current word
    const fullTxt = this.words[current];
    
    // Check if deleting
    if(this.isDeleting){
        // Remove a character
        this.txt = fullTxt.substring(0, this.txt.length - 1)
    } else{
        // Add a character
        this.txt = fullTxt.substring(0, this.txt.length + 1)
    }

    // Insert txt into element
    this.txtElement.innerHTML = `<span class="cursor">${this.txt}</span>`;

    // Initial Type speed
    let typeSpeed = 300;

    if(this.isDeleting){
        typeSpeed /= 2;
    }

    // If word is complete
    if(!this.isDeleting && this.txt === fullTxt){
        // Make a pause at end
        typeSpeed = this.wait;

        // Set isDeleting to true
        this.isDeleting = true;
    } else if(this.isDeleting && this.txt === ''){
        this.isDeleting = false;
        // Move to next word
        this.wordIndex++;
        // Pause before start typing the next word
        typeSpeed = 500;
    }

    setTimeout(()=> this.type(), typeSpeed);
}

// Init on DOM load

document.addEventListener('DOMContentLoaded', init);

// Init App

function init(){
    const txtElement = document.querySelector(".typing-animation");
    const words = JSON.parse(txtElement.getAttribute("data-words"));
    const wait = txtElement.getAttribute("data-wait");

    // Init typewriter
    new Typewriter(txtElement, words, wait);
}


// window.onload = () => {
//     setTimeout(() => {
//       document.querySelector("body").classList.add("display");
//     }, 4000);
//   };
  
document.querySelector(".hamburger-menu").addEventListener("click", () => {
    document.querySelector(".container").classList.toggle("change");
  });



document.addEventListener("mousemove", parallax);
function parallax(e){
    this.querySelectorAll('.layer').forEach(layer => {
        const speed = layer.getAttribute('data-speed')

        const x = (window.innerWidth - e.pageX*speed)/100
        const y = (window.innerHeight - e.pageY*speed)/100

        layer.style.transform = `translateX(${x}px) translateY(${y}px)`
        
    })
}


var countDate = new Date('Apr 4, 2022 00:00:00').getTime();

function newYear(){
    var now = new Date().getTime();
    gap = countDate - now;

    var second = 1000;
    var minute = second * 60;
    var hour = minute * 60;
    var day = hour * 24;

    var d = Math.floor(gap / (day));
    var h = Math.floor((gap % (day)) / (hour));
    var m = Math.floor((gap % (hour)) / (minute));
    var s = Math.floor((gap % (minute)) / (second));

    document.getElementById('day').innerText = d;
    document.getElementById('hour').innerText = h;
    document.getElementById('minute').innerText = m;
    document.getElementById('second').innerText = s;

}

setInterval(function(){
    newYear();
}, 1000)


scrollBtn = document.getElementById("scroll-btn");

window.onscroll = function () {
  scrollFunction();
};

function scrollFunction() {
  if (
    document.body.scrollTop > 300 ||
    document.documentElement.scrollTop > 300
  ) {
    scrollBtn.style.display = "flex";
  } else {
    scrollBtn.style.display = "none";
  }
}

function topFunction() {
  document.body.scrollTop = 0;
  document.documentElement.scrollTop = 0;
}


const chk = document.getElementById('chk');

chk.addEventListener('change', () => {
    if (chk.checked == true){
        document.getElementById('theme-style').href = '';
        document.getElementById('scroll-btn').style = 'filter: invert(0)';
    }else{
        document.getElementById('theme-style').href = 'css/light.css';
        document.getElementById('scroll-btn').style = 'filter: invert(1)';
    }
    
    
});

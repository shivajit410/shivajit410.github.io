document.querySelector(".hamburger-menu").addEventListener("click", () => {
  document.querySelector(".container").classList.toggle("change");
});

// document.querySelector(".scroll-btn").addEventListener("click", () => {
//   document.querySelector("html").style.scrollBehavior = "smooth";
//   setTimeout(() => {
//     document.querySelector("html").style.scrollBehavior = "unset";
//   }, 1000);
// });

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

var request = new XMLHttpRequest();
request.open('GET', '/assets/logo.txt', true);

request.onload = function() {
  if (this.status >= 200 && this.status < 400) {
    document.querySelector('.site-logo').innerHTML = this.response;
    setTimeout(function() {
      document.documentElement.classList.add('site--loaded');
    }, 0);

  } 
};

request.send();

// Advent calendar 2022
let marqueeText = document.querySelector(".marquee-content-3");
let button = document.querySelector(".btn-marquee");

if (button) {
  button.addEventListener("click", () => {
    const isRunning = marqueeText.style.animationPlayState == "running";
    
    if (isRunning) {
      marqueeText.style.animationPlayState = "paused";
      button.innerText = "Play";
      button.ariaPressed = "true";
    } else {
      marqueeText.style.animationPlayState = "running";
      button.innerText = "Pause";
      button.ariaPressed = "false";
    }
  });
}

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

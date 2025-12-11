var request = new XMLHttpRequest();
request.open("GET", "/assets/logo.txt", true);

request.onload = function () {
  if (this.status >= 200 && this.status < 400) {
    document.querySelector(".site-logo").innerHTML = this.response;
    setTimeout(function () {
      document.documentElement.classList.add("site--loaded");
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

async function hashString(inputString) {
  const encoder = new TextEncoder();
  const data = encoder.encode(inputString);
  const hashBuffer = await crypto.subtle.digest("SHA-256", data);

  const hashArray = Array.from(new Uint8Array(hashBuffer));
  const hashHex = hashArray
    .map((byte) => byte.toString(16).padStart(2, "0"))
    .join("");

  return hashHex;
}

const form = document.querySelector("#comment");

const addHiddenField = (form, name, value) => {
  if (form.querySelector(`[name="${name}"]`)) {
    form.querySelector(`[name="${name}"]`).remove();
  }
  const replyInput = document.createElement('input');
  replyInput.setAttribute('type', 'hidden');
  replyInput.setAttribute('name', name);
  replyInput.setAttribute('value', value);
  form.append(replyInput);
}

if (document.querySelector('[name="date"]')) {
  hashString(document.querySelector('[name="date"]').value).then((hash) => {
    const folder = hash.substring(0, 16);
    const url = `https://htmhell.dev/commentapi/${folder}/${folder}.php`;
    // const url = `http://localhost/demo/commentapi/${folder}/${folder}.php`;
    fetch(url)
      .then((response) => {
        if (!response.ok) {
          return
        }
        return response.text();
      })
      .then((html) => {
        if (html) {
          document.querySelector(".js-results").innerHTML = html;
          setTimeout(() => {
            document.querySelector('#comments_heading').textContent = `${document.querySelectorAll('.js-results article').length} Comments`;
          }, 0);

          document.querySelector('.js-results').addEventListener('click', e => {
            if(e.target.classList.contains('reply')) {
              const article = e.target.closest('.comment');
              
              const author = article.querySelector('.comment-name').textContent;
              document.querySelector('#commentto_heading').textContent = `Reply to ${author}`;
              form.querySelector("#name").focus();

              let a = e.target;
              let ids = [];
              while (a) {
                ids.unshift(a);
                a = a.parentNode;
              }
              
              let id = ids.filter(el => el.dataset && el.dataset.id).map(el => el.dataset.id).join('+');
              id += `+${article.id}`

              addHiddenField(form, 'reply', id);
              addHiddenField(form, 'author', author);
            }
          })
        }
      })
      .catch((error) => {
        // console.error("Error fetching HTML:", error);
      });
  });
}


if (form) {
  form.addEventListener("submit", (e) => {
    e.preventDefault();

    new FormData(form);
  });

  form.addEventListener("formdata", (e) => {
    console.log("formdata fired");

    // Get the form data from the event object
    const data = e.formData;
    // for (const value of data.values()) {
    //   console.log(value);
    // }

    // Submit the data via fetch()
    fetch("https://htmhell.dev/commentapi/", {
      method: "POST",
      body: data,
    })
      .then((response) => {
        return response.text();
      })
      .then((message) => {
        const result = JSON.parse(message);
        const messageWrapper = document.querySelector(".comment-message");
        const status = result[0];
        messageWrapper.innerHTML = result[1];
        messageWrapper.classList.remove(
          `comment-message-nok`,
          `comment-message-ok`
        );
        messageWrapper.classList.add(`comment-message-${status}`);
        const nameField = form.querySelector("#name");
        const messageField = form.querySelector("#message");

        if (status === "nok") {
          if (nameField.value === "") {
            nameField.setAttribute("aria-invalid", true);
          } else {
            nameField.removeAttribute("aria-invalid");
          }

          if (messageField.value === "") {
            messageField.setAttribute("aria-invalid", true);
          } else {
            messageField.removeAttribute("aria-invalid");
          }

          document.querySelectorAll("[aria-invalid]")[0].focus();
        } else {
          nameField.removeAttribute("aria-invalid");
          messageField.removeAttribute("aria-invalid");
          form.querySelector("#name").value = "";
          form.querySelector("#message").value = "";
          document.querySelector('[role="status"]').textContent = result[1].replace(/<\/?[^>]+(>|$)/g, "");;

          setTimeout(() => {
            document.querySelector('[role="status"]').textContent = "";
          }, 1000);
        }
      });
  });

  
}


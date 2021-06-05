let selectedText = "";

const body = document.querySelector("body");
const form = document.createElement("form");
const url = window.location.href;
const title = document.querySelector("h1");

form.classList.add("notes-modal", "hidden");

form.addEventListener("submit", (e) => {
  e.preventDefault();

  chrome.storage.sync.get("notesAuth", (result) => {
    const { notesAuth } = result;
    fetch("http://localhost:5000", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${JSON.parse(notesAuth)}`,
      },
      body: JSON.stringify({
        comments: commentsInput.value,
        quote: quoteInput.value,
        url,
        title: title.textContent,
      }),
    })
      .then((res) => {
        if (res.status !== 200) {
          throw new Error("An error occurred");
        }
        return res.json();
      })
      .then((res) => {
        console.log(res);
        e.target.classList.add("hidden");
        alert(`Submitted`);
        // form.classList.remove("hidden");
      })
      .catch((err) => {
        alert(err);
      });
  });
});

const quoteInput = document.createElement("textarea");
const commentsInput = document.createElement("textarea");
const articleTitle = document.createElement("input");

const submitButton = document.createElement("button");
submitButton.innerText = "Submit";

form.appendChild(articleTitle);
form.appendChild(quoteInput);
form.appendChild(commentsInput);
form.appendChild(submitButton);
body.appendChild(form);

chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
  quoteInput.innerHTML = request.text;
  articleTitle.value = title.innerText;
  commentsInput.innerText = "";

  form.classList.remove("hidden");
});

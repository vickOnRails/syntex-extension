let selectedText = "";

const body = document.querySelector("body");
const form = document.createElement("form");
const url = window.location.href;
const title = document.querySelector("h1");

let quote = ``;
let comment = ``;

form.classList.add("syntex-notes-modal", "hidden");

form.addEventListener("submit", (e) => {
  e.preventDefault();

  console.log({ url, title: title.innerText, quote, comment });

  // chrome.storage.sync.get("notesAuth", (result) => {
  //   const { notesAuth } = result;
  //   fetch("http://localhost:5000", {
  //     method: "POST",
  //     headers: {
  //       "Content-Type": "application/json",
  //       Authorization: `Bearer ${JSON.parse(notesAuth)}`,
  //     },
  //     body: JSON.stringify({
  //       comments: commentsInput.value,
  //       quote: quoteInput.value,
  //       url,
  //       title: title.textContent,
  //     }),
  //   })
  //     .then((res) => {
  //       if (res.status !== 200) {
  //         throw new Error("An error occurred");
  //       }
  //       return res.json();
  //     })
  //     .then((res) => {
  //       console.log(res);
  //       e.target.classList.add("hidden");
  //       alert(`Submitted`);
  //       // form.classList.remove("hidden");
  //     })
  //     .catch((err) => {
  //       alert(err);
  //     });
  // });
});

const showFormContent = (title, quote) => {
  const quoteComments = document.createElement("textarea");

  function updateComments(e) {
    alert(e.target.value);
  }

  const formContent = `<div class="form-content">
    <label class="form-label">
      <span class="form-label-text">Article Title</span>
      <input value="${title}" class="article-title"/>
    </label>

    <label class="form-label">
      <span class="form-label-text">Quote</span>
      <textarea class="quote" rows="3">${quote}</textarea>
    </label>

    <label class="form-label">
      <span class="form-label-text">Comments</span>
      <textarea class="quote-comment" onchange="updateComments" crows="3"></textarea>
    </label>

    <button class="submit-btn">Add Note</button>
  </div>`;

  return formContent;
};

const submitButton = document.createElement("button");
submitButton.innerText = "Submit";
body.appendChild(form);

chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
  form.classList.remove("hidden");

  const articleTitle = title.innerText;
  const quoteContent = request.text;
  quote = request.text;

  const commentTextarea = form.querySelector("textarea");
  console.log(commentTextarea);

  // comment = commentTextarea.innerText;
  form.innerHTML = showFormContent(articleTitle, quoteContent);
});

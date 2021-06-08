const body = document.querySelector("body");
const form = document.createElement("form");
const url = window.location.href;
const title = document.querySelector("h1");

// function to create Element with configurations
const createElement = (type, labelTitle, className) => {
  const element = document.createElement(type);
  const label = document.createElement("label");
  const span = document.createElement("span");

  span.classList.add("form-label-text");
  span.innerText = labelTitle;

  element.classList.add(className);

  label.appendChild(span);
  label.appendChild(element);

  form.appendChild(label);

  return element;
};

const titleInput = createElement("input", "Article Title", "article-title");
const quoteTextarea = createElement("textarea", "Quote", "quote");
const commentTextarea = createElement("textarea", "Comments", "quote-comment");
const submitButton = document.createElement("button");
submitButton.classList.add("submit-btn");
submitButton.innerText = `Add Notes`;

form.classList.add("syntex-notes-modal", "hidden");
// form.appendChild(titleInput);
// form.appendChild(quoteTextarea);
// form.appendChild(commentTextarea);
form.appendChild(submitButton);

body.appendChild(form);

form.addEventListener("submit", (e) => {
  e.preventDefault();
  console.log(quoteTextarea, commentTextarea);

  console.log({
    url,
    title: title.innerText,
    quote: quoteTextarea.innerText,
    comment: commentTextarea.innerText,
  });

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

chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
  titleInput.value = title.innerText;
  quoteTextarea.innerText = request.text;

  form.classList.remove("hidden");
});

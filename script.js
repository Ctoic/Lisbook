document.addEventListener("DOMContentLoaded", function () {
  const playlistItems = document.querySelectorAll("#playlist li");
  const audioPlayer = document.getElementById("audio-player");
  const themeToggle = document.getElementById("theme-toggle");
  const menuToggle = document.getElementById("menu-toggle");
  const menuClose = document.getElementById("menu-close");
  const menu = document.getElementById("menu");
  const bookList = document.getElementById("audio-books-list");

  playlistItems.forEach((item) => {
    item.addEventListener("click", function () {
      audioPlayer.src = item.getAttribute("data-src");
      audioPlayer.play();
    });
  });

  // Comment Submission
  document
    .getElementById("comment-form")
    .addEventListener("submit", function (e) {
      e.preventDefault();
      const username = document.getElementById("username").value;
      const comment = document.getElementById("comment").value;

      const commentHTML = `<div class="bg-gray-700 text-white p-4 rounded-lg">
                    <strong>${username}:</strong>
                    <p>${comment}</p>
                </div>`;

      document
        .getElementById("comments-list")
        .insertAdjacentHTML("beforeend", commentHTML);

      // Reset form
      document.getElementById("comment-form").reset();
    });

  // Theme Toggle
  themeToggle.addEventListener("click", function () {
    if (document.body.classList.contains("dark-theme")) {
      document.body.classList.remove("dark-theme");
      document.body.classList.add("light-theme");
      console.log("light");
    } else {
      document.body.classList.remove("light-theme");
      document.body.classList.add("dark-theme");
      console.log("dark");
    }
  });

  //Mobile menu toggle
  menuToggle.addEventListener("click", () => {
    menu.classList.remove("scale-0");
    menu.classList.add("scale-100");
  });

  menuClose.addEventListener("click", () => {
    menu.classList.add("scale-0");
    menu.classList.remove("scale-100");
  });

  fetch('/data/books.json')
  .then(response=>response.json())
  .then(response=>{
    const template = document.getElementById("book-card-template");
    response.forEach(book=>{
        const element = document.importNode(template.content, true);
        element.getElementById("book-title").textContent = book.title;
        element.getElementById("book-author").textContent = `By ${book.author}`;
        element.getElementById("img").src = `https://picsum.photos/200`;
        element.getElementById("img").alt = `Cover of ${book.title}`;
        bookList.appendChild(element);
    })
  })

});

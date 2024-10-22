// Extraire l'ID du livre depuis l'URL
const params = new URLSearchParams(window.location.search);
const bookId = params.get("bookId");

// Hide the loader when data is loaded
const loader = document.querySelector("#loader");

if (loader) {
  loader.style.display = "none";
}

if (bookId) {
  fetch("./data/books.json")
    .then((response) => response.json())
    .then((books) => {
      // Trouver le livre correspondant à l'ID
      const book = books.find((b) => b.id == bookId);

      if (book) {
        // Afficher les détails du livre
        document.querySelector(".book-title").innerText = book.title;
        document.querySelector(".book-author").innerText = book.author;
        document.querySelector(".book-description").innerText =
          book.description;
        document.querySelector(".book-cover").src = book.coverImage;

        // Ajouter dynamiquement les chapitres
        const chapterList = document.querySelector(".chapter-list");
        chapterList.innerHTML = ""; // Reset la liste

        book.chapters.forEach((chapter) => {
          chapterList.innerHTML += `
            <li class="adiobk-sub-item d-flex justify-content-between flex-column" data-src="${chapter.audio}">
                <div class="d-flex justify-content-between">
                  <p>${chapter.title}</p>
                  <a href="a${chapter.audio}" download=""><i class="bi bi-cloud-arrow-down-fill"></i></a>
                </div>
                <div class="bg-gray-700 flex-1 rounded-full ring-1">
                  <div class="progress-bar bg-red bg-white rounded-full" style="width: 0%;"></div>
                </div>
              </li>
          `;
        });
      } else {
        console.error("Livre non trouvé");
      }
    })
    .catch((error) => {
      console.error("Erreur lors du chargement des livres:", error);
    });
} else {
  console.error("Paramètre bookId manquant dans l'URL");
}

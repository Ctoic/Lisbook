export async function loadBookDetails(bookId) {
  if (bookId) {
    try {
      const response = await fetch("./data/books.json");

      if (!response.ok) {
        throw new Error("Erreur lors de la récupération du fichier JSON");
      }

      const books = await response.json();
      // console.log("Données des livres récupérées :", books); // Vérification du contenu JSON

      // Trouver le livre correspondant à l'ID
      const book = books.find((b) => b.id == bookId);

      if (book) {
        console.log("Livre trouvé :", book); // Vérification du livre trouvé
        // Afficher les détails du livre
        document.querySelector(".book-title").innerText = book.title;
        document.querySelector(".book-author").innerText = book.author;
        document.querySelector(".book-description").innerText =
          book.description;
        document.querySelector(".book-cover").src = book.coverImage;

        // Ajouter dynamiquement les chapitres
        const chapterList = document.querySelector(".playlist");
        chapterList.innerHTML = ""; // Reset la liste

        book.chapters.forEach((chapter) => {
          chapterList.innerHTML += `
            <li class="chapter adiobk-sub-item d-flex justify-content-between flex-column" data-src="${chapter.audio}">
              <div class="d-flex justify-content-between">
                <p>${chapter.title}</p>
                <a href="${chapter.audio}" download><i class="bi bi-cloud-arrow-down-fill"></i></a>
              </div>
              <div class="bg-gray-700 flex-1 rounded-full ring-1">
                <div class="progress-bar bg-red bg-white rounded-full" style="width: 0%;"></div>
              </div>
            </li>
          `;
        });
      } else {
        console.error("Livre non trouvé pour l'ID :", bookId); // Si le livre n'est pas trouvé
      }
    } catch (error) {
      console.error("Erreur lors du chargement des livres :", error); // Gérer les erreurs de fetch
    }
  } else {
    console.error("Paramètre bookId manquant dans l'URL");
  }
}

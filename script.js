document.addEventListener("DOMContentLoaded", function () {
  const playlistItems = document.querySelectorAll("#playlist li");
  const audioPlayer = document.getElementById("audio-player");
  const themeToggle = document.getElementById("theme-toggle");
  const menuToggle = document.getElementById("menu-toggle");
  const menuClose = document.getElementById("menu-close");
  const menu = document.getElementById("menu");
  const bookList = document.getElementById("audio-books-list");
  const favBooksList = document.getElementById("fav-audio-books-list");
  const template = document.getElementById("book-card-template");
  const favouriteButton = document.getElementById("favourite-btn");
  const commentForm = document.getElementById("comment-form");
  const FAV_BOOKS_KEY = "fav_books";
  const currentBookId = "7";
  let allBooksList = [];
  let currentBook;

  // Function to display error popup
  function showErrorPopup(message) {
    const overlay = document.createElement("div");
    overlay.id = "overlay";
    overlay.style.position = "fixed";
    overlay.style.top = "0";
    overlay.style.left = "0";
    overlay.style.width = "100%";
    overlay.style.height = "100%";
    overlay.style.backgroundColor = "rgba(0, 0, 0, 0.7)";
    overlay.style.zIndex = "9998";
    overlay.style.backdropFilter = "blur(5px)";
    document.body.appendChild(overlay);

    // Create the error popup
    const errorPopup = document.createElement("div");
    errorPopup.id = "errorPopup";
    errorPopup.style.position = "fixed";
    errorPopup.style.top = "50%";
    errorPopup.style.left = "50%";
    errorPopup.style.transform = "translate(-50%, -50%)";
    errorPopup.style.backgroundColor = "#fff";
    errorPopup.style.padding = "20px";
    errorPopup.style.border = "1px solid #ccc";
    errorPopup.style.zIndex = "9999";
    errorPopup.innerHTML = `
      <h2 style="color: red; font-weight: 600; margin-bottom: 5px;">Error</h2>
      <p>${message}</p>
      <button style="margin-top: 10px; padding: 5px 10px; float: right;">Close</button>
    `;

    document.body.appendChild(errorPopup);

    // Attach event listener to the close button directly via DOM element
    const closeButton = errorPopup.querySelector("button");
    closeButton.addEventListener("click", () => {
      errorPopup.remove();
      overlay.remove();
    });
  }

  function loadFavourites() {
    const favs = localStorage.getItem(FAV_BOOKS_KEY);

    var favsList = JSON.parse(favs);
    favBooksList.innerHTML = "";

    if (favs == null || favsList.length == 0) {
      document
        .getElementById("fav-empty-container")
        .classList.remove("invisible");
      return;
    } else {
      document.getElementById("fav-empty-container").classList.add("invisible");
    }

    if (favsList.includes(currentBookId)) {
      toggleHeart(true);
    }

    allBooksList.forEach((book) => {
      if (favsList.includes(book.id)) {
        renderBookItem(book, favBooksList);
      }
    });
  }

  function markFavourite(id, addItem) {
    var favsList = [];
    const favs = localStorage.getItem(FAV_BOOKS_KEY);

    if (favs != null) favsList = JSON.parse(favs);

    if (addItem == null) addItem = !favsList.includes(id);
    if (addItem) favsList.push(id);
    else {
      const idx = favsList.indexOf(id);
      if (idx != -1) favsList.splice(idx, 1);
    }

    localStorage.setItem(FAV_BOOKS_KEY, JSON.stringify(favsList));
  }

  // Playlist item click event
  playlistItems.forEach((item) => {
    item.addEventListener("click", function () {
      const audioSource = item.getAttribute("data-src");

      // Check if the file exists before playing
      if (audioSource) {
        audioPlayer.src = audioSource;

        // Handle playback errors
        audioPlayer.play().catch((error) => {
          console.error("Audio playback error:", error);
          if (error.name === "NotSupportedError") {
            showErrorPopup(
              "Failed to play audio. Unsupported format or file missing."
            );
          } else {
            showErrorPopup(
              "Failed to play audio. There was an issue with playback."
            );
          }
        });
      } else {
        showErrorPopup("Audio source not available.");
      }
    });
  });

  function toggleHeart(activate) {
    if (activate == null)
      activate = favouriteButton.classList.contains("bi-heart");

    if (activate) {
      favouriteButton.classList.remove("bi-heart");
      favouriteButton.classList.add("bi-heart-fill");
    } else {
      favouriteButton.classList.add("bi-heart");
      favouriteButton.classList.remove("bi-heart-fill");
    }

    return activate;
  }

  if (favouriteButton) {
    favouriteButton.addEventListener("click", () => {
      const activated = toggleHeart();
      markFavourite(currentBookId);
      if (activated) {
        document
          .getElementById("fav-empty-container")
          .classList.add("invisible");
        renderBookItem(currentBook, favBooksList);
      } else {
        loadFavourites();
      }
    });
  }

  //Keyboard Shortcuts buttons
  document.addEventListener("keydown", function (e) {
    switch (e.code) {
      case "Space": // Play / Pause
        e.preventDefault(); // Prevents page scrolling when Space is pressed
        if (audioPlayer.paused) {
          audioPlayer.play();
        } else {
          audioPlayer.pause();
        }
        break;

      case "ArrowRight": // Jump forward 30 seconds
        audioPlayer.currentTime += 30;
        break;

      case "ArrowLeft": // Go back 30 seconds
        audioPlayer.currentTime -= 30;
        break;

      case "Equal": // Increase volume
        if (audioPlayer.volume < 1) {
          audioPlayer.volume = Math.min(audioPlayer.volume + 0.1, 1);
        }
        break;

      case "NumpadAdd": // Augmenter le volume avec le pavé numérique
        if (audioPlayer.volume < 1) {
          audioPlayer.volume = Math.min(audioPlayer.volume + 0.1, 1);
        }
        break;

      case "Minus": // Reduce volume
        if (audioPlayer.volume > 0) {
          audioPlayer.volume = Math.max(audioPlayer.volume - 0.1, 0);
        }
        break;
      case "NumpadSubtract": // Diminuer le volume avec le pavé numérique
        if (audioPlayer.volume > 0) {
          audioPlayer.volume = Math.max(audioPlayer.volume - 0.1, 0);
        }
        break;

      default:
        break;
    }
  });

  // Comment Submission
  if (commentForm) {
    commentForm.addEventListener("submit", function (e) {
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
  }

  // Feedback Submission
window.onload = function() {
  document.getElementById('feedback-form').addEventListener('submit', function(event) {
      event.preventDefault();
      emailjs.sendForm('your_service_id', 'feedback_form', this)
          .then(() => {
              console.log('SUCCESS!');

              // Reset the form 
              document.getElementById("feedback-form").reset();
          }, (error) => {
              console.log('FAILED...', error);
          });
  });
}

  // Theme Toggle
  const body = document.body;

  function initializeTheme() {
    const currentTheme = localStorage.getItem("theme") || "dark";
    body.classList.toggle("dark-theme", currentTheme === "dark");
    body.classList.toggle("light-theme", currentTheme === "light");
  }

  function toggleTheme() {
    body.classList.toggle("dark-theme");
    body.classList.toggle("light-theme");

    // Save theme in localStorage
    const newTheme = body.classList.contains("dark-theme") ? "dark" : "light";
    localStorage.setItem("theme", newTheme);
  }

  // Initialize theme on load
  initializeTheme();

  if (themeToggle) {
    themeToggle.addEventListener("click", () => {
      console.log("clicker");
      toggleTheme();
    });
  }

  //Mobile menu toggle
  if (menuToggle) {
    menuToggle.addEventListener("click", () => {
      menu.classList.remove("scale-0");
      menu.classList.add("scale-100");
    });
  }

  if (menuClose) {
    menuClose.addEventListener("click", () => {
      menu.classList.add("scale-0");
      menu.classList.remove("scale-100");
    });
  }
});
// Function to load an HTML file into an element
function loadHTML(file, elementId) {
  fetch(file)
    .then((response) => {
      if (!response.ok)
        throw new Error("Erreur lors du chargement du fichier " + file);
      return response.text();
    })
    .then((data) => {
      document.getElementById(elementId).innerHTML = data;
    })
    .catch((error) => console.error(error));
}

// Load header and footer
document.addEventListener("DOMContentLoaded", function () {
  loadHTML("./pages/header.html", "header-placeholder");
  loadHTML("./pages/footer.html", "footer-placeholder");
});



// // Hide the loader when the page is fully loaded
window.addEventListener('load', function () {
  // Cache le spinner après que la page est entièrement chargée
  const loader = document.getElementById('loader');
  loader.classList.add('hidden');
});



// document.addEventListener('DOMContentLoaded', function () {
//   const languageDropdownItems = document.querySelectorAll('.dropdown-item');
//   const defaultLanguage = localStorage.getItem('language') || 'en'; // Langue par défaut (anglais)

//   // Fonction pour charger les traductions depuis un fichier JSON externe (ou utiliser un objet local)
//   function loadTranslations(lang) {
//     const translations = {
//       en: {
//         home: "Home",
//         about: "About",
//         contact: "Contact",
//         topAudioBooks: "Top Audio Books",
//         exampleModalToggleLabel: "Share it on :",
//         exampleModalToggleLabel1: "Share it on :",
//         by: "by",
//         // julesa: "by",
//         previous : "Previous Book",
//         next: "Next Book",
//         Languages: "Languages",
//         share1: "Share Your Comments",
//         share2: "Share Your Comments",
//         yourname: "Your Name:",
//         yourcomment: "Your Comment:",
//         discover: "Discover",
//         discover1: "Discover",
//         discover2: "Discover",
//         discover3: "Discover",
//         view: "View comments",
//         share: "Share",
//         favourite: "Save to Favourites",
//       },
//       fr: {
//         home: "Accueil",
//         about: "À propos",
//         contact: "Contact",
//         topAudioBooks: "Meilleurs livres audio",
//         exampleModalToggleLabel: "Partager sur",
//         exampleModalToggleLabel1: "Partager sur",
//         by: "Par",
//         julesa: "Par",
//         previous : "Livre précédent",
//         next: "Livre suivant",
//         Languages: "Langues",
//         share1: "Partagez vos commentaires",
//         share2: "Partager le commentaire",
//         yourname: "Votre nom:",
//         yourcomment: "Votre commentaire:",
//         discover: "Découvrir",
//         discover1: "Découvrir",
//         discover2: "Découvrir",
//         discover3: "Découvrir",
//         view: "Afficher les commentaires",
//         share: "Partager",
//         favourite: "Enregistrer dans les favoris",
//       },
//       es: {
//         home: "Inicio",
//         about: "Acerca de",
//         contact: "Contacto",
//         topAudioBooks: "Mejores libros de audio",
//         exampleModalToggleLabel: "Compàrtelo en",
//         by: "Por",
//         julesa: "Por",
//         previous : "Libro anterior",
//         next: "Siguiente libro",
//         Languages: "Idiomas",
//         share1: "Comparte tus comentarios",
//         share2: "Comparte tu comentario",
//         yourname: "Tu nombre:",
//         yourcomment: "Tu comentario:",
//         discover: "Descubrir",
//         discover1: "Descubrir",
//         discover2: "Descubrir",
//         discover3: "Descubrir",
//         view: "Ver comentarios",
//         share: "Compartir",
//         favourite: "Guardar en favoritos",
//       }
//     };

//     // Appliquer les traductions au DOM
//     applyTranslations(translations[lang]);
//     localStorage.setItem('language', lang); // Sauvegarde de la langue dans localStorage
//   }



//   // Appliquer les traductions au DOM
//   function applyTranslations(translations) {
//     document.getElementById('home').textContent = translations.home;
//     document.getElementById('about').textContent = translations.about;
//     document.getElementById('contact').textContent = translations.contact;
//     document.getElementById('Languages').textContent = translations.Languages;
//     document.getElementById('top-audio-books').textContent = translations.topAudioBooks;
//     document.getElementById('exampleModalToggleLabel').textContent = translations.exampleModalToggleLabel;
//     // document.getElementById('exampleModalToggleLabel1').textContent = translations.exampleModalToggleLabel;
//     document.getElementById('previous').textContent = translations.previous;
//     document.getElementById('next').textContent = translations.next;
//     document.getElementById('share1').textContent = translations.share1;
//     document.getElementById('share2').textContent = translations.share2;
//     document.getElementById('yourname').textContent = translations.yourname;
//     document.getElementById('yourcomment').textContent = translations.yourcomment;
//     document.getElementById('author-gd').textContent = translations.by + " Richard Dawkins";
//     document.getElementById('author-frankestine').textContent = translations.by + " Mary Shelby";
//     document.getElementById('author-sherlock').textContent = translations.by + " Sir Arthur Conan Doyle";
//     document.getElementById('author-sapiens').textContent = translations.by + " Yuval Noah Harari";
//     document.getElementById('author-gd1').textContent = translations.by + " Richard Dawkins";
//     document.getElementById('discover').textContent = translations.discover;
//     document.getElementById('discover1').textContent = translations.discover;
//     document.getElementById('discover2').textContent = translations.discover;
//     document.getElementById('discover3').textContent = translations.discover;
//     document.getElementById('view').textContent = translations.view;
//     document.getElementById('share').textContent = translations.share;
//     document.getElementById('favourite').textContent = translations.favourite;
//   }

//   // Ajouter un gestionnaire d'événements pour chaque item du dropdown
//   languageDropdownItems.forEach(item => {
//     item.addEventListener('click', function (event) {
//       const selectedLanguage = event.target.getAttribute('data-lang');
//       loadTranslations(selectedLanguage);
//     });
//   });

//   // Charger la langue par défaut au démarrage
//   loadTranslations(defaultLanguage);
// });


// // Event listener pour changer la langue avec le dropdown (si tu as un dropdown)
// const languageDropdownItems = document.querySelectorAll('.dropdown-item');
// languageDropdownItems.forEach(item => {
//   item.addEventListener('click', function (event) {
//     selectedLanguage = event.target.getAttribute('data-lang');  // Récupérer la langue sélectionnée
//     localStorage.setItem('language', selectedLanguage);  // Stocker la langue sélectionnée dans localStorage
//     applyTranslations(selectedLanguage);  // Appliquer la traduction
//   });
// });
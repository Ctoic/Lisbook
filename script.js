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

  const searchForm = document.querySelector('form');
  const searchInput = document.querySelector('input[type="search"]');

  function performSearch(searchTerm) {
    searchTerm = searchTerm.toLowerCase();
    const bookItems = document.querySelectorAll('.features-card');
    let found = false;

    bookItems.forEach(item => {
      const title = item.querySelector('.card-title').textContent.toLowerCase();
      const author = item.querySelector('.card-text').textContent.toLowerCase();
      
      if (title.includes(searchTerm) || author.includes(searchTerm)) {
        item.style.display = 'block';
        found = true;
      } else {
        item.style.display = 'none';
      }
    });

    const noResultsMessage = document.getElementById('no-results-message');
    if (!found) {
      if (!noResultsMessage) {
        const message = document.createElement('p');
        message.id = 'no-results-message';
        message.textContent = 'No books found matching your search.';
        message.className = 'text-center mt-4';
        document.querySelector('.row.row-cols-1').appendChild(message);
      }
    } else if (noResultsMessage) {
      noResultsMessage.remove();
    }
  }

  if (searchForm) {
    searchForm.addEventListener('submit', function(e) {
      e.preventDefault();
      const searchTerm = searchInput.value.trim();
      performSearch(searchTerm);
    });

    //live search functionality
    searchInput.addEventListener('input', function() {
      const searchTerm = this.value.trim();
      performSearch(searchTerm);
    });
  }

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

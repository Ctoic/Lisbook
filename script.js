document.addEventListener("DOMContentLoaded", function () {
  const playlistItems = document.querySelectorAll("#playlist li");
  const audioPlayer = document.getElementById("audio-player");
  const themeToggle = document.getElementById("theme-toggle");
  const menuToggle = document.getElementById("menu-toggle");
  const menuClose = document.getElementById("menu-close");
  const menu = document.getElementById("menu");
  const commentForm = document.getElementById("comment-form");

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

  const body = document.body;

  // Vérifier le thème actuel dans localStorage, sinon le définir par défaut sur 'dark'
  const currentTheme = localStorage.getItem("theme") || "dark";
  body.classList.toggle("dark-theme", currentTheme === "dark");
  body.classList.toggle("light-theme", currentTheme === "light");

  // Écouter le clic sur le bouton de basculement du thème
  themeToggle.addEventListener("click", () => {
    // Changer de thème
    body.classList.toggle("dark-theme");
    body.classList.toggle("light-theme");

    // Enregistrer le thème dans localStorage
    const newTheme = body.classList.contains("dark-theme") ? "dark" : "light";
    localStorage.setItem("theme", newTheme);
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

  fetch("/data/books.json")
    .then((response) => response.json())
    .then((response) => {
      const template = document.getElementById("book-card-template");
      response.forEach((book) => {
        const element = document.importNode(template.content, true);
        element.getElementById("book-title").textContent = book.title;
        element.getElementById("book-author").textContent = `By ${book.author}`;
        element.getElementById("img").src = `https://picsum.photos/200`;
        element.getElementById("img").alt = `Cover of ${book.title}`;
        bookList.appendChild(element);
      });
    });
});

// Function to save audiobook to Recently Played list in localStorage
function saveToRecentlyPlayed(book) {
  let recentlyPlayed = JSON.parse(localStorage.getItem('recentlyPlayed')) || [];
  
  // Remove the book if it already exists
  recentlyPlayed = recentlyPlayed.filter(b => b.title !== book.title);
  
  // Add the new book to the start of the list
  recentlyPlayed.unshift(book);

  // Limit the list to 5 audiobooks
  if (recentlyPlayed.length > 5) {
    recentlyPlayed.pop();
  }

  // Save updated list to localStorage
  localStorage.setItem('recentlyPlayed', JSON.stringify(recentlyPlayed));

  // Update the Recently Played section on the UI
  displayRecentlyPlayed();
}

// Function to display the Recently Played section
function displayRecentlyPlayed() {
  const recentlyPlayed = JSON.parse(localStorage.getItem('recentlyPlayed')) || [];
  const recentlyPlayedList = document.getElementById('recently-played-list');

  recentlyPlayedList.innerHTML = ''; // Clear current list

  recentlyPlayed.forEach(book => {
    // Create list item for each recently played audiobook
    const li = document.createElement('li');
    li.classList.add('md:w-60', 'w-full');

    li.innerHTML = `
      <div class="book-card flex flex-row p-4 sm:p-3 rounded-lg shadow-lg w-full h-full md:flex-col items-center md:items-start">
        <div class="container w-14 md:w-40 md:h-40 flex items-center md:w-full">
          <img src="${book.img}" alt="${book.title}" class="rounded-lg w-full h-full aspect-square object-cover" />
        </div>
        <div class="md:mt-2 ps-4 md:px-1 text-wrap flex-col items-center">
          <p class="md:text-lg text-sm font-medium text-green-500 w-32 truncate sm:w-full align-middle">${book.title}</p>
          <p class="text-sm truncate align-middle">${book.author}</p>
        </div>
      </div>
    `;
    
    recentlyPlayedList.appendChild(li);
  });
}

// Event listener for when an audiobook is played
const playlistItems = document.querySelectorAll('.adiobk-sub-item');
playlistItems.forEach(item => {
  item.addEventListener('click', function() {
    const book = {
      title: document.querySelector('h1').textContent, // Audiobook title
      author: document.querySelector('h3').textContent, // Audiobook author
      img: document.querySelector('.book-card img').src, // Audiobook cover image
    };
    saveToRecentlyPlayed(book); // Save book to recently played
  });
});

// Display Recently Played list on page load
document.addEventListener('DOMContentLoaded', displayRecentlyPlayed);

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

  
  fetch('/data/books.json')
  .then(response=>response.json())
  .then(response=>{
    allBooksList = response;
    response.forEach(book=>{
      if (book.id == currentBookId) {
        currentBook = book;
      }else{
        renderBookItem(book, bookList);
      }
    })
    loadFavourites();
  })

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

  function loadFavourites(){

    const favs = localStorage.getItem(FAV_BOOKS_KEY);
    
    var favsList = JSON.parse(favs);
    favBooksList.innerHTML = '';    

    if (favs == null || favsList.length == 0) {
      document.getElementById("fav-empty-container").classList.remove("invisible");
      return;
    }else{
      document.getElementById("fav-empty-container").classList.add("invisible");
    }

    if (favsList.includes(currentBookId)) {
      toggleHeart(true);
    }

    allBooksList.forEach(book=>{
      if(favsList.includes(book.id)){
        renderBookItem(book, favBooksList);
      }
    })
  }

  function markFavourite(id, addItem){
    var favsList = [];
    const favs = localStorage.getItem(FAV_BOOKS_KEY);

    if (favs != null) favsList = JSON.parse(favs);

    if (addItem == null) addItem = !favsList.includes(id);
    if (addItem) favsList.push(id);
    else{
      const idx = favsList.indexOf(id);
      if(idx != -1) favsList.splice(idx,1);
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
    if(activate == null) activate = favouriteButton.classList.contains('bi-heart') 
    
      if(activate){
      favouriteButton.classList.remove('bi-heart');
      favouriteButton.classList.add('bi-heart-fill');
    }else{
      favouriteButton.classList.add('bi-heart');
      favouriteButton.classList.remove('bi-heart-fill');
    }

    return activate;
  }

  favouriteButton.addEventListener('click', ()=>{
    const activated = toggleHeart()
    markFavourite(currentBookId);
    if (activated) {
      document.getElementById("fav-empty-container").classList.add("invisible");
      renderBookItem(currentBook, favBooksList);
    }else{
      loadFavourites();
    }
  })

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

  function renderBookItem(book, listElement){
    const element = document.importNode(template.content, true);
    element.getElementById("book-title").textContent = book.title;
    element.getElementById("book-author").textContent = `By ${book.author}`;
    element.getElementById("img").src = book.cover;
    element.getElementById("img").alt = `Cover of ${book.title}`;
    listElement.appendChild(element);
  }
});

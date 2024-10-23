import { fetchBooks } from "./fetchBooks.js";
import { createBookCard } from "./bookCard.js";
import { addBookClickEvent } from "./bookEvents.js";
import { loadHTML } from "./loadHTML.js";
import { handlePlaylistItemClick } from "./playlist.js";
import { showErrorPopup } from "./errorPopup.js";
import { initializeKeyControls } from "./keyControls.js";
import { initializeAudioControls } from "./audioControls.js";
import { setupAudioProgress } from "./audioProgress.js";
import { initializeShareButton } from "./share.js";
import { loadFavourites, initializeFavouriteButton } from "./favourites.js";
import { handleCommentSubmission } from "./commentSubmission.js";
import { handleFeedbackSubmission } from "./feedbackSubmission.js";
import { initializeTheme, toggleTheme } from "./themeToggle.js";
import { handleMobileMenuToggle } from "./mobileMenuToggle.js";
import { SmoothCursor } from "./smoothCursor.js";
import { hideLoader } from "./loader.js";
import { initFaqTyping } from "./faq.js";

document.addEventListener("DOMContentLoaded", function () {
  const playlistItems = document.querySelectorAll("#playlist li");
  const audioPlayer = document.getElementById("audio-player");
  const progressBars = document.querySelectorAll(".progress-bar");
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
  // Audio Player Controls Buttons
  const ctrlPlay = document.getElementById("ctrl-play");
  const ctrlFastBackward = document.getElementById("fast-backward");
  const ctrlFastForward = document.getElementById("fast-forward");
  const volumeUp = document.getElementById("volume-up");
  const volumeDown = document.getElementById("volume-down");

  const seekSlider = document.getElementById("seekSlider");
  const currentTimeLabel = document.getElementById("currentTime");
  const durationLabel = document.getElementById("duration");

  const urlParams = new URLSearchParams(window.location.search);

  const audioFile = urlParams.get("file");
  const startTime = urlParams.get("t");

  if (audioFile && startTime) {
    audioPlayer.src = `audio/${audioFile}`;
    audioPlayer.currentTime = startTime;
    audioPlayer.play();
  }

  const shareBtn = document.getElementById("share-link");
  if (shareBtn) {
    shareBtn.addEventListener("click", () => {
      const currentAudioFile = audioPlayer.src.split("/").pop();
      const currentTime = audioPlayer.currentTime;

      const currentUrl = `${
        window.location.href
      }?file=${currentAudioFile}&t=${Math.floor(currentTime)}`;
      const shareText = `Check out this audio "${currentAudioFile}" starting at ${Math.floor(
        currentTime
      )} seconds!`;

      navigator.clipboard
        .writeText(currentUrl)
        .then(() => {
          alert(`Link copied to clipboard`);
        })
        .catch((err) => {
          console.error("Failed to copy: ", err);
        });
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

  function toggleHeart(activate) {
    if (activate == null) {
      activate = favouriteButton.classList.contains("bi-heart");
    }

    favouriteButton.classList.toggle("bi-heart", !activate);
    favouriteButton.classList.toggle("bi-heart-fill", activate);

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

  //faq auto answer
  initFaqTyping();

  // Call the function to hide the loader
  hideLoader();

  // Initialize click events on playlist items
  handlePlaylistItemClick(playlistItems, audioPlayer, showErrorPopup);

  // Keyboard Shortcuts buttons
  initializeKeyControls(audioPlayer);

  // Audio player Controls Buttons
  initializeAudioControls(
    audioPlayer,
    ctrlPlay,
    ctrlFastForward,
    ctrlFastBackward,
    volumeUp,
    volumeDown,
    seekSlider,
    currentTimeLabel,
    durationLabel
  );

  // Comment Submission
  handleCommentSubmission(commentForm);

  // Feedback Submission
  const feedbackForm = document.getElementById("feedback-form");
  handleFeedbackSubmission(feedbackForm);

  // Theme Toggle
  initializeTheme();
  if (themeToggle) {
    themeToggle.addEventListener("click", toggleTheme);
  }

  // Mobile Menu Toggle
  handleMobileMenuToggle(menuToggle, menuClose, menu);

  // Create an instance of SmoothCursor
  const cursor = new SmoothCursor();

  // Progress bars
  // Initialize the progress bars on load
  // initializeProgressBars(progressBars, playlistItems);

  setupAudioProgress(audioPlayer, progressBars, playlistItems);

  // Function to load an HTML file into an element
  loadHTML("./pages/header.html", "header-placeholder");
  loadHTML("./pages/footer.html", "footer-placeholder");
});

document.addEventListener("DOMContentLoaded", async () => {
  const bookContainer = document.querySelector(".book-container");

  if (!bookContainer) {
    console.error("Book container not found!");
    return; // Exit the function if the container is not found
  }

  try {
    // Fetch the books
    const books = await fetchBooks();

    // Create the book cards
    books.forEach((book) => {
      bookContainer.innerHTML += createBookCard(book);
    });
  } catch (error) {
    console.error("Error fetching books:", error);
  }

  // Add click events on buttons
  addBookClickEvent();
});

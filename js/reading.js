import { loadHTML } from "./loadHTML.js";
import { loadBookDetails } from "./bookLoader.js";
import { handlePlaylistItemClick } from "./playlist.js";
import { showErrorPopup } from "./errorPopup.js";
import { initializeKeyControls } from "./keyControls.js";
import { initializeAudioControls } from "./audioControls.js";
import { setupAudioProgress } from "./audioProgress.js";
import { handleCommentSubmission } from "./commentSubmission.js";
import { handleFeedbackSubmission } from "./feedbackSubmission.js";
import { initializeTheme, toggleTheme } from "./themeToggle.js";
import { handleMobileMenuToggle } from "./mobileMenuToggle.js";
import { SmoothCursor } from "./smoothCursor.js";

document.addEventListener("DOMContentLoaded", () => {
  // Get book ID from URL
  const urlParams = new URLSearchParams(window.location.search);
  const bookId = urlParams.get("bookId");

  // Audio Player Controls Buttons
  const audioPlayer = document.querySelector("#audio-player");

  const ctrlPlay = document.getElementById("ctrl-play");
  const ctrlFastBackward = document.getElementById("fast-backward");
  const ctrlFastForward = document.getElementById("fast-forward");
  const volumeUp = document.getElementById("volume-up");
  const volumeDown = document.getElementById("volume-down");

  const seekSlider = document.getElementById("seekSlider");
  const currentTimeLabel = document.getElementById("currentTime");
  const durationLabel = document.getElementById("duration");

  const audioFile = urlParams.get("file");
  const startTime = urlParams.get("t");

  const menuToggle = document.getElementById("menu-toggle");
  const menuClose = document.getElementById("menu-close");
  const menu = document.getElementById("menu");

  const themeToggle = document.getElementById("theme-toggle");

  const feedbackForm = document.getElementById("feedback-form");
  const commentForm = document.getElementById("comment-form");

  if (audioPlayer && audioFile && startTime) {
    audioPlayer.src = `audio/${audioFile}`;
    audioPlayer.currentTime = startTime;
    audioPlayer.play();
  }

  // Load book details
  loadBookDetails(bookId)
    .then(() => {
      const loader = document.querySelector("#loader");
      if (loader) {
        loader.style.display = "none";
      }

      // Select playlist items and progress bars after loading details
      const playlistItems = document.querySelectorAll(".chapter");
      const progressBars = document.querySelectorAll(".progress-bar");

      if (playlistItems.length > 0 && progressBars.length > 0) {
        // Initialize event handlers
        handlePlaylistItemClick(playlistItems, audioPlayer, showErrorPopup);
        initializeKeyControls(audioPlayer);
        setupAudioProgress(audioPlayer, progressBars, playlistItems);

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

        handleCommentSubmission(commentForm);
        handleFeedbackSubmission(feedbackForm); // Remove duplicate call

        // Theme Toggle
        initializeTheme();
        if (themeToggle) {
          themeToggle.addEventListener("click", toggleTheme);
        }

        // Create an instance of SmoothCursor
        const cursor = new SmoothCursor();

        // Mobile Menu Toggle
        handleMobileMenuToggle(menuToggle, menuClose, menu);

        // Function to load an HTML file into an element
        loadHTML("./pages/header.html", "header-placeholder");
        loadHTML("./pages/footer.html", "footer-placeholder");
      } else {
        console.warn("Playlist items or progress bars not found.");
      }
    })
    .catch((error) => {
      console.error("Error loading book details:", error);
    });
});

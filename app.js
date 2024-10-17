import { downloadTorrent, handleError, displayProgress, manageStorage } from './torrent.js';

document.addEventListener("DOMContentLoaded", function () {
  const audioPlayer = document.getElementById("audio-player");
  const playlistItems = document.querySelectorAll("#playlist li");
  const playPauseBtn = document.getElementById("playPauseBtn"); // Play/Pause button

  // Playlist functionality: Play the clicked audio
  playlistItems.forEach((item) => {
    item.addEventListener("click", function () {
      const audioSource = this.getAttribute("data-src");
      audioPlayer.src = audioSource;
      audioPlayer.play();
      playPauseBtn.classList.remove("play"); // Update the button to pause when playing
      playPauseBtn.classList.add("pause");
    });
  });

  // Play/Pause button functionality
  playPauseBtn.addEventListener("click", () => {
    if (audioPlayer.paused) {
      audioPlayer.play();
      playPauseBtn.classList.remove("play");
      playPauseBtn.classList.add("pause");
    } else {
      audioPlayer.pause();
      playPauseBtn.classList.remove("pause");
      playPauseBtn.classList.add("play");
    }
  });

  // Comment submission functionality
  const commentForm = document.getElementById("comment-form");
  const commentsList = document.getElementById("comments-list");

  commentForm.addEventListener("submit", function (e) {
    e.preventDefault();

    const username = document.getElementById("username").value;
    const commentText = document.getElementById("comment").value;

    if (username && commentText) {
      const commentElement = document.createElement("div");
      commentElement.classList.add("comment");
      commentElement.innerHTML = `<strong>${username}:</strong><p>${commentText}</p>`;
      commentsList.appendChild(commentElement);

      // Clear the form
      commentForm.reset();
    }
  });

  // Page navigation buttons functionality
  const prevBtn = document.getElementById("prev-btn");
  const nextBtn = document.getElementById("next-btn");

  // Define the pages for navigation
  const pages = ["index.html", "genres.html", "about.html"];
  let currentPageIndex = pages.indexOf(window.location.pathname);

  // Function to navigate to the next page
  function nextPage() {
    if (currentPageIndex < pages.length - 1) {
      currentPageIndex++;
      window.location.href = pages[currentPageIndex];
    }
  }

  // Function to navigate to the previous page
  function prevPage() {
    if (currentPageIndex > 0) {
      currentPageIndex--;
      window.location.href = pages[currentPageIndex];
    }
  }

  // Event listener for "Next" button
  if (nextBtn) nextBtn.addEventListener("click", nextPage);

  // Event listener for "Previous" button
  if (prevBtn) prevBtn.addEventListener("click", prevPage);

  // Torrent download button functionality
  const downloadBtn = document.getElementById("downloadBtn");
  if (downloadBtn) {
    downloadBtn.addEventListener("click", () => {
      const torrentId = "magnet:?xt=urn:btih:...";
      const downloadPath = "downloads/";
      downloadTorrent(torrentId, downloadPath);
    });
  }

  // Display torrent download progress
  const progressBar = document.getElementById("torrent-progress-bar");
  if (progressBar) {
    displayProgress(progressBar);
  }

  // Handle torrent download errors
  client.on('error', handleError);

  // Manage torrent download storage
  const storagePath = "downloads/";
  manageStorage(storagePath);
});

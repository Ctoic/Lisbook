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

  // function to speed audio
  const speedButton = document.getElementById("speedButton");
  const speedDropdown = document.getElementById("speedDropdown");
  const audio = document.getElementById("audio");

  // function for dropdown
  speedButton.addEventListener("click", () => {
    speedDropdown.classList.toggle("hidden");
  });

  speedDropdown.querySelectorAll("li").forEach((item) => {
    item.addEventListener("click", () => {
      const selectedSpeed = parseFloat(item.getAttribute("data-speed")); // Convert to float

      audio.playbackRate = selectedSpeed;

      speedButton.textContent = selectedSpeed + "x";

      speedDropdown.classList.add("hidden");
    });
  });

  audioPlayer.addEventListener("canplay", () => {
    speedDropdown.querySelectorAll("li").forEach((item) => {
      item.addEventListener("click", () => {
        const selectedSpeed = parseFloat(item.getAttribute("data-speed"));
        audioPlayer.playbackRate = selectedSpeed;
        speedButton.textContent = selectedSpeed + "x";

        speedDropdown.classList.add("hidden");
      });
    });
  });

  window.addEventListener("click", (e) => {
    if (!speedButton.contains(e.target) && !speedDropdown.contains(e.target)) {
      speedDropdown.classList.add("hidden");
    }
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

  if (commentForm && commentsList) {
    commentForm.addEventListener("submit", function (e) {
      e.preventDefault();

      const usernameInput = document.getElementById("username");
      const commentInput = document.getElementById("comment");

      if (!usernameInput || !commentInput) return;

      const username = usernameInput.value.trim();
      const commentText = commentInput.value.trim();

      if (username && commentText) {
        const commentElement = document.createElement("div");
        commentElement.classList.add("comment");

        const usernameElement = document.createElement("strong");
        usernameElement.textContent = `${username}:`;

        const textElement = document.createElement("p");
        textElement.textContent = commentText;

        commentElement.appendChild(usernameElement);
        commentElement.appendChild(textElement);

        commentsList.appendChild(commentElement);

        // Clear the form
        commentForm.reset();
      }
    });
  }

  // Page navigation buttons functionality
  const prevBtn = document.getElementById("prev-btn");
  const nextBtn = document.getElementById("next-btn");

  // Define the pages for navigation
  const pages = ["index.html", "explore.html", "about.html"];
  const currentPath = window.location.pathname.split("/").pop() || "index.html";
  let currentPageIndex = pages.indexOf(currentPath);
  if (currentPageIndex === -1) {
    currentPageIndex = 0;
  }

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
});

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

  // Bot logic for book recommendations
  function recommendBooks(userInput) {
    // Example logic for recommending books based on user input
    const recommendations = [];
    if (userInput.includes("fiction")) {
      recommendations.push("To Kill a Mockingbird", "1984");
    } else if (userInput.includes("adventure")) {
      recommendations.push("Moby-Dick", "The Adventures of Sherlock Holmes");
    }
    return recommendations;
  }

  // Bot logic for providing book summaries
  function provideSummary(bookTitle) {
    // Example logic for providing book summaries
    const summaries = {
      "To Kill a Mockingbird": "A novel that explores racial injustice in the Deep South through the eyes of young Scout Finch.",
      "1984": "A harrowing vision of a totalitarian future, where surveillance and propaganda are omnipresent.",
      "Moby-Dick": "An epic tale of obsession and revenge, chronicling Captain Ahab’s relentless pursuit of the white whale Moby Dick.",
      "The Adventures of Sherlock Holmes": "A collection of twelve detective mysteries featuring Sherlock Holmes and Dr. Watson."
    };
    return summaries[bookTitle] || "Summary not available.";
  }

  // Bot logic for basic user conversations
  function engageInConversation(userInput) {
    // Example logic for basic user conversations
    if (userInput.includes("hello")) {
      return "Hello! How can I assist you with your book journey today?";
    } else if (userInput.includes("recommend")) {
      return "Sure! What genre or type of book are you interested in?";
    } else if (userInput.includes("summary")) {
      return "Please provide the title of the book you want a summary for.";
    } else {
      return "I'm here to help! You can ask me for book recommendations or summaries.";
    }
  }
});

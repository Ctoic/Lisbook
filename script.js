document.addEventListener("DOMContentLoaded", function () {
  const playlistItems = document.querySelectorAll("#playlist li");
  const progressBars = document.querySelectorAll(".progress-bar");
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

  // function to speed audio
  const speedButton = document.getElementById("speedButton");
  const speedDropdown = document.getElementById("speedDropdown");
  const audio = document.getElementById("audio");

  // Check if speedButton exists before adding the event listener
  if (speedButton) {
    speedButton.addEventListener("click", () => {
      speedDropdown.classList.toggle("hidden");
    });
  } else {
  }

  // Check if speedDropdown exists before working with its list items
  if (speedDropdown) {
    const speedItems = speedDropdown.querySelectorAll("li");

    speedItems.forEach((item) => {
      item.addEventListener("click", () => {
        const selectedSpeed = parseFloat(item.getAttribute("data-speed")); // Convert to float

        // Assuming 'audio' element exists, otherwise you need to check that too
        if (audio) {
          audio.playbackRate = selectedSpeed;
        }

        if (speedButton) {
          speedButton.textContent = selectedSpeed + "x";
        }

        speedDropdown.classList.add("hidden");
      });
    });
  } else {
  }
  // Check if audioPlayer exists
  if (audioPlayer) {
    audioPlayer.addEventListener("canplay", () => {
      // Check if speedDropdown exists and has li elements
      if (speedDropdown && speedDropdown.querySelectorAll("li").length > 0) {
        speedDropdown.querySelectorAll("li").forEach((item) => {
          item.addEventListener("click", () => {
            const selectedSpeed = parseFloat(item.getAttribute("data-speed"));
            audioPlayer.playbackRate = selectedSpeed;
            speedButton.textContent = selectedSpeed + "x";

            speedDropdown.classList.add("hidden");
          });
        });
      } else {
        console.warn("Speed dropdown or its items do not exist.");
      }
    });
  } else {
    console.warn("Audio player does not exist.");
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
  //cursor smooth
  const circles = document.querySelectorAll(".circle");
  const logo = document.querySelector(".logo"); // Assuming the logo has a class "logo"
  const coords = { x: 0, y: 0 };
  if (logo) {
    const logoRect = logo.getBoundingClientRect();
    coords.x = logoRect.left + logoRect.width / 2; // Center of the logo horizontally
    coords.y = logoRect.top + logoRect.height / 2; // Center of the logo vertically
  }

  // Updated color palette
  const colors = [
    "#a7e078",
    "#9dd36c",
    "#94c760",
    "#8abc55",
    "#80b14b",
    "#76a640",
    "#6cbf58",
    "#62a24d",
    "#579643",
    "#4e8a3b",
    "#458132",
    "#3b752a",
    "#336824",
    "#2c9137",
    "#23802c",
    "#1f7628",
    "#1b6c25",
    "#121212",
    "#0f0f0f",
    "#2b2b2b",
    "#1e1e1e",
    "#1a1a1a",
  ];

  // Set colors for each circle and initialize their positions
  circles.forEach((circle, index) => {
    circle.style.backgroundColor = colors[index % colors.length]; // Set circle colors
    circle.x = 0; // Initialize circle positions
    circle.y = 0;
  });

  // Track mouse movements and update coordinates
  document.addEventListener("mousemove", function (e) {
    coords.x = e.clientX; // Use clientX and clientY for cursor-relative positioning
    coords.y = e.clientY;
  });

  // Animate the circles based on mouse movement
  function animateCircles() {
    let x = coords.x;
    let y = coords.y;

    circles.forEach((circle, index) => {
      // Set the position for the circles with slight offset
      circle.style.left = `${x - 12}px`;
      circle.style.top = `${y - 12}px`;

      // Scale the circles based on their index
      circle.style.transform = `scale(${
        (circles.length - index) / circles.length
      })`;

      // Update the position for the next circle
      const nextCircle = circles[index + 1] || circles[0];
      x += (nextCircle.x - x) * 0.2; // Adjust smoothing factor
      y += (nextCircle.y - y) * 0.2; // Adjust smoothing factor

      circle.x = x; // Update current circle's position for the next iteration
      circle.y = y; // Update current circle's position for the next iteration
    });

    requestAnimationFrame(animateCircles); // Keep the animation running
  }

  animateCircles(); // Start the circle animation

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

  //Audio player Controls Buttons
  if (ctrlPlay && audioPlayer) {
    ctrlPlay.addEventListener("click", function () {
      if (audioPlayer.paused) {
        audioPlayer.play();
        ctrlPlay.innerHTML = '<i class="bi bi-play-fill"></i>';
      } else {
        audioPlayer.pause();
        ctrlPlay.innerHTML = '<i class="bi bi-pause-fill"></i>';
      }
    });

    ctrlFastForward.addEventListener("click", function () {
      audioPlayer.currentTime += 30;
    });

    ctrlFastBackward.addEventListener("click", function () {
      audioPlayer.currentTime -= 30;
    });
    volumeUp.addEventListener("click", function () {
      if (audioPlayer.volume < 1) {
        audioPlayer.volume = Math.max(audioPlayer.volume + 0.1, 0);
      }
    });
    volumeDown.addEventListener("click", function () {
      if (audioPlayer.volume > 0) {
        audioPlayer.volume = Math.max(audioPlayer.volume - 0.1, 0);
      }
    });

    // Seek Player
    audioPlayer.addEventListener("timeupdate", () => {
      seekSlider.value = audioPlayer.currentTime;
      currentTimeLabel.textContent = formatTime(audioPlayer.currentTime);
    });
    // Seek functionality
    seekSlider.addEventListener("input", (event) => {
      audioPlayer.currentTime = event.target.value;
    });

    // Format time from seconds to MM:SS
    function formatTime(seconds) {
      const minutes = Math.floor(seconds / 60);
      const secondsLeft = Math.floor(seconds % 60);
      return `${minutes}:${secondsLeft < 10 ? "0" : ""}${secondsLeft}`;
    }

    audioPlayer.addEventListener("ended", function () {
      ctrlPlay.innerHTML = '<i class="bi bi-play-fill"></i>';
    });

    // Update the seek slider and current time
    audioPlayer.addEventListener("loadedmetadata", () => {
      durationLabel.textContent = formatTime(audioPlayer.duration);
      seekSlider.max = audioPlayer.duration;
    });
  }

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
  window.onload = function () {
    document
      .getElementById("feedback-form")
      ?.addEventListener("submit", function (event) {
        event.preventDefault();
        emailjs.sendForm("your_service_id", "feedback_form", this).then(
          () => {
            console.log("SUCCESS!");

            // Reset the form
            document.getElementById("feedback-form").reset();
          },
          (error) => {
            console.log("FAILED...", error);
          }
        );
      });
  };

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

  // progress bars

  function initializeProgressBars() {
    progressBars?.forEach((progressBar, index) => {
      const dataSrc = playlistItems[index].getAttribute("data-src");
      let percentage = parseInt(localStorage.getItem(dataSrc)) || 0;
      progressBar.style.width = percentage + "%";
      progressBar.textContent = percentage ? percentage + "%" : "";
    });
  }
  initializeProgressBars();

  audioPlayer?.addEventListener("timeupdate", function () {
    if (audioPlayer.readyState)
      progressBars?.forEach((progressBar, index) => {
        const dataSrc = playlistItems[index].getAttribute("data-src");
        if (audioPlayer.src.includes(dataSrc) && audioPlayer) {
          let percentage = parseInt(
            (audioPlayer.currentTime / audioPlayer.duration) * 100
          );
          progressBar.style.width = percentage + "%";
          progressBar.textContent = percentage ? percentage + "%" : "";
          localStorage.setItem(dataSrc, percentage);
        }
      });
  });
  //faq auto type answer
  const faqBoxes = document.querySelectorAll(".faq-box");

  faqBoxes.forEach((box) => {
    // Hover event on the entire FAQ box
    box.addEventListener("mouseenter", function () {
      const question = box.querySelector(".faq-question");
      const answerId = question.getAttribute("data-answer");
      const answerElement = document.getElementById(answerId);

      // Check if the answer has already been displayed
      if (!answerElement.classList.contains("hidden")) return;

      // Add the typing effect
      typeAnswer(
        answerElement,
        answerElement.dataset.fulltext || answerElement.innerHTML
      );
    });
  });

  function typeAnswer(element, answer) {
    element.dataset.fulltext = answer; // Store the full text in a data attribute
    element.innerHTML = ""; // Clear the current text
    element.classList.remove("hidden"); // Make the answer visible
    let i = 0;

    function type() {
      if (i < answer.length) {
        element.innerHTML += answer.charAt(i);
        i++;
        setTimeout(type, 50); // Adjust typing speed here
      }
    }

    type();
  }

  audioPlayer?.addEventListener("loadeddata", function () {
    playlistItems?.forEach((item) => {
      const dataSrc = item.getAttribute("data-src");
      if (audioPlayer.src.includes(dataSrc)) {
        let time = parseInt(localStorage.getItem(dataSrc)) || 0;
        audioPlayer.currentTime = (time * audioPlayer.duration) / 100;
      }
    });
  });
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
      if (document.getElementById(elementId))
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
window.addEventListener("load", function () {
  // Cache le spinner après que la page est entièrement chargée
  const loader = document.getElementById("loader");
  loader.classList.add("hidden");
});
// Profile picture change handler
const uploadPicBtn = document.getElementById("upload-pic");
if (uploadPicBtn) {
  uploadPicBtn.addEventListener("click", () => {
    alert("Profile picture change feature is coming soon!");
    // You can add a file upload input in the future.
  });
}

// Name change functionality
const editNameBtn = document.getElementById("edit-name");
if (editNameBtn) {
  editNameBtn.addEventListener("click", () => {
    const newName = prompt("Enter your new name:");
    if (newName) {
      document.querySelector(
        ".profile-section p"
      ).innerText = `Name: ${newName}`;
    }
  });
}

// Friend card expand/collapse
// Friend cards toggle animation
document.querySelectorAll(".friend-card").forEach((card) => {
  card.addEventListener("click", function () {
    const targetId = this.getAttribute("data-target");
    const content = document.querySelector(targetId);
    const isCollapsed = content.classList.contains("expanded");

    // Toggle the card content
    if (isCollapsed) {
      content.classList.remove("expanded");
      card.classList.add("collapsed");
    } else {
      content.classList.add("expanded");
      card.classList.remove("collapsed");
    }
  });
});
// auto-type
var typed = new Typed(".auto-type", {
  strings: [
    "Play/Pause",
    "Stop",
    "Skip Chapters",
    "Change Speed",
    "Change Volume",
    "Change Theme",
  ],
  typeSpeed: 150,
  backSpeed: 150,
  loop: true,
});
// Function to start typing animation
function startTyping(target, text) {
  new Typed(target, {
    strings: [text],
    typeSpeed: 50,
    backSpeed: 0,
    loop: false,
    showCursor: false,
  });
}

// Add hover listener to the correct section using existing class names
const featureSection = document.querySelector("section.rounded-5.p-5.my-5"); // Target based on existing classes
let typedOnce = false; // Flag to ensure typing happens only once

featureSection.addEventListener("mouseenter", function () {
  // Check if typing has already been triggered
  if (!typedOnce) {
    // Select all the type-target elements inside the container
    document.querySelectorAll(".type-target").forEach((targetSpan) => {
      // Get the text from the data-text attribute
      const text = targetSpan.getAttribute("data-text");

      // Clear any previous typed content
      targetSpan.innerHTML = "";

      // Start typing animation for each feature box
      startTyping(targetSpan, text);
    });

    // Set the flag to true to prevent retyping on hover
    typedOnce = true;
  }
});
document.addEventListener("DOMContentLoaded", () => {
  // Get the saved theme from localStorage, default to "dark" if none is set
  const currentTheme = localStorage.getItem("theme") || "dark";

  // Set the theme on the <html> element
  document.documentElement.setAttribute("data-theme", currentTheme);

  // Set the correct images based on the theme
  const img1 = document.getElementById("image1");
  const img2 = document.getElementById("image2");

  if (currentTheme === "light") {
    img1.src = "./Images/lisbook-about-white.jpg";
    img2.src = "./Images/lisbook-about-white.jpg";
  } else {
    img1.src = "./Images/lisbook-about.jpg";
    img2.src = "./Images/lisbook-about.jpg";
  }
});

// Function to toggle between light and dark theme
const toggleTheme = () => {
  // Get the current theme from the <html> element's data-theme attribute
  const currentTheme = document.documentElement.getAttribute("data-theme");

  // Determine the new theme based on the current one
  const newTheme = currentTheme === "light" ? "dark" : "light";

  // Set the new theme on the <html> element
  document.documentElement.setAttribute("data-theme", newTheme);

  // Save the new theme to localStorage
  localStorage.setItem("theme", newTheme);

  // Update the images based on the new theme
  const img1 = document.getElementById("image1");
  const img2 = document.getElementById("image2");

  if (newTheme === "light") {
    img1.src = "./Images/lisbook-about-white.jpg";
    img2.src = "./Images/lisbook-about-white.jpg";
  } else {
    img1.src = "./Images/lisbook-about.jpg";
    img2.src = "./Images/lisbook-about.jpg";
  }
};

// Add event listener for the theme toggle button
document.getElementById("theme-toggle");

// contributors auto update

async function fetchContributors(repoOwner, repoName) {
  try {
    const response = await fetch(
      `https://api.github.com/repos/${repoOwner}/${repoName}/contributors`
    );

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const contributors = await response.json();
    return contributors;
  } catch (error) {
    console.error("Error fetching contributors:", error);
  }
}

function generateContributorsHTML(contributors) {
  return contributors
    .map(
      (contributor) => `
      <div class="col">
        <div class="features-card border border-light-subtle rounded-5 p-3 py-4">
          <div class="card-body text-center">
            <img
              src="${contributor.avatar_url}"
              class="card-img-top rounded-circle mx-auto"
              style="width: 100px; height: 100px"
              alt="${contributor.login}"
            />
            <div class="card-body mt-3">
              <h5 class="card-title">${contributor.login}</h5>
              <p class="card-text">
                <a href="${contributor.html_url}" target="_blank" class="btn btn-bd-primary btn-sm rounded-4 mt-2">GitHub Profile</a>
              </p>
            </div>
          </div>
        </div>
      </div>
    `
    )
    .join("");
}

async function loadContributors() {
  const repoOwner = "Ctoic"; // GitHub username or organization
  const repoName = "Lisbook"; // Repository name

  const contributors = await fetchContributors(repoOwner, repoName);

  if (contributors) {
    const contributorsHTML = generateContributorsHTML(contributors);
    document.querySelector(
      ".row.row-cols-1.row-cols-md-3.row-cols-lg-5.g-4.mt-4.align-items-stretch"
    ).innerHTML = contributorsHTML;
  }
}

// Call the function when the page loads
document.addEventListener("DOMContentLoaded", loadContributors);

//auto-type contributors
const titles = [
  "Collaborators",
  "Authors",
  "Developers",
  "Co-authors",
  "Team Members",
  "Participants",
  "Co-contributors",
  "Supporters",
  "Associates",
  "Engagers",
  "Project Allies",
  "engineers",
  "Contributing Members",
];

let titleIndex = 0;
let charIndex = 0;
const typingSpeed = 100; // Speed of typing in milliseconds
const erasingSpeed = 50; // Speed of erasing in milliseconds
const pauseDuration = 1500; // Pause before starting the next title

const autoType = () => {
  const currentTitle = titles[titleIndex];

  if (charIndex < currentTitle.length) {
    document.getElementById("auto-type-title").textContent +=
      currentTitle.charAt(charIndex);
    charIndex++;
    setTimeout(autoType, typingSpeed);
  } else {
    // Pause at the end of the word before erasing
    setTimeout(erase, pauseDuration);
  }
};

const erase = () => {
  const currentTitle = titles[titleIndex];

  if (charIndex > 0) {
    document.getElementById("auto-type-title").textContent = currentTitle.slice(
      0,
      charIndex - 1
    );
    charIndex--;
    setTimeout(erase, erasingSpeed);
  } else {
    // Move to the next title
    titleIndex = (titleIndex + 1) % titles.length; // Loop back to the first title
    setTimeout(autoType, typingSpeed);
  }
};

// Start the typing effect
document.addEventListener("DOMContentLoaded", () => {
  autoType();
});
//contact page
document
  .getElementById("contact-form")
  .addEventListener("submit", function (e) {
    e.preventDefault();

    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const phone = document.getElementById("phone").value;
    const message = document.getElementById("message").value;

    if (name && email && phone && message) {
      document.getElementById("success-msg").classList.remove("hidden");
      setTimeout(
        () => document.getElementById("success-msg").classList.add("hidden"),
        5000
      );

      // Reset form after submission
      this.reset();
    }
  });

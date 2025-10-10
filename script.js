// Utility function to display a custom error popup (replacing native alert)
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
    // Responsive styling using CSS variables defined in about.html or assumed global
    errorPopup.style.backgroundColor = document.documentElement.getAttribute("data-theme") === "dark" ? "#1e1e1e" : "#fff";
    errorPopup.style.color = document.documentElement.getAttribute("data-theme") === "dark" ? "#e0e0e0" : "#2c3e50";
    errorPopup.style.padding = "30px";
    errorPopup.style.border = "1px solid #ccc";
    errorPopup.style.zIndex = "9999";
    errorPopup.style.borderRadius = "12px"; // Enhanced rounded corners
    errorPopup.style.textAlign = "center";
    errorPopup.style.boxShadow = "0 10px 25px rgba(0, 0, 0, 0.5)";
    errorPopup.style.maxWidth = "90%";
    errorPopup.style.minWidth = "250px";

    errorPopup.innerHTML = `
        <h2 style="color: var(--color-primary); font-weight: 700; margin-bottom: 15px; font-size: 1.5rem;">Heads Up!</h2>
        <p style="margin-bottom: 20px;">${message}</p>
        <button class="close-btn" style="padding: 10px 20px; background-color: var(--color-primary); color: #121212; border: none; border-radius: 6px; cursor: pointer; font-weight: 600; transition: background-color 0.2s;">Got It</button>
    `;

    document.body.appendChild(errorPopup);

    // Attach event listener to the close button
    const closeButton = errorPopup.querySelector("button");
    closeButton.addEventListener("click", () => {
        errorPopup.remove();
        overlay.remove();
    });
}

// Format time from seconds to MM:SS
function formatTime(seconds) {
    const minutes = Math.floor(seconds / 60);
    const secondsLeft = Math.floor(seconds % 60);
    return `${minutes}:${secondsLeft < 10 ? "0" : ""}${secondsLeft}`;
}

// Function to load an HTML file into an element 
function loadHTML(file, elementId) {
    fetch(file)
        .then((response) => {
            if (!response.ok)
                throw new Error("Erreur lors du chargement du fichier " + file);
            return response.text();
        })
        .then((data) => {
            const element = document.getElementById(elementId);
            if (element) element.innerHTML = data;
        })
        .catch((error) => console.error(error));
}

// Function to start the typing animation (used for features section)
function startTyping(target, text) {
    new Typed(target, {
        strings: [text],
        typeSpeed: 50,
        backSpeed: 0,
        loop: false,
        showCursor: false,
    });
}

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
        // Use a placeholder URL for the light theme image
        if (img1) img1.src = "https://placehold.co/800x600/f5f7fa/2c3e50?text=Lisbook+Story+Light";
        if (img2) img2.src = "https://placehold.co/800x600/f5f7fa/2c3e50?text=Lisbook+Open+Source+Light";
    } else {
        // Use a placeholder URL for the dark theme image
        if (img1) img1.src = "https://placehold.co/800x600/121212/a7e078?text=Lisbook+Story+Dark";
        if (img2) img2.src = "https://placehold.co/800x600/121212/a7e078?text=Lisbook+Open+Source+Dark";
    }
};

// --- Contributor Auto Update Logic ---
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
        return null;
    }
}

function generateContributorsHTML(contributors) {
    // Check if the response is an array before mapping
    if (!Array.isArray(contributors)) {
        return `<p class="text-center text-danger col-span-full">Contributor data format is invalid.</p>`;
    }

    return contributors
        .map(
            (contributor) => `
            <div class="col">
                <div class="features-card rounded-xl p-4 shadow-md hover:shadow-xl transition duration-300">
                    <div class="card-body text-center">
                        <img
                            src="${contributor.avatar_url}"
                            class="rounded-full mx-auto mb-3 object-cover"
                            style="width: 100px; height: 100px"
                            alt="${contributor.login}"
                        />
                        <div class="card-body">
                            <h5 class="font-bold text-lg">${contributor.login}</h5>
                            <p class="text-sm opacity-70 mb-3">${contributor.contributions} Contributions</p>
                            <a href="${contributor.html_url}" target="_blank" 
                                class="inline-block px-4 py-2 bg-primary-color text-black font-semibold rounded-lg text-sm transition duration-200 hover:bg-opacity-80" 
                                style="background-color: var(--color-primary); color: var(--color-background);"
                            >
                                GitHub Profile
                            </a>
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

    if (contributors && contributors.length > 0) {
        // Target the container in about.html using the class selector
        const container = document.querySelector(
            ".row.row-cols-1.row-cols-md-3.row-cols-lg-5.g-4.mt-4.align-items-stretch"
        );

        if (container) {
            const contributorsHTML = generateContributorsHTML(contributors);
            container.innerHTML = contributorsHTML;
        } else {
            console.warn("Contributor container not found in the DOM.");
        }
    } else if (contributors === null) {
        // Display an error message in the container
        const container = document.querySelector(".row.row-cols-1.row-cols-md-3.row-cols-lg-5.g-4.mt-4.align-items-stretch");
        if (container) {
            container.innerHTML = `<div class="col-span-full text-center p-6 bg-red-900/20 rounded-lg text-red-400">
                <p>Failed to load contributors from GitHub. Please check the repository name and connection.</p>
            </div>`;
        }
    }
}

// --- Main DOM Content Loaded Listener ---
document.addEventListener("DOMContentLoaded", function () {
    console.log("✓ DOM fully loaded, starting application setup...");

    const playlistItems = document.querySelectorAll("#playlist li");
    const progressBars = document.querySelectorAll(".progress-bar");
    const audioPlayer = document.getElementById("audio-player");
    const themeToggle = document.getElementById("theme-toggle");
    const menuToggle = document.getElementById("menu-toggle");
    const menuClose = document.getElementById("menu-close");
    const menu = document.getElementById("menu");
    const favBooksList = document.getElementById("fav-audio-books-list");
    const favouriteButton = document.getElementById("favourite-btn");
    const commentForm = document.getElementById("comment-form");
    const FAV_BOOKS_KEY = "fav_books";
    const currentBookId = "7";
    let allBooksList = []; // Assuming this will be populated elsewhere
    let currentBook; // Assuming this will be populated elsewhere
    
    // Audio Player Controls Buttons
    const ctrlPlay = document.getElementById("ctrl-play");
    const ctrlFastBackward = document.getElementById("fast-backward");
    const ctrlFastForward = document.getElementById("fast-forward");
    const volumeUp = document.getElementById("volume-up");
    const volumeDown = document.getElementById("volume-down");

    const seekSlider = document.getElementById("seekSlider");
    const currentTimeLabel = document.getElementById("currentTime");
    const durationLabel = document.getElementById("duration");

    // --- Scroll to Top Button Setup ---
    const scrollBtn = document.createElement("button");
    scrollBtn.id = "scrollToTopBtn";
    scrollBtn.className = "scroll-to-top-btn";
    scrollBtn.setAttribute("aria-label", "Scroll to top");
    scrollBtn.setAttribute("title", "Scroll to top");
    scrollBtn.innerHTML = `
        <svg xmlns="http://www.w3.org/2000/svg" class="scroll-arrow" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 10l7-7m0 0l7 7m-7-7v18" />
        </svg>
    `;
    document.body.appendChild(scrollBtn);

    window.addEventListener("scroll", () => {
        if (window.scrollY > 100) {
            scrollBtn.classList.add("show");
        } else {
            scrollBtn.classList.remove("show");
        }
    });

    scrollBtn.addEventListener("click", (e) => {
        e.preventDefault();
        window.scrollTo({ top: 0, behavior: "smooth" });
    });
    console.log("✓ Scroll button attached");
    // --- End Scroll to Top Button Setup ---

    // --- URL Parameters for Audio Playback ---
    const urlParams = new URLSearchParams(window.location.search);
    const audioFile = urlParams.get("file");
    const startTime = urlParams.get("t");

    if (audioPlayer && audioFile && startTime) {
        audioPlayer.src = `audio/${audioFile}`;
        audioPlayer.currentTime = startTime;
        audioPlayer.play().catch((error) => {
            console.error("Auto-play failed:", error);
        });
    }

    // --- Share Button ---
    const shareBtn = document.getElementById("share-link");
    if (shareBtn && audioPlayer) {
        shareBtn.addEventListener("click", () => {
            const currentAudioFile = audioPlayer.src.split("/").pop();
            const currentTime = audioPlayer.currentTime;

            const currentUrl = `${
                window.location.origin + window.location.pathname
            }?file=${currentAudioFile}&t=${Math.floor(currentTime)}`; // Fixed URL construction
            
            // Use custom popup instead of alert
            navigator.clipboard
                .writeText(currentUrl)
                .then(() => {
                    showErrorPopup("Share link copied to clipboard!");
                })
                .catch((err) => {
                    console.error("Failed to copy: ", err);
                    showErrorPopup("Failed to copy link to clipboard.");
                });
        });
    }

    // --- Speed Controls ---
    const speedButton = document.getElementById("speedButton");
    const speedDropdown = document.getElementById("speedDropdown");
    
    if (speedButton && speedDropdown && audioPlayer) {
        speedButton.addEventListener("click", () => {
            speedDropdown.classList.toggle("hidden");
        });

        const speedItems = speedDropdown.querySelectorAll("li");

        speedItems.forEach((item) => {
            item.addEventListener("click", () => {
                const selectedSpeed = parseFloat(item.getAttribute("data-speed"));
                
                audioPlayer.playbackRate = selectedSpeed;
                speedButton.textContent = selectedSpeed + "x";
                speedDropdown.classList.add("hidden");
            });
        });

        // Ensure initial playback rate is set if not already
        audioPlayer.addEventListener("canplay", () => {
            speedButton.textContent = audioPlayer.playbackRate + "x";
        });
    }


    // --- Favourites Logic ---
    function toggleHeart(activate) {
        if (favouriteButton) {
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
        return false;
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

    // Placeholder for renderBookItem as the full book list/template is not provided
    function renderBookItem(book, listElement) {
        // This function is dependent on HTML for book cards, which is missing.
        // Assuming for now it's not critical for script execution.
        // console.log("Rendering book item placeholder for:", book.id);
    }
    
    function loadFavourites() {
        const favs = localStorage.getItem(FAV_BOOKS_KEY);
        var favsList = JSON.parse(favs) || [];
        
        if (favBooksList) favBooksList.innerHTML = "";

        const favEmptyContainer = document.getElementById("fav-empty-container");

        if (favsList.length === 0) {
            if (favEmptyContainer) favEmptyContainer.classList.remove("invisible");
            return;
        } else {
            if (favEmptyContainer) favEmptyContainer.classList.add("invisible");
        }

        if (favsList.includes(currentBookId)) {
            toggleHeart(true);
        }
        
        // Iterating over allBooksList (which is currently empty)
        // allBooksList.forEach((book) => {
        //   if (favsList.includes(book.id)) {
        //      renderBookItem(book, favBooksList);
        //   }
        // });
    }
    
    loadFavourites(); // Initial load of favourites

    if (favouriteButton) {
        favouriteButton.addEventListener("click", () => {
            const activated = toggleHeart();
            markFavourite(currentBookId);
            if (activated) {
                document
                    .getElementById("fav-empty-container")
                    .classList.add("invisible");
                // renderBookItem(currentBook, favBooksList); // Re-enable once currentBook and renderBookItem are defined
            } else {
                loadFavourites();
            }
        });
    }
    // --- End Favourites Logic ---


    // --- Playlist Item Click Event ---
    playlistItems.forEach((item) => {
        item.addEventListener("click", function () {
            const audioSource = item.getAttribute("data-src");

            if (audioPlayer && audioSource) {
                audioPlayer.src = audioSource;

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
            } else if (!audioSource) {
                showErrorPopup("Audio source not available.");
            }
        });
    });

    // --- Cursor Smooth Animation ---
    const circles = document.querySelectorAll(".circle");
    const logo = document.querySelector(".logo");
    const coords = { x: 0, y: 0 };
    
    if (logo) {
        const logoRect = logo.getBoundingClientRect();
        coords.x = logoRect.left + logoRect.width / 2;
        coords.y = logoRect.top + logoRect.height / 2;
    }

    const colors = [
        "#a7e078", "#9dd36c", "#94c760", "#8abc55", "#80b14b", "#76a640", 
        "#6cbf58", "#62a24d", "#579643", "#4e8a3b", "#458132", "#3b752a", 
        "#336824", "#2c9137", "#23802c", "#1f7628", "#1b6c25", "#121212", 
        "#0f0f0f", "#2b2b2b", "#1e1e1e", "#1a1a1a",
    ];

    circles.forEach((circle, index) => {
        circle.style.backgroundColor = colors[index % colors.length];
        circle.x = 0;
        circle.y = 0;
    });

    document.addEventListener("mousemove", function (e) {
        coords.x = e.clientX;
        coords.y = e.clientY;
    });

    function animateCircles() {
        let x = coords.x;
        let y = coords.y;

        circles.forEach((circle, index) => {
            circle.style.left = `${x - 12}px`;
            circle.style.top = `${y - 12}px`;

            circle.style.transform = `scale(${
                (circles.length - index) / circles.length
            })`;

            const nextCircle = circles[index + 1] || circles[0];
            x += (nextCircle.x - x) * 0.2;
            y += (nextCircle.y - y) * 0.2;

            circle.x = x;
            circle.y = y;
        });

        requestAnimationFrame(animateCircles);
    }

    if (circles.length > 0) {
        animateCircles();
    }
    // --- End Cursor Smooth Animation ---

    // --- Keyboard Shortcuts ---
    if (audioPlayer) {
        document.addEventListener("keydown", function (e) {
            switch (e.code) {
                case "Space": // Play / Pause
                    e.preventDefault();
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

                case "Equal": 
                case "NumpadAdd": // Increase volume
                    if (audioPlayer.volume < 1) {
                        audioPlayer.volume = Math.min(audioPlayer.volume + 0.1, 1);
                    }
                    break;

                case "Minus": 
                case "NumpadSubtract": // Reduce volume
                    if (audioPlayer.volume > 0) {
                        audioPlayer.volume = Math.max(audioPlayer.volume - 0.1, 0);
                    }
                    break;

                default:
                    break;
            }
        });
    }

    // --- Audio Player Controls ---
    if (ctrlPlay && audioPlayer) {
        ctrlPlay.addEventListener("click", function () {
            if (audioPlayer.paused) {
                audioPlayer.play();
            } else {
                audioPlayer.pause();
            }
        });

        if (ctrlFastForward) {
            ctrlFastForward.addEventListener("click", function () {
                audioPlayer.currentTime += 30;
            });
        }

        if (ctrlFastBackward) {
            ctrlFastBackward.addEventListener("click", function () {
                audioPlayer.currentTime -= 30;
            });
        }

        if (volumeUp) {
            volumeUp.addEventListener("click", function () {
                if (audioPlayer.volume < 1) {
                    audioPlayer.volume = Math.min(audioPlayer.volume + 0.1, 1);
                }
            });
        }

        if (volumeDown) {
            volumeDown.addEventListener("click", function () {
                if (audioPlayer.volume > 0) {
                    audioPlayer.volume = Math.max(audioPlayer.volume - 0.1, 0);
                }
            });
        }

        // Seek Player
        audioPlayer.addEventListener("timeupdate", () => {
            if (seekSlider) {
                seekSlider.value = audioPlayer.currentTime;
            }
            if (currentTimeLabel) {
                currentTimeLabel.textContent = formatTime(audioPlayer.currentTime);
            }
        });
        
        // Seek functionality
        if (seekSlider) {
            seekSlider.addEventListener("input", (event) => {
                audioPlayer.currentTime = event.target.value;
            });
        }

        audioPlayer.addEventListener("ended", function () {
            if (ctrlPlay) {
                ctrlPlay.innerHTML = '<i class="bi bi-play-fill"></i>';
            }
        });

        audioPlayer.addEventListener("play", function () {
            if (ctrlPlay) {
                ctrlPlay.innerHTML = '<i class="bi bi-pause-fill"></i>';
            }
        });

        audioPlayer.addEventListener("pause", function () {
            if (ctrlPlay) {
                ctrlPlay.innerHTML = '<i class="bi bi-play-fill"></i>';
            }
        });

        audioPlayer.addEventListener("loadedmetadata", () => {
            if (durationLabel) {
                durationLabel.textContent = formatTime(audioPlayer.duration);
            }
            if (seekSlider) {
                seekSlider.max = audioPlayer.duration;
            }
        });

        audioPlayer.addEventListener("loadeddata", function () {
            playlistItems?.forEach((item) => {
                const dataSrc = item.getAttribute("data-src");
                if (audioPlayer.src.includes(dataSrc)) {
                    let time = parseInt(localStorage.getItem(dataSrc)) || 0;
                    audioPlayer.currentTime = (time * audioPlayer.duration) / 100;
                }
            });
        });
    }

    // --- Comment Submission ---
    if (commentForm) {
        commentForm.addEventListener("submit", function (e) {
            e.preventDefault();
            const username = document.getElementById("username")?.value;
            const comment = document.getElementById("comment")?.value;
            const commentsList = document.getElementById("comments-list");

            if (username && comment && commentsList) {
                const commentHTML = `<div class="bg-gray-700 text-white p-4 rounded-lg">
                    <strong>${username}:</strong>
                    <p>${comment}</p>
                </div>`;

                commentsList.insertAdjacentHTML("beforeend", commentHTML);

                document.getElementById("comment-form")?.reset();
            }
        });
    }

    // --- Feedback Submission (EmailJS Dependency - unchanged) ---
    const feedbackForm = document.getElementById("feedback-form");
    if (feedbackForm) {
        feedbackForm.addEventListener("submit", function (event) {
            event.preventDefault();
            // NOTE: This requires EmailJS setup ('your_service_id' and 'feedback_form' template ID)
            // The EmailJS library script is expected to be loaded in the HTML.
            if (typeof emailjs !== 'undefined' && emailjs.sendForm) {
                emailjs.sendForm("your_service_id", "feedback_form", this).then(
                    () => {
                        console.log("SUCCESS! Feedback Sent.");
                        feedbackForm.reset();
                    },
                    (error) => {
                        console.log("FAILED to send feedback...", error);
                    }
                );
            } else {
                console.warn("EmailJS library not loaded. Feedback submission skipped.");
                feedbackForm.reset();
            }
        });
    }


    // --- Theme Toggle ---
    function initializeTheme() {
        const currentTheme = localStorage.getItem("theme") || "dark";
        document.documentElement.setAttribute("data-theme", currentTheme);
        toggleTheme(); // Run once to set images and initial state
    }

    initializeTheme();

    if (themeToggle) {
        themeToggle.addEventListener("click", () => {
            toggleTheme();
        });
    }

    // --- Mobile Menu Toggle ---
    if (menuToggle && menu && menuClose) {
        menuToggle.addEventListener("click", () => {
            menu.classList.remove("scale-0");
            menu.classList.add("scale-100");
        });

        menuClose.addEventListener("click", () => {
            menu.classList.add("scale-0");
            menu.classList.remove("scale-100");
        });
    }

    // --- Progress Bars (Local Storage) ---
    function initializeProgressBars() {
        progressBars?.forEach((progressBar, index) => {
            const dataSrc = playlistItems[index]?.getAttribute("data-src");
            if (dataSrc) {
                let percentage = parseInt(localStorage.getItem(dataSrc)) || 0;
                progressBar.style.width = percentage + "%";
                progressBar.textContent = percentage ? percentage + "%" : "";
            }
        });
    }
    initializeProgressBars();

    audioPlayer?.addEventListener("timeupdate", function () {
        if (audioPlayer.readyState)
            progressBars?.forEach((progressBar, index) => {
                const item = playlistItems[index];
                if (!item) return;

                const dataSrc = item.getAttribute("data-src");
                // Check if the current audio source matches the playlist item
                if (audioPlayer.src.includes(dataSrc) && audioPlayer.duration > 0) {
                    let percentage = Math.min(100,
                        parseInt((audioPlayer.currentTime / audioPlayer.duration) * 100)
                    );
                    progressBar.style.width = percentage + "%";
                    progressBar.textContent = percentage ? percentage + "%" : "";
                    localStorage.setItem(dataSrc, percentage);
                }
            });
    });
    
    // --- FAQ Auto Type Answer ---
    const faqBoxes = document.querySelectorAll(".faq-box");

    faqBoxes.forEach((box) => {
        box.addEventListener("mouseenter", function () {
            const question = box.querySelector(".faq-question");
            const answerId = question?.getAttribute("data-answer");
            const answerElement = document.getElementById(answerId);

            if (!answerElement || !answerElement.classList.contains("hidden")) return;

            typeAnswer(
                answerElement,
                answerElement.dataset.fulltext || answerElement.innerHTML
            );
        });
    });

    function typeAnswer(element, answer) {
        element.dataset.fulltext = answer;
        element.innerHTML = "";
        element.classList.remove("hidden");
        let i = 0;

        function type() {
            if (i < answer.length) {
                element.innerHTML += answer.charAt(i);
                i++;
                setTimeout(type, 50);
            }
        }
        type();
    }

 const editNameBtn = document.getElementById("edit-name");
    if (editNameBtn) {
        editNameBtn.addEventListener("click", () => {
            // Using prompt for simplicity, but a custom modal is recommended
            const newName = prompt("Enter your new name:"); 
            const profileNameElement = document.querySelector(".profile-section p");

            if (newName && profileNameElement) {
                profileNameElement.innerText = `Name: ${newName}`;
            }
        });
    }

    document.querySelectorAll(".friend-card").forEach((card) => {
        card.addEventListener("click", function () {
            const targetId = this.getAttribute("data-target");
            const content = document.querySelector(targetId);
            
            if (content) {
                const isCollapsed = content.classList.contains("expanded");

                if (isCollapsed) {
                    content.classList.remove("expanded");
                    card.classList.add("collapsed");
                } else {
                    content.classList.add("expanded");
                    card.classList.remove("collapsed");
                }
            }
        });
    });

    // --- General Auto-Type for Hero Section ---
    const autoTypeElement = document.querySelector(".auto-type");
    if (autoTypeElement) {
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
    }


    // --- Feature Section Type Animation on Hover ---
    const featureSection = document.querySelector("section.rounded-5.p-5.my-5");
    let typedOnce = false;

    if (featureSection) {
        featureSection.addEventListener("mouseenter", function () {
            if (!typedOnce) {
                document.querySelectorAll(".type-target").forEach((targetSpan) => {
                    const text = targetSpan.getAttribute("data-text");

                    if (text) {
                        targetSpan.innerHTML = "";
                        startTyping(targetSpan, text);
                    }
                });

                typedOnce = true;
            }
        });
    }

    // --- Contributor Title Auto-Type ---
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
    const typingSpeed = 100;
    const erasingSpeed = 50;
    const pauseDuration = 1500;
    const autoTypeTitleElement = document.getElementById("auto-type-title");

    const autoTypeTitle = () => {
        const currentTitle = titles[titleIndex];

        if (autoTypeTitleElement && charIndex < currentTitle.length) {
            autoTypeTitleElement.textContent += currentTitle.charAt(charIndex);
            charIndex++;
            setTimeout(autoTypeTitle, typingSpeed);
        } else if (autoTypeTitleElement) {
            setTimeout(eraseTitle, pauseDuration);
        }
    };

    const eraseTitle = () => {
        const currentTitle = titles[titleIndex];

        if (autoTypeTitleElement && charIndex > 0) {
            autoTypeTitleElement.textContent = currentTitle.slice(
                0,
                charIndex - 1
            );
            charIndex--;
            setTimeout(eraseTitle, erasingSpeed);
        } else {
            titleIndex = (titleIndex + 1) % titles.length;
            setTimeout(autoTypeTitle, typingSpeed);
        }
    };
    
    if (autoTypeTitleElement) {
        autoTypeTitle();
    }
    // --- End Contributor Title Auto-Type ---

    // --- Contact Page Submission ---
    const contactForm = document.getElementById("contact-form");
    if (contactForm) {
        contactForm.addEventListener("submit", function (e) {
            e.preventDefault();

            const name = document.getElementById("name")?.value;
            const email = document.getElementById("email")?.value;
            const phone = document.getElementById("phone")?.value;
            const message = document.getElementById("message")?.value;
            const successMsg = document.getElementById("success-msg");

            if (name && email && phone && message && successMsg) {
                successMsg.classList.remove("hidden");
                setTimeout(
                    () => successMsg.classList.add("hidden"),
                    5000
                );

                this.reset();
            }
        });
    }

    // --- File Loading ---
    // Load header and footer (dependent on external files)
    loadHTML("./pages/header.html", "header-placeholder");
    loadHTML("./pages/footer.html", "footer-placeholder");

    // --- Load Contributors on About Page ---
    // Check if the contributor container exists (only on about.html)
    if (document.querySelector(".row.row-cols-1.row-cols-md-3.row-cols-lg-5.g-4.mt-4.align-items-stretch")) {
        loadContributors();
    }
});

// Hide the loader when the page is fully loaded
window.addEventListener("load", function () {
    const loader = document.getElementById("loader");
    if (loader) {
        loader.classList.add("hidden");
    }
});

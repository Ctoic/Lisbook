document.addEventListener("DOMContentLoaded", function () {
    const audioPlayer = document.getElementById("audio-player");
    const playlistItems = document.querySelectorAll("#playlist li");

    playlistItems.forEach((item) => {
        item.addEventListener("click", function () {
            const audioSource = this.getAttribute("data-src");
            audioPlayer.src = audioSource;
            audioPlayer.play();
        });
    });
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

    document.addEventListener("DOMContentLoaded", function () {
    const prevBtn = document.getElementById("prev-btn");
    const nextBtn = document.getElementById("next-btn");

    // Define the pages
    const pages = ['index.html', 'genres.html', 'about.html'];
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
    nextBtn.addEventListener("click", nextPage);

    // Event listener for "Previous" button
    prevBtn.addEventListener("click", prevPage);
});

});

document.addEventListener("DOMContentLoaded", function () {
    const audioPlayer = document.getElementById("audio-player");
    const playlistItems = document.querySelectorAll("#playlist li");
    const prevBtn = document.getElementById("prev-btn");
    const nextBtn = document.getElementById("next-btn");
    let currentIndex = 0;

    // Function to play the current track
    function playTrack(index) {
        const audioSource = playlistItems[index].getAttribute("data-src");
        audioPlayer.src = audioSource;
        audioPlayer.play();
    }

    // Initial play
    playTrack(currentIndex);

    // Event listener for "Next" button
    nextBtn.addEventListener("click", function () {
        currentIndex = (currentIndex + 1) % playlistItems.length;
        playTrack(currentIndex);
    });

    // Event listener for "Previous" button
    prevBtn.addEventListener("click", function () {
        currentIndex = (currentIndex - 1 + playlistItems.length) % playlistItems.length;
        playTrack(currentIndex);
    });

    // Event listener for playlist items
    playlistItems.forEach((item, index) => {
        item.addEventListener("click", function () {
            currentIndex = index;
            playTrack(currentIndex);
        });
    });

    // Event listener for form submission (comments)
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
});

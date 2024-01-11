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
});

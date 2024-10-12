document.addEventListener("DOMContentLoaded", function () {
  const bookmarkButtons = document.querySelectorAll(".bookmark-btn");
  const audioPlayer = document.getElementById("audio-player");

  const currentPage = window.location.pathname.split("/").pop();

  // Function to get the audio file name
  function getAudioFileName(audioSrc) {
    const audioFilePath = new URL(audioSrc).pathname;
    const audioFileName = audioFilePath.split("/").pop();
    const partName = audioFileName.split(".")[0];
    return partName;
  }

  // Function to check if this page has a saved bookmark
  function checkForBookmark() {
    const storedData = localStorage.getItem(currentPage);
    if (storedData) {
      const { audioSrc, currentTime } = JSON.parse(storedData);

      audioPlayer.src = audioSrc;
      audioPlayer.currentTime = currentTime;

      bookmarkButtons.forEach((button) => {
        button.classList.remove("bi-bookmark");
        button.classList.add("bi-bookmark-fill");
      });

      const audioFileName = getAudioFileName(audioSrc);
      alert(
        `Loading ${audioFileName} - ${Math.floor(
          currentTime
        )} seconds from bookmark.`
      );
    }
  }

  // Function to toggle bookmark (save or remove)
  function toggleBookmark() {
    const isBookmarked = localStorage.getItem(currentPage);

    if (isBookmarked) {
      localStorage.removeItem(currentPage);
      alert(`Bookmark removed for this book.`);

      bookmarkButtons.forEach((button) => {
        button.classList.remove("bi-bookmark-fill");
        button.classList.add("bi-bookmark");
      });
    } else {
      const audioSrc = audioPlayer.src;
      const currentTime = audioPlayer.currentTime;

      const bookmarkData = {
        audioSrc: audioSrc,
        currentTime: currentTime,
      };

      localStorage.setItem(currentPage, JSON.stringify(bookmarkData));

      const audioFileName = getAudioFileName(audioSrc);
      alert(
        `Bookmark saved for this book at ${audioFileName} - ${Math.floor(
          currentTime
        )} seconds.`
      );

      bookmarkButtons.forEach((button) => {
        button.classList.remove("bi-bookmark");
        button.classList.add("bi-bookmark-fill");
      });
    }
  }

  bookmarkButtons.forEach((button) => {
    button.addEventListener("click", toggleBookmark);
  });

  checkForBookmark();
});

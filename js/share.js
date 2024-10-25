export function initializeShareButton(audioPlayer) {
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
          alert("Link copied to clipboard");
        })
        .catch((err) => {
          console.error("Failed to copy: ", err);
        });
    });
  }
}

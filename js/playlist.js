// playlist.js

export const handlePlaylistItemClick = (
  playlistItems,
  audioPlayer,
  showErrorPopup
) => {
  playlistItems.forEach((item) => {
    item.addEventListener("click", function () {
      const audioSource = item.getAttribute("data-src");

      // Vérifie si la source audio existe avant de lire
      if (audioSource) {
        audioPlayer.src = audioSource;

        // Gère les erreurs de lecture
        audioPlayer.play().catch((error) => {
          console.error("Erreur de lecture audio:", error);
          if (error.name === "NotSupportedError") {
            showErrorPopup(
              "Impossible de lire l'audio. Format non pris en charge ou fichier manquant."
            );
          } else {
            showErrorPopup(
              "Impossible de lire l'audio. Problème rencontré pendant la lecture."
            );
          }
        });
      } else {
        showErrorPopup("Source audio non disponible.");
      }
    });
  });
};

// audioControls.js

export function initializeAudioControls(
  audioPlayer,
  ctrlPlay,
  ctrlFastForward,
  ctrlFastBackward,
  volumeUp,
  volumeDown,
  seekSlider,
  currentTimeLabel,
  durationLabel
) {
  if (ctrlPlay && audioPlayer) {
    ctrlPlay.addEventListener("click", function () {
      if (ctrlPlay.innerHTML.includes("bi-play-fill")) {
        audioPlayer.play();
        ctrlPlay.innerHTML = '<i class="bi bi-pause-fill"></i>'; // Change the icon to pause
      } else {
        audioPlayer.pause();
        ctrlPlay.innerHTML = '<i class="bi bi-play-fill"></i>'; // Change the icon to play
      }
    });

    ctrlFastForward.addEventListener("click", () => {
      audioPlayer.currentTime += 30; // Avancer de 30 secondes
    });

    ctrlFastBackward.addEventListener("click", () => {
      audioPlayer.currentTime -= 30; // Reculer de 30 secondes
    });

    volumeUp.addEventListener("click", () => {
      if (audioPlayer.volume < 1) {
        audioPlayer.volume = Math.min(audioPlayer.volume + 0.1, 1); // Augmenter le volume
      }
    });

    volumeDown.addEventListener("click", () => {
      if (audioPlayer.volume > 0) {
        audioPlayer.volume = Math.max(audioPlayer.volume - 0.1, 0); // Diminuer le volume
      }
    });

    // Mise à jour de la barre de recherche
    audioPlayer.addEventListener("timeupdate", () => {
      seekSlider.value = audioPlayer.currentTime; // Mettre à jour la valeur de la barre de recherche
      currentTimeLabel.textContent = formatTime(audioPlayer.currentTime); // Mettre à jour l'affichage du temps actuel
    });

    // Fonctionnalité de recherche
    seekSlider.addEventListener("input", (event) => {
      audioPlayer.currentTime = event.target.value; // Modifier le temps de lecture selon la barre de recherche
    });

    // Formatage du temps en MM:SS
    function formatTime(seconds) {
      const minutes = Math.floor(seconds / 60);
      const secondsLeft = Math.floor(seconds % 60);
      return `${minutes}:${secondsLeft < 10 ? "0" : ""}${secondsLeft}`;
    }

    audioPlayer.addEventListener("ended", () => {
      ctrlPlay.innerHTML = '<i class="bi bi-play-fill"></i>'; // Réinitialiser l'icône à lecture à la fin
    });

    // Mise à jour de la barre de recherche et du temps total
    audioPlayer.addEventListener("loadedmetadata", () => {
      durationLabel.textContent = formatTime(audioPlayer.duration); // Mettre à jour l'affichage de la durée
      seekSlider.max = audioPlayer.duration; // Définir la valeur maximale de la barre de recherche
    });
  }
}

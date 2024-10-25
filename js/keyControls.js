// keyControls.js

export function initializeKeyControls(audioPlayer) {
  document.addEventListener("keydown", (e) => {
    switch (e.code) {
      case "Space": // Play / Pause
        e.preventDefault(); // Empêche le défilement de la page lorsque la barre d'espace est pressée
        if (audioPlayer.paused) {
          audioPlayer.play();
        } else {
          audioPlayer.pause();
        }
        break;

      case "ArrowRight": // Avancer de 30 secondes
        audioPlayer.currentTime += 30;
        break;

      case "ArrowLeft": // Reculer de 30 secondes
        audioPlayer.currentTime -= 30;
        break;

      case "Equal": // Augmenter le volume
      case "NumpadAdd": // Augmenter le volume avec le pavé numérique
        if (audioPlayer.volume < 1) {
          audioPlayer.volume = Math.min(audioPlayer.volume + 0.1, 1);
        }
        break;

      case "Minus": // Diminuer le volume
      case "NumpadSubtract": // Diminuer le volume avec le pavé numérique
        if (audioPlayer.volume > 0) {
          audioPlayer.volume = Math.max(audioPlayer.volume - 0.1, 0);
        }
        break;

      default:
        break;
    }
  });
}

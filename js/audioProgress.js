// audioProgress.js

import {
  initializeProgressBars,
  updateProgressBars,
  restoreProgressOnLoad,
} from "./progressBars.js";

export function setupAudioProgress(audioPlayer, progressBars, playlistItems) {
  // Initialize progress bars
  initializeProgressBars(progressBars, playlistItems);

  // Update progress bars during playback
  audioPlayer?.addEventListener("timeupdate", () => {
    if (audioPlayer.readyState) {
      updateProgressBars(audioPlayer, progressBars, playlistItems);
    }
  });

  // Restore progress when audio data is loaded
  audioPlayer?.addEventListener("loadeddata", () => {
    restoreProgressOnLoad(audioPlayer, playlistItems);
  });
}

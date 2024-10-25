export const initializeProgressBars = (progressBars, playlistItems) => {
  if (!progressBars || !playlistItems) {
    console.warn("Progress bars or playlist items not found.");
    return;
  }

  progressBars.forEach((progressBar, index) => {
    const dataSrc = playlistItems[index]?.getAttribute("data-src");
    if (!dataSrc) {
      console.warn(`data-src not found for item at index ${index}`);
      return;
    }

    let percentage = parseInt(localStorage.getItem(dataSrc)) || 0;
    progressBar.style.width = percentage + "%";
    progressBar.textContent = percentage ? percentage + "%" : "";
  });
};

export const updateProgressBars = (
  audioPlayer,
  progressBars,
  playlistItems
) => {
  if (!audioPlayer || !progressBars || !playlistItems) {
    console.warn("Audio player, progress bars, or playlist items not found.");
    return;
  }

  progressBars.forEach((progressBar, index) => {
    const dataSrc = playlistItems[index]?.getAttribute("data-src");
    if (!dataSrc) {
      console.warn(`data-src not found for item at index ${index}`);
      return;
    }

    if (audioPlayer.src.includes(dataSrc)) {
      let percentage = parseInt(
        (audioPlayer.currentTime / audioPlayer.duration) * 100
      );
      progressBar.style.width = percentage + "%";
      progressBar.textContent = percentage ? percentage + "%" : "";
      localStorage.setItem(dataSrc, percentage);
    }
  });
};

export const restoreProgressOnLoad = (audioPlayer, playlistItems) => {
  if (!audioPlayer || !playlistItems) {
    console.warn("Audio player or playlist items not found.");
    return;
  }

  playlistItems.forEach((item) => {
    const dataSrc = item.getAttribute("data-src");
    if (!dataSrc) {
      console.warn(`data-src not found for playlist item.`);
      return;
    }

    if (audioPlayer.src.includes(dataSrc)) {
      let time = parseInt(localStorage.getItem(dataSrc)) || 0;
      audioPlayer.currentTime = (time * audioPlayer.duration) / 100;
    }
  });
};

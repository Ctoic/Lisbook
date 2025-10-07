document.addEventListener("DOMContentLoaded", () => {
  const dots = document.querySelectorAll(".dot");
  const pacmanContainer = document.querySelector(".pacman-container");

  if (!pacmanContainer) return;

  let lastLeft = pacmanContainer.getBoundingClientRect().left;

  function updateDots() {
    const pacmanRect = pacmanContainer.getBoundingClientRect();
    const pacmanCenter = pacmanRect.left + pacmanRect.width / 2;

    const isMovingForward = pacmanRect.left > lastLeft;
    lastLeft = pacmanRect.left;

    dots.forEach((dot) => {
      const dotRect = dot.getBoundingClientRect();
      const dotCenter = dotRect.left + dotRect.width / 2;

      if (isMovingForward) {
        dot.style.opacity = pacmanCenter > dotCenter ? "0" : "1";
      } else {
        dot.style.opacity = pacmanCenter < dotCenter ? "0" : "1";
      }
    });

    requestAnimationFrame(updateDots);
  }

  requestAnimationFrame(updateDots);
});

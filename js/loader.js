// loader.js
export const hideLoader = () => {
  window.addEventListener("load", () => {
    const loader = document.getElementById("loader");
    if (loader) {
      loader.classList.add("hidden");
    }
  });
};

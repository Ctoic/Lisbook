// errorPopup.js

export function showErrorPopup(message) {
  const overlay = document.createElement("div");
  overlay.id = "overlay";
  overlay.style.position = "fixed";
  overlay.style.top = "0";
  overlay.style.left = "0";
  overlay.style.width = "100%";
  overlay.style.height = "100%";
  overlay.style.backgroundColor = "rgba(0, 0, 0, 0.7)";
  overlay.style.zIndex = "9998";
  overlay.style.backdropFilter = "blur(5px)";
  document.body.appendChild(overlay);

  // Créer la popup d'erreur
  const errorPopup = document.createElement("div");
  errorPopup.id = "errorPopup";
  errorPopup.style.position = "fixed";
  errorPopup.style.top = "50%";
  errorPopup.style.left = "50%";
  errorPopup.style.transform = "translate(-50%, -50%)";
  errorPopup.style.backgroundColor = "#fff";
  errorPopup.style.padding = "20px";
  errorPopup.style.border = "1px solid #ccc";
  errorPopup.style.zIndex = "9999";
  errorPopup.innerHTML = `
    <h2 style="color: red; font-weight: 600; margin-bottom: 5px;">Error</h2>
    <p>${message}</p>
    <button style="margin-top: 10px; padding: 5px 10px; float: right;">Close</button>
  `;

  document.body.appendChild(errorPopup);

  // Attacher l'événement au bouton pour fermer la popup
  const closeButton = errorPopup.querySelector("button");
  closeButton.addEventListener("click", () => {
    errorPopup.remove();
    overlay.remove();
  });
}

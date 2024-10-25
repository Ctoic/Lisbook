// bookEvents.js
export const addBookClickEvent = () => {
  document.querySelectorAll(".btn-read-book").forEach((button) => {
    button.addEventListener("click", (e) => {
      const bookId = e.target.getAttribute("data-id");
      // Redirection vers la page reading.html avec l'ID du livre
      window.location.href = `reading.html?bookId=${bookId}`;
    });
  });
};

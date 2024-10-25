// faq.js

export function initFaqTyping() {
  const faqBoxes = document.querySelectorAll(".faq-box");

  faqBoxes.forEach((box) => {
    // Hover event on the entire FAQ box
    box.addEventListener("mouseenter", () => {
      const question = box.querySelector(".faq-question");
      const answerId = question.getAttribute("data-answer");
      const answerElement = document.getElementById(answerId);

      // Check if the answer has already been displayed
      if (!answerElement.classList.contains("hidden")) return;

      // Add the typing effect
      typeAnswer(
        answerElement,
        answerElement.dataset.fulltext || answerElement.innerHTML
      );
    });
  });
}

function typeAnswer(element, answer) {
  element.dataset.fulltext = answer; // Store the full text in a data attribute
  element.innerHTML = ""; // Clear the current text
  element.classList.remove("hidden"); // Make the answer visible
  let i = 0;

  function type() {
    if (i < answer.length) {
      element.innerHTML += answer.charAt(i);
      i++;
      setTimeout(type, 50); // Adjust typing speed here
    }
  }

  type();
}

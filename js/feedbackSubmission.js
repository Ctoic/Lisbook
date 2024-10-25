// import emailjs from "emailjs-com";

export function handleFeedbackSubmission(feedbackForm) {
  window.onload = function () {
    feedbackForm?.addEventListener("submit", function (event) {
      event.preventDefault();
      emailjs.sendForm("template_4lludga", "feedback_form", this).then(
        () => {
          console.log("SUCCESS!");

          // Reset the form
          feedbackForm.reset();
        },
        (error) => {
          console.log("FAILED...", error);
        }
      );
    });
  };
}

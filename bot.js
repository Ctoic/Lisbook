class LisbookBot {
  constructor() {
    this.bookSummaries = {
      "To Kill a Mockingbird": "A novel that explores racial injustice in the Deep South through the eyes of young Scout Finch.",
      "1984": "A harrowing vision of a totalitarian future, where surveillance and propaganda are omnipresent.",
      "Moby-Dick": "An epic tale of obsession and revenge, chronicling Captain Ahab’s relentless pursuit of the white whale Moby Dick.",
      "The Adventures of Sherlock Holmes": "A collection of twelve detective mysteries featuring Sherlock Holmes and Dr. Watson."
    };
  }

  recommendBooks(userInput) {
    const recommendations = [];
    if (userInput.includes("fiction")) {
      recommendations.push("To Kill a Mockingbird", "1984");
    } else if (userInput.includes("adventure")) {
      recommendations.push("Moby-Dick", "The Adventures of Sherlock Holmes");
    }
    return recommendations;
  }

  provideSummary(bookTitle) {
    return this.bookSummaries[bookTitle] || "Summary not available.";
  }

  engageInConversation(userInput) {
    if (userInput.includes("hello")) {
      return "Hello! How can I assist you with your book journey today?";
    } else if (userInput.includes("recommend")) {
      return "Sure! What genre or type of book are you interested in?";
    } else if (userInput.includes("summary")) {
      return "Please provide the title of the book you want a summary for.";
    } else {
      return "I'm here to help! You can ask me for book recommendations or summaries.";
    }
  }
}

const bot = new LisbookBot();

document.addEventListener("DOMContentLoaded", () => {
  const chatbotMessages = document.getElementById("chatbot-messages");
  const chatbotInput = document.getElementById("chatbot-input");
  const chatbotSend = document.getElementById("chatbot-send");

  function addBotMessage(message) {
    const messageElement = document.createElement("div");
    messageElement.classList.add("bot-message");
    messageElement.textContent = message;
    chatbotMessages.appendChild(messageElement);
    chatbotMessages.scrollTop = chatbotMessages.scrollHeight;
  }

  function addUserMessage(message) {
    const messageElement = document.createElement("div");
    messageElement.classList.add("user-message");
    messageElement.textContent = message;
    chatbotMessages.appendChild(messageElement);
    chatbotMessages.scrollTop = chatbotMessages.scrollHeight;
  }

  function handleUserInput() {
    const userInput = chatbotInput.value.trim();
    if (userInput) {
      addUserMessage(userInput);
      chatbotInput.value = "";

      if (userInput.toLowerCase().includes("recommend")) {
        const recommendations = bot.recommendBooks(userInput);
        addBotMessage(`I recommend the following books: ${recommendations.join(", ")}`);
      } else if (userInput.toLowerCase().includes("summary")) {
        const bookTitle = userInput.replace("summary", "").trim();
        const summary = bot.provideSummary(bookTitle);
        addBotMessage(summary);
      } else {
        const conversationResponse = bot.engageInConversation(userInput);
        addBotMessage(conversationResponse);
      }
    }
  }

  chatbotSend.addEventListener("click", handleUserInput);
  chatbotInput.addEventListener("keypress", (e) => {
    if (e.key === "Enter") {
      handleUserInput();
    }
  });
});

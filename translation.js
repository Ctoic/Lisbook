// translations.js

// Translation Script
const translations = {
  en: {
    books: {
      frankenstein: {
        title: "Frankenstein",
        author: "By Mary Shelley",
        description: "Frankenstein tells the story of Victor Frankenstein, a scientist who creates a monstrous creature, leading to tragic consequences."
      }
    }
  },
  fr: {
    books: {
      frankenstein: {
        title: "Frankenstein",
        author: "Par Mary Shelley",
        description: "Frankenstein raconte l'histoire de Victor Frankenstein, un scientifique qui crée une créature monstrueuse, entraînant des conséquences tragiques."
      }
    }
  },
  es: {
    books: {
      frankenstein: {
        title: "Frankenstein",
        author: "Por Mary Shelley",
        description: "Frankenstein cuenta la historia de Victor Frankenstein, un científico que crea una criatura monstruosa, lo que lleva a consecuencias trágicas."
      }
    }
  },
  zh: {
    books: {
      frankenstein: {
        title: "弗兰肯斯坦",
        author: "玛丽·雪莱",
        description: "《弗兰肯斯坦》讲述了科学家维克多·弗兰肯斯坦创造了一个怪物，导致悲剧性后果的故事。"
      }
    }
  }
};

console.log('Translations object:', translations);

function changeLanguage() {
  const selectedLanguage = document.getElementById('language').value;
  console.log('Selected language:', selectedLanguage);
  applyTranslations(selectedLanguage);
}

function applyTranslations(language) {
  const bookElements = document.querySelectorAll('[data-book]');
  bookElements.forEach(bookElement => {
    const bookKey = bookElement.getAttribute('data-book');
    console.log('Book key:', bookKey);
    if (translations[language] && translations[language].books && translations[language].books[bookKey]) {
      const bookTranslations = translations[language].books[bookKey];
      console.log('Applying translations for:', bookKey, bookTranslations);
      bookElement.querySelector('[data-translate="title"]').innerText = bookTranslations.title;
      bookElement.querySelector('[data-translate="author"]').innerText = bookTranslations.author;
      bookElement.querySelector('[data-translate="description"]').innerText = bookTranslations.description;
    } else {
      console.error('Translation not found for:', language, bookKey);
    }
  });
}

document.addEventListener('DOMContentLoaded', function() {
  const defaultLanguage = 'en';
  console.log('Default language:', defaultLanguage);
  applyTranslations(defaultLanguage);
});
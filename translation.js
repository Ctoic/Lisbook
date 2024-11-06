// translations.js

// Translation Script
const translations = {
  en: {
    books: {
      paleBlueDot: {
        title: "Pale Blue Dot",
        author: "By Carl Sagan",
        description: "Pale Blue Dot Sagan traces the spellbinding history of our launch into the cosmos and assesses the future that looms before us as we move out into our own solar system and on to distant galaxies beyond."
      },
      frankenstein: {
        title: "Frankenstein",
        author: "By Mary Shelley",
        description: "Frankenstein tells the story of Victor Frankenstein, a scientist who creates a monstrous creature, leading to tragic consequences."
      },
      sherlock: {
        title: "The Adventures of Sherlock Holmes",
        author: "By Sir Arthur Conan Doyle",
        description: " Adventures of Sherlock Holmes by Sir Arthur Conan Doyle is a collection of twelve detective mysteries featuring Sherlock Holmes and Dr. Watson."
      },
      paleBlueDot: {
        title: "Pale Blue Dot",
        author: "By Carl Sagan",
        description: "Pale Blue Dot Sagan traces the spellbinding history of our launch into the cosmos and assesses the future that looms before us as we move out into our own solar system and on to distant galaxies beyond."
      },
      sapiens: {
        title: "Sapiens: A Brief History of Humankind",
        author: "By Yuval Noah Harari",
        description: "Sapiens explores the history and evolution of humanity, from early Homo sapiens to modern society."
      }
    }
  },
  fr: {
    books: {
      paleBlueDot: {
        title: "Un point bleu pâle",
        author: "Par Carl Sagan",
        description: "Dans Un point bleu pâle, Sagan retrace l’histoire captivante de notre lancement dans le cosmos et évalue l’avenir qui se profile devant nous alors que nous explorons notre propre système solaire et nous dirigeons vers des galaxies lointaines au-delà."
      },
      frankenstein: {
        title: "Frankenstein",
        author: "Par Mary Shelley",
        description: "Frankenstein raconte l'histoire de Victor Frankenstein, un scientifique qui crée une créature monstrueuse, entraînant des conséquences tragiques."
      },
      sherlock: {
        "title": "Les Aventures de Sherlock Holmes",
        "author": "Par Sir Arthur Conan Doyle",
        "description": "Les Aventures de Sherlock Holmes de Sir Arthur Conan Doyle est une collection de douze mystères policiers mettant en scène Sherlock Holmes et le Dr Watson."
     },
      sapiens: {
        "title": "Sapiens: Une brève histoire de l’humanité",
        "author": "Par Yuval Noah Harari",
        "description": "Sapiens explore l’histoire et l’évolution de l’humanité, des premiers Homo sapiens à la société moderne."
      }

    }
  },
  es: {
    books: {
      paleBlueDot: {
        title: "Un punto azul pálido",
        author: "Por Carl Sagan",
        description: "Un punto azul pálido de Sagan traza la fascinante historia de nuestro lanzamiento al cosmos y evalúa el futuro que se cierne ante nosotros mientras nos aventuramos en nuestro propio sistema solar y avanzamos hacia galaxias distantes más allá."
      },
      frankenstein: {
        title: "Frankenstein",
        author: "Por Mary Shelley",
        description: "Frankenstein cuenta la historia de Victor Frankenstein, un científico que crea una criatura monstruosa, lo que lleva a consecuencias trágicas."
      },
      sherlock: {
        "title": "Las aventuras de Sherlock Holmes",
        "author": "Por Sir Arthur Conan Doyle",
        "description": "Las aventuras de Sherlock Holmes de Sir Arthur Conan Doyle es una colección de doce misterios detectivescos protagonizados por Sherlock Holmes y el Dr. Watson."
      },
      sapiens: {
        "title": "Sapiens. De animales a dioses: Breve historia de la humanidad",
        "author": "Por Yuval Noah Harari",
        "description": "Sapiens explora la historia y evolución de la humanidad, desde los primeros Homo sapiens hasta la sociedad moderna."
      }
    }
  },
  zh: {
    books: {
      paleBlueDot: {
        title: "暗淡蓝点",
        author: "卡尔·萨根",
        description: "在《暗淡蓝点》中，萨根追溯了人类进入宇宙的迷人历程，并评估了在我们在探索太阳系并迈向更遥远的星系时所要面临的未来。"
      },
      frankenstein: {
        title: "弗兰肯斯坦",
        author: "玛丽·雪莱",
        description: "《弗兰肯斯坦》讲述了科学家维克多·弗兰肯斯坦创造了一个怪物，导致悲剧性后果的故事。"
      },
      sherlock: {
        "title": "福尔摩斯探案全集",
        "author": "阿瑟·柯南·道尔爵士",
        "description": "《福尔摩斯探案全集》是阿瑟·柯南·道尔爵士创作的十二篇侦探故事合集，主角是夏洛克·福尔摩斯和华生医生。"
      },
      sapiens: {
        "title": "人类简史：从动物到上帝",
        "author": "尤瓦尔·赫拉利",
        "description": "《人类简史》探讨了人类从早期智人到现代社会的历史与演变。"
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
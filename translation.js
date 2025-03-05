// translations.js
const LANGUAGES_KEY = {
  EN: "en",
  FR: "fr",
  ES: "es",
  ZH: "zh"
};


const LANGUAGES_KEY_TO_DESCRIPTION = {
  en: "English",
  fr: "Français",
  es: "Español",
  zh: "简体中文"
};


// Translation Script
const translations = {
  en: {
    books: {
      paleBlueDot: {
        "title": "Pale Blue Dot",
        "author": "By Carl Sagan",
        "description": "Pale Blue Dot Sagan traces the spellbinding history of our launch into the cosmos and assesses the future that looms before us as we move out into our own solar system and on to distant galaxies beyond.",
        "tracks": {
          "t0": "Introduction",
          "t1": "Track 02: You are here",
          "t2": "Track 03: Aberrations of light",
          "t3": "Track 04: The great demotions",
          "t4": "Track 05: A universe not made for us",
          "t5": "Track 06: Is there intelligent life on earth?",
          "t6": "Track 07: The triumph of Voyager",
          "t7": "Track 08: Among the moons of Saturn",
          "t8": "Track 09: The first new planet"
        }
      },
      frankenstein: {
        "title": "Frankenstein",
        "author": "By Mary Shelley",
        "description": "Frankenstein tells the story of Victor Frankenstein, a scientist who creates a monstrous creature, leading to tragic consequences.",
        "tracks":{
          "t0": "Introduction",
          "t1": "Track 02",
          "t2": "Track 03",
          "t3": "Track 04",
          "t4": "Track 05",
          "t5": "Track 06",
          "t6": "Track 07",
          "t7": "Track 08",
          "t8": "Track 09",
          "t9": "Track 10",
          "t10": "Track 11",
          "t11": "Track 12",
          "t12": "Track 13",
          "t13": "Track 14"
        }
      },
      sherlock: {
        "title": "The Adventures of Sherlock Holmes",
        "author": "By Sir Arthur Conan Doyle",
        "description": " Adventures of Sherlock Holmes by Sir Arthur Conan Doyle is a collection of twelve detective mysteries featuring Sherlock Holmes and Dr. Watson.",
        "tracks":{
          "t0": "Introduction",
          "t1": "Track 02",
          "t2": "Track 03",
          "t3": "Track 04",
          "t4": "Track 05",
          "t5": "Track 06",
          "t6": "Track 07"
        }
      },
      sapiens: {
        "title": "Sapiens: A Brief History of Humankind",
        "author": "By Yuval Noah Harari",
        "description": "Sapiens explores the history and evolution of humanity, from early Homo sapiens to modern society.",
        "tracks":{
          "t0": "Introduction: God Delusion",
          "t1": "Track 02",
          "t2": "Track 03",
          "t3": "Track 04",
          "t4": "Track 05",
          "t5": "Track 06",
          "t6": "Track 07"
        }
      },
      godDelusion: {
        "title": "God Delusion",
        "author": "By Richard Dawkins",
        "description": "The God Delusion is a book by English biologist Richard Dawkins that argues against the existence of a supernatural creator.",
        "tracks":{
          "t0": "Introduction",
          "t1": "Track 02",
          "t2": "Track 03",
          "t3": "Track 04",
          "t4": "Track 05",
          "t5": "Track 06",
          "t6": "Track 07",
          "t7": "Track 08",
          "t8": "Track 09",
          "t9": "Track 10",
          "t10": "Track 11",
          "t11": "Track 12",
          "t12": "Track 13",
          "t13": "Track 14"
        }
      }
    }
  },
  fr: {
    books: {
      paleBlueDot: {
        "title": "Un point bleu pâle",
        "author": "Par Carl Sagan",
        "description": "Dans Un point bleu pâle, Sagan retrace l’histoire captivante de notre lancement dans le cosmos et évalue l’avenir qui se profile devant nous alors que nous explorons notre propre système solaire et nous dirigeons vers des galaxies lointaines au-delà.",
        "tracks": {
          "t0": "Introduction",
          "t1": "Piste 02: Vous êtes ici",
          "t2": "Piste 03: Aberrations de la lumière",
          "t3": "Piste 04: Les grandes humiliations",
          "t4": "Piste 05: Un univers qui n’est pas fait pour nous",
          "t5": "Piste 06: Y a-t-il une vie intelligente sur Terre?",
          "t6": "Piste 07: Le triomphe de Voyager",
          "t7": "Piste 08: Parmi les lunes de Saturne",
          "t8": "Piste 09: La première nouvelle planète"
        }
      },
      frankenstein: {
        "title": "Frankenstein",
        "author": "Par Mary Shelley",
        "description": "Frankenstein raconte l'histoire de Victor Frankenstein, un scientifique qui crée une créature monstrueuse, entraînant des conséquences tragiques.",
        "tracks": {
          "t0": "Introduction",
          "t1": "Piste 02",
          "t2": "Piste 03",
          "t3": "Piste 04",
          "t4": "Piste 05",
          "t5": "Piste 06",
          "t6": "Piste 07",
          "t7": "Piste 08",
          "t8": "Piste 09",
          "t9": "Piste 10",
          "t10": "Piste 11",
          "t11": "Piste 12",
          "t12": "Piste 13",
          "t13": "Piste 14"
        }
      },
      sherlock: {
        "title": "Les Aventures de Sherlock Holmes",
        "author": "Par Sir Arthur Conan Doyle",
        "description": "Les Aventures de Sherlock Holmes de Sir Arthur Conan Doyle est une collection de douze mystères policiers mettant en scène Sherlock Holmes et le Dr Watson.",
        "tracks": {
          "t0": "Introduction",
          "t1": "Piste 02",
          "t2": "Piste 03",
          "t3": "Piste 04",
          "t4": "Piste 05",
          "t5": "Piste 06",
          "t6": "Piste 07"
        }
     },
      sapiens: {
        "title": "Sapiens: Une brève histoire de l’humanité",
        "author": "Par Yuval Noah Harari",
        "description": "Sapiens explore l’histoire et l’évolution de l’humanité, des premiers Homo sapiens à la société moderne.",
        "tracks": {
          "t0": "Introduction : Pour en finir avec Dieu",
          "t1": "Piste 02",
          "t2": "Piste 03",
          "t3": "Piste 04",
          "t4": "Piste 05",
          "t5": "Piste 06",
          "t6": "Piste 07"
        }
      },
      godDelusion: {
        "title": "Pour en finir avec Dieu",
        "author": "Par Richard Dawkins",
        "description": "Pour en finir avec Dieu est un livre du biologiste anglais Richard Dawkins qui soutient l'inexistence d'un créateur surnaturel.",
        "tracks": {
          "t0": "Introduction",
          "t1": "Piste 02",
          "t2": "Piste 03",
          "t3": "Piste 04",
          "t4": "Piste 05",
          "t5": "Piste 06",
          "t6": "Piste 07",
          "t7": "Piste 08",
          "t8": "Piste 09",
          "t9": "Piste 10",
          "t10": "Piste 11",
          "t11": "Piste 12",
          "t12": "Piste 13",
          "t13": "Piste 14"
        }
      }
    }
  },
  es: {
    books: {
      paleBlueDot: {
        "title": "Un punto azul pálido",
        "author": "Por Carl Sagan",
        "description": "Un punto azul pálido de Sagan traza la fascinante historia de nuestro lanzamiento al cosmos y evalúa el futuro que se cierne ante nosotros mientras nos aventuramos en nuestro propio sistema solar y avanzamos hacia galaxias distantes más allá.",
        "tracks": {
          "t0": "Introducción",
          "t1": "Pista 02: Estás aquí",
          "t2": "Pista 03: Aberraciones de la luz",
          "t3": "Pista 04: Las grandes degradaciones",
          "t4": "Pista 05: Un universo no hecho para nosotros",
          "t5": "Pista 06: ¿Hay vida inteligente en la Tierra?",
          "t6": "Pista 07: El triunfo del Voyager",
          "t7": "Pista 08: Entre las lunas de Saturno",
          "t8": "Pista 09: El primer nuevo planeta"
        }
      },
      frankenstein: {
        "title": "Frankenstein",
        "author": "Por Mary Shelley",
        "description": "Frankenstein cuenta la historia de Victor Frankenstein, un científico que crea una criatura monstruosa, lo que lleva a consecuencias trágicas.",
        "tracks": {
          "t0": "Introducción",
          "t1": "Pista 02",
          "t2": "Pista 03",
          "t3": "Pista 04",
          "t4": "Pista 05",
          "t5": "Pista 06",
          "t6": "Pista 07",
          "t7": "Pista 08",
          "t8": "Pista 09",
          "t9": "Pista 10",
          "t10": "Pista 11",
          "t11": "Pista 12",
          "t12": "Pista 13",
          "t13": "Pista 14"
        }
      },
      sherlock: {
        "title": "Las aventuras de Sherlock Holmes",
        "author": "Por Sir Arthur Conan Doyle",
        "description": "Las aventuras de Sherlock Holmes de Sir Arthur Conan Doyle es una colección de doce misterios detectivescos protagonizados por Sherlock Holmes y el Dr. Watson.",
        "tracks": {
          "t0": "Introducción",
          "t1": "Pista 02",
          "t2": "Pista 03",
          "t3": "Pista 04",
          "t4": "Pista 05",
          "t5": "Pista 06",
          "t6": "Pista 07"
        }
      },
      sapiens: {
        "title": "Sapiens. De animales a dioses: Breve historia de la humanidad",
        "author": "Por Yuval Noah Harari",
        "description": "Sapiens explora la historia y evolución de la humanidad, desde los primeros Homo sapiens hasta la sociedad moderna.",
        "tracks": {
          "t0": "Introducción: El espejismo de Dios",
          "t1": "Pista 02",
          "t2": "Pista 03",
          "t3": "Pista 04",
          "t4": "Pista 05",
          "t5": "Pista 06",
          "t6": "Pista 07"
        }
      },
      godDelusion: {
        "title": "El espejismo de Dios",
        "author": "Por Richard Dawkins",
        "description": "El espejismo de Dios es un libro del biólogo inglés Richard Dawkins que argumenta en contra de la existencia de un creador sobrenatural.",
        "tracks": {
          "t0": "Introducción",
          "t1": "Pista 02",
          "t2": "Pista 03",
          "t3": "Pista 04",
          "t4": "Pista 05",
          "t5": "Pista 06",
          "t6": "Pista 07",
          "t7": "Pista 08",
          "t8": "Pista 09",
          "t9": "Pista 10",
          "t10": "Pista 11",
          "t11": "Pista 12",
          "t12": "Pista 13",
          "t13": "Pista 14"
        }
      }
    }
  },
  zh: {
    books: {
      paleBlueDot: {
        "title": "暗淡蓝点",
        "author": "卡尔·萨根",
        "description": "在《暗淡蓝点》中，萨根追溯了人类进入宇宙的迷人历程，并评估了在我们在探索太阳系并迈向更遥远的星系时所要面临的未来。",
        "tracks": {
          "t0": "前言",
          "t1": "曲目 01 ：你在这里",
          "t2": "曲目 02 ：光的偏差",
          "t3": "曲目 03 ：伟大的贬低",
          "t4": "曲目 04 ：一个不属于我们的宇宙",
          "t5": "曲目 05 ：地球上有智能生命吗？",
          "t6": "曲目 06 ：旅行者号的胜利",
          "t7": "曲目 07 ：在土星的卫星之中",
          "t8": "曲目 08 ：曲目一颗新发现的行星"
        }
      },
      frankenstein: {
        "title": "弗兰肯斯坦",
        "author": "玛丽·雪莱",
        "description": "《弗兰肯斯坦》讲述了科学家维克多·弗兰肯斯坦创造了一个怪物，导致悲剧性后果的故事。",
        "tracks": {
          "t0": "前言",
          "t1": "曲目 02",
          "t2": "曲目 03 ",
          "t3": "曲目 04 ",
          "t4": "曲目 05 ",
          "t5": "曲目 06 ",
          "t6": "曲目 07 ",
          "t7": "曲目 08 ",
          "t8": "曲目 09 ",
          "t9": "曲目 10 ",
          "t10": "曲目 11 ",
          "t11": "曲目 12 ",
          "t12": "曲目 13 ",
          "t13": "曲目 14 "
        }
      },
      sherlock: {
        "title": "福尔摩斯探案全集",
        "author": "阿瑟·柯南·道尔爵士",
        "description": "《福尔摩斯探案全集》是阿瑟·柯南·道尔爵士创作的十二篇侦探故事合集，主角是夏洛克·福尔摩斯和华生医生。",
        "tracks": {
          "t0": "前言",
          "t1": "曲目 02",
          "t2": "曲目 03 ",
          "t3": "曲目 04 ",
          "t4": "曲目 05 ",
          "t5": "曲目 06 ",
          "t6": "曲目 07 "
        }
      },
      sapiens: {
        "title": "人类简史：从动物到上帝",
        "author": "尤瓦尔·赫拉利",
        "description": "《人类简史》探讨了人类从早期智人到现代社会的历史与演变。",
        "tracks": {
          "t0": "前言：上帝的幻觉",
          "t1": "曲目 02",
          "t2": "曲目 03 ",
          "t3": "曲目 04 ",
          "t4": "曲目 05 ",
          "t5": "曲目 06 ",
          "t6": "曲目 07 "
        }
      },
      godDelusion: {
        "title": "上帝错觉",
        "author": "作者：理查德·道金斯",
        "description": "《上帝错觉》为英国生物学家理查德·道金斯所著，道金斯在书中主张反对超自然创造者的存在。",
        "tracks": {
          "t0": "前言",
          "t1": "曲目 02",
          "t2": "曲目 03 ",
          "t3": "曲目 04 ",
          "t4": "曲目 05 ",
          "t5": "曲目 06 ",
          "t6": "曲目 07 ",
          "t7": "曲目 08 ",
          "t8": "曲目 09 ",
          "t9": "曲目 10 ",
          "t10": "曲目 11 ",
          "t11": "曲目 12 ",
          "t12": "曲目 13 ",
          "t13": "曲目 14 "
        }
      }
    }
  }
};

console.log('Translations object:', translations);

function changeLanguage() {
  const selectedLanguage = document.getElementById('language').getAttribute('value');
  console.log('Selected language:', selectedLanguage);
  applyTranslations(selectedLanguage);
}

function applyTranslations(language) {
  const bookElements = document.querySelectorAll('[data-book]');
  bookElements.forEach(bookElement => {
    const bookKey = bookElement.getAttribute('data-book');
    if (translations[language] && translations[language].books && translations[language].books[bookKey]) {
      const bookTranslations = translations[language].books[bookKey];

      const titleElement = bookElement.querySelector('[data-translate="title"]');
      if (titleElement) {
        titleElement.innerText = bookTranslations.title;
      }

      const authorElement = bookElement.querySelector('[data-translate="author"]');
      if (authorElement) {
        authorElement.innerText = bookTranslations.author;
      }

      const descriptionElement = bookElement.querySelector('[data-translate="description"]');
      if (descriptionElement) {
        descriptionElement.innerText = bookTranslations.description;
      }

      // Apply track translations in playlist
      const trackElements = bookElement.querySelectorAll('[data-translate]');
      trackElements.forEach(trackElement => {
        const trackKey = trackElement.getAttribute('data-translate');
        if (bookTranslations.tracks && bookTranslations.tracks[trackKey]) {
          trackElement.innerText = bookTranslations.tracks[trackKey];
        }
      });
    } else {
      console.error('Translation not found for:', language, bookKey);
    }
  });
}

document.addEventListener('DOMContentLoaded', function() {
  const defaultLanguage = 'en';
  applyTranslations(defaultLanguage);
});
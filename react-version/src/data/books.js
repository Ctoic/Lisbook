export const books = [
  {
    id: 'paleBlueDot',
    title: 'Pale Blue Dot',
    author: 'Carl Sagan',
    coverImage: '/Images/cs.jpg',
    description: 'A vision of the human future in space',
    genre: 'Science',
    duration: '13h 18m',
    rating: 4.6,
    audioFiles: [
      '/audio/PaleBlueDot/Introduction.mp3',
      '/audio/PaleBlueDot/chap-1_you_are_here.mp3',
      '/audio/PaleBlueDot/Chap-2_aberrations of light.mp3',
      '/audio/PaleBlueDot/chap-3_the great demotions.mp3',
      '/audio/PaleBlueDot/chap-4_a universe not made for us.mp3',
      '/audio/PaleBlueDot/chap-5_is there intelligent life on earth.mp3',
      '/audio/PaleBlueDot/chap-6_the triumph of voyager.mp3',
      '/audio/PaleBlueDot/chap-7_among the moons of saturn.mp3',
      '/audio/PaleBlueDot/chap-8_the first new planet.mp3'
    ],
    trackTitles: {
      t0: 'Introduction',
      t1: 'You are here',
      t2: 'Aberrations of light',
      t3: 'The great demotions',
      t4: 'A universe not made for us',
      t5: 'Is there intelligent life on earth?',
      t6: 'The triumph of Voyager',
      t7: 'Among the moons of Saturn',
      t8: 'The first new planet'
    }
  },
  {
    id: 'frankenstein',
    title: 'Frankenstein',
    author: 'Mary Shelley',
    coverImage: '/Images/Frankestine.jpg',
    description: 'The story of Victor Frankenstein and his monstrous creation',
    genre: 'Classic Horror',
    duration: '8h 35m',
    rating: 4.2,
    audioFiles: [
      '/audio/FS/01.mp3',
      '/audio/FS/02.mp3',
      '/audio/FS/03.mp3',
      '/audio/FS/04.mp3',
      '/audio/FS/05.mp3',
      '/audio/FS/06.mp3',
      '/audio/FS/07.mp3',
      '/audio/FS/08.mp3',
      '/audio/FS/09.mp3',
    ],
    trackTitles: {
      t1: 'Chapter 1',
      t2: 'Chapter 2',
      t3: 'Chapter 3',
      t4: 'Chapter 4',
      t5: 'Chapter 5',
      t6: 'Chapter 6',
      t7: 'Chapter 7',
      t8: 'Chapter 8',
      t9: 'Chapter 9'
    }
  },
  {
    id: 'sherlock',
    title: 'The Adventures of Sherlock Holmes',
    author: 'Sir Arthur Conan Doyle',
    coverImage: '/Images/Adventures_Sherlock_Holmes.jpg',
    description: 'A collection of twelve detective mysteries featuring Sherlock Holmes',
    genre: 'Mystery',
    duration: '12h 45m',
    rating: 4.7,
    audioFiles: [
      '/audio/FS/01.mp3',
      '/audio/FS/02.mp3',
      '/audio/FS/03.mp3',
      '/audio/FS/04.mp3',
      '/audio/FS/05.mp3',
      '/audio/FS/06.mp3',
      '/audio/FS/07.mp3'
    ],
    trackTitles: {
      t0: 'A Scandal in Bohemia',
      t1: 'The Red-Headed League',
      t2: 'A Case of Identity',
      t3: 'The Boscombe Valley Mystery',
      t4: 'The Five Orange Pips',
      t5: 'The Man with the Twisted Lip',
      t6: 'The Adventure of the Blue Carbuncle'
    }
  },
  {
    id: 'sapiens',
    title: 'Sapiens: A Brief History of Humankind',
    author: 'Yuval Noah Harari',
    coverImage: '/Images/Sapiens.jpg',
    description: 'An exploration of the history and evolution of humanity',
    genre: 'History',
    duration: '15h 17m',
    rating: 4.4,
    audioFiles: [
      '/audio/sapiens/01.mp3',
      '/audio/sapiens/02.mp3',
      '/audio/sapiens/03.mp3',
      '/audio/sapiens/04.mp3'
    ],
    trackTitles: {
      t0: 'The Cognitive Revolution',
      t1: 'The Agricultural Revolution',
      t2: 'The Unification of Humankind',
      t3: 'The Scientific Revolution'
    }
  },
  {
    id: 'godDelusion',
    title: 'The God Delusion',
    author: 'Richard Dawkins',
    coverImage: '/Images/god_delusion.jpg',
    description: 'A critique of religion and argument for atheism',
    genre: 'Philosophy',
    duration: '18h 12m',
    rating: 4.1,
    audioFiles: [
      '/audio/GD/part1.mp3',
      '/audio/GD/part2.mp3',
      '/audio/GD/part3.mp3',
      '/audio/GD/part4.mp3',
      '/audio/GD/part5.mp3',
      '/audio/GD/part6.mp3',
      '/audio/GD/part7.mp3',
      '/audio/GD/part8.mp3',
      '/audio/GD/part9.mp3',
      '/audio/GD/part10.mp3',
      '/audio/GD/part11.mp3',
      '/audio/GD/part12.mp3',
      '/audio/GD/part13.mp3',
      '/audio/GD/part14.mp3',
    ],
    trackTitles: {
  t0: 'A deeply religious non-believer',
  t1: 'The God Hypothesis',
  t2: 'Arguments for God\'s existence',
  t3: 'Why there almost certainly is no God',
  t4: 'The Roots of Religion',
  t5: 'The Roots of Morality: Why are we good?',
  t6: 'The Roots of Morality: Is the Bible a good guide?',
  t7: 'The "Good" Book and the changing moral Zeitgeist',
  t8: 'What’s wrong with religion? Why be so hostile?',
  t9: 'Childhood, abuse, and the labeling of children',
  t10: 'Consciousness-raising: Breaking the spell of religion',
  t11: 'The Great Prayer Experiment',
  t12: 'Alternative explanations and scientific wonder',
  t13: 'Conclusion: The God Delusion'
}

  }
]

export const getBookById = (id) => {
  return books.find(book => book.id === id)
}

export const getBooksByGenre = (genre) => {
  return books.filter(book => book.genre === genre)
}

export const searchBooks = (query) => {
  const lowercaseQuery = query.toLowerCase()
  return books.filter(book => 
    book.title.toLowerCase().includes(lowercaseQuery) ||
    book.author.toLowerCase().includes(lowercaseQuery) ||
    book.genre.toLowerCase().includes(lowercaseQuery)
  )
}
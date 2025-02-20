
export const words = {
  en: [
    "APPLE", "BANANA", "CHERRY", "DRAGON", "ELEPHANT",
    "FLOWER", "GARDEN", "HARBOR", "ISLAND", "JUNGLE",
    "KIWI", "LEMON", "MANGO", "NATURE", "ORANGE",
    "PEARL", "QUEEN", "RIVER", "SUMMER", "TIGER"
  ],
  de: [
    "APFEL", "BANANE", "KIRSCHE", "DRACHE", "ELEFANT",
    "BLUME", "GARTEN", "HAFEN", "INSEL", "DSCHUNGEL",
    "KIWI", "ZITRONE", "MANGO", "NATUR", "ORANGE",
    "PERLE", "KÖNIGIN", "FLUSS", "SOMMER", "TIGER"
  ]
};

export const translations = {
  en: {
    title: "Hangman",
    subtitle: "Guess the word to win!",
    correct: "Correct guess!",
    incorrect: "Incorrect guess!",
    gameOver: "Game Over! The word was:",
    congratulations: "Congratulations! You won!",
    playAgain: "Play Again"
  },
  de: {
    title: "Galgenmännchen",
    subtitle: "Rate das Wort um zu gewinnen!",
    correct: "Richtig geraten!",
    incorrect: "Falsch geraten!",
    gameOver: "Spiel vorbei! Das Wort war:",
    congratulations: "Glückwunsch! Du hast gewonnen!",
    playAgain: "Erneut spielen"
  }
};

export const getRandomWord = (isGerman: boolean) => {
  const wordList = isGerman ? words.de : words.en;
  return wordList[Math.floor(Math.random() * wordList.length)];
};

export const generateWordDisplay = (word: string, guessedLetters: Set<string>) => {
  return word
    .split("")
    .map(letter => guessedLetters.has(letter) ? letter : "_")
    .join(" ");
};

export const MAX_MISTAKES = 6;

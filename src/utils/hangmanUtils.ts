
export const words = [
  "APPLE", "BANANA", "CHERRY", "DRAGON", "ELEPHANT",
  "FLOWER", "GARDEN", "HARBOR", "ISLAND", "JUNGLE",
  "KIWI", "LEMON", "MANGO", "NATURE", "ORANGE",
  "PEARL", "QUEEN", "RIVER", "SUMMER", "TIGER"
];

export const getRandomWord = () => {
  return words[Math.floor(Math.random() * words.length)];
};

export const generateWordDisplay = (word: string, guessedLetters: Set<string>) => {
  return word
    .split("")
    .map(letter => guessedLetters.has(letter) ? letter : "_")
    .join(" ");
};

export const MAX_MISTAKES = 6;


import { useState, useEffect, useCallback } from "react";
import { motion } from "framer-motion";
import { toast } from "sonner";
import HangmanDrawing from "@/components/HangmanDrawing";
import Keyboard from "@/components/Keyboard";
import { getRandomWord, generateWordDisplay, MAX_MISTAKES } from "@/utils/hangmanUtils";

const Index = () => {
  const [wordToGuess, setWordToGuess] = useState(getRandomWord);
  const [guessedLetters, setGuessedLetters] = useState<Set<string>>(new Set());

  const incorrectLetters = [...guessedLetters].filter(
    (letter) => !wordToGuess.includes(letter)
  );
  const correctLetters = [...guessedLetters].filter((letter) =>
    wordToGuess.includes(letter)
  );
  const isLoser = incorrectLetters.length >= MAX_MISTAKES;
  const isWinner = wordToGuess
    .split("")
    .every((letter) => guessedLetters.has(letter));

  const addGuessedLetter = useCallback(
    (letter: string) => {
      if (guessedLetters.has(letter) || isLoser || isWinner) return;

      setGuessedLetters((currentLetters) => {
        const newLetters = new Set(currentLetters);
        newLetters.add(letter);
        return newLetters;
      });

      if (!wordToGuess.includes(letter)) {
        toast.error("Incorrect guess!");
      } else {
        toast.success("Correct guess!");
      }
    },
    [guessedLetters, isWinner, isLoser, wordToGuess]
  );

  useEffect(() => {
    if (isWinner) {
      toast.success("Congratulations! You won!");
    } else if (isLoser) {
      toast.error("Game Over! The word was: " + wordToGuess);
    }
  }, [isWinner, isLoser, wordToGuess]);

  const resetGame = () => {
    setWordToGuess(getRandomWord());
    setGuessedLetters(new Set());
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-gray-50 to-gray-100 p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-md w-full mx-auto"
      >
        <div className="text-center mb-8">
          <motion.h1
            className="text-3xl font-bold mb-2"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            Hangman
          </motion.h1>
          <motion.p
            className="text-gray-600"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            Guess the word to win!
          </motion.p>
        </div>

        <div className="flex flex-col items-center bg-white rounded-2xl shadow-xl p-8">
          <HangmanDrawing mistakes={incorrectLetters.length} />

          <motion.div
            className="text-4xl font-mono tracking-wider mb-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            {generateWordDisplay(wordToGuess, guessedLetters)}
          </motion.div>

          <Keyboard
            disabled={isWinner || isLoser}
            activeLetters={new Set(correctLetters)}
            inactiveLetters={new Set(incorrectLetters)}
            addGuessedLetter={addGuessedLetter}
          />

          {(isWinner || isLoser) && (
            <motion.button
              className="mt-8 px-6 py-2 bg-black text-white rounded-lg hover:bg-gray-800 transition-colors"
              onClick={resetGame}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Play Again
            </motion.button>
          )}
        </div>
      </motion.div>
    </div>
  );
};

export default Index;

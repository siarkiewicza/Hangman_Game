
import { useState, useEffect, useCallback } from "react";
import { motion } from "framer-motion";
import { toast } from "sonner";
import HangmanDrawing from "@/components/HangmanDrawing";
import Keyboard from "@/components/Keyboard";
import GameSettings from "@/components/GameSettings";
import { getRandomWord, generateWordDisplay, MAX_MISTAKES, translations } from "@/utils/hangmanUtils";

const Index = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isGerman, setIsGerman] = useState(false);
  const [wordToGuess, setWordToGuess] = useState(() => getRandomWord(isGerman));
  const [guessedLetters, setGuessedLetters] = useState<Set<string>>(new Set());

  const t = translations[isGerman ? "de" : "en"];

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [isDarkMode]);

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
        toast.error(t.incorrect);
      } else {
        toast.success(t.correct);
      }
    },
    [guessedLetters, isWinner, isLoser, wordToGuess, t]
  );

  useEffect(() => {
    if (isWinner) {
      toast.success(t.congratulations);
    } else if (isLoser) {
      toast.error(`${t.gameOver} ${wordToGuess}`);
    }
  }, [isWinner, isLoser, wordToGuess, t]);

  const resetGame = () => {
    setWordToGuess(getRandomWord(isGerman));
    setGuessedLetters(new Set());
  };

  useEffect(() => {
    resetGame();
  }, [isGerman]);

  return (
    <div className={`min-h-screen flex flex-col items-center justify-center bg-gradient-to-b ${
      isDarkMode ? "from-gray-900 to-gray-800 text-white" : "from-gray-50 to-gray-100"
    } p-4`}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-xl w-full mx-auto"
      >
        <div className="text-center mb-10">
          <motion.h1
            className="text-4xl font-bold mb-3"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            {t.title}
          </motion.h1>
          <motion.p
            className={`text-lg ${isDarkMode ? "text-gray-300" : "text-gray-600"}`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            {t.subtitle}
          </motion.p>
        </div>

        <GameSettings
          isDarkMode={isDarkMode}
          setIsDarkMode={setIsDarkMode}
          isGerman={isGerman}
          setIsGerman={setIsGerman}
        />

        <div className={`flex flex-col items-center ${
          isDarkMode ? "bg-gray-800 text-white" : "bg-white"
        } rounded-2xl shadow-xl p-10`}>
          <HangmanDrawing mistakes={incorrectLetters.length} />

          <motion.div
            className="text-5xl font-mono tracking-wider mb-10"
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
            isGerman={isGerman}
          />

          {(isWinner || isLoser) && (
            <motion.button
              className={`mt-10 px-8 py-3 text-lg ${
                isDarkMode
                  ? "bg-white text-gray-900 hover:bg-gray-200"
                  : "bg-black text-white hover:bg-gray-800"
              } rounded-lg transition-colors`}
              onClick={resetGame}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {t.playAgain}
            </motion.button>
          )}
        </div>
      </motion.div>
    </div>
  );
};

export default Index;

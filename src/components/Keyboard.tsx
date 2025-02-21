
import { motion } from "framer-motion";

const KEYS = {
  en: [
    ["Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P"],
    ["A", "S", "D", "F", "G", "H", "J", "K", "L"],
    ["Z", "X", "C", "V", "B", "N", "M"],
  ],
  de: [
    ["Q", "W", "E", "R", "T", "Z", "U", "I", "O", "P", "Ü"],
    ["A", "S", "D", "F", "G", "H", "J", "K", "L", "Ö", "Ä"],
    ["Y", "X", "C", "V", "B", "N", "M", "ß"],
  ],
};

interface Props {
  disabled: boolean;
  activeLetters: Set<string>;
  inactiveLetters: Set<string>;
  addGuessedLetter: (letter: string) => void;
  isGerman?: boolean;
}

const Keyboard = ({
  disabled,
  activeLetters,
  inactiveLetters,
  addGuessedLetter,
  isGerman = false,
}: Props) => {
  const currentKeys = isGerman ? KEYS.de : KEYS.en;

  return (
    <div className="grid gap-2.5">
      {currentKeys.map((row, i) => (
        <div key={i} className="flex justify-center gap-1.5">
          {row.map((key) => {
            const isActive = activeLetters.has(key);
            const isInactive = inactiveLetters.has(key);
            return (
              <motion.button
                key={key}
                className={`
                  w-10 h-12.5 rounded-lg text-base font-medium transition-all
                  ${
                    isActive
                      ? "bg-emerald-500 text-white"
                      : isInactive
                      ? "bg-gray-200 dark:bg-purple-900/50 text-gray-400 dark:text-purple-200 cursor-not-allowed"
                      : "bg-white dark:bg-gray-600 text-gray-900 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-500 active:bg-gray-200 dark:active:bg-gray-400"
                  }
                  shadow-sm hover:shadow-md
                `}
                disabled={isActive || isInactive || disabled}
                onClick={() => addGuessedLetter(key)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {key}
              </motion.button>
            );
          })}
        </div>
      ))}
    </div>
  );
};

export default Keyboard;


import { motion } from "framer-motion";

const KEYS = [
  ["Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P"],
  ["A", "S", "D", "F", "G", "H", "J", "K", "L"],
  ["Z", "X", "C", "V", "B", "N", "M"],
];

interface Props {
  disabled: boolean;
  activeLetters: Set<string>;
  inactiveLetters: Set<string>;
  addGuessedLetter: (letter: string) => void;
}

const Keyboard = ({
  disabled,
  activeLetters,
  inactiveLetters,
  addGuessedLetter,
}: Props) => {
  return (
    <div className="grid gap-2">
      {KEYS.map((row, i) => (
        <div key={i} className="flex justify-center gap-1">
          {row.map((key) => {
            const isActive = activeLetters.has(key);
            const isInactive = inactiveLetters.has(key);
            return (
              <motion.button
                key={key}
                className={`
                  w-8 h-10 rounded-lg text-sm font-medium transition-all
                  ${
                    isActive
                      ? "bg-emerald-500 text-white"
                      : isInactive
                      ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                      : "bg-white hover:bg-gray-100 active:bg-gray-200"
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

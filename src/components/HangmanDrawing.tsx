
import { motion } from "framer-motion";

const HANGMAN_PARTS = [
  // Base
  "M12.5 175 L175 175",
  // Vertical pole
  "M37.5 175 L37.5 12.5",
  // Top beam
  "M37.5 12.5 L125 12.5",
  // Rope
  "M125 12.5 L125 37.5",
  // Head (complete circle)
  "M137.5 50 A12.5 12.5 0 1 1 112.5 50 A12.5 12.5 0 1 1 137.5 50",
  // Body
  "M125 62.5 L125 112.5",
  // Left arm
  "M125 75 L87.5 100",
  // Right arm
  "M125 75 L162.5 100",
  // Left leg
  "M125 112.5 L87.5 150",
  // Right leg
  "M125 112.5 L162.5 150",
];

interface Props {
  mistakes: number;
}

const HangmanDrawing = ({ mistakes }: Props) => {
  const partsToShow = 4 + mistakes;
  
  return (
    <div className="w-[187.5px] h-[187.5px] my-10">
      <svg width="187.5" height="187.5">
        {HANGMAN_PARTS.slice(0, partsToShow).map((d, index) => (
          <motion.path
            key={index}
            d={d}
            stroke="currentColor"
            strokeWidth="2.5"
            fill="none"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
          />
        ))}
      </svg>
    </div>
  );
};

export default HangmanDrawing;

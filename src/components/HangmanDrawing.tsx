
import { motion } from "framer-motion";

const HANGMAN_PARTS = [
  // Base
  "M10 140 L140 140",
  // Vertical pole
  "M30 140 L30 10",
  // Top beam
  "M30 10 L100 10",
  // Rope
  "M100 10 L100 30",
  // Head
  "M100 30 A10 10 0 1 1 100 50",
  // Body
  "M100 50 L100 90",
  // Left arm
  "M100 60 L70 80",
  // Right arm
  "M100 60 L130 80",
  // Left leg
  "M100 90 L70 120",
  // Right leg
  "M100 90 L130 120",
];

interface Props {
  mistakes: number;
}

const HangmanDrawing = ({ mistakes }: Props) => {
  return (
    <div className="w-[150px] h-[150px] my-8">
      <svg width="150" height="150">
        {HANGMAN_PARTS.slice(0, mistakes + 1).map((d, index) => (
          <motion.path
            key={index}
            d={d}
            stroke="currentColor"
            strokeWidth="2"
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

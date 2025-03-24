import { FC } from "react";
import { motion } from "framer-motion";
import "./scrollArrow.scss";

interface ScrollArrowProps {
  currentSection: number;
  totalSections: number;
  onScroll: (index: number) => void;
}

const ScrollArrow: FC<ScrollArrowProps> = ({
  currentSection,
  totalSections,
  onScroll,
}) => {
  const isLastSection = currentSection === totalSections - 1;

  return (
    <motion.div
      className="scroll-arrow"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 1 }}
      onClick={() => onScroll(currentSection + 1)}
    >
      <motion.div
        className="arrow"
        animate={{
          y: [0, 10, 0],
        }}
        transition={{
          duration: 1.5,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      >
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M12 5V19M12 19L5 12M12 19L19 12"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </motion.div>
    </motion.div>
  );
};

export default ScrollArrow; 
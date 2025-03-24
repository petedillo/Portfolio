import { motion } from "framer-motion";
import "./scrollArrow.scss";

interface ScrollArrowProps {
  currentSection: number;
  totalSections: number;
  onScroll: () => void;
}

const ScrollArrow = ({ currentSection, totalSections, onScroll }: ScrollArrowProps) => {
  const isLastSection = currentSection === totalSections - 1;

  return (
    <motion.div
      className="scroll-arrow"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.95 }}
      onClick={onScroll}
      style={{
        transform: isLastSection ? "rotate(180deg)" : "none",
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
  );
};

export default ScrollArrow; 
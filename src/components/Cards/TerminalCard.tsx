import { GoArrowLeft } from "react-icons/go";
import React, { useState } from 'react';
import { motion, Variants } from 'framer-motion';
import "./terminalCard.scss";

interface TerminalCardItem {
    title: string;
    subtitle: string;
    duration: string;
    items: string[];
    honors?: {
        label: string;
        value: string;
    };
}

interface TerminalCardProps {
    items: TerminalCardItem[];
    type: 'education' | 'experience';
}

const TerminalCard: React.FC<TerminalCardProps> = ({ items, type }) => {
    const [currentIndex, setCurrentIndex] = useState(0);

    const handleNextItem = () => {
        const newIndex = (currentIndex + 1) % items.length;
        setCurrentIndex(newIndex);
    };

    const currentItem = items[currentIndex];

    const arrowVariants: Variants = {
        initial: { x: 0 },
        hover: {
            x: [0, -5, 0],
            transition: {
                duration: 0.5,
                repeat: Infinity,
                repeatType: "reverse" as const,
                ease: "easeInOut"
            }
        },
        tap: {
            scale: 0.9,
            transition: { duration: 0.1 }
        }
    };

    return (
        <div className={`${type}-card`}>
            <div className="card">
                <div className="terminal-prompt">
                    <h2>{currentItem.title}</h2>
                    <div className="arrow-container">
                        <motion.div
                            variants={arrowVariants}
                            initial="initial"
                            whileHover="hover"
                            whileTap="tap"
                            onClick={handleNextItem}
                        >
                            <GoArrowLeft className="arrow" />
                        </motion.div>
                    </div>
                </div>
                <h3>{currentItem.subtitle}</h3>
                <p className="duration">{currentItem.duration}</p>
                {currentItem.honors && (
                    <div className="honors">
                        <span className="honors-label">{currentItem.honors.label}:</span>
                        <span className="honors-value">{currentItem.honors.value}</span>
                    </div>
                )}
                <ul>
                    {currentItem.items.map((item, index) => (
                        <li key={index}>{item}</li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default TerminalCard; 
import { GoArrowLeft } from "react-icons/go";
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import "./education.scss";

interface Education {
    institution: string;
    degree: string;
    duration: string;
    details: string[];
    honors?: string;
}

interface EducationCardProps {
    education: Education[];
}

const EducationCard: React.FC<EducationCardProps> = ({ education }) => {
    const [currentEducationIndex, setCurrentEducationIndex] = useState(0);
    const [isHovered, setIsHovered] = useState(false);

    const handleNextEducation = () => {
        setCurrentEducationIndex((prev) => (prev + 1) % education.length);
    };

    const currentEducation = education[currentEducationIndex];

    const cardVariants = {
        initial: { opacity: 0, x: 20 },
        animate: { 
            opacity: 1, 
            x: 0,
            transition: { 
                type: "spring",
                stiffness: 100,
                damping: 10
            }
        },
        exit: { opacity: 0, x: -20 },
        shake: {
            x: [0, -5, 5, -5, 5, 0],
            transition: { duration: 0.5 }
        }
    };

    const arrowVariants = {
        initial: { opacity: 0.5, x: 0 },
        hover: { 
            opacity: 1, 
            x: -5,
            transition: { 
                type: "spring",
                stiffness: 300,
                damping: 10
            }
        }
    };

    return (
        <div className="education-card">
            <AnimatePresence mode="wait">
                {currentEducation && (
                    <motion.article
                        key={currentEducationIndex}
                        className="card"
                        variants={cardVariants}
                        initial="initial"
                        animate="animate"
                        exit="exit"
                        whileHover="shake"
                    >
                        <div className="terminal-prompt">
                            <h2>{currentEducation.institution}</h2>
                            <motion.div
                                className="arrow-container"
                                onHoverStart={() => setIsHovered(true)}
                                onHoverEnd={() => setIsHovered(false)}
                            >
                                <motion.div
                                    variants={arrowVariants}
                                    initial="initial"
                                    animate={isHovered ? "hover" : "initial"}
                                >
                                    <GoArrowLeft 
                                        onClick={handleNextEducation}
                                        className="arrow"
                                    />
                                </motion.div>
                            </motion.div>
                        </div>
                        <h3>{currentEducation.degree}</h3>
                        <p className="duration">{currentEducation.duration}</p>
                        {currentEducation.honors && (
                            <div className="honors">
                                <span className="honors-label">Honors:</span>
                                <span className="honors-value">{currentEducation.honors}</span>
                            </div>
                        )}
                        <ul>
                            {currentEducation.details.map((detail, index) => (
                                <motion.li
                                    key={index}
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: index * 0.1 }}
                                >
                                    {detail}
                                </motion.li>
                            ))}
                        </ul>
                    </motion.article>
                )}
            </AnimatePresence>
        </div>
    );
};

export default EducationCard; 
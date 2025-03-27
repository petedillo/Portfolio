import React, { useState, useEffect } from 'react';
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa';
import { ReactTyped } from 'react-typed';
import { resumeData } from '../../constants/resume/resumeData';
import { Education, Experience } from '../../constants/resume/resumeDataTypes';
import "./terminalCard.scss";

type TerminalCardProps = {
    type: 'education' | 'experience' | 'summary';
    title: string;
};

const TerminalCard: React.FC<TerminalCardProps> = ({ type, title }) => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isTypingComplete, setIsTypingComplete] = useState(false);
    const [showArrows, setShowArrows] = useState(false);

    useEffect(() => {
        if (type === 'summary') {
            setIsTypingComplete(true);
            setShowArrows(false);
        } else {
            setShowArrows(true);
        }
    }, [type]);

    const handleTypingComplete = () => {
        setIsTypingComplete(true);
    };

    const handlePrevious = () => {
        if (type === 'education') {
            setCurrentIndex(prev => (prev > 0 ? prev - 1 : resumeData.education.length - 1));
        } else if (type === 'experience') {
            setCurrentIndex(prev => (prev > 0 ? prev - 1 : resumeData.experience.length - 1));
        }
    };

    const handleNext = () => {
        if (type === 'education') {
            setCurrentIndex(prev => (prev < resumeData.education.length - 1 ? prev + 1 : 0));
        } else if (type === 'experience') {
            setCurrentIndex(prev => (prev < resumeData.experience.length - 1 ? prev + 1 : 0));
        }
    };

    const getCurrentContent = (): Education | Experience | null => {
        if (type === 'education' && Array.isArray(resumeData.education)) {
            return resumeData.education[currentIndex];
        } else if (type === 'experience' && Array.isArray(resumeData.experience)) {
            return resumeData.experience[currentIndex];
        }
        return null;
    };

    const renderContent = () => {
        if (type === 'summary') {
            return (
                <div className="summary-content">
                    <ReactTyped
                        strings={[resumeData.professionalSummary]}
                        typeSpeed={20}
                        backSpeed={20}
                        onComplete={handleTypingComplete}
                        showCursor={!isTypingComplete}
                    />
                </div>
            );
        }

        const currentData = getCurrentContent();
        if (!currentData) return null;

        const isEducation = 'institution' in currentData;
        const title = isEducation ? currentData.institution : currentData.company;
        const details = isEducation ? currentData.details : currentData.responsibilities;

        return (
            <div className="card-content">
                <h3>{title}</h3>
                <div className="duration">{currentData.duration}</div>
                {isEducation && currentData.honors && (
                    <div className="honors">
                        <span className="honors-label">Honors:</span>
                        <span className="honors-value">{currentData.honors}</span>
                    </div>
                )}
                <ul>
                    {details.map((item: string, index: number) => (
                        <li key={index}>{item}</li>
                    ))}
                </ul>
            </div>
        );
    };

    return (
        <div className={`${type}-card`}>
            <div className="card">
                <div className="terminal-prompt">
                    <h2>{title}</h2>
                    {showArrows && (
                        <div className="arrow-container">
                            <button onClick={handlePrevious} className="arrow-button">
                                <FaArrowLeft />
                            </button>
                            <span className="arrow-text">
                                {currentIndex + 1} / {type === 'education' ? resumeData.education.length : resumeData.experience.length}
                            </span>
                            <button onClick={handleNext} className="arrow-button">
                                <FaArrowRight />
                            </button>
                        </div>
                    )}
                </div>
                {renderContent()}
            </div>
        </div>
    );
};

export default TerminalCard; 
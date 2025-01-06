import {GoArrowLeft} from "react-icons/go";
import React, {useState} from 'react';

interface Experience {
    company: string;
    role: string;
    duration: string;
    responsibilities: string[];
}

interface ExperienceCardProps {
    experiences: Experience[];
}

const ExperienceCard: React.FC<ExperienceCardProps> = ({experiences}) => {
    const [currentExperienceIndex, setCurrentExperienceIndex] = useState(0);

    const handleNextExperience = () => {
        const newIndex = (currentExperienceIndex + 1) % experiences.length;
        setCurrentExperienceIndex(newIndex);
    };

    const currentExperience = experiences[currentExperienceIndex];

    return (
        <div className="experience">
            {currentExperience && (
                <article className="card">
                    <span className="header">
                    <GoArrowLeft onClick={handleNextExperience}/> <h1>Experience</h1>
                    </span>
                    <h2>{currentExperience.company}</h2>
                    <h3>{currentExperience.role}</h3>
                    <p>{currentExperience.duration}</p>
                    <ul>
                        {currentExperience.responsibilities.map((responsibility, index) => (
                            <li key={index}>{responsibility}</li>
                        ))}
                    </ul>
                </article>
            )}
        </div>
    );
};

export default ExperienceCard;
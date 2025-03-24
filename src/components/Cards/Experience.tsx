import React from 'react';
import TerminalCard from './TerminalCard';
import { resumeData } from '../../constants/resume/resumeData';
import { Experience } from '../../constants/resume/resumeDataTypes';

const ExperienceCard: React.FC = () => {
    const formattedExperience = resumeData.experience.map((exp: Experience) => ({
        title: exp.company,
        subtitle: exp.role,
        duration: exp.duration,
        items: exp.responsibilities
    }));

    return <TerminalCard items={formattedExperience} type="experience" />;
};

export default ExperienceCard; 
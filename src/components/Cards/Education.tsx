import React from 'react';
import TerminalCard from './TerminalCard';
import { resumeData } from '../../constants/resume/resumeData';
import { Education } from '../../constants/resume/resumeDataTypes';

const EducationCard: React.FC = () => {
    const formattedEducation = resumeData.education.map((edu: Education) => ({
        title: edu.institution,
        subtitle: edu.degree,
        duration: edu.duration,
        items: edu.details,
        honors: edu.honors ? {
            label: "Honors",
            value: edu.honors
        } : undefined
    }));

    return <TerminalCard items={formattedEducation} type="education" />;
};

export default EducationCard; 
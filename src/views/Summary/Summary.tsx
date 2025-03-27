import "./summary.scss";
import React from 'react';
import TerminalCard from '../../components/Cards/TerminalCard';
import WindowsTerminal from '../../components/Terminal/WindowsTerminal';
import { FaUser, FaInfoCircle, FaBriefcase } from 'react-icons/fa';

const Summary: React.FC = () => {
    const tabs = [
        {
            id: 'summary',
            title: 'Summary',
            icon: <FaUser />,
            content: <TerminalCard type="summary" title="Professional Summary" />
        },
        {
            id: 'experience',
            title: 'Experience',
            icon: <FaInfoCircle />,
            content: <TerminalCard type="experience" title="About Me" />
        },
        {
            id: 'education',
            title: 'Education',
            icon: <FaBriefcase />,
            content: (
                    <TerminalCard type="education" title="Education" />
            
            )
        }
    ];

    return <WindowsTerminal tabs={tabs} onTabChange={() => {}} />;
};

export default Summary;

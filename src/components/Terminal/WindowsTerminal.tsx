import React, { useState } from 'react';
import "./windowsTerminal.scss";

interface Tab {
    id: string;
    title: string;
    icon: React.ReactNode;
    content: React.ReactNode;
}

interface WindowsTerminalProps {
    tabs: Tab[];
    onTabChange: (index: number) => void;
}

const WindowsTerminal: React.FC<WindowsTerminalProps> = ({ tabs, onTabChange }) => {
    const [activeTab, setActiveTab] = useState(0);

    const handleTabClick = (index: number) => {
        setActiveTab(index);
        onTabChange(index);
    };

    return (
        <div className="windows-terminal">
            <div className="terminal-header">
                <div className="title-bar">
                    <div className="window-title">PDShell</div>
                    <div className="window-controls">
                        <button>_</button>
                        <button>□</button>
                        <button>×</button>
                    </div>
                </div>
                <div className="terminal-tabs">
                    {tabs.map((tab, index) => (
                        <button
                            key={tab.id}
                            className={`tab ${activeTab === index ? 'active' : ''}`}
                            onClick={() => handleTabClick(index)}
                        >
                            {tab.icon}
                            <span>{tab.title}</span>
                        </button>
                    ))}
                </div>
            </div>
            <div className="terminal-content">
                {tabs[activeTab].content}
            </div>
        </div>
    );
};

export default WindowsTerminal; 
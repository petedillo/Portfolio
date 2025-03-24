import "./summary.scss";
import {resumeData} from "../../constants/resume/resumeData.ts";
import ExperienceCard from "../../components/Cards/Experience.tsx";
import EducationCard from "../../components/Cards/Education.tsx";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const Summary = () => {
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.3,
                delayChildren: 0.2
            }
        }
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 30 },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                type: "spring",
                stiffness: 100,
                damping: 12,
                mass: 0.8
            }
        }
    };

    const summaryRef = useRef(null);
    const isInView = useInView(summaryRef, { once: true, margin: "-100px" });

    return (
        <div className="summary" id="summary">
            <motion.div 
                className="top"
                variants={containerVariants}
                initial="hidden"
                animate="visible"
            >
                <motion.section 
                    className="professional-summary"
                    ref={summaryRef}
                >
                    <h2 className={`terminal-title ${isInView ? 'visible' : ''}`}>
                        Professional Summary
                    </h2>
                    <div className="terminal-content">
                        <p>{resumeData.professionalSummary}</p>
                    </div>
                </motion.section>
            </motion.div>
            <motion.div 
                className="middle"
                variants={containerVariants}
                initial="hidden"
                animate="visible"
            >
                <motion.section 
                    className="experience"
                    variants={itemVariants}
                >
                    <h2 className="terminal-title">Experience</h2>
                    <ExperienceCard />
                </motion.section>
                <motion.section 
                    className="education"
                    variants={itemVariants}
                >
                    <h2 className="terminal-title">Education</h2>
                    <EducationCard />
                </motion.section>
            </motion.div>
        </div>
    );
};

export default Summary;

import "./summary.scss";
import {resumeData} from "../../constants/resume/resumeData.ts";
import ExperienceCard from "../../components/Cards/Experience.tsx";

const Summary = () => {
    return (
        <div className="summary" id="summary">
            <div className="top">
                <section className="professional-summary">
                    <h2>Professional Summary</h2>
                    <p>{resumeData.professionalSummary}</p>
                </section>
            </div>
            <div className="middle">
                <section className="experience">
                    <h2>Experience</h2>
                    <ExperienceCard experiences={resumeData.experience}/>
                </section>
                <section className="education">
                    <h2>Education</h2>
                    {resumeData.education.map((degree, index) => (
                        <div key={index} className="degree">
                            <h3>{degree.institution}</h3>
                            <p className="role">
                                {degree.degree} ({degree.duration})
                            </p>
                            <ul>
                                {degree.details.map((detail, idx) => (
                                    <li key={idx}>{detail}</li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </section>
            </div>
        </div>
    );
};

export default Summary;

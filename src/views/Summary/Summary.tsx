import "./summary.scss";
import { resumeData } from "./string.ts";

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
            {resumeData.experience.map((job, index) => (
              <div key={index} className="job">
                <h3>{job.company}</h3>
                <p className="role">
                  {job.role} - {job.duration}
                </p>
                <ul>
                  {job.responsibilities.map((responsibility, idx) => (
                    <li key={idx}>{responsibility}</li>
                  ))}
                </ul>
              </div>
            ))}
          </section>
          <section className="education">
            <h2>Education</h2>
            {resumeData.education.map((degree, index) => (
              <div key={index} className="degree">
                <h3>{degree.institution}</h3>
                <p>
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
      <div className="bottom">
        <p>portfolio</p>
      </div>
    </div>
  );
};

export default Summary;

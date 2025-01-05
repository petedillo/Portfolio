import { ResumeData } from './types';  // Import the types

export const resumeData: ResumeData = {
  professionalSummary: `
    Dedicated Software Engineer with a proven track record of delivering innovative solutions under pressure. Leveraging 6 years of experience as a Combat Engineer in the U.S. Army, I bring a strong foundation in problem-solving, adaptability, and a commitment to mission success. Passionate about automating infrastructure, optimizing systems, and ensuring high availability.
  `,
  experience: [
    {
      company: "Apple",
      role: "Full Stack Java Developer",
      duration: "Jan 2024 - Present",
      responsibilities: [
        "Developed a full-stack project tracking application using Java, Spring Boot, React, and PostgreSQL.",
        "Implemented CI/CD pipelines using Rio (Apple's Jenkins).",
        "Improved data processing speed significantly by optimizing data models.",
        "Developed comprehensive unit tests for both the backend and frontend."
      ]
    },
    {
      company: "Swatched!",
      role: "Software Engineer Internship",
      duration: "Jan 2023 - May 2023",
      responsibilities: [
        "Led research for database migration, saving $30,000 annually.",
        "Enhanced user experience through frontend development and UI changes.",
        "Worked with Jira in an Agile environment."
      ]
    },
    {
      company: "U.S. Army",
      role: "Sergeant",
      duration: "Oct 2015 - Dec 2021",
      responsibilities: [
        "Managed logistics and data collection for improved performance accuracy.",
        "Handled operational planning and forecasting, similar to sprint planning.",
        "Executed complex engineering tasks requiring high precision and attention to detail."
      ]
    }
  ],
  education: [
    {
      institution: "Full Sail University",
      degree: "B.S., Web Development",
      duration: "Sept 2022 - Present (Expected Graduation: March 2025)",
      details: [
        "Proficient in client-side & server-side development, full-stack best practices, system design, and DevOps.",
        "Developed expertise in Data Structures and Algorithms (DSAs).",
        "Developed multiple full-stack applications with CI/CD pipelines."
      ]
    },
    {
      institution: "Per Scholas Powered by TEKsystems",
      degree: "Java Full Stack Bootcamp",
      duration: "Sept 2023 - Jan 2024",
      details: [
        "Developed skills in building full-stack web applications with Java and Spring Framework.",
        "Built a hiring platform/applicant tracking system as a capstone project."
      ]
    },
    {
      institution: "devCodeCamp",
      degree: "Web Development (MERN Stack Certificate)",
      duration: "Feb 2022 - May 2022",
      details: [
        "Mastered MERN stack (MongoDB, Express, React, Node.js).",
        "Built a full-stack task management system for task tracking."
      ]
    }
  ]
};

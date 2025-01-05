// Type definitions for each section of the resume

export interface Experience {
    company: string;
    role: string;
    duration: string;
    responsibilities: string[];
  }
  
  export interface Education {
    institution: string;
    degree: string;
    duration: string;
    details: string[];
  }
  
  export interface ResumeData {
    professionalSummary: string;
    experience: Experience[];
    education: Education[];
  }
  
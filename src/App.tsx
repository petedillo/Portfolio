import "./App.scss";
import { useState, useEffect } from "react";
import Header from "./components/Header/Header";
import Intro from "./views/Intro/Intro";
import Summary from "./views/Summary/Summary";
import ScrollArrow from "./components/ScrollArrow/ScrollArrow";

function App() {
  const [currentSection, setCurrentSection] = useState(0);
  const sections = ["intro", "summary"];

  // Handle theme changes
  useEffect(() => {
    document.body.className = `theme-${sections[currentSection]}`;
  }, [currentSection, sections]);

  // Handle scroll and section detection
  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + window.innerHeight / 2;
      const introSection = document.getElementById('intro');
      const summarySection = document.getElementById('summary');

      if (introSection && summarySection) {
        const introBottom = introSection.offsetTop + introSection.offsetHeight;
        const summaryBottom = summarySection.offsetTop + summarySection.offsetHeight;

        if (scrollPosition < introBottom) {
          setCurrentSection(0);
        } else if (scrollPosition < summaryBottom) {
          setCurrentSection(1);
        }
      }
    };

    // Initial check
    handleScroll();

    // Add scroll listener
    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const scrollToSection = (index: number) => {
    const section = document.getElementById(sections[index]);
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
      setCurrentSection(index);
    }
  };

  return (
    <div className="app">
      <Header currentTheme={sections[currentSection]} />
      <main>
        <section id="intro">
          <Intro />
        </section>
        <section id="summary">
          <Summary />
        </section>
      </main>
      <ScrollArrow
        currentSection={currentSection}
        totalSections={sections.length}
        onScroll={scrollToSection}
        theme={sections[currentSection]}
      />
    </div>
  );
}

export default App;

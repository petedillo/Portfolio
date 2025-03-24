import "./App.scss";
import { useState, useEffect, useCallback } from "react";
import Header from "./components/Header/Header";
import Intro from "./views/Intro/Intro";
import Summary from "./views/Summary/Summary";
import ScrollArrow from "./components/ScrollArrow/ScrollArrow";
import { setViewportHeight } from './utils/viewport';

function App() {
  const [currentSection, setCurrentSection] = useState(0);
  const sections = ["intro", "summary"];
  const [isScrolling, setIsScrolling] = useState(false);

  // Handle theme changes
  useEffect(() => {
    document.body.className = `theme-${sections[currentSection]}`;
  }, [currentSection, sections]);

  useEffect(() => {
    setViewportHeight();
  }, []);

  // Optimized scroll handler with debouncing
  const handleScroll = useCallback(() => {
    if (isScrolling) return;

    const scrollPosition = window.scrollY + window.innerHeight / 2;
    const introSection = document.getElementById('intro');
    const summarySection = document.getElementById('summary');

    if (introSection && summarySection) {

      // Determine which section is closest to the viewport center
      const introDistance = Math.abs(scrollPosition - (introSection.offsetTop + introSection.offsetHeight / 2));
      const summaryDistance = Math.abs(scrollPosition - (summarySection.offsetTop + summarySection.offsetHeight / 2));

      const newSection = introDistance < summaryDistance ? 0 : 1;
      
      if (newSection !== currentSection) {
        setIsScrolling(true);
        setCurrentSection(newSection);
        
        // Smooth scroll to the section
        const targetSection = document.getElementById(sections[newSection]);
        if (targetSection) {
          targetSection.scrollIntoView({ behavior: "smooth" });
        }

        // Reset scrolling state after animation
        setTimeout(() => {
          setIsScrolling(false);
        }, 1000);
      }
    }
  }, [currentSection, isScrolling, sections]);

  // Throttled scroll event listener
  useEffect(() => {
    let timeoutId: number | undefined;
    
    const throttledScroll = () => {
      if (timeoutId) return;
      
      timeoutId = window.setTimeout(() => {
        handleScroll();
        timeoutId = undefined;
      }, 100);
    };

    window.addEventListener('scroll', throttledScroll, { passive: true });

    return () => {
      window.removeEventListener('scroll', throttledScroll);
      if (timeoutId) window.clearTimeout(timeoutId);
    };
  }, [handleScroll]);

  const scrollToSection = (index: number) => {
    if (isScrolling) return;
    
    setIsScrolling(true);
    const section = document.getElementById(sections[index]);
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
      setCurrentSection(index);
      
      setTimeout(() => {
        setIsScrolling(false);
      }, 1000);
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

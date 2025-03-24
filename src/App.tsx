import "./App.scss";
import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import NavBar from "./components/NavBar/NavBar.tsx";
import Menu from "./components/Menu/Menu.tsx";
import Intro from "./views/Intro/Intro.tsx";
import Summary from "./views/Summary/Summary.tsx";
import ScrollArrow from "./components/ScrollArrow/ScrollArrow.tsx";

function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [currentSection, setCurrentSection] = useState(0);
  const sectionsRef = useRef<HTMLDivElement>(null);
  const sections = [Intro, Summary];

  useEffect(() => {
    const handleScroll = () => {
      if (sectionsRef.current) {
        const scrollPosition = window.scrollY;
        const sectionHeight = window.innerHeight;
        const currentIndex = Math.round(scrollPosition / sectionHeight);
        setCurrentSection(currentIndex);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToNextSection = () => {
    const nextSection = currentSection + 1;
    if (nextSection < sections.length) {
      window.scrollTo({
        top: nextSection * window.innerHeight,
        behavior: "smooth",
      });
    }
  };

  return (
    <>
      <NavBar menuOpen={menuOpen} setMenuOpen={setMenuOpen} />
      <Menu menuOpen={menuOpen} setMenuOpen={setMenuOpen} />
      <section className="sections" ref={sectionsRef}>
        <AnimatePresence mode="wait">
          {sections.map((Section, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -50 }}
              transition={{ duration: 0.5, ease: "easeInOut" }}
              style={{
                width: "100vw",
                height: "calc(100vh - 70px)",
                scrollSnapAlign: "start",
              }}
            >
              <Section menuOpen={menuOpen} />
            </motion.div>
          ))}
        </AnimatePresence>
      </section>
      <ScrollArrow
        currentSection={currentSection}
        totalSections={sections.length}
        onScroll={scrollToNextSection}
      />
    </>
  );
}

export default App;

import "./App.scss";
import { useState } from "react";
import Header from "./components/Header/Header";
import Intro from "./views/Intro/Intro";
import Summary from "./views/Summary/Summary";
import ScrollArrow from "./components/ScrollArrow/ScrollArrow";

function App() {
  const [currentSection, setCurrentSection] = useState(0);
  const sections = ["intro", "summary"];

  const scrollToSection = (index: number) => {
    const section = document.getElementById(sections[index]);
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
      setCurrentSection(index);
    }
  };

  return (
    <div className="app">
      <Header />
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
      />
    </div>
  );
}

export default App;

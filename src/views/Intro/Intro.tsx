import "./Intro.scss";
import { ReactTyped } from "react-typed";

interface IntroProps {
  menuOpen: boolean;
}

const Intro: React.FC<IntroProps> = ({ menuOpen }) => {
  const typedTextClass = menuOpen ? "open" : "closed";

  return (
    <div className="intro" id="intro">
      <div className="left">
        <div className={"imgContainer " + (menuOpen && "active")}>
          <img src="assets/pedro.png" alt="Pedro smiling" />
        </div>
      </div>
      <div className="right">
        <div className="wrapper">
          <h2>Hello! I'm</h2>
          <h1>Pedro Delgadillo</h1>
          <h3 className={menuOpen ? "closed" : "open"}>
            Seeking opportunities as a{" "}
            <ReactTyped
              strings={[
                "Full-Stack Developer",
                "Java Developer",
                "DevOps Engineer",
                "Software Engineer",
              ]}
              typeSpeed={40}
              backSpeed={50}
              backDelay={1000}
              startDelay={500}
              showCursor={false}
              className={typedTextClass}
            />
          </h3>
        </div>
        <a href="#summary">
          <img src="assets/down.png" alt="down arrow" />
        </a>
      </div>
    </div>
  );
};

export default Intro;

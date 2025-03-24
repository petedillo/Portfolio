import "./Intro.scss";
import { FC } from "react";
import { motion } from "framer-motion";
import { ReactTyped } from "react-typed";

interface IntroProps {
  menuOpen?: boolean;
}

const Intro: FC<IntroProps> = ({ menuOpen = false }) => {
  const typedTextClass = menuOpen ? "open" : "closed";

  return (
    <div className="intro" id="intro">
      <motion.div 
        className="left"
        initial={{ opacity: 0, x: -100 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        <div className={"imgContainer " + (menuOpen && "active")}>
          <img src="assets/pedro.png" alt="Pedro smiling" />
        </div>
      </motion.div>
      <motion.div 
        className="right"
        initial={{ opacity: 0, x: 100 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        <div className="wrapper">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            Hello! I'm
          </motion.h2>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            Pedro Delgadillo
          </motion.h1>
          <motion.h3 
            className={menuOpen ? "closed" : "open"}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
          >
            Seeking opportunities as a{" "}
            <span className="typed-text">
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
                cursorChar="|"
              />
            </span>
          </motion.h3>
        </div>
      </motion.div>
    </div>
  );
};

export default Intro;

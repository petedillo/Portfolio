import { FC, useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import NavBar from '../NavBar/NavBar';
import Menu from '../Menu/Menu';
import './Header.scss';

interface HeaderProps {
  initialTheme?: string;
}

const Header: FC<HeaderProps> = ({ initialTheme = 'intro' }) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [currentTheme, setCurrentTheme] = useState<string>(initialTheme);

  useEffect(() => {
    const observerOptions = {
      threshold: 0.5,
      rootMargin: '-50% 0px -50% 0px'
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const sectionId = entry.target.id;
          setCurrentTheme(sectionId);
          // Apply theme class to body
          document.body.className = `theme-${sectionId}`;
        }
      });
    }, observerOptions);

    const sections = document.querySelectorAll('section[id]');
    sections.forEach((section) => observer.observe(section));

    // Set initial theme
    document.body.className = `theme-${initialTheme}`;

    return () => observer.disconnect();
  }, [initialTheme]);

  const headerVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: {
        duration: 0.5,
        ease: "easeOut"
      }
    }
  };

  return (
    <motion.header
      className="header"
      variants={headerVariants}
      initial="hidden"
      animate="visible"
    >
      <NavBar 
        theme={currentTheme} 
        menuOpen={menuOpen} 
        setMenuOpen={setMenuOpen} 
      />
      <AnimatePresence>
        {menuOpen && (
          <Menu 
            theme={currentTheme} 
            menuOpen={menuOpen} 
            setMenuOpen={setMenuOpen} 
          />
        )}
      </AnimatePresence>
    </motion.header>
  );
};

export default Header; 
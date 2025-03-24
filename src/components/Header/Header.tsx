import { FC, useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import NavBar from '../NavBar/NavBar';
import Menu from '../Menu/Menu';
import { sectionThemes, defaultTheme, SectionTheme } from '../../constants/themes';
import './Header.scss';

interface HeaderProps {
  initialTheme?: SectionTheme;
}

const Header: FC<HeaderProps> = ({ initialTheme = defaultTheme }) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [currentTheme, setCurrentTheme] = useState<SectionTheme>(initialTheme);

  useEffect(() => {
    // Apply theme colors to CSS variables
    document.documentElement.style.setProperty('--header-bg', currentTheme.menuBackground);
    document.documentElement.style.setProperty('--header-text', currentTheme.menuText);
    document.documentElement.style.setProperty('--header-glow', currentTheme.accent);

    const observerOptions = {
      threshold: 0.5,
      rootMargin: '-50% 0px -50% 0px'
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const sectionId = entry.target.id;
          const newTheme = sectionThemes[sectionId as keyof typeof sectionThemes] || defaultTheme;
          setCurrentTheme(newTheme);
          // Update CSS variables when theme changes
          document.documentElement.style.setProperty('--header-bg', newTheme.menuBackground);
          document.documentElement.style.setProperty('--header-text', newTheme.menuText);
          document.documentElement.style.setProperty('--header-glow', newTheme.accent);
        }
      });
    }, observerOptions);

    const sections = document.querySelectorAll('section[id]');
    sections.forEach((section) => observer.observe(section));

    return () => observer.disconnect();
  }, [currentTheme]);

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
      <NavBar theme={currentTheme} menuOpen={menuOpen} setMenuOpen={setMenuOpen} />
      <AnimatePresence>
        {menuOpen && <Menu theme={currentTheme} menuOpen={menuOpen} setMenuOpen={setMenuOpen} />}
      </AnimatePresence>
    </motion.header>
  );
};

export default Header; 
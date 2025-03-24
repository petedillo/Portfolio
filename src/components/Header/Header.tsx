import { FC, useState, useEffect } from 'react';
import { motion } from 'framer-motion';
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
        }
      });
    }, observerOptions);

    const sections = document.querySelectorAll('section[id]');
    sections.forEach((section) => observer.observe(section));

    return () => observer.disconnect();
  }, []);

  return (
    <motion.header
      className="header"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <NavBar theme={currentTheme} menuOpen={menuOpen} setMenuOpen={setMenuOpen} />
      <Menu theme={currentTheme} menuOpen={menuOpen} setMenuOpen={setMenuOpen} />
    </motion.header>
  );
};

export default Header; 
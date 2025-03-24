import { FC, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import NavBar from '../NavBar/NavBar';
import Menu from '../Menu/Menu';
import './Header.scss';

interface HeaderProps {
  currentTheme: string;
}

const Header: FC<HeaderProps> = ({ currentTheme }) => {
  const [menuOpen, setMenuOpen] = useState(false);

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
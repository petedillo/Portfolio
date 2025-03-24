import { FC } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { SectionTheme } from '../../constants/themes';
import './Menu.scss';

interface MenuProps {
  theme: SectionTheme;
  menuOpen: boolean;
  setMenuOpen: (open: boolean) => void;
}

const Menu: FC<MenuProps> = ({ theme, menuOpen, setMenuOpen }) => {
  const handleOverlayClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      setMenuOpen(false);
    }
  };

  return (
    <AnimatePresence>
      {menuOpen && (
        <>
          <motion.div
            className="menu-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={handleOverlayClick}
          />
          <motion.div
            className="menu"
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 20 }}
            style={{
              backgroundColor: theme.menuBackground,
              color: theme.menuText
            }}
          >
            <ul>
              <li><a href="#intro" onClick={() => setMenuOpen(false)}>Home</a></li>
              <li><a href="#summary" onClick={() => setMenuOpen(false)}>Summary</a></li>
              <li><a href="#projects" onClick={() => setMenuOpen(false)}>Projects</a></li>
              <li><a href="#contact" onClick={() => setMenuOpen(false)}>Contact</a></li>
            </ul>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default Menu;
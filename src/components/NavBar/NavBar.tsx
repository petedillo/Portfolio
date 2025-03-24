import { FC } from 'react';
import { motion } from 'framer-motion';
import { SectionTheme } from '../../constants/themes';
import './NavBar.scss';

interface NavBarProps {
  theme: SectionTheme;
  menuOpen: boolean;
  setMenuOpen: (open: boolean) => void;
}

const NavBar: FC<NavBarProps> = ({ theme, menuOpen, setMenuOpen }) => {
  return (
    <motion.nav 
      className="navbar"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="logo">PD</div>
      <div className="menu-button" onClick={() => setMenuOpen(!menuOpen)}>
        <div className={`dashes ${menuOpen ? 'active' : ''}`}>
          <span></span>
          <span></span>
          <span></span>
        </div>
      </div>
    </motion.nav>
  );
};

export default NavBar;

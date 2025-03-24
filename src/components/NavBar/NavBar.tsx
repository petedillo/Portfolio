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
  const menuIconVariants = {
    closed: {
      rotate: 0,
      scale: 1,
      transition: {
        duration: 0.3,
        ease: "easeInOut"
      }
    },
    open: {
      rotate: 180,
      scale: 1.1,
      transition: {
        duration: 0.3,
        ease: "easeInOut"
      }
    }
  };

  const dashVariants = {
    closed: (i: number) => ({
      x: 0,
      y: 0,
      rotate: 0,
      opacity: 1,
      transition: {
        duration: 0.3,
        ease: "easeInOut"
      }
    }),
    open: (i: number) => ({
      x: i === 0 ? 0 : i === 1 ? -10 : 0,
      y: i === 0 ? 8 : i === 1 ? 0 : -8,
      rotate: i === 0 ? 45 : i === 1 ? 0 : -45,
      opacity: i === 1 ? 0 : 1,
      transition: {
        duration: 0.3,
        ease: "easeInOut"
      }
    })
  };

  return (
    <motion.nav 
      className="navbar"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="logo">PD</div>
      <motion.div 
        className="menu-button" 
        onClick={() => setMenuOpen(!menuOpen)}
        variants={menuIconVariants}
        animate={menuOpen ? "open" : "closed"}
      >
        <div className="dashes">
          {[0, 1, 2].map((i) => (
            <motion.span
              key={i}
              custom={i}
              variants={dashVariants}
              animate={menuOpen ? "open" : "closed"}
            />
          ))}
        </div>
      </motion.div>
    </motion.nav>
  );
};

export default NavBar;

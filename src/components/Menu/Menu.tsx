import { FC } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import './Menu.scss';

interface MenuProps {
  theme: string;
  menuOpen: boolean;
  setMenuOpen: (open: boolean) => void;
}

const Menu: FC<MenuProps> = ({ theme, menuOpen, setMenuOpen }) => {
  const menuVariants = {
    closed: {
      opacity: 0,
      y: -20,
      transition: {
        duration: 0.3,
        ease: "easeInOut"
      }
    },
    open: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.3,
        ease: "easeInOut"
      }
    }
  };

  const menuItemVariants = {
    closed: { opacity: 0, x: -20 },
    open: (i: number) => ({
      opacity: 1,
      x: 0,
      transition: {
        delay: i * 0.1,
        duration: 0.3,
        ease: "easeOut"
      }
    })
  };

  const menuItems = [
    { id: 'intro', label: 'Home' },
    { id: 'summary', label: 'About' },
    { id: 'projects', label: 'Projects' },
    { id: 'contact', label: 'Contact' }
  ];

  return (
    <AnimatePresence>
      {menuOpen && (
        <motion.div
          className="menu"
          variants={menuVariants}
          initial="closed"
          animate="open"
          exit="closed"
        >
          <div className="menu-items">
            {menuItems.map((item, i) => (
              <motion.div
                key={item.id}
                className="menu-item"
                custom={i}
                variants={menuItemVariants}
                initial="closed"
                animate="open"
                exit="closed"
                onClick={() => {
                  setMenuOpen(false);
                  document.getElementById(item.id)?.scrollIntoView({ behavior: 'smooth' });
                }}
              >
                {item.label}
              </motion.div>
            ))}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Menu;
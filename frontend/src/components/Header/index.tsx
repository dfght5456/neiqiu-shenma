import React, { useState, useEffect } from 'react';
import { Popup } from 'antd-mobile';
import { AppOutline, CloseOutline } from 'antd-mobile-icons';
import { useNav } from '../../context/NavContext';
import { useContent } from '../../context/ContentContext';
import { motion, AnimatePresence, type Variants } from 'framer-motion';
import './index.css';

const Header: React.FC = () => {
  const [currentDate, setCurrentDate] = useState('');
  const [visible, setVisible] = useState(false);
  const { handleNavClick } = useNav();
  const { content } = useContent();
  const cards = content.header?.cards || [];

  useEffect(() => {
    const updateDate = () => {
      const now = new Date();
      const options: Intl.DateTimeFormatOptions = { 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric', 
        weekday: 'long' 
      };
      setCurrentDate(now.toLocaleDateString('zh-CN', options));
    };

    updateDate();
    const timer = setInterval(updateDate, 60000);

    return () => clearInterval(timer);
  }, []);

  const menuVariants: Variants = {
    hidden: { x: '100%' },
    visible: {
      x: 0,
      transition: {
        type: 'spring',
        stiffness: 300,
        damping: 30,
      },
    },
    exit: {
      x: '100%',
      transition: {
        type: 'spring',
        stiffness: 300,
        damping: 30,
      },
    },
  };

  const menuItemVariants: Variants = {
    hidden: { opacity: 0, x: 30 },
    visible: (index: number) => ({
      opacity: 1,
      x: 0,
      transition: {
        delay: index * 0.08,
        duration: 0.4,
        ease: 'easeOut',
      },
    }),
    hover: {
      x: 8,
      backgroundColor: 'rgba(198, 40, 40, 0.08)',
      transition: {
        duration: 0.2,
      },
    },
    tap: {
      scale: 0.98,
    },
  };

  const logoVariants: Variants = {
    initial: { scale: 1 },
    hover: {
      scale: 1.1,
      rotate: 5,
      transition: {
        duration: 0.3,
        ease: 'easeOut',
      },
    },
  };

  const menuBtnVariants: Variants = {
    initial: { scale: 1 },
    hover: {
      scale: 1.1,
      boxShadow: '0 6px 20px rgba(198, 40, 40, 0.4)',
      transition: {
        duration: 0.2,
      },
    },
    tap: {
      scale: 0.9,
    },
  };

  return (
    <>
      <div className="app-header">
        <motion.div 
          className="header-left"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.3 }}
        >
          <motion.img 
            src="/uploads/logo.jpg" 
            alt="Logo" 
            className="logo-img"
            variants={logoVariants}
            initial="initial"
            whileHover="hover"
          />
          <motion.h1 
            className="app-title"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.3 }}
          >
            内丘神码
          </motion.h1>
        </motion.div>
        <motion.div 
          className="header-right"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.3 }}
        >
          <motion.div 
            className="date-info"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.3 }}
          >
            {currentDate}
          </motion.div>
          <motion.div 
            className="menu-btn"
            variants={menuBtnVariants}
            initial="initial"
            whileHover="hover"
            whileTap="tap"
            onClick={() => setVisible(true)}
          >
            <AppOutline fontSize={28} color="#fff" />
          </motion.div>
        </motion.div>
      </div>

      <Popup
        visible={visible}
        onMaskClick={() => setVisible(false)}
        position="right"
        bodyStyle={{ width: '60vw', minWidth: '200px', maxWidth: '300px' }}
      >
        <AnimatePresence>
          {visible && (
            <motion.div 
              className="menu-container"
              variants={menuVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
            >
              <motion.div 
                className="menu-header"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
              >
                <h2>神码概览</h2>
                <motion.div
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => setVisible(false)}
                >
                  <CloseOutline fontSize={24} />
                </motion.div>
              </motion.div>
              <div className="menu-list">
                {cards.map((card, index) => (
                  <motion.div
                    key={card.id}
                    className="menu-item"
                    variants={menuItemVariants}
                    custom={index}
                    initial="hidden"
                    animate="visible"
                    whileHover="hover"
                    whileTap="tap"
                    onClick={() => {
                      handleNavClick(card.path);
                      setVisible(false);
                    }}
                  >
                    <span className="menu-item-text">{card.title}</span>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </Popup>
    </>
  );
};

export default Header;
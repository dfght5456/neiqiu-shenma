import React from 'react';
import { motion, type Variants } from 'framer-motion';
import { Image } from 'antd-mobile';
import { useNav } from '../../context/NavContext';
import { useContent } from '../../context/ContentContext';
import './index.css';

const Overview: React.FC = () => {
  const { handleNavClick } = useNav();
  const { content } = useContent();
  const { cards } = content.overview;

  const cardVariants: Variants = {
    hidden: (isOdd: boolean) => ({
      opacity: 0,
      y: isOdd ? -60 : 60,
      scale: 0.9,
    }),
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.6,
        ease: 'easeOut',
      },
    },
    hover: {
      y: -8,
      scale: 1.03,
      transition: {
        duration: 0.3,
        ease: 'easeOut',
      },
    },
    tap: {
      scale: 0.97,
      transition: {
        duration: 0.1,
      },
    },
  };

  const imageVariants: Variants = {
    hover: {
      scale: 1.08,
      transition: {
        duration: 0.4,
        ease: 'easeOut',
      },
    },
  };

  const titleVariants: Variants = {
    hover: {
      y: -8,
      color: '#F9A825',
      transition: {
        duration: 0.3,
      },
    },
  };

  return (
    <div className="overview-container">
      <motion.div 
        className="overview-header"
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="overview-header-title">探索神码文化</h1>
        <p className="overview-header-subtitle">从起源到传承，全面了解内丘神码的艺术魅力</p>
      </motion.div>
      
      <div className="overview-grid">
        {cards.map((card, index) => {
          const isOdd = (index + 1) % 2 !== 0;

          return (
            <motion.div
              key={card.id}
              className="overview-card"
              custom={isOdd}
              variants={cardVariants}
              initial="hidden"
              whileInView="visible"
              whileHover="hover"
              whileTap="tap"
              viewport={{ once: true, amount: 0.2 }}
              transition={{ delay: index * 0.15 }}
              onClick={() => handleNavClick(card.path)}
              style={{ cursor: 'pointer' }}
            >
              <div className="card-image-wrapper">
                <motion.div variants={imageVariants}>
                  <Image src={card.image} fit="cover" className="card-image" />
                </motion.div>
                <div className="card-overlay">
                  <motion.h3 
                    className="card-title"
                    variants={titleVariants}
                  >
                    {card.title}
                  </motion.h3>
                </div>
                <motion.div 
                  className="card-decoration"
                  initial={{ opacity: 0, width: 0 }}
                  whileHover={{ opacity: 1, width: 40 }}
                  transition={{ duration: 0.3 }}
                />
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
};

export default Overview;
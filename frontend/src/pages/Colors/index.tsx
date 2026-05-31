import React from 'react';
import { motion, type Variants } from 'framer-motion';
import { Image } from 'antd-mobile';
import Footer from '../../components/Footer';
import { PatternDivider, PatternDecoration } from '../../components/Pattern';
import { useContent } from '../../context/ContentContext';
import './index.css';

const Colors: React.FC = () => {
  const { content } = useContent();
  const { colors } = content;

  const colorCardVariants: Variants = {
    hidden: { opacity: 0, scale: 0.9, x: -30 },
    visible: {
      opacity: 1,
      scale: 1,
      x: 0,
      transition: {
        duration: 0.5,
        ease: 'easeOut',
      },
    },
    hover: {
      x: 10,
      scale: 1.02,
      transition: {
        duration: 0.3,
      },
    },
  };

  const colorSampleVariants: Variants = {
    hover: {
      scale: 1.15,
      boxShadow: '0 8px 24px rgba(0, 0, 0, 0.2)',
      transition: {
        duration: 0.3,
      },
    },
  };

  return (
    <div className="colors-container">
      <PatternDecoration
        pattern="cloud"
        position="top-left"
        size="lg"
        animated
      />
      <PatternDecoration
        pattern="meander"
        position="bottom-right"
        size="md"
        animated
      />
      
      <div className="colors-content-wrapper">
        <div className="colors-header-mobile">
          <motion.h1
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            {colors.title}
          </motion.h1>
          <motion.p 
            className="subtitle"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
          >
            {colors.subtitle}
          </motion.p>
        </div>

        <div className="colors-left-panel">
          <div className="colors-header-desktop">
            <motion.h1
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              {colors.title}
            </motion.h1>
            <motion.p 
              className="subtitle"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.5 }}
            >
              {colors.subtitle}
            </motion.p>
          </div>

          <div className="color-grid">
            {colors.palette.map((color, index) => (
              <motion.div
                key={color.id}
                className="color-card"
                variants={colorCardVariants}
                initial="hidden"
                whileInView="visible"
                whileHover="hover"
                viewport={{ once: true, amount: 0.3 }}
                transition={{ delay: index * 0.15 }}
              >
                <motion.div
                  className="color-sample"
                  style={{ backgroundColor: color.hex }}
                  variants={colorSampleVariants}
                  whileHover="hover"
                >
                  <motion.span 
                    className="color-hex"
                    initial={{ opacity: 0 }}
                    whileHover={{ opacity: 1 }}
                    transition={{ duration: 0.2 }}
                  >
                    {color.hex}
                  </motion.span>
                </motion.div>
                <div className="color-info">
                  <h3>{color.name}</h3>
                  <span className="pinyin">{color.pinyin}</span>
                  <p>{color.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        <motion.div
          className="colors-right-panel"
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7, ease: 'easeOut' }}
        >
          <div className="main-image-frame">
            <Image 
              src={colors.mainImage} 
              fit="cover" 
              className="main-color-img"
              lazy
            />
            <div className="frame-overlay"></div>
          </div>
        </motion.div>
      </div>

      <PatternDivider pattern="wave" animated />

      <motion.div
        className="colors-description-section"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.6 }}
      >
        <h2>{colors.description.title}</h2>
        <div className="desc-text-block">
          {colors.description.paragraphs.map((p, i) => (
            <motion.p
              key={i}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ delay: 0.1 * i, duration: 0.4 }}
            >
              {p}
            </motion.p>
          ))}
        </div>
      </motion.div>
      <Footer />
    </div>
  );
};

export default Colors;
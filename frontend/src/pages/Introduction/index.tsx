import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Image } from 'antd-mobile';
import { PlayOutline } from 'antd-mobile-icons';
import Footer from '../../components/Footer';
import { useContent } from '../../context/ContentContext';
import './index.css';

const Introduction: React.FC = () => {
  const { content } = useContent();
  const { introduction } = content;
  const [isPlaying, setIsPlaying] = useState(false);

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3,
        delayChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { 
      opacity: 1, 
      y: 0, 
      transition: { duration: 0.8 } 
    }
  };

  const imageVariants = {
    hidden: { opacity: 0, scale: 0.95 },
    visible: { 
      opacity: 1, 
      scale: 1, 
      transition: { duration: 1 } 
    }
  };

  return (
    <div className="intro-page-container">
      <motion.div 
        className="intro-content-wrapper"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.1 }}
        variants={containerVariants}
      >
        {/* Main Title Section */}
        <motion.div className="intro-header" variants={itemVariants}>
          <h1 className="intro-title">{introduction.title}</h1>
          <div className="intro-subtitle-decoration">
            <span className="line"></span>
            <span className="text">{introduction.subtitle}</span>
            <span className="line"></span>
          </div>
        </motion.div>

        {/* Main Image Section */}
        <motion.div className="intro-main-image-box" variants={imageVariants}>
          {isPlaying ? (
            <video 
              src="/uploads/mda-nasm7ct4f7xv0qiy.mp4" 
              controls 
              autoPlay 
              className="intro-video"
            />
          ) : (
            <div className="intro-video-placeholder" onClick={() => setIsPlaying(true)}>
              <Image 
                src={introduction.mainImage} 
                fit="cover" 
                className="intro-main-img blurred" 
              />
              <div className="play-button-overlay">
                <PlayOutline fontSize={48} color="#fff" />
              </div>
              <div className="img-decoration-border"></div>
            </div>
          )}
        </motion.div>

        {/* Content Grid */}
        <div className="intro-details-grid">
          {/* Definition */}
          <motion.div className="intro-card definition-card" variants={itemVariants}>
            <div className="card-icon">📖</div>
            <h3>{introduction.cards.definition.title}</h3>
            <p>
              {introduction.cards.definition.content}
            </p>
          </motion.div>

          {/* Location */}
          <motion.div className="intro-card location-card" variants={itemVariants}>
            <div className="card-icon">📍</div>
            <h3>{introduction.cards.location.title}</h3>
            <p>
              {introduction.cards.location.content}
            </p>
          </motion.div>

          {/* Characteristics */}
          <motion.div className="intro-card features-card" variants={itemVariants}>
            <div className="card-icon">✨</div>
            <h3>{introduction.cards.features.title}</h3>
            <ul>
              {introduction.cards.features.items.map((item, index) => (
                <li key={index}>{item}</li>
              ))}
            </ul>
          </motion.div>
        </div>
      </motion.div>
      <Footer />
    </div>
  );
};

export default Introduction;

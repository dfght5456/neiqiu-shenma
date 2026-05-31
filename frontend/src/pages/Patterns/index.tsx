import React from 'react';
import { motion } from 'framer-motion';
import Footer from '../../components/Footer';
import { useContent } from '../../context/ContentContext';
import './index.css';

const Patterns: React.FC = () => {
  const { content } = useContent();
  const { patterns } = content;

  return (
    <div className="patterns-container">
      <div className="patterns-header">
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          {patterns.title}
        </motion.h1>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.8 }}
        >
          {patterns.subtitle}
        </motion.p>
      </div>

      <div className="patterns-grid">
        {patterns.items.map((item, index) => (
          <div 
            key={item.id}
            className="pattern-card"
            style={{
              animationDelay: `${index * 100}ms`,
              animationFillMode: 'both'
            }}
          >
            <div className="pattern-image-wrapper">
              <img 
                src={item.image} 
                alt={item.name} 
                className="pattern-img" 
                loading="lazy"
                style={{ opacity: 1 }}
              />
            </div>
            <div className="pattern-info">
              <h3>{item.name}</h3>
              <p>{item.desc}</p>
            </div>
          </div>
        ))}
      </div>
      <Footer />
    </div>
  );
};

export default Patterns;
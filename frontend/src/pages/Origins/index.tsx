import React from 'react';
import { motion } from 'framer-motion';
import Footer from '../../components/Footer';
import { useContent } from '../../context/ContentContext';
import './index.css';

const Origins: React.FC = () => {
  const { content } = useContent();
  const { origins } = content;

  return (
    <div className="origins-container">
      <div className="origins-header">
        <motion.h1 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          {origins.title}
        </motion.h1>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.8 }}
        >
          {origins.subtitle}
        </motion.p>
      </div>

      <div className="timeline-wrapper">
        <div className="timeline-line"></div>
        
        {origins.stages.map((stage, index) => (
          <div key={stage.id} className={`timeline-item ${index % 2 === 0 ? 'left' : 'right'}`}>
            {/* Timeline Dot */}
            <motion.div 
              className="timeline-dot"
              style={{ borderColor: stage.themeColor }}
              initial={{ scale: 0 }}
              whileInView={{ scale: 1 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.5, delay: 0.2 }}
            />

            {/* Content Card */}
            <motion.div 
              className="timeline-content"
              initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, type: "spring", bounce: 0.4 }}
            >
              <div className="period-label" style={{ backgroundColor: stage.themeColor }}>
                {stage.period}
              </div>
              
              <div className="content-text">
                <h3 style={{ color: stage.themeColor }}>{stage.title}</h3>
                <p>{stage.desc}</p>
              </div>
            </motion.div>
          </div>
        ))}
      </div>
      
      <div className="origins-footer">
        <p>历史的车轮滚滚向前，神码的印记永不磨灭</p>
      </div>
      <Footer />
    </div>
  );
};

export default Origins;

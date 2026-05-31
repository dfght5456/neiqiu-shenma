import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Steps, Image } from 'antd-mobile';
import { PlayOutline } from 'antd-mobile-icons';
import Footer from '../../components/Footer';
import { useContent } from '../../context/ContentContext';
import './index.css';

const { Step } = Steps;

const Process: React.FC = () => {
  const { content } = useContent();
  const { process } = content;
  const [isPlaying, setIsPlaying] = useState(false);

  return (
    <div className="process-container">
      <div className="process-header">
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          {process.title}
        </motion.h1>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.8 }}
        >
          {process.subtitle}
        </motion.p>
      </div>

      {/* Video Section */}
      <motion.div 
        className="process-video-section"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5, duration: 0.8 }}
      >
        <h2 className="video-title">制作过程视频</h2>
        <div className="process-video-box">
          {isPlaying ? (
            <video 
              src="/uploads/zzgc.mp4" 
              controls 
              autoPlay 
              className="process-video"
            />
          ) : (
            <div className="process-video-placeholder" onClick={() => setIsPlaying(true)}>
              <Image 
                src={process.steps[0]?.image} 
                fit="cover" 
                className="process-video-cover blurred" 
              />
              <div className="play-button-overlay">
                <PlayOutline fontSize={48} color="#fff" />
              </div>
            </div>
          )}
        </div>
      </motion.div>

      <div className="steps-wrapper">
        <Steps direction="vertical" style={{ '--title-font-size': '18px' }}>
          {process.steps.map((step, index) => (
            <Step 
              key={index} 
              title={
                <motion.div 
                  className="step-title-box"
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                >
                  {step.title}
                </motion.div>
              }
              description={
                <motion.div 
                  className="step-content-box"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 + 0.2 }}
                >
                  <div className="step-text">{step.description}</div>
                </motion.div>
              }
              status="process"
              icon={<div className="custom-step-icon">{index + 1}</div>}
            />
          ))}
        </Steps>
      </div>
      <Footer />
    </div>
  );
};

export default Process;

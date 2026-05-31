import React from 'react';
import { Button } from 'antd-mobile';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import './index.css';

const Home: React.FC = () => {
  const navigate = useNavigate();

  const buttonVariants = {
    initial: { scale: 1 },
    hover: { scale: 1.08, y: -3 },
    tap: { scale: 0.95 },
  };

  return (
    <div className="home-container">
      <motion.div 
        className="home-dynamic-bg"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
      />
      
      <div className="banner-section">
        <motion.div 
          initial={{ opacity: 0, scale: 1.15 }}
          animate={{ opacity: 0.75, scale: 1 }}
          transition={{ duration: 1.2, ease: 'easeOut' }}
          className="banner-bg"
          style={{ backgroundImage: `url('/uploads/微信图片_20251127025139_150_2.jpg')` }}
        />
        <div className="banner-content">
          <motion.h2 
            initial={{ opacity: 0, y: 40, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ delay: 0.4, duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="banner-title"
          >
            河北省非物质文化遗产内丘神码
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7, duration: 0.6, ease: 'easeOut' }}
            className="banner-subtitle"
          >
            探索河北省内丘县传统民间宗教祭祀木刻版画
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1, duration: 0.6, ease: 'easeOut' }}
            className="home-btn-group"
          >
            <motion.div
              variants={buttonVariants}
              initial="initial"
              whileHover="hover"
              whileTap="tap"
            >
              <Button 
                className="banner-btn" 
                shape="rounded" 
                onClick={() => navigate('/overview')}
              >
                了解神码
              </Button>
            </motion.div>
            
            <motion.div 
              className="secondary-btns"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.2, duration: 0.5 }}
            >
              <motion.div
                variants={buttonVariants}
                initial="initial"
                whileHover="hover"
                whileTap="tap"
              >
                <Button 
                  className="home-secondary-btn info-vis-btn" 
                  shape="rounded" 
                  onClick={() => navigate('/infovis')}
                >
                  信息可视化展板
                </Button>
              </motion.div>
              
              <motion.div
                variants={buttonVariants}
                initial="initial"
                whileHover="hover"
                whileTap="tap"
              >
                <Button 
                  className="home-secondary-btn about-btn" 
                  shape="rounded" 
                  onClick={() => navigate('/about')}
                >
                  关于
                </Button>
              </motion.div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Home;
import React from 'react';
import { Tabs } from 'antd-mobile';
import { motion } from 'framer-motion';
import { useNav } from '../../context/NavContext';
import './index.css';

const TopNav: React.FC = () => {
  const { activePath, handleNavClick } = useNav();

  const tabs = [
    { key: '/', title: '首页' },
    { key: '/overview', title: '概览' },
    { key: '/introduction', title: '何为神码' },
    { key: '/origins', title: '起源发展' },
    { key: '/process', title: '制作过程' },
    { key: '/colors', title: '颜色风格' },
    { key: '/patterns', title: '多种纹样' },
    { key: '/modern-inheritance', title: '当代传承' },
    { key: '/infovis', title: '可视化展板' },
    { key: '/about', title: '关于' },
  ];

  return (
    <motion.div 
      className="top-nav-container"
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2, duration: 0.3 }}
    >
      <Tabs 
        activeKey={activePath} 
        onChange={key => handleNavClick(key)}
        className="custom-tabs"
      >
        {tabs.map(item => (
          <Tabs.Tab title={item.title} key={item.key} />
        ))}
      </Tabs>
    </motion.div>
  );
};

export default TopNav;
import React from 'react';
import { motion } from 'framer-motion';
import { Card, Button, List, Tag } from 'antd-mobile';
import { 
  TeamOutline, 
  EnvironmentOutline, 
  MailOutline, 
  LinkOutline,
  HeartOutline
} from 'antd-mobile-icons';
import Footer from '../../components/Footer';
import { useContent } from '../../context/ContentContext';
import './index.css';

const About: React.FC = () => {
  const { content } = useContent();
  const { about } = content;

  return (
    <div className="about-page-container">
      <div className="about-content">
        {/* Project Intro Section */}
        <motion.div 
          className="about-header"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <img src="/uploads/logo.jpg" alt="Logo" className="about-logo-img" />
          <h1>{about.title}</h1>
          <p className="version">Version 1.0.0</p>
          <p className="description">
            {about.description}
          </p>
        </motion.div>

        {/* Team Section */}
        <motion.div 
          className="info-section"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2, duration: 0.6 }}
        >
          <Card title={<div className="card-title"><TeamOutline /> 开发团队</div>}>
            <div className="team-intro">
              <p>
                {about.team.content}
              </p>
              <div className="tags-group">
                {about.team.tags.map((tag, i) => (
                  <Tag key={i} color="primary" fill="outline">{tag}</Tag>
                ))}
              </div>
            </div>
          </Card>
        </motion.div>

        {/* Contact Section */}
        <motion.div 
          className="info-section"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4, duration: 0.6 }}
        >
          <Card title={<div className="card-title"><EnvironmentOutline /> 联系我们</div>}>
            <List>
              <List.Item prefix={<MailOutline />} extra="contact@nq-shenma.cn">
                官方邮箱
              </List.Item>
              <List.Item prefix={<EnvironmentOutline />} extra="河北省邢台市内丘县">
                地址
              </List.Item>
              <List.Item prefix={<LinkOutline />} extra="Open Source" onClick={() => {}}>
                项目开源
              </List.Item>
            </List>
          </Card>
        </motion.div>

        {/* Acknowledgements */}
        <motion.div 
          className="info-section"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.6, duration: 0.6 }}
        >
          <Card title={<div className="card-title"><HeartOutline /> 特别鸣谢</div>}>
            <div className="thanks-text">
              {about.thanks}
            </div>
            <div className="footer-action">
               <Button color='primary' fill='solid' size='large' block shape='rounded'>
                 分享给朋友
               </Button>
            </div>
          </Card>
        </motion.div>
      </div>

      <Footer />
    </div>
  );
};

export default About;

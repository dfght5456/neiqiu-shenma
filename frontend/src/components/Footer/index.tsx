import React from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  EnvironmentOutline, 
  MailOutline, 
  PhoneFill 
} from 'antd-mobile-icons';
import './index.css';

const Footer: React.FC = () => {
  const navigate = useNavigate();

  const links = [
    { title: '首页', path: '/' },
    { title: '神码概览', path: '/overview' },
    { title: '艺术探秘', path: '/art' },
    { title: '传承之路', path: '/inheritance' },
    { title: '关于我们', path: '/about' },
  ];

  return (
    <footer className="app-footer">
      <div className="footer-content">
        <div className="footer-section brand-section">
          <div className="footer-logo">内丘神码</div>
          <p className="footer-desc">
            河北省非物质文化遗产<br/>
            中国木刻版画的“活化石”<br/>
            传承千年民间信仰与艺术智慧
          </p>
        </div>

        <div className="footer-section links-section">
          <h4>快速导航</h4>
          <div className="footer-links">
            {links.map(link => (
              <span key={link.path} onClick={() => navigate(link.path)} className="footer-link">
                {link.title}
              </span>
            ))}
          </div>
        </div>

        <div className="footer-section contact-section">
          <h4>联系我们</h4>
          <div className="contact-item">
            <EnvironmentOutline /> <span>河北省邢台市内丘县</span>
          </div>
          <div className="contact-item">
            <MailOutline /> <span>contact@nq-shenma.cn</span>
          </div>
          <div className="contact-item">
            <PhoneFill /> <span>0319-1234567</span>
          </div>
        </div>
      </div>
      
      <div className="footer-bottom">
        <p>© 2023 内丘神码数字化展示平台 版权所有</p>
        <p>冀ICP备12345678号 | 传承非遗文化 弘扬民族精神</p>
      </div>
    </footer>
  );
};

export default Footer;
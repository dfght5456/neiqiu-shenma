import React, { useState } from 'react';
import { SpinLoading } from 'antd-mobile';
import Footer from '../../components/Footer';
import './index.css';

const InfoVis: React.FC = () => {
  const [loading, setLoading] = useState(true);

  return (
    <div className="infovis-container">
      {loading && (
        <div className="infovis-loading">
          <SpinLoading color='primary' style={{ '--size': '48px' }} />
          <p>加载中...</p>
        </div>
      )}
      <div className="infovis-content" style={{ opacity: loading ? 0 : 1, transition: 'opacity 0.5s' }}>
        <img 
          src="/uploads/信息可视化.jpg" 
          className="infovis-img" 
          alt="信息可视化展板"
          onLoad={() => setLoading(false)}
        />
      </div>
      {!loading && <Footer />}
    </div>
  );
};

export default InfoVis;

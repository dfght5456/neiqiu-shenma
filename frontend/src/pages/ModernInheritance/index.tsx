import React from 'react';
import { motion } from 'framer-motion';
import { Image, Tag } from 'antd-mobile';
import { RightOutline } from 'antd-mobile-icons';
import Footer from '../../components/Footer';
import { useContent } from '../../context/ContentContext';
import './index.css';

const ModernInheritance: React.FC = () => {
  const { content } = useContent();
  const { modern } = content;

  const getSectionClass = (id: string) => {
    if (id === 'protection') return 'content-section reverse-layout';
    return 'content-section';
  };

  const getBodyClass = (id: string) => {
    if (id === 'creative') return 'section-body card-style vertical-mobile';
    return 'section-body card-style';
  };

  const renderTags = (tags?: string[]) => {
    if (!tags || tags.length === 0) return null;
    return (
      <div className="tags-row" style={{ marginTop: '20px' }}>
         {tags.map((tag, i) => (
           <Tag key={i} color="#b71c1c" style={{ marginRight: '8px' }}>{tag}</Tag>
         ))}
      </div>
    );
  };

  return (
    <div className="modern-container">
      {/* Hero Section */}
      <div className="modern-hero">
        <motion.div 
          className="hero-content"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1>{modern.hero.title}</h1>
          <div className="hero-divider"></div>
          <p>{modern.hero.subtitle}</p>
        </motion.div>
        <div className="hero-bg-overlay"></div>
        <Image src={modern.hero.bgImage} fit="cover" className="hero-bg-img" />
      </div>

      {/* Main Content Sections */}
      <div className="modern-content">
        
        {modern.sections.map((section, index) => (
          <motion.div 
            key={section.id}
            className={getSectionClass(section.id)}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className={`section-header ${section.id === 'protection' ? 'right-align' : ''}`}>
              <span className="section-number">0{index + 1}</span>
              <h2>{section.title}</h2>
            </div>
            
            <div className={getBodyClass(section.id)}>
              {/* Image Logic: depends on layout. 
                  For 'protection' (reverse), image is second in DOM but CSS handles it? 
                  Wait, in original code:
                  Normal: img-col first, text-col second.
                  Reverse: text-col first, img-col second.
                  Creative: text-col first, img-col second (wide).
              */}
              
              {section.id === 'inheritors' && (
                <>
                  <div className="img-col">
                     <div className="img-wrapper portrait">
                       <Image src={section.image} fit="cover" />
                     </div>
                  </div>
                  <div className="text-col">
                    <h3>{section.contentTitle}</h3>
                    <p>{section.content}</p>
                    {section.quote && (
                      <div className="quote-box">{section.quote}</div>
                    )}
                    {renderTags(section.tags)}
                  </div>
                </>
              )}

              {section.id === 'protection' && (
                <>
                  <div className="text-col">
                    <h3>{section.contentTitle}</h3>
                    <p dangerouslySetInnerHTML={{ __html: section.content }}></p>
                    {renderTags(section.tags)}
                  </div>
                  <div className="img-col">
                     <div className="img-wrapper">
                       <Image src={section.image} fit="cover" />
                     </div>
                  </div>
                </>
              )}

              {section.id === 'creative' && (
                <>
                  <div className="text-col">
                    <h3>{section.contentTitle}</h3>
                    <p>{section.content}</p>
                    <div className="link-btn">
                      查看文创产品 <RightOutline />
                    </div>
                  </div>
                  <div className="img-col wide">
                     <div className="img-wrapper wide-img">
                       <Image src={section.image} fit="cover" />
                     </div>
                  </div>
                </>
              )}
            </div>
          </motion.div>
        ))}

      </div>
      <Footer />
    </div>
  );
};

export default ModernInheritance;

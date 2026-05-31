import React from 'react';
import { motion, type Variants } from 'framer-motion';

interface PatternDividerProps {
  pattern: 'wave' | 'twining' | 'dots';
  color?: string;
  width?: string;
  animated?: boolean;
  className?: string;
}

const PatternDivider: React.FC<PatternDividerProps> = ({
  pattern,
  color = 'var(--color-primary)',
  width = '100%',
  animated = false,
  className = '',
}) => {
  const patternContent = {
    wave: (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 30" fill="none" style={{ width: '100%', height: 30 }}>
        <path
          d="M0,15 Q10,5 20,15 T40,15 T60,15 T80,15 T100,15"
          stroke={color}
          strokeWidth="2"
          strokeLinecap="round"
        />
        <path
          d="M0,20 Q10,10 20,20 T40,20 T60,20 T80,20 T100,20"
          stroke={color}
          strokeWidth="1"
          strokeLinecap="round"
          opacity="0.5"
        />
      </svg>
    ),
    twining: (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 80 20" fill="none" style={{ width: '100%', height: 20 }}>
        <path
          d="M0,10 C10,5 20,15 30,10 S50,5 60,10 S80,15 80,10"
          stroke={color}
          strokeWidth="2"
          strokeLinecap="round"
        />
        <circle cx="40" cy="10" r="3" fill={color} />
      </svg>
    ),
    dots: (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 8" fill="none" style={{ width: '100%', height: 8 }}>
        <path
          d="M0,4 L20,4 M25,4 L45,4 M50,4 L70,4 M75,4 L95,4 M100,4 L120,4 M125,4 L145,4 M150,4 L170,4 M175,4 L195,4"
          stroke={color}
          strokeWidth="2"
          strokeLinecap="round"
        />
        <circle cx="22.5" cy="4" r="2" fill={color} />
        <circle cx="47.5" cy="4" r="2" fill={color} />
        <circle cx="72.5" cy="4" r="2" fill={color} />
        <circle cx="97.5" cy="4" r="2" fill={color} />
        <circle cx="122.5" cy="4" r="2" fill={color} />
        <circle cx="147.5" cy="4" r="2" fill={color} />
        <circle cx="172.5" cy="4" r="2" fill={color} />
      </svg>
    ),
  };

  const animationVariants: Variants = {
    initial: { opacity: 0, scaleX: 0 },
    animate: {
      opacity: 1,
      scaleX: 1,
      transition: {
        duration: 0.6,
        ease: 'easeOut',
      },
    },
  };

  return (
    <motion.div
      className={className}
      style={{
        width,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        padding: '16px 0',
      }}
      variants={animationVariants}
      initial={animated ? 'initial' : undefined}
      animate={animated ? 'animate' : undefined}
    >
      {patternContent[pattern]}
    </motion.div>
  );
};

export default PatternDivider;
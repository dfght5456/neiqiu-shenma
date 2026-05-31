import React from 'react';
import { motion, type Variants } from 'framer-motion';

interface PatternBackgroundProps {
  pattern: 'cloud' | 'meander' | 'dots';
  opacity?: number;
  color?: string;
  animated?: boolean;
  className?: string;
}

const PatternBackground: React.FC<PatternBackgroundProps> = ({
  pattern,
  opacity = 0.1,
  color = 'var(--color-primary)',
  animated = false,
  className = '',
}) => {
  const patternDefs = {
    cloud: `
      <pattern id="cloudBg" x="0" y="0" width="60" height="30" patternUnits="userSpaceOnUse">
        <path d="M5,25 Q15,10 30,20 T55,15" stroke="${color}" stroke-width="1" fill="none"/>
      </pattern>
    `,
    meander: `
      <pattern id="meanderBg" x="0" y="0" width="24" height="24" patternUnits="userSpaceOnUse">
        <path d="M3,3 L21,3 L21,21 L3,21 L3,9 L15,9 L15,15 L9,15 L9,9" stroke="${color}" stroke-width="0.8" fill="none"/>
      </pattern>
    `,
    dots: `
      <pattern id="dotsBg" x="0" y="0" width="20" height="20" patternUnits="userSpaceOnUse">
        <circle cx="10" cy="10" r="1" fill="${color}"/>
      </pattern>
    `,
  };

  const animationVariants: Variants = {
    initial: { opacity: 0 },
    animate: {
      opacity,
      transition: {
        duration: 0.8,
        ease: 'easeOut',
      },
    },
  };

  return (
    <motion.svg
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        pointerEvents: 'none',
        zIndex: 0,
      }}
      variants={animationVariants}
      initial={animated ? 'initial' : undefined}
      animate={animated ? 'animate' : undefined}
    >
      <defs>
        {patternDefs[pattern]}
      </defs>
      <rect width="100%" height="100%" fill={`url(#${pattern}Bg)`} opacity={opacity} />
    </motion.svg>
  );
};

export default PatternBackground;
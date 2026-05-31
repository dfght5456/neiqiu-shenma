import React from 'react';
import { motion, type Variants } from 'framer-motion';

interface PatternDecorationProps {
  pattern: 'cloud' | 'meander' | 'wave' | 'peony' | 'twining' | 'star';
  position?: 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right' | 'center';
  size?: 'sm' | 'md' | 'lg';
  color?: string;
  opacity?: number;
  animated?: boolean;
  className?: string;
}

const PatternDecoration: React.FC<PatternDecorationProps> = ({
  pattern,
  position = 'top-right',
  size = 'md',
  color = 'var(--color-primary)',
  opacity = 0.15,
  animated = false,
  className = '',
}) => {
  const sizeMap = {
    sm: 40,
    md: 80,
    lg: 120,
  };

  const positionMap = {
    'top-left': { top: 10, left: 10 },
    'top-right': { top: 10, right: 10 },
    'bottom-left': { bottom: 10, left: 10 },
    'bottom-right': { bottom: 10, right: 10 },
    'center': { top: '50%', left: '50%', transform: 'translate(-50%, -50%)' },
  };

  const patternPaths = {
    cloud: 'M10,40 Q20,20 40,30 T70,25 T90,35 M15,45 Q25,25 45,35 T75,30 T95,40',
    meander: 'M5,5 L35,5 L35,35 L5,35 L5,15 L25,15 L25,25 L15,25 L15,15',
    wave: 'M0,15 Q10,5 20,15 T40,15 T60,15 T80,15 T100,15',
    peony: 'M30,10 Q40,20 30,30 Q20,40 30,50 M10,30 Q20,20 30,30 Q40,40 50,30',
    twining: 'M0,10 C10,5 20,15 30,10 S50,5 60,10 S80,15 80,10',
    star: 'M25,5 L30,15 L40,15 L32,22 L35,32 L25,26 L15,32 L18,22 L10,15 L20,15 Z',
  };

  const viewBoxMap = {
    cloud: '0 0 100 50',
    meander: '0 0 40 40',
    wave: '0 0 100 30',
    peony: '0 0 60 60',
    twining: '0 0 80 20',
    star: '0 0 50 50',
  };

  const animationVariants: Variants = {
    initial: { opacity: 0, scale: 0.8 },
    animate: {
      opacity,
      scale: 1,
      transition: {
        duration: 0.6,
        ease: 'easeOut',
      },
    },
  };

  return (
    <motion.svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox={viewBoxMap[pattern]}
      width={sizeMap[size]}
      height={sizeMap[size]}
      style={{
        position: 'absolute',
        ...positionMap[position],
        color,
        opacity,
        pointerEvents: 'none',
        zIndex: 0,
      }}
      className={className}
      variants={animationVariants}
      initial={animated ? 'initial' : undefined}
      animate={animated ? 'animate' : undefined}
      fill="none"
    >
      <path
        d={patternPaths[pattern]}
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </motion.svg>
  );
};

export default PatternDecoration;
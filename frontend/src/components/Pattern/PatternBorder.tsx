import React from 'react';
import { motion } from 'framer-motion';

interface PatternBorderProps {
  pattern: 'meander' | 'wave' | 'twining';
  position?: 'top' | 'bottom' | 'left' | 'right' | 'all';
  color?: string;
  strokeWidth?: number;
  animated?: boolean;
  className?: string;
  children?: React.ReactNode;
}

const PatternBorder: React.FC<PatternBorderProps> = ({
  pattern,
  position = 'all',
  color = 'var(--color-primary)',
  strokeWidth = 1.5,
  animated = false,
  className = '',
  children,
}) => {
  const patternPaths = {
    meander: 'M3,3 L21,3 L21,21 L3,21 L3,9 L15,9 L15,15 L9,15 L9,9',
    wave: 'M0,15 Q10,5 20,15 T40,15 T60,15 T80,15 T100,15',
    twining: 'M0,10 C10,5 20,15 30,10 S50,5 60,10 S80,15 80,10',
  };

  const viewBoxMap = {
    meander: '0 0 24 24',
    wave: '0 0 100 30',
    twining: '0 0 80 20',
  };

  const animationVariants = {
    initial: { opacity: 0 },
    animate: {
      opacity: 1,
      transition: {
        duration: 0.5,
      },
    },
  };

  const renderBorder = (pos: string) => {
    const borderStyles: Record<string, React.CSSProperties> = {
      top: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        height: 24,
      },
      bottom: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        height: 24,
        transform: 'rotate(180deg)',
      },
      left: {
        position: 'absolute',
        top: 0,
        bottom: 0,
        left: 0,
        width: 24,
        transform: 'rotate(-90deg)',
      },
      right: {
        position: 'absolute',
        top: 0,
        bottom: 0,
        right: 0,
        width: 24,
        transform: 'rotate(90deg)',
      },
    };

    return (
      <motion.svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox={viewBoxMap[pattern]}
        preserveAspectRatio="none"
        style={{
          ...borderStyles[pos],
          color,
          pointerEvents: 'none',
        }}
        variants={animated ? animationVariants : undefined}
        initial={animated ? 'initial' : undefined}
        animate={animated ? 'animate' : undefined}
        fill="none"
      >
        <pattern
          id={`${pattern}-${pos}`}
          x="0"
          y="0"
          width={pattern === 'wave' ? 100 : pattern === 'twining' ? 80 : 24}
          height={pattern === 'wave' ? 30 : pattern === 'twining' ? 20 : 24}
          patternUnits="userSpaceOnUse"
        >
          <path
            d={patternPaths[pattern]}
            stroke="currentColor"
            strokeWidth={strokeWidth}
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </pattern>
        <rect width="100%" height="100%" fill={`url(#${pattern}-${pos})`} />
      </motion.svg>
    );
  };

  const positionsToShow = position === 'all' 
    ? ['top', 'bottom', 'left', 'right'] 
    : [position];

  return (
    <div className={className} style={{ position: 'relative' }}>
      {positionsToShow.map(pos => renderBorder(pos))}
      <div style={{ position: 'relative', zIndex: 1 }}>
        {children}
      </div>
    </div>
  );
};

export default PatternBorder;
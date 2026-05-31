import React from 'react';
import { motion, type Variants } from 'framer-motion';

interface AnimatedCardProps {
  children: React.ReactNode;
  delay?: number;
  className?: string;
  onClick?: () => void;
}

const cardVariants: Variants = {
  hidden: {
    opacity: 0,
    y: 30,
    scale: 0.95,
  },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.5,
      ease: 'easeOut',
    },
  },
  hover: {
    y: -6,
    scale: 1.02,
    transition: {
      duration: 0.3,
      ease: 'easeOut',
    },
  },
  tap: {
    scale: 0.98,
    transition: {
      duration: 0.1,
    },
  },
};

const AnimatedCard: React.FC<AnimatedCardProps> = ({
  children,
  delay = 0,
  className = '',
  onClick,
}) => {
  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      whileHover="hover"
      whileTap={onClick ? "tap" : undefined}
      viewport={{ once: true, amount: 0.2 }}
      variants={cardVariants}
      transition={{ delay }}
      className={className}
      onClick={onClick}
      style={{ cursor: onClick ? 'pointer' : 'default' }}
    >
      {children}
    </motion.div>
  );
};

export default AnimatedCard;
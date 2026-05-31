import React from 'react';
import { motion, type Variants } from 'framer-motion';

interface AnimatedButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  variant?: 'primary' | 'secondary' | 'ghost';
  className?: string;
  disabled?: boolean;
}

const buttonVariants: Variants = {
  initial: {
    scale: 1,
  },
  hover: {
    scale: 1.05,
    y: -2,
    transition: {
      duration: 0.2,
      ease: 'easeOut',
    },
  },
  tap: {
    scale: 0.95,
    y: 0,
    transition: {
      duration: 0.1,
    },
  },
  disabled: {
    scale: 1,
    opacity: 0.6,
  },
};

const AnimatedButton: React.FC<AnimatedButtonProps> = ({
  children,
  onClick,
  variant = 'primary',
  className = '',
  disabled = false,
}) => {
  const baseClassName = `btn-${variant} ${className}`;

  return (
    <motion.button
      variants={buttonVariants}
      initial="initial"
      whileHover={disabled ? 'disabled' : 'hover'}
      whileTap={disabled ? undefined : 'tap'}
      onClick={onClick}
      disabled={disabled}
      className={baseClassName}
      style={{
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {children}
    </motion.button>
  );
};

export default AnimatedButton;
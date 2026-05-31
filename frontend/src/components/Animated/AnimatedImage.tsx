import React, { useState } from 'react';
import { motion, type Variants } from 'framer-motion';

interface AnimatedImageProps {
  src: string;
  alt: string;
  className?: string;
  containerClassName?: string;
}

const imageVariants: Variants = {
  hidden: {
    opacity: 0,
    scale: 1.1,
    filter: 'blur(10px)',
  },
  visible: {
    opacity: 1,
    scale: 1,
    filter: 'blur(0px)',
    transition: {
      duration: 0.6,
      ease: 'easeOut',
    },
  },
  hover: {
    scale: 1.05,
    transition: {
      duration: 0.4,
      ease: 'easeOut',
    },
  },
};

const placeholderVariants: Variants = {
  visible: {
    opacity: 1,
  },
  hidden: {
    opacity: 0,
    transition: {
      duration: 0.3,
    },
  },
};

const AnimatedImage: React.FC<AnimatedImageProps> = ({
  src,
  alt,
  className = '',
  containerClassName = '',
}) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isError, setIsError] = useState(false);

  return (
    <div className={containerClassName} style={{ position: 'relative', overflow: 'hidden' }}>
      {!isLoaded && !isError && (
        <motion.div
          variants={placeholderVariants}
          initial="visible"
          animate={isLoaded ? 'hidden' : 'visible'}
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: 'linear-gradient(90deg, var(--color-neutral-card) 0%, var(--color-neutral-bg) 50%, var(--color-neutral-card) 100%)',
            backgroundSize: '200% 100%',
            animation: 'shimmer 1.5s infinite',
            zIndex: 1,
          }}
        />
      )}
      <motion.img
        src={src}
        alt={alt}
        className={className}
        variants={imageVariants}
        initial="hidden"
        animate={isLoaded ? 'visible' : 'hidden'}
        whileHover="hover"
        onLoad={() => setIsLoaded(true)}
        onError={() => setIsError(true)}
        style={{
          width: '100%',
          height: '100%',
          objectFit: 'cover',
        }}
      />
    </div>
  );
};

export default AnimatedImage;
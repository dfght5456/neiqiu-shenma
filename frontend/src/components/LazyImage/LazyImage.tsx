import React, { useState, useEffect, useRef } from 'react';

interface LazyImageProps {
  src: string;
  alt?: string;
  className?: string;
  style?: React.CSSProperties;
  placeholder?: React.ReactNode;
  threshold?: number;
}

const LazyImage: React.FC<LazyImageProps> = ({
  src,
  alt = '',
  className = '',
  style = {},
  placeholder,
  threshold = 200,
}) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isInView, setIsInView] = useState(false);
  const imgRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
          observer.disconnect();
        }
      },
      {
        rootMargin: `${threshold}px`,
        threshold: 0.1,
      }
    );

    if (imgRef.current) {
      observer.observe(imgRef.current);
    }

    return () => observer.disconnect();
  }, [threshold]);

  const defaultPlaceholder = (
    <div
      style={{
        width: '100%',
        height: '100%',
        background: 'linear-gradient(90deg, var(--color-neutral-card) 0%, var(--color-neutral-bg) 50%, var(--color-neutral-card) 100%)',
        backgroundSize: '200% 100%',
        animation: 'shimmer 1.5s infinite',
        borderRadius: 'inherit',
      }}
    />
  );

  return (
    <div ref={imgRef} className={className} style={{ ...style, overflow: 'hidden' }}>
      {!isLoaded && (placeholder || defaultPlaceholder)}
      {isInView && (
        <img
          src={src}
          alt={alt}
          onLoad={() => setIsLoaded(true)}
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            opacity: isLoaded ? 1 : 0,
            transition: 'opacity 0.5s ease-out',
            display: isLoaded ? 'block' : 'none',
          }}
        />
      )}
    </div>
  );
};

export default LazyImage;
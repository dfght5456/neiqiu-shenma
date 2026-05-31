import React, { useRef, useEffect } from 'react';
import { Outlet, useNavigate, useLocation } from 'react-router-dom';
import { useDrag } from '@use-gesture/react';
import { AnimatePresence, motion, type Variants } from 'framer-motion';
import Header from '../Header';
import TopNav from '../TopNav';
import { NavProvider } from '../../context/NavContext';

const PAGES = [
  '/',
  '/overview',
  '/introduction',
  '/origins',
  '/process',
  '/colors',
  '/patterns',
  '/modern-inheritance',
  '/infovis',
  '/about'
];

const pageVariants: Variants = {
  enter: (direction: number) => ({
    x: direction > 0 ? 80 : direction < 0 ? -80 : 0,
    opacity: 0,
    scale: 0.98,
  }),
  center: {
    x: 0,
    opacity: 1,
    scale: 1,
    transition: {
      x: { type: 'spring', stiffness: 300, damping: 30 },
      opacity: { duration: 0.25 },
      scale: { duration: 0.3 },
    },
  },
  exit: (direction: number) => ({
    x: direction < 0 ? 80 : direction > 0 ? -80 : 0,
    opacity: 0,
    scale: 0.98,
    transition: {
      x: { type: 'spring', stiffness: 300, damping: 30 },
      opacity: { duration: 0.2 },
      scale: { duration: 0.2 },
    },
  }),
};

const swipeConfidenceThreshold = 100;
const swipePower = (offset: number, velocity: number) => {
  return Math.abs(offset) * velocity;
};

const BasicLayout: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const containerRef = useRef<HTMLDivElement>(null);
  const prevPath = useRef(location.pathname);

  const currentIdx = PAGES.indexOf(location.pathname);
  const prevIdx = PAGES.indexOf(prevPath.current);
  let direction = 0;
  if (currentIdx !== -1 && prevIdx !== -1 && currentIdx !== prevIdx) {
    direction = currentIdx > prevIdx ? 1 : -1;
  }

  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    prevPath.current = location.pathname;
    if (contentRef.current) {
      contentRef.current.scrollTop = 0;
    }
  }, [location.pathname]);

  const bind = useDrag(({ movement: [mx], velocity: [vx], direction: [dirX], cancel, active }) => {
    if (active && Math.abs(mx) > swipeConfidenceThreshold) {
      const currentIndex = PAGES.indexOf(location.pathname);
      if (currentIndex === -1) return;

      const power = swipePower(mx, vx);
      
      if (dirX < 0 && power > swipeConfidenceThreshold) {
        if (currentIndex < PAGES.length - 1) {
          navigate(PAGES[currentIndex + 1]);
          cancel();
        }
      } else if (dirX > 0 && power > swipeConfidenceThreshold) {
        if (currentIndex > 0) {
          navigate(PAGES[currentIndex - 1]);
          cancel();
        }
      }
    }
  }, {
    axis: 'x',
    filterTaps: true,
  });

  const isFullBleed = ['/', '/modern-inheritance'].includes(location.pathname);
  const paddingTop = isFullBleed ? '0' : '112px';

  return (
    <NavProvider>
      <div 
        style={{ height: '100vh', display: 'flex', flexDirection: 'column', touchAction: 'pan-y', overflow: 'hidden' }}
        {...bind()}
        ref={containerRef}
      >
        <motion.div 
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.3, ease: 'easeOut' }}
          style={{ 
            position: 'fixed', 
            top: 0, 
            left: 0, 
            right: 0, 
            zIndex: 1000,
            boxShadow: '0 2px 8px rgba(0,0,0,0.05)'
          }}
        >
          <Header />
          <TopNav />
        </motion.div>
        <div 
          ref={contentRef}
          style={{ flex: 1, paddingTop, position: 'relative', overflowY: 'auto', overflowX: 'hidden', touchAction: 'pan-y' }}
        >
          <AnimatePresence mode="wait" custom={direction} initial={false}>
            <motion.div
              key={location.pathname}
              custom={direction}
              variants={pageVariants}
              initial="enter"
              animate="center"
              exit="exit"
              style={{ height: '100%', width: '100%' }}
            >
              <Outlet />
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </NavProvider>
  );
};

export default BasicLayout;
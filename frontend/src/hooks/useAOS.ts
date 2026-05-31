import { useEffect } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';

const useAOS = () => {
  useEffect(() => {
    AOS.init({
      offset: 80,
      duration: 600,
      easing: 'ease-out-cubic',
      once: true,
      anchorPlacement: 'top-bottom',
      disable: window.innerWidth < 768 ? 'mobile' : false,
    });

    AOS.refresh();

    const handleResize = () => {
      AOS.refresh();
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);
};

export default useAOS;
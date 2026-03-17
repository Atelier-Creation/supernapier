import React, {
  useEffect,
  useRef,
  useState,
  useCallback,
} from 'react';
import { motion } from 'framer-motion';

const ScrollExpandMedia = ({
  mediaType = 'video',
  mediaSrc,
  posterSrc,
  bgImageSrc,
  title,
  date,
  scrollToExpand,
  textBlend,
  children,
}) => {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [showContent, setShowContent] = useState(false);
  const [mediaFullyExpanded, setMediaFullyExpanded] = useState(false);
  const [touchStartY, setTouchStartY] = useState(0);
  const [isMobileState, setIsMobileState] = useState(false);

  const [duration, setDuration] = useState(0);
  const sectionRef = useRef(null);
  const videoRef = useRef(null);

  useEffect(() => {
    setScrollProgress(0);
    setShowContent(false);
    setMediaFullyExpanded(false);
  }, [mediaType]);

  // Handle video playback based on scroll
  useEffect(() => {
    if (videoRef.current && mediaType === 'video') {
      if (scrollProgress > 0.01) {
        if (videoRef.current.paused) {
          videoRef.current.play().catch((err) => {
            console.log("Video play failed:", err);
          });
        }
      } else {
        if (!videoRef.current.paused) {
          videoRef.current.pause();
          videoRef.current.currentTime = 0;
        }
      }
    }
  }, [scrollProgress > 0.01, mediaType]);

  useEffect(() => {
    const handleWheel = (e) => {
      if (mediaFullyExpanded && e.deltaY < 0 && window.scrollY <= 5) {
        setMediaFullyExpanded(false);
        e.preventDefault();
      } else if (!mediaFullyExpanded) {
        e.preventDefault();
        const scrollDelta = e.deltaY * 0.0009;
        const newProgress = Math.min(
          Math.max(scrollProgress + scrollDelta, 0),
          1
        );
        setScrollProgress(newProgress);

        if (newProgress >= 1) {
          setMediaFullyExpanded(true);
          setShowContent(true);
        } else if (newProgress < 0.75) {
          setShowContent(false);
        }
      }
    };

    const handleTouchStart = (e) => {
      setTouchStartY(e.touches[0].clientY);
    };

    const handleTouchMove = (e) => {
      if (!touchStartY) return;

      const touchY = e.touches[0].clientY;
      const deltaY = touchStartY - touchY;

      if (mediaFullyExpanded && deltaY < -20 && window.scrollY <= 5) {
        setMediaFullyExpanded(false);
        e.preventDefault();
      } else if (!mediaFullyExpanded) {
        e.preventDefault();
        const scrollFactor = deltaY < 0 ? 0.008 : 0.005;
        const scrollDelta = deltaY * scrollFactor;
        const newProgress = Math.min(
          Math.max(scrollProgress + scrollDelta, 0),
          1
        );
        setScrollProgress(newProgress);

        if (newProgress >= 1) {
          setMediaFullyExpanded(true);
          setShowContent(true);
        } else if (newProgress < 0.75) {
          setShowContent(false);
        }

        setTouchStartY(touchY);
      }
    };

    const handleTouchEnd = () => {
      setTouchStartY(0);
    };

    const handleScroll = () => {
      if (!mediaFullyExpanded) {
        window.scrollTo(0, 0);
      }
    };

    window.addEventListener('wheel', handleWheel, { passive: false });
    window.addEventListener('scroll', handleScroll);
    window.addEventListener('touchstart', handleTouchStart, { passive: false });
    window.addEventListener('touchmove', handleTouchMove, { passive: false });
    window.addEventListener('touchend', handleTouchEnd);

    return () => {
      window.removeEventListener('wheel', handleWheel);
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('touchstart', handleTouchStart);
      window.removeEventListener('touchmove', handleTouchMove);
      window.removeEventListener('touchend', handleTouchEnd);
    };
  }, [scrollProgress, mediaFullyExpanded, touchStartY]);

  useEffect(() => {
    const checkIfMobile = () => {
      setIsMobileState(window.innerWidth < 768);
    };

    checkIfMobile();
    window.addEventListener('resize', checkIfMobile);

    return () => window.removeEventListener('resize', checkIfMobile);
  }, []);

  const mediaWidth = scrollProgress * (isMobileState ? 950 : 1550);
  const mediaHeight = scrollProgress * (isMobileState ? 750 : 800);
  const textTranslateX = scrollProgress * (isMobileState ? 180 : 150);

  const firstWord = title ? title.split(' ')[0] : '';
  const restOfTitle = title ? title.split(' ').slice(1).join(' ') : '';

  return (
    <div
      ref={sectionRef}
      className='transition-colors duration-700 ease-in-out overflow-x-hidden'
    >
      <section className='relative flex flex-col items-center justify-start min-h-[90dvh]'>
        <div className='relative w-full flex flex-col items-center min-h-[90dvh]'>
          <motion.div
            className='absolute inset-0 z-0 h-full'
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 - scrollProgress }}
            transition={{ duration: 0.1 }}
          >
            <img
              src={bgImageSrc}
              alt='Background'
              className='w-screen h-screen object-cover object-center'
            />
            <div className='absolute inset-0 bg-black/10' />
          </motion.div>

          {/* Center Background Media Wrapper */}
          <div className={`absolute inset-0 z-0 flex ${scrollProgress >= 1 ? 'items-baseline' : 'items-center'} justify-center pointer-events-none overflow-hidden`}>
            <div
              className='relative transition-none overflow-hidden pointer-events-auto'
              style={{
                width: `${mediaWidth}px`,
                height: `${mediaHeight}px`,
                maxWidth: '100vw',
                maxHeight: '100vh',
                boxShadow: scrollProgress < 0.98 ? '0px 0px 50px rgba(0, 0, 0, 0.3)' : 'none',
                opacity: Math.min(1, scrollProgress * 2),
                transform: `scale(${0.5 + scrollProgress * 0.5})`,
                borderRadius: `${(1 - scrollProgress) * 24}px`,
              }}
            >
              {mediaType === 'video' ? (
                mediaSrc.includes('youtube.com') || mediaSrc.includes('youtu.be') ? (
                  <div className='relative w-full h-full pointer-events-none'>
                    <iframe
                      width='100%'
                      height='100%'
                      src={
                        mediaSrc.includes('embed')
                          ? mediaSrc + (mediaSrc.includes('?') ? '&' : '?') + 'autoplay=1&mute=1&loop=1&controls=0&showinfo=0&rel=0&disablekb=1&modestbranding=1'
                          : mediaSrc.replace('watch?v=', 'embed/') + '?autoplay=1&mute=1&loop=1&controls=0&showinfo=0&rel=0&disablekb=1&modestbranding=1&playlist=' + (mediaSrc.split('v=')[1] || '')
                      }
                      className='w-full h-full rounded-xl'
                      frameBorder='0'
                      allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture'
                      allowFullScreen
                    />
                    <motion.div
                      className='absolute inset-0 bg-black/30 rounded-xl'
                      initial={{ opacity: 0.7 }}
                      animate={{ opacity: 0.5 - scrollProgress * 0.3 }}
                      transition={{ duration: 0.2 }}
                    />
                  </div>
                ) : (
                  <div className='relative w-full h-full pointer-events-none'>
                    <video
                      ref={videoRef}
                      src={mediaSrc}
                      poster={posterSrc}
                      onLoadedMetadata={() => setDuration(videoRef.current?.duration || 0)}
                      muted
                      playsInline
                      preload='auto'
                      className='w-full h-full object-cover rounded-xl'
                      controls={false}
                    />
                    <motion.div
                      className='absolute inset-0 bg-black/30 rounded-xl'
                      initial={{ opacity: 0.7 }}
                      animate={{ opacity: 0.5 - scrollProgress * 0.3 }}
                      transition={{ duration: 0.2 }}
                    />
                  </div>
                )
              ) : (
                <div className='relative w-full h-full'>
                  <img
                    src={mediaSrc}
                    alt={title || 'Media content'}
                    className='w-full h-full object-cover rounded-xl'
                  />
                  <motion.div
                    className='absolute inset-0 bg-black/50 rounded-xl'
                    initial={{ opacity: 0.7 }}
                    animate={{ opacity: 0.7 - scrollProgress * 0.3 }}
                    transition={{ duration: 0.2 }}
                  />
                </div>
              )}

              <div className='absolute inset-0 flex flex-col items-center justify-end text-center z-30 pointer-events-none transition-none'>
                {date && (
                  <p
                    className='text-2xl text-white/80 font-medium tracking-widest'
                    style={{ transform: `translateX(-${textTranslateX}vw)` }}
                  >
                    {date}
                  </p>
                )}
                {scrollToExpand && (
                  <p
                    className='text-white/80 font-medium tracking-widest mt-2'
                    style={{ transform: `translateX(${textTranslateX}vw)` }}
                  >
                    {scrollToExpand}
                  </p>
                )}
              </div>

              {/* Animated Scroll Hint */}
              <motion.div
                initial={{ opacity: 1 }}
                animate={{ opacity: 1 - scrollProgress * 2 }}
                className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 pointer-events-none z-30"
              >
                  <div className="w-[30px] h-[50px] border-2 border-white/50 rounded-full flex justify-center p-1.5">
                      <motion.div 
                          animate={{ y: [0, 15, 0] }}
                          transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                          className="w-1.5 h-1.5 bg-white rounded-full"
                      />
                  </div>
              </motion.div>
            </div>
          </div>

          <div className='container mx-auto flex flex-col items-center justify-start relative z-10'>
            <div className='flex flex-col items-center justify-center w-full h-[100dvh] relative'>
              <div
                className={`flex items-center justify-center text-center gap-4 w-full relative z-30 transition-none flex-col pointer-events-none text-white ${
                   textBlend ? 'mix-blend-difference' : 'mix-blend-normal'
                }`}
              >
                <motion.h2
                  className='text-5xl md:text-7xl lg:text-9xl font-black uppercase tracking-tighter leading-tight'
                  style={{ transform: `translateX(-${textTranslateX}vw)` }}
                >
                  {firstWord}
                </motion.h2>
                <motion.h2
                  className='text-5xl md:text-7xl lg:text-9xl font-black uppercase tracking-tighter leading-tight'
                  style={{ transform: `translateX(${textTranslateX}vw)` }}
                >
                  {restOfTitle}
                </motion.h2>
              </div>
            </div>

            <motion.div
              className='flex flex-col w-full px-8 py-10 md:px-16 lg:py-20 relative z-20'
              initial={{ opacity: 0 }}
              animate={{ opacity: showContent ? 1 : 0 }}
              transition={{ duration: 0.7 }}
            >
              {children}
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ScrollExpandMedia;

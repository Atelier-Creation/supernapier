import React, {
  useEffect,
  useRef,
  useState,
  useCallback,
} from 'react';
import { motion, AnimatePresence, useMotionValue, useSpring, useTransform } from 'framer-motion';

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
  onFullyExpanded,
  onVideoEnded,
  mediaXOffset = 0,
  sliderImages = [],
  sliderIndex = 0,
  overlayContent,
  lockScroll = false,
}) => {
  const progress = useMotionValue(0);
  const smoothProgress = useSpring(progress, {
    damping: 30,
    stiffness: 120,
    mass: 0.5,
  });

  const [scrollProgress, setScrollProgress] = useState(0); // Kept for threshold-dependent React state
  const [showContent, setShowContent] = useState(false);
  const [mediaFullyExpanded, setMediaFullyExpanded] = useState(false);
  const [touchStartY, setTouchStartY] = useState(0);
  const [isMobileState, setIsMobileState] = useState(false);

  const [duration, setDuration] = useState(0);
  const sectionRef = useRef(null);
  const videoRef = useRef(null);

  useEffect(() => {
    progress.set(0);
    setScrollProgress(0);
    setShowContent(false);
    setMediaFullyExpanded(false);
  }, [mediaType]);

  // Sync React state with smoothMotionValue for non-animation logic (thresholds, etc.)
  useEffect(() => {
    const unsubscribe = smoothProgress.on('change', (v) => {
      setScrollProgress(v);
      if (v >= 0.99 && !mediaFullyExpanded) {
        setMediaFullyExpanded(true);
        setShowContent(true);
        if (onFullyExpanded) onFullyExpanded();
      } else if (v < 0.75 && showContent) {
        setShowContent(false);
      }
    });
    return () => unsubscribe();
  }, [mediaFullyExpanded, showContent, onFullyExpanded]);

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
      if (isMobileState) return;
      
      const isAtTop = window.scrollY < 20;

      // Only capture wheel events if we are near the top of the page.
      // This prevents the intro from 'reverse animating' while we are scrolling
      // other sections deeper down.
      if (!isAtTop && mediaFullyExpanded) return;
      if (!isAtTop && !mediaFullyExpanded) return;

      if (mediaFullyExpanded && e.deltaY < 0 && !lockScroll && window.scrollY <= 5) {
        // Only allow shrinking if scroll is NOT locked
        setMediaFullyExpanded(false);
        e.preventDefault();
      } else if (mediaFullyExpanded && e.deltaY < 0 && lockScroll) {
        // Prevent scrolling up if locked
        e.preventDefault();
      } else if (!mediaFullyExpanded) {
        e.preventDefault();
        const scrollDelta = e.deltaY * (isMobileState ? 0.005 : 0.0009);
        const newProgress = Math.min(
          Math.max(progress.get() + scrollDelta, 0),
          1
        );
        progress.set(newProgress);
      } else if (lockScroll && e.deltaY > 0) {
        e.preventDefault();
      }
    };

    const handleTouchStart = (e) => {
      setTouchStartY(e.touches[0].clientY);
    };

    const handleTouchMove = (e) => {
      if (!touchStartY) return;

      const touchY = e.touches[0].clientY;
      const deltaY = touchStartY - touchY;

      if (mediaFullyExpanded && deltaY < -20 && !lockScroll && window.scrollY <= 5) {
        // Only allow shrinking if scroll is NOT locked
        setMediaFullyExpanded(false);
        e.preventDefault();
      } else if (mediaFullyExpanded && deltaY < -20 && lockScroll) {
        // Prevent scrolling up if locked
        e.preventDefault();
      } else if (!mediaFullyExpanded) {
        e.preventDefault();
        const scrollFactor = deltaY < 0 ? 0.008 : 0.005;
        const scrollDelta = deltaY * scrollFactor;
        const newProgress = Math.min(
          Math.max(progress.get() + scrollDelta, 0),
          1
        );
        progress.set(newProgress);

        setTouchStartY(touchY);
      } else if (lockScroll && deltaY > 0) {
        e.preventDefault();
      }
    };

    const handleTouchEnd = () => {
      setTouchStartY(0);
    };

    const handleScroll = () => {
      // Only snap to top if we are actually at the top AND either intro phase or locked.
      // If scrollY is > 100, we are browsing down, so don't trap the user.
      if ((!mediaFullyExpanded || lockScroll) && window.scrollY > 0 && window.scrollY < 100) {
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
  }, [scrollProgress, mediaFullyExpanded, touchStartY, lockScroll]);

  useEffect(() => {
    const checkIfMobile = () => {
      setIsMobileState(window.innerWidth < 768);
    };

    checkIfMobile();
    window.addEventListener('resize', checkIfMobile);

    return () => window.removeEventListener('resize', checkIfMobile);
  }, []);

  const mediaWidth = useTransform(smoothProgress, [0, 1], [0, isMobileState ? 950 : 1550]);
  const mediaHeight = useTransform(smoothProgress, [0, 1], [0, isMobileState ? 750 : 800]);
  const textTranslateX = useTransform(smoothProgress, [0, 1], [0, isMobileState ? 180 : 150]);
  const textTranslateXNegative = useTransform(smoothProgress, [0, 1], [0, isMobileState ? -180 : -150], { unit: 'vw' });
  const textTranslateXPositive = useTransform(smoothProgress, [0, 1], [0, isMobileState ? 180 : 150], { unit: 'vw' });
  const mediaScale = useTransform(smoothProgress, [0, 1], [0.5, 1]);
  const borderRadius = useTransform(smoothProgress, [0, 1], [24, 0]);
  const wrapperOpacity = useTransform(smoothProgress, [0, 0.5], [0, 1]);
  const bgOpacity = useTransform(smoothProgress, [0, 1], [1, 0]);
  const hintOpacity = useTransform(smoothProgress, [0, 0.5], [1, 0]);
  const titleOpacity = useTransform(smoothProgress, [0, 0.95], [1, 0]);

  const firstWord = title ? title.split(' ')[0] : '';
  const restOfTitle = title ? title.split(' ').slice(1).join(' ') : '';

  return (
    <div
      ref={sectionRef}
      className="transition-colors duration-700 ease-in-out overflow-x-hidden"
    >
      <section className="relative flex flex-col items-center justify-start min-h-[90dvh]">
        <div className="relative w-full flex flex-col items-center min-h-[90dvh]">
          {overlayContent}
          <motion.div
            className="absolute inset-0 z-0 h-full"
            initial={{ opacity: 0 }}
            style={{ opacity: bgOpacity }}
            transition={{ duration: 0.1 }}
          >
            <img
              src={bgImageSrc}
              alt="Background"
              className="w-screen h-screen object-cover object-center"
            />
            <div className="absolute inset-0 bg-black/10" />
          </motion.div>

          {/* Center Background Media Wrapper */}
          <div className={`absolute inset-0 z-0 flex ${scrollProgress >= 1 ? 'items-baseline' : 'items-center'} justify-center pointer-events-none overflow-hidden`}>
            <motion.div
              className="relative transition-none overflow-hidden pointer-events-auto"
              style={{
                width: mediaWidth,
                height: mediaHeight,
                maxWidth: '100vw',
                maxHeight: '100vh',
                boxShadow: scrollProgress < 0.98 ? '0px 0px 50px rgba(0, 0, 0, 0.3)' : 'none',
                opacity: wrapperOpacity,
                scale: mediaScale,
                translateX: mediaXOffset,
                borderRadius: borderRadius,
              }}
            >
              {mediaType === 'video' ? (
                <div className="relative w-full h-full pointer-events-none">
                  <video
                    ref={videoRef}
                    src={mediaSrc}
                    poster={posterSrc}
                    onLoadedMetadata={() => setDuration(videoRef.current?.duration || 0)}
                    muted
                    playsInline
                    preload="auto"
                    className="w-full h-full object-cover rounded-xl"
                    controls={false}
                    onEnded={onVideoEnded}
                  />
                  <motion.div
                    className="absolute inset-0 bg-black/30 rounded-xl"
                    initial={{ opacity: 0.7 }}
                    animate={{ opacity: 0.5 - scrollProgress * 0.3 }}
                    transition={{ duration: 0.2 }}
                  />
                </div>
              ) : mediaType === 'slider' ? (
                <div className="relative w-full h-full">
                  <AnimatePresence mode="popLayout">
                    <motion.img
                      key={sliderIndex}
                      initial={{ opacity: 0, scale: 1.05 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 1.5, ease: 'easeOut' }}
                      src={sliderImages[sliderIndex]}
                      alt={`Slider ${sliderIndex}`}
                      className="absolute inset-0 w-full h-full object-cover"
                    />
                  </AnimatePresence>
                  <div className="absolute inset-0 bg-black/20" />
                </div>
              ) : (
                <div className="relative w-full h-full">
                  <img
                    src={mediaSrc}
                    alt={title || 'Media content'}
                    className="w-full h-full object-cover rounded-xl"
                  />
                  <motion.div
                    className="absolute inset-0 bg-black/50 rounded-xl"
                    initial={{ opacity: 0.7 }}
                    animate={{ opacity: 0.7 - scrollProgress * 0.3 }}
                    transition={{ duration: 0.2 }}
                  />
                </div>
              )}

              <div className="absolute inset-0 flex flex-col items-center justify-end text-center z-30 pointer-events-none transition-none">
                {date && (
                  <motion.p
                    className="text-2xl text-white/80 font-medium tracking-widest"
                    style={{ x: textTranslateXNegative }}
                  >
                    {date}
                  </motion.p>
                )}
                {scrollToExpand && (
                  <motion.p
                    className="text-white/80 font-medium tracking-widest mt-2"
                    style={{ x: textTranslateXPositive }}
                  >
                    {scrollToExpand}
                  </motion.p>
                )}
              </div>

              {/* Animated Scroll Hint */}
              <motion.div
                style={{ opacity: hintOpacity }}
                className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 pointer-events-none z-30"
              >
                <div className="w-[30px] h-[50px] border-2 border-white/50 rounded-full flex justify-center p-1.5">
                  <motion.div
                    animate={{ y: [0, 15, 0] }}
                    transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
                    className="w-1.5 h-1.5 bg-white rounded-full"
                  />
                </div>
              </motion.div>
            </motion.div>
          </div>

          <div className="container mx-auto flex flex-col items-center justify-start relative z-10">
            <div className="flex flex-col items-center justify-center w-full h-[100dvh] relative">
              <div
                className={`flex items-center justify-center text-center gap-4 w-full relative z-30 transition-none flex-col pointer-events-none text-white ${textBlend ? 'mix-blend-difference' : 'mix-blend-normal'
                  }`}
              >
                <motion.h2
                  className="text-5xl md:text-7xl lg:text-9xl font-black uppercase tracking-tighter leading-tight"
                  style={{ x: textTranslateXNegative, opacity: titleOpacity }}
                >
                  {firstWord}
                </motion.h2>
                <motion.h2
                  className="text-5xl md:text-7xl lg:text-9xl font-black uppercase tracking-tighter leading-tight"
                  style={{ x: textTranslateXPositive, opacity: titleOpacity }}
                >
                  {restOfTitle}
                </motion.h2>
              </div>
            </div>

            <motion.div
              className="flex flex-col w-full px-8 py-10 md:px-16 lg:py-20 relative z-20"
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

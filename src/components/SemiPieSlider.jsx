import React, { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

/**
 * SemiPieSlider — Premium half-pie segmented slider
 *
 * Props:
 * - segments:          Array<{ id, image, title, subtitle }>
 * - activeIdx:         number (optional, controlled from parent)
 * - onSegmentChange:   (idx: number) => void (optional, controlled mode)
 * - autoPlayInterval:  number (ms, default 3000)
 * - className:         string
 * - centerLogo:        string (optional)
 * - centerLabel:       string (optional)
 */
const SemiPieSlider = ({
  segments = [],
  activeIdx: externalActiveIdx,
  onSegmentChange,
  autoPlayInterval = 3000,
  className = '',
  centerLogo = null,
  centerLabel = '',
}) => {
  const [internalIdx, setInternalIdx] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const intervalRef = useRef(null);

  const isControlled = externalActiveIdx !== undefined;
  const activeIdx = isControlled ? externalActiveIdx : internalIdx;

  const startAutoPlay = useCallback(() => {
    if (intervalRef.current) clearInterval(intervalRef.current);
    if (isControlled) return;
    intervalRef.current = setInterval(() => {
      setInternalIdx((prev) => (prev + 1) % segments.length);
    }, autoPlayInterval);
  }, [isControlled, segments.length, autoPlayInterval]);

  useEffect(() => {
    if (!isHovered) startAutoPlay();
    else clearInterval(intervalRef.current);
    return () => clearInterval(intervalRef.current);
  }, [isHovered, startAutoPlay]);

  const handleSegmentClick = (idx) => {
    if (isControlled && onSegmentChange) {
      onSegmentChange(idx);
    } else {
      setInternalIdx(idx);
      startAutoPlay();
    }
  };

  if (!segments.length) return null;

  // ─── Geometry ────────────────────────────────────────────────────────────
  const N = segments.length;
  const RADIUS = 300;       // outer radius
  const INNER_R = 100;      // inner hole — larger = wider, plumper arcs
  const GAP_DEG = 1.8;      // degree gap between segments for clean separation

  // SVG viewport — fan sits at bottom, arcs extend upward
  // CX, CY = pivot point (center of the donut, bottom of the fan)
  const VW = RADIUS * 2;            // 500
  const VH = RADIUS + INNER_R + 16; // accommodates circle below and fan above

  const CX = RADIUS;   // 250
  const CY = RADIUS;   // 250 — pivot in SVG coords

  // Spread: 175° instead of 180° so there's no flush edge at sides
  const SPREAD = 175;
  const START_OFFSET = (180 - SPREAD) / 2; // 2.5° padding on each side
  const SLICE = SPREAD / N;

  // Polar to Cartesian from pivot
  // angleDeg=0 → left, angleDeg=SPREAD → right, fanning upward
  const polar = (angleDeg, r) => {
    const mapped = 180 - START_OFFSET - angleDeg;
    const rad = (mapped * Math.PI) / 180;
    return {
      x: CX + r * Math.cos(rad),
      y: CY - r * Math.sin(rad),
    };
  };

  // Build arc path for one segment with a small gap on each side
  const slicePath = (idx, shrinkDeg = 0) => {
    const s = idx * SLICE + shrinkDeg;
    const e = (idx + 1) * SLICE - shrinkDeg;
    const outerR = RADIUS - 2;   // slight inner padding from SVG edge
    const o0 = polar(s, outerR);
    const o1 = polar(e, outerR);
    const i0 = polar(s, INNER_R);
    const i1 = polar(e, INNER_R);
    const la = (e - s) > 180 ? 1 : 0;
    return [
      `M ${i0.x.toFixed(2)} ${i0.y.toFixed(2)}`,
      `L ${o0.x.toFixed(2)} ${o0.y.toFixed(2)}`,
      `A ${outerR} ${outerR} 0 ${la} 0 ${o1.x.toFixed(2)} ${o1.y.toFixed(2)}`,
      `L ${i1.x.toFixed(2)} ${i1.y.toFixed(2)}`,
      `A ${INNER_R} ${INNER_R} 0 ${la} 1 ${i0.x.toFixed(2)} ${i0.y.toFixed(2)}`,
      'Z',
    ].join(' ');
  };

  // Mid-point for scale pivot
  const midPoint = (idx) => {
    const midAngle = (idx + 0.5) * SLICE;
    return polar(midAngle, (RADIUS + INNER_R) / 2);
  };

  return (
    <div
      className={`flex flex-col items-center select-none ${className}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* ── Aspect-ratio locked container so overlay aligns with SVG ──────── */}
      <div
        className="relative w-full"
        style={{ maxWidth: VW, paddingBottom: `${(VH / VW) * 100}%` }}
      >
        <div className="absolute inset-0">

          {/* ── SVG ──────────────────────────────────────────────────────── */}
          <svg
            viewBox={`0 0 ${VW} ${VH}`}
            width="100%"
            height="100%"
            style={{ overflow: 'visible' }}
          >
            <defs>
              {/* Clip paths with gap so images are clipped precisely */}
              {segments.map((_, idx) => (
                <clipPath key={idx} id={`sps-clip-${idx}`}>
                  <path d={slicePath(idx, GAP_DEG / 2)} />
                </clipPath>
              ))}

              {/* Drop shadow filter for segments */}
              <filter id="segShadow" x="-10%" y="-10%" width="120%" height="130%">
                <feDropShadow dx="0" dy="4" stdDeviation="6" floodColor="rgba(0,0,0,0.18)" />
              </filter>

              {/* Center circle gradient */}
              <radialGradient id="centerGrad" cx="50%" cy="35%" r="70%">
                <stop offset="0%" stopColor="#ffffff" />
                <stop offset="100%" stopColor="#fdfcecff" />
              </radialGradient>

              {/* Active glow filter */}
              <filter id="activeGlow">
                <feDropShadow dx="0" dy="0" stdDeviation="8" floodColor="rgba(22,163,74,0.4)" />
              </filter>
            </defs>

            {/* ── Segments ─────────────────────────────────────────────── */}
            {segments.map((seg, idx) => {
              const isActive = idx === activeIdx;
              const mid = midPoint(idx);

              return (
                <g
                  key={seg.id ?? idx}
                  style={{
                    cursor: 'pointer',
                    transformOrigin: `${CX}px ${CY}px`,
                    transform: isActive ? 'scale(1.04)' : 'scale(0.985)',
                    transition: 'transform 0.55s cubic-bezier(0.34,1.4,0.64,1)',
                  }}
                  onClick={() => handleSegmentClick(idx)}
                >
                  {/* Segment background (for gap color) */}
                  <path
                    d={slicePath(idx, 0)}
                    fill="white"
                  />

                  {/* Image clipped to this segment */}
                  <image
                    href={seg.image}
                    x={0} y={0}
                    width={VW} height={VH}
                    preserveAspectRatio="xMidYMid slice"
                    clipPath={`url(#sps-clip-${idx})`}
                    style={{
                      opacity: isActive ? 1 : 0.55,
                      transition: 'opacity 0.8s ease',
                      filter: isActive
                        ? 'brightness(1.08) saturate(1.1)'
                        : 'brightness(0.72) saturate(0.8) grayscale(0.1)',
                    }}
                  />

                  {/* Color grade overlay per segment */}
                  <path
                    d={slicePath(idx, GAP_DEG / 2)}
                    fill={isActive ? 'rgba(240, 236, 16, 0.12)' : 'rgba(22,101,52,0.28)'}
                    style={{ pointerEvents: 'none', transition: 'fill 0.5s ease' }}
                  />

                  {/* Active: bright green border */}
                  {isActive && (
                    <path
                      d={slicePath(idx, GAP_DEG / 2)}
                      fill="none"
                      stroke="rgba(240, 218, 16, 1)"
                      strokeWidth="3"
                      filter="url(#activeGlow)"
                      style={{ pointerEvents: 'none' }}
                    />
                  )}

                  {/* All segments: subtle outer border */}
                  {!isActive && (
                    <path
                      d={slicePath(idx, GAP_DEG / 2)}
                      fill="none"
                      stroke="rgba(255, 255, 255, 1)"
                      strokeWidth="2"
                      style={{ pointerEvents: 'none' }}
                    />)}
                </g>
              );
            })}

            {/* ── Center donut circle ───────────────────────────────────── */}
            {/* Shadow ring */}
            <circle cx={CX} cy={CY} r={INNER_R + 2}
              fill="rgba(0,0,0,0.08)"
            />
            {/* Main white fill */}
            <circle cx={CX} cy={CY} r={INNER_R - 1}
              fill="url(#centerGrad)"
            />
            {/* Green accent ring */}
            <circle cx={CX} cy={CY} r={INNER_R - 1}
              fill="none"
              stroke="#facc15"
              strokeWidth="3.5"
            />
            {/* Inner subtle ring */}
            <circle cx={CX} cy={CY} r={INNER_R - 8}
              fill="none"
              stroke="rgba(163, 142, 22, 0.2)"
              strokeWidth="1"
            />
          </svg>

          {/* ── Center Content Overlay ─────────────────────────────────────
              Positioned at (CX/VW, CY/VH) = exactly the donut center
          ──────────────────────────────────────────────────────────────── */}
          <div
            className="absolute flex flex-col items-center justify-center text-center"
            style={{
              left: `${(CX / VW) * 100}%`,
              top: `${(CY / VH) * 100}%`,
              transform: 'translate(-50%, -50%)',
              width: `${(((INNER_R - 12) * 2) / VW) * 100}%`,
              pointerEvents: 'none',
            }}
          >


            <AnimatePresence mode="wait">
              <motion.div
                key={activeIdx}
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -6 }}
                transition={{ duration: 0.4, ease: 'easeInOut' }}
                className="flex flex-col items-center gap-0.5 w-full"
              >
                {/* Active segment number indicator */}
                <span
                  className="font-black text-[#facc15] block"
                  style={{ fontSize: 'clamp(5px,1.5vw,11px)', letterSpacing: '0.05em' }}
                >
                  {String(activeIdx + 1).padStart(2, '0')}/{String(segments.length).padStart(2, '0')}
                </span>

                <span
                  className="font-black text-gray-800 leading-tight block"
                  style={{ fontSize: 'clamp(7px, 1.9vw, 15px)', lineHeight: 1.2 }}
                >
                  {segments[activeIdx]?.title}
                </span>

                {segments[activeIdx]?.subtitle && (
                  <span
                    className="text-[#facc15] font-semibold block leading-tight"
                    style={{ fontSize: 'clamp(5px, 1.3vw, 10px)' }}
                  >
                    {segments[activeIdx].subtitle}
                  </span>
                )}

                {centerLabel && (
                  <span
                    className="text-gray-400 font-bold uppercase tracking-widest block mt-0.5"
                    style={{ fontSize: 'clamp(4px, 0.9vw, 8px)' }}
                  >
                    {centerLabel}
                  </span>
                )}
                {centerLogo && (
                  <img src={centerLogo} alt="logo"
                    className="object-contain mb-1"
                    style={{ width: '50%' }}
                  />
                )}
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>

      {/* ── Dot Navigation ──────────────────────────────────────────────── */}
      {/* <div className="flex items-center gap-2 mt-3">
        {segments.map((seg, idx) => (
          <button
            key={idx}
            onClick={() => handleSegmentClick(idx)}
            title={seg.title}
            className={`rounded-full transition-all duration-300 ${
              idx === activeIdx
                ? 'w-7 h-2 bg-green-600 shadow shadow-green-200'
                : 'w-2 h-2 bg-gray-300 hover:bg-green-400'
            }`}
          />
        ))}
      </div> */}
    </div>
  );
};

export default SemiPieSlider;

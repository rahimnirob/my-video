import React from 'react';
import { AbsoluteFill, useCurrentFrame } from 'remotion';
import { GRAIN_OPACITY } from '../constants';

/**
 * Self-contained film grain. No external asset — the noise is an inline
 * SVG fractalNoise tile (200×200) so this video honours the brief's
 * "no external assets" rule. Position shifts every 15 frames.
 */
const TILE = 200;

// feTurbulence noise tile, URL-encoded for a data URI ('#' → %23).
const NOISE = `data:image/svg+xml,${encodeURIComponent(
  `<svg xmlns="http://www.w3.org/2000/svg" width="${TILE}" height="${TILE}">` +
    `<filter id="n"><feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="2" stitchTiles="stitch"/>` +
    `<feColorMatrix type="saturate" values="0"/></filter>` +
    `<rect width="100%" height="100%" filter="url(#n)"/></svg>`,
)}`;

const OFFSETS = [
  [0, 0],
  [TILE / 3, TILE / 2],
  [TILE / 2, TILE / 3],
] as const;

const GrainOverlay: React.FC<{ opacity?: number }> = ({ opacity = GRAIN_OPACITY }) => {
  const frame = useCurrentFrame();
  const [x, y] = OFFSETS[Math.floor(frame / 15) % OFFSETS.length];

  return (
    <AbsoluteFill
      style={{
        backgroundImage: `url("${NOISE}")`,
        backgroundRepeat: 'repeat',
        backgroundSize: `${TILE}px ${TILE}px`,
        backgroundPosition: `${x}px ${y}px`,
        opacity,
        mixBlendMode: 'overlay',
        pointerEvents: 'none',
        zIndex: 999,
      }}
    />
  );
};

export default GrainOverlay;

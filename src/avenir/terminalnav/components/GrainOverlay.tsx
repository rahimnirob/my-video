import React from 'react';
import { AbsoluteFill, useCurrentFrame } from 'remotion';
import { atmosphere } from '../../tokens';

/**
 * Self-contained film grain. Unlike the shared cinematic GrainOverlay (which
 * loads a missing /assets/grain-200.png), this generates noise inline via an
 * SVG fractal-turbulence data URI — no external asset required. Position shifts
 * every 15 frames (~500ms) so the grain "crawls" instead of sitting static.
 */
const NOISE_TILE =
  "data:image/svg+xml;utf8," +
  "<svg xmlns='http://www.w3.org/2000/svg' width='200' height='200'>" +
  "<filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' stitchTiles='stitch'/></filter>" +
  "<rect width='100%25' height='100%25' filter='url(%23n)'/></svg>";

const OFFSETS = [
  [0, 0],
  [70, 110],
  [130, 50],
] as const;

export type GrainOverlayProps = {
  opacity?: number;
  zIndex?: number;
};

const GrainOverlay: React.FC<GrainOverlayProps> = ({
  opacity = atmosphere.grain.opacity,
  zIndex = 9000,
}) => {
  const frame = useCurrentFrame();
  const step = Math.floor(frame / 15) % OFFSETS.length;
  const [x, y] = OFFSETS[step];

  return (
    <AbsoluteFill
      style={{
        backgroundImage: `url("${NOISE_TILE}")`,
        backgroundRepeat: 'repeat',
        backgroundSize: '200px 200px',
        backgroundPosition: `${x}px ${y}px`,
        opacity,
        mixBlendMode: 'overlay',
        pointerEvents: 'none',
        zIndex,
      }}
    />
  );
};

export default GrainOverlay;

import React from 'react';
import { AbsoluteFill, useCurrentFrame } from 'remotion';
import { atmosphere } from '../../tokens';

/** Self-contained film grain via an inline SVG fractal-noise tile (no asset). */
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

export type GrainOverlayProps = { opacity?: number; zIndex?: number };

const GrainOverlay: React.FC<GrainOverlayProps> = ({
  opacity = atmosphere.grain.opacity,
  zIndex = 9000,
}) => {
  const frame = useCurrentFrame();
  const [x, y] = OFFSETS[Math.floor(frame / 15) % OFFSETS.length];
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

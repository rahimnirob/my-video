import React from 'react';
import { AbsoluteFill } from 'remotion';
import { mixRgb } from '../world';

/**
 * Bloom — a parametric radial glow that stands in for the old bg image. Driven
 * by `rgb` + `intensity` so every beat can match the previous beat's exact
 * state at the cut (continuous, controllable, no asset to fail to load).
 */
export type BloomProps = {
  /** Core glow colour, 'r,g,b'. */
  rgb: string;
  intensity?: number;
  /** Vertical centre of the bloom, %. */
  posY?: number;
  base?: string;
};

const Bloom: React.FC<BloomProps> = ({
  rgb,
  intensity = 1,
  posY = 63,
  base = '#050409',
}) => {
  const I = Math.max(0, intensity);
  const core = mixRgb(rgb, '255,255,255', 0.5);
  return (
    <AbsoluteFill style={{ background: base }}>
      {/* broad halo */}
      <AbsoluteFill
        style={{
          background: `radial-gradient(ellipse 94% 62% at 50% ${posY}%, rgba(${rgb},${0.5 * I}) 0%, rgba(${rgb},${0.17 * I}) 42%, transparent 72%)`,
        }}
      />
      {/* bright core band */}
      <AbsoluteFill
        style={{
          background: `radial-gradient(ellipse 58% 28% at 50% ${posY - 3}%, rgba(${core},${0.52 * I}) 0%, transparent 64%)`,
        }}
      />
      {/* lower band (gives the image's double-glow depth) */}
      <AbsoluteFill
        style={{
          background: `radial-gradient(ellipse 74% 22% at 50% ${posY + 13}%, rgba(${rgb},${0.26 * I}) 0%, transparent 62%)`,
        }}
      />
    </AbsoluteFill>
  );
};

export default Bloom;

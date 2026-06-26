import React from 'react';
import { AbsoluteFill, Img, staticFile, useCurrentFrame, useVideoConfig } from 'remotion';
import { s } from '../layout';

/**
 * Sentinel — Avenir's chrome guardian character. The source art is on solid
 * black, so we composite with `screen` blend: the black drops out and only the
 * silver-and-violet figure shows, standing at the edge of frame as the narrator
 * presence beside the caption.
 */
export type SentinelProps = {
  pose?: 1 | 2;
  /** 'cold' = silver/violet (frames 01–03); 'billboard' = red/ember (04–07). */
  variant?: 'cold' | 'billboard';
  side?: 'left' | 'right';
  /** Figure height in render px. */
  height?: number;
  opacity?: number;
  zIndex?: number;
  /** Extra nudge in px. */
  dx?: number;
  dy?: number;
};

const FILES = {
  cold: ['cpose1.png', 'cpose2.png'],
  billboard: ['bbchar1.png', 'bbchar2.png'],
};

const Sentinel: React.FC<SentinelProps> = ({
  pose = 1,
  variant = 'cold',
  side = 'left',
  height = 980,
  opacity = 1,
  zIndex = 8,
  dx = 0,
  dy = 0,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  // Slow breath so it feels alive, not pasted.
  const breath = Math.sin((frame / (7 * fps)) * Math.PI * 2);
  const floatY = s(5) * breath;
  const w = height * (400 / 600);

  return (
    <AbsoluteFill style={{ pointerEvents: 'none', zIndex }}>
      <Img
        src={staticFile(FILES[variant][pose === 2 ? 1 : 0])}
        style={{
          position: 'absolute',
          height,
          width: w,
          bottom: dy - s(40),
          [side]: dx - s(40),
          objectFit: 'contain',
          mixBlendMode: 'screen',
          opacity,
          transform: `translateY(${floatY}px)${side === 'right' ? ' scaleX(-1)' : ''}`,
          filter: 'contrast(1.05) brightness(1.02)',
        } as React.CSSProperties}
      />
    </AbsoluteFill>
  );
};

export default Sentinel;

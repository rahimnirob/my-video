import React from 'react';
import { useCurrentFrame } from 'remotion';
import { ramp } from '../constants';

export type LineRevealProps = {
  text: string;
  startFrame: number;
  fontSize: number;
  fontFamily: string;
  color: string;
  weight?: number;
  tracking?: string;
  align?: 'left' | 'center';
  /** Subtle cinematic blur-in (px) that resolves with the reveal. */
  blurIn?: number;
  /** Absolute frame at which the line dissolves out (fade + lift) — enables merges. */
  exitAt?: number;
  /** Override the steady-state opacity (e.g. dim a line to 0.6). */
  holdOpacity?: number;
};

/**
 * One line revealed as a unit: opacity 0→1 + translateY 10→0 over 14 frames.
 * Optional blur-in for a soft cinematic land, and exitAt for a fade-and-lift
 * dissolve so beats melt into the next instead of cutting.
 */
const LineReveal: React.FC<LineRevealProps> = ({
  text,
  startFrame,
  fontSize,
  fontFamily,
  color,
  weight = 700,
  tracking = '-0.02em',
  align = 'left',
  blurIn = 0,
  exitAt,
  holdOpacity = 1,
}) => {
  const frame = useCurrentFrame();
  const inT = ramp(frame, startFrame, startFrame + 14);
  const outT = exitAt != null ? ramp(frame, exitAt, exitAt + 14) : 0;

  const opacity = inT * holdOpacity * (1 - outT);
  const y = (1 - inT) * 10 - outT * 8; // enter from +10, leave by lifting -8
  const blur = (1 - inT) * blurIn;

  return (
    <div
      style={{
        fontFamily,
        fontWeight: weight,
        fontSize,
        color,
        letterSpacing: tracking,
        textAlign: align,
        opacity,
        transform: `translateY(${y}px)`,
        filter: blur > 0.05 ? `blur(${blur}px)` : undefined,
        lineHeight: 1.15,
      }}
    >
      {text}
    </div>
  );
};

export default LineReveal;

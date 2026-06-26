import React from 'react';
import { interpolate } from 'remotion';
import { ease, FS } from '../foundersignal-tokens';

/**
 * GlassCard — dark violet-tinted UI card with rounded corners, soft shadow, hairline border.
 * Slide-up + scale + fade entrance from entryFrame. Gentle alive drift while
 * settled. Adapted from Ella GlassCard (EL → FS).
 */
const clamp = { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' } as const;

const GlassCard: React.FC<{
  frame: number;
  entryFrame: number;
  width: number | string;
  height?: number | string;
  exitFrame?: number;
  padding?: number;
  style?: React.CSSProperties;
  children?: React.ReactNode;
}> = ({ frame, entryFrame, width, height, exitFrame, padding = 24, style, children }) => {
  const p = interpolate(frame, [entryFrame, entryFrame + 18], [0, 1], { easing: ease, ...clamp });
  const outP = exitFrame != null ? interpolate(frame, [exitFrame, exitFrame + 12], [0, 1], { easing: ease, ...clamp }) : 0;
  const opacity = p * (1 - outP);
  const float = Math.sin(frame * 0.05 + entryFrame) * 3 * p * (1 - outP); // gentle alive drift while settled
  const y = (1 - p) * 26 + float;
  const s = (0.96 + 0.04 * p) * (1 - 0.04 * outP);
  return (
    <div
      style={{
        width,
        height,
        opacity,
        transform: `translateY(${y}px) scale(${s})`,
        background: FS.card,
        border: `1px solid ${FS.line}`,
        borderRadius: 18,
        boxShadow: '0 30px 60px rgba(124,58,237,0.15), 0 6px 16px rgba(124,58,237,0.08)',
        padding,
        boxSizing: 'border-box',
        ...style,
      }}
    >
      {children}
    </div>
  );
};

export default GlassCard;

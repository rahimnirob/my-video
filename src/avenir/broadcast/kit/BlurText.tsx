import React from 'react';
import { AbsoluteFill, interpolate } from 'remotion';
import { bbFill, ease, FONT_FAMILY } from '../palette';

const clamp = { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' } as const;

/**
 * BlurText — kinetic typography for Billboard Promo.
 * Words build in one at a time (staggered, rise + blur), and the entire line
 * blurs/rises out on exit. Highlighted emphasis words are filled with the Billboard
 * gradient.
 */
const BlurText: React.FC<{
  text: string;
  frame: number;
  inAt: number;
  outAt?: number;
  inDur?: number;
  outDur?: number;
  fontSize: number;
  color: string;
  weight?: number;
  letterSpacing?: string;
  emphasis?: string[];
  accentMode?: 'bloom' | 'field';
  cursor?: boolean;
  top?: string;
  maxBlur?: number;
  stagger?: number;
}> = ({
  text,
  frame,
  inAt,
  outAt,
  inDur = 12,
  outDur = 8,
  fontSize,
  color,
  weight = 600,
  letterSpacing = '-0.01em',
  emphasis = [],
  accentMode = 'bloom',
  cursor = false,
  top = '50%',
  maxBlur = 10,
  stagger = 3,
}) => {
  const outP = outAt != null ? interpolate(frame, [outAt, outAt + outDur], [0, 1], { easing: ease, ...clamp }) : 0;
  if (frame < inAt || outP >= 1) return null;

  const words = text.split(' ');
  const lastWordIn = inAt + (words.length - 1) * stagger;
  const cursorOn = frame >= lastWordIn + inDur * 0.5 && frame % 24 < 12;

  return (
    <AbsoluteFill style={{ alignItems: 'center', justifyContent: 'center', pointerEvents: 'none' }}>
      <div
        style={{
          position: 'absolute',
          top,
          transform: 'translateY(-50%)',
          display: 'flex',
          alignItems: 'baseline',
          justifyContent: 'center',
          gap: '0.28em',
          fontFamily: FONT_FAMILY,
          fontWeight: weight,
          fontSize,
          letterSpacing,
          textAlign: 'center',
          whiteSpace: 'nowrap',
        }}
      >
        {words.map((w, i) => {
          const wInAt = inAt + i * stagger;
          const wp = interpolate(frame, [wInAt, wInAt + inDur], [0, 1], { easing: ease, ...clamp });
          const op = wp * (1 - outP);
          const blur = (1 - wp) * maxBlur + outP * maxBlur * 0.6;
          const ty = (1 - wp) * 16 - outP * 12;
          const isEm = emphasis.includes(w.replace(/[.,?!:;]/g, ''));
          const em: React.CSSProperties = isEm ? { ...bbFill(frame, accentMode === 'bloom'), fontStyle: 'italic' } : { color };
          return (
            <span key={i} style={{ display: 'inline-block', opacity: op, filter: `blur(${blur}px)`, transform: `translateY(${ty}px)`, ...em }}>
              {w}
            </span>
          );
        })}
        {cursor && (
          <span
            style={{
              display: 'inline-block',
              alignSelf: 'center',
              width: Math.max(2, fontSize * 0.05),
              height: fontSize * 0.92,
              marginLeft: '0.08em',
              background: color,
              opacity: cursorOn ? 1 : 0.12,
            }}
          />
        )}
      </div>
    </AbsoluteFill>
  );
};

export default BlurText;

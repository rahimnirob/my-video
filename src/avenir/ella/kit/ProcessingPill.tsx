import React from 'react';
import { AbsoluteFill, interpolate } from 'remotion';
import { ellaFill, ease, FONT_FAMILY, EL } from '../palette';

/**
 * ProcessingPill — the "Validating your [idea]" beat, Ella-style: a centered
 * line with a pulsing emerald loader dot, gray lead-in, and the final word in
 * a soft-green PILL that draws in (width 0→full) as the word turns
 * green-italic. Honest: implies work, shows no fake result.
 * Forked from Ares ProcessingPill (blue → emerald).
 */
const clamp = { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' } as const;
const TAU = Math.PI * 2;

const ProcessingPill: React.FC<{
  frame: number;
  inAt: number;
  outAt?: number;
  pre: string;
  pill: string;
  fontSize?: number;
}> = ({ frame, inAt, outAt, pre, pill, fontSize = 96 }) => {
  const inP = interpolate(frame, [inAt, inAt + 12], [0, 1], { easing: ease, ...clamp });
  const outP = outAt != null ? interpolate(frame, [outAt, outAt + 8], [0, 1], { easing: ease, ...clamp }) : 0;
  const op = inP * (1 - outP);
  const blur = (1 - inP) * 8 + outP * 6;
  const ty = (1 - inP) * 18 - outP * 14;
  const pillW = interpolate(frame, [inAt + 14, inAt + 24], [0, 1], { easing: ease, ...clamp });
  const dot = 0.3 + 0.7 * (0.5 + 0.5 * Math.sin((frame / 24) * TAU));
  if (op <= 0.001) return null;
  return (
    <AbsoluteFill style={{ alignItems: 'center', justifyContent: 'center', pointerEvents: 'none' }}>
      <div
        style={{
          opacity: op,
          filter: `blur(${blur}px)`,
          transform: `translateY(${ty}px)`,
          display: 'flex',
          alignItems: 'center',
          gap: 22,
          fontFamily: FONT_FAMILY,
          fontWeight: 600,
          fontSize,
          color: EL.gray,
        }}
      >
        <span style={{ width: fontSize * 0.16, height: fontSize * 0.16, borderRadius: '50%', background: EL.accent, opacity: dot, flexShrink: 0 }} />
        <span>{pre}</span>
        <span style={{ position: 'relative', ...ellaFill(frame, false), fontStyle: 'italic', padding: `0 ${fontSize * 0.24}px` }}>
          <span style={{ position: 'absolute', left: 0, top: '6%', bottom: '6%', width: `${pillW * 100}%`, background: 'rgba(16,185,129,0.12)', borderRadius: 999, zIndex: -1 }} />
          {pill}
        </span>
      </div>
    </AbsoluteFill>
  );
};

export default ProcessingPill;

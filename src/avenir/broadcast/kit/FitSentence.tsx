import React from 'react';
import { interpolate, useCurrentFrame } from 'remotion';
import { bbFill, ease, FONT_FAMILY, BB } from '../palette';

const clamp = { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' } as const;
const CHAR = 0.55; // Inter ≈ 0.55em advance
const SPACE = 0.3;

/**
 * FitSentence — the "FitToFrame" effect, re-toned for Billboard Promo:
 * The first word lands BIG and centered. As next words enter and join, the whole
 * sentence scales down to fit, creating a clean zoom-out.
 */
const FitSentence: React.FC<{
  text: string;
  startFrame: number;
  accentWord?: string;
  perWordF?: number;
  enterF?: number;
  top?: string;
  targetWidth?: number;
  maxSize?: number;
  minSize?: number;
  outAt?: number;
  outF?: number;
  weight?: number;
  onBloom?: boolean;
  color?: string;
}> = ({
  text,
  startFrame,
  accentWord,
  perWordF = 9,
  enterF = 12,
  top = '50%',
  targetWidth = 1560,
  maxSize = 340,
  minSize = 84,
  outAt,
  outF = 8,
  weight = 700,
  onBloom = true,
  color = BB.white,
}) => {
  const frame = useCurrentFrame();
  const ri = (a: number, b: number, x: number, y: number) => interpolate(frame, [a, b], [x, y], { easing: ease, ...clamp });
  const words = text.split(' ').filter(Boolean);
  const outP = outAt != null ? ri(outAt, outAt + outF, 0, 1) : 0;
  if (frame < startFrame || outP >= 1) return null;

  const prog = words.map((w, i) => ({ p: ri(startFrame + i * perWordF, startFrame + i * perWordF + enterF, 0, 1), w }));
  let shownEm = 0.0001;
  prog.forEach((d, i) => {
    shownEm += d.p * ((i > 0 ? SPACE : 0) + d.w.length * CHAR);
  });
  const fontSize = Math.max(minSize, Math.min(maxSize, targetWidth / shownEm));
  const gapPx = SPACE * fontSize;

  return (
    <div
      style={{
        position: 'absolute',
        left: 0,
        right: 0,
        top,
        transform: 'translateY(-50%)',
        display: 'flex',
        justifyContent: 'center',
        opacity: 1 - outP,
        filter: outP > 0 ? `blur(${outP * 8}px)` : undefined,
        pointerEvents: 'none',
      }}
    >
      <div style={{ display: 'flex', alignItems: 'baseline', whiteSpace: 'nowrap', fontFamily: FONT_FAMILY, fontWeight: weight, fontSize, letterSpacing: '-0.02em', gap: `${gapPx}px` }}>
        {prog.map((d, i) => {
          if (d.p <= 0.001) return null;
          const x = (1 - d.p) * -0.4;
          const isEm = accentWord != null && d.w.replace(/[.,?!:;]/g, '') === accentWord;
          const em: React.CSSProperties = isEm ? { ...bbFill(frame, onBloom), fontStyle: 'italic' } : { color };
          return (
            <span key={i} style={{ display: 'inline-block', transform: `translateX(${x}em)`, opacity: d.p, ...em }}>
              {d.w}
            </span>
          );
        })}
      </div>
    </div>
  );
};

export default FitSentence;

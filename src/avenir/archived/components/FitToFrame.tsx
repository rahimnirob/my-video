import React from 'react';
import type { CSSProperties } from 'react';
import { Easing, interpolate, useCurrentFrame } from 'remotion';
import { EMBER_SHADOW, emberFill } from '../constants';
import { anton } from '../fonts';

/**
 * FitToFrame (founder effect A) — the first word lands big in the centre; as each
 * next word slides in from the left and joins the line, the WHOLE line scales
 * DOWN to keep fitting the frame width. The sentence "tries to fit in the
 * frame". ONE continuous gradient spans the whole visible line (each word shows
 * only its slice — never a separate gradient per word).
 */

export type FitToFrameProps = {
  text: string;
  startFrame: number;
  perWordF?: number;
  enterF?: number;
  top?: string;
  targetWidth?: number;
  maxSize?: number;
  minSize?: number;
  gradientF?: number;
  exitAt?: number;
  exitF?: number;
  zIndex?: number;
};

// Anton ≈ 0.5em advance; inter-word space ≈ 0.34em.
const CHAR = 0.5;
const SPACE = 0.34;

const FitToFrame: React.FC<FitToFrameProps> = ({
  text,
  startFrame,
  perWordF = 12,
  enterF = 16,
  top = '50%',
  targetWidth = 1500,
  maxSize = 360,
  minSize = 96,
  gradientF = 30,
  exitAt,
  exitF = 16,
  zIndex = 10,
}) => {
  const frame = useCurrentFrame();
  const ease = Easing.bezier(0.16, 1, 0.3, 1);
  const ri = (a: number, b: number, x: number, y: number) =>
    interpolate(frame, [a, b], [x, y], { easing: ease, extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

  const words = text.split(' ').filter(Boolean);
  const exitFade = exitAt != null ? 1 - ri(exitAt, exitAt + exitF, 0, 1) : 1;

  // Per-word reveal progress; accumulate the shown width (in em) to drive scale.
  const prog = words.map((w, i) => {
    const wStart = startFrame + i * perWordF;
    return { p: ri(wStart, wStart + enterF, 0, 1), w };
  });
  let shownEm = 0.0001;
  prog.forEach((d, i) => {
    shownEm += d.p * ((i > 0 ? SPACE : 0) + d.w.length * CHAR);
  });
  const fontSize = Math.max(minSize, Math.min(maxSize, targetWidth / shownEm));

  // Lay out the visible words → ONE gradient spanning the whole visible line.
  const gradientImg = emberFill(0).backgroundImage;
  const gapPx = SPACE * fontSize;
  const offMap: Record<number, number> = {};
  let acc = 0;
  prog.forEach((d, i) => {
    if (d.p <= 0.001) return;
    offMap[i] = acc;
    acc += d.w.length * CHAR * fontSize + gapPx;
  });
  const visW = Math.max(1, acc - gapPx);
  const flowShift = -((frame % gradientF) / gradientF) * visW;

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
        opacity: exitFade,
        zIndex,
        pointerEvents: 'none',
      }}
    >
      <div
        style={{
          display: 'flex',
          alignItems: 'baseline',
          whiteSpace: 'nowrap',
          fontFamily: anton,
          fontWeight: 400,
          fontSize,
          letterSpacing: '0.005em',
          gap: `${gapPx}px`,
        }}
      >
        {prog.map((d, i) => {
          if (d.p <= 0.001) return null;
          const x = (1 - d.p) * -0.5; // slides in from the left (em units)
          const innerFill: CSSProperties = {
            display: 'inline-block',
            transform: `translateX(${x}em)`,
            opacity: d.p,
            backgroundImage: gradientImg,
            backgroundSize: `${visW}px 100%`,
            backgroundPosition: `${flowShift - offMap[i]}px center`,
            backgroundRepeat: 'repeat',
            WebkitBackgroundClip: 'text',
            backgroundClip: 'text',
            color: 'transparent',
            filter: EMBER_SHADOW,
          };
          return (
            <span key={i} style={innerFill}>
              {d.w}
            </span>
          );
        })}
      </div>
    </div>
  );
};

export default FitToFrame;

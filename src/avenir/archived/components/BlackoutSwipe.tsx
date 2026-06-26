import React from 'react';
import type { CSSProperties } from 'react';
import { Easing, interpolate, useCurrentFrame } from 'remotion';
import { EMBER_SHADOW, emberFill } from '../constants';
import { anton } from '../fonts';

/**
 * BlackoutSwipe (founder effect B) — the sentence comes in, holds, then a black
 * swipe (ember-edged) redacts it word by word from the LAST word to the FIRST,
 * and finally the whole line wipes out left→right. Thematic for "disappeared".
 * ONE continuous gradient spans each line (each word shows only its slice).
 */

export type BlackoutSwipeProps = {
  text: string; // '\n' for line breaks
  startFrame: number;
  fontSize: number;
  top?: string;
  maxWidth?: number;
  lineHeight?: number;
  appearF?: number;
  perWordAppearF?: number;
  holdF?: number;
  redactStepF?: number;
  redactDurF?: number;
  wipeF?: number;
  gradientF?: number;
  zIndex?: number;
};

const CHAR = 0.48;

const BlackoutSwipe: React.FC<BlackoutSwipeProps> = ({
  text,
  startFrame,
  fontSize,
  top = '50%',
  maxWidth = 1500,
  lineHeight = 1.12,
  appearF = 14,
  perWordAppearF = 4,
  holdF = 26,
  redactStepF = 6,
  redactDurF = 9,
  wipeF = 22,
  gradientF = 30,
  zIndex = 10,
}) => {
  const frame = useCurrentFrame();
  const ease = Easing.bezier(0.16, 1, 0.3, 1);
  const ri = (a: number, b: number, x: number, y: number) =>
    interpolate(frame, [a, b], [x, y], { easing: ease, extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

  const lines = text.split('\n');
  const allWords = lines.join(' ').split(' ').filter(Boolean);
  const n = allWords.length;

  const redactAt = startFrame + appearF + (n - 1) * perWordAppearF + holdF;
  const redactDone = redactAt + (n - 1) * redactStepF + redactDurF;
  const wipeAt = redactDone + 4;

  const wipeLeft = ri(wipeAt, wipeAt + wipeF, 0, 100);
  const blockClip = `inset(-30% 0 -30% ${wipeLeft}%)`;
  const blockOpacity = ri(startFrame, startFrame + 4, 0, 1);

  const gradientImg = emberFill(0).backgroundImage;
  let counter = 0;
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
        opacity: blockOpacity,
        zIndex,
        pointerEvents: 'none',
      }}
    >
      <div
        style={{
          maxWidth,
          textAlign: 'center',
          fontFamily: anton,
          fontWeight: 400,
          fontSize,
          lineHeight,
          letterSpacing: '0.01em',
          clipPath: blockClip,
        }}
      >
        {lines.map((line, li) => {
          const wordsArr = line.split(' ').filter(Boolean);
          const gapPx = fontSize * 0.26;
          const widths = wordsArr.map((w) => w.length * CHAR * fontSize);
          const lineW = Math.max(1, widths.reduce((a, b) => a + b, 0) + gapPx * (wordsArr.length - 1));
          const offsets: number[] = [];
          let acc = 0;
          widths.forEach((wd, i) => { offsets[i] = acc; acc += wd + gapPx; });
          const flowShift = -((frame % gradientF) / gradientF) * lineW;
          return (
            <div key={li} style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: `0 ${gapPx}px` }}>
              {wordsArr.map((w, wi) => {
                const idx = counter++;
                const appStart = startFrame + idx * perWordAppearF;
                const app = ri(appStart, appStart + appearF, 0, 1);
                const wordY = (1 - app) * fontSize * 0.2;
                const coverStart = redactAt + (n - 1 - idx) * redactStepF;
                const cover = ri(coverStart, coverStart + redactDurF, 0, 1);
                const innerFill: CSSProperties = {
                  display: 'inline-block',
                  transform: `translateY(${wordY}px)`,
                  opacity: app,
                  backgroundImage: gradientImg,
                  backgroundSize: `${lineW}px 100%`,
                  backgroundPosition: `${flowShift - offsets[wi]}px center`,
                  backgroundRepeat: 'repeat',
                  WebkitBackgroundClip: 'text',
                  backgroundClip: 'text',
                  color: 'transparent',
                  filter: EMBER_SHADOW,
                };
                return (
                  <span key={wi} style={{ position: 'relative', display: 'inline-block', paddingBottom: fontSize * 0.06 }}>
                    <span style={innerFill}>{w}</span>
                    {cover > 0 && (
                      <span
                        style={{
                          position: 'absolute',
                          left: '-4%',
                          top: '-8%',
                          height: '116%',
                          width: `${cover * 108}%`,
                          background: '#080204',
                          borderRight: cover < 1 ? '3px solid rgba(255,90,64,0.9)' : 'none',
                          boxShadow: cover < 1 ? '0 0 18px rgba(255,80,55,0.5)' : 'none',
                        }}
                      />
                    )}
                  </span>
                );
              })}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default BlackoutSwipe;

import React from 'react';
import { AbsoluteFill, Img, interpolate, staticFile } from 'remotion';
import { aresFill, ease, FONT_FAMILY, L } from '../ares-tokens';

/**
 * Scene 2 — INTRODUCING (f198–336), lavender. Matched to the inspo: "Introducing"
 * slides in, then the ink Ares mark + "Ares" wordmark build in BESIDE it on ONE
 * line (name + mark together, like the inspo's "Introducing LinkedIn⁺"), with a
 * small "AI OS for Builders" positioning sub. Holds, then blurs out into the
 * command bar. Global frame.
 */
const clamp = { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' } as const;

const Scene2Introducing: React.FC<{ frame: number }> = ({ frame: f }) => {
  if (f < 192 || f > 336) return null;
  const introP = interpolate(f, [198, 214], [0, 1], { easing: ease, ...clamp });
  const nameP = interpolate(f, [216, 236], [0, 1], { easing: ease, ...clamp });
  const subP = interpolate(f, [240, 256], [0, 1], { easing: ease, ...clamp });
  const outP = interpolate(f, [320, 330], [0, 1], { easing: ease, ...clamp });
  const op = 1 - outP;
  return (
    <AbsoluteFill style={{ alignItems: 'center', justifyContent: 'center' }}>
      <div style={{ opacity: op, filter: `blur(${outP * 8}px)`, transform: `translateY(${-outP * 12}px)`, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 22 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 26 }}>
          <span
            style={{
              opacity: introP,
              filter: `blur(${(1 - introP) * 10}px)`,
              transform: `translateX(${(1 - introP) * -20}px)`,
              fontFamily: FONT_FAMILY,
              fontWeight: 600,
              fontSize: 96,
              color: L.ink,
              letterSpacing: '-0.02em',
            }}
          >
            Introducing
          </span>
          <span
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 18,
              opacity: nameP,
              filter: `blur(${(1 - nameP) * 12}px)`,
              transform: `translateX(${(1 - nameP) * 30}px) scale(${0.82 + 0.18 * nameP})`,
            }}
          >
            <Img src={staticFile('ares/ares-logo.png')} style={{ height: 88, filter: 'brightness(0)' }} />
            <span style={{ fontFamily: FONT_FAMILY, fontWeight: 700, fontSize: 124, color: L.ink, letterSpacing: '-0.02em' }}>Ares</span>
          </span>
        </div>
        <div style={{ opacity: subP, fontFamily: FONT_FAMILY, fontWeight: 500, fontSize: 30, color: L.gray, letterSpacing: '0.04em' }}>
          AI OS for <span style={{ ...aresFill(f, false), fontStyle: 'italic' }}>Builders</span>
        </div>
      </div>
    </AbsoluteFill>
  );
};

export default Scene2Introducing;

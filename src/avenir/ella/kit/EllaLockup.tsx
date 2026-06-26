import React from 'react';
import { Img, interpolate, staticFile } from 'remotion';
import { ease, FONT_FAMILY, EL } from '../palette';

/**
 * EllaLockup — the brand lockup (logo mark + "Ella" + "Validate before you
 * build."). Blur-in entrance, staggered subtitle. `theme`: 'light' = ink on
 * field, 'onBloom' = white on the emerald bloom (logo inverted to white).
 * Forked from Ares AresLockup.
 */
const clamp = { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' } as const;

const EllaLockup: React.FC<{
  frame: number;
  inAt: number;
  theme?: 'light' | 'onBloom';
  size?: number;
  showSub?: boolean;
  showUrl?: boolean;
}> = ({ frame, inAt, theme = 'light', size = 120, showSub = true, showUrl = false }) => {
  const p = interpolate(frame, [inAt, inAt + 16], [0, 1], { easing: ease, ...clamp });
  const subP = interpolate(frame, [inAt + 22, inAt + 40], [0, 1], { easing: ease, ...clamp });
  const onBloom = theme === 'onBloom';
  const textCol = onBloom ? EL.white : EL.ink;
  const subCol = onBloom ? 'rgba(240,255,248,0.82)' : EL.gray;
  const logoFilter = onBloom ? 'brightness(0) invert(1)' : 'brightness(0)';
  return (
    <div
      style={{
        opacity: p,
        filter: `blur(${(1 - p) * 12}px)`,
        transform: `translateY(${(1 - p) * 10}px)`,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: size * 0.14,
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: size * 0.16 }}>
        <Img src={staticFile('Logo-removebg-preview.png')} style={{ height: size * 0.86, filter: logoFilter }} />
        <div style={{ fontFamily: FONT_FAMILY, fontWeight: 700, fontSize: size, color: textCol, letterSpacing: '-0.02em' }}>Ella</div>
      </div>
      {showSub && (
        <div style={{ opacity: subP, fontFamily: FONT_FAMILY, fontWeight: 500, fontSize: size * 0.26, color: subCol, letterSpacing: '0.04em' }}>
          Validate before you build.
        </div>
      )}
      {showUrl && (
        <div style={{ opacity: subP, marginTop: size * 0.08, fontFamily: FONT_FAMILY, fontWeight: 600, fontSize: size * 0.2, letterSpacing: '0.18em', color: onBloom ? EL.white : EL.ink }}>
          ELLA.COM
        </div>
      )}
    </div>
  );
};

export default EllaLockup;

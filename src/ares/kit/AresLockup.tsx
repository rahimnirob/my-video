import React from 'react';
import { Img, interpolate, staticFile } from 'remotion';
import { ease, FONT_FAMILY, L } from '../ares-tokens';

/**
 * AresLockup — the brand lockup (logo mark + "Ares" + "AI OS for Builders").
 * Blur-in entrance, staggered subtitle. `theme`: 'light' = ink on lavender,
 * 'onBloom' = white on the blue bloom (logo inverted to white). Presentational —
 * the parent centers it.
 */
const clamp = { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' } as const;

const AresLockup: React.FC<{
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
  const textCol = onBloom ? L.white : L.ink;
  const subCol = onBloom ? 'rgba(244,248,255,0.82)' : L.gray;
  const logoFilter = onBloom ? 'brightness(0) invert(1)' : 'none';
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
        <Img src={staticFile('ares/ares-logo.png')} style={{ height: size * 0.86, filter: logoFilter }} />
        <div style={{ fontFamily: FONT_FAMILY, fontWeight: 700, fontSize: size, color: textCol, letterSpacing: '-0.02em' }}>Ares</div>
      </div>
      {showSub && (
        <div style={{ opacity: subP, fontFamily: FONT_FAMILY, fontWeight: 500, fontSize: size * 0.26, color: subCol, letterSpacing: '0.04em' }}>
          AI OS for Builders.
        </div>
      )}
      {showUrl && (
        <div style={{ opacity: subP, marginTop: size * 0.08, fontFamily: FONT_FAMILY, fontWeight: 600, fontSize: size * 0.2, letterSpacing: '0.18em', color: onBloom ? L.white : L.ink }}>
          ARES.OS
        </div>
      )}
    </div>
  );
};

export default AresLockup;

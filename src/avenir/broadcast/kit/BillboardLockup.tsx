import React from 'react';
import { Img, interpolate, staticFile } from 'remotion';
import { ease, BB, FONT_FAMILY } from '../palette';
import { font, tracking } from '../../tokens';

const clamp = { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' } as const;

/**
 * BillboardLockup — the final brand lockup:
 * Swirl logo + AVENIR wordmark (wide-tracked) + Call-sign (orange dot + BILLBOARD Season 02) + URL.
 */
const BillboardLockup: React.FC<{
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
  const textCol = onBloom ? BB.white : BB.ink;
  const subCol = onBloom ? 'rgba(255,251,251,0.82)' : BB.gray;
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
        <Img src={staticFile('Logo-removebg-preview.png')} style={{ height: size * 0.75, filter: logoFilter }} />
        <div style={{ fontFamily: FONT_FAMILY, fontWeight: 700, fontSize: size * 0.9, color: textCol, letterSpacing: '0.24em', textTransform: 'uppercase' }}>
          Avenir
        </div>
      </div>
      
      {showSub && (
        <div style={{ opacity: subP, display: 'flex', alignItems: 'center', gap: 10, fontFamily: font.mono, fontWeight: 500, fontSize: size * 0.22, color: subCol, letterSpacing: tracking.billboardCS }}>
          <span style={{ width: size * 0.08, height: size * 0.08, borderRadius: '50%', background: BB.bloom }} />
          BILLBOARD · SEASON 02
        </div>
      )}
      
      {showUrl && (
        <div style={{ opacity: subP, marginTop: size * 0.08, fontFamily: font.mono, fontWeight: 600, fontSize: size * 0.18, letterSpacing: '0.18em', color: onBloom ? BB.bloom : BB.ink, textTransform: 'uppercase' }}>
          avenirreym.com/billboard
        </div>
      )}
    </div>
  );
};

export default BillboardLockup;

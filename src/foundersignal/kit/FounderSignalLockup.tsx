import React from 'react';
import { interpolate } from 'remotion';
import { ease, FONT_FAMILY, FS } from '../foundersignal-tokens';

/**
 * FounderSignalLockup — the brand lockup (logo mark + "FounderSignal" + tagline).
 * Blur-in entrance, staggered subtitle. `theme`: 'light' = ink on field, 'onBloom' = 
 * white on the violet bloom (logo inverted to white).
 * Adapted from Ella Lockup.
 */
const clamp = { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' } as const;

const FounderSignalLockup: React.FC<{
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
  const textCol = onBloom ? FS.white : FS.ink;
  const subCol = onBloom ? 'rgba(243,244,246,0.82)' : FS.gray;
  
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
        {/* Logo mark - placeholder circle with FS */}
        <div style={{ 
          width: size * 0.86, 
          height: size * 0.86, 
          borderRadius: size * 0.18,
          background: `linear-gradient(135deg, ${FS.bloom}, ${FS.bloomDeep})`,
          display: 'flex', 
          alignItems: 'center', 
          justifyContent: 'center',
          boxShadow: `0 8px 24px ${FS.bloom}40`
        }}>
          <span style={{ 
            fontFamily: FONT_FAMILY, 
            fontWeight: 800, 
            fontSize: size * 0.32, 
            color: '#fff',
            letterSpacing: '-0.02em'
          }}>
            FS
          </span>
        </div>
        <div style={{ fontFamily: FONT_FAMILY, fontWeight: 700, fontSize: size, color: textCol, letterSpacing: '-0.02em' }}>FounderSignal</div>
      </div>
      {showSub && (
        <div style={{ opacity: subP, fontFamily: FONT_FAMILY, fontWeight: 500, fontSize: size * 0.26, color: subCol, letterSpacing: '0.04em' }}>
          Find ideas people actually want
        </div>
      )}
      {showUrl && (
        <div style={{ opacity: subP, marginTop: size * 0.08, fontFamily: FONT_FAMILY, fontWeight: 600, fontSize: size * 0.2, letterSpacing: '0.18em', color: onBloom ? FS.white : FS.ink }}>
          FOUNDERSIGNAL.COM
        </div>
      )}
    </div>
  );
};

export default FounderSignalLockup;

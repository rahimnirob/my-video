import React from 'react';
import { AbsoluteFill, useCurrentFrame } from 'remotion';
import { FS } from '../foundersignal-tokens';

/**
 * FieldBg — the PRODUCT/UI background for FounderSignal: a flat, deep void black
 * field with a subtle dot-grid overlay and a slow-drifting soft violet glow.
 */
const FieldBg: React.FC = () => {
  const frame = useCurrentFrame();

  // Subtle breathing/drifting coordinates for the background glow
  const driftX = Math.sin(frame * 0.007) * 70;
  const driftY = Math.cos(frame * 0.005) * 45;
  const scale = 1.0 + Math.sin(frame * 0.009) * 0.06;

  return (
    <AbsoluteFill style={{ background: FS.bg, overflow: 'hidden' }}>
      {/* 1. Modern dot-grid overlay */}
      <AbsoluteFill
        style={{
          backgroundImage: `radial-gradient(rgba(167,139,250,0.08) 1.5px, transparent 1.5px)`,
          backgroundSize: '48px 48px',
          backgroundPosition: 'center center',
          opacity: 0.95,
          pointerEvents: 'none',
        }}
      />

      {/* 2. Soft, organic drifting violet glow */}
      <div
        style={{
          position: 'absolute',
          left: '50%',
          top: '40%',
          width: 900,
          height: 900,
          background: `radial-gradient(circle, rgba(167,139,250,0.15) 0%, rgba(124,58,237,0.05) 55%, transparent 75%)`,
          transform: `translate(-50%, -50%) translate(${driftX}px, ${driftY}px) scale(${scale})`,
          filter: 'blur(70px)',
          pointerEvents: 'none',
        }}
      />

      {/* 3. Radial sheen from top for card separation */}
      <AbsoluteFill
        style={{
          background: 'radial-gradient(ellipse 90% 70% at 50% 15%, rgba(167,139,250,0.08) 0%, rgba(167,139,250,0) 65%)',
          pointerEvents: 'none',
        }}
      />
    </AbsoluteFill>
  );
};

export default FieldBg;

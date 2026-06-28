import React from 'react';
import { AbsoluteFill, useCurrentFrame } from 'remotion';

/**
 * FieldBg — the PRODUCT/UI background for Billboard Promo: a flat, calm red/black field
 * with a subtle dot-grid overlay and a slow-drifting red glow.
 */
const FieldBg: React.FC = () => {
  const frame = useCurrentFrame();

  const driftX = Math.sin(frame * 0.0065) * 60;
  const driftY = Math.cos(frame * 0.0045) * 40;
  const scale = 1.0 + Math.sin(frame * 0.0085) * 0.05;

  return (
    <AbsoluteFill style={{ background: '#070708', overflow: 'hidden' }}>
      <AbsoluteFill
        style={{
          backgroundImage: `radial-gradient(circle, rgba(239,68,68,0.16) 1.5px, transparent 1.5px)`,
          backgroundSize: '48px 48px',
          backgroundPosition: 'center center',
          opacity: 0.85,
          pointerEvents: 'none',
        }}
      />

      <div
        style={{
          position: 'absolute',
          left: '50%',
          top: '42%',
          width: 900,
          height: 900,
          background: `radial-gradient(circle, rgba(239,68,68,0.22) 0%, rgba(191,18,18,0.08) 45%, transparent 70%)`,
          transform: `translate(-50%, -50%) translate(${driftX}px, ${driftY}px) scale(${scale})`,
          filter: 'blur(80px)',
          pointerEvents: 'none',
        }}
      />

      <AbsoluteFill
        style={{
          background: 'radial-gradient(ellipse 90% 70% at 50% 15%, rgba(255,255,255,0.08) 0%, rgba(255,255,255,0) 65%)',
          pointerEvents: 'none',
        }}
      />
    </AbsoluteFill>
  );
};

export default FieldBg;

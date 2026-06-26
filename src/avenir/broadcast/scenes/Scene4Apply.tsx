import React from 'react';
import { AbsoluteFill, interpolate } from 'remotion';
import { ease, BB } from '../palette';
import { sora, mono } from '../../tokens';

/**
 * S5 — APPLY (f204–240): Zoom into the /billboard/apply form, cursor clicks "Pay & Broadcast".
 * A stylized form card with a prominent CTA button.
 */
const clamp = { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' } as const;

const Scene4Apply: React.FC<{ frame: number }> = ({ frame: f }) => {
  if (f < 200 || f > 248) return null;

  const enterP = interpolate(f, [204, 220], [0, 1], { easing: ease, ...clamp });
  const exitP = interpolate(f, [236, 244], [0, 1], { easing: ease, ...clamp });
  const op = enterP * (1 - exitP);
  const zoom = interpolate(enterP, [0, 1], [0.8, 1], clamp);
  const blur = (1 - enterP) * 12;

  // Cursor animation — moves to the button and clicks
  const cursorEnter = interpolate(f, [218, 228], [0, 1], { easing: ease, ...clamp });
  const cursorClick = interpolate(f, [230, 232, 234], [1, 0.88, 1], clamp);
  const buttonGlow = interpolate(f, [230, 234, 238], [0, 1, 0.4], clamp);

  return (
    <AbsoluteFill style={{ alignItems: 'center', justifyContent: 'center', opacity: op }}>
      <div
        style={{
          position: 'relative',
          width: 680,
          transform: `scale(${zoom})`,
          filter: `blur(${blur}px)`,
          background: 'rgba(5,6,8,0.88)',
          border: `1px solid rgba(232,93,58,0.25)`,
          borderRadius: 16,
          padding: '36px 40px',
          boxShadow: `0 30px 80px rgba(0,0,0,0.5), 0 0 30px rgba(232,93,58,${0.08 + buttonGlow * 0.15})`,
        }}
      >
        {/* Form header */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 28 }}>
          <span style={{ width: 8, height: 8, borderRadius: '50%', background: BB.bloom, boxShadow: `0 0 8px rgba(232,93,58,0.5)` }} />
          <span style={{ fontFamily: mono, fontSize: 11, letterSpacing: '0.22em', color: BB.bloom, fontWeight: 700, textTransform: 'uppercase' as const }}>
            BILLBOARD · APPLY
          </span>
        </div>

        {/* Form fields (honest structure-only bars) */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16, marginBottom: 30 }}>
          <div>
            <div style={{ fontFamily: mono, fontSize: 10, letterSpacing: '0.14em', color: 'rgba(240,242,244,0.4)', textTransform: 'uppercase' as const, marginBottom: 6 }}>Product Name</div>
            <div style={{ height: 40, borderRadius: 6, background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)' }} />
          </div>
          <div>
            <div style={{ fontFamily: mono, fontSize: 10, letterSpacing: '0.14em', color: 'rgba(240,242,244,0.4)', textTransform: 'uppercase' as const, marginBottom: 6 }}>Tier</div>
            <div style={{ display: 'flex', gap: 12 }}>
              <div style={{ flex: 1, height: 40, borderRadius: 6, background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: mono, fontSize: 11, color: 'rgba(240,242,244,0.5)', letterSpacing: '0.1em' }}>Standard $200</div>
              <div style={{ flex: 1, height: 40, borderRadius: 6, background: 'rgba(232,93,58,0.1)', border: `1px solid rgba(232,93,58,0.35)`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: mono, fontSize: 11, color: BB.bloom, letterSpacing: '0.1em', fontWeight: 600 }}>Priority $350</div>
            </div>
          </div>
        </div>

        {/* CTA Button */}
        <div
          style={{
            padding: '16px 32px',
            borderRadius: 8,
            background: `linear-gradient(135deg, #E85D3A 0%, #C7472B 100%)`,
            boxShadow: `0 0 ${12 + buttonGlow * 20}px rgba(232,93,58,${0.25 + buttonGlow * 0.4}), inset 0 1px 0 rgba(255,255,255,0.18)`,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 10,
            transform: `scale(${1 + buttonGlow * 0.03})`,
          }}
        >
          <span style={{ fontFamily: sora, fontWeight: 700, fontSize: 16, color: '#fff', letterSpacing: '0.04em' }}>Pay & Broadcast</span>
          <svg width={16} height={16} viewBox="0 0 24 24" fill="none">
            <path d="M7 17L17 7M17 7H7M17 7V17" stroke="#fff" strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>
      </div>

      {/* Cursor */}
      {cursorEnter > 0.01 && (
        <div
          style={{
            position: 'absolute',
            left: interpolate(cursorEnter, [0, 1], [1100, 960], clamp),
            top: interpolate(cursorEnter, [0, 1], [700, 622], clamp),
            transform: `scale(${cursorClick})`,
            pointerEvents: 'none',
            zIndex: 100,
          }}
        >
          <svg width={36} height={44} viewBox="0 0 24 28" fill="none">
            <path d="M5 2L5 18L9.5 14.5L13 22L16 20.5L12.5 13L18 12L5 2Z" fill="white" stroke="#111" strokeWidth={1.5} strokeLinejoin="round" />
          </svg>
        </div>
      )}
    </AbsoluteFill>
  );
};

export default Scene4Apply;

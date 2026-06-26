import React from 'react';
import { AbsoluteFill, Img, interpolate, staticFile } from 'remotion';
import { ease, BB } from '../palette';
import { sora, mono } from '../../tokens';

/**
 * S13 — OUTRO (f975–1071):
 * Final brand outro on pitch-black void.
 * Logo mark + wordmark fades in with wide letter-spacing.
 * Subtitle: "Pay once. Stay visible forever."
 * URL: "avenirreym.com/billboard"
 */
const clamp = { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' } as const;
const ORANGE = '#E85D3A';

const Scene11Outro: React.FC<{ frame: number }> = ({ frame: f }) => {
  if (f < 970) return null;

  const logoP = interpolate(f, [978, 998], [0, 1], { easing: ease, ...clamp });
  const subP = interpolate(f, [1000, 1020], [0, 1], { easing: ease, ...clamp });

  return (
    <AbsoluteFill style={{ backgroundColor: '#020304', alignItems: 'center', justifyContent: 'center' }}>
      {/* Brand Lockup */}
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: 20,
          opacity: logoP,
          transform: `translateY(${(1 - logoP) * 12}px)`,
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
          <Img
            src={staticFile('Logo-removebg-preview.png')}
            style={{ height: 90, filter: 'brightness(0) invert(1)' }}
          />
          <div
            style={{
              fontFamily: sora,
              fontWeight: 700,
              fontSize: 100,
              color: BB.white,
              letterSpacing: '0.24em',
              textTransform: 'uppercase',
            }}
          >
            Avenir
          </div>
        </div>

        {/* Subtitle */}
        <div
          style={{
            opacity: subP,
            marginTop: 10,
            fontFamily: sora,
            fontWeight: 500,
            fontSize: 28,
            color: 'rgba(255, 255, 255, 0.85)',
            letterSpacing: '-0.01em',
            fontStyle: 'italic',
            transform: `translateY(${(1 - subP) * 8}px)`,
          }}
        >
          Pay once. Stay visible forever.
        </div>

        {/* URL */}
        <div
          style={{
            opacity: subP,
            marginTop: 14,
            fontFamily: mono,
            fontWeight: 600,
            fontSize: 20,
            letterSpacing: '0.2em',
            color: ORANGE,
            textTransform: 'uppercase',
            transform: `translateY(${(1 - subP) * 8}px)`,
          }}
        >
          avenirreym.com/billboard
        </div>
      </div>
    </AbsoluteFill>
  );
};

export default Scene11Outro;

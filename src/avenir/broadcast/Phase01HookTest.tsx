import React from 'react';
import { AbsoluteFill, Easing, interpolate, useCurrentFrame } from 'remotion';
import { BB, bbFill, ease } from './palette';
import { mono, sora } from '../tokens';

const clamp = { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' } as const;

export const TOTAL_FRAMES = 90;

const Phase01HookTest: React.FC = () => {
  const f = useCurrentFrame();

  const enterP = interpolate(f, [0, 18], [0, 1], { easing: ease, ...clamp });
  const exitP = interpolate(f, [64, 90], [0, 1], { easing: Easing.bezier(0.25, 1, 0.5, 1), ...clamp });

  const opacity = interpolate(f, [0, 18, 60, 90], [0, 1, 1, 0], { easing: ease, ...clamp });
  const y = interpolate(enterP, [0, 1], [24, 0], clamp) + exitP * 24;
  const scale = interpolate(enterP, [0, 1], [0.96, 1], clamp) * (1 + exitP * 0.07);
  const blur = (1 - enterP) * 14 + exitP * 18;
  const glow = 1 - exitP * 0.35;
  const labelOpacity = interpolate(f, [24, 40], [0, 1], { easing: ease, ...clamp });

  return (
    <AbsoluteFill style={{ backgroundColor: '#030304', overflow: 'hidden', fontFamily: sora }}>
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background: 'radial-gradient(circle at 50% 50%, rgba(232,93,58,0.12) 0%, transparent 54%)',
        }}
      />
      <AbsoluteFill style={{ alignItems: 'center', justifyContent: 'center' }}>
        <div
          style={{
            opacity,
            transform: `translate3d(0, ${y}px, 0) scale(${scale})`,
            filter: `blur(${blur}px)`,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            textAlign: 'center',
            gap: 18,
          }}
        >
          <div
            style={{
              fontFamily: sora,
              fontWeight: 900,
              fontSize: 260,
              letterSpacing: '-0.045em',
              lineHeight: 0.95,
              ...bbFill(f, true),
              textShadow: `0 0 ${48 * glow}px rgba(232,93,58,${0.22 * glow})`,
            }}
          >
            LAUNCHED.
          </div>
          <div
            style={{
              opacity: labelOpacity,
              fontFamily: mono,
              fontSize: 16,
              letterSpacing: '0.24em',
              textTransform: 'uppercase' as const,
              color: 'rgba(255,250,247,0.72)',
            }}
          >
            08:19 UTC · Last signal
          </div>
          <div
            style={{
              width: 170,
              height: 2,
              borderRadius: 999,
              background: `linear-gradient(90deg, transparent 0%, ${BB.bloom} 50%, transparent 100%)`,
              opacity: 0.6 + 0.24 * glow,
            }}
          />
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};

export default Phase01HookTest;

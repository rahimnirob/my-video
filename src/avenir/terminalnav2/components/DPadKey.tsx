import React from 'react';
import { interpolate, useCurrentFrame } from 'remotion';
import { sentinel, pulse, mono } from '../../tokens';
import { C, GLASS, ease, alpha } from '../constants';

export type DPadDirection = 'up' | 'down' | 'left' | 'right';

export type DPadKeyProps = {
  direction: DPadDirection;
  arrow: string;
  label: string;
  /** Local-to-DPad-scene frame for the staggered entrance. */
  entranceStart: number;
  pressFrame?: number | null;
};

const TILT: Record<DPadDirection, (t: number) => string> = {
  up: (t) => `rotateX(${-14 * t}deg)`,
  down: (t) => `rotateX(${14 * t}deg)`,
  left: (t) => `rotateY(${14 * t}deg)`,
  right: (t) => `rotateY(${-14 * t}deg)`,
};

const DPadKey: React.FC<DPadKeyProps> = ({ direction, arrow, label, entranceStart, pressFrame = null }) => {
  const frame = useCurrentFrame();

  const e = interpolate(frame, [entranceStart, entranceStart + 14], [0, 1], {
    easing: ease,
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  const scale = interpolate(e, [0, 1], [0.88, 1]);

  const pressing = pressFrame != null && frame >= pressFrame && frame <= pressFrame + 22;
  const tilt = pressing
    ? interpolate(frame, [pressFrame!, pressFrame! + 8, pressFrame! + 22], [0, 1, 0], {
        easing: ease,
        extrapolateLeft: 'clamp',
        extrapolateRight: 'clamp',
      })
    : 0;
  const ripple = pressing
    ? interpolate(frame, [pressFrame!, pressFrame! + 20], [0, 1], {
        easing: ease,
        extrapolateLeft: 'clamp',
        extrapolateRight: 'clamp',
      })
    : 0;
  const spineFlash = tilt > 0.05;

  return (
    <div style={{ perspective: 600, opacity: e, transform: `scale(${scale})` }}>
      <div
        style={{
          position: 'relative',
          width: 130,
          height: 56,
          background: GLASS.bg,
          border: `1px solid ${alpha(sentinel.white, 0.12)}`,
          borderRadius: 8,
          overflow: 'hidden',
          transform: TILT[direction](tilt),
          display: 'flex',
          alignItems: 'center',
          gap: 10,
          paddingLeft: 16,
        }}
      >
        <div
          style={{
            position: 'absolute',
            left: 0,
            top: 0,
            bottom: 0,
            width: 2,
            background: spineFlash ? pulse.accentHover : pulse.accent,
            boxShadow: spineFlash ? `0 0 12px ${alpha(pulse.accent, 0.7)}` : 'none',
          }}
        />
        {ripple > 0 && (
          <div
            style={{
              position: 'absolute',
              left: '50%',
              top: '50%',
              width: 56,
              height: 56,
              marginLeft: -28,
              marginTop: -28,
              borderRadius: '50%',
              border: `1px solid ${pulse.accentHover}`,
              transform: `scale(${interpolate(ripple, [0, 1], [0.2, 2.8])})`,
              opacity: interpolate(ripple, [0, 1], [0.5, 0]),
            }}
          />
        )}
        <span style={{ fontFamily: mono, fontSize: 14, color: sentinel.accent }}>{arrow}</span>
        <span
          style={{
            fontFamily: mono,
            fontSize: 8,
            fontWeight: 500,
            letterSpacing: '0.15em',
            textTransform: 'uppercase',
            color: C.textSecondary,
          }}
        >
          {label}
        </span>
      </div>
    </div>
  );
};

export default DPadKey;

import React from 'react';
import { interpolate, useCurrentFrame } from 'remotion';
import { base, sentinel, pulse, mono } from '../../tokens';
import { GLASS, ease, alpha } from '../constants';

export type DPadDirection = 'up' | 'down' | 'left' | 'right';

export type DPadKeyProps = {
  direction: DPadDirection;
  arrow: string;
  label: string;
  /** Local frame the entrance starts (for the 4-key stagger). */
  entranceStart: number;
  /** Local frame of the press, or null if this key never presses. */
  pressFrame?: number | null;
};

const ARROW_ANGLE: Record<DPadDirection, string> = {
  up: 'rotateX(-12deg)',
  down: 'rotateX(12deg)',
  left: 'rotateY(12deg)',
  right: 'rotateY(-12deg)',
};

const DPadKey: React.FC<DPadKeyProps> = ({
  direction,
  arrow,
  label,
  entranceStart,
  pressFrame = null,
}) => {
  const frame = useCurrentFrame();

  // entrance: opacity 0→1, y 20→0, scale 0.85→1
  const e = interpolate(frame, [entranceStart, entranceStart + 15], [0, 1], {
    easing: ease,
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  const y = interpolate(e, [0, 1], [20, 0]);
  const scale = interpolate(e, [0, 1], [0.85, 1]);

  // press: tilt INTO direction then spring back; ripple; accent flash
  const pressing =
    pressFrame != null && frame >= pressFrame && frame <= pressFrame + 22;
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

  const tiltTransform =
    tilt > 0
      ? ARROW_ANGLE[direction].replace('12deg', `${12 * tilt}deg`)
      : '';
  const barBright = tilt > 0;

  return (
    <div
      style={{
        perspective: 600,
        opacity: e,
        transform: `translateY(${y}px) scale(${scale})`,
      }}
    >
      <div
        style={{
          position: 'relative',
          width: 150,
          height: 64,
          background: GLASS.bg,
          border: `1px solid ${GLASS.border}`,
          borderRadius: 8,
          overflow: 'hidden',
          transform: tiltTransform,
          display: 'flex',
          alignItems: 'center',
          gap: 12,
          paddingLeft: 18,
        }}
      >
        {/* left accent bar */}
        <div
          style={{
            position: 'absolute',
            left: 0,
            top: 0,
            bottom: 0,
            width: 2,
            background: barBright ? pulse.accentHover : pulse.accent,
            boxShadow: barBright ? `0 0 12px ${alpha(pulse.accent, 0.7)}` : 'none',
          }}
        />
        {/* ripple ring */}
        {ripple > 0 && (
          <div
            style={{
              position: 'absolute',
              left: '50%',
              top: '50%',
              width: 60,
              height: 60,
              marginLeft: -30,
              marginTop: -30,
              borderRadius: '50%',
              border: `1px solid ${pulse.accentHover}`,
              transform: `scale(${interpolate(ripple, [0, 1], [0.3, 2.5])})`,
              opacity: interpolate(ripple, [0, 1], [0.6, 0]),
            }}
          />
        )}
        <span style={{ fontFamily: mono, fontSize: 16, color: sentinel.accent }}>{arrow}</span>
        <span
          style={{
            fontFamily: mono,
            fontSize: 9,
            fontWeight: 500,
            letterSpacing: '0.15em',
            textTransform: 'uppercase',
            color: base.textSecondary,
          }}
        >
          {label}
        </span>
      </div>
    </div>
  );
};

export default DPadKey;

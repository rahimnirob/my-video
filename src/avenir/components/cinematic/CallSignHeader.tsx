import React from 'react';
import { Easing, interpolate, useCurrentFrame, useVideoConfig } from 'remotion';
import OnAirDot from './OnAirDot';
import {
  EASE_SMOOTH,
  REGISTER,
  billboard,
  frames,
  motion,
  tracking,
  sora,
  mono,
} from '../../tokens';

export const register = REGISTER.CINEMATIC;

export type CallSignHeaderProps = {
  season: number;
  year: number;
  delayFrames?: number;
};

const CallSignHeader: React.FC<CallSignHeaderProps> = ({
  season,
  year,
  delayFrames = 0,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const ease = Easing.bezier(...EASE_SMOOTH);
  const local = frame - delayFrames;
  const inF = frames(motion.heroRevealMin, fps);

  const t = interpolate(local, [0, inF], [0, 1], {
    easing: ease,
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  const y = interpolate(t, [0, 1], [6, 0]);

  const seasonStr = String(season).padStart(2, '0');
  const monthStr = String(new Date().getMonth() + 1).padStart(2, '0');
  const stamp = `S${seasonStr} · ${monthStr}.${year}`;

  return (
    <div
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: 12,
        padding: '8px 14px',
        background: 'rgba(10, 12, 16, 0.65)',
        backdropFilter: 'blur(14px)',
        border: '1px solid rgba(232, 93, 58, 0.20)',
        borderRadius: 3,
        boxShadow:
          '0 0 22px rgba(232, 93, 58, 0.08), 0 6px 22px rgba(0, 0, 0, 0.45)',
        opacity: t,
        transform: `translateY(${y}px)`,
      }}
    >
      <span style={{ display: 'inline-flex', alignItems: 'center', gap: 6 }}>
        <OnAirDot color={billboard.primary} />
        <span
          style={{
            fontFamily: mono,
            fontSize: 9,
            fontWeight: 500,
            textTransform: 'uppercase',
            letterSpacing: tracking.billboardCS,
            color: billboard.textHi,
          }}
        >
          ON AIR
        </span>
      </span>
      <span
        style={{
          width: 1,
          height: 14,
          background: 'rgba(240, 242, 244, 0.18)',
        }}
      />
      <span
        style={{
          fontFamily: sora,
          fontSize: 13,
          fontWeight: 700,
          textTransform: 'uppercase',
          letterSpacing: tracking.wordmark,
          color: 'rgba(240, 242, 244, 0.92)',
          textShadow: '0 0 10px rgba(232, 93, 58, 0.10)',
        }}
      >
        AVENIR
      </span>
      <span
        style={{
          width: 1,
          height: 14,
          background: 'rgba(240, 242, 244, 0.12)',
        }}
      />
      <span
        style={{
          fontFamily: mono,
          fontSize: 9,
          fontWeight: 500,
          color: billboard.textMd,
          letterSpacing: tracking.billboardCS,
        }}
      >
        {stamp}
      </span>
    </div>
  );
};

export default CallSignHeader;

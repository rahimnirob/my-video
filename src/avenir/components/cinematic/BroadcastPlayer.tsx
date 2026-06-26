import React from 'react';
import { Easing, interpolate, useCurrentFrame, useVideoConfig } from 'remotion';
import {
  EASE_SMOOTH,
  REGISTER,
  billboard,
  billboardStage,
  frames,
  motion,
} from '../../tokens';

export const register = REGISTER.CINEMATIC;

export type BroadcastPlayerProps = {
  /** Inner content (telemetry, info card, etc.). */
  children?: React.ReactNode;
  /** Override the entry delay. */
  delayFrames?: number;
};

const BroadcastPlayer: React.FC<BroadcastPlayerProps> = ({
  children,
  delayFrames = 0,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const ease = Easing.bezier(...EASE_SMOOTH);
  const local = frame - delayFrames;

  const enterF = frames(motion.playerEnter, fps);
  const t = interpolate(local, [0, enterF], [0, 1], {
    easing: ease,
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  const y = interpolate(t, [0, 1], [motion.playerEnterY, 0]);

  const spinF = frames(motion.conicSpin, fps);
  const spinDeg = ((frame % spinF) / spinF) * 360;

  const radius = billboardStage.player.radius;
  const maxWidth = billboardStage.player.maxWidth;

  const conicStops =
    'transparent 0deg, transparent 28deg, ' +
    `${billboard.primary} 58deg, ` +
    `${billboard.secondary} 86deg, transparent 130deg, ` +
    'transparent 180deg, transparent 208deg, ' +
    `${billboard.primary} 238deg, ` +
    `${billboard.secondary} 266deg, transparent 310deg`;

  return (
    <div
      style={{
        position: 'relative',
        width: maxWidth,
        aspectRatio: billboardStage.player.aspect,
        opacity: t,
        transform: `translateY(${y}px)`,
        borderRadius: radius,
      }}
    >
      {/* Outer halo bloom */}
      <div
        style={{
          position: 'absolute',
          inset: -6,
          borderRadius: radius + 6,
          background: `conic-gradient(from ${spinDeg}deg, ${conicStops})`,
          filter: 'blur(8px)',
          opacity: 0.5,
          pointerEvents: 'none',
        }}
      />
      {/* Inner ring */}
      <div
        style={{
          position: 'absolute',
          inset: -2,
          borderRadius: radius + 2,
          background: `conic-gradient(from ${spinDeg}deg, ${conicStops})`,
          WebkitMask: `radial-gradient(closest-side, transparent calc(100% - 2px), #000 calc(100% - 2px))`,
          mask: `radial-gradient(closest-side, transparent calc(100% - 2px), #000 calc(100% - 2px))`,
          pointerEvents: 'none',
        }}
      />
      {/* Player surface */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          borderRadius: radius,
          background: billboardStage.player.bg,
          backdropFilter: `blur(${billboardStage.player.backdropBlur}px)`,
          overflow: 'hidden',
        }}
      >
        {/* Cinema vignette */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            background: billboardStage.vignette,
            zIndex: 5,
            pointerEvents: 'none',
          }}
        />
        {children}
      </div>
    </div>
  );
};

export default BroadcastPlayer;

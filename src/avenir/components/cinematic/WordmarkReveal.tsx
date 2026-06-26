import React from 'react';
import { Easing, interpolate, useCurrentFrame, useVideoConfig } from 'remotion';
import {
  EASE_SMOOTH,
  REGISTER,
  base,
  billboard,
  frames,
  motion,
  tracking,
  sora,
} from '../../tokens';

export const register = REGISTER.CINEMATIC;

export type WordmarkRevealProps = {
  text?: string;
  delayFrames?: number;
  size?: number;
  weight?: 700 | 800;
  haloColor?: string;
  durationMs?: number;
};

const WordmarkReveal: React.FC<WordmarkRevealProps> = ({
  text = 'AVENIR',
  delayFrames = 0,
  size = 96,
  weight = 800,
  haloColor = billboard.glow,
  durationMs = motion.heroRevealMin,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const ease = Easing.bezier(...EASE_SMOOTH);
  const local = frame - delayFrames;
  const inF = frames(durationMs, fps);

  const t = interpolate(local, [0, inF], [0, 1], {
    easing: ease,
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  const y = interpolate(t, [0, 1], [12, 0]);

  return (
    <span
      style={{
        display: 'inline-block',
        fontFamily: sora,
        fontSize: size,
        fontWeight: weight,
        letterSpacing: tracking.wordmark,
        textTransform: 'uppercase',
        color: base.textPrimary,
        opacity: t,
        transform: `translateY(${y}px)`,
        textShadow: `0 0 60px ${haloColor}`,
      }}
    >
      {text}
    </span>
  );
};

export default WordmarkReveal;

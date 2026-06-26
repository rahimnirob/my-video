import React from 'react';
import { Easing, interpolate, useCurrentFrame, useVideoConfig } from 'remotion';
import {
  EASE_SMOOTH,
  REGISTER,
  base,
  frames,
  motion,
  tracking,
  sora,
} from '../../tokens';

export const register = REGISTER.RAW;

export type KineticHeadlineProps = {
  text: string;
  /** Zero-based word index to swap to `accentColor` on its beat. */
  accentWordIndex?: number;
  accentColor?: string;
  delayFrames?: number;
  /** Per-word reveal interval (ms). Spec: 40–80ms intra-line. */
  wordStaggerMs?: number;
  /** Reveal duration per word (ms). */
  wordRevealMs?: number;
  size?: number;
  weight?: 700 | 800;
};

const KineticHeadline: React.FC<KineticHeadlineProps> = ({
  text,
  accentWordIndex,
  accentColor,
  delayFrames = 0,
  wordStaggerMs = 60,
  wordRevealMs = motion.heroRevealMin,
  size = 64,
  weight = 700,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const ease = Easing.bezier(...EASE_SMOOTH);
  const local = frame - delayFrames;
  const staggerF = frames(wordStaggerMs, fps);
  const revealF = frames(wordRevealMs, fps);

  const words = text.split(' ');

  return (
    <h1
      style={{
        fontFamily: sora,
        fontSize: size,
        fontWeight: weight,
        letterSpacing: tracking.headlineTight,
        lineHeight: 1.05,
        color: base.textPrimary,
        margin: 0,
        display: 'flex',
        flexWrap: 'wrap',
        gap: `${size * 0.28}px`,
      }}
    >
      {words.map((word, i) => {
        const wordStart = i * staggerF;
        const t = interpolate(local, [wordStart, wordStart + revealF], [0, 1], {
          easing: ease,
          extrapolateLeft: 'clamp',
          extrapolateRight: 'clamp',
        });
        const y = interpolate(t, [0, 1], [size * 0.18, 0]);
        const isAccent = accentWordIndex === i;
        return (
          <span
            key={`${word}-${i}`}
            style={{
              display: 'inline-block',
              overflow: 'hidden',
              clipPath: `inset(0 0 ${(1 - t) * 100}% 0)`,
              color: isAccent ? accentColor ?? base.textPrimary : base.textPrimary,
            }}
          >
            <span
              style={{
                display: 'inline-block',
                transform: `translateY(${y}px)`,
              }}
            >
              {word}
            </span>
          </span>
        );
      })}
    </h1>
  );
};

export default KineticHeadline;

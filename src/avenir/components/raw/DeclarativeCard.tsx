import React from 'react';
import { Easing, interpolate, useCurrentFrame, useVideoConfig } from 'remotion';
import {
  EASE_SMOOTH,
  REGISTER,
  base,
  frames,
  motion,
  tracking,
  type,
  sora,
  mono,
} from '../../tokens';

export const register = REGISTER.RAW;

export type DeclarativeCardProps = {
  headline: string;
  subLabel?: string;
  delayFrames?: number;
  /** Card entrance duration (ms). */
  durationMs?: number;
  /** Child stagger (ms) between subLabel and headline. */
  staggerMs?: number;
  width?: number | string;
  padding?: number;
  align?: 'left' | 'center';
};

const DeclarativeCard: React.FC<DeclarativeCardProps> = ({
  headline,
  subLabel,
  delayFrames = 0,
  durationMs = motion.heroRevealMin,
  staggerMs = motion.staggerMin,
  width = 720,
  padding = 56,
  align = 'left',
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const ease = Easing.bezier(...EASE_SMOOTH);
  const local = frame - delayFrames;
  const inF = frames(durationMs, fps);
  const stF = frames(staggerMs, fps);

  const cardT = interpolate(local, [0, inF], [0, 1], {
    easing: ease,
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  const cardY = interpolate(cardT, [0, 1], [8, 0]);

  const subT = interpolate(local - stF, [0, inF], [0, 1], {
    easing: ease,
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  const headT = interpolate(local - stF * 2, [0, inF], [0, 1], {
    easing: ease,
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  return (
    <div
      style={{
        width,
        padding,
        background: base.glassBg,
        border: `1px solid ${base.glassBorder}`,
        borderRadius: 12,
        opacity: cardT,
        transform: `translateY(${cardY}px)`,
        display: 'flex',
        flexDirection: 'column',
        alignItems: align === 'center' ? 'center' : 'flex-start',
        textAlign: align,
        gap: 18,
      }}
    >
      {subLabel ? (
        <span
          style={{
            fontFamily: mono,
            fontSize: type.microLabel.size,
            fontWeight: 500,
            textTransform: 'uppercase',
            letterSpacing: tracking.microLabel,
            color: base.textSecondary,
            clipPath: `inset(0 ${(1 - subT) * 100}% 0 0)`,
            display: 'inline-block',
          }}
        >
          {subLabel}
        </span>
      ) : null}
      <h2
        style={{
          fontFamily: sora,
          fontSize: type.headingLg.size,
          fontWeight: type.headingLg.weight,
          letterSpacing: tracking.headlineTight,
          lineHeight: 1.1,
          color: base.textPrimary,
          margin: 0,
          clipPath: `inset(0 0 ${(1 - headT) * 100}% 0)`,
        }}
      >
        {headline}
      </h2>
    </div>
  );
};

export default DeclarativeCard;

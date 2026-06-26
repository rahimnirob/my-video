import React from 'react';
import { interpolate, useCurrentFrame } from 'remotion';
import { base, sentinel, mono, sora, manrope, tracking } from '../../tokens';
import { ease } from '../constants';

export type CaptionLine = {
  text: string;
  size?: number;
  color?: string;
  family?: 'sora' | 'manrope';
  weight?: number;
};

export type SceneCaptionProps = {
  microLabel: string;
  microColor?: string;
  lines: CaptionLine[];
  /** Local (scene-relative) frame the first element reveals. */
  startFrame: number;
  staggerFrames?: number;
  align?: 'left' | 'center';
};

const FAMILY = { sora, manrope } as const;

/** Reveal helper: opacity 0→1 + y 12→0 over 15 frames at `delay`. */
const useReveal = (frame: number, delay: number) => {
  const t = interpolate(frame, [delay, delay + 15], [0, 1], {
    easing: ease,
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  return { opacity: t, transform: `translateY(${interpolate(t, [0, 1], [12, 0])}px)` };
};

/**
 * Staggered text overlay (micro-label + N heading/body lines). Used for the
 * SCENE 3 left block and the SCENE 5 D-Pad labels.
 */
const SceneCaption: React.FC<SceneCaptionProps> = ({
  microLabel,
  microColor = sentinel.accent,
  lines,
  startFrame,
  staggerFrames = 15,
  align = 'left',
}) => {
  const frame = useCurrentFrame();

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: align === 'center' ? 'center' : 'flex-start',
        textAlign: align,
        gap: 14,
      }}
    >
      <span
        style={{
          fontFamily: mono,
          fontSize: 10,
          fontWeight: 500,
          letterSpacing: tracking.microLabel,
          textTransform: 'uppercase',
          color: microColor,
          ...useReveal(frame, startFrame),
        }}
      >
        {microLabel}
      </span>
      {lines.map((ln, i) => (
        <span
          key={i}
          style={{
            fontFamily: FAMILY[ln.family ?? 'manrope'],
            fontSize: ln.size ?? 18,
            fontWeight: ln.weight ?? 400,
            color: ln.color ?? base.textSecondary,
            letterSpacing: ln.family === 'sora' ? tracking.headlineTight : '0em',
            lineHeight: 1.5,
            ...useReveal(frame, startFrame + staggerFrames * (i + 1)),
          }}
        >
          {ln.text}
        </span>
      ))}
    </div>
  );
};

export default SceneCaption;

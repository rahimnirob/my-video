import React from 'react';
import {
  AbsoluteFill,
  Easing,
  interpolate,
  useCurrentFrame,
  useVideoConfig,
} from 'remotion';
import { frames, EASE_SMOOTH } from '../../tokens';
import { s } from '../layout';
import Sentinel from './Sentinel';

/**
 * CaptionFocus — the broadcast caption ritual: just before the typography, the
 * screen blurs (focus pull) and the character steps in; THEN the words type.
 * Render this just before a KineticHeadline (which should sit at a higher z).
 */
export type CaptionFocusProps = {
  headlineAt: number;
  side?: 'left' | 'right';
  pose?: 1 | 2;
  variant?: 'cold' | 'billboard';
  charHeight?: number;
  /** Scene frame at which the blur + character lift away (revealing content). */
  releaseAt?: number;
};

const CaptionFocus: React.FC<CaptionFocusProps> = ({
  headlineAt,
  side = 'left',
  pose = 1,
  variant = 'billboard',
  charHeight,
  releaseAt,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const ease = Easing.bezier(...EASE_SMOOTH);
  const ramp = (a: number, b: number) =>
    interpolate(frame, [a, b], [0, 1], {
      easing: ease,
      extrapolateLeft: 'clamp',
      extrapolateRight: 'clamp',
    });

  const charAt = headlineAt - frames(540, fps);
  const release = releaseAt != null ? ramp(releaseAt, releaseAt + frames(380, fps)) : 0;
  const blur = ramp(charAt, charAt + frames(420, fps)) * (1 - release);
  const charIn = ramp(charAt, charAt + frames(560, fps)) * (1 - release);

  // Attention-keeper: an energy glow behind the character that breathes.
  const pulse = 0.5 + 0.5 * Math.sin((frame / (1.6 * fps)) * Math.PI * 2);
  const glowRgb = variant === 'billboard' ? '232,93,58' : '139,92,246';
  const glowEdge = side === 'left' ? '24%' : '76%';
  const darken = variant === 'billboard' ? '8,3,2' : '3,2,8';

  return (
    <>
      {/* focus pull — blur + darken the screen behind the caption */}
      <AbsoluteFill
        style={{
          backdropFilter: `blur(${blur * s(6)}px)`,
          WebkitBackdropFilter: `blur(${blur * s(6)}px)`,
          background: `rgba(${darken},${blur * 0.34})`,
          zIndex: 30,
        }}
      />
      {/* breathing energy glow behind the guide */}
      <AbsoluteFill
        style={{
          zIndex: 30,
          opacity: charIn,
          background: `radial-gradient(ellipse 34% 60% at ${glowEdge} 64%, rgba(${glowRgb},${0.16 + 0.1 * pulse}) 0%, transparent 62%)`,
        }}
      />
      {/* the character steps in first */}
      <Sentinel
        variant={variant}
        pose={pose}
        side={side}
        height={charHeight ?? s(370)}
        opacity={charIn * 0.97}
        zIndex={31}
        dx={s(-24)}
      />
    </>
  );
};

export default CaptionFocus;

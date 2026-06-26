import React from 'react';
import { AbsoluteFill, interpolate } from 'remotion';
import { ease, FONT_FAMILY } from '../ares-tokens';

/**
 * GlitchText — entry (opacity + translateY rise), an optional single-frame
 * glitch artifact (opacity spikes down), and exit fade. Used for the bold glow
 * headlines ("Drowning.", lower-third copy, etc.).
 */
const clamp = { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' } as const;

const GlitchText: React.FC<{
  text: string;
  frame: number;
  entryFrame: number;
  exitFrame: number;
  fontSize: number;
  color: string;
  glowColor?: string;
  textShadow?: string;
  glitchFrame?: number;
  fontWeight?: number;
  letterSpacing?: string;
  opacityMax?: number;
  enterY?: number;
  yOffset?: number;
  entryDur?: number;
  exitDur?: number;
}> = ({
  text,
  frame,
  entryFrame,
  exitFrame,
  fontSize,
  color,
  glowColor,
  textShadow,
  glitchFrame,
  fontWeight = 800,
  letterSpacing,
  opacityMax = 1,
  enterY = 8,
  yOffset = 0,
  entryDur = 20,
  exitDur = 10,
}) => {
  const inP = interpolate(frame, [entryFrame, entryFrame + entryDur], [0, 1], { easing: ease, ...clamp });
  const outP = interpolate(frame, [exitFrame, exitFrame + exitDur], [0, 1], clamp);
  const glitch = glitchFrame != null && frame === glitchFrame ? 0.3 : 1;
  const opacity = inP * (1 - outP) * glitch * opacityMax;
  const ty = yOffset + (1 - inP) * enterY;
  const shadow = textShadow ?? (glowColor ? `0 0 24px ${glowColor}` : undefined);
  return (
    <AbsoluteFill style={{ alignItems: 'center', justifyContent: 'center' }}>
      <div
        style={{
          transform: `translateY(${ty}px)`,
          opacity,
          fontFamily: FONT_FAMILY,
          fontWeight,
          fontSize,
          color,
          letterSpacing,
          textShadow: shadow,
          textAlign: 'center',
          whiteSpace: 'nowrap',
        }}
      >
        {text}
      </div>
    </AbsoluteFill>
  );
};

export default GlitchText;

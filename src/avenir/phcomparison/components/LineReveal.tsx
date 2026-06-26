import React from 'react';
import { useCurrentFrame } from 'remotion';
import { ramp, lerp, REVEAL_FRAMES, SORA } from '../constants';

export type LineRevealProps = {
  text: string;
  startFrame: number;
  /** Reveal duration in frames (brief default: 14). */
  duration?: number;
  font?: string;
  size: number;
  weight?: number;
  color: string;
  align?: 'left' | 'center';
  tracking?: string;
  /** Enter-from distance in px (brief default: 10). */
  riseY?: number;
  /** Steady-state opacity once revealed (used by scene dims, e.g. 0.7, 0.4). */
  holdOpacity?: number;
  /** Animate the held opacity to `dimTo` between dimFrom→dimFrom+dimDur. */
  dimTo?: number;
  dimFrom?: number;
  dimDur?: number;
  /** Absolute frame where the line fades out (opacity → 0 over `duration`). */
  exitAt?: number;
  /** Static text-shadow (e.g. violet CTA glow). */
  shadow?: string;
  uppercase?: boolean;
};

/**
 * One line revealed as a unit: opacity 0→1 + translateY riseY→0 over `duration`
 * frames on the house curve. Optional later dim (held opacity ramps to dimTo)
 * and exit fade so beats can lose energy or melt away without a hard cut.
 */
const LineReveal: React.FC<LineRevealProps> = ({
  text,
  startFrame,
  duration = REVEAL_FRAMES,
  font = SORA,
  size,
  weight = 400,
  color,
  align = 'left',
  tracking = 'normal',
  riseY = 10,
  holdOpacity = 1,
  dimTo,
  dimFrom,
  dimDur = 20,
  exitAt,
  shadow,
  uppercase = false,
}) => {
  const frame = useCurrentFrame();
  const inT = ramp(frame, startFrame, startFrame + duration);

  // Optional dim: blend held opacity toward dimTo across the dim window.
  let held = holdOpacity;
  if (dimTo != null && dimFrom != null) {
    const d = lerp(frame, dimFrom, dimFrom + dimDur);
    held = holdOpacity + (dimTo - holdOpacity) * d;
  }

  const outT = exitAt != null ? ramp(frame, exitAt, exitAt + duration) : 0;
  const opacity = inT * held * (1 - outT);
  const y = (1 - inT) * riseY;

  return (
    <div
      style={{
        fontFamily: font,
        fontWeight: weight,
        fontSize: size,
        color,
        letterSpacing: tracking,
        textAlign: align,
        textTransform: uppercase ? 'uppercase' : 'none',
        textShadow: shadow,
        opacity,
        transform: `translateY(${y}px)`,
        lineHeight: 1.15,
        margin: 0,
      }}
    >
      {text}
    </div>
  );
};

export default LineReveal;

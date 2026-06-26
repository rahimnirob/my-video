import React from 'react';
import { useCurrentFrame } from 'remotion';
import { ramp, lerp, REVEAL_FRAMES, MONO } from '../constants';

export type MicroLabelProps = {
  text: string;
  startFrame: number;
  color: string;
  align?: 'left' | 'center';
  /** Animate color → dimColor across dimFrom→dimFrom+dimDur (PH label fade). */
  dimColor?: string;
  dimFrom?: number;
  dimDur?: number;
  holdOpacity?: number;
  dimTo?: number;
};

/** JetBrains Mono micro-label: 10px, uppercase, 0.22em tracking. */
const MicroLabel: React.FC<MicroLabelProps> = ({
  text,
  startFrame,
  color,
  align = 'left',
  dimColor,
  dimFrom,
  dimDur = 20,
  holdOpacity = 1,
  dimTo,
}) => {
  const frame = useCurrentFrame();
  const inT = ramp(frame, startFrame, startFrame + REVEAL_FRAMES);

  // The PH label dims by swapping color (not just opacity) as the world dies.
  let resolvedColor = color;
  if (dimColor && dimFrom != null) {
    const d = lerp(frame, dimFrom, dimFrom + dimDur);
    resolvedColor = d > 0.5 ? dimColor : color;
  }

  let held = holdOpacity;
  if (dimTo != null && dimFrom != null) {
    const d = lerp(frame, dimFrom, dimFrom + dimDur);
    held = holdOpacity + (dimTo - holdOpacity) * d;
  }

  const y = (1 - inT) * 10;

  return (
    <div
      style={{
        fontFamily: MONO,
        fontWeight: 500,
        fontSize: 10,
        color: resolvedColor,
        letterSpacing: '0.22em',
        textTransform: 'uppercase',
        textAlign: align,
        opacity: inT * held,
        transform: `translateY(${y}px)`,
        margin: 0,
      }}
    >
      {text}
    </div>
  );
};

export default MicroLabel;

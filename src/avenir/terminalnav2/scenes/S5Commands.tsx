import React from 'react';
import { AbsoluteFill, useCurrentFrame } from 'remotion';
import { mono } from '../../tokens';
import { C, ramp, alpha } from '../constants';
import { CalloutBox } from '../components';

/** A mono scene-label that fades in/out in place (NAVIGATE → FILTER → JUMP). */
const SwapLabel: React.FC<{ text: string; inAt: number; outAt: number }> = ({ text, inAt, outAt }) => {
  const frame = useCurrentFrame();
  const op = ramp(frame, inAt, inAt + 12) * (1 - ramp(frame, outAt, outAt + 10));
  if (op <= 0) return null;
  return (
    <div
      style={{
        position: 'absolute',
        left: 80,
        top: 120,
        fontFamily: mono,
        fontSize: 10,
        fontWeight: 500,
        letterSpacing: '0.22em',
        textTransform: 'uppercase',
        color: alpha(C.silver, 0.5),
        opacity: op,
        transform: `translateY(${(1 - ramp(frame, inAt, inAt + 12)) * 8}px)`,
      }}
    >
      {text}
    </div>
  );
};

/**
 * SCENE 5 — COMMANDS (F480–F720). The persistent terminal bar (composition
 * controller) types three commands; here we carry the rotating scene label and
 * the callout that highlights the product-card area being acted on.
 */
const S5Commands: React.FC = () => {
  const frame = useCurrentFrame();
  const vis = 1 - ramp(frame, 706, 722);
  if (frame < 488 || vis <= 0) return null;

  return (
    <AbsoluteFill style={{ opacity: vis }}>
      <SwapLabel text="NAVIGATE" inAt={500} outAt={590} />
      <SwapLabel text="FILTER" inAt={600} outAt={668} />
      <SwapLabel text="JUMP" inAt={675} outAt={710} />

      {/* callout around the product-card area of pulse.png */}
      {/* TODO(align): card rect (x430,y80,380×620) measured against pulse.png — adjust if crop shifts. */}
      <CalloutBox x={430} y={80} width={380} height={620} startFrame={565} exitAt={706} />
    </AbsoluteFill>
  );
};

export default S5Commands;

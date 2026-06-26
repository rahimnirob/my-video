import React from 'react';
import { AbsoluteFill, interpolate, useCurrentFrame } from 'remotion';
import { LineReveal, MicroLabel } from '../components';
import {
  MARGIN_X,
  SORA,
  ANS_TEXT_HI,
  ANS_TEXT_MD,
  ANS_ACCENT,
  ANS_VIOLET,
  ramp,
  lerp,
} from '../constants';

/**
 * SCENE 4 — ANSWER (F330–F540). Silver/violet ALIVE palette — a different world
 * from S1–S2. "Ever." is the signature: violet 64px/800, with a single glow
 * pulse after it lands. F500 lines dim to 80%; F540 they fade out into S5.
 */
const DIM_FROM = 500;
const EXIT = 540;

const Ever: React.FC = () => {
  const frame = useCurrentFrame();
  const inT = ramp(frame, 430, 448); // 18-frame reveal
  const y = (1 - inT) * 16;

  // Single glow pulse after the reveal: 0 → 0.4 → 0 over F448–F478.
  const pulse = interpolate(frame, [448, 463, 478], [0, 1, 0], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  const glow = `0 0 60px rgba(139,92,246,${0.4 * pulse})`;

  const dim = 1 + (0.8 - 1) * lerp(frame, DIM_FROM, DIM_FROM + 40);
  const exit = ramp(frame, EXIT, EXIT + 14);

  return (
    <div
      style={{
        fontFamily: SORA,
        fontWeight: 800,
        fontSize: 64,
        color: ANS_VIOLET,
        textShadow: glow,
        opacity: inT * dim * (1 - exit),
        transform: `translateY(${y}px)`,
        lineHeight: 1.1,
        marginTop: 28,
      }}
    >
      Ever.
    </div>
  );
};

const S4Answer: React.FC = () => {
  const frame = useCurrentFrame();
  if (frame < 330 || frame >= 556) return null;

  return (
    <AbsoluteFill
      style={{
        justifyContent: 'center',
        alignItems: 'flex-start',
        paddingLeft: MARGIN_X,
      }}
    >
      <div style={{ display: 'flex', flexDirection: 'column' }}>
        <MicroLabel text="AVENIR" startFrame={330} color={ANS_ACCENT} />
        <div style={{ height: 24 }} />
        <LineReveal
          text="30 days of broadcast."
          startFrame={348}
          font={SORA}
          weight={400}
          size={44}
          color={ANS_TEXT_HI}
          dimTo={0.8}
          dimFrom={DIM_FROM}
          dimDur={40}
          exitAt={EXIT}
        />
        <LineReveal
          text="Permanent archive."
          startFrame={364}
          font={SORA}
          weight={700}
          size={44}
          color={ANS_TEXT_HI}
          dimTo={0.8}
          dimFrom={DIM_FROM}
          dimDur={40}
          exitAt={EXIT}
        />
        <div style={{ height: 40 }} />
        <LineReveal
          text="Your slot doesn't expire."
          startFrame={394}
          font={SORA}
          weight={400}
          size={32}
          color={ANS_TEXT_MD}
          dimTo={0.8}
          dimFrom={DIM_FROM}
          dimDur={40}
          exitAt={EXIT}
        />
        <Ever />
      </div>
    </AbsoluteFill>
  );
};

export default S4Answer;

import React from 'react';
import { AbsoluteFill, useCurrentFrame } from 'remotion';
import { LineReveal, MicroLabel } from '../components';
import { SORA, ANS_TEXT_HI, ANS_TEXT_MD, ANS_DIM, ramp } from '../constants';

/**
 * SCENE 6 — CLOSE (F690–F900). Centered. Thin rule → AVENIR wordmark (wide
 * tracking, soft chrome halo) → tagline → "ATHENA LABS" dim at the bottom.
 * Holds on the wordmark to the end — no fade to black.
 */
const Rule: React.FC = () => {
  const frame = useCurrentFrame();
  const w = ramp(frame, 710, 726) * 120;
  return (
    <div
      style={{
        width: w,
        height: 1,
        backgroundColor: 'rgba(208,212,220,0.15)',
        marginBottom: 36,
      }}
    />
  );
};

const S6Close: React.FC = () => {
  const frame = useCurrentFrame();
  if (frame < 690) return null;

  return (
    <AbsoluteFill style={{ justifyContent: 'center', alignItems: 'center' }}>
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          textAlign: 'center',
        }}
      >
        <Rule />
        <LineReveal
          text="AVENIR"
          startFrame={730}
          font={SORA}
          weight={800}
          size={96}
          color={ANS_TEXT_HI}
          align="center"
          tracking="0.24em"
          riseY={8}
          duration={20}
          shadow="0 0 100px rgba(208,212,220,0.07)"
        />
        <div style={{ height: 32 }} />
        <LineReveal
          text="For products that deserve to be found."
          startFrame={760}
          font={SORA}
          weight={400}
          size={22}
          color={ANS_TEXT_MD}
          align="center"
        />
        <div style={{ height: 24 }} />
        <MicroLabel text="ATHENA LABS" startFrame={800} color={ANS_DIM} align="center" />
      </div>
    </AbsoluteFill>
  );
};

export default S6Close;

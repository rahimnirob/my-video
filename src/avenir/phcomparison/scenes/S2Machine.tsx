import React from 'react';
import { AbsoluteFill, useCurrentFrame } from 'remotion';
import { LineReveal, MicroLabel } from '../components';
import {
  MARGIN_X,
  SORA,
  PROB_TEXT_HI,
  PROB_TEXT_MD,
  PROB_TEXT_LO,
  PH_LABEL,
  PH_LABEL_DIM,
} from '../constants';

/**
 * SCENE 2 — MACHINE (F120–F270). Continuous from S1.
 * "PRODUCT HUNT" in muted brown; "page 47" lands with a weight drop; the cruel
 * irony ("That's the design.") sits heaviest on the dimmest color. F240–F270
 * everything dims to 40% and the PH label fades to PH_LABEL_DIM. HARD CUT at 270.
 */
const DIM_FROM = 240;

const S2Machine: React.FC = () => {
  const frame = useCurrentFrame();
  if (frame < 120 || frame >= 270) return null; // F270 hard cut: gone instantly

  return (
    <AbsoluteFill
      style={{
        justifyContent: 'center',
        alignItems: 'flex-start',
        paddingLeft: MARGIN_X,
      }}
    >
      <div style={{ display: 'flex', flexDirection: 'column' }}>
        <MicroLabel
          text="PRODUCT HUNT"
          startFrame={120}
          color={PH_LABEL}
          dimColor={PH_LABEL_DIM}
          dimFrom={DIM_FROM}
          dimTo={0.4}
        />
        <div style={{ height: 24 }} />
        <LineReveal
          text="Yesterday's #1"
          startFrame={140}
          font={SORA}
          weight={700}
          size={52}
          color={PROB_TEXT_HI}
          dimTo={0.4}
          dimFrom={DIM_FROM}
        />
        <LineReveal
          text="is today's page 47."
          startFrame={156}
          font={SORA}
          weight={400}
          size={52}
          color={PROB_TEXT_MD}
          dimTo={0.4}
          dimFrom={DIM_FROM}
        />
        <div style={{ height: 48 }} />
        <LineReveal
          text="That's not a bug."
          startFrame={200}
          font={SORA}
          weight={400}
          size={28}
          color={PROB_TEXT_MD}
          dimTo={0.4}
          dimFrom={DIM_FROM}
        />
        <LineReveal
          text="That's the design."
          startFrame={216}
          font={SORA}
          weight={700}
          size={28}
          color={PROB_TEXT_LO}
          dimTo={0.4}
          dimFrom={DIM_FROM}
        />
      </div>
    </AbsoluteFill>
  );
};

export default S2Machine;

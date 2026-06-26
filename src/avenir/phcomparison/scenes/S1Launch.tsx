import React from 'react';
import { AbsoluteFill, useCurrentFrame } from 'remotion';
import { LineReveal } from '../components';
import { MARGIN_X, SORA, PROB_TEXT_HI, PROB_TEXT_MD } from '../constants';

/**
 * SCENE 1 — LAUNCH (F0–F120, continuous into S2).
 * Three lines in the warm-dim PROBLEM palette, weight progression visible.
 * F90–F120 all lines dim to 70%; F120+ they clear (fade) as S2 takes over.
 */
const S1Launch: React.FC = () => {
  const frame = useCurrentFrame();
  if (frame >= 140) return null; // cleared into S2

  return (
    <AbsoluteFill
      style={{
        justifyContent: 'center',
        alignItems: 'flex-start',
        paddingLeft: MARGIN_X,
      }}
    >
      <div style={{ display: 'flex', flexDirection: 'column' }}>
        <LineReveal
          text="You spent a year building it."
          startFrame={0}
          font={SORA}
          weight={400}
          size={38}
          color={PROB_TEXT_HI}
          dimTo={0.7}
          dimFrom={90}
          exitAt={120}
        />
        <LineReveal
          text="Your launch got 24 hours."
          startFrame={16}
          font={SORA}
          weight={700}
          size={38}
          color={PROB_TEXT_HI}
          dimTo={0.7}
          dimFrom={90}
          exitAt={120}
        />
        <div style={{ height: 40 }} />
        <LineReveal
          text="Then the clock reset."
          startFrame={48}
          font={SORA}
          weight={400}
          size={28}
          color={PROB_TEXT_MD}
          dimTo={0.7}
          dimFrom={90}
          exitAt={120}
        />
      </div>
    </AbsoluteFill>
  );
};

export default S1Launch;

import React from 'react';
import { AbsoluteFill, useCurrentFrame } from 'remotion';
import { LineReveal } from '../components';
import { SORA, MONO, ANS_TEXT_HI, ANS_TEXT_MD, ANS_ACCENT, ANS_VIOLET } from '../constants';

/**
 * SCENE 5 — PROOF (F540–F690). Center-aligned. The honest numbers (§9):
 * "Season 01. 17 products. Permanently archived." — "17 products." earns its
 * 72px. "Season 02 is open." is the violet CTA. F690 fades out into S6.
 */
const EXIT = 690;

const S5Proof: React.FC = () => {
  const frame = useCurrentFrame();
  if (frame < 540 || frame >= 712) return null;

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
        <LineReveal
          text="Season 01."
          startFrame={555}
          font={MONO}
          weight={500}
          size={18}
          color={ANS_ACCENT}
          align="center"
          tracking="0.12em"
          uppercase
          exitAt={EXIT}
        />
        <div style={{ height: 20 }} />
        <LineReveal
          text="17 products."
          startFrame={571}
          font={SORA}
          weight={800}
          size={72}
          color={ANS_TEXT_HI}
          align="center"
          exitAt={EXIT}
        />
        <div style={{ height: 16 }} />
        <LineReveal
          text="Permanently archived."
          startFrame={587}
          font={SORA}
          weight={400}
          size={28}
          color={ANS_TEXT_MD}
          align="center"
          exitAt={EXIT}
        />
        <div style={{ height: 56 }} />
        <LineReveal
          text="Season 02 is open."
          startFrame={630}
          font={SORA}
          weight={700}
          size={36}
          color={ANS_VIOLET}
          align="center"
          shadow="0 0 40px rgba(139,92,246,0.3)"
          exitAt={EXIT}
        />
      </div>
    </AbsoluteFill>
  );
};

export default S5Proof;

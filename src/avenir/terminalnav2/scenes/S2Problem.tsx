import React from 'react';
import { AbsoluteFill, interpolate, useCurrentFrame } from 'remotion';
import { sora, mono } from '../../tokens';
import { C, alpha } from '../constants';
import { LineReveal } from '../components';

/**
 * SCENE 2 — PROBLEM (F90–F240). Four lines stagger in with a weight decay
 * (bold → light → mono dim), dim to 60% near the end, then HARD CUT at F240
 * (content vanishes — the pivot's contrast depends on it).
 */
const S2Problem: React.FC = () => {
  const frame = useCurrentFrame();
  if (frame >= 240) return null; // hard cut into PIVOT
  const dim = interpolate(frame, [200, 240], [1, 0.6], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

  return (
    <AbsoluteFill style={{ opacity: dim }}>
      <div style={{ position: 'absolute', left: 120, top: '50%', transform: 'translateY(-50%)', display: 'flex', flexDirection: 'column', gap: 14 }}>
        <LineReveal text="Every website." startFrame={100} fontSize={44} fontFamily={sora} color={C.textPrimary} weight={700} blurIn={4} />
        <LineReveal text="Same navigation." startFrame={116} fontSize={44} fontFamily={sora} color={C.textSecondary} weight={700} blurIn={4} />
        <LineReveal text="Dropdown. Click. Repeat." startFrame={132} fontSize={32} fontFamily={sora} color={C.textMuted} weight={400} blurIn={4} />
        <LineReveal
          text="Since 2005."
          startFrame={160}
          fontSize={18}
          fontFamily={mono}
          color={alpha(C.textMuted, 0.6)}
          weight={400}
          tracking="0.08em"
        />
      </div>
    </AbsoluteFill>
  );
};

export default S2Problem;

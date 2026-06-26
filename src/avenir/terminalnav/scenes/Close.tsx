import React from 'react';
import { AbsoluteFill, interpolate, useCurrentFrame, useVideoConfig } from 'remotion';
import { base, sentinel, sora, mono, tracking } from '../../tokens';
import { ease, alpha } from '../constants';

/**
 * SCENE 6 — CLOSE (local 0–210). The landing: a thin rule, the AVENIR wordmark
 * with a breathing chrome halo, two micro-labels, and the persistent terminal
 * cursor still blinking at the very end (no fade to black).
 */
const Close: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const ruleIn = interpolate(frame, [30, 45], [0, 1], { easing: ease, extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const markIn = interpolate(frame, [45, 65], [0, 1], { easing: ease, extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const microIn = interpolate(frame, [75, 90], [0, 1], { easing: ease, extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const athenaIn = interpolate(frame, [100, 115], [0, 1], { easing: ease, extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

  // wordmark glow breathes ±10% on a 3s cycle
  const breathe = (Math.sin((frame / fps / 3) * Math.PI * 2) + 1) / 2;
  const glowAlpha = 0.08 * (0.9 + breathe * 0.2);

  return (
    <AbsoluteFill style={{ background: base.bgBase }}>
      <AbsoluteFill style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 26 }}>
        {/* thin rule */}
        <div style={{ width: 120, height: 1, background: alpha(sentinel.white, 0.12), opacity: ruleIn }} />

        {/* AVENIR wordmark */}
        <span
          style={{
            fontFamily: sora,
            fontSize: 96,
            fontWeight: 800,
            letterSpacing: tracking.wordmark,
            color: base.textPrimary,
            textShadow: `0 0 120px ${alpha(sentinel.accent, glowAlpha)}`,
            opacity: markIn,
            transform: `translateY(${interpolate(markIn, [0, 1], [8, 0])}px)`,
          }}
        >
          AVENIR
        </span>

        {/* micro-label */}
        <span
          style={{
            fontFamily: mono,
            fontSize: 10,
            fontWeight: 500,
            letterSpacing: tracking.microLabel,
            textTransform: 'uppercase',
            color: alpha(sentinel.accent, 0.6),
            opacity: microIn,
          }}
        >
          TERMINAL NAVIGATION · BUILT IN
        </span>

        {/* attribution */}
        <span
          style={{
            fontFamily: mono,
            fontSize: 9,
            letterSpacing: '0.18em',
            textTransform: 'uppercase',
            color: base.textMuted,
            opacity: athenaIn,
          }}
        >
          ATHENA LABS
        </span>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};

export default Close;

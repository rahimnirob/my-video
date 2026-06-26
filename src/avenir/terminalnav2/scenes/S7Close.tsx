import React from 'react';
import { AbsoluteFill, interpolate, useCurrentFrame } from 'remotion';
import { sora, mono, tracking } from '../../tokens';
import { C, ramp, alpha } from '../constants';

/**
 * SCENE 7 — CLOSE (F900–F1080). Background has dissolved back to void
 * (composition-level). A thin rule, the AVENIR wordmark with a chrome halo, and
 * a three-tier label stack land. The terminal cursor keeps blinking — no fade
 * to black; the system is still running on the final frame.
 */
const S7Close: React.FC = () => {
  const frame = useCurrentFrame();
  if (frame < 900) return null;

  const ruleW = interpolate(frame, [940, 956], [0, 100], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const ruleOp = ramp(frame, 940, 956);
  const markIn = ramp(frame, 960, 980);
  const microIn = ramp(frame, 990, 1004);
  const athenaIn = ramp(frame, 1020, 1030);

  return (
    <AbsoluteFill style={{ alignItems: 'center', justifyContent: 'center' }}>
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 24 }}>
        <div style={{ width: ruleW, height: 1, background: alpha(C.silver, 0.1), opacity: ruleOp }} />

        <span
          style={{
            fontFamily: sora,
            fontSize: 88,
            fontWeight: 800,
            letterSpacing: tracking.wordmark,
            color: C.textPrimary,
            textShadow: `0 0 100px ${alpha(C.silver, 0.07)}`,
            opacity: markIn,
            transform: `translateY(${(1 - markIn) * 8}px)`,
          }}
        >
          AVENIR
        </span>

        <span
          style={{
            fontFamily: mono,
            fontSize: 10,
            fontWeight: 500,
            letterSpacing: '0.22em',
            textTransform: 'uppercase',
            color: alpha(C.silver, 0.55),
            opacity: microIn,
            transform: `translateY(${(1 - microIn) * 4}px)`,
          }}
        >
          TERMINAL NAVIGATION · BUILT IN
        </span>

        <span
          style={{
            fontFamily: mono,
            fontSize: 9,
            letterSpacing: '0.18em',
            textTransform: 'uppercase',
            color: C.textMuted,
            opacity: athenaIn,
          }}
        >
          ATHENA LABS
        </span>
      </div>
    </AbsoluteFill>
  );
};

export default S7Close;

import React from 'react';
import { AbsoluteFill, useCurrentFrame } from 'remotion';
import { sora, mono } from '../../tokens';
import { C, ramp, alpha } from '../constants';
import { TypewriterText } from '../components';

/**
 * SCENE 1 — TITLE (F0–F90). "ATHENA LABS" micro-label, then the title types in.
 * Typography only; dissolves out F80–96 into the PROBLEM beat.
 */
const S1Title: React.FC = () => {
  const frame = useCurrentFrame();
  const microOp = ramp(frame, 0, 14);
  const vis = 1 - ramp(frame, 80, 96);
  if (vis <= 0) return null;

  return (
    <AbsoluteFill style={{ alignItems: 'center', justifyContent: 'center', opacity: vis }}>
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <div
          style={{
            fontFamily: mono,
            fontSize: 11,
            fontWeight: 500,
            letterSpacing: '0.22em',
            textTransform: 'uppercase',
            color: alpha(C.silver, 0.5),
            opacity: microOp,
            transform: `translateY(${(1 - microOp) * 6}px)`,
            marginBottom: 30,
          }}
        >
          ATHENA LABS
        </div>
        <TypewriterText
          text={'Introducing the Terminal\nNavigation System.'}
          startFrame={20}
          fontSize={56}
          fontFamily={sora}
          color={C.textPrimary}
          weight={700}
          tracking="-0.02em"
          lineHeight={1.12}
          align="center"
        />
      </div>
    </AbsoluteFill>
  );
};

export default S1Title;

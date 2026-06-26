import React from 'react';
import { AbsoluteFill, useCurrentFrame } from 'remotion';
import { BlinkingCursor } from '../components';
import { MONO, CURSOR_COLOR, ramp } from '../constants';

/**
 * SCENE 3 — CUT (F270–F330). Pure violet-on-black void — the pivot.
 * F278 `>>>` fades in; F298 the blinking cursor joins it; held to F330, then
 * the `>>>` fades out (F330–F344) as S4's label fades in. ~1.1s of silence.
 */
const S3Cut: React.FC = () => {
  const frame = useCurrentFrame();
  if (frame < 270 || frame >= 344) return null;

  const appear = ramp(frame, 278, 292);
  const exit = ramp(frame, 330, 344);
  const promptOpacity = appear * (1 - exit);

  return (
    <AbsoluteFill style={{ justifyContent: 'center', alignItems: 'center' }}>
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <span
          style={{
            fontFamily: MONO,
            fontWeight: 700,
            fontSize: 24,
            color: CURSOR_COLOR,
            opacity: promptOpacity,
            letterSpacing: '0.05em',
          }}
        >
          {'>>>'}
        </span>
        <span style={{ opacity: 1 - exit }}>
          <BlinkingCursor startFrame={298} />
        </span>
      </div>
    </AbsoluteFill>
  );
};

export default S3Cut;

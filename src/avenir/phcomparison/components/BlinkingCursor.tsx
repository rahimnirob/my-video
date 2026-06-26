import React from 'react';
import { useCurrentFrame } from 'remotion';
import { ramp, cursorVisible, CURSOR_COLOR, CURSOR_GLOW } from '../constants';

export type BlinkingCursorProps = {
  /** Frame the cursor first appears (fades in over 6f, then hard-blinks). */
  startFrame: number;
};

/** 14×24 violet block. Hard blink: 12f on, 14f off. Glowing. */
const BlinkingCursor: React.FC<BlinkingCursorProps> = ({ startFrame }) => {
  const frame = useCurrentFrame();
  const appear = ramp(frame, startFrame, startFrame + 6);
  const blink = frame >= startFrame && cursorVisible(frame) ? 1 : 0;

  return (
    <span
      style={{
        display: 'inline-block',
        width: 14,
        height: 24,
        marginLeft: 10,
        backgroundColor: CURSOR_COLOR,
        boxShadow: `0 0 10px ${CURSOR_GLOW}`,
        opacity: appear * blink,
        verticalAlign: 'middle',
      }}
    />
  );
};

export default BlinkingCursor;

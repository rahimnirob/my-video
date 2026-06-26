import React from 'react';
import { useCurrentFrame } from 'remotion';
import { pulse } from '../../tokens';
import { ramp, alpha } from '../constants';

export type CalloutBoxProps = {
  x: number;
  y: number;
  width: number;
  height: number;
  startFrame: number;
  /** Absolute frame to dissolve the callout (for scene merges). */
  exitAt?: number;
};

const E = 16; // frames per edge

/**
 * A violet callout that draws its border on (top → right → bottom → left, 16f
 * each), fills faintly, then pops corner dots. Used to point the viewer at a
 * region of the screenshot without any extra art.
 */
const CalloutBox: React.FC<CalloutBoxProps> = ({ x, y, width, height, startFrame, exitAt }) => {
  const frame = useCurrentFrame();
  const top = ramp(frame, startFrame, startFrame + E);
  const right = ramp(frame, startFrame + E, startFrame + 2 * E);
  const bottom = ramp(frame, startFrame + 2 * E, startFrame + 3 * E);
  const left = ramp(frame, startFrame + 3 * E, startFrame + 4 * E);
  const dots = ramp(frame, startFrame + 4 * E, startFrame + 4 * E + 10);
  const bgIn = ramp(frame, startFrame, startFrame + 4 * E);
  const out = exitAt != null ? ramp(frame, exitAt, exitAt + 16) : 0;
  const vis = 1 - out;
  if (frame < startFrame || vis <= 0) return null;

  const col = pulse.accent;
  const corners = [
    [0, 0],
    [100, 0],
    [0, 100],
    [100, 100],
  ] as const;

  return (
    <div style={{ position: 'absolute', left: x, top: y, width, height, opacity: vis, zIndex: 50, pointerEvents: 'none' }}>
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background: alpha(pulse.accent, 0.06),
          opacity: bgIn,
          boxShadow: `0 0 20px ${alpha(pulse.accent, 0.15)}`,
        }}
      />
      {/* top: L→R */}
      <div style={{ position: 'absolute', top: 0, left: 0, height: 1, width: `${top * 100}%`, background: col }} />
      {/* right: T→B */}
      <div style={{ position: 'absolute', top: 0, right: 0, width: 1, height: `${right * 100}%`, background: col }} />
      {/* bottom: R→L */}
      <div style={{ position: 'absolute', bottom: 0, right: 0, height: 1, width: `${bottom * 100}%`, background: col }} />
      {/* left: B→T */}
      <div style={{ position: 'absolute', bottom: 0, left: 0, width: 1, height: `${left * 100}%`, background: col }} />
      {corners.map(([px, py], i) => (
        <div
          key={i}
          style={{
            position: 'absolute',
            left: `${px}%`,
            top: `${py}%`,
            width: 4,
            height: 4,
            background: col,
            transform: 'translate(-50%, -50%)',
            opacity: dots,
            boxShadow: `0 0 6px ${alpha(pulse.accent, 0.8)}`,
          }}
        />
      ))}
    </div>
  );
};

export default CalloutBox;

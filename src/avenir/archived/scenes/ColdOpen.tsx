import React from 'react';
import { AbsoluteFill, interpolate, useCurrentFrame } from 'remotion';
import { HookBleed } from '../components';

/**
 * Beat 1 — COLD OPEN (0–110). The hook. One BIG word at a time, fast, with the
 * bleeding/defocus effect. A darker radial sits behind it so the white-hot core
 * and red bleed pop — the whole statement lands in ~3.5s, no audio needed.
 *
 * "We archived 17 products today." — an archiving announcement, not a launch.
 */
export const ColdOpen: React.FC = () => {
  const frame = useCurrentFrame();
  // Lift the darkening as the hook hands off to the reframe.
  const bedOpacity = interpolate(frame, [0, 10, 88, 104], [0.88, 0.88, 0.88, 0], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  return (
    <>
      <AbsoluteFill
        style={{
          background:
            'radial-gradient(ellipse 80% 70% at 50% 50%, rgba(3,1,2,0.86) 0%, rgba(4,1,2,0.55) 45%, rgba(4,1,2,0) 78%)',
          opacity: bedOpacity,
          zIndex: 5,
          pointerEvents: 'none',
        }}
      />
      <HookBleed
        text={'We archived 17 products today.'}
        startFrame={6}
        stepF={17}
        enterF={10}
        slideDist={480}
        gradientF={22}
        targetWidth={1680}
        maxSize={560}
        minSize={270}
        exitAt={92}
        exitF={10}
      />
    </>
  );
};

export default ColdOpen;

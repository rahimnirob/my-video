import React from 'react';
import { AbsoluteFill, Img, interpolate, useCurrentFrame } from 'remotion';
import { base, pulse, sentinel } from '../../tokens';
import { HOME_SHOT, alpha } from '../constants';
import { SceneCaption } from '../components';

/**
 * SCENE 3 — HOME (local 0–240). The real Avenir home screenshot fills frame, a
 * violet glow pulses from the sidebar side, and the "Not a menu / A command
 * interface" caption staggers in on the left, then fades before COMMANDS.
 */
const Home: React.FC = () => {
  const frame = useCurrentFrame();

  const shotIn = interpolate(frame, [0, 20], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

  // violet glow pulse from the right (where the sidebar lives) at local 20
  const glow = interpolate(frame, [20, 35, 50], [0, 1, 0], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

  // caption fades out before the scene ends (190–210)
  const captionOut = interpolate(frame, [190, 210], [1, 0], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

  return (
    <AbsoluteFill style={{ background: base.bgBase }}>
      <Img
        src={HOME_SHOT}
        style={{
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          objectPosition: 'center top',
          opacity: shotIn,
        }}
      />

      {/* dark vignette to seat text on top */}
      <AbsoluteFill
        style={{
          background: `radial-gradient(ellipse 80% 70% at 50% 50%, transparent 20%, ${alpha(base.bgBase, 0.5)} 100%)`,
          pointerEvents: 'none',
        }}
      />

      {/* violet "sidebar is alive" glow from the right */}
      <AbsoluteFill
        style={{
          background: `radial-gradient(ellipse 50% 70% at 92% 50%, ${pulse.accentSoft} 0%, transparent 60%)`,
          opacity: glow,
          pointerEvents: 'none',
        }}
      />

      {/* left caption block, vertically centered */}
      <div style={{ position: 'absolute', left: 80, top: '50%', transform: 'translateY(-50%)', opacity: captionOut }}>
        <SceneCaption
          microLabel="AVENIR · TERMINAL NAVIGATION"
          microColor={alpha(sentinel.accent, 0.6)}
          startFrame={60}
          staggerFrames={15}
          lines={[
            { text: 'Not a menu.', family: 'sora', weight: 700, size: 52, color: base.textPrimary },
            { text: 'A command interface.', family: 'sora', weight: 700, size: 52, color: base.textSecondary },
            { text: 'Built into every page.', family: 'manrope', weight: 400, size: 18, color: base.textSecondary },
          ]}
        />
      </div>
    </AbsoluteFill>
  );
};

export default Home;

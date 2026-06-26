import React from 'react';
import { AbsoluteFill } from 'remotion';
import { L } from '../ares-tokens';
import BlurText from '../kit/BlurText';
import AresLockup from '../kit/AresLockup';

/**
 * Scene 4 — CLOSE (s8 f714–792 + s9 lockup f792–840), on the bloom (RestyleBg
 * dissolved back to blue by f714). The close answers the open ("switching" →
 * "building"), then the brand lockup locks into a held final freeze. Global frame.
 */
const Scene4Close: React.FC<{ frame: number }> = ({ frame: f }) => {
  if (f < 712) return null;
  return (
    <AbsoluteFill>
      <BlurText text="Stop switching. Start building." frame={f} inAt={714} outAt={784} inDur={12} fontSize={92} color={L.white} weight={700} letterSpacing="-0.02em" emphasis={['building']} accentMode="bloom" />
      <AbsoluteFill style={{ alignItems: 'center', justifyContent: 'center' }}>
        <AresLockup frame={f} inAt={792} theme="onBloom" size={120} showSub showUrl />
      </AbsoluteFill>
    </AbsoluteFill>
  );
};

export default Scene4Close;

import React from 'react';
import { AbsoluteFill } from 'remotion';
import { EL } from '../palette';
import BlurText from '../kit/BlurText';
import EllaLockup from '../kit/EllaLockup';

/**
 * Scene 4 — CLOSE (s8 f714–792 + s9 lockup f792–840), on the bloom (RestyleBg
 * dissolved back to emerald by f714). The close is the resolve line — "Build
 * what people actually want." — then the brand lockup locks into a held final
 * freeze. Global frame.
 */
const Scene4Close: React.FC<{ frame: number }> = ({ frame: f }) => {
  if (f < 712) return null;
  return (
    <AbsoluteFill>
      {/* s8: "Build what people actually want." — accent "want" */}
      <BlurText text="Build what people actually want." frame={f} inAt={714} outAt={784} inDur={12} fontSize={92} color={EL.white} weight={700} letterSpacing="-0.02em" emphasis={['want']} accentMode="bloom" />
      {/* s9: brand lockup — held freeze */}
      <AbsoluteFill style={{ alignItems: 'center', justifyContent: 'center' }}>
        <EllaLockup frame={f} inAt={792} theme="onBloom" size={120} showSub showUrl />
      </AbsoluteFill>
    </AbsoluteFill>
  );
};

export default Scene4Close;

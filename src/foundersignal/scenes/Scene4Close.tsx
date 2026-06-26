import React from 'react';
import { AbsoluteFill } from 'remotion';
import { FS } from '../foundersignal-tokens';
import BlurText from '../kit/BlurText';
import FounderSignalLockup from '../kit/FounderSignalLockup';

/**
 * Scene 4 — CLOSE (s8 f714–792 + s9 lockup f792–840), on the bloom (RestyleBg
 * dissolved back to violet by f714). The close is the resolve line — "Stop
 * guessing. Start validating." — then the brand lockup locks into a held final
 * freeze. Global frame.
 */
const Scene4Close: React.FC<{ frame: number }> = ({ frame: f }) => {
  if (f < 712) return null;
  return (
    <AbsoluteFill>
      {/* s8: "Stop guessing. Start validating." — accent "validating" */}
      <BlurText text="Stop guessing. Start validating." frame={f} inAt={714} outAt={784} inDur={12} fontSize={92} color={FS.white} weight={700} letterSpacing="-0.02em" emphasis={['validating']} accentMode="bloom" />
      {/* s9: brand lockup — held freeze */}
      <AbsoluteFill style={{ alignItems: 'center', justifyContent: 'center' }}>
        <FounderSignalLockup frame={f} inAt={792} theme="onBloom" size={120} showSub showUrl />
      </AbsoluteFill>
    </AbsoluteFill>
  );
};

export default Scene4Close;

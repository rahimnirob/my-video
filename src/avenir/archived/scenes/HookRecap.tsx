import React from 'react';
import { KineticText } from '../components';

/**
 * Beat 1b — HOOK RECAP (100–185). After the fast one-word-at-a-time hook, the
 * WHOLE sentence resolves normally and holds, so anyone who didn't catch the
 * rapid words still reads it. Calm Sora (a deliberate contrast to the bold Anton
 * hook), ember gradient, centred.
 */
export const HookRecap: React.FC = () => (
  <KineticText
    text={'We archived 17 products today.'}
    startFrame={104}
    mode="flow"
    reveal="focus"
    fontSize={84}
    perWordF={3}
    enterF={16}
    maxWidth={1400}
    lineHeight={1.12}
    exitAt={168}
    exitF={18}
  />
);

export default HookRecap;

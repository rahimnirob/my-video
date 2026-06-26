import React from 'react';
import { FitToFrame, BlackoutSwipe } from '../components';

/**
 * Beat 3 — THE CONTRAST (350–655). The proof assembles and scales to fit the
 * frame (effect A: fit-to-frame build), then the knife — "None of them
 * disappeared after 24 hours." — appears and is REDACTED word by word (last→
 * first) by a black swipe before wiping out (effect B). The products
 * "disappear" right in front of you.
 */
export const Contrast: React.FC = () => (
  <>
    <FitToFrame
      text={'Season 01. 17 products. 30 days each.'}
      startFrame={356}
      perWordF={10}
      enterF={16}
      targetWidth={1580}
      maxSize={340}
      minSize={96}
      exitAt={468}
      exitF={16}
    />
    <BlackoutSwipe
      text={'None of them disappeared\nafter 24 hours.'}
      startFrame={496}
      fontSize={104}
      maxWidth={1400}
      appearF={14}
      perWordAppearF={4}
      holdF={28}
      redactStepF={6}
      redactDurF={9}
      wipeF={22}
    />
  </>
);

export default Contrast;

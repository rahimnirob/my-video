import React from 'react';
import { KineticText } from '../components';

/**
 * Beat 4 — THE TURN (655–800). A HARD cut from the blacked-out contrast (a beat
 * of empty stage, then it snaps). The energy shift, delivered as a one-word
 * centred punch (replace) — distinct from the hook's multi-direction jump.
 */
export const Turn: React.FC = () => (
  <KineticText
    text={'Season 02 is now open.'}
    startFrame={664}
    mode="replace"
    reveal="focus"
    fontSize={150}
    holdF={22}
    enterF={14}
    exitAt={780}
    exitF={12}
  />
);

export default Turn;

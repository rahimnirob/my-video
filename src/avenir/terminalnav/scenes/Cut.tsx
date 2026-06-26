import React from 'react';
import { AbsoluteFill } from 'remotion';
import { base } from '../../tokens';

/**
 * SCENE 2 — CUT (local 0–60). Pure Avenir void. The hard cut from the bright
 * Scene 1 is the whole point, so this scene is just the black floor + vignette;
 * the terminal bar that "slides up at F195" and its `T E R M I N A L` label are
 * the persistent <TerminalBar> mounted at the composition level (absolute frame).
 */
const Cut: React.FC = () => (
  <AbsoluteFill style={{ background: base.bgBase }}>
    <AbsoluteFill
      style={{
        background:
          'radial-gradient(ellipse 80% 70% at 50% 60%, transparent 30%, rgba(0,0,0,0.55) 100%)',
        pointerEvents: 'none',
      }}
    />
  </AbsoluteFill>
);

export default Cut;

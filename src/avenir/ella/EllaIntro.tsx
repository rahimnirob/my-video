import React from 'react';
import { AbsoluteFill, useCurrentFrame } from 'remotion';
import { FONT_FAMILY, EL } from './palette';
import RestyleBg from './kit/RestyleBg';
import Scene1Problem from './scenes/Scene1Problem';
import Scene2Introducing from './scenes/Scene2Introducing';
import Scene3Solution from './scenes/Scene3Solution';
import Scene4Close from './scenes/Scene4Close';

/**
 * EllaIntro — 28s (840f @30) intro for Ella, cloning the Ares explainer structure:
 * emerald-bloom problem → "Introducing" → mint product UI (command bar → scan visual → connected cards → processing) → bloom close + lockup.
 *
 * ONE continuous timeline (not per-scene Sequences): RestyleBg owns the bg with
 * cross-dissolves; every beat reads the GLOBAL frame and times itself absolutely.
 */
export const EllaIntro: React.FC = () => {
  const f = useCurrentFrame();
  return (
    <AbsoluteFill style={{ backgroundColor: EL.bg, fontFamily: FONT_FAMILY }}>
      <RestyleBg />
      <Scene1Problem frame={f} />
      <Scene2Introducing frame={f} />
      <Scene3Solution frame={f} />
      <Scene4Close frame={f} />
    </AbsoluteFill>
  );
};

export default EllaIntro;

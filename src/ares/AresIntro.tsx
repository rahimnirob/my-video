import React from 'react';
import { AbsoluteFill, useCurrentFrame } from 'remotion';
import { FONT_FAMILY, L } from './ares-tokens';
import RestyleBg from './kit/RestyleBg';
import Scene1Problem from './scenes/Scene1Problem';
import Scene2Introducing from './scenes/Scene2Introducing';
import Scene3Solution from './scenes/Scene3Solution';
import Scene4Close from './scenes/Scene4Close';

/**
 * AresIntro — 28s (840f @30) intro for Ares, cloning the reference SaaS-explainer
 * style: blue-bloom problem → "Introducing" → lavender product UI (command bar →
 * six-tools-converge → connected panels → processing) → bloom close + lockup.
 *
 * ONE continuous timeline (not per-scene Sequences): RestyleBg owns the bg with
 * cross-dissolves at the two real boundaries; every beat reads the GLOBAL frame
 * and times itself absolutely, so blur-cuts cross-blur across beats and the bloom
 * breathing never resets. Spec + adversarial-verify fixes baked in.
 */
export const AresIntro: React.FC = () => {
  const f = useCurrentFrame();
  return (
    <AbsoluteFill style={{ backgroundColor: L.bg, fontFamily: FONT_FAMILY }}>
      <RestyleBg />
      <Scene1Problem frame={f} />
      <Scene2Introducing frame={f} />
      <Scene3Solution frame={f} />
      <Scene4Close frame={f} />
    </AbsoluteFill>
  );
};

export default AresIntro;

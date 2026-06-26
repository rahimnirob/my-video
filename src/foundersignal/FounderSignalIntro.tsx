import React from 'react';
import { AbsoluteFill, useCurrentFrame } from 'remotion';
import { FONT_FAMILY, FS } from './foundersignal-tokens';
import RestyleBg from './kit/RestyleBg';
import Scene1Problem from './scenes/Scene1Problem';
import Scene2Introducing from './scenes/Scene2Introducing';
import Scene3Solution from './scenes/Scene3Solution';
import Scene4Close from './scenes/Scene4Close';

/**
 * FounderSignalIntro — 28s (840f @30) intro for FounderSignal, cloning the Ares/Ella
 * explainer structure: violet-bloom problem → "Introducing" → black product UI 
 * (command bar → source scan → analysis cards → processing) → bloom close + lockup.
 *
 * ONE continuous timeline (not per-scene Sequences): RestyleBg owns the bg with
 * cross-dissolves; every beat reads the GLOBAL frame and times itself absolutely.
 */
export const FounderSignalIntro: React.FC = () => {
  const f = useCurrentFrame();
  return (
    <AbsoluteFill style={{ backgroundColor: FS.bg, fontFamily: FONT_FAMILY }}>
      <RestyleBg />
      <Scene1Problem frame={f} />
      <Scene2Introducing frame={f} />
      <Scene3Solution frame={f} />
      <Scene4Close frame={f} />
    </AbsoluteFill>
  );
};

export default FounderSignalIntro;

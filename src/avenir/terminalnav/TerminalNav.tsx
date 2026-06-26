import React from 'react';
import { AbsoluteFill, Sequence, useCurrentFrame } from 'remotion';
import { base } from '../tokens';
import { Scanlines } from '../components/shared';
import {
  SCENES,
  TOTAL_FRAMES,
  TERMINAL_BAR_START,
  PULSE_PATH_FROM,
  PATH_HOME,
  PATH_PULSE,
} from './constants';
import { TerminalBar, GrainOverlay } from './components';
import Traditional from './scenes/Traditional';
import Cut from './scenes/Cut';
import Home from './scenes/Home';
import Commands from './scenes/Commands';
import DPad from './scenes/DPad';
import Close from './scenes/Close';

/**
 * The persistent terminal bar that spans CUT → CLOSE. It lives outside the scene
 * Sequences (so it survives scene swaps) and reads the absolute frame: breadcrumb
 * flips HOME → PULSE at the COMMANDS boundary, and it goes crisp in CLOSE.
 */
const PersistentChrome: React.FC = () => {
  const frame = useCurrentFrame();
  const path = frame < PULSE_PATH_FROM ? PATH_HOME : PATH_PULSE;
  const dim = frame < SCENES.close.from;
  return <TerminalBar path={path} startFrame={TERMINAL_BAR_START} dim={dim} />;
};

/**
 * TerminalNav — 40s (1200f @ 30fps) mute-first RAW-register marketing video.
 * "Avenir runs on commands — not menus." Six scenes, hard cut from the bland
 * traditional web into the Avenir terminal world.
 */
const TerminalNav: React.FC = () => {
  return (
    <AbsoluteFill style={{ background: base.bgBase }}>
      <Sequence name="1 · TRADITIONAL" {...SCENES.traditional}>
        <Traditional />
      </Sequence>
      <Sequence name="2 · CUT" {...SCENES.cut}>
        <Cut />
      </Sequence>
      <Sequence name="3 · HOME" {...SCENES.home}>
        <Home />
      </Sequence>
      <Sequence name="4 · COMMANDS" {...SCENES.commands}>
        <Commands />
      </Sequence>
      <Sequence name="5 · DPAD" {...SCENES.dpad}>
        <DPad />
      </Sequence>
      <Sequence name="6 · CLOSE" {...SCENES.close}>
        <Close />
      </Sequence>

      {/* persistent terminal bar (absolute-frame driven) */}
      <PersistentChrome />

      {/* scanlines on the Avenir scenes only (from the CUT onward, never Scene 1) */}
      <Sequence
        from={SCENES.cut.from}
        durationInFrames={TOTAL_FRAMES - SCENES.cut.from}
        name="scanlines"
        layout="none"
      >
        <Scanlines />
      </Sequence>

      {/* global film grain over everything */}
      <GrainOverlay />
    </AbsoluteFill>
  );
};

export default TerminalNav;

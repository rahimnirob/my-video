import React from 'react';
import { AbsoluteFill, interpolate, useCurrentFrame } from 'remotion';
import {
  C,
  ramp,
  CHAR_FRAMES,
  HOME_SHOT,
  PULSE_SHOT,
  PATH_HOME,
  PATH_PULSE,
  TERMINAL_BAR_START,
} from './constants';
import {
  GrainOverlay,
  Vignette,
  ScreenshotReveal,
  TerminalBar,
  type TBFeedback,
} from './components';
import S1Title from './scenes/S1Title';
import S2Problem from './scenes/S2Problem';
import S3Pivot from './scenes/S3Pivot';
import S4Home from './scenes/S4Home';
import S5Commands from './scenes/S5Commands';
import S6DPad from './scenes/S6DPad';
import S7Close from './scenes/S7Close';

const clamp = { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' } as const;

/** Reveal a command string char-by-char (1.2 f/char). */
const typed = (frame: number, start: number, text: string): string => {
  const n = Math.max(0, Math.floor((frame - start) / CHAR_FRAMES));
  return text.slice(0, Math.min(text.length, n));
};

/**
 * The continuous screenshot camera. ONE home + ONE pulse image cross-dissolve
 * and the pulse pushes/zooms into the D-Pad region — all by absolute frame, so
 * scenes 4→5→6 share an unbroken background (the "frame never ends").
 */
const ScreenshotLayer: React.FC = () => {
  const frame = useCurrentFrame();
  const homeOp = ramp(frame, 300, 320) * 0.85 * (1 - ramp(frame, 480, 500));
  const pulseOp = ramp(frame, 480, 500) * 0.8 * (1 - ramp(frame, 900, 940));
  const scale = interpolate(frame, [720, 780], [1, 1.8], clamp);
  const tx = interpolate(frame, [720, 780], [0, -380], clamp);
  const ty = interpolate(frame, [720, 780], [0, -80], clamp);

  return (
    <>
      <ScreenshotReveal src={HOME_SHOT} opacity={homeOp} overlayAlpha={0.35} />
      <ScreenshotReveal src={PULSE_SHOT} opacity={pulseOp} overlayAlpha={0.4} scale={scale} translateX={tx} translateY={ty} />
    </>
  );
};

/**
 * Drives the single persistent terminal bar by absolute frame: breadcrumb,
 * the three typed commands + their feedback, the green execute flash, and the
 * dim/restore around the D-Pad scene.
 */
const TerminalController: React.FC = () => {
  const frame = useCurrentFrame();
  const path = frame >= 480 && frame < 900 ? PATH_PULSE : PATH_HOME;

  let inputText = '';
  if (frame >= 510 && frame < 580) inputText = typed(frame, 510, 'exec.goto.pulse');
  else if (frame >= 608 && frame < 668) inputText = typed(frame, 608, 'exec.category==ai');
  else if (frame >= 680 && frame < 710) inputText = typed(frame, 680, '>>>');

  let feedback: TBFeedback = null;
  if (frame >= 540 && frame < 580) feedback = { type: 'success', text: 'Navigating to Pulse' };
  else if (frame >= 638 && frame < 668) feedback = { type: 'success', text: 'Filter: category = ai' };
  else if (frame >= 692 && frame < 710) feedback = { type: 'info', text: 'Jumping 3 products forward' };

  const flash = Math.max(
    interpolate(frame, [531, 535, 547], [0, 1, 0], clamp),
    interpolate(frame, [630, 634, 646], [0, 1, 0], clamp),
    interpolate(frame, [684, 688, 700], [0, 1, 0], clamp),
  );

  const dim = interpolate(frame, [720, 780, 900, 940], [1, 0.4, 0.4, 1], clamp);

  return <TerminalBar path={path} inputText={inputText} feedback={feedback} flash={flash} dim={dim} startFrame={TERMINAL_BAR_START} />;
};

/**
 * TerminalNavV2 — 36s (1080f @ 30fps) RAW kinetic-typography cut.
 * Continuous void → typed-command reveals → camera-push D-Pad → wordmark.
 * All layers read the ABSOLUTE frame so beats cross-dissolve seamlessly.
 */
const TerminalNavV2: React.FC = () => {
  return (
    <AbsoluteFill style={{ background: C.bg }}>
      {/* continuous screenshot camera (scenes 4–6) */}
      <ScreenshotLayer />

      {/* scene foregrounds — all mounted, each self-clips with fade windows */}
      <S1Title />
      <S2Problem />
      <S3Pivot />
      <S4Home />
      <S5Commands />
      <S6DPad />
      <S7Close />

      {/* persistent terminal bar (scenes 3–7) */}
      <TerminalController />

      {/* global atmosphere, always on top */}
      <Vignette />
      <GrainOverlay />
    </AbsoluteFill>
  );
};

export default TerminalNavV2;

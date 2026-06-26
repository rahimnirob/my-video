import React from 'react';
import { Img, staticFile, useCurrentFrame, useVideoConfig } from 'remotion';
import { EMBER_GLOW, HEIGHT, WIDTH, ramp } from '../constants';

/**
 * Character — the cinematic close. The Billboard Sentinel (bbchar1, a cut-out
 * RGBA render) rises out of the white with a warm ember halo behind it and a
 * slow push-in. Bottom-anchored, because the source figure runs to its bottom
 * edge. The white field is preserved; the halo only grounds the figure so it
 * doesn't float coldly.
 */

export type CharacterProps = {
  /** Absolute frame the reveal begins. */
  startFrame: number;
  /** Figure height as a fraction of frame height. */
  heightPct?: number;
  /** Horizontal center, as a fraction of frame width. */
  centerXPct?: number;
};

const Character: React.FC<CharacterProps> = ({
  startFrame,
  heightPct = 0.96,
  centerXPct = 0.5,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const reveal = ramp(frame, startFrame, startFrame + Math.round(1.0 * fps));
  // Slow cinematic push-in across the whole hold.
  const push = 1.0 + 0.06 * ramp(frame, startFrame, startFrame + 4 * fps);
  const rise = (1 - reveal) * 60; // drifts up into place

  const imgH = HEIGHT * heightPct;
  // Source is 1152x1728 (2:3).
  const imgW = imgH * (1152 / 1728);
  const left = WIDTH * centerXPct - imgW / 2;

  // Halo swells in slightly behind the figure.
  const haloR = 520 + 80 * reveal;
  const haloOpacity = reveal;

  return (
    <>
      {/* Warm ember halo — grounds the figure on white. */}
      <div
        style={{
          position: 'absolute',
          left: WIDTH * centerXPct,
          top: HEIGHT * 0.58,
          width: 0,
          height: 0,
          transform: 'translate(-50%, -50%)',
          background: `radial-gradient(${haloR}px ${haloR * 0.9}px at center, ${EMBER_GLOW}, rgba(214,140,52,0.10) 42%, rgba(214,140,52,0) 70%)`,
          opacity: haloOpacity,
          zIndex: 6,
          pointerEvents: 'none',
        }}
      />
      <Img
        src={staticFile('bbchar1.png')}
        style={{
          position: 'absolute',
          left,
          bottom: -HEIGHT * 0.02,
          width: imgW,
          height: imgH,
          objectFit: 'contain',
          transform: `translateY(${rise}px) scale(${push})`,
          transformOrigin: 'center bottom',
          opacity: reveal,
          zIndex: 8,
          pointerEvents: 'none',
        }}
      />
    </>
  );
};

export default Character;

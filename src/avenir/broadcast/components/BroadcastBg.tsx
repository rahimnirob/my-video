import React from 'react';
import { AbsoluteFill, useCurrentFrame, useVideoConfig } from 'remotion';
import { LUMEX_ORB_A, LUMEX_ORB_B, lumex } from '../../lumex';

/**
 * BroadcastBg — the smooth LumeX background: pure black with TWO big, heavily
 * bleeded (blurred) crimson orbs drifting on the sides at a steady pace (each
 * orbits a slow ellipse → constant, smooth motion). Their soft bleed is the
 * whole gradient effect. A gentle centre settle keeps the player/type legible.
 */
const TAU = Math.PI * 2;

const Orb: React.FC<{ x: number; y: number; r: number; col: string }> = ({ x, y, r, col }) => (
  <div
    style={{
      position: 'absolute',
      left: `${x}%`,
      top: `${y}%`,
      width: r,
      height: r,
      transform: 'translate(-50%, -50%)',
      borderRadius: '50%',
      background: `radial-gradient(circle, ${col} 0%, transparent 66%)`,
      filter: 'blur(130px)',
      mixBlendMode: 'screen',
    }}
  />
);

const BroadcastBg: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const t = frame / fps;

  // Steady circular drift (constant angular velocity → constant smooth pace).
  const aL = (t / 13) * TAU;
  const aR = (t / 16) * TAU + Math.PI;
  const lx = 17 + 8 * Math.cos(aL);
  const ly = 50 + 28 * Math.sin(aL);
  const rx = 83 + 8 * Math.cos(aR);
  const ry = 50 + 28 * Math.sin(aR);

  return (
    <AbsoluteFill style={{ background: lumex.void }}>
      <Orb x={lx} y={ly} r={1280} col={LUMEX_ORB_A} />
      <Orb x={rx} y={ry} r={1180} col={LUMEX_ORB_B} />
      {/* centre settle so type/player read over the bleed */}
      <AbsoluteFill
        style={{ background: 'radial-gradient(ellipse 64% 58% at 50% 50%, rgba(0,0,0,0.5) 0%, transparent 62%)' }}
      />
      {/* edge vignette */}
      <AbsoluteFill
        style={{ background: 'radial-gradient(ellipse 96% 100% at 50% 50%, transparent 55%, rgba(0,0,0,0.55) 100%)' }}
      />
    </AbsoluteFill>
  );
};

export default BroadcastBg;

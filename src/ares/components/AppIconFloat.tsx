import React from 'react';
import { interpolate } from 'remotion';
import { C } from '../ares-tokens';
import { Icon, IconName } from '../icons';

/**
 * AppIconFloat — one disconnected-tool icon in one of three motion states:
 *  • glitch — sits at (baseX,baseY) with a 4-frame-stepped micro-jitter, fades
 *    in (0–12), staggered opacity flicker, fades out (78–90). [Scene 1]
 *  • orbit  — elliptical path around centre, radius expands 80→140 over 0–90,
 *    calmer jitter, fades in 0–20. [Scene 2, sf<90]
 *  • drift  — continues from the sf=90 orbit point, flies outward, fades 110→170.
 *    [Scene 2, sf>=90]
 */
const clamp = { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' } as const;
const TAU = Math.PI * 2;

const AppIconFloat: React.FC<{
  name: IconName;
  frame: number;
  sceneStart: number;
  index: number;
  mode: 'glitch' | 'orbit' | 'drift';
  size?: number;
  baseX?: number;
  baseY?: number;
}> = ({ name, frame, sceneStart, index, mode, size = 44, baseX = 0, baseY = 0 }) => {
  const sf = frame - sceneStart;
  const i = index;
  const tick = Math.floor(frame / 4) * 4; // jitter updates every 4 frames, holds between

  let x = 0;
  let y = 0;
  let opacity = 1;

  if (mode === 'glitch') {
    x = baseX + Math.sin(tick * 1.7 + i) * 3;
    y = baseY + Math.cos(tick * 2.1 + i) * 2;
    const fadeIn = interpolate(sf, [0, 12], [0, 1], clamp);
    const flicker = frame % 7 === i % 7 ? 0.4 : 1;
    const fadeOut = interpolate(sf, [78, 90], [1, 0], clamp);
    opacity = fadeIn * flicker * fadeOut;
  } else if (mode === 'orbit') {
    const angle = (i / 6) * TAU + sf * 0.025;
    const radius = interpolate(sf, [0, 90], [80, 140], clamp);
    x = Math.cos(angle) * radius + Math.sin(tick * 1.7 + i) * 1.5;
    y = Math.sin(angle) * radius * 0.6 + Math.cos(tick * 2.1 + i) * 1.5;
    opacity = interpolate(sf, [0, 20], [0, 1], clamp);
  } else {
    const startAngle = (i / 6) * TAU + 90 * 0.025;
    const sx = Math.cos(startAngle) * 140;
    const sy = Math.sin(startAngle) * 140 * 0.6;
    const dist = interpolate(sf, [90, 170], [0, 300], clamp);
    x = sx + Math.cos(startAngle) * dist;
    y = sy + Math.sin(startAngle) * dist * 0.6;
    opacity = interpolate(sf, [110, 170], [1, 0], clamp);
  }

  return (
    <div
      style={{
        position: 'absolute',
        left: '50%',
        top: '50%',
        transform: `translate(calc(-50% + ${x}px), calc(-50% + ${y}px))`,
        opacity,
      }}
    >
      <Icon name={name} size={size} color={C.starlight} glow="drop-shadow(0 0 8px rgba(0,229,255,0.4))" />
    </div>
  );
};

export default AppIconFloat;

import React from 'react';
import { AbsoluteFill } from 'remotion';
import { C } from '../ares-tokens';

/**
 * ParticleFlow — an SVG line with animating strokeDashoffset, drawn in absolute
 * 1920×1080 coordinates (caller passes absolute from/to). Negative offset over
 * time makes the dashes crawl from `from` toward `to`.
 */
const ParticleFlow: React.FC<{
  from: { x: number; y: number };
  to: { x: number; y: number };
  frame: number;
  color?: string;
  opacity?: number;
  dashArray?: string;
  strokeWidth?: number;
  speed?: number;
}> = ({ from, to, frame, color = C.cyan, opacity = 0.3, dashArray = '4 6', strokeWidth = 1.2, speed = 1.5 }) => (
  <AbsoluteFill style={{ pointerEvents: 'none' }}>
    <svg width="100%" height="100%" viewBox="0 0 1920 1080" preserveAspectRatio="none" style={{ position: 'absolute', inset: 0, overflow: 'visible' }}>
      <line
        x1={from.x}
        y1={from.y}
        x2={to.x}
        y2={to.y}
        stroke={color}
        strokeWidth={strokeWidth}
        strokeDasharray={dashArray}
        strokeDashoffset={-frame * speed}
        opacity={opacity}
      />
    </svg>
  </AbsoluteFill>
);

export default ParticleFlow;

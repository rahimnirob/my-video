import React from 'react';
import { AbsoluteFill } from 'remotion';
import { REGISTER, atmosphere } from '../../tokens';

export const register = REGISTER.CINEMATIC;

export type ScanlinesProps = {
  zIndex?: number;
};

const Scanlines: React.FC<ScanlinesProps> = ({ zIndex = 8000 }) => (
  <AbsoluteFill
    style={{
      backgroundImage: atmosphere.scanlines,
      pointerEvents: 'none',
      zIndex,
    }}
  />
);

export default Scanlines;

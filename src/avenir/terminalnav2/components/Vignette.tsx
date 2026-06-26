import React from 'react';
import { AbsoluteFill } from 'remotion';
import { alpha } from '../constants';
import { base } from '../../tokens';

/** Global vignette — seats every scene in the same dark frame. */
const Vignette: React.FC<{ zIndex?: number }> = ({ zIndex = 8500 }) => (
  <AbsoluteFill
    style={{
      background: `radial-gradient(ellipse 75% 65% at 50% 50%, transparent 25%, ${alpha(base.bgBase, 0.65)} 100%)`,
      pointerEvents: 'none',
      zIndex,
    }}
  />
);

export default Vignette;

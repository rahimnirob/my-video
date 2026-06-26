import React from 'react';
import { AbsoluteFill, staticFile, useCurrentFrame, useVideoConfig } from 'remotion';
import { REGISTER, atmosphere, frames } from '../../tokens';

export const register = REGISTER.CINEMATIC;

export type GrainOverlayProps = {
  /** Override the 200px noise tile. */
  src?: string;
  opacity?: number;
};

const GrainOverlay: React.FC<GrainOverlayProps> = ({
  src = staticFile('assets/grain-200.png'),
  opacity = atmosphere.grain.opacity,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const stepF = Math.max(1, frames(atmosphere.grain.stepMs, fps));
  const step = Math.floor(frame / stepF) % 3;
  const offsets = [
    [0, 0],
    [atmosphere.grain.tileSize / 3, atmosphere.grain.tileSize / 2],
    [atmosphere.grain.tileSize / 2, atmosphere.grain.tileSize / 3],
  ] as const;
  const [x, y] = offsets[step];

  return (
    <AbsoluteFill
      style={{
        backgroundImage: `url(${src})`,
        backgroundRepeat: 'repeat',
        backgroundSize: `${atmosphere.grain.tileSize}px ${atmosphere.grain.tileSize}px`,
        backgroundPosition: `${x}px ${y}px`,
        opacity,
        pointerEvents: 'none',
        mixBlendMode: 'overlay',
        zIndex: 9000,
      }}
    />
  );
};

export default GrainOverlay;

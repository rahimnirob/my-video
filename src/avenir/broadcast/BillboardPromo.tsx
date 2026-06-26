import React from 'react';
import { AbsoluteFill, useCurrentFrame } from 'remotion';
import RestyleBg from './kit/RestyleBg';

// Scenes
import Scene1Hook from './scenes/Scene1Hook';
import Scene2Alternatives from './scenes/Scene2Alternatives';
import Scene3Bridge from './scenes/Scene3Bridge';
import Scene4Apply from './scenes/Scene4Apply';
import Scene5Player from './scenes/Scene5Player';
import Scene6Forever from './scenes/Scene6Forever';
import Scene7Production from './scenes/Scene7Production';
import Scene8Kinetic from './scenes/Scene8Kinetic';
import Scene9Queue from './scenes/Scene9Queue';
import Scene10Grid from './scenes/Scene10Grid';
import Scene11Outro from './scenes/Scene11Outro';

export const TOTAL_FRAMES = 1071;

export const BillboardPromo: React.FC = () => {
  const frame = useCurrentFrame();

  return (
    <AbsoluteFill style={{ backgroundColor: '#020304', overflow: 'hidden' }}>
      {/* Dynamic restyling background */}
      <RestyleBg />

      {/* Sequential scenes */}
      <Scene1Hook frame={frame} />
      <Scene2Alternatives frame={frame} />
      <Scene3Bridge frame={frame} />
      <Scene4Apply frame={frame} />
      <Scene5Player frame={frame} />
      <Scene6Forever frame={frame} />
      <Scene7Production frame={frame} />
      <Scene8Kinetic frame={frame} />
      <Scene9Queue frame={frame} />
      <Scene10Grid frame={frame} />
      <Scene11Outro frame={frame} />
    </AbsoluteFill>
  );
};

export default BillboardPromo;


import React from 'react';
import { AbsoluteFill, useCurrentFrame } from 'remotion';
import { sora, mono } from '../../tokens';
import { C, ramp, alpha } from '../constants';
import { CalloutBox, LineReveal } from '../components';

/**
 * SCENE 4 — HOME (F300–F480). The home screenshot (composition-level) is now
 * visible; a callout draws itself around the sidebar while the left-side
 * typography resolves. Foreground dissolves at F468 into COMMANDS.
 */
const S4Home: React.FC = () => {
  const frame = useCurrentFrame();
  const vis = 1 - ramp(frame, 468, 484);
  if (frame < 300 || vis <= 0) return null;
  const microOp = ramp(frame, 430, 444) * vis;

  return (
    <AbsoluteFill style={{ opacity: vis }}>
      {/* callout around the right sidebar of the screenshot */}
      {/* TODO(align): sidebar rect (x1195,y60,265×720) measured against home.png at object-fit:cover — tweak if the export crop shifts. */}
      <CalloutBox x={1195} y={60} width={265} height={720} startFrame={360} exitAt={468} />

      {/* left text block */}
      <div style={{ position: 'absolute', left: 80, top: '50%', transform: 'translateY(-50%)', display: 'flex', flexDirection: 'column', gap: 16 }}>
        <div
          style={{
            fontFamily: mono,
            fontSize: 10,
            fontWeight: 500,
            letterSpacing: '0.22em',
            textTransform: 'uppercase',
            color: alpha(C.silver, 0.6),
            opacity: microOp,
            transform: `translateY(${(1 - ramp(frame, 430, 444)) * 8}px)`,
          }}
        >
          COMMAND INTERFACE
        </div>
        <LineReveal text="Not a menu." startFrame={444} fontSize={52} fontFamily={sora} color={C.textPrimary} weight={700} blurIn={5} />
        <LineReveal text="Built into every page." startFrame={460} fontSize={28} fontFamily={sora} color={C.textSecondary} weight={400} />
      </div>
    </AbsoluteFill>
  );
};

export default S4Home;

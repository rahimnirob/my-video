import React from 'react';
import { AbsoluteFill, useVideoConfig } from 'remotion';
import BillboardStage from '../components/cinematic/BillboardStage';
import BroadcastPlayer from '../components/cinematic/BroadcastPlayer';
import TelemetryStrip from '../components/cinematic/TelemetryStrip';
import CallSignHeader from '../components/cinematic/CallSignHeader';
import Ticker from '../components/cinematic/Ticker';
import SlotCounter from '../components/cinematic/SlotCounter';
import WordmarkReveal from '../components/cinematic/WordmarkReveal';
import GrainOverlay from '../components/shared/GrainOverlay';
import { billboard, frames, motion } from '../tokens';

const V1_BillboardCinematic: React.FC = () => {
  const { fps } = useVideoConfig();

  // Frame-accurate spec timings.
  const headerDelay = frames(motion.heroRevealMin, fps); // after ambient image starts to settle
  const telemetryDelay = headerDelay + frames(motion.staggerMax, fps);
  const playerDelay = telemetryDelay + frames(motion.staggerMin, fps);
  const slotDelay = playerDelay + frames(motion.playerEnter, fps);
  const wordmarkDelay = playerDelay + frames(motion.heroRevealMax, fps);

  return (
    <AbsoluteFill style={{ background: billboard.void }}>
      <BillboardStage />

      {/* Top-left call-sign */}
      <div style={{ position: 'absolute', top: 28, left: 28, zIndex: 40 }}>
        <CallSignHeader season={2} year={2026} delayFrames={headerDelay} />
      </div>

      {/* Stage center: telemetry above, player below */}
      <AbsoluteFill
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          gap: 28,
          padding: '80px 120px',
        }}
      >
        <TelemetryStrip
          season={2}
          slotsFilled={3}
          slotsTotal={50}
          delayFrames={telemetryDelay}
        />
        <BroadcastPlayer delayFrames={playerDelay}>
          {/* Bottom-left product info inside the player */}
          <div
            style={{
              position: 'absolute',
              bottom: 24,
              left: 24,
              zIndex: 10,
              maxWidth: 360,
              padding: '12px 16px',
              background: 'rgba(5, 6, 8, 0.7)',
              border: '1px solid rgba(255, 255, 255, 0.06)',
              borderRadius: 8,
              display: 'flex',
              flexDirection: 'column',
              gap: 6,
            }}
          >
            <span
              style={{
                fontFamily: 'inherit',
                color: billboard.textHi,
                fontSize: 18,
                fontWeight: 700,
              }}
            >
              NOW BROADCASTING · DEMO
            </span>
            <span style={{ color: billboard.textMd, fontSize: 12 }}>
              Avenir cinematic register · BillboardStage smoke test.
            </span>
          </div>
        </BroadcastPlayer>

        {/* Slot counter under the player */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'flex-start',
            gap: 8,
            width: billboard ? 720 : undefined,
          }}
        >
          <SlotCounter fillPercent={6} delayFrames={slotDelay} width={720} />
        </div>

        <WordmarkReveal delayFrames={wordmarkDelay} size={72} />
      </AbsoluteFill>

      {/* Bottom broadcast ticker */}
      <div
        style={{
          position: 'absolute',
          left: 0,
          right: 0,
          bottom: 0,
        }}
      >
        <Ticker
          variant="page"
          items={[
            '● NOW BROADCASTING: AVENIR BILLBOARD',
            'SEASON 02 · 3 OF 50 SLOTS LIVE',
            'NEXT UP: HOUSE STANDBY FEED',
            'TUNE IN AT AVENIRREYM.COM',
          ]}
        />
      </div>

      {/* Atmospheric grain on top of everything */}
      <GrainOverlay />
    </AbsoluteFill>
  );
};

export default V1_BillboardCinematic;

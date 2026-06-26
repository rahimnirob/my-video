import React from 'react';
import { AbsoluteFill, useVideoConfig } from 'remotion';
import {
  TerminalLine,
  MicroLabel,
  KineticHeadline,
  StatReveal,
  Divider,
  DeclarativeCard,
} from '../components/raw';
import { base, billboard, frames, sentinel } from '../tokens';

const STAGGER_MS = 180;

const V2_RawTest: React.FC = () => {
  const { fps } = useVideoConfig();
  const s = (i: number) => frames(STAGGER_MS, fps) * i;

  return (
    <AbsoluteFill
      style={{
        background: base.bgBase,
        padding: '120px 160px',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        gap: 56,
      }}
    >
      <MicroLabel
        text="RAW REGISTER · V2 SMOKE TEST"
        delayFrames={s(0)}
        color={base.textDim}
      />

      <KineticHeadline
        text="You feel seen in three seconds."
        delayFrames={s(1)}
        accentWordIndex={2}
        accentColor={sentinel.accent}
        size={84}
      />

      <TerminalLine
        text="rendering avenir-motion library / register=raw"
        delayFrames={s(4)}
        accent={sentinel.accent}
        size={26}
      />

      <Divider
        delayFrames={s(6)}
        width={520}
        thickness={1}
        color={base.glassBorder}
      />

      <div style={{ display: 'flex', gap: 96, alignItems: 'flex-end' }}>
        <StatReveal
          value={47}
          label="Slots remaining · Season 02"
          delayFrames={s(7)}
          accent={billboard.primary}
          valueSize={120}
        />
        <StatReveal
          value={3.2}
          label="Avg. recognition latency · seconds"
          delayFrames={s(8)}
          decimals={1}
          suffix="s"
          accent={base.textPrimary}
          valueSize={88}
        />
      </div>

      <DeclarativeCard
        subLabel="AVENIR · DECLARATIVE"
        headline="The system speaks. Precise. Restrained. Yours."
        delayFrames={s(10)}
        width={820}
        padding={56}
      />
    </AbsoluteFill>
  );
};

export default V2_RawTest;

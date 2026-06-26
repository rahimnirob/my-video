import React from 'react';
import { interpolate, useCurrentFrame, useVideoConfig } from 'remotion';
import {
  REGISTER,
  billboard,
  frames,
  motion,
  tracking,
  mono,
} from '../../tokens';

export const register = REGISTER.CINEMATIC;

export type TickerProps = {
  /** Either page-level (60s) or player-internal (30s). */
  variant?: 'page' | 'player';
  /** Strings to render in the crawl (joined by separators). */
  items: string[];
  height?: number;
};

const Ticker: React.FC<TickerProps> = ({
  variant = 'page',
  items,
  height = 26,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const loopMs = variant === 'page' ? motion.tickerPage : motion.tickerPlayer;
  const loopF = frames(loopMs, fps);

  // Linear translateX 0 → -50% (content is rendered twice for seamless loop).
  const phase = (frame % loopF) / loopF;
  const tx = interpolate(phase, [0, 1], [0, -50]);

  const sep = (
    <span
      style={{ display: 'inline-block', margin: '0 40px', color: billboard.textLo }}
    >
      ▌▌▌
    </span>
  );

  const row = (
    <span style={{ display: 'inline-flex', alignItems: 'center', whiteSpace: 'nowrap' }}>
      {items.map((item, i) => (
        <React.Fragment key={i}>
          <span style={{ color: billboard.textLo }}>{item}</span>
          {i < items.length - 1 ? sep : null}
        </React.Fragment>
      ))}
      {sep}
    </span>
  );

  return (
    <div
      style={{
        position: 'relative',
        width: '100%',
        height,
        background: variant === 'page' ? 'rgba(13, 16, 20, 0.35)' : billboard.bgInner,
        borderTop: `1px solid ${billboard.border}`,
        borderBottom: variant === 'page' ? `1px solid ${billboard.border}` : 'none',
        overflow: 'hidden',
        display: 'flex',
        alignItems: 'center',
        fontFamily: mono,
        fontSize: 10,
        textTransform: 'uppercase',
        letterSpacing: tracking.microLabel,
      }}
    >
      <div
        style={{
          display: 'inline-flex',
          transform: `translateX(${tx}%)`,
          willChange: 'transform',
        }}
      >
        {row}
        {row}
      </div>
      {/* Edge fades */}
      <div
        style={{
          position: 'absolute',
          left: 0,
          top: 0,
          bottom: 0,
          width: variant === 'page' ? 60 : 64,
          background: `linear-gradient(90deg, ${billboard.bgInner}, transparent)`,
          pointerEvents: 'none',
        }}
      />
      <div
        style={{
          position: 'absolute',
          right: 0,
          top: 0,
          bottom: 0,
          width: variant === 'page' ? 60 : 64,
          background: `linear-gradient(270deg, ${billboard.bgInner}, transparent)`,
          pointerEvents: 'none',
        }}
      />
    </div>
  );
};

export default Ticker;

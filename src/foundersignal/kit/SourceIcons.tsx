import React from 'react';
import { FS } from '../foundersignal-tokens';

/**
 * SourceIcons — displays the platform icons that FounderSignal scans.
 * Simple circle badges with platform initials/abbreviations in violet theme.
 */
const SOURCE_ICONS = [
  { name: 'Reddit', abbr: 'r' },
  { name: 'X', abbr: 'X' },
  { name: 'Product Hunt', abbr: 'PH' },
  { name: 'Hacker News', abbr: 'HN' },
  { name: 'Indie Hackers', abbr: 'IH' },
  { name: 'GitHub', abbr: 'GH' },
  { name: 'App Store', abbr: 'AS' },
] as const;

const SourceIcon: React.FC<{ 
  name: string; 
  abbr: string; 
  delay: number; 
  frame: number;
}> = ({ name, abbr, delay, frame }) => {
  const visible = frame >= delay;
  const opacity = visible ? 1 : 0;
  
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: 8,
        opacity,
        transition: 'opacity 0.3s ease',
      }}
    >
      <div
        style={{
          width: 56,
          height: 56,
          borderRadius: 14,
          background: FS.card,
          border: `1px solid ${FS.line}`,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontFamily: 'Inter, sans-serif',
          fontWeight: 700,
          fontSize: 18,
          color: FS.ink,
          boxShadow: `0 4px 12px ${FS.bloom}20`,
        }}
      >
        {abbr}
      </div>
      <div
        style={{
          fontFamily: 'Inter, sans-serif',
          fontWeight: 500,
          fontSize: 12,
          color: FS.gray,
          textAlign: 'center',
          maxWidth: 80,
        }}
      >
        {name}
      </div>
    </div>
  );
};

const SourceIcons: React.FC<{ frame: number; startAt: number }> = ({ frame, startAt }) => {
  if (frame < startAt || frame > startAt + 120) return null;
  
  return (
    <div
      style={{
        display: 'flex',
        gap: 24,
        flexWrap: 'wrap',
        justifyContent: 'center',
        maxWidth: 800,
      }}
    >
      {SOURCE_ICONS.map((source, index) => (
        <SourceIcon
          key={source.name}
          name={source.name}
          abbr={source.abbr}
          delay={startAt + index * 8}
          frame={frame}
        />
      ))}
    </div>
  );
};

export default SourceIcons;

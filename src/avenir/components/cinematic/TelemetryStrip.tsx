import React from 'react';
import { Easing, interpolate, useCurrentFrame, useVideoConfig } from 'remotion';
import OnAirDot from './OnAirDot';
import {
  EASE_SMOOTH,
  REGISTER,
  billboard,
  frames,
  motion,
  tracking,
  type,
  mono,
} from '../../tokens';

export const register = REGISTER.CINEMATIC;

export type TelemetryStripProps = {
  season: number;
  slotsFilled: number;
  slotsTotal: number;
  status?: 'LIVE' | 'STANDBY';
  arc?: string;
  delayFrames?: number;
};

const TelemetryStrip: React.FC<TelemetryStripProps> = ({
  season,
  slotsFilled,
  slotsTotal,
  status = 'LIVE',
  arc = '30·DAY',
  delayFrames = 0,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const ease = Easing.bezier(...EASE_SMOOTH);
  const local = frame - delayFrames;

  const inF = frames(motion.heroRevealMin, fps);
  const t = interpolate(local, [0, inF], [0, 1], {
    easing: ease,
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  const y = interpolate(t, [0, 1], [8, 0]);

  const seasonStr = String(season).padStart(2, '0');
  const segments = 10;
  const filledSegs = Math.round((slotsFilled / Math.max(slotsTotal, 1)) * segments);

  const labelStyle: React.CSSProperties = {
    fontFamily: mono,
    fontSize: type.telemetryLabel.size,
    fontWeight: 500,
    textTransform: 'uppercase',
    letterSpacing: tracking.microLabel,
    color: billboard.textMd,
  };
  const valueStyle: React.CSSProperties = {
    fontFamily: mono,
    fontSize: type.telemetryVal.size,
    fontWeight: 500,
    color: billboard.textHi,
    fontVariantNumeric: 'tabular-nums',
  };
  const diamond = (
    <span style={{ color: billboard.primary, fontSize: 10 }}>◆</span>
  );

  return (
    <div
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: 16,
        padding: '10px 18px',
        background: 'rgba(13, 16, 20, 0.88)',
        backdropFilter: 'blur(12px)',
        border: `1px solid rgba(232, 93, 58, 0.22)`,
        borderRadius: 4,
        boxShadow: `0 4px 18px rgba(0, 0, 0, 0.5), 0 0 18px rgba(232, 93, 58, 0.08)`,
        opacity: t,
        transform: `translateY(${y}px)`,
      }}
    >
      <Cell label="SEASON" labelStyle={labelStyle}>
        <span style={valueStyle}>{seasonStr}</span>
      </Cell>
      {diamond}
      <Cell label="SLOTS" labelStyle={labelStyle}>
        <span style={valueStyle}>
          {slotsFilled}/{slotsTotal}
        </span>
        <div style={{ display: 'inline-flex', gap: 2, marginLeft: 8 }}>
          {Array.from({ length: segments }).map((_, i) => (
            <div
              key={i}
              style={{
                width: 5,
                height: 8,
                background:
                  i < filledSegs
                    ? `linear-gradient(180deg, ${billboard.primary}, ${billboard.redDepth})`
                    : 'rgba(255, 255, 255, 0.06)',
                boxShadow:
                  i < filledSegs
                    ? `0 0 4px rgba(232, 93, 58, 0.4)`
                    : 'none',
              }}
            />
          ))}
        </div>
      </Cell>
      {diamond}
      <Cell label="STATUS" labelStyle={labelStyle}>
        <span style={{ display: 'inline-flex', alignItems: 'center', gap: 6 }}>
          <OnAirDot />
          <span style={valueStyle}>{status}</span>
        </span>
      </Cell>
      {diamond}
      <Cell label="ARC" labelStyle={labelStyle}>
        <span style={valueStyle}>{arc}</span>
      </Cell>
    </div>
  );
};

const Cell: React.FC<{
  label: string;
  labelStyle: React.CSSProperties;
  children: React.ReactNode;
}> = ({ label, labelStyle, children }) => (
  <span style={{ display: 'inline-flex', alignItems: 'center', gap: 8 }}>
    <span style={labelStyle}>{label}</span>
    {children}
  </span>
);

export default TelemetryStrip;

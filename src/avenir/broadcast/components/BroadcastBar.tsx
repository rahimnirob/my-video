import React from 'react';
import { interpolate, useCurrentFrame } from 'remotion';
import { billboard } from '../../tokens';
import { mono } from '../../tokens/fonts';
import { ease } from '../constants';

/**
 * BroadcastBar — the Scene 02 signature. A labelled broadcast track that fills
 * with live-red. Built once, used twice (INTRO 0:20 → 25%, FEATURE 1:30 → 80%);
 * the width difference IS the message. A brightness pulse fires when it loads.
 */

const LIVE_RED = billboard.onAirRed; // #ef4444 — the only broadcast color
const TRACK = '#1a1d24'; // subdued track
const LABEL = '#8a9099'; // subdued mono label (not competing)

export type BroadcastBarProps = {
  label: string;
  duration: string;
  /** Final fill as a fraction of the track width (0.25 | 0.80). */
  fillPercent: number;
  fillDurationFrames: number;
  labelAppearFrame: number;
  fillStartFrame: number;
  trackWidth?: number;
  trackHeight?: number;
};

const BroadcastBar: React.FC<BroadcastBarProps> = ({
  label,
  duration,
  fillPercent,
  fillDurationFrames,
  labelAppearFrame,
  fillStartFrame,
  trackWidth = 860,
  trackHeight = 10,
}) => {
  const frame = useCurrentFrame();
  const clampE = { easing: ease, extrapolateLeft: 'clamp' as const, extrapolateRight: 'clamp' as const };

  const labelOpacity = interpolate(frame, [labelAppearFrame, labelAppearFrame + 8], [0, 1], clampE);
  const fill = interpolate(frame, [fillStartFrame, fillStartFrame + fillDurationFrames], [0, fillPercent], clampE);

  // Single brightness pulse at fill completion (1 frame bright, 4 settle).
  const fillEnd = fillStartFrame + fillDurationFrames;
  const pulse = interpolate(frame, [fillEnd, fillEnd + 1, fillEnd + 5], [0, 1, 0], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  return (
    <div style={{ width: trackWidth }}>
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'baseline',
          marginBottom: 20,
          fontFamily: mono,
          fontSize: 24,
          fontWeight: 500,
          letterSpacing: '0.18em',
          color: LABEL,
          opacity: labelOpacity,
        }}
      >
        <span>{label}</span>
        <span>{duration}</span>
      </div>
      <div style={{ position: 'relative', width: '100%', height: trackHeight, background: TRACK, borderRadius: 999 }}>
        <div
          style={{
            position: 'absolute',
            left: 0,
            top: 0,
            height: '100%',
            width: `${fill * 100}%`,
            background: LIVE_RED,
            borderRadius: 999,
            boxShadow: `0 0 ${10 + pulse * 28}px rgba(239,68,68,${0.4 + pulse * 0.5})`,
          }}
        />
      </div>
    </div>
  );
};

export default BroadcastBar;

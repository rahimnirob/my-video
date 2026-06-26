import React from 'react';
import { AbsoluteFill, interpolate } from 'remotion';
import { ease, BB } from '../palette';
import { mono } from '../../tokens';

/**
 * S11 — AUTOMATION QUEUE (f840–906):
 * Sleek Slack/terminal-style log card showing automated slot approval and queuing.
 */
const clamp = { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' } as const;
const ORANGE = '#E85D3A';
const GREEN = '#22c55e';
const AMBER = '#F0A868';

const LOGS = [
  { time: '09:41:02', bot: 'SENTINEL', msg: 'Scheduling slot #18 for Season 02...', at: 846, color: AMBER },
  { time: '09:41:03', bot: 'X-BOT', msg: 'Social amplification pipeline primed.', at: 864, color: '#38bdf8' },
  { time: '09:41:05', bot: 'ADMIN', msg: 'Queue state: APPROVED & QUEUED.', at: 880, color: GREEN },
];

const Scene9Queue: React.FC<{ frame: number }> = ({ frame: f }) => {
  if (f < 835 || f > 912) return null;

  const enterP = interpolate(f, [840, 856], [0, 1], { easing: ease, ...clamp });
  const exitP = interpolate(f, [898, 906], [0, 1], { easing: ease, ...clamp });
  const op = enterP * (1 - exitP);

  const zoom = interpolate(f, [840, 870], [0.88, 1], { easing: ease, ...clamp });

  return (
    <AbsoluteFill style={{ alignItems: 'center', justifyContent: 'center', opacity: op }}>
      {/* Title */}
      <div
        style={{
          position: 'absolute',
          top: '12%',
          fontFamily: mono,
          fontSize: 12,
          letterSpacing: '0.24em',
          color: BB.white,
          opacity: enterP,
          fontWeight: 700,
          textTransform: 'uppercase' as const,
          display: 'flex',
          alignItems: 'center',
          gap: 8,
        }}
      >
        <span style={{ width: 6, height: 6, borderRadius: '50%', background: ORANGE, boxShadow: `0 0 8px ${ORANGE}` }} />
        Automation logs
      </div>

      {/* Terminal Card */}
      <div
        style={{
          width: 780,
          background: 'rgba(5, 6, 8, 0.92)',
          border: '1px solid rgba(232, 93, 58, 0.28)',
          borderRadius: 16,
          padding: '32px 36px',
          boxShadow: '0 30px 80px rgba(0,0,0,0.6), 0 0 40px rgba(232,93,58,0.06)',
          transform: `scale(${zoom})`,
          filter: `blur(${(1 - enterP) * 8}px)`,
        }}
      >
        {/* Terminal Header */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 24, borderBottom: '1px solid rgba(255,255,255,0.06)', paddingBottom: 16 }}>
          <div style={{ display: 'flex', gap: 6 }}>
            <span style={{ width: 10, height: 10, borderRadius: '50%', background: '#ef4444' }} />
            <span style={{ width: 10, height: 10, borderRadius: '50%', background: '#eab308' }} />
            <span style={{ width: 10, height: 10, borderRadius: '50%', background: '#22c55e' }} />
          </div>
          <div style={{ fontFamily: mono, fontSize: 10, color: 'rgba(255,255,255,0.3)', letterSpacing: '0.1em' }}>
            SLOT_DISPATCHER.LOG
          </div>
        </div>

        {/* Logs */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
          {LOGS.map((log, i) => {
            const logP = interpolate(f, [log.at, log.at + 12], [0, 1], { easing: ease, ...clamp });
            if (f < log.at) return null;

            return (
              <div
                key={i}
                style={{
                  opacity: logP,
                  transform: `translateY(${(1 - logP) * 8}px)`,
                  display: 'flex',
                  alignItems: 'baseline',
                  gap: 16,
                  fontFamily: mono,
                  fontSize: 13,
                  lineHeight: 1.5,
                }}
              >
                {/* Timestamp */}
                <span style={{ color: 'rgba(255,255,255,0.22)', flexShrink: 0 }}>
                  {log.time}
                </span>

                {/* Bot Badge */}
                <span
                  style={{
                    color: log.color,
                    fontWeight: 700,
                    textShadow: `0 0 10px ${log.color}20`,
                    flexShrink: 0,
                    minWidth: 100,
                  }}
                >
                  [{log.bot}]
                </span>

                {/* Message */}
                <span style={{ color: '#E6EAF2' }}>
                  {log.msg}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </AbsoluteFill>
  );
};

export default Scene9Queue;

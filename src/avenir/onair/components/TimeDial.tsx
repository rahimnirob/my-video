import React from 'react';
import { interpolate } from 'remotion';
import { sora, manrope, mono } from '../../tokens';
import { s } from '../layout';

/**
 * TimeDial — glass time-dial with a blue rim accent (§7). Counts the launch day
 * down 23:58 → 00:00 over a scrubbing ruler, then COOLS to grey as the day ends
 * (the signature drain). Driven by `progress` 0→1; the drain ramps over the
 * last 15% so midnight feels like the color bleeding out.
 */

export type TimeDialProps = {
  progress: number; // 0 = 23:58, 1 = 00:00
  width?: number; // demo px
};

const lerp = (a: number, b: number, t: number) => a + (b - a) * t;

const TimeDial: React.FC<TimeDialProps> = ({ progress, width = 344 }) => {
  // Color bleeds out as the clock approaches midnight.
  const drain = interpolate(progress, [0.72, 0.96], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  // Clock readout — 23:58 → 23:59 → 00:00, with midnight landing in the drain.
  const minutesPassed = progress < 0.5 ? 0 : progress < 0.9 ? 1 : 2;
  const mmRaw = 1438 + minutesPassed; // 1438..1440
  const mm = mmRaw >= 1440 ? mmRaw - 1440 : mmRaw;
  const hh = Math.floor(mm / 60);
  const mn = mm % 60;
  const big = `${String(hh).padStart(2, '0')}:${String(mn).padStart(2, '0')}`;
  const ampm = hh < 12 ? 'AM' : 'PM';
  const small = `00:0${2 - minutesPassed}`;
  const cold = progress >= 0.9;

  // Ruler scrub (demo px → render px).
  const numsX = s(90 - progress * 108);
  const ticksX = s(200 - progress * 420);

  // Selection accent: blue → grey as it cools.
  const selR = Math.round(lerp(106, 90, drain));
  const selG = Math.round(lerp(163, 98, drain));
  const selB = Math.round(lerp(247, 109, drain));
  const selRGB = `${selR},${selG},${selB}`;

  const nums = Array.from({ length: 28 }, (_, h) => h % 24);
  const ticks = Array.from({ length: 160 }, (_, k) => k % 5 === 0);

  return (
    <div
      style={{
        position: 'relative',
        width: s(width),
        borderRadius: s(22),
        overflow: 'hidden',
        background: 'rgba(16,22,34,0.55)',
        border: '1px solid rgba(255,255,255,0.10)',
        backdropFilter: `blur(${s(16)}px)`,
        WebkitBackdropFilter: `blur(${s(16)}px)`,
        boxShadow: `0 ${s(26)}px ${s(60)}px rgba(0,0,0,0.55), inset 0 1px 0 rgba(255,255,255,0.08)`,
        filter: `grayscale(${0.85 * drain}) brightness(${1 - 0.32 * drain})`,
      }}
    >
      <div style={{ padding: `${s(18)}px ${s(18)}px ${s(16)}px` }}>
        {/* top row */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <span
            style={{
              fontFamily: manrope,
              fontSize: s(13),
              color: '#fff',
              padding: `${s(7)}px ${s(14)}px`,
              borderRadius: s(20),
              background: 'rgba(255,255,255,0.06)',
              border: '1px solid rgba(255,255,255,0.12)',
            }}
          >
            Launch day
          </span>
          <span style={{ fontFamily: sora, fontWeight: 700, fontSize: s(34), letterSpacing: '0.01em', color: '#fff' }}>
            {big}
            <span style={{ fontSize: s(13), color: 'rgba(255,255,255,0.5)', marginLeft: s(5), fontWeight: 500 }}>
              {ampm}
            </span>
          </span>
        </div>

        {/* ruler */}
        <div style={{ position: 'relative', height: s(74), margin: `${s(14)}px 0`, overflow: 'hidden' }}>
          <div
            style={{
              position: 'absolute',
              top: s(4),
              left: 0,
              display: 'flex',
              gap: s(36),
              fontFamily: mono,
              fontSize: s(13),
              transform: `translateX(${numsX}px)`,
            }}
          >
            {nums.map((hr, i) => (
              <span key={i} style={{ color: hr % 2 ? 'rgba(255,255,255,0.18)' : 'rgba(255,255,255,0.5)' }}>
                {String(hr).padStart(2, '0')}
              </span>
            ))}
          </div>
          <div style={{ position: 'absolute', bottom: s(14), left: 0, display: 'flex', transform: `translateX(${ticksX}px)` }}>
            {ticks.map((maj, i) => (
              <span key={i} style={{ width: s(9), display: 'block' }}>
                <span
                  style={{
                    display: 'block',
                    margin: '0 auto',
                    width: 1,
                    height: maj ? s(18) : s(9),
                    background: maj ? 'rgba(255,255,255,0.4)' : 'rgba(255,255,255,0.22)',
                  }}
                />
              </span>
            ))}
          </div>
          {/* selection needle */}
          <div
            style={{
              position: 'absolute',
              top: s(-2),
              left: '50%',
              transform: 'translateX(-50%)',
              width: s(34),
              height: s(62),
              borderRadius: s(18),
              background: 'rgba(255,255,255,0.05)',
              border: `1px solid rgba(${selRGB},${cold ? 0.4 : 0.5})`,
              boxShadow: cold
                ? `0 0 ${s(10)}px rgba(${selRGB},0.3)`
                : `0 0 ${s(22)}px rgba(${selRGB},0.5), inset 0 0 ${s(14)}px rgba(${selRGB},0.25)`,
            }}
          >
            <span
              style={{
                position: 'absolute',
                left: '50%',
                top: '50%',
                transform: 'translate(-50%,-50%)',
                width: 2,
                height: s(30),
                borderRadius: 2,
                background: cold ? '#5b626d' : '#dbe7ff',
                boxShadow: cold ? 'none' : `0 0 ${s(10)}px rgba(${selRGB},0.9)`,
              }}
            />
          </div>
        </div>

        {/* bottom row */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <span
            style={{
              fontFamily: mono,
              fontSize: s(11),
              color: cold ? '#5b626d' : '#fff',
              padding: `${s(7)}px ${s(13)}px`,
              borderRadius: s(20),
              letterSpacing: '0.04em',
              background: cold
                ? 'rgba(40,46,56,0.5)'
                : 'linear-gradient(135deg, rgba(59,130,246,0.4), rgba(59,130,246,0.15))',
              border: `1px solid ${cold ? '#2a2f37' : 'rgba(106,163,247,0.4)'}`,
            }}
          >
            {cold ? 'ENDED' : '+23h live'}
          </span>
          <span style={{ fontFamily: sora, fontWeight: 700, fontSize: s(26), color: 'rgba(255,255,255,0.85)' }}>
            {small}
            <span style={{ fontSize: s(13), color: 'rgba(255,255,255,0.5)', marginLeft: s(5), fontWeight: 500 }}>
              left
            </span>
          </span>
        </div>
      </div>
    </div>
  );
};

export default TimeDial;

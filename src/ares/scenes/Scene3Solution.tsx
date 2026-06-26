import React from 'react';
import { AbsoluteFill, Img, interpolate, staticFile } from 'remotion';
import { ease, FONT_FAMILY, L } from '../ares-tokens';
import GlassCard from '../kit/GlassCard';
import BlurText from '../kit/BlurText';
import ToolHub from '../kit/ToolHub';
import ProcessingPill from '../kit/ProcessingPill';
import { Icon, ICON_ORDER, IconName } from '../icons';

/**
 * Scene 3 — SOLUTION (lavender, f318–714):
 *   s4 command bar — typed query + blue/cyan gradient chrome   f326–414
 *   s5 six-tools-converge hero ("Six tools. One brain.")       f420–540
 *   s6 CHAOS→ORDER: a ping multiplies into a fan, then resolves
 *      into organized panels ("…in one place.")                f540–666
 *   s7 processing pill ("Connecting your stack")               f668–714
 * Global frame; each beat self-gates. Accent words flow the Ares gradient.
 */
const clamp = { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' } as const;
const BAR = 'rgba(91,97,114,0.12)';
const GRAD = 'linear-gradient(135deg, #2563EB, #00E5FF)';

/* s4 — the single command surface (typed query + designed chrome) */
const CommandBar: React.FC<{ f: number }> = ({ f }) => {
  const idea = 'Plan my launch week';
  const typed = idea.slice(0, Math.max(0, Math.floor((f - 346) / 1.1)));
  const caretOn = f % 24 < 12;
  return (
    <AbsoluteFill style={{ alignItems: 'center', justifyContent: 'center' }}>
      <GlassCard frame={f} entryFrame={326} exitFrame={412} width={1180} padding={0} style={{ border: 'none', boxShadow: '0 0 0 1.5px rgba(0,229,255,0.35), 0 26px 64px rgba(37,99,235,0.22)' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 22, padding: '30px 30px' }}>
          <div style={{ width: 56, height: 56, borderRadius: 15, background: GRAD, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, boxShadow: '0 8px 20px rgba(0,229,255,0.35)' }}>
            <Img src={staticFile('ares/ares-logo.png')} style={{ height: 30, filter: 'brightness(0) invert(1)' }} />
          </div>
          <div style={{ flex: 1, fontFamily: FONT_FAMILY, fontWeight: 500, fontSize: 50, color: L.ink, whiteSpace: 'nowrap', overflow: 'hidden' }}>
            {typed ? typed : <span style={{ color: L.gray }}>Ask Ares anything</span>}
            <span style={{ opacity: caretOn ? 1 : 0.12, color: L.accent, fontWeight: 400 }}>|</span>
          </div>
          <div style={{ width: 60, height: 60, borderRadius: '50%', background: GRAD, boxShadow: '0 10px 24px rgba(0,229,255,0.45)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
            <svg width={26} height={26} viewBox="0 0 24 24" fill="none">
              <path d="M5 12h14M13 6l6 6-6 6" stroke="#fff" strokeWidth={2.6} strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
        </div>
        <div style={{ display: 'flex', gap: 14, padding: '0 30px 28px' }}>
          {['Plan', 'Connect', 'Automate'].map((label) => (
            <div key={label} style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '12px 22px', borderRadius: 999, background: L.bg, border: `1px solid ${L.line}` }}>
              <span style={{ width: 9, height: 9, borderRadius: '50%', background: GRAD }} />
              <span style={{ fontFamily: FONT_FAMILY, fontWeight: 500, fontSize: 24, color: L.gray }}>{label}</span>
            </div>
          ))}
        </div>
      </GlassCard>
    </AbsoluteFill>
  );
};

/* s6a — a notification ping that multiplies into a rotated fan (the overload) */
const FanCard: React.FC<{ iconName: IconName; w: number }> = ({ iconName, w }) => (
  <div style={{ width: w, borderRadius: 18, background: '#fff', boxShadow: '0 18px 40px rgba(11,16,32,0.16)', border: `1px solid ${L.line}`, padding: '20px 22px', display: 'flex', alignItems: 'center', gap: 16 }}>
    <div style={{ width: 50, height: 50, borderRadius: 13, background: L.bg, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
      <Icon name={iconName} size={28} color={L.ink} />
    </div>
    <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 10 }}>
      <div style={{ height: 14, borderRadius: 7, background: 'rgba(11,16,32,0.42)', width: '52%' }} />
      <div style={{ height: 11, borderRadius: 6, background: BAR, width: '92%' }} />
    </div>
  </div>
);

const FAN = [
  { x: 0, y: -168, r: 2, big: false },
  { x: -388, y: -82, r: -13, big: false },
  { x: 388, y: -72, r: 12, big: false },
  { x: 0, y: 8, r: 0, big: true },
  { x: -356, y: 134, r: -9, big: false },
  { x: 366, y: 142, r: 10, big: false },
  { x: 12, y: 216, r: 3, big: false },
];

const FanMultiply: React.FC<{ f: number }> = ({ f }) => {
  const exit = interpolate(f, [588, 606], [0, 1], { easing: ease, ...clamp });
  if (exit >= 1) return null;
  return (
    <AbsoluteFill style={{ alignItems: 'center', justifyContent: 'center', opacity: 1 - exit, transform: `translateY(${-exit * 44}px)` }}>
      {FAN.map((c, i) => {
        const order = i === 3 ? 0 : i < 3 ? i + 1 : i;
        const inAt = 540 + order * 5;
        const p = interpolate(f, [inAt, inAt + 14], [0, 1], { easing: ease, ...clamp });
        const x = c.x * p;
        const y = c.y * p;
        const r = c.r * p;
        const sc = (c.big ? 1.06 : 0.96) * (0.7 + 0.3 * p);
        return (
          <div key={i} style={{ position: 'absolute', opacity: p, transform: `translate(${x}px, ${y}px) rotate(${r}deg) scale(${sc})`, zIndex: c.big ? 10 : 1 }}>
            <FanCard iconName={ICON_ORDER[i % ICON_ORDER.length]} w={c.big ? 480 : 420} />
          </div>
        );
      })}
    </AbsoluteFill>
  );
};

/* s6b — one organized panel (structure-only content per kind) */
const Panel: React.FC<{ f: number; entry: number; title: string; kind: 'tasks' | 'memory' | 'connected' }> = ({ f, entry, title, kind }) => {
  const innerP = interpolate(f, [entry + 8, entry + 20], [0, 1], { ...clamp });
  return (
    <GlassCard frame={f} entryFrame={entry} exitFrame={656} width={460} height={300}>
      <div style={{ fontFamily: FONT_FAMILY, fontWeight: 600, fontSize: 30, color: L.ink, marginBottom: 26 }}>{title}</div>
      <div style={{ opacity: innerP }}>
        {kind === 'tasks' &&
          [0, 1, 2].map((i) => (
            <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 18 }}>
              <div style={{ width: 26, height: 26, borderRadius: '50%', border: `2px solid ${L.line}` }} />
              <div style={{ height: 16, borderRadius: 8, background: BAR, width: i === 1 ? '55%' : '78%' }} />
            </div>
          ))}
        {kind === 'memory' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            {[0, 1, 2].map((i) => (
              <div key={i} style={{ height: 18, borderRadius: 9, background: BAR, width: ['90%', '70%', '80%'][i] }} />
            ))}
            <svg width={120} height={48} style={{ marginTop: 8 }}>
              <line x1={14} y1={34} x2={60} y2={12} stroke={L.gray} strokeWidth={2} opacity={0.4} />
              <line x1={60} y1={12} x2={106} y2={30} stroke={L.gray} strokeWidth={2} opacity={0.4} />
              {[[14, 34], [60, 12], [106, 30]].map(([x, y], i) => (
                <circle key={i} cx={x} cy={y} r={6} fill={L.bloom} opacity={0.55} />
              ))}
            </svg>
          </div>
        )}
        {kind === 'connected' && (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 14 }}>
            {ICON_ORDER.map((n) => (
              <div key={n} style={{ height: 64, borderRadius: 14, background: L.bg, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Icon name={n} size={30} color={L.ink} />
              </div>
            ))}
          </div>
        )}
      </div>
    </GlassCard>
  );
};

const Scene3Solution: React.FC<{ frame: number }> = ({ frame: f }) => {
  if (f < 314 || f > 716) return null;
  return (
    <AbsoluteFill>
      {f <= 414 && <CommandBar f={f} />}

      {f >= 416 && f <= 540 && <ToolHub frame={f} startAt={420} />}
      <BlurText text="Six tools. One brain." frame={f} inAt={510} outAt={536} fontSize={72} color={L.ink} weight={600} top="74%" emphasis={['One']} accentMode="lavender" />

      {f >= 538 && f <= 610 && <FanMultiply f={f} />}

      {f >= 586 && f <= 662 && (
        <AbsoluteFill style={{ alignItems: 'center', justifyContent: 'center' }}>
          <div style={{ display: 'flex', gap: 28, marginBottom: 120 }}>
            <Panel f={f} entry={590} title="Task Planning" kind="tasks" />
            <Panel f={f} entry={596} title="Project Memory" kind="memory" />
            <Panel f={f} entry={602} title="Connected" kind="connected" />
          </div>
        </AbsoluteFill>
      )}
      <BlurText text="Plan, remember, connect — in one place." frame={f} inAt={600} outAt={656} fontSize={44} color={L.gray} weight={600} top="80%" emphasis={['one']} accentMode="lavender" />

      {f >= 664 && <ProcessingPill frame={f} inAt={668} outAt={706} pre="Connecting your" pill="stack" fontSize={96} />}
    </AbsoluteFill>
  );
};

export default Scene3Solution;

import React from 'react';
import { AbsoluteFill, Easing, interpolate } from 'remotion';
import { ease, fsFill, FONT_FAMILY, FS } from '../foundersignal-tokens';
import GlassCard from '../kit/GlassCard';
import BlurText from '../kit/BlurText';
import ProcessingPill from '../kit/ProcessingPill';
import SourceIcons from '../kit/SourceIcons';

/**
 * Scene 3 — SOLUTION (field, f318–714):
 *   s4 command bar — typed query + violet gradient chrome      f318–414
 *   s5 source scan (THE signature beat)                       f420–540
 *   s6 3 analysis cards (pain points, market, MVP)            f540–666
 *   s7 processing pill ("Analyzing your idea")                f668–714
 * Global frame; each beat self-gates. Accent words flow the FounderSignal gradient.
 */
const clamp = { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' } as const;
const BAR = 'rgba(167,139,250,0.12)';
const GRAD = 'linear-gradient(135deg, #7C3AED, #A78BFA)';

/* ── s4: the single command surface (typed query + designed chrome) ────── */
const CommandBar: React.FC<{ f: number }> = ({ f }) => {
  const idea = 'AI productivity tool';
  const typed = idea.slice(0, Math.max(0, Math.floor((f - 346) / 1.1)));
  const caretOn = f % 24 < 12;
  return (
    <AbsoluteFill style={{ alignItems: 'center', justifyContent: 'center' }}>
      <GlassCard frame={f} entryFrame={326} exitFrame={412} width={1180} padding={0} style={{ border: 'none', boxShadow: '0 0 0 1.5px rgba(124,58,237,0.35), 0 26px 64px rgba(124,58,237,0.22)' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 22, padding: '30px 30px' }}>
          <div style={{ width: 56, height: 56, borderRadius: 15, background: GRAD, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, boxShadow: '0 8px 20px rgba(124,58,237,0.35)' }}>
            <span style={{ fontFamily: FONT_FAMILY, fontWeight: 800, fontSize: 24, color: '#fff' }}>FS</span>
          </div>
          <div style={{ flex: 1, fontFamily: FONT_FAMILY, fontWeight: 500, fontSize: 50, color: FS.ink, whiteSpace: 'nowrap', overflow: 'hidden' }}>
            {typed ? typed : <span style={{ color: FS.gray }}>Describe your idea</span>}
            <span style={{ opacity: caretOn ? 1 : 0.12, color: FS.accent, fontWeight: 400 }}>|</span>
          </div>
          <div style={{ width: 60, height: 60, borderRadius: '50%', background: GRAD, boxShadow: '0 10px 24px rgba(124,58,237,0.45)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
            <svg width={26} height={26} viewBox="0 0 24 24" fill="none">
              <path d="M5 12h14M13 6l6 6-6 6" stroke="#fff" strokeWidth={2.6} strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
        </div>
        <div style={{ display: 'flex', gap: 14, padding: '0 30px 28px' }}>
          {['Pain Points', 'Market', 'Validation'].map((label) => (
            <div key={label} style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '12px 22px', borderRadius: 999, background: FS.bg, border: `1px solid ${FS.line}` }}>
              <span style={{ width: 9, height: 9, borderRadius: '50%', background: GRAD }} />
              <span style={{ fontFamily: FONT_FAMILY, fontWeight: 500, fontSize: 24, color: FS.gray }}>{label}</span>
            </div>
          ))}
        </div>
      </GlassCard>
    </AbsoluteFill>
  );
};

/* ── s5: THE signature beat — source scan ──────────────────────── */
const EASE_IN = Easing.bezier(0.5, 0, 0.84, 0.25);

const METERS = [
  { label: 'Market demand', pct: 0.82 },
  { label: 'Competition',   pct: 0.45 },
  { label: 'Revenue potential', pct: 0.74 },
] as const;

const SourceScan: React.FC<{ f: number }> = ({ f }) => {
  if (f < 418 || f > 542) return null;
  const appear = interpolate(f, [420, 438], [0, 1], { easing: ease, ...clamp });
  const exit = interpolate(f, [534, 542], [0, 1], { easing: ease, ...clamp });
  const op = appear * (1 - exit);

  // the idea card stays center
  const ideaText = 'AI productivity tool';

  // scan line sweeps top→bottom
  const scanP = interpolate(f, [440, 470], [0, 1], { easing: ease, ...clamp });

  // meters fill after scan
  const metersShow = interpolate(f, [468, 480], [0, 1], { easing: ease, ...clamp });

  // ✓ VALIDATED stamp
  const stampP = interpolate(f, [498, 516], [0, 1], { easing: EASE_IN, ...clamp });
  const pulse = interpolate(f, [516, 522, 530], [0, 1, 0], clamp);

  return (
    <AbsoluteFill style={{ alignItems: 'center', justifyContent: 'center', opacity: op }}>
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 32 }}>
        {/* idea card */}
        <div
          style={{
            position: 'relative',
            width: 780,
            padding: '32px 40px',
            background: FS.card,
            borderRadius: 18,
            border: `1px solid ${FS.line}`,
            boxShadow: '0 24px 60px rgba(124,58,237,0.12)',
            overflow: 'hidden',
          }}
        >
          {/* scan line */}
          {scanP > 0.001 && scanP < 0.999 && (
            <div
              style={{
                position: 'absolute',
                left: 0,
                right: 0,
                top: `${scanP * 100}%`,
                height: 3,
                background: `linear-gradient(90deg, transparent 0%, ${FS.bloom} 50%, transparent 100%)`,
                opacity: Math.sin(scanP * Math.PI) * 0.9,
                boxShadow: `0 0 18px ${FS.accent}`,
                zIndex: 10,
              }}
            />
          )}

          <div style={{ fontFamily: FONT_FAMILY, fontWeight: 500, fontSize: 16, color: FS.gray, letterSpacing: '0.12em', textTransform: 'uppercase' as const, marginBottom: 16 }}>
            Your idea
          </div>
          <div style={{ fontFamily: FONT_FAMILY, fontWeight: 700, fontSize: 36, color: FS.ink, marginBottom: 32 }}>
            {ideaText}
          </div>

          {/* meters */}
          <div style={{ opacity: metersShow }}>
            {METERS.map((m, i) => {
              const mStart = 472 + i * 8;
              const grow = interpolate(f, [mStart, mStart + 28], [0, 1], { easing: ease, ...clamp });
              const mOp = interpolate(f, [mStart, mStart + 12], [0, 1], { easing: ease, ...clamp });
              // dim rows when stamp lands
              const dim = 1 - 0.28 * stampP;
              return (
                <div key={m.label} style={{ display: 'flex', alignItems: 'center', gap: 20, marginBottom: 16, opacity: mOp * dim }}>
                  <div style={{ width: 220, fontFamily: FONT_FAMILY, fontWeight: 600, fontSize: 18, color: FS.ink }}>{m.label}</div>
                  <div style={{ flex: 1, height: 12, borderRadius: 6, background: FS.line, overflow: 'hidden' }}>
                    <div style={{ height: '100%', width: `${m.pct * grow * 100}%`, borderRadius: 6, background: GRAD }} />
                  </div>
                </div>
              );
            })}
          </div>

          {/* ✓ VALIDATED stamp */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 16,
              marginTop: 20,
              opacity: stampP,
              transform: `scale(${1.12 - 0.12 * stampP})`,
              transformOrigin: 'left center',
            }}
          >
            {/* pulse ring */}
            <div style={{ position: 'relative' }}>
              <div
                style={{
                  position: 'absolute',
                  inset: -8,
                  borderRadius: '50%',
                  border: `3px solid ${FS.accent}`,
                  opacity: pulse * 0.7,
                  transform: `scale(${1 + pulse * 0.5})`,
                }}
              />
              <div
                style={{
                  width: 48,
                  height: 48,
                  borderRadius: '50%',
                  background: FS.bloom,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0,
                }}
              >
                <svg width={24} height={24} viewBox="0 0 24 24" fill="none">
                  <path d="M5 12.5l4.5 4.5L19 7" stroke="#fff" strokeWidth={3} strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>
            </div>
            <div style={{ fontFamily: FONT_FAMILY, fontWeight: 800, fontSize: 32, letterSpacing: '0.04em', ...fsFill(f, false) }}>
              ✓ VALIDATED
            </div>
          </div>
        </div>

        {/* Source icons below the card */}
        <div style={{ marginTop: 24 }}>
          <SourceIcons frame={f} startAt={440} />
        </div>
      </div>
    </AbsoluteFill>
  );
};

/* ── s6: 3 analysis cards (structure-only, honest UI) ─────────────────── */
const AnalysisPanel: React.FC<{ f: number; entry: number; title: string; kind: 'pain' | 'market' | 'mvp' }> = ({ f, entry, title, kind }) => {
  const innerP = interpolate(f, [entry + 8, entry + 20], [0, 1], clamp);
  return (
    <GlassCard frame={f} entryFrame={entry} exitFrame={656} width={460} height={300}>
      <div style={{ fontFamily: FONT_FAMILY, fontWeight: 600, fontSize: 30, color: FS.ink, marginBottom: 26 }}>{title}</div>
      <div style={{ opacity: innerP }}>
        {kind === 'pain' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            {[0.85, 0.62, 0.78].map((w, i) => (
              <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
                <div style={{ height: 14, borderRadius: 7, background: GRAD, width: `${w * 100}%`, opacity: 0.8 }} />
                <div style={{ height: 14, borderRadius: 7, background: BAR, flex: 1 }} />
              </div>
            ))}
          </div>
        )}
        {kind === 'market' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            {[0, 1, 2].map((i) => (
              <div key={i} style={{ height: 18, borderRadius: 9, background: BAR, width: ['90%', '70%', '80%'][i] }} />
            ))}
            <svg width={120} height={48} style={{ marginTop: 8 }}>
              <line x1={14} y1={34} x2={60} y2={12} stroke={FS.gray} strokeWidth={2} opacity={0.4} />
              <line x1={60} y1={12} x2={106} y2={30} stroke={FS.gray} strokeWidth={2} opacity={0.4} />
              {[[14, 34], [60, 12], [106, 30]].map(([x, y], i) => (
                <circle key={i} cx={x} cy={y} r={6} fill={FS.bloom} opacity={0.55} />
              ))}
            </svg>
          </div>
        )}
        {kind === 'mvp' && (
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 20, paddingTop: 20 }}>
            <div
              style={{
                width: 72,
                height: 72,
                borderRadius: '50%',
                background: FS.bloom,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <svg width={36} height={36} viewBox="0 0 24 24" fill="none">
                <path d="M5 12.5l4.5 4.5L19 7" stroke="#fff" strokeWidth={3} strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
            <div style={{ fontFamily: FONT_FAMILY, fontWeight: 700, fontSize: 24, color: FS.ink, letterSpacing: '0.02em' }}>Ready to Build</div>
            <div style={{ fontFamily: FONT_FAMILY, fontWeight: 500, fontSize: 16, color: FS.gray, textAlign: 'center' as const }}>
              MVP plan generated.
            </div>
          </div>
        )}
      </div>
    </GlassCard>
  );
};

/* ── Scene3Solution — master container ───────────────────────────────── */
const Scene3Solution: React.FC<{ frame: number }> = ({ frame: f }) => {
  if (f < 314 || f > 716) return null;
  return (
    <AbsoluteFill>
      {/* s4: command bar */}
      {f <= 414 && <CommandBar f={f} />}

      {/* s5: source scan (THE signature) */}
      <SourceScan f={f} />
      <BlurText text="See what people actually need." frame={f} inAt={490} outAt={536} fontSize={48} color={FS.gray} weight={600} top="86%" emphasis={['actually']} accentMode="field" />

      {/* s6: 3 analysis cards */}
      {f >= 538 && f <= 662 && (
        <AbsoluteFill style={{ alignItems: 'center', justifyContent: 'center' }}>
          <div style={{ display: 'flex', gap: 28, marginBottom: 120 }}>
            <AnalysisPanel f={f} entry={544} title="Pain Points" kind="pain" />
            <AnalysisPanel f={f} entry={550} title="Market Size" kind="market" />
            <AnalysisPanel f={f} entry={556} title="MVP Plan" kind="mvp" />
          </div>
        </AbsoluteFill>
      )}
      <BlurText text="Build what validates." frame={f} inAt={558} outAt={650} fontSize={44} color={FS.gray} weight={600} top="80%" emphasis={['validates']} accentMode="field" />

      {/* s7: processing pill */}
      {f >= 664 && <ProcessingPill frame={f} inAt={668} outAt={706} pre="Analyzing your" pill="idea" fontSize={96} />}
    </AbsoluteFill>
  );
};

export default Scene3Solution;

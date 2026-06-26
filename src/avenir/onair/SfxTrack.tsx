import React from 'react';
import { Audio, Sequence, interpolate, staticFile } from 'remotion';

/**
 * onair/SfxTrack.tsx — the sound layer for OnAirExplainer.
 *
 * TWO-PART score, hinged on THE TURN (founder direction):
 *   • COLD ERA (hook → graveyard, f0–~775): SFX-forward. The ticking clock,
 *     whooshes, the 00:00 power-down and the burial carry it — no music yet.
 *     Kept present ("high") but well below the earlier ear-bleed levels.
 *   • THE VIBE CHANGE (the turn, ~f774): as the card lifts into the billboard,
 *     the music swells IN and a low cold drone fades out — the world flips.
 *   • BILLBOARD ERA (turn → offer, f774–1659): music-forward. The track's
 *     building section (started ~73s in so its re-drop lands on the ignition)
 *     carries the vibe; SFX drop to light touches.
 *
 * Frames are GLOBAL composition frames (30fps). Crops are non-destructive
 * (trimBefore/trimAfter) and every cue has an in/out envelope so tails don't pop.
 */

const MUSIC = staticFile('music/rockot-dark-cinematic-ambient-beat-173058.mp3');
const sfx = (n: string) => staticFile(`SFX/${n}`);

const SRC = {
  drone: 'freesound_community-dark-ambient-drone-sound-32843.mp3',
  clockFast: 'dragon-studio-clock-ticking-effect-376883.mp3',
  clockReal: 'virtual_vibes-real-clock-ticking-379469.mp3',
  rise: 'soundreality-cinematic-rise-132655.mp3',
  powerDown: 'freesound_community-power-down-89297.mp3',
  kick: 'freesound_community-big-reverb-kick-29739.mp3',
  thud: 'dragon-studio-impact-thud-372473.mp3',
} as const;

type CueProps = {
  from: number;
  dur: number;
  src: string;
  vol: number;
  fadeIn?: number;
  fadeOut?: number;
  trimBefore?: number;
  trimAfter?: number;
  name?: string;
};

/** One placed sound: positioned by `from`, trimmed, click-safe via an in/out
 *  volume envelope so cropped tails never pop. */
const Cue: React.FC<CueProps> = ({
  from,
  dur,
  src,
  vol,
  fadeIn = 3,
  fadeOut = 10,
  trimBefore,
  trimAfter,
  name,
}) => (
  <Sequence from={from} durationInFrames={dur} name={name} layout="none">
    <Audio
      src={sfx(src)}
      trimBefore={trimBefore}
      trimAfter={trimAfter}
      volume={(f) =>
        Math.max(
          0,
          interpolate(
            f,
            [0, fadeIn, Math.max(fadeIn + 1, dur - fadeOut), dur],
            [0, vol, vol, 0],
            { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' },
          ),
        )
      }
    />
  </Sequence>
);

const SfxTrack: React.FC = () => (
  <>
    {/* ════ THE VIBE CHANGE — music swells in on the turn, carries the billboard era ════ */}
    <Sequence from={0} durationInFrames={1659} name="music·billboard" layout="none">
      <Audio
        src={MUSIC}
        trimBefore={2190} /* ~73s in: the track's re-drop lands on the ignition, builds to the CTA */
        volume={(f) =>
          Math.max(
            0,
            interpolate(
              f,
              [755, 820, 1615, 1659],
              [0, 0.19, 0.19, 0],
              { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' },
            ),
          )
        }
      />
    </Sequence>

    {/* ════ COLD ERA — SFX-forward (no music). Cold dark glue under the ticking. ════ */}
    <Cue name="cold·drone" from={0} dur={800} src={SRC.drone} vol={0.15} fadeIn={40} fadeOut={60} />

    {/* 01 — the countdown ticking (the sound you liked), under the broadcast band */}
    <Cue name="01·launch-clock" from={122} dur={184} src={SRC.clockFast} vol={0.55} fadeIn={24} fadeOut={36} />
    {/* 01→02 — riser climaxes on the clock-dive into the dial */}
    <Cue name="01·riser" from={270} dur={62} src={SRC.rise} vol={0.16} trimBefore={523} fadeIn={18} fadeOut={8} />
    {/* 02 — ominous 1Hz tick under the dial */}
    <Cue name="02·dial-clock" from={330} dur={76} src={SRC.clockReal} vol={0.18} fadeIn={12} fadeOut={14} />
    {/* 02 — soft sub power-down lands on 00:00 as the colour drains */}
    <Cue name="02·power-down" from={403} dur={80} src={SRC.powerDown} vol={0.22} trimBefore={4} fadeIn={2} fadeOut={40} />
    {/* 03 — the world goes under (graveyard kept subdued) */}
    <Cue name="03·burial-kick" from={514} dur={90} src={SRC.kick} vol={0.2} fadeIn={2} fadeOut={40} />
    {/* 03 — hollow dead thud as it settles */}
    <Cue name="03·pile-thud" from={637} dur={28} src={SRC.thud} vol={0.18} fadeIn={1} fadeOut={12} />
    {/* f645–755: silence hold — then the music arrives and carries the billboard era alone */}
  </>
);

export default SfxTrack;

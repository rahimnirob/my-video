import React from 'react';
import { sora, manrope } from '../../tokens';
import { s } from '../layout';

/**
 * GraveyardPile — the colorless pile of products that launched before (§7).
 * Grey, dim, small, rotated. Lumen descends and settles among them.
 */

type Dead = { name: string; left: string; top: string; rot: number };

const DEAD: Dead[] = [
  { name: 'cargo', left: '7%', top: '62%', rot: -8 },
  { name: 'orbit', left: '24%', top: '70%', rot: 5 },
  { name: 'draft', left: '40%', top: '64%', rot: -4 },
  { name: 'forge', left: '57%', top: '71%', rot: 7 },
  { name: 'pulse fm', left: '73%', top: '63%', rot: -6 },
  { name: 'atlas', left: '85%', top: '73%', rot: 4 },
];

export type GraveyardPileProps = {
  /** Push the whole pile down by this many %, e.g. as Lumen lifts out of it. */
  shiftYpct?: number;
  opacity?: number;
};

const GraveyardPile: React.FC<GraveyardPileProps> = ({ shiftYpct = 0, opacity = 1 }) => {
  return (
    <>
      {DEAD.map((d) => (
        <div
          key={d.name}
          style={{
            position: 'absolute',
            left: d.left,
            top: shiftYpct ? `calc(${d.top} + ${shiftYpct}%)` : d.top,
            opacity,
            width: s(172),
            borderRadius: s(15),
            overflow: 'hidden',
            background: 'rgba(20,24,32,0.82)',
            border: '1px solid #3a414e',
            filter: 'grayscale(1) brightness(0.72)',
            transform: `rotate(${d.rot}deg)`,
            boxShadow: `0 ${s(12)}px ${s(30)}px rgba(0,0,0,0.5)`,
            zIndex: 5,
          }}
        >
          <div style={{ padding: s(13) }}>
            <div style={{ fontFamily: sora, fontWeight: 600, fontSize: s(12.5), color: '#737b88' }}>
              {d.name}
            </div>
            <div style={{ fontFamily: manrope, fontSize: s(8.5), color: '#565d68', marginTop: s(3) }}>
              last seen yesterday
            </div>
          </div>
        </div>
      ))}
    </>
  );
};

export default GraveyardPile;

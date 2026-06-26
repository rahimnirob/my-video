import React from 'react';
import { KineticText, BottomGradient } from '../components';

/**
 * Beat 5 — THE OFFER (800–985). "50 slots." rises on the bottom-gradient fill
 * (effect D), then the three-part promise builds calmly word by word (flow).
 * No price — that lives in the self-reply.
 */
export const Offer: React.FC = () => (
  <>
    <BottomGradient
      text={'50 slots.'}
      startFrame={808}
      fontSize={184}
      revealF={24}
      sheenF={64}
      exitAt={862}
      exitF={14}
    />
    <KineticText
      text={'Your product. 30 days live.\nForever archived.'}
      startFrame={882}
      mode="flow"
      reveal="focus"
      fontSize={88}
      perWordF={6}
      enterF={14}
      lineHeight={1.16}
      exitAt={964}
      exitF={16}
    />
  </>
);

export default Offer;

import React from 'react';
import { KineticText, BottomGradient } from '../components';

/**
 * Beat 2 — THE REFRAME (185–350). The setup builds calmly word by word (flow),
 * then the landing "That's the record." rises out of the dark on the
 * bottom-gradient fill (effect D) — a different motion, the idea crystallising.
 */
export const Reframe: React.FC = () => (
  <>
    <KineticText
      text={"On Avenir, that's not the end."}
      startFrame={190}
      mode="flow"
      reveal="focus"
      fontSize={92}
      perWordF={6}
      enterF={14}
      exitAt={250}
      exitF={14}
    />
    <BottomGradient
      text={"That's the record."}
      startFrame={272}
      fontSize={172}
      revealF={26}
      sheenF={70}
      exitAt={330}
      exitF={16}
    />
  </>
);

export default Reframe;

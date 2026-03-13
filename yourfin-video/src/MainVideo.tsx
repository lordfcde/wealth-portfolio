import React from "react";
import { TransitionSeries, linearTiming } from "@remotion/transitions";
import { fade } from "@remotion/transitions/fade";
import { slide } from "@remotion/transitions/slide";
import { S1_HeroReveal } from "./scenes/S1_HeroReveal";
import { S2_NavbarHero } from "./scenes/S2_NavbarHero";
import { S3_ChatDemo } from "./scenes/S3_ChatDemo";
import { S4_Portfolio } from "./scenes/S4_Portfolio";
import { S5_IFY2026 } from "./scenes/S5_IFY2026";
import { S6_Outro } from "./scenes/S6_Outro";

export const MainVideo: React.FC = () => {
  return (
    <TransitionSeries>
      <TransitionSeries.Sequence durationInFrames={150}>
        <S1_HeroReveal />
      </TransitionSeries.Sequence>

      <TransitionSeries.Transition
        presentation={fade()}
        timing={linearTiming({ durationInFrames: 15 })}
      />

      <TransitionSeries.Sequence durationInFrames={215}>
        <S2_NavbarHero />
      </TransitionSeries.Sequence>

      <TransitionSeries.Transition
        presentation={slide({ direction: "from-bottom" })}
        timing={linearTiming({ durationInFrames: 15 })}
      />

      <TransitionSeries.Sequence durationInFrames={200}>
        <S3_ChatDemo />
      </TransitionSeries.Sequence>

      <TransitionSeries.Transition
        presentation={slide({ direction: "from-right" })}
        timing={linearTiming({ durationInFrames: 15 })}
      />

      <TransitionSeries.Sequence durationInFrames={190}>
        <S4_Portfolio />
      </TransitionSeries.Sequence>

      <TransitionSeries.Transition
        presentation={fade()}
        timing={linearTiming({ durationInFrames: 15 })}
      />

      <TransitionSeries.Sequence durationInFrames={110}>
        <S5_IFY2026 />
      </TransitionSeries.Sequence>

      <TransitionSeries.Transition
        presentation={fade()}
        timing={linearTiming({ durationInFrames: 15 })}
      />

      <TransitionSeries.Sequence durationInFrames={120}>
        <S6_Outro />
      </TransitionSeries.Sequence>
    </TransitionSeries>
  );
};

// Calculation of total duration:
// 150 + 215 + 200 + 190 + 110 + 120 = 985
// Overlaps: 5 transitions * 15 frames = 75
// 985 - 75 = 910 frames (~30 seconds)

import { Composition } from "remotion";
import { MainVideo } from "./MainVideo";

export const RemotionRoot: React.FC = () => {
  return (
    <>
      <Composition
        id="YourFinPromo"
        component={MainVideo}
        durationInFrames={910}
        fps={30}
        width={1920}
        height={1080}
      />
    </>
  );
};

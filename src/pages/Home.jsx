import { Suspense, useState } from "react";
import { Canvas } from "@react-three/fiber";
import Loader from "../compoments/Loader";
import Island from "../models/island";
import Sky from "../models/Sky";
import Bird from "../models/bird";
import Plane from "../models/Plane";
{
  /* <div className="absolute top-28 left-0 riht-0 z-10 flex items-start justify-center">
  POPUP
</div> */
}

function Home() {
  const [isRotating, setIsRotating] = useState(false);
  const [currentStage, setCurrentStage] = useState(1);
  const adjustIslandForScreenSize = () => {
    let screenScale = null;
    let screenPostion = [0, -6.5, -43];
    let islandRotation = [0.1, 4.7, 0];
    if (window.length < 768) {
      screenScale = [0.9, 0.9, 0.9];
    } else {
      screenScale = [1, 1, 1];
    }
    return [screenScale, screenPostion, islandRotation];
  };
  const adjustPlaneForScreenSize = () => {
    let screenScale, screenPostion;

    if (window.length < 768) {
      screenScale = [1.2, 1.2, 1.2];
      screenPostion = [0, 0, 0];
    } else {
      screenScale = [3, 3, 3];
      screenPostion = [0, -4, -4];
    }
    return [screenScale, screenPostion];
  };
  const [islandScale, islandPosition, islandRotation] =
    adjustIslandForScreenSize();
  const [planeScale, planePosition] = adjustPlaneForScreenSize();
  return (
    <div className="w-full h-screen relative">
      <Canvas
        className={`w-full h-screen bg-transparent ${
          isRotating ? "cursor-grabbing" : "cursor-grab"
        }`}
        camera={{ near: 0.1, far: 1000 }}
      >
        <Suspense fallback={<Loader />}>
          <directionalLight position={[1, 1, 1]} intensity={2} />
          <ambientLight intensity={0.5} />

          <hemisphereLight
            skycolor="#b1e1ff"
            groundColor="#000000"
            intensity={1}
          />

          <Bird isRotating={isRotating} />
          <Sky isRotating={isRotating} />
          <Island
            scale={islandScale}
            position={islandPosition}
            rotation={islandRotation}
            isRotating={isRotating}
            setIsRotating={setIsRotating}
            setCurrentStage={setCurrentStage}
          />
          <Plane
            isRotating={isRotating}
            position={planePosition}
            scale={planeScale}
            rotation={[0, 20, 0]}
          />
        </Suspense>
      </Canvas>
    </div>
  );
}

export default Home;

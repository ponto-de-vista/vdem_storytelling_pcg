import { type JSX, Suspense, useState } from 'react';

import { Canvas } from '@react-three/fiber';

import { SceneContent } from './SceneContent';
import { UI } from './UI';

// This component orchestrates the scene, managing state and combining the 3D canvas with the 2D UI.
export default function StorytellingCanvas(): JSX.Element {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPopupVisible, setPopupVisible] = useState(false);

  // State handlers are kept here, at the highest level
  const handleNext = () => {
    setPopupVisible(false);
    setActiveIndex(prev => (prev + 1) % 4); // 4 is the number of story points
  };

  const handlePrevious = () => {
    setPopupVisible(false);
    setActiveIndex(prev => (prev - 1 + 4) % 4);
  };

  return (
    <div className="fixed top-0 left-0 w-full h-full bg-gray-100">
      {/* 3D Canvas */}
      <Canvas shadows camera={{ position: [0, 5, 20], fov: 50 }}>
        <Suspense fallback={null}>
          <SceneContent
            activeIndex={activeIndex}
            setActiveIndex={setActiveIndex}
          />
        </Suspense>
      </Canvas>

      {/* UI component receives state and handlers as props */}
      <UI
        activeIndex={activeIndex}
        isPopupVisible={isPopupVisible}
        onNext={handleNext}
        onPrevious={handlePrevious}
        onExplore={() => setPopupVisible(true)}
        onClosePopup={() => setPopupVisible(false)}
      />
    </div>
  );
}

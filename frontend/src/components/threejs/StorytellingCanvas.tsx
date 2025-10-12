import { navigationStorytellingMachine } from '@/machines/navigationStorytellingMachine';

import { Suspense } from 'react';

import { Canvas } from '@react-three/fiber';
import { useMachine } from '@xstate/react';

import { SceneContent } from './SceneContent';
import { UI } from './UI';

export default function StorytellingCanvas() {
  const [state, send] = useMachine(navigationStorytellingMachine);

  const activeIndex = state.context.graphId;
  const isPopupVisible = state.value === 'SHOWING';

  const handleNext = () => {
    send({ type: 'event.next' });
  };

  const handlePrevious = () => {
    send({ type: 'event.prev' });
  };

  const handleJump = (id: number) => {
    send({ type: 'event.jump', id: id });
  };

  const handleViewGraph = () => {
    send({ type: 'event.view' });
  };

  const handleClosePopup = () => {
    send({ type: 'event.close' });
  };

  return (
    <div className="fixed top-0 left-0 w-full h-full bg-gray-100">
      <Canvas shadows camera={{ position: [0, 5, 20], fov: 50 }}>
        <Suspense fallback={null}>
          <SceneContent activeIndex={activeIndex} onJump={handleJump} />
        </Suspense>
      </Canvas>

      <UI
        activeIndex={activeIndex}
        isPopupVisible={isPopupVisible}
        onNext={handleNext}
        onPrevious={handlePrevious}
        onViewGraph={handleViewGraph}
        onClosePopup={handleClosePopup}
      />
    </div>
  );
}

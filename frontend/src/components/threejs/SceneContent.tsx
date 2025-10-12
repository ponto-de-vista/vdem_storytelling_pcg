import { A11y } from '@react-three/a11y';
import { Box, Plane, Text } from '@react-three/drei';

import AnimatedCamera from './AnimatedCamera';
import { storyPoints } from './data';

interface SceneContentProps {
  activeIndex: number;
  onJump: (id: number) => void;
}

export function SceneContent({
  activeIndex,
  onJump,
}: SceneContentProps) {
  return (
    <>
      <ambientLight intensity={0.5} />
      <directionalLight position={[10, 15, 5]} intensity={1.5} castShadow />
      <Plane args={[100, 100]} rotation-x={-Math.PI / 2} receiveShadow>
        <meshStandardMaterial color="#e2e8f0" />
      </Plane>

      {storyPoints.map((point, index) => (
        <A11y
          key={index}
          role="button"
          description={`Ir para o ponto da história ${index + 1}: ${point.title}`}
          actionCall={() => onJump(index)}
        >
          <group>
            <Box position={point.position} args={[2, 2, 2]} castShadow>
              <meshStandardMaterial
                color={index === activeIndex ? '#6366f1' : '#a5b4fc'}
              />
            </Box>
            <Text
              position={[
                point.position.x,
                point.position.y + 2,
                point.position.z,
              ]}
              fontSize={0.5}
              color="black"
              anchorX="center"
            >
              {point.title}
            </Text>
          </group>
        </A11y>
      ))}

      <AnimatedCamera targetIndex={activeIndex} />
    </>
  );
}

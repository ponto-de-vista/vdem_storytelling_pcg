import { A11y } from '@react-three/a11y';
import { Box, Plane, Text } from '@react-three/drei';

// Importar o componente de acessibilidade

import AnimatedCamera from './AnimatedCamera';
import { storyPoints } from './data';

// Definir as props que o componente aceita
interface SceneContentProps {
  activeIndex: number;
  setActiveIndex: (index: number) => void;
}

// Esta versão contém os wrappers de acessibilidade
export function SceneContent({
  activeIndex,
  setActiveIndex,
}: SceneContentProps) {
  return (
    <>
      <ambientLight intensity={0.5} />
      <directionalLight position={[10, 15, 5]} intensity={1.5} castShadow />
      <Plane args={[100, 100]} rotation-x={-Math.PI / 2} receiveShadow>
        <meshStandardMaterial color="#e2e8f0" />
      </Plane>

      {storyPoints.map((point, index) => (
        // Acessibilidade em ambiente 3D
        <A11y
          key={index}
          role="button"
          description={`Ir para o ponto da história ${index + 1}: ${point.title}`}
          actionCall={() => setActiveIndex(index)}
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

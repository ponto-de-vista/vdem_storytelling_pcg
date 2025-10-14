import { useRef } from 'react';

import { useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';

import { storyPoints } from './data';

export default function AnimatedCamera({
  targetIndex,
}: {
  targetIndex: number;
}) {
  const { camera } = useThree();
  const cameraLookAt = useRef(new THREE.Vector3());

  useFrame((_, delta) => {
    const targetPoint = storyPoints[targetIndex].position;

    const targetCameraPosition = new THREE.Vector3(
      targetPoint.x,
      targetPoint.y + 8,
      targetPoint.z + 12
    );

    camera.position.lerp(targetCameraPosition, 1.5 * delta);

    cameraLookAt.current.lerp(targetPoint, 1.5 * delta);
    camera.lookAt(cameraLookAt.current);
  });

  return null;
}

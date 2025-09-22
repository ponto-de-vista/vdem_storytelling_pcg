import { useRef } from 'react';

import { useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';

import { storyPoints } from './data';

// This component handles the camera animation logic
export default function AnimatedCamera({
  targetIndex,
}: {
  targetIndex: number;
}) {
  const { camera } = useThree();
  const cameraLookAt = useRef(new THREE.Vector3());

  useFrame((_, delta) => {
    // Get the position of the currently active cube
    const targetPoint = storyPoints[targetIndex].position;

    // FIX 1: Increase the height (Y-axis) and pull back the distance (Z-axis) for a more top-down view.
    // Before: y + 3, z + 8
    // After: y + 8, z + 12
    const targetCameraPosition = new THREE.Vector3(
      targetPoint.x,
      targetPoint.y + 8, // Increased height
      targetPoint.z + 12 // Increased distance
    );

    // FIX 2: Smoothly interpolate (lerp) the camera's current position towards the target position.
    // The `delta` value ensures the animation is smooth regardless of the user's frame rate.
    // The previous jump was caused by a conflicting useEffect; this is now the single source of truth for movement.
    camera.position.lerp(targetCameraPosition, 1.5 * delta);

    // Also interpolate where the camera is looking to prevent sudden snaps.
    cameraLookAt.current.lerp(targetPoint, 1.5 * delta);
    camera.lookAt(cameraLookAt.current);
  });

  return null; // This component doesn't render anything itself
}

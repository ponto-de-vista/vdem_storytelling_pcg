import StorytellingCanvas from '@/components/threejs/StorytellingCanvas';

import { A11yAnnouncer } from '@react-three/a11y';

function Storytelling() {
  return (
    <>
      <A11yAnnouncer />
      <StorytellingCanvas />
    </>
  );
}

export default Storytelling;

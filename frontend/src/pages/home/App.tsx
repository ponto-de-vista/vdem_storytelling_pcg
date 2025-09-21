import { Button } from '@/components/atoms/Button';
import { counterMachine } from '@/machines/counterMachine';

import { useMachine } from '@xstate/react';

import './App.css';
import viteLogo from '/vite.svg';

function App() {
  const [state, send] = useMachine(counterMachine);

  return (
    <>
      <div>
        <a href="https://vite.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <output>{state.context.count}</output>
        <Button onClick={() => send({ type: 'INCREMENT' })}>Count</Button>
        <p>
          Edit <code>src/App.tsx</code> and save to test HMRss
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </>
  );
}

export default App;

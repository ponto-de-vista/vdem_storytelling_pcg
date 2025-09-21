import { assign, createMachine } from 'xstate';

interface CounterContext {
  count: number;
}

type CounterEvent = {
  type: 'INCREMENT';
};

export const counterMachine = createMachine({
  /** @xstate-layout N4IgpgJg5mDOIC5QGMD2BXAdgFzAJwGIBJAOQGEAlAUQFkqSAVAbQAYBdRUAB1VgEtsfVJk4gAHogCMAJgB0LBYqVKA7ABoQATynSAvvo2ZUEOKLRZceUT36DhoiQmkBWWQBYWbgJxuAHF5VnSQA2YOdpDW0ESRlZF3CWL2dnAGZJZy99fSA */
  types: {} as {
    context: CounterContext;
    events: CounterEvent;
  },
  id: 'counter',
  context: { count: 0 },
  on: {
    INCREMENT: {
      actions: assign({ count: ({ context }) => context.count + 1 }),
    },
  },
});

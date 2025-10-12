import { assign, setup } from 'xstate';

export const navigationStorytellingMachine = setup({
    types: {
        context: {} as {
            graphId: number;
        },
        events: {} as 
            | { type: 'event.next' }
            | { type: 'event.prev' }
            | { type: 'event.view' }
            | { type: 'event.close' }
            | { type: 'event.jump'; id: number }
    }
})
.createMachine({
    initial: 'IDLE',
    context: { graphId: 0 },
    states: {
        IDLE: {
            on: {
                'event.next': {
                    actions: assign({ graphId: ({context}) => (context.graphId + 1) % 4 })
                },
                'event.prev': {
                    actions: assign({ graphId: ({context}) => (context.graphId - 1) % 4 })
                },
                'event.jump': {
                    actions: assign({ graphId: ({ event }) => event.id })
                },
                'event.view': {
                    target: 'SHOWING'
                },
            }
        },
        SHOWING: {
            on: {
                'event.close': {
                    target: 'IDLE'
                }
            }
        }
    }
});
// @flow
import emitter from 'event-emitter';

export type FitBoundsPayload = {} & $Shape<{}>;
export type ScrollToUserPayload = {} & $Shape<{}>;
export type ScrollToSpotPayload = {| index: number |};
export const fitBoundsBus: Bus<FitBoundsPayload> = makeBus();
export const scrollToSpotBus: Bus<ScrollToSpotPayload> = makeBus();
export const scrollToUsersBus: Bus<ScrollToUserPayload> = makeBus();

type Bus<Payload> = {
  subscribe: (handler: (payload: Payload) => any) => void,
  unsubscribe: (handler: (payload: Payload) => any) => void,
  emit: (payload: Payload) => void,
};
function makeBus<Payload> (): Bus<Payload> {
  const e = emitter();
  return {
    subscribe: function (handler: (payload: Payload) => any) {
      e.on('event', handler);
    },
    unsubscribe: function (handler: (payload: Payload) => any) {
      e.off('event', handler);
    },
    emit: function (payload: Payload) {
      e.emit('event', payload);
    },
  };
}


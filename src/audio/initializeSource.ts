import { EventEmitterType } from '../EventEmitter';
import { StateManagerType } from '../StateManager';

const initializeSource = (
  audioCtx: any,
  volume: number,
  emitter: EventEmitterType,
  states: StateManagerType
) => {
  const source = states.set('source', audioCtx.createBufferSource());
  const gainNode = states.set('gainNode', audioCtx.createGain());

  gainNode.gain.value = volume;
  gainNode.connect(audioCtx.destination);
  source.connect(gainNode);

  source.onended = () => {
    states.set('hasStarted', false);
    emitter.emit('end', { data: null });
  };
};

export default initializeSource;

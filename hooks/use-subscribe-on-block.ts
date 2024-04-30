import { useRef } from 'react';


type Unsubscribe = () => void;
type Callback = (blockNumber: number, unsubscribe: Unsubscribe) => void | Promise<void>;

export function useSubscribeOnBlock(): { subscribe: (callback: Callback) => Unsubscribe | void };
export function useSubscribeOnBlock(callback: Callback): { subscribe: () => Unsubscribe | void };
export function useSubscribeOnBlock(cb?: Callback) {
  const callbackRef = useRef<Callback>();

  const Unsubscribe = () => {
    if (!callbackRef.current) {
      return;
    }
  

    callbackRef.current = undefined;
  };

  const subscribe = (call?: Callback) => {
  
    if (call && cb) {
      throw new Error('Cannot pass callback to useSubscribeOnBlock twice');
    }

    const callback = call || cb;
    if (!callback) {
      throw new Error('Must pass callback to useSubscribeOnBlock');
    }

    if (callbackRef.current) {
      return;
    }

    callbackRef.current = async (level: number) => callback(level, Unsubscribe);

    return Unsubscribe;
  };

  return { subscribe };
}

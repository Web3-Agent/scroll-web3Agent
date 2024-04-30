import * as React from 'react';

import { OperationsContext } from './operations.context';
import { useOperationState } from './use-operation-state';
import { useActiveTabState } from './use-active-tab-state';

import { OperationDictionary } from '../../core/operations/operation';
import { OperationData } from '../../core/operations/operation.type';
import { useSendBatch } from '../../hooks/use-send-batch';
import { useSubscribeOperation } from '../../hooks/use-subscribe-operation';
import { PreOpStruct } from '../../types/custom';
import { CFC } from '../../types/react';
import { asyncReduce } from '../../utils/async-reducer';

const reducer = async (acc: Array<PreOpStruct>, operation: OperationData) => {
  const creator = OperationDictionary[operation.kind];

  // @ts-ignore
  const preOp = await creator(operation.data);

  return acc.concat(preOp);
};

const createBatchPreOp = async (operations: Array<OperationData>) =>
  await asyncReduce(operations, reducer, [] as Array<PreOpStruct>);

export const OperationsProvider: CFC = ({ children }) => {
  const { operations, addOperation, updateOperation, setOperations } = useOperationState();
  const { activeTabState, addActiveTabState, updateActiveTabState, setActiveTabState } = useActiveTabState()
  const { subscribe } = useSubscribeOperation();
  const { sendBatch } = useSendBatch({ log: true });

  const sendOperations = async () => {
    

    const batchPreOp = await createBatchPreOp(operations);

    await sendBatch(batchPreOp, {
      gasLimit: 2_000_000
    });

    subscribe();
  };

  return (
    <OperationsContext.Provider value={{ operations, updateOperation, addOperation, sendOperations, setOperations, activeTabState, addActiveTabState, updateActiveTabState, setActiveTabState }}>
      {children}
    </OperationsContext.Provider>
  );
};

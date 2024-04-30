import { createContext } from 'react';

import { OperationData } from '@/core/operations/operation.type';

interface OperationsContextProps<T = unknown> {
  operations: Array<T>;
  updateOperation: (index: number, operation: T) => void;
  addOperation: (operation: T) => void;
  sendOperations: () => Promise<void>;
  setOperations: (operations: Array<T>) => void;
  activeTabState: any;
  addActiveTabState: any;
  updateActiveTabState: any;
  setActiveTabState: any;
}

export const OperationsContext = createContext<OperationsContextProps<OperationData>>({
  operations: [],
  updateOperation: () => {
    return;
  },
  addOperation: () => {
    return;
  },
  sendOperations: async () => {
    return;
  },
  setOperations: () => {
    return;
  },
  activeTabState: {},
  addActiveTabState: () => {
    return;
  },
  updateActiveTabState: () => {
    return;
  },
  setActiveTabState: () => {
    return;
  },
});

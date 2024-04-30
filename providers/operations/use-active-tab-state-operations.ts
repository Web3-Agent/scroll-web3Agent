import { useContext } from 'react';

import { OperationsContext } from './operations.context';

export const useActiveTabStates = () => {
  const context = useContext(OperationsContext);

  if (context === undefined) {
    throw new Error('useActiveTabStates must be used within a OperationsProvider');
  }

  return context;
};

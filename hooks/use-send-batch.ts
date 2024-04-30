
import { TypeDataFreeTransactionDetails } from '../account-abstraction/batch-simple-account-api';
import { bundlerClient } from '../account-abstraction/bundler-client';
import { preOpToBatchOp } from '../core/helpers/pre-op-to-batch-op';
import { PreOpStruct } from '../types/custom';

interface Options {
  log?: boolean;
  overrides?: TypeDataFreeTransactionDetails;
}

export const useSendBatch = (params?: Options) => {

  const logIf = (...data: Parameters<typeof console.log>) => {
    if (params?.log) {
      console.log(...data);
    }
  };

  const sendBatch = async (batch: Array<PreOpStruct>, overrides?: TypeDataFreeTransactionDetails) => {

    const batchOp = preOpToBatchOp(batch);

    logIf({ batchOp });

 






    
  };

  return {
    sendBatch
  };
};

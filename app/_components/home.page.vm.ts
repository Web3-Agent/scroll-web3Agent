import { useState } from 'react';

// import { PROMT_API_URL } from '@/config/constants';
import { formatCandidate } from '../../core/operations/format-candidate';
import { OperationData } from '../../core/operations/operation.type';
// import { useAlert } from '@/providers/alert.provider';

const PROMT_API_URL = '/api/parse-defi-prompt'
export const useHomeViewModel = () => {
  const [promtMessage, setPromtMessage] = useState<string>('');
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  // const { callAlert } = useAlert();

  const sendPromt = async (_message: string, callback: (operations: Array<OperationData>) => void) => {
    try {
      console.log({ _message })
      if (!_message) {
        throw new Error('Message is empty');
      }
    

      setIsSubmitting(true);

      const response = await fetch(PROMT_API_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          prompt: _message.replace('%', 'percents')
        })
      });

      const candidate = await response.json();
      console.log({ candidate })
      // const candidate = [
      //   {
      //     action: 'CreatePortfolio',
      //     assets: [
      //       {
      //         token: 'WETH',
      //         amount: '0.001'
      //       }
      //     ],
      //     stopLoss: '-10',
      //     takeProfit: '10'
      //   }
      // ];
      const { actionJSON } = candidate
      console.log({ actionJSON })
      // const operations = formatCandidate(actionJSON, smartAccountAddress);
      // console.log("----> ", { operations })
      setIsSubmitting(false);

      // callback(operations);
    } catch (error) {
      console.log("ERROR=========================>>>>>>>>>>>>>>>>>>> ", error)
      // callAlert('Sorry, something went wrong. Please try other promt.', '', 0);
      setIsSubmitting(false);
    }
  };

  return {
    isSubmitting,
    sendPromt,
    promtMessage,
    setPromtMessage
  };
};

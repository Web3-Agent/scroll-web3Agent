import { Web3Provider } from '@ethersproject/providers';
import { useWeb3React } from '@web3-react/core';
import { useState, useEffect } from 'react';

export function useWeb3Authentication() {
  const { activate, active, deactivate, account, chainId } = useWeb3React<Web3Provider>();
  const [loading, setLoading] = useState(false);

  const connectToNetwork = async (networkId: number) => {
    try {
      setLoading(true);
      await activate(new Web3Provider(window.ethereum), undefined, true);
      await window.ethereum.request({
        method: 'wallet_switchEthereumChain',
        params: [{ chainId: `0x${networkId.toString(16)}` }],
      });
    } catch (error) {
      console.error('Error connecting to the network:', error);
    } finally {
      setLoading(false);
    }
  };

  const disconnect = () => {
    deactivate();
  };

  return {
    loading,
    isConnected: active && !!account && chainId !== null,
    connectToNetwork,
    disconnect,
  };
}

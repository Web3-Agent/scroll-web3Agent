import '@rainbow-me/rainbowkit/styles.css'
import merge from 'lodash.merge';
import {

  RainbowKitProvider,
  darkTheme,
  Theme,
  getDefaultWallets,
  lightTheme
} from '@rainbow-me/rainbowkit';
// import { getDefaultWallets, RainbowKitProvider, Theme } from '@rainbow-me/rainbowkit'
// import { goerli,polygon, polygonZkEvmTestnet, polygonMumbai, klaytn, baseGoerli, lineaTestnet } from '@wagmi/chains'
import { createPublicClient, http } from 'viem'

import { configureChains, createConfig, WagmiConfig } from 'wagmi'
import { publicProvider } from 'wagmi/providers/public'
import { ReactNode } from 'react'
import { infuraProvider } from 'wagmi/providers/infura'
import React from 'react'
import { Chain } from '@rainbow-me/rainbowkit';

import { alchemyProvider } from 'wagmi/providers/alchemy';
import { config } from '../middleware';
import { scroll, scrollSepolia } from 'viem/chains';


const myTheme = merge(lightTheme(), {
  colors: {
    accentColor: '#0E7D02',

  },

} as Theme);

interface Props {
  children: ReactNode
}

const pego: Chain = {
  id: 20201022,
  name: 'PEGO Mainnet',
  network: 'PEGO Mainnet',
  iconUrl: 'https://miro.medium.com/v2/resize:fill:99:99/1*fDYlU8GkCbt694t7UgRQ7Q.png',
  iconBackground: '#fff',
  nativeCurrency: {
    decimals: 18,
    name: 'pegomainnet',
    symbol: 'PG',
  },
  rpcUrls: {
    public: { http: ['https://pegorpc.com'] },
    default: { http: ['https://pegorpc.com'] },
  },
  blockExplorers: {
    default: { name: 'Explorer', url: ' https://scan.pego.network' },

  }
};

const INEVM: Chain = {
  id: 1738,
  name: 'INEVM',
  network: 'INEVM',
  iconUrl: 'https://docs.injective.network//img/injective.svg',
  iconBackground: '#fff',
  nativeCurrency: {
    decimals: 18,
    name: 'INEVM',
    symbol: 'INJ',
  },
  rpcUrls: {
    public: { http: ['https://inevm-rpc.caldera.dev'] },
    default: { http: ['https://inevm-rpc.caldera.dev'] },
  },
  blockExplorers: {
    default: { name: 'Explorer', url: 'https://inevm.calderaexplorer.xyz/' },

  }
};

const { chains, publicClient } = configureChains(
  [scrollSepolia, scroll],
  [
    infuraProvider({ apiKey: process.env.INFURA_API_KEY }),
    publicProvider()
  ]
);

const { connectors } = getDefaultWallets({
  appName: 'Web3 Agent',
  projectId: '234235sd',
  chains
});

const wagmiConfig = createConfig({
  autoConnect: true,
  connectors,
  publicClient
})
export function Web3Provider(props: Props) {
  return (
    <WagmiConfig config={wagmiConfig}>
      <RainbowKitProvider modalSize="compact" theme={lightTheme({

        borderRadius: 'medium',
        accentColor: '#388E3C',
        fontStack: 'rounded',


      })} coolMode chains={chains}>
        {props.children}
      </RainbowKitProvider>
    </WagmiConfig>
  )
}
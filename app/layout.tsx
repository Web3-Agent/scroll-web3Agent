"use client"
import * as React from 'react';
import "./index.css";

import './globals.css'
import "./App.css";

import { Inter } from 'next/font/google'
import AuthProvider from '@/context/AuthProvider'
// import { Providers } from '../app/components/providers'
import { Providers } from './_components/providers';
import { OperationsProvider } from '../providers/operations';




import { Web3Provider } from "../auth/Web3";
import SideToggle from '@/app/_components/sidetoggle';
import { TablelandProvider } from '@/context/TablelandProvider';
import { Header } from './_components/header';
import Navbar from './_components/Navbar';
import { MetaMaskProvider } from '@metamask/sdk-react';
import { GoldRushProvider } from '@covalenthq/goldrush-kit';

// const arbitrumSepolia = ({
//   id: 421614,
//   name: 'Arbitrum Sepolia Testnet',
//   network: 'arbitrum-sepolia',
//   nativeCurrency: { name: 'Ether', symbol: 'ETH', decimals: 18 },
//   rpcUrls: {
//     default: {
//       http: ['https://arbitrum-sepolia.blockpi.network/v1/rpc/public'],

//     },
//     public: {
//       http: ['https://arbitrum-sepolia.blockpi.network/v1/rpc/public'],

//     },
//   },
//   blockExplorers: {
//     default: {
//       name: 'Blockscout',
//       url: 'https://sepolia-explorer.arbitrum.io',
//     },
//   },
//   testnet: true,
// } )







const inter = Inter({ subsets: ['latin'] })

export default function RootLayout({

  children,
}: {
  children: React.ReactNode
}) {


  return (
    <html lang="en">
      <body className={ inter.className }>
                 <GoldRushProvider apikey={process.env.NEXT_PUBLIC_COVALENT_KEY} mode="light" color="emerald">

        <Web3Provider>
        <Providers attribute="class" defaultTheme="system" enableSystem>
          {/* <WagmiConfig client={ wagmiClient }> */}

          
              <AuthProvider>
                <TablelandProvider>
                  <OperationsProvider>
                    {/* <Navbar /> */}
                    {/* <Header /> */}
                    {/* <Profile /> */}



                    <div className='' style={{ display: "flex", height: "screen", width: "auto" }}>
                      <div className='' >
                        <SideToggle />
                        
                      </div>
                      <div className="flex-1 p-7 ml-64"

                      >
                       
                        <Header />

                       
                        <div
                          style={{ display: "flex", flexDirection: "row", justifyContent: "center" }}
                        // className=' flex justify-center items-start p-6 min-h-screen'
                        // className='w-full'
                        >
                          {children}
                        </div>
                      </div>
                    </div>


                  </OperationsProvider>
                </TablelandProvider>
              </AuthProvider>
          

          </Providers>
          </Web3Provider>
           </GoldRushProvider>
      </body>
    </html>
  )
}
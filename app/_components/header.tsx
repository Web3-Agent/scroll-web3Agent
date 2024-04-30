'use client'
/* eslint-disable @typescript-eslint/no-use-before-define */
/* eslint-disable no-console */
/* eslint-disable @typescript-eslint/no-shadow */

// import { CHAIN_NAMESPACES, IProvider } from "@web3auth/base";
// import { MetamaskAdapter } from "@web3auth/metamask-adapter";
// import { Web3Auth } from "@web3auth/modal";
// import { TorusWalletAdapter } from "@web3auth/torus-evm-adapter";
// import RPC from ".api/ethersRPC"; // for using ethers.js
// Plugins
// import { TorusWalletConnectorPlugin } from "@web3auth/torus-wallet-connector-plugin";
// Adapters

// import { WalletConnectV1Adapter } from "@web3auth/wallet-connect-v1-adapter";
// import {
//   WalletConnectV2Adapter,
//   getWalletConnectV2Settings,
// } from "@web3auth/wallet-connect-v2-adapter";
import { useEffect, useState } from "react";

import RPC from "./web3RPC"; // for using web3.js


const clientId = "BEglQSgt4cUWcj6SKRdu5QkOXTsePmMcusG5EAoyjyOYKlVRjIF1iCNnMOTfpzCiunHRrMui8TIwQPXdkQ8Yxuk"; // get from https://dashboard.web3auth.io


import * as React from 'react'
import Link from 'next/link'

import { cn } from '@/app/lib/utils'
// import { auth } from '@/auth'
// import { options } from "../api/auth/[...nextauth]/options"
// import { getServerSession } from "next-auth/next"
import { clearChats } from '@/app/actions'
import { buttonVariants } from '@/app/_components/ui/button'
import { Sidebar } from '@/app/_components/sidebar'
import { SidebarList } from '@/app/_components/sidebar-list'
import {
  IconGitHub,
  IconNextChat,
  IconSeparator
} from '@/app/_components/ui/icons'
import { SidebarFooter } from '@/app/_components/sidebar-footer'
import { ThemeToggle } from '@/app/_components/theme-toggle'
import { ClearHistory } from '@/app/_components/clear-history'
import { NetworkSwitcher } from "./switchNetwork";
import { useAccount, useConnect, useDisconnect } from "wagmi";
import { FC } from 'react';
import { CFC } from '../../types/react';
import { ContentCopy, LinkOff, SmartToy, Wallet } from '@mui/icons-material';
import {
  Avatar,
  Box,
  Button,
  IconButton,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Typography,
  styled
} from '@mui/material';
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { ethers } from 'ethers';
import { useActiveTabStates } from "../../providers/operations";





const AddressTile: CFC<{ address?: string; label: string; }> = ({
  address,
  label,
  children
}) => {


  return (
    <Box
      sx={{
        display: 'grid',
        gridTemplateColumns: 'auto 1fr auto',
        gridTemplateRows: 'auto auto',
        columnGap: 1,
        flex: 1
      }}
    >
      <Typography
        sx={{
          gridColumn: '1 / 3',
          gridRow: '1 / 2'
        }}
        variant="caption"
        color="text.secondary"
      >
        {label}
      </Typography>

      <Box
        sx={{
          gridColumn: '1 / 2',
          gridRow: '2 / 3',
          alignSelf: 'center'
        }}
      >

      </Box>

      <Typography
        sx={{
          gridColumn: '2 / 3',
          gridRow: '2 / 3'
        }}
        variant="body1"
      >
        Address : {(address)}
      </Typography>

      <Box
        sx={{
          gridColumn: '3 / 4',
          gridRow: '1 / 3',
          display: 'grid',
          placeItems: 'center'
        }}
      >
        {children}
      </Box>
    </Box>
  );
};

const SmartAccountTile = () => {

  return (
    <>
      {/* <AddressTile label="Smart Account" address={smartAccountAddress}>
        <IconButton color="error" size="small" onClick={() => copy(smartAccountAddress)}>
          <ContentCopy
            sx={{
              color: 'primary.main'
            }}
          />
        </IconButton>
      </AddressTile> */}

    </>

  );
};


export function Header() {
  const { address, connector, isConnected } = useAccount();


  const handleSignMessage = async () => {
    if (window.ethereum) {
      try {
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const signer = provider.getSigner();
        const message = 'Your message to sign'; // Replace with the actual message
        const signature = await signer.signMessage(message);
        console.log('Signature:', signature);
        // Handle the signature as needed, e.g., send it to the server for verification
      } catch (error) {
        console.error('Error signing message:', error);
      }
    } else {
      console.error('Please install MetaMask or another Ethereum wallet extension.');
    }
  };
  const [currentTab, setCurrentTab] = useState('/');
  const { activeTabState, addActiveTabState, updateActiveTabState, setActiveTabState } = useActiveTabStates();

  useEffect(() => {
    setCurrentTab(window.location.pathname);
  }, []);

  const Menus = [
    // { title: "Home", src: "https://i.imgur.com/QMNAWX7.png", gap: true, slug: "/home", tab: "home" },
    { title: "Home", src: "https://i.imgur.com/QMNAWX7.png", gap: true, slug: "/", tab: "askWeb3Agent" },
    // { title: "Light Link GPT", src: "https://i.imgur.com/2pHVHza.png", slug: "https://chat.openai.com/g/g-hWwGhCYsT-light-link-gpt", tab: "askWeb3Agent", type: 'link' },
    { title: "Send Transaction", src: "https://i.imgur.com/XjBwspt.png", slug: "/", tab: "sendTxn" },
    { title: "Deploy Contracts", src: "https://i.imgur.com/VT7UdPH.png", slug: "/", tab: "deployContract" },
    //  { title: "Defi", src: "https://i.imgur.com/IYxIvAB.png", slug: "/defi-prompt" },
    { title: "Builder", src: "https://i.imgur.com/IYxIvAB.png", slug: "/builder" },
  ];

  return (

    <><header className="!sticky top-6 z-10 flex h-16 w-full  border-2 rounded-2xl shrink-0 items-center justify-between bg-gradient-to-b from-background/10 via-background/50 to-background/80 px-8 backdrop-blur-xl">
      <div className="flex items-center gap-4">
        {isConnected ? (
          <>
            {Menus.map((Menu, index) => (
              <Link target={Menu?.type === 'link' ? "_blank" : ''} onClick={() => {
                Menu?.type !== 'link' &&
                  setActiveTabState({ activeTab: Menu?.tab })
              }} href={Menu?.slug} className='!text-gray-600 font-semibold'>

                <li

                  key={index}
                  className={`flex  rounded-md p-2 pl-3 pr-5 cursor-pointer hover:shadow-2xl hover:border-2 hover:pl-3 hover:pr-5 w-full !text-gray-700  text-sm font-semibold items-center gap-x-2 
                ${Menu.gap ? "mt-1" : "mt-1"} ${index === 0 && "bg-light-white"}
                  
                   ${currentTab === Menu?.tab ? 'shadow-2xl border-2 pl-3 pr-5' : ''}
                  `}
                  onClick={() => setCurrentTab(Menu?.tab)}

                // ${router.asPath === Menu?.slug ? 'bg-gray-200' : ''}
                >
                  <img height={"20px"} width={"20px"} src={Menu.src} />


                  <span className={`${!open && "hidden"} origin-left duration-200`}>
                    {Menu.title}
                  </span>
                </li>
              </Link>

            ))}
          </>
        ) : (
          <></>
        )}
      </div>

      <div className="flex items-center justify-end ">
        <div className="flex items-center text-sm">

          <ConnectButton></ConnectButton>




        </div>
      </div>

    </header>


    </>

  )
}
'use client'
import { UseChatHelpers } from 'ai/react'

import { Button } from '@/app/_components/ui/button'
import { IconArrowRight, IconArrowElbow } from '@/app/_components/ui/icons'
import { IconCheck, IconEdit } from './ui/icons'
import { useActiveTabStates } from '../../providers/operations';
import React from 'react';
import { TokenTransfersListView , AddressActivityListView, TokenBalancesListView } from "@covalenthq/goldrush-kit";


const exampleMessages = [
  {
    heading: 'ERC20 Wizard',
    message: `Help me write an ERC20 token smart contract.`
  },
  {
    heading: 'ERC721 Wizard',
    message: 'Help me write an ERC721 NFT smart contract.'
  },
  {
    heading: 'Multisig Wizard',
    message: `Help me write a multisig wallet.`
  }
]
const exampleMessagesForDeployContract = [
  {
    heading: 'Create Contract',
    message: `Write a simple contract that stores a value.`
  },
  {
    heading: 'Deploy Contract',
    message: 'Deploy this contract on Klaytn Testnet.'
  },
]

const exampleMessagesForTxn = [
  {
    heading: 'Send Token',
    message: `Send __AMOUNT__ amount to account __ACCOUNT__`
  },
  {
    heading: 'Show My Portfolio',
    message: 'Show my portfolio details with the total for address __WALLET_ADDRESS__ in table format.'
  },
  {
    heading: 'Show My Tokens',
    message: `Show my tokens details with the total for address __WALLET_ADDRESS__ in table format.`
  }
]

export function EmptyScreen({ setInput }: Pick<UseChatHelpers, 'setInput'>) {
  const { activeTabState, addActiveTabState, updateActiveTabState, setActiveTabState } = useActiveTabStates();

  const WebAgentEmptyScreen = () => {
    return (
      <div className="mx-auto w-full px-4">
        <div className="rounded-lg border bg-background p-8 shadow-md">
          <h1 className=" text-emerald-700 text-center text-3xl font-black">
            Your Web3 Agent 
          </h1>


          <p className="leading-normal mt-2 text-lg text-muted-foreground text-center">
            Unlock the power of web3, Type a prompt to get started
          </p>
          <div
            style={{
              display: 'flex',
              justifyContent: 'center',
              marginTop: '40px'
            }}
          >
            {exampleMessages.map((message, index) => (
              <Button
                variant="destructive"
                key={index}
                onClick={() => setInput(message.message)}
                style={{ margin: '7px', marginTop: '-7px', height: '50px' }}
              >
                <IconEdit className="mr-2" />
                {message.heading}
              </Button>
            ))}
          </div>
        </div>
      </div>
    )
  }
  const SendTXNScreen = () => {
    return (
      <div className="mx-auto w-full px-4">
        <div className="rounded-lg border bg-background p-8 shadow-md">
          <h1 className=" text-emerald-700 text-center text-3xl font-black">
            Transfer Tokens from Prompt using AI
          </h1>


          <p className="leading-normal mt-2 text-lg text-muted-foreground text-center">
            Unlock the power of web3, and AI. Click on + Iocn in prompt to explore more.
          </p>
          <div
            style={{
              display: 'flex',
              justifyContent: 'center',
              marginTop: '40px'
            }}
          >
            {exampleMessagesForTxn.map((message, index) => (
              <Button
                variant="destructive"
                key={index}
                // className="bg-red-00"
                onClick={() => setInput(message.message)}
                style={{ margin: '7px', marginTop: '-7px', height: '50px', width: '200px' }}
              >
                <IconEdit className="mr-2" />
                {message.heading}
              </Button>
            ))}
          </div>
        </div>
      </div>
    )
  }
  const HomeEmptyScreen = () => {
    return (
      <div className="mx-auto w-full px-4">
        <div className="rounded-lg border bg-background p-8 shadow-md">
          <h1 className=" text-emerald-700 text-center text-3xl font-black">
            Unleashing the Power of AI
          </h1>
          <h3 className="leading-normal my-2 text-lg text-muted-foreground text-center">
            Transforming Possibilities, Igniting Innovation
          </h3>

          <p className="leading-normal my-2 px-12 text-lg text-muted-foreground text-center">
            Step into the future with the incredible capabilities of Artificial Intelligence. Experience a new era where mundane tasks are automated, and complex problems find elegant solutions. Harness the power of AI to elevate your projects, streamline processes, and unlock opportunities like never before. The possibilities are boundless—now is the time to integrate AI into your endeavors and witness the extraordinary transformation it brings. Embrace the future, now at your fingertips.
          </p>
          

        </div>
      </div>
    )
  }
  const DeployEmptyScreen = () => {
    return (
      <div className="mx-auto w-full px-4">
        <div className="rounded-lg border bg-background p-8 shadow-md">
          <h1 className=" text-emerald-700 text-center text-3xl font-black">
            Deploy Contract from Prompt using AI
          </h1>


          <p className="leading-normal mt-2 text-lg text-muted-foreground text-center">
            Unlock the power of web3, and AI. Click on + Iocn in prompt to explore more.
          </p>
          <div
            style={{
              display: 'flex',
              justifyContent: 'center',
              marginTop: '40px'
            }}
          >
            {exampleMessagesForDeployContract.map((message, index) => (
              <Button
                variant="destructive"
                key={index}
                // className="bg-red-00"
                onClick={() => setInput(message.message)}
                style={{ margin: '7px', marginTop: '-7px', height: '50px', width: '200px' }}
              >
                <IconEdit className="mr-2" />
                {message.heading}
              </Button>
            ))}
          </div>
        </div>
      </div>
    )
  }
  console.log({ activeTabState })
  if (!Object.keys(activeTabState).length) {
    return <HomeEmptyScreen />
  }
  return (
    <>

      {activeTabState?.activeTab === "askWeb3Agent" && (<WebAgentEmptyScreen />)}
      {activeTabState?.activeTab === "sendTxn" && (<SendTXNScreen />)}
      {activeTabState?.activeTab === "deployContract" && (<DeployEmptyScreen />)}
    </>
  )
}

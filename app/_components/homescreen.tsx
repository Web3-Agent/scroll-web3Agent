import React from 'react'
import { UseChatHelpers } from 'ai/react'

import { Button } from '@/app/_components/ui/button'
import { IconArrowRight, IconArrowElbow } from '@/app/_components/ui/icons'
import { IconCheck, IconEdit } from './ui/icons'
import { ArrowRight } from '@mui/icons-material'
import { useTableland } from '@/context/TablelandProvider'
import Link from 'next/link'
import { useActiveTabStates } from '../../providers/operations';


const exampleMessages = [
  {
    heading: 'Home',
    message: `Explore the web3 ecosystem and find the resources that you need.`,
    imgurl: 'https://i.imgur.com/2pHVHza.png',
    slug: '/',
    tab: "askWeb3Agent"
  },
  {
    heading: 'Send Transaction',
    message: 'Send token to different address.',
    imgurl: 'https://i.imgur.com/XjBwspt.png',
    slug: '/',
    tab: "sendTxn"

  },
  {
    heading: 'Deploy Contracts',
    message: `Create your first smart contract via prompting.`,
    imgurl: 'https://i.imgur.com/VT7UdPH.png',
    slug: '/',
    tab: "deployContract"

  }
]

export function Homescreen() {
  const { readTable, writeTable } = useTableland()
  const { activeTabState, addActiveTabState, updateActiveTabState, setActiveTabState } = useActiveTabStates();

  return (
    <div style={{ display: "flex", flexDirection: "column", justifyContent: "center", marginTop: "4rem" }} className="w-full px-4 h-full">
      <div className="rounded-lg border bg-background p-10 shadow-md">
        <h1 className="text-emerald-700 text-center text-4xl font-black">
          Unlock the power of web3
        </h1>
        {/* <Button onClick={() => {
          console.log('HI');
          readTable("NIKHIL IS DOING WHAT HE CAN");
        }}>READ</Button>
        <Button onClick={() => {
          console.log('HI');
          writeTable({ action: "TEST_ACTION", object: { timestamp: Date.now(), body: { code: 12 } } });
        }}>WRITE</Button> */}
        <p className="leading-normal mt-2 text-lg text-muted-foreground text-center">
          Search information, execute transactions, and much more by chatting with Web3 Agent.
        </p>
        {/* <p className="mb-2 text-center leading-normal text-muted-foreground">
          I am a smart contract development assistant. I can help you write, and
          interact with smart contracts on any compatible blockchain. I also can
          <b> Deploy</b> the smart contract as well.
        </p> */}
        <div
          style={{
            display: 'flex',
            flexDirection: "column",
            justifyContent: 'center',
            marginBottom: "40px"

          }}
        >
          {exampleMessages.map((message, index) => (

            < Link onClick={() => { setActiveTabState({ activeTab: message?.tab }) }} href={message?.slug} className='text-gray-600 w-full font-semibold'>
              <button

                key={index}
                // onClick={() => setInput(message.message)}
                style={{ margin: '7px', marginTop: '30px', height: '50px', textAlign: "left", width: "100%", paddingLeft: "8%", paddingRight: "8%" }}

              >
                <div style={{ display: "flex", flexDirection: "row", alignItems: "center", backgroundColor: "#F3F4F6", borderRadius: "10px", padding: "10px", boxShadow: "initial", borderStyle: "solid", border: "3px", borderColor: "black", justifyContent: "space-between" }} >
                  <div style={{ display: "flex", flexDirection: "row", alignItems: "center" }}>
                    <div style={{ display: "flex", flexDirection: "row", marginLeft: "4px", marginRight: "10px", backgroundColor: "white", borderRadius: "10px", padding: "5px" }}>
                      <img height={"40px"} width={"40px"} src={message.imgurl} alt="" />
                    </div>
                    <div style={{ display: "flex", flexDirection: "column" }}>

                      <span className="text-gray-600  text-md font-semibold">{message.heading}</span>
                      <span className=" text-sm text-gray-600 " > {message.message}</span>
                    </div>

                  </div>
                  <div  >

                    <ArrowRight></ArrowRight>
                  </div>
                </div>

              </button>
            </Link>
          ))}
        </div>
      </div>
    </div >
  )
}

// import React from "react";
// import { useState } from "react";
import React, { useState, useEffect } from 'react';

import { ConnectButton } from "@rainbow-me/rainbowkit";
import { CopyAll, CopyAllRounded, CopyAllSharp, LockClockOutlined, LockClockRounded, Login, LoginRounded, Power, PowerOff, Search, SearchOffOutlined } from "@mui/icons-material";
import Link from 'next/link'
import { useRouter } from 'next/router';
import { VscDebugDisconnect } from 'react-icons/vsc'
import { Button } from '../_components/ui/button'


import { useActiveTabStates } from '../../providers/operations';
import TokenBalancesComponent from './TokenBalancesComponent';
// import { useSDK } from '@metamask/sdk-react';




// const connect: ConnectModalOptions = {
//   iDontHaveAWalletLink:
//     "https://chrome.google.com/webstore/detail/universal-profiles/abpickdkkbnbcoepogfhkhennhfhehfn?hl=en",
//   removeWhereIsMyWalletWarning: true,
// };

// const onboard = Onboard({
//   wallets,
//   chains,
//   appMetadata,
//   connect,
// });

// const connectedWallets = await onboard.connectWallet();
// console.log( connectedWallets );












const SideToggle = () => {
  const [open, setOpen] = useState(true);


  const [account, setAccount] = useState<string>();
  // const { sdk, connected, connecting, provider, chainId } = useSDK();

  // const connect = async () => {
  //   try {
  //     const accounts = await sdk?.connect();
  //     setAccount(accounts?.[0]);
  //   } catch(err) {
  //     console.warn(`failed to connect..`, err);
  //   }
  // };

  return (
    <div className="flex font-medium">
      <div
        style={{ borderTopRightRadius: "25px", borderBottomRightRadius: "25px", boxShadow: "2px 0 5px -2px #888" }}
        className={` ${open ? "w-[17rem]" : "w-20 "}
         bg-gray-100 h-screen p-5  pt-8 duration-300 rounded-tr-md rounded-br-md fixed`}
      >

        <div className="flex gap-x-4 items-cente mt-6">
          <img
            src="https://i.imgur.com/VfXLfud.png"
            className={` w-40 mt-[-5px] h-9 cursor-pointer duration-500 ${open && "rotate-[360deg]"
              }`}
          />
          {/* <h1
            className={` origin-left font-bold text-xl duration-300 ${!open && "scale-0"
              }`}
          >
            Web3 Agent
          </h1> */}
        </div>
        <TokenBalancesComponent></TokenBalancesComponent>

        {/* <div className='mt-28 text-sm text-left' >
           

           {connected ? (<>
            <Button className='text-base text-left' onClick={ connect }>
               {account && `Connected... ${account?.slice(-6)}`}
              </Button>

            </>) : (<>


              <Button className='text-base text-left'  onClick={connect}>
                Connect With Metamask
              </Button>


            </>)}
        </div> */}

      </div>

    </div>
  );
};
export default SideToggle;

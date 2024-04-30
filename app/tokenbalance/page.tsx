
"use client"; // This is a client component 👈🏽

import React from 'react';
import { useAccount, useConnect, useDisconnect,  } from 'wagmi';
import Pleaseconnect from '@/app/_components/pleaseconnect';
import { AddressActivityListView, TokenBalancesListView } from '@covalenthq/goldrush-kit';


export default function Page() {

    const { address, connector, isConnected } = useAccount();


    return (
        <>
            {isConnected ? (<>
                <div className="bg-gradient-to-b w-full mt-2">
                    <div  style={{ display: "flex", justifyContent: "center" }}>
                        <div className="w-full border-t bg-background px-4 py-2 shadow-lg sm:rounded-xl sm:border md:py-4">
                           {/* <TokenBalancesListView
        
                                chain_names={[
                                    
                                    "avalanche-testnet",
                                    
                                ]} // list of chains
                                address="0x20613aBe93e4611Cf547b4395E4248c6129c8697" //sample address
                                    /> */}
        <TokenBalancesListView
        
                chain_names={[
                
            
                "goerli",
                "avalanche-testnet",
                
            ]} // list of chains
            address={address} //sample address
        />
                        </div>
                    </div>
                </div>

            </>) : (<>


                <Pleaseconnect></Pleaseconnect>


            </>)}


        </>
    );
}

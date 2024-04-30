
"use client"; // This is a client component 👈🏽

import React from "react";
import { Homescreen } from "@/app/_components/homescreen";

import TabsRequest from '@/app/_components/ui/tabs-request'; // Import the Tabs component without curly braces
import { DefiPromptForm } from '@/app/_components/defi-prompt-form';
import { useAccount, useConnect, useDisconnect } from 'wagmi';
import Pleaseconnect from '@/app/_components/pleaseconnect';


export default function Page() {

    const { address, connector, isConnected } = useAccount();


    return (
        <>
            {isConnected ? (<>
                <Homescreen></Homescreen>

            </>) : (<>


                <Pleaseconnect></Pleaseconnect>


            </>)}


        </>
    );
}

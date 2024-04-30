
"use client"; // This is a client component 👈🏽

import React from 'react';
import TabsRequest from '@/app/_components/ui/tabs-request'; // Import the Tabs component without curly braces
import { DefiPromptForm } from '@/app/_components/defi-prompt-form';
import { useAccount, useConnect, useDisconnect } from 'wagmi';
import Pleaseconnect from '@/app/_components/pleaseconnect';


export default function Page() {

    const { address, connector, isConnected } = useAccount();


    return (
        <>
            {isConnected ? (<>
                <div className="fixed inset-x-0 bottom-1 bg-gradient-to-b from-muted/10 from-10% to-muted/30 to-50%">
                    <div className='ml-64' style={{ display: "flex", justifyContent: "center" }}>
                        <div style={{ width: "90%" }} className="space-y-4 border-t bg-background px-4 py-2 shadow-lg sm:rounded-xl sm:border md:py-4">
                            <DefiPromptForm
                                onSubmit={async value => {
                                    await append({

                                        content: value,
                                        role: 'user'
                                    },
                                        { functions: functionSchemas })
                                }}

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

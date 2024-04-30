"use client"
// import React from 'react'
/* eslint-disable react-refresh/only-export-components */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { createContext, useContext, useState, useEffect, useMemo } from "react";
// import { removeLocalStorage, setLocalStorage } from "@utils/manageLocalStorage";
import { Database } from "@tableland/sdk";
import { Wallet, getDefaultProvider } from "ethers"
// import Swiimport { configs } from "@/configs";tch from '@/app/_components/Switch';
import { configs } from "@/configs";
import { useNetwork, useAccount } from 'wagmi';
import axios from 'axios';
import axiosHelper from '../app/api-helpers/axios/axiosHelper';
import React from 'react';
// import { getRPCURL } from "../app/manage-history/page";
const VALID_CHAIN_ID = [80001, 5, 314159]
const CHAIN_MAPPING = {
    '80001': `https://polygon-mumbai.g.alchemy.com/v2/${configs.NEXT_PUBLIC_ALCHEMY_KEY}`,
    '5': `https://goerli.infura.io/v3/${configs.NEXT_PUBLIC_INFURA_API_KEY}`,
    '314159': 'https://api.calibration.node.glif.io/rpc/v1'
}
const getRPCURL = (chainId: number) => {
    return CHAIN_MAPPING[chainId] ?? ''
}

type TablelandContextType = {
    readTable: () => void;
    writeTable: (args: any) => void;
    userHistory: any;
    setUserHistory: (args: any) => void;
    isLoading: boolean;
    setIsLoading: (args: any) => void;
};

const TablelandContext = createContext<TablelandContextType | null>(null);

export const TablelandProvider = ({ children }: any) => {
    const { chain, chains } = useNetwork();
    const { address, isConnecting, isDisconnected } = useAccount();
    const [userHistory, setUserHistory] = useState<any>({ isTableAvailable: true, isTableCreated: false, history: [] })
    const [isLoading, setIsLoading] = useState(false)
    const checkTableExists = async () => {
        try {
            const { data: { data } } = await axiosHelper(`/api/tableland?address=${address}&chain=${chain?.id}`)
            console.log(data)
            if (!data) {
                setUserHistory({
                    isTableAvailable: false
                });
                return
            }
            setUserHistory({
                isTableAvailable: true,
                ...data
            })
        } catch (error) {
            console.log("ERERE", error)
        }
    }
    useEffect(() => {
        console.log("TABLELAND: ", { chain, chains, address })
        if (address && chain?.id)
            checkTableExists()
    }, [])
    const writeTable = async (payload: any) => {
        try {
            setIsLoading(true);
            if (!userHistory?.table) {
                console.log("NO_TABLE_EXISTS")
                return
            }
            let { action, object } = payload
            if (!action || !object) {
                console.log("SEND_CORRECT_PAYLOAD")
                return
            }
            action = action.toUpperCase();
            object = JSON.stringify(object)
            console.log({ configs, action, object })
            const privateKey = configs.NEXT_PUBLIC_DEPLOYER_PRIVATE_KEY //"your_private_key";
            if (!privateKey) {
                console.log("NO_KEY_FOUND")
                return
            }
            const wallet = new Wallet(privateKey);
            // To avoid connecting to the browser wallet (locally, port 8545).
            // For example: "https://polygon-mumbai.g.alchemy.com/v2/aVMC4jrgIA9JbSD4Q2Ub6vIWIzXyaR-H"
            const provider = getDefaultProvider(getRPCURL(chain?.id));
            console.log({ provider })
            const signer = wallet.connect(provider);
            console.log({ signer })

            // Connect to the database
            const db = new Database({ signer });
            console.log({ db })
            // Insert a row into the table
            const { meta: insert } = await db
                .prepare(`INSERT INTO ${userHistory?.table} (action, object) VALUES (?,?);`)
                .bind(action, object)
                .run();
            console.log({ insert })
            // Wait for transaction finality
            await insert.txn?.wait();
        } catch (error) {
            console.log("WRITE TABLE ERROR: ", error)
        } finally {
            setIsLoading(false);
        }
    }

    const readTable = async () => {
        try {
            if (!userHistory?.table) {
                console.log("NO_TABLE_EXISTS")
                return
            }
            const privateKey = configs.NEXT_PUBLIC_DEPLOYER_PRIVATE_KEY//"your_private_key";
            if (!privateKey) {
                console.log("NO_KEY_FOUND")
                return
            }
            console.log("-------------")
            const wallet = new Wallet(privateKey);
            // To avoid connecting to the browser wallet (locally, port 8545).
            // For example: "https://polygon-mumbai.g.alchemy.com/v2/aVMC4jrgIA9JbSD4Q2Ub6vIWIzXyaR-H"
            const provider = getDefaultProvider(getRPCURL(chain?.id));
            const signer = wallet.connect(provider);
            console.log({ signer })

            // Connect to the database
            const db = new Database({ signer });

            // Type is inferred due to `Database` instance definition
            // const tab = await listTables({ signer })
            // console.log({ tab })
            console.log("READ: ", { userHistory })
            if (userHistory?.table) {
                // const { results } = await db.prepare(` SELECT table_name = t.name FROM sys.tables t INNER JOIN sys.schemas s ON t.schema_id = s.schema_id;`).all();
                const { results } = await db.prepare(`SELECT * FROM ${userHistory?.table};`).all();
                console.log(results);
                setUserHistory((prev) => ({
                    ...prev,
                    history: results,
                    isTableCreated: true
                }))
                return results
            }

        } catch (error) {
            console.log("READ TABLE ERROR: ", error)
            setUserHistory((prev) => ({
                ...prev,
                history: [],
                isTableCreated: false
            }))
            return []

        }
    }

    return (
        <TablelandContext.Provider
            value={{
                readTable,
                writeTable,
                userHistory,
                setUserHistory,
                isLoading,
                setIsLoading

            }}
        >
            {children}
        </TablelandContext.Provider>
    );
};

export const useTableland = () => {
    const context = useContext(TablelandContext) as TablelandContextType;
    if (context === undefined) {
        throw new Error("useAuth must be used within an AuthProvider");
    }
    return context;
};
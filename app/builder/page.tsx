
"use client"
import React, { useState } from 'react';
import Head from 'next/head';
import Markdown from 'react-markdown'
import { saveAs } from 'file-saver';
import remarkGfm from 'remark-gfm'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { dark } from 'react-syntax-highlighter/dist/esm/styles/prism'
const PROMT_API_URL = '/api/parse-builder-prompt'
import { RxColorWheel } from "react-icons/rx";
import { toBase64 } from 'openai/core';
import { TbBrandVscode } from "react-icons/tb";
import { IoCodeDownloadSharp } from "react-icons/io5";
import { LiaFileContractSolid } from "react-icons/lia";
import { LuHardHat } from "react-icons/lu";
import { TempleHinduTwoTone } from '@mui/icons-material';

const contract = `
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract MyToken is ERC20 {
    constructor() ERC20("MyToken", "MTK") {}
}`


interface BuilderForm {
  template: string;
  additionDetails: string;
  featuresRequest: string[];
}

export default function Builder() {
  const [chatGPTRawResponse, setChatGPTRawResponse] = useState('');
  const [isLoading, setIsLoading] = useState(false)

  // Features for each template
  const templateFeatures = {
    Token: ['Mintable', 'Burnable', 'Pausable', 'Permit', 'Votes', 'Flash Miniting'],
    NFT: ['Custom Metadata', 'Royalty Settings', 'NFT Minting', 'NFT Burning'],
    Staking: ['Stake Tokens', 'Unstake Tokens', 'Reward Calculation', 'Staking Limits'],
    Farm: ['Yield Calculation', 'Liquidity Pools', 'Farm Tokens', 'Harvesting'],
    Marketplace: ['Listing Items', 'Search Filters', 'Transaction History', 'User Ratings'],
    Launchpad: ['Project Submission', 'Voting System', 'Token Distribution', 'Fundraising Goals'],
    // Define similar arrays for other templates if necessary...
  };



  const [builderForm, setBuilderForm] = useState<BuilderForm>({
    template: Object.keys(templateFeatures)[0],
    additionDetails: 'The Token name will MyToken with the symbol name MTK',
    featuresRequest: [], // Initialize with default features
  });



  const TEMPLATE_TO_COMMAND_MAPPING: Record<string, string> = {
    Token: 'The Token name will MyToken with the symbol name MTK',
    Staking: 'Smart contracts for staking have all the functionality.',
    NFT: 'Smart contracts for NFT have all the functionality.',
    Farm: 'Smart contracts for Farm have all the functionality',
    Marketplace: '',
    Launchpad: '',
  };

  // Features for each template

  const downloadSourceCode = () => {
    setIsLoading(true)
    try {
      const scode = chatGPTRawResponse.substring(chatGPTRawResponse.indexOf('```solidity') + 11, chatGPTRawResponse.lastIndexOf('```'))
      console.log({ scode })
      const blob = new Blob([scode], { type: 'text/plain;charset=utf-8' });
      saveAs(blob, 'contract.sol');
    } catch (error) {

    } finally {
      setIsLoading(false)
    }
  }
  const downloadHardHatProject = async () => {
    setIsLoading(true)
    try {
      const scode = chatGPTRawResponse.substring(chatGPTRawResponse.indexOf('```solidity') + 11, chatGPTRawResponse.lastIndexOf('```'))
      console.log({ scode })
      const response = await fetch(
        '/api/hardhat-project',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ sourceCode: scode })
        });
      console.log(response)
      if (response.ok) {
        const blob = await response.blob();
        const url = window.URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = 'hardhat-project.zip';
        link.click();
        window.URL.revokeObjectURL(url);
      }
    } catch (error) {
      console.error(error)
    } finally {
      setIsLoading(false)
    }
  }
  const openInRemix = async () => {
    try {
      const code = chatGPTRawResponse.substring(chatGPTRawResponse.indexOf('```solidity') + 11, chatGPTRawResponse.lastIndexOf('```'))
      console.log({ code })
      const base = toBase64(code)
      console.log({ base })
      const link = `https://remix.ethereum.org/?#code=${base}&autoCompile=true&lang=en&optimize=false&runs=200&evmVersion=null&version=soljson-v0.8.20+commit.a1b79de6.js`
      console.log({ link })
      window.open(link, "_blank")
    } catch (error) {
      console.log({ error })
    }
  }
  const deployContract = async () => {
    try {
      setIsLoading(true)
      const scode = chatGPTRawResponse.substring(chatGPTRawResponse.indexOf('```solidity') + 11, chatGPTRawResponse.lastIndexOf('```'))
      console.log({ scode })
      const response = await fetch(
        '/api/get-contract-compile',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ sourceCode: scode })
        });
      console.log(response)
      if (response.ok) {
        const { abi, bytecode, } = await response.json()
        console.log("LINE: 62", {
          abi, bytecode
        })
      }
    } catch (error) {
      console.log("LINE: 139", { error })
    } finally {
      setIsLoading(false)

    }
  }


  const handleBuilderFormChange = (value: any, key: string) => {
    if (['template', 'additionDetails'].includes(key)) {
      const selectedTemplateText = TEMPLATE_TO_COMMAND_MAPPING[value] || ''; // Default to empty string if not found
      const updatedAdditionDetails =
        key === 'template' ? `${selectedTemplateText} ${builderForm.featuresRequest.join(' ')}` : value;

      setBuilderForm((prev) => ({
        ...prev,
        additionDetails: updatedAdditionDetails,
        [key]: value,
      }));
    }
    setChatGPTRawResponse('');
  };


  const handleFeatureRequest = (feature: string) => {
    setBuilderForm((prev) => {
      const updatedFeaturesRequest = prev.featuresRequest.includes(feature)
        ? prev.featuresRequest.filter((item) => item !== feature)
        : [...prev.featuresRequest, feature];

      // Dynamically select template-specific text based on the chosen template
      const updatedAdditionDetails = `${TEMPLATE_TO_COMMAND_MAPPING[prev.template]} that include functions ${updatedFeaturesRequest.join(', ')}`;

      return {
        ...prev,
        featuresRequest: updatedFeaturesRequest,
        additionDetails: updatedAdditionDetails,
      };
    });
  };


  const promptCall = async () => {
    console.log({ builderForm });
    setIsLoading(true)
    try {
      const response = await fetch(PROMT_API_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(builderForm)
      });

      const parseResponse = await response.json();
      console.log({ parseResponse })
      setChatGPTRawResponse(parseResponse?.data)
    } catch (error) {

    } finally {
      setIsLoading(false)
    }
  }
  return (
    <div className="w-full min-h-screen">
      <Head>
        <title>AI Builder</title>
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css"
          integrity="sha384-k6RqeWecC7o1e4e1f84a82a8R2e5QrTsyhVfLk3sbLE1zARNw3c8l+Xm3i0yB5Zp"
          crossOrigin="anonymous"
        />
      </Head>
      <main className="p-8">
        <section className="mb-8">
          <h1 className="text-2xl font-bold mb-4">AI Builder</h1>
          <p>Generate your custom DeFi application for</p>
        </section>
        <section className="mb-8">
          <h2 className="text-xl font-semibold mb-2">Select Template</h2>
          <p className="text-gray-400 mb-4">Choose modules to activate on your project, you can configure them later</p>
          <div style={{ display: "flex", flexDirection: "row" }} className="grid grid-cols-3 gap-4">
            {Object.keys(templateFeatures).map((template) => (
              <div
                key={template}
                className={`bg-gray-100 p-4 cursor-pointer rounded-lg text-center ${builderForm?.template === template ? 'ring-2 ring-black ' : ''}`}
                onClick={() => handleBuilderFormChange(template, "template")}
              >
                <i className={`fa${templateFeatures[template].length ? 's' : 'r'} fa-${template.toLowerCase()} fa-3x mb-2`}></i>
                <h3 className="text-lg">{template}</h3>
                <p className="text-sm text-gray-700">Generate a custom {template}</p>
              </div>
            ))}
          </div>
        </section>


        {builderForm?.template && (
          <section className="mb-8">
            <h2 className="text-xl font-semibold mb-4">Features Request</h2>
            <p className="text-gray-500 mb-4">Choose features to activate on your project</p>
            <form>
              <div style={{ display: "flex", flexDirection: "row" }} className="grid grid-cols-2 gap-4 mb-4">
                {templateFeatures[builderForm?.template].map((feature, index) => (
                  <label key={index} className="flex items-center">
                    <input type="checkbox" className="form-checkbox accent-black  h-5 w-5" checked={builderForm?.featuresRequest?.includes(feature)} onClick={() => { handleFeatureRequest(feature) }} />
                    <span className="ml-2 text-gray-800">{feature}</span>
                  </label>
                ))}
              </div>
              <div className="mb-4">
                <textarea
                  value={builderForm?.additionDetails}
                  onChange={(e) => handleBuilderFormChange(e?.target?.value, 'additionDetails')}
                  className="w-full p-2 bg-gray-100 rounded-lg"
                  placeholder="Describe Customisation"
                  rows={4}
                >
                </textarea>
              </div>
              <Markdown remarkPlugins={[remarkGfm]}
                children={chatGPTRawResponse}
                components={{
                  code(props) {
                    const { children, className, node, ...rest } = props
                    const match = /language-(\w+)/.exec(className || '')
                    return match ? (
                      <SyntaxHighlighter
                        {...rest}
                        PreTag="div"
                        children={String(children).replace(/\n$/, '')}
                        language={match[1]}
                        style={dark}
                      />
                    ) : (
                      <code {...rest} className={className}>
                        {children}
                      </code>
                    )
                  }
                }} />
              {
                !isLoading && !chatGPTRawResponse && !chatGPTRawResponse?.length && (
                  <button type="button" onClick={promptCall} className="flex justify-center items-center gap-2 mt-4 text-white bg-black py-2 px-4 rounded-lg  transition duration-300 text-base font-semibold">
                    <LiaFileContractSolid className='h-6 w-6' />  Generate Smart Contract
                  </button>
                )
              }
              {
                chatGPTRawResponse && chatGPTRawResponse?.length && (
                  <div className='flex gap-4'>

                    <button type="button" onClick={downloadSourceCode} className="flex justify-center items-center gap-2 mt-4 text-white bg-black py-2 px-4 rounded-lg  transition duration-300 text-base font-semibold">
                      <IoCodeDownloadSharp className='h-6 w-6' /> Download Contract
                    </button>
                    <button type="button" onClick={downloadHardHatProject} className="flex justify-center items-center gap-2 mt-4 text-white bg-black py-2 px-4 rounded-lg  transition duration-300 text-base font-semibold">
                      <LuHardHat className='h-6 w-6' /> Download Hardhat
                    </button>
                    <button type="button" onClick={openInRemix} className="flex justify-center items-center gap-2 mt-4 text-white bg-black py-2 px-4 rounded-lg  transition duration-300 text-base font-semibold">
                      <TbBrandVscode className='h-6 w-6' /> Open in Remix
                    </button>
                  </div>
                )
              }
              {
                isLoading && (
                  <div className="animate-spin-slow loader rounded-full border-4 border-t-4 border-t-orange-300 border-b-green-300 border-gray-200 h-8 w-8 my-4 flex justify-center items-center">
                    <RxColorWheel className="w-4 h-4 text-white" />
                  </div>
                )
              }
            </form>
          </section>
        )}
        {/* Add additional sections as needed */}
      </main>
    </div>
  );
}
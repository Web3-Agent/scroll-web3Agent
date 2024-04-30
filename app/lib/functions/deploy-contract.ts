const solc = require("solc");
import { DeployContractConfig, DeployContractResponse, VerifyContractParams } from "@/app/lib/functions/types";
import handleImports from "@/app/lib/deploy-contract/handle-imports";
import { getRpcUrl, createViemChain, getExplorerUrl } from "@/app/lib/viem-utils";
import ipfsUpload from "@/app/lib/deploy-contract/ipfs-upload";
import { Hex, createPublicClient, createWalletClient, encodeDeployData, http } from "viem";
import { polygonMumbai, opBNBTestnet, bscTestnet } from "viem/chains";
import { privateKeyToAccount } from "viem/accounts";
import { configs } from "@/configs";

export default async function deployContract({
  chainName = 'Polygon Mumai',
  contractName = 'opgptContract',
  sourceCode,
  constructorArgs
}: DeployContractConfig): Promise<DeployContractResponse> {
  const viemChain = createViemChain(chainName) || polygonMumbai
  const fileName = contractName.replace(/[\/\\:*?"<>|.\s]+$/g, '_') + '.sol'
  console.log({ chainName, contractName, viemChain, fileName })
  console.log(JSON.stringify(viemChain, null, 2))
  // Prepare the sources object for the Solidity compiler
  const handleImportsResult = await handleImports(sourceCode)
  console.log({ viemChain: JSON.stringify(viemChain, null, 2) })
  const sources = {
    [fileName]: {
      content: handleImportsResult?.sourceCode
    },
    ...handleImportsResult?.sources
  }
  // loop through sources and log the keys
  const sourcesKeys = Object.keys(sources)
  console.log('sourcesKeys', sourcesKeys)

  // Loop over each source
  for (const sourceKey of sourcesKeys) {
    let sourceCode = sources[sourceKey].content

    // Find all import statements in the source code
    const importStatements = sourceCode.match(/import\s+["'][^"']+["'];/g) || []

    // Loop over each import statement
    for (const importStatement of importStatements) {
      // Extract the file name from the import statement
      const importPathMatch = importStatement.match(/["']([^"']+)["']/)

      // If no import path is found, continue to the next statement
      if (!importPathMatch) continue

      // Extract the file name from the path
      const importPath = importPathMatch[1]
      const fileName = importPath.split('/').pop() || importPath

      // Replace the import statement with the new import statement
      sourceCode = sourceCode.replace(importStatement, `import "${fileName}";`)
    }

    // Update the source content in your sources object
    sources[sourceKey].content = sourceCode
  }

  // Compile the contract
  const standardJsonInput = JSON.stringify({
    language: 'Solidity',
    sources,
    settings: {
      evmVersion: 'london',
      outputSelection: {
        '*': {
          '*': ['*']
        }
      }
    }
  })

  const output = JSON.parse(solc.compile(standardJsonInput))
  if (output.errors) {
    // Filter out warnings
    const errors = output.errors.filter(
      (error: { severity: string }) => error.severity === 'error'
    )
    if (errors.length > 0) {
      const error = new Error(errors[0].formattedMessage)
      throw error
    }
  }
  const contract = output.contracts[fileName]

  // Get the contract ABI and bytecode
  const abi = contract[contractName].abi
  let bytecode = contract[contractName].evm.bytecode.object
  if (!bytecode.startsWith('0x')) {
    bytecode = '0x' + bytecode
  }

  const rpcUrl = getRpcUrl(viemChain)
  console.log({ rpcUrl })
  //Prepare provider and signer
  const publicClient = createPublicClient({
    chain: viemChain,
    transport: rpcUrl ? http(rpcUrl) : http()
  })

  if (!(await publicClient.getChainId())) {
    const error = new Error(
      `Provider for chain ${viemChain.name} not available`
    )
    console.log(error)
  }
  console.log('Provider OK')
  const deployerPk: Hex = `0x${configs.DEPLOYER_PRIVATE_KEY}`
  const account = privateKeyToAccount(deployerPk)

  const walletClient = createWalletClient({
    account,
    chain: viemChain,
    transport: rpcUrl ? http(rpcUrl) : http()
  })

  if (!(await walletClient.getAddresses())) {
    const error = new Error(`Wallet for chain ${viemChain.name} not available`)
    console.log(error)
  }
  console.log('Wallet OK')

  const deployData = encodeDeployData({
    abi: abi,
    bytecode: bytecode,
    args: constructorArgs || []
  })
  console.log('Building deployData OK.')

  const deployHash = await walletClient.deployContract({
    abi: abi,
    bytecode: bytecode,
    account: account,
    args: constructorArgs || []
  })

  let deployTxUrl = '';
  console.log({ viemChainid: viemChain?.id })
  const baseExplorerUrl = getExplorerUrl(viemChain)
  if (viemChain?.id == 314159) {
    deployTxUrl = `${baseExplorerUrl}/${deployHash}`
  } else {
    deployTxUrl = `${baseExplorerUrl}/tx/${deployHash}`
  }
  console.log('Deploy URL: ', deployTxUrl)

  // Add the flattened source code to the sources object
  // const flattenedCode = flattenSolidity(sources);
  // const flattenedFileName = fileName.split(".")[0] + "_flattened.sol";
  // sources[flattenedFileName] = { content: flattenedCode };

  const ipfsCid = await ipfsUpload(
    sources,
    JSON.stringify(abi),
    bytecode,
    standardJsonInput
  )

  const ipfsUrl = `https://nftstorage.link/ipfs/${ipfsCid}`
  console.log(`IPFS URL: ${ipfsUrl}`)

  const encodedConstructorArgs = deployData.slice(bytecode?.length)

  // Trigger the verification process withouth waiting for it to complete
  const verificationParams: VerifyContractParams = {
    deployHash,
    standardJsonInput: standardJsonInput,
    encodedConstructorArgs,
    fileName,
    contractName,
    viemChain
  }

  const deploymentData = {
    explorerUrl: deployTxUrl,
    ipfsUrl,
    verificationParams
  }
  console.log(`Deployment data: `, deploymentData)

  return deploymentData
};


export async function deployContractCompile({
  chainName = 'Goerli',
  contractName = 'opgptContract',
  sourceCode,
  constructorArgs
}: DeployContractConfig): Promise<DeployContractResponse> {
  const viemChain = createViemChain(chainName) || polygonMumbai
  const fileName = contractName.replace(/[\/\\:*?"<>|.\s]+$/g, '_') + '.sol'
  console.log({ chainName, contractName, viemChain, fileName })
  console.log(JSON.stringify(viemChain, null, 2))
  // Prepare the sources object for the Solidity compiler
  const handleImportsResult = await handleImports(sourceCode)
  console.log({ viemChain: JSON.stringify(viemChain, null, 2) })
  const sources = {
    [fileName]: {
      content: handleImportsResult?.sourceCode
    },
    ...handleImportsResult?.sources
  }
  // loop through sources and log the keys
  const sourcesKeys = Object.keys(sources)
  console.log('sourcesKeys', sourcesKeys)

  // Loop over each source
  for (const sourceKey of sourcesKeys) {
    let sourceCode = sources[sourceKey].content

    // Find all import statements in the source code
    const importStatements = sourceCode.match(/import\s+["'][^"']+["'];/g) || []

    // Loop over each import statement
    for (const importStatement of importStatements) {
      // Extract the file name from the import statement
      const importPathMatch = importStatement.match(/["']([^"']+)["']/)

      // If no import path is found, continue to the next statement
      if (!importPathMatch) continue

      // Extract the file name from the path
      const importPath = importPathMatch[1]
      const fileName = importPath.split('/').pop() || importPath

      // Replace the import statement with the new import statement
      sourceCode = sourceCode.replace(importStatement, `import "${fileName}";`)
    }

    // Update the source content in your sources object
    sources[sourceKey].content = sourceCode
  }

  // Compile the contract
  const standardJsonInput = JSON.stringify({
    language: 'Solidity',
    sources,
    settings: {
      evmVersion: 'london',
      outputSelection: {
        '*': {
          '*': ['*']
        }
      }
    }
  })

  const output = JSON.parse(solc.compile(standardJsonInput))
  if (output.errors) {
    // Filter out warnings
    const errors = output.errors.filter(
      (error: { severity: string }) => error.severity === 'error'
    )
    if (errors.length > 0) {
      const error = new Error(errors[0].formattedMessage)
      throw error
    }
  }
  const contract = output.contracts[fileName]

  // Get the contract ABI and bytecode
  const abi = contract[contractName].abi
  let bytecode = contract[contractName].evm.bytecode.object
  if (!bytecode.startsWith('0x')) {
    bytecode = '0x' + bytecode
  }
  console.log('Building deployData OK.')

  const compiledContract = {
    abi: abi,
    bytecode: bytecode,
    args: constructorArgs || []
  }

  return compiledContract
};


// https://remix.ethereum.org/?#code=Ly8gU1BEWC1MaWNlbnNlLUlkZW50aWZpZXI6IE1JVApwcmFnbWEgc29saWRpdHkgXjAuOC4wOwoKaW1wb3J0ICJAb3BlbnplcHBlbGluL2NvbnRyYWN0cy90b2tlbi9FUkMyMC9FUkMyMC5zb2wiOwppbXBvcnQgIkBvcGVuemVwcGVsaW4vY29udHJhY3RzL3Rva2VuL0VSQzIwL2V4dGVuc2lvbnMvRVJDMjBCdXJuYWJsZS5zb2wiOwppbXBvcnQgIkBvcGVuemVwcGVsaW4vY29udHJhY3RzL2FjY2Vzcy9Pd25hYmxlLnNvbCI7Cgpjb250cmFjdCBNeVRva2VuIGlzIEVSQzIwLCBFUkMyMEJ1cm5hYmxlLCBPd25hYmxlIHsKICAgIGNvbnN0cnVjdG9yKCkgRVJDMjAoIk15VG9rZW4iLCAiTVRLIikgewogICAgICAgIF9taW50KG1zZy5zZW5kZXIsIDMwMDAwMCAqIDEwICoqIGRlY2ltYWxzKCkpOwogICAgfQoKICAgIGZ1bmN0aW9uIG1pbnQoYWRkcmVzcyB0bywgdWludDI1NiBhbW91bnQpIHB1YmxpYyBvbmx5T3duZXIgewogICAgICAgIF9taW50KHRvLCBhbW91bnQpOwogICAgfQoKICAgIGZ1bmN0aW9uIGJ1cm4oYWRkcmVzcyBmcm9tLCB1aW50MjU2IGFtb3VudCkgcHVibGljIG9ubHlPd25lciB7CiAgICAgICAgX2J1cm4oZnJvbSwgYW1vdW50KTsKICAgIH0KfQ==&lang=en&optimize=false&runs=200&evmVersion=null
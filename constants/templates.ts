export const templates = [
    'Swap 100 USDC to USDT.',
    'Swap 100 USDT to ETH and create portfolio with 0.001 WETH and trigger stop loss on -5% and take profit on 10%.',
    'Create portfolio with 0.1 WETH and trigger stop loss on -5% and take profit on 10%.',
    'Deposit 5 USDT to Aave. Borrow 1 USDC from Aave. Repay 1 USDC to Aave. Withdraw 5 USDT from Aave. Swap 5 USDT to ETH.',
    'Swap 250 USDT to LINK. Create portfolio with 0.01 WBTC and set stop loss on -5% and take profit on 10%.',
    'Swap 0.0001 ETH to WBTC. Deposit 0.001 WBTC to Aave. Borrow 10 USDT.',
    'Deposit 0.1 ETH to Lido. Send 0.1 WETH to 0x000000'
];

export const PROMPT_COMMANDS = [
    {
        action: 'MY_PORTFOLIO',
        message: 'Show my portfolio details with the total for address __WALLET_ADDRESS__ in table format.',
        note: 'Sample Query: Show my portfolio details with the total for address 0x6aeeb12fe14b7dae54277e6bb0042466e2161bf8 in table format.',
    },
    {
        action: 'MY_TOKENS',
        message: 'Show my tokens details with the total for address __WALLET_ADDRESS__ in table format.',
        note: 'Sample Query: Show my tokens details with the total for address 0x6aeeb12fe14b7dae54277e6bb0042466e2161bf8 in table format.',
    },
    {
        action: 'MY_COINS',
        message: 'Show my coins details with the total for address __WALLET_ADDRESS__ in table format.',
        note: 'Sample Query: Show my coins details with the total for address 0x6aeeb12fe14b7dae54277e6bb0042466e2161bf8 in table format.',
    },
    // {
    //     action: 'MY_BALANCE',
    //     message: 'Show my detailed account balance.'
    // },
    {
        action: 'MY_NFT',
        message: 'Show my NFTs details for address __WALLET_ADDRESS__ in table format.',
        note: 'Sample Query: Show my NFTs details for address 0x6aeeb12fe14b7dae54277e6bb0042466e2161bf8 in table format.',
    },
    // {
    //     action: 'MY_NFT',
    //     message: 'Show my NFTs balance.'
    // },
    {
        action: 'TOKENS_BY_SYMBOL',
        message: 'Show me the list of tokens in all networks with the search symbol __SYMBOL__ in table format.',
        note: 'Show me the list of tokens in all networks with the search symbol usdc in table format.',
    },
    {
        action: 'TOP_NFT_HOLDER',
        message: 'Show me top NFT holders where the chain name is __CHAIN_NAME__ and the contract address is __CONTRACT_ADDRESS__ in table format.',
        note: `Supported chain name are mainnet,optimism and arbitrum. Sample Query: Show me top NFT holders where the chain name is mainnet and the contract address is 0xb7f7f6c52f2e2fdb1963eab30438024864c313f6 in table format.`
    },
    // {
    //     action: 'TXN_INFO',
    //     message: 'Show me transaction details where the chain name is __CHAIN_NAME__ and the transaction hash is __TXN_HASH__',
    //     note: `Supported chain name are mainnet,optimism and arbitrum. Sample Query: Show me transaction details where the chain name is mainnet and the transaction hash is 0x48cd7f0228f198efa9792274269173d1bba7165b0e7354a06839e6bbee8ed7cb`
    // },
    {
        action: 'NFT_METADATA',
        message: 'Show me NFT metadata details where the chain name is __CHAIN_NAME__, the token id is __TOKEN_ID__ and the contract address is __CONTRACT_ADDRESS__ in table format.',
        note: `Supported chain name are mainnet,optimism and arbitrum. Sample Query: Show me NFT metadata details where the chain name is mainnet, the token id is 3366 and the contract address is 0x8bc9224253e37cd221c7f510acc42cb6e734db57 in table format.`
    },
    {
        action: 'PROTOCOLS',
        message: 'Show me the list of protocols for wallet address on all networks and the wallet address is __ADDRESS__ in table format.',
        note: `Sample Query: Show me the list of protocols for wallet address on all networks and the wallet address is 0xb72ed8401892466ea8af528c1af1d0524bc5e105 in table format.`
    }
];

export const LUKSO_DEPLOYMENT_COMMANDS = [
    {
        action: 'CREATE_CONTRACT',
        message: 'Write a simple contract that stores a value. don\'t deploy.',
        note: 'Once contract created, please select below chain/network to deploy contract'
    },
    {
        action: 'DEPLOY_LUKSO_TESTNET',
        message: 'Deploy this contract on Lukso Testnet.',
    },
];

export const KLAYTN_DEPLOYMENT_COMMANDS = [
    {
        action: 'CREATE_CONTRACT',
        message: 'Write a simple contract that stores a value. don\'t deploy.',
        note: 'Once contract created, please select below chain/network to deploy contract'
    },
    {
        action: 'DEPLOY_KLAYTN_TESTNET',
        message: 'Deploy this contract on Klaytn Testnet.',
    },
];
export const DEFICHAIN_DEPLOYMENT_COMMANDS = [
    {
        action: 'CREATE_CONTRACT',
        message: 'Write a simple contract that stores a value. don\'t deploy.',
        note: 'Once contract created, please select below command to deploy contract'
    },
    {
        action: 'DEPLOY_CONTRACT',
        message: 'Deploy this contract.',
    },
    // {
    //     action: 'DEPLOY_KLAYTN_TESTNET',
    //     message: 'Deploy this contract on ZetaChain Athens 3 Testnet.',
    // },
    // {
    //     action: 'DEPLOY_LINEA_TESTNET',
    //     message: 'Deploy this contract on Linea Testnet.',
    // }, {
    //     action: 'DEPLOY_BASE_GOERLI',
    //     message: 'Deploy this contract on Base Goerli.',
    // },
];
export const LINEA_DEPLOYMENT_COMMANDS = [
    {
        action: 'CREATE_CONTRACT',
        message: 'Write a simple contract that stores a value. don\'t deploy.',
        note: 'Once contract created, please select below chain/network to deploy contract'
    },
    {
        action: 'DEPLOY_LINEA_TESTNET',
        message: 'Deploy this contract on Linea Testnet.',
    },
];

export const ARBITRUM_DEPLOYMENT_COMMANDS = [
    {
        action: 'CREATE_CONTRACT',
        message: 'Write a simple contract that stores a value. don\'t deploy.',
        note: 'Once contract created, please select below chain/network to deploy contract'
    },

    {
        action: 'DEPLOY_ARBITRUM_GOERLI_TESTNET',
        message: 'Deploy this contract on Arbitrum Goerli.',
    },
];


export const OTHER_DEPLOYMENT_COMMANDS = [
    {
        action: 'CREATE_CONTRACT',
        message: 'Write a simple contract that stores a value. don\'t deploy.',
        note: 'Once contract created, please select below chain/network to deploy contract'
    },
    {
        action: 'DEPLOY_SCROLL_SEPOLIA_TESTNET',
        message: 'Deploy this contract on Scroll Sepolia Testnet.',
    },
    {
        action: 'DEPLOY_GOERLI_TESTNET',
        message: 'Deploy this contract on Goerli.',
    },
    {
        action: 'DEPLOY_FILECOIN_TESTNET',
        message: 'Deploy this contract on Filecoin - Calibration testnet.',
    },
];

export const WEB3_COMMANDS = [
    {
        action: 'BLOCK_NUMBER',
        message: 'Give me the current block number on chain 1'
    },
    {
        action: 'GAS_PRICE_ETH_CHAIN',
        message: "Give me the gas price for chain id 1."
    },
    {
        action: 'GAS_PRICE_ETH',
        message: 'Give me the gas price of Ethereum.',
    },
    {
        action: 'GET_RECEIPT',
        message: 'Get receipt for hash __HASH__',
        note: `Sample Query: Get receipt for hash 0x87324cefffc1ce22d6b64196d31eac660a4cc7877db0e6cec77ff28d9aad3e32`

    },
]
export const SWAP_TOKEN = [
    {
        action: 'SWAP_TOKEN',
        message: 'Swap token where chainid is CHAINID, src is SRC, dst is DST, amount is AMOUNT, from is FROM, and slippage is SLIPPAGE.',
        note: `Sample Query: Swap token where chainid is 1, src is 0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee, dst is 0x0000000000085d4780b73119b644ae5ecd22b376, amount is 10000000000000000, from is 0x7bfee91193d9df2ac0bfe90191d40f23c773c060, and slippage is 20.`
    },
]
export const TRANSACTION_COMMANDS = [
    {
        action: 'SEND_TRANSACTION',
        message: 'Send __AMOUNT__ amount to account __ACCOUNT__',
        note: `Sample Query: Send 0.0001 amount to account 0x3EBCB8f4d6EA1FCc7D2352B68bDdE3364F1d20F1`

    },
    // ...SWAP_TOKEN
]

export const MAINNET_GAS_PRICE_COMMANDS = [
    {
        action: 'GAS_PRICE_KLAYTN_NETWORK',
        message: 'Give me the current gas price on the Klaytn network.',
    },
    // {
    //     action: 'GAS_PRICE_POLYGON_NETWORK',
    //     message: 'Give me the current gas price on the Polygon network.',
    // },
    // {
    //     action: 'GAS_PRICE_ETHEREUM_NETWORK',
    //     message: 'Give me the current gas price on the Ethereum network.',
    // },

    // {
    //     action: 'GAS_PRICE_BSC_NETWORK',
    //     message: 'Give me the current gas price on the BSC network.',
    // },
    // {
    //     action: 'GAS_PRICE_ARBITRUM_NETWORK',
    //     message: 'Give me the current gas price on the Arbitrum network.',
    // },
    // {
    //     action: 'GAS_PRICE_OPTIMISM_NETWORK',
    //     message: 'Give me the current gas price on the Optimism network.',
    // },
    // {
    //     action: 'GAS_PRICE_SCROLL_NETWORK',
    //     message: 'Give me the current gas price on the Scroll network.',
    // },
    // {
    //     action: 'GAS_PRICE_GNOSIS_NETWORK',
    //     message: 'Give me the current gas price on the Gnosis network.',
    // },
    // {
    //     action: 'GAS_PRICE_AVALANCHE_NETWORK',
    //     message: 'Give me the current gas price on the Avalanche network.',
    // },
    // {
    //     action: 'GAS_PRICE_FANTOM_NETWORK',
    //     message: 'Give me the current gas price on the Fantom network.',
    // },
    // {
    //     action: 'GAS_PRICE_CRONOS_NETWORK',
    //     message: 'Give me the current gas price on the Cronos network.',
    // },
    // {
    //     action: 'GAS_PRICE_OASYS_NETWORK',
    //     message: 'Give me the current gas price on the Oasys network.',
    // },
    // {
    //     action: 'GAS_PRICE_METER_NETWORK',
    //     message: 'Give me the current gas price on the Meter network.',
    // },
    // {
    //     action: 'GAS_PRICE_BASE_NETWORK',
    //     message: 'Give me the current gas price on the Base network.',
    // },
    // {
    //     action: 'GAS_PRICE_LINEA_NETWORK',
    //     message: 'Give me the current gas price on the Linea network.',
    // },
]

export const MAINNET_BLOCK_NUMBER_COMMANDS = [
    {
        action: 'LATEST_BLOCK_NUMBER_KLAYTN_NETWORK',
        message: 'Give me the latest block number on the Klaytn network.',
    },
    // {
    //     action: 'LATEST_BLOCK_NUMBER_POLYGON_NETWORK',
    //     message: 'Give me the latest block number on the Polygon network.',
    // },
    // {
    //     action: 'LATEST_BLOCK_NUMBER_ETHEREUM_NETWORK',
    //     message: 'Give me the latest block number on the Ethereum network.',
    // },

    // {
    //     action: 'LATEST_BLOCK_NUMBER_BSC_NETWORK',
    //     message: 'Give me the latest block number on the BSC network.',
    // },
    // {
    //     action: 'LATEST_BLOCK_NUMBER_ARBITRUM_NETWORK',
    //     message: 'Give me the latest block number on the Arbitrum network.',
    // },
    // {
    //     action: 'LATEST_BLOCK_NUMBER_OPTIMISM_NETWORK',
    //     message: 'Give me the latest block number on the Optimism network.',
    // },
    // {
    //     action: 'LATEST_BLOCK_NUMBER_SCROLL_NETWORK',
    //     message: 'Give me the latest block number on the Scroll network.',
    // },
    // {
    //     action: 'LATEST_BLOCK_NUMBER_GNOSIS_NETWORK',
    //     message: 'Give me the latest block number on the Gnosis network.',
    // },
    // {
    //     action: 'LATEST_BLOCK_NUMBER_AVALANCHE_NETWORK',
    //     message: 'Give me the latest block number on the Avalanche network.',
    // },
    // {
    //     action: 'LATEST_BLOCK_NUMBER_FANTOM_NETWORK',
    //     message: 'Give me the latest block number on the Fantom network.',
    // },
    // {
    //     action: 'LATEST_BLOCK_NUMBER_CRONOS_NETWORK',
    //     message: 'Give me the latest block number on the Cronos network.',
    // },
    // {
    //     action: 'LATEST_BLOCK_NUMBER_OASYS_NETWORK',
    //     message: 'Give me the latest block number on the Oasys network.',
    // },
    // {
    //     action: 'LATEST_BLOCK_NUMBER_METER_NETWORK',
    //     message: 'Give me the latest block number on the Meter network.',
    // },
    // {
    //     action: 'LATEST_BLOCK_NUMBER_BASE_NETWORK',
    //     message: 'Give me the latest block number on the Base network.',
    // },
    // {
    //     action: 'LATEST_BLOCK_NUMBER_LINEA_NETWORK',
    //     message: 'Give me the latest block number on the Linea network.',
    // },
]

export const MAINNET_BLOCK_BY_NUMBER_COMMANDS = [
    {
        action: 'BLOCK_BY_NUMBER_KLAYTN_NETWORK',
        message: 'Give me the block details for block _BLOCK_NUMBER_ on the Klaytn network.',
        note: `Sample Query: Give me the block details for block 139348222 on the Klaytn network.`
    },
    // {
    //     action: 'BLOCK_BY_NUMBER_POLYGON_NETWORK',
    //     message: 'Give me the block details for block _BLOCK_NUMBER_ on the Polygon network.',
    //     note: `Sample Query: Give me the block details for block 50561151 on the Polygon network.`
    // },
    // {
    //     action: 'BLOCK_BY_NUMBER_ETHEREUM_NETWORK',
    //     message: 'Give me the block details for block _BLOCK_NUMBER_ on the Ethereum network.',
    //     note: `Sample Query: Give me the block details for block 18682451 on the Ethereum network.`
    // },

    // {
    //     action: 'BLOCK_BY_NUMBER_BSC_NETWORK',
    //     message: 'Give me the block details for block _BLOCK_NUMBER_ on the BSC network.',
    //     note: `Sample Query: Give me the block details for block 33936843 on the BSC network.`
    // },
    // {
    //     action: 'BLOCK_BY_NUMBER_ARBITRUM_NETWORK',
    //     message: 'Give me the block details for block _BLOCK_NUMBER_ on the Arbitrum network.',
    //     note: `Sample Query: Give me the block details for block 155451962 on the Arbitrum network.`
    // },
    // {
    //     action: 'BLOCK_BY_NUMBER_OPTIMISM_NETWORK',
    //     message: 'Give me the block details for block _BLOCK_NUMBER_ on the Optimism network.',
    //     note: `Sample Query: Give me the block details for block 112862369 on the Optimism network.`
    // },
    // {
    //     action: 'BLOCK_BY_NUMBER_SCROLL_NETWORK',
    //     message: 'Give me the block details for block _BLOCK_NUMBER_ on the Scroll network.',
    //     note: `Sample Query: Give me the block details for block 1198032 on the Scroll network.`
    // },
    // {
    //     action: 'BLOCK_BY_NUMBER_GNOSIS_NETWORK',
    //     message: 'Give me the block details for block _BLOCK_NUMBER_ on the Gnosis network.',
    //     note: `Sample Query: Give me the block details for block 31202027 on the Gnosis network.`
    // },
    // {
    //     action: 'BLOCK_BY_NUMBER_AVALANCHE_NETWORK',
    //     message: 'Give me the block details for block _BLOCK_NUMBER_ on the Avalanche network.',
    //     note: `Sample Query: Give me the block details for block 38424102 on the Avalanche network.`
    // },
    // {
    //     action: 'BLOCK_BY_NUMBER_FANTOM_NETWORK',
    //     message: 'Give me the block details for block _BLOCK_NUMBER_ on the Fantom network.',
    //     note: `Sample Query: Give me the block details for block 71698061 on the Fantom network.`
    // },
    // {
    //     action: 'BLOCK_BY_NUMBER_CRONOS_NETWORK',
    //     message: 'Give me the block details for block _BLOCK_NUMBER_ on the Cronos network.',
    //     note: `Sample Query: Give me the block details for block 11382338 on the Cronos network.`
    // },
    // {
    //     action: 'BLOCK_BY_NUMBER_OASYS_NETWORK',
    //     message: 'Give me the block details for block _BLOCK_NUMBER_ on the Oasys network.',
    //     note: `Sample Query: Give me the block details for block 2453709 on the Oasys network.`
    // },
    // {
    //     action: 'BLOCK_BY_NUMBER_METER_NETWORK',
    //     message: 'Give me the block details for block _BLOCK_NUMBER_ on the Meter network.',
    //     note: `Sample Query: Give me the block details for block 46338292 on the Meter network.`
    // },
    // {
    //     action: 'BLOCK_BY_NUMBER_BASE_NETWORK',
    //     message: 'Give me the block details for block _BLOCK_NUMBER_ on the Base network.',
    //     note: `Sample Query: Give me the block details for block 7267147 on the Base network.`
    // },
    // {
    //     action: 'BLOCK_BY_NUMBER_LINEA_NETWORK',
    //     message: 'Give me the block details for block _BLOCK_NUMBER_ on the Linea network.',
    //     note: `Sample Query: Give me the block details for block 1021026 on the Linea network.`
    // },
]

export const MAINNET_BLOCK_BY_HASH_COMMANDS = [
    {
        action: 'BLOCK_BY_HASH_KLAYTN_NETWORK',
        message: 'Give me the block details for block hash _BLOCK_HASH_ on the Klaytn network.',
        note: `Sample Query: Give me the block details for block hash 0xe7d6ad54b2e6478b3917210a40458a04e1c4931dfb8786e9dfb5a11c8fa25602 on the Klaytn network.`
    },
    // {
    //     action: 'BLOCK_BY_HASH_POLYGON_NETWORK',
    //     message: 'Give me the block details for block hash _BLOCK_HASH_ on the Polygon network.',
    //     note: `Sample Query: Give me the block details for block hash 0xf1e85b86949bc165e21fe37587a03e28e0b88c2b3cd6054dc2b16ed70bb9d6e6 on the Polygon network.`
    // },
    // {
    //     action: 'BLOCK_BY_HASH_ETHEREUM_NETWORK',
    //     message: 'Give me the block details for block hash _BLOCK_HASH_ on the Ethereum network.',
    //     note: `Sample Query: Give me the block details for block hash 0x08cdb10589fca38f7f7eb1e138ae6dbf34a5ee7c7c66b5c3f7c0f2e5a2f6ec71 on the Ethereum network.`
    // },
    // {
    //     action: 'BLOCK_BY_HASH_BSC_NETWORK',
    //     message: 'Give me the block details for block hash _BLOCK_HASH_ on the BSC network.',
    //     note: `Sample Query: Give me the block details for block hash 0x0c1344b3bd24696c1b2ab857498412e581769b38f032c2aa5b313e852b17e694 on the BSC network.`
    // },
    // {
    //     action: 'BLOCK_BY_HASH_ARBITRUM_NETWORK',
    //     message: 'Give me the block details for block hash _BLOCK_HASH_ on the Arbitrum network.',
    //     note: `Sample Query: Give me the block details for block hash 0x84cf4ab50573358d4612ef680d8b834afb9d39a3d73a17d0acd30f95ef3d7f2b on the Arbitrum network.`
    // },
    // {
    //     action: 'BLOCK_BY_HASH_OPTIMISM_NETWORK',
    //     message: 'Give me the block details for block hash _BLOCK_HASH_ on the Optimism network.',
    //     note: `Sample Query: Give me the block details for block hash 0xdd5e3fc796fc1926ef794e6a7b933fbec7e48be8547660ee5e0e4055dc86d4b4 on the Optimism network.`
    // },
    // {
    //     action: 'BLOCK_BY_HASH_SCROLL_NETWORK',
    //     message: 'Give me the block details for block hash _BLOCK_HASH_ on the Scroll network.',
    //     note: `Sample Query: Give me the block details for block hash 0x3421240674366319b8700109f2824ef331a0220355db57dafa7344bb47b8a17e on the Scroll network.`
    // },
    // {
    //     action: 'BLOCK_BY_HASH_GNOSIS_NETWORK',
    //     message: 'Give me the block details for block hash _BLOCK_HASH_ on the Gnosis network.',
    //     note: `Sample Query: Give me the block details for block hash 0xda05d93a34139309cf125fc1856b3975f46c007a86afe7fae7b9e97b246b5b80 on the Gnosis network.`
    // },
    // {
    //     action: 'BLOCK_BY_HASH_AVALANCHE_NETWORK',
    //     message: 'Give me the block details for block hash _BLOCK_HASH_ on the Avalanche network.',
    //     note: `Sample Query: Give me the block details for block hash 0x81379dc130bc885dfeb019b642bc70cc5e77335f9042e90bbe473a4a83227299 on the Avalanche network.`
    // },
    // {
    //     action: 'BLOCK_BY_HASH_FANTOM_NETWORK',
    //     message: 'Give me the block details for block hash _BLOCK_HASH_ on the Fantom network.',
    //     note: `Sample Query: Give me the block details for block hash 0x0003d3df00000a7591640c483400d3284402bcf6ac9257504d6c41c219e63e20 on the Fantom network.`
    // },
    // {
    //     action: 'BLOCK_BY_HASH_CRONOS_NETWORK',
    //     message: 'Give me the block details for block hash _BLOCK_HASH_ on the Cronos network.',
    //     note: `Sample Query: Give me the block details for block hash 0x529e03b27373d51376dc588b97071488bd887096c55e3f9532680c701d3aa3bc on the Cronos network.`
    // },
    // {
    //     action: 'BLOCK_BY_HASH_OASYS_NETWORK',
    //     message: 'Give me the block details for block hash _BLOCK_HASH_ on the Oasys network.',
    //     note: `Sample Query: Give me the block details for block hash 0xd216fc4a9f090f796a9038a5c839f531446ee05e584d7f3661240ea70847875d on the Oasys network.`
    // },
    // {
    //     action: 'BLOCK_BY_HASH_METER_NETWORK',
    //     message: 'Give me the block details for block hash _BLOCK_HASH_ on the Meter network.',
    //     note: `Sample Query: Give me the block details for block hash 0x02c320ace4f6f29ce7f84ef493675409b40d91149c71f57032267c291974e8db on the Meter network.`
    // },
    // {
    //     action: 'BLOCK_BY_HASH_BASE_NETWORK',
    //     message: 'Give me the block details for block hash _BLOCK_HASH_ on the Base network.',
    //     note: `Sample Query: Give me the block details for block hash 0x0394dec8bc9a144d2cf56bd34f6e2925c542f92d704ee87efceb1e7955eb6366 on the Base network.`
    // },
    // {
    //     action: 'BLOCK_BY_HASH_LINEA_NETWORK',
    //     message: 'Give me the block details for block hash _BLOCK_HASH_ on the Linea network.',
    //     note: `Sample Query: Give me the block details for block hash 0x8879f393ce6a4f8bb2a72bcd938e93b35db4551e6c0639dc87ea27433221c76e on the Linea network.`
    // },
]
export const BLOCK_DETAILS_BY_HASH = [
    {
        action: 'BLOCK_DETAILS_BY_HASH',
        message: 'Give me the block details for block hash _BLOCK_HASH_',
        note: `Sample Query: Give me the block details for block hash 0x5c66d45a002b65584957fd154b88bc5ad3a1625dea54a76845b0a3cca25d1a15`,
    },
]
export const BLOCK_DETAILS_BY_BLOCK_NUMBER = [
    {
        action: 'BLOCK_DETAILS_BY_BLOCK_NUMBER',
        message: 'Give me the block details for block number __BLOCK_NUMBER__',
        note: `Sample Query: Give me the block details for block number 4112861`,
    },
]
export const TRANSACTION_DETAILS_FOR_GRAPH_COMMANDS = [
    {
        action: 'TRANSACTION_DETAILS_FOR_GRAPH',
        message: 'Give me transaction count details in the Bar Graph.',
        note: `This will draw a graph where Y axis wil have count and X axis will have dates.`
    },
]
export const GET_STATS_COMMANDS = [
    {
        action: 'GET_STATS',
        message: 'Give me latest stats',
        note: `This API will pull latest stats.`
    },
]
export const GET_TOKEN_DETAILS_COMMANDS = [
    {
        action: 'GET_TOKEN_DETAILS',
        message: 'Give me token details for address __ADDRESS__',
        note: `Sample Query: Give me token details for address 0x18fB38404DADeE1727Be4b805c5b242B5413Fa40`
    },
]
export const MAINNET_TRANSACTION_DETAILS_BY_HASH_COMMANDS = [
    {
        action: 'TRANSACTION_DETAILS_BY_HASH',
        message: 'Give me the transaction details for hash _HASH_',
        note: `Sample Query: Give me the transaction details for hash 0xa0ebc5c8b3b9ab9ba678f862d7cbcd1b9864e9c8931c595ee471cc159fecddeb`
    },
    // {
    //     action: 'TRANSACTION_DETAILS_BY_HASH_FOR_POLYGON_NETWORK',
    //     message: 'Give me the transaction details for hash _HASH_ on the Polygon network.',
    //     note: `Sample Query: Give me the transaction details for hash 0xdd23ad410574222090d3246a8caa3ab928e5bd09d777f4cfecd18e01ed3db5fe on the Polygon network.`
    // },
    // {
    //     action: 'TRANSACTION_DETAILS_BY_HASH_FOR_ETHEREUM_NETWORK',
    //     message: 'Give me the transaction details for hash _HASH_ on the Ethereum network.',
    //     note: `Sample Query: Give me the transaction details for hash 0xf4f546489b06ccda2c7df1c054c95f53cc0c9457b68d1cd5d082c868533e2a6e on the Ethereum network.`
    // },

    // {
    //     action: 'TRANSACTION_DETAILS_BY_HASH_FOR_BSC_NETWORK',
    //     message: 'Give me the transaction details for hash _HASH_ on the BSC network.',
    //     note: `Sample Query: Give me the transaction details for hash 0xebaa7c2bc91100171c50dede33bf8016ef59b00a210bb5f6e6f23aad9d5b1231 on the BSC network.`
    // },
    // {
    //     action: 'TRANSACTION_DETAILS_BY_HASH_FOR_ARBITRUM_NETWORK',
    //     message: 'Give me the transaction details for hash _HASH_ on the Arbitrum network.',
    //     note: `Sample Query: Give me the transaction details for hash 0xbd42f559ed5908cbcfc868dc128e1bd907c5c2343a42a06dd7ff2587b203bedc on the Arbitrum network.`
    // },
    // {
    //     action: 'TRANSACTION_DETAILS_BY_HASH_FOR_OPTIMISM_NETWORK',
    //     message: 'Give me the transaction details for hash _HASH_ on the Optimism network.',
    //     note: `Sample Query: Give me the transaction details for hash 0x0605667a9a94703917f5c6f0f90245203a00e704fdca302c9e0e01532344fd35 on the Optimism network.`
    // },
    // {
    //     action: 'TRANSACTION_DETAILS_BY_HASH_FOR_SCROLL_NETWORK',
    //     message: 'Give me the transaction details for hash _HASH_ on the Scroll network.',
    //     note: `Sample Query: Give me the transaction details for hash 0xafca0111a3089615d7956098e6892d8bd77341d2b3cc379a42d12f3df0db1088 on the Scroll network.`
    // },
    // {
    //     action: 'TRANSACTION_DETAILS_BY_HASH_FOR_GNOSIS_NETWORK',
    //     message: 'Give me the transaction details for hash _HASH_ on the Gnosis network.',
    //     note: `Sample Query: Give me the transaction details for hash 0xdbe432c68e0adda484209b4df03e9dee50e03e1107b1e55a2686e3fcefdf75d2 on the Gnosis network.`
    // },
    // {
    //     action: 'TRANSACTION_DETAILS_BY_HASH_FOR_AVALANCHE_NETWORK',
    //     message: 'Give me the transaction details for hash _HASH_ on the Avalanche network.',
    //     note: `Sample Query: Give me the transaction details for hash 0x1614b548aafa9adbea1317313c5facad15e4f6589c7d564746b95053867ad3fd on the Avalanche network.`
    // },
    // {
    //     action: 'TRANSACTION_DETAILS_BY_HASH_FOR_FANTOM_NETWORK',
    //     message: 'Give me the transaction details for hash _HASH_ on the Fantom network.',
    //     note: `Sample Query: Give me the transaction details for hash 0x62f329da96a08117ccf2f3ec607599f0c281126f939437a8b2d17e1a48e63a11 on the Fantom network.`
    // },
    // {
    //     action: 'TRANSACTION_DETAILS_BY_HASH_FOR_CRONOS_NETWORK',
    //     message: 'Give me the transaction details for hash _HASH_ on the Cronos network.',
    //     note: `Sample Query: Give me the transaction details for hash 0xea69c9de0e1bc5ffe4d837ec1367463905d27cacef572fa86c53e634c1d69e49 on the Cronos network.`
    // },
    // {
    //     action: 'TRANSACTION_DETAILS_BY_HASH_FOR_OASYS_NETWORK',
    //     message: 'Give me the transaction details for hash _HASH_ on the Oasys network.',
    //     note: `Sample Query: Give me the transaction details for hash 0xfe9b5fa0e320766b58cb6eebfed2d8c80da2d8ff607c0e7d6315dd1061e83638 on the Oasys network.`
    // },
    // {
    //     action: 'TRANSACTION_DETAILS_BY_HASH_FOR_METER_NETWORK',
    //     message: 'Give me the transaction details for hash _HASH_ on the Meter network.',
    //     note: `Sample Query: Give me the transaction details for hash 0x59e07b58379bd620a3289daf8eed048182546166e82029e02e856230aab52929 on the Meter network.`
    // },
    // {
    //     action: 'TRANSACTION_DETAILS_BY_HASH_FOR_BASE_NETWORK',
    //     message: 'Give me the transaction details for hash _HASH_ on the Base network.',
    //     note: `Sample Query: Give me the transaction details for hash 0x6eb8fa3f45f2bbc1d996daef09a36f6a6ae78e24b9c36c06dc893d1b0850b9bd on the Base network.`
    // },
    // {
    //     action: 'TRANSACTION_DETAILS_BY_HASH_FOR_LINEA_NETWORK',
    //     message: 'Give me the transaction details for hash _HASH_ on the Linea network.',
    //     note: `Sample Query: Give me the transaction details for hash 0x2a373b6d8413520624f014896ded9a40f4f0a91f448891b1119dafd4f677559d on the Linea network.`
    // },
]
export const FUSION_APIS = [
    {
        action: 'GET_GASLESS_SWAP_ACTIVE_ORDERS',
        info: 'Get gasless swap active orders. Supported Network: Ethereum, BSC, and Polygon ',
        message: 'Get gasless swap active orders for the _NETWORK_ network.',
        note: `Sample Query: Get gasless swap active orders for the Ethereum network.`
    },
    {
        action: "GET_ACTUAL_SETTLEMENT_CONTRACT_ADDRESS",
        info: 'Get actual settlement contract address. Supported Network: Ethereum, BSC, and Polygon ',
        message: 'Get actual settlement contract address for the _NETWORK_ network.',
        note: `Sample Query: Get actual settlement contract address for the Ethereum network.`
    }
]


export const COVALENT_COMMANDS = [
    {
        action: 'COVALENT_TOKEN_BALANCE',
        tab_name: 'Get Account Holdings',
        message: 'Give me token holdings information for address _ADDRESS_',
        note: `Sample Query: Give me token holdings information for address 0x3EBCB8f4d6EA1FCc7D2352B68bDdE3364F1d20F1`
    },
    {
        action: 'COVALENT_NFT_BALANCE',
        tab_name: 'Get NFT Holdings',
        message: 'Give me NFT holdings information for address _ADDRESS_',
        note: `Sample Query: Give me NFT holdings information for address 0x3EBCB8f4d6EA1FCc7D2352B68bDdE3364F1d20F1`
    },
    // {
    //     action: 'TRANSACTION_DETAILS_BY_HASH_FOR_POLYGON_NETWORK',
    //     message: 'Give me the transaction details for hash _HASH_ on the Polygon network.',
    //     note: `Sample Query: Give me the transaction details for hash 0xdd23ad410574222090d3246a8caa3ab928e5bd09d777f4cfecd18e01ed3db5fe on the Polygon network.`
    // },
    // {
    //     action: 'TRANSACTION_DETAILS_BY_HASH_FOR_ETHEREUM_NETWORK',
    //     message: 'Give me the transaction details for hash _HASH_ on the Ethereum network.',
    //     note: `Sample Query: Give me the transaction details for hash 0xf4f546489b06ccda2c7df1c054c95f53cc0c9457b68d1cd5d082c868533e2a6e on the Ethereum network.`
    // },

    // {
    //     action: 'TRANSACTION_DETAILS_BY_HASH_FOR_BSC_NETWORK',
    //     message: 'Give me the transaction details for hash _HASH_ on the BSC network.',
    //     note: `Sample Query: Give me the transaction details for hash 0xebaa7c2bc91100171c50dede33bf8016ef59b00a210bb5f6e6f23aad9d5b1231 on the BSC network.`
    // },
    // {
    //     action: 'TRANSACTION_DETAILS_BY_HASH_FOR_ARBITRUM_NETWORK',
    //     message: 'Give me the transaction details for hash _HASH_ on the Arbitrum network.',
    //     note: `Sample Query: Give me the transaction details for hash 0xbd42f559ed5908cbcfc868dc128e1bd907c5c2343a42a06dd7ff2587b203bedc on the Arbitrum network.`
    // },
    // {
    //     action: 'TRANSACTION_DETAILS_BY_HASH_FOR_OPTIMISM_NETWORK',
    //     message: 'Give me the transaction details for hash _HASH_ on the Optimism network.',
    //     note: `Sample Query: Give me the transaction details for hash 0x0605667a9a94703917f5c6f0f90245203a00e704fdca302c9e0e01532344fd35 on the Optimism network.`
    // },
    // {
    //     action: 'TRANSACTION_DETAILS_BY_HASH_FOR_SCROLL_NETWORK',
    //     message: 'Give me the transaction details for hash _HASH_ on the Scroll network.',
    //     note: `Sample Query: Give me the transaction details for hash 0xafca0111a3089615d7956098e6892d8bd77341d2b3cc379a42d12f3df0db1088 on the Scroll network.`
    // },
    // {
    //     action: 'TRANSACTION_DETAILS_BY_HASH_FOR_GNOSIS_NETWORK',
    //     message: 'Give me the transaction details for hash _HASH_ on the Gnosis network.',
    //     note: `Sample Query: Give me the transaction details for hash 0xdbe432c68e0adda484209b4df03e9dee50e03e1107b1e55a2686e3fcefdf75d2 on the Gnosis network.`
    // },
    // {
    //     action: 'TRANSACTION_DETAILS_BY_HASH_FOR_AVALANCHE_NETWORK',
    //     message: 'Give me the transaction details for hash _HASH_ on the Avalanche network.',
    //     note: `Sample Query: Give me the transaction details for hash 0x1614b548aafa9adbea1317313c5facad15e4f6589c7d564746b95053867ad3fd on the Avalanche network.`
    // },
    // {
    //     action: 'TRANSACTION_DETAILS_BY_HASH_FOR_FANTOM_NETWORK',
    //     message: 'Give me the transaction details for hash _HASH_ on the Fantom network.',
    //     note: `Sample Query: Give me the transaction details for hash 0x62f329da96a08117ccf2f3ec607599f0c281126f939437a8b2d17e1a48e63a11 on the Fantom network.`
    // },
    // {
    //     action: 'TRANSACTION_DETAILS_BY_HASH_FOR_CRONOS_NETWORK',
    //     message: 'Give me the transaction details for hash _HASH_ on the Cronos network.',
    //     note: `Sample Query: Give me the transaction details for hash 0xea69c9de0e1bc5ffe4d837ec1367463905d27cacef572fa86c53e634c1d69e49 on the Cronos network.`
    // },
    // {
    //     action: 'TRANSACTION_DETAILS_BY_HASH_FOR_OASYS_NETWORK',
    //     message: 'Give me the transaction details for hash _HASH_ on the Oasys network.',
    //     note: `Sample Query: Give me the transaction details for hash 0xfe9b5fa0e320766b58cb6eebfed2d8c80da2d8ff607c0e7d6315dd1061e83638 on the Oasys network.`
    // },
    // {
    //     action: 'TRANSACTION_DETAILS_BY_HASH_FOR_METER_NETWORK',
    //     message: 'Give me the transaction details for hash _HASH_ on the Meter network.',
    //     note: `Sample Query: Give me the transaction details for hash 0x59e07b58379bd620a3289daf8eed048182546166e82029e02e856230aab52929 on the Meter network.`
    // },
    // {
    //     action: 'TRANSACTION_DETAILS_BY_HASH_FOR_BASE_NETWORK',
    //     message: 'Give me the transaction details for hash _HASH_ on the Base network.',
    //     note: `Sample Query: Give me the transaction details for hash 0x6eb8fa3f45f2bbc1d996daef09a36f6a6ae78e24b9c36c06dc893d1b0850b9bd on the Base network.`
    // },
    // {
    //     action: 'TRANSACTION_DETAILS_BY_HASH_FOR_LINEA_NETWORK',
    //     message: 'Give me the transaction details for hash _HASH_ on the Linea network.',
    //     note: `Sample Query: Give me the transaction details for hash 0x2a373b6d8413520624f014896ded9a40f4f0a91f448891b1119dafd4f677559d on the Linea network.`
    // },
]
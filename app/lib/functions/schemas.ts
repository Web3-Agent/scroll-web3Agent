import { ChatCompletionFunctions } from "openai-edge";
export const functionSchemas: ChatCompletionFunctions[] = [
    {
        name: 'deploy_contract',
        description: 'Deploy a smart contract. This function compile a smart contract to an EVM compatible chain. It returns the contract address, bytecode, and abi. Print contract address, abi and bytecode.  Only call this function in a separate chat message do not call it from a message with other text.',
        parameters: {
            type: 'object',
            description: `This function compile a smart contract to an EVM compatible chain. It returns the contract address, bytecode, and abi. Print contract address, abi and bytecode.  Only call this function in a separate chat message do not call it from a message with other text.`,
            properties: {
                contractName: {
                    type: 'string',
                },
                chainName: {
                    type: 'string',
                    description: 'Name of the EVM compatible chain we are deploying to.  Default to Mumbai if not specified.'
                },
                sourceCode: {
                    "type": "string",
                    "description": "Source code of the smart contract. Use Solidity v0.8.20+ and ensure that it is the full source code and will compile. The source code should be formatted as a single-line string, with all line breaks and quotes escaped to be valid in a JSON context. Specifically, newline characters should be represented as '\\n', and double quotes should be escaped as '\\\"'."
                },
                constructorArgs: {
                    type: 'array',
                    items: {
                        oneOf: [
                            {
                                type: 'string'
                            },
                            {
                                type: 'array',
                                items: {
                                    type: 'string'
                                }
                            }
                        ]
                    },
                    description: 'Arguments for the contract\'s constructor. Each argument can be a string or an array of strings. But the final constructor arguments must be an array.  Can be empty array if the constructor has no arguments.'
                }

            },
            required: ['contractName', 'chainName', 'sourceCode', 'constructorArgs']
        }
    },
    {
        name: 'GET_TOKEN_BALANCE',
        description: 'Get Token Balance',
        parameters: {
            type: 'object',
            description: `This function gets object that have message and data. Data which array of object. Each object contains details of NFTs balance in different network. You need to print this data array in table format. If there is no record in empty data array. Then print that "No NFTs Balance Found!" Only call this function in a separate chat message do not call it from a message with other text.`,
            properties: {
                address: {
                    type: 'string',
                    description: 'Address is crypto wallet address.'
                },
            },
            required: ['address']
        }
    },
    {
        name: 'SWAP_TOKEN',
        description: 'This api take parameters like chainId, src, dst, amount, from and slippage.This will returns url for swap. Do not call this again if any error. Just print the error. Only call this function in a separate chat message do not call it from a message with other text.',
        parameters: {
            type: 'object',
            description: `This will return the details after swap. Print all the response with you got from api. Only call this function in a separate chat message do not call it from a message with other text.`,
            properties: {
                chainId: {
                    type: 'number',
                    description: 'Chain ID of the EVM compatible. Default to 1 if not specified.'
                },
                src: {
                    type: 'string',
                },
                dst: {
                    type: 'string',
                },
                amount: {
                    type: 'number',
                },
                from: {
                    type: 'string',
                },
                slippage: {
                    type: 'number',
                },
            },
            required: ['chainId', 'src', 'dst', 'amount', 'from',]
        }
    },
    {
        name: 'send_amount_to_address',
        description: 'Send Amount to Address',
        parameters: {
            type: 'object',
            description: `This function send amount to address and gets transaction details. It returns message and data. data will have status, from, to and gasUsed, print them all. Only call this function in a separate chat message do not call it from a message with other text.`,
            properties: {
                account: {
                    type: 'string',
                },
                amount: {
                    type: 'number',
                    description: 'Amount that needs to send on given address. Default to amount will be 0.5 if not specified.'
                },
            },
            required: ['account', 'amount']
        }
    },
    {
        name: 'show_my_detailed_account_balance',
        description: 'Get Account Balance',
        parameters: {
            type: 'object',
            description: `This function gets object that have message and data. Data which array of object. Each object contains details of balance in different network. You need to print this data array in table format. If there is no record in empty data array. Then print that "No Account Balance Found!" Only call this function in a separate chat message do not call it from a message with other text.`,
            properties: {
                // account: {
                //     type: 'string',
                // },
                // chainId: {
                //     type: 'number',
                //     description: 'Chain ID of the EVM compatible. Default to 1 if not specified.'
                // },
            },
            required: []
        }
    },
    {
        name: 'GIVE_ME_NFT_BALANCE',
        description: 'Get NFTs Balance for given address',
        parameters: {
            type: 'object',
            description: `This function gets object that have message and data. Data which array of object. Each object contains details of NFTs balance in different network. You need to print this data array in table format. If there is no record in empty data array. Then print that "No NFTs Balance Found!" Only call this function in a separate chat message do not call it from a message with other text.`,
            properties: {
                address: {
                    type: 'string',
                    description: 'Address is crypto wallet address.'
                },
            },
            required: ['address']
        }
    },
    {
        name: 'show_list_of_protocols_for_wallet_address',
        description: 'Returns a list of protocols for wallet address on all networks',
        parameters: {
            type: 'object',
            description: `This function gets object that have message and data. Data which array of object. Each object contains details of list of protocols for wallet address. You need to print this data array in table format. Make sure you print all. If there is no record in empty data array. Then print that "No Protocols Found!" Only call this function in a separate chat message do not call it from a message with other text.`,
            properties: {
                address: {
                    type: 'string',
                    description: 'Address is crypto wallet address.'
                },
            },
            required: ['address']
        }
    },
    {
        name: 'show_portfolio_for_wallet_address',
        description: 'Returns a list of portfolio for wallet address on all networks',
        parameters: {
            type: 'object',
            description: `This function gets object that have message, total and data. Data which array of object. Each object contains details of portfolio for a network. You need to print total first and then this data array in table format. Make sure you print all. If there is no record in empty data array. Then print that "No Portfolio Found!" Only call this function in a separate chat message do not call it from a message with other text.`,
            properties: {
                address: {
                    type: 'string',
                    description: 'Address is crypto wallet address.'
                },
            },
            required: ['address']
        }
    },
    {
        name: 'SHOW_TOKENS_FOR_WALLET_ADDRESS',
        description: 'Returns a list of tokens for wallet address on connected networks',
        parameters: {
            type: 'object',
            description: `This function gets object that have message, total and data. Data which array of object. Each object contains details of tokens for a network. You need to print total first and then this data array in table format. Make sure you print all. If there is no record in empty data array. Then print that "No tokens Found!" Only call this function in a separate chat message do not call it from a message with other text.`,
            properties: {
                address: {
                    type: 'string',
                    description: 'Address is crypto wallet address.'
                },
            },
            required: ['address']
        }
    },
    {
        name: 'show_coins_for_wallet_address',
        description: 'Returns a list of coins for wallet address on all networks',
        parameters: {
            type: 'object',
            description: `This function gets object that have message, total and data. Data which array of object. Each object contains details of coins for a network. You need to print total first and then this data array in table format. Make sure you print all. If there is no record in empty data array. Then print that "No coins Found!" Only call this function in a separate chat message do not call it from a message with other text.`,
            properties: {
                address: {
                    type: 'string',
                    description: 'Address is crypto wallet address.'
                },
            },
            required: ['address']
        }
    },
    {
        name: 'show_top_nft_holder',
        description: 'Get Top NFTs Holders',
        parameters: {
            type: 'object',
            description: `This function gets object that have message and data. Data which array of object. Each object contains details of top NFTs holder in given chain name. You need to print this data array in table format. Make sure you print all. If there is no record in empty data array. Then print that "No Top NFTs H older Found!" Only call this function in a separate chat message do not call it from a message with other text.`,
            properties: {
                chain_name: {
                    type: 'string',
                    description: 'Chain name is crypto network name like mainnet. Take mainnet as default parameter. '
                },
                contract_address: {
                    type: 'string',
                    description: 'Contract address is crypto address which holds the top NFT\'s against a chain.'
                },
            },
            required: ['chain_name', 'contract_address']
        }
    },
    {
        name: 'show_nft_metadata_using_contract_address_token_id_and_chain_name',
        description: 'Get NFT Metadata details using chain name, contract address and token_id.',
        parameters: {
            type: 'object',
            description: `This function gets object that have message and data. Data is object. You need to print each information of data object. Make sure you print all. If there is no record in empty data array. Then print that "No NFT metadata Found!" Only call this function in a separate chat message do not call it from a message with other text.`,
            properties: {
                chain_name: {
                    type: 'string',
                    description: 'Chain name is crypto network name like mainnet. Take mainnet as default parameter. '
                },
                contract_address: {
                    type: 'string',
                    description: 'Contract Address is crypto address.'
                },
                token_id: {
                    type: 'string',
                    description: 'Token id is id of NFT.'
                },
            },
            required: ['chain_name', 'contract_address', 'token_id']
        }
    },
    {
        name: 'show_tokens_by_symbol',
        description: 'Get a list of tokens in all networks with the search symbol.',
        parameters: {
            type: 'object',
            description: `This function gets object that have message and data. Data which array of object. Each object contains details of tokens. You need to print this data array in table format. Make sure you print all. If there is no record in empty data array. Then print that "No Tokens Found!" Only call this function in a separate chat message do not call it from a message with other text.`,
            properties: {
                token_symbol: {
                    type: 'string',
                    description: 'token_symbol is string for search, eg: usdc. Take usdc as default parameter. '
                },
            },
            required: ['token_symbol']
        }
    },
    {
        name: 'get_receipt_by_hash',
        description: 'Get Transaction Receipt',
        parameters: {
            type: 'object',
            description: `This function gets transaction receipt. It returns message and data. data will have status, from, to and gasUsed, print them all. Only call this function in a separate chat message do not call it from a message with other text.`,
            properties: {
                hash: {
                    type: 'string',
                },
            },
            required: ['hash']
        }
    },
    {
        name: 'PROVIDE_TRANSACTION_DETAILS_FOR_NETWORK_BY_HASH',
        description: 'Get Transaction Info',
        parameters: {
            type: 'object',
            description: `This function gets transaction information by transaction hash. It returns message and data. Only call this function in a separate chat message do not call it from a message with other text.`,
            properties: {
                hash: {
                    type: 'string',
                    description: 'A transaction hash is a string of letters and numbers that is generated when a cryptocurrency transaction is initiated. It is a unique identifier that is used to track the transaction on the blockchain. Every transaction that occurs on the blockchain is recorded as a block, and each block has a unique hash.'
                },
            },
            required: ['hash']
        }
    },
    {
        name: 'TRANSACTION_DETAILS_FOR_GRAPH',
        description: 'Get Transaction Count by Day. Please draw a Graph using response data. Array object will have objects and every object will have date and tx_count. Make date key in X axis and tx_count in Y axis.',
        parameters: {
            type: 'object',
            description: `This function gets transaction count by day information. It returns message and data. Only call this function in a separate chat message do not call it from a message with other text. You need to draw bar graph using array data`,
            properties: {
            },
        }
    },
    {
        name: 'GET_STATS',
        description: 'Get stats',
        parameters: {
            type: 'object',
            description: `This function gets stats information. It returns message and data. Only call this function in a separate chat message do not call it from a message with other text. You need to draw bar graph using array data`,
            properties: {
            },
        }
    },
    {
        name: 'GET_TOKEN_DETAILS',
        description: 'Get token details for given token address',
        parameters: {
            type: 'object',
            description: `This function gets token information. It returns message and data. Only call this function in a separate chat message do not call it from a message with other text. You need to draw bar graph using array data`,
            properties: {
                address: {
                    type: 'string',
                    description: 'Address is crypto address of token.'
                },
            },
        }
    },
    {
        name: 'GET_GASLESS_SWAP_ACTIVE_ORDERS',
        description: 'Get gasless swap active order Info',
        parameters: {
            type: 'object',
            description: `This function get gasless swap active order Info using network name. It returns message and data. Only call this function in a separate chat message do not call it from a message with other text.`,
            properties: {
                network: {
                    type: 'string',
                    description: 'Network is blockchain node. In the context of blockchain, a network refers to the interconnected system of nodes (computers or devices) that communicate with each other to maintain and operate the blockchain. It\'s the infrastructure that enables the decentralized nature of blockchain technology.'
                },
            },
            required: ['network']
        }
    },
    {
        name: 'GET_ACTUAL_SETTLEMENT_CONTRACT_ADDRESS',
        description: 'Get actual settlement contract address info',
        parameters: {
            type: 'object',
            description: `This function get actual settlement contract address info using network. It returns message and data. Only call this function in a separate chat message do not call it from a message with other text.`,
            properties: {
                network: {
                    type: 'string',
                    description: 'Network is blockchain node. In the context of blockchain, a network refers to the interconnected system of nodes (computers or devices) that communicate with each other to maintain and operate the blockchain. It\'s the infrastructure that enables the decentralized nature of blockchain technology.'
                },

            },
            required: ['network']
        }
    },
    {
        name: 'PROVIDE_GAS_PRICE_FOR_NETWORK',
        description: 'Provide gas price info for given network name',
        parameters: {
            type: 'object',
            description: `This function provides gas information by network name. It returns message and data. Only call this function in a separate chat message do not call it from a message with other text.`,
            properties: {
                network: {
                    type: 'string',
                    description: 'Network is blockchain node. In the context of blockchain, a network refers to the interconnected system of nodes (computers or devices) that communicate with each other to maintain and operate the blockchain. It\'s the infrastructure that enables the decentralized nature of blockchain technology.'
                },
            },
            required: ['network']
        }
    },
    {
        name: 'PROVIDE_BLOCK_DETAILS_BY_BLOCK_NUMBER_FOR_NETWORK',
        description: 'Provide block details by block number. If block number is not given make block number latest.  It returns message and data. Make sure you print all',
        parameters: {
            type: 'object',
            description: `This function provides block details by number generated in blockchain. If block not is not given then make block number as latest. It returns message and data. Only call this function in a separate chat message do not call it from a message with other text.`,
            properties: {
                blockNumber: {
                    type: 'number',
                    description: 'blockNumber is number for block present in blockchain. Default will be latest'
                },
            },
            required: ['blockNumber']
        }
    },
    {
        name: 'PROVIDE_BLOCK_DETAILS_BY_BLOCK_HASH_FOR_NETWORK',
        description: 'Provide block details by block number for given network name. If block number is not given make block number latest.  It returns message and data. Make sure you print all',
        parameters: {
            type: 'object',
            description: `This function provides block details by number generated in blockchain by network name. If block not is not given then make block number as latest. It returns message and data. Only call this function in a separate chat message do not call it from a message with other text.`,
            properties: {
                hash: {
                    type: 'string',
                    description: 'A transaction hash is a string of letters and numbers that is generated when a cryptocurrency transaction is initiated. It is a unique identifier that is used to track the transaction on the blockchain. Every transaction that occurs on the blockchain is recorded as a block, and each block has a unique hash.'
                },
            },
            required: ['hash']
        }
    },
    {
        name: 'get_coins_list',
        description: 'Get Complete List of Coins',
        parameters: {
            type: 'object',
            description: `This function gets list of coins. It returns message and data. Only call this function in a separate chat message do not call it from a message with other text.`,
            properties: {
                chainId: {
                    type: 'number',
                    description: 'Chain ID of the EVM compatible. Default to 1 if not specified.'
                },
            },
            required: ['chainId']
        }
    },
]

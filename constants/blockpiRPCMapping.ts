import { configs } from "@/configs"

export const BLOCK_PI_RPC_MAPPING = {
    POLYGON: {
        RPC_URL: 'https://polygon.blockpi.network/v1/rpc/BLOCK_PI_POLYGON_RPC_KEY',
        GAS_PRICE_METHOD: 'eth_gasPrice',
        BLOCK_DETAILS_BY_NUMBER_METHOD: 'eth_getBlockByNumber',
        BLOCK_NUMBER_METHOD: 'eth_blockNumber',
        TRANSACTION_DETAILS_BY_HASH_METHOD: 'eth_getTransactionByHash',
        BLOCK_DETAILS_BY_HASH_METHOD: 'eth_getBlockByHash',
    },
    ETHEREUM: {
        RPC_URL: 'https://ethereum.blockpi.network/v1/rpc/BLOCK_PI_ETHEREUM_RPC_KEY',
        GAS_PRICE_METHOD: 'eth_gasPrice',
        BLOCK_DETAILS_BY_NUMBER_METHOD: 'eth_getBlockByNumber',
        BLOCK_NUMBER_METHOD: 'eth_blockNumber',
        TRANSACTION_DETAILS_BY_HASH_METHOD: 'eth_getTransactionByHash',
        BLOCK_DETAILS_BY_HASH_METHOD: 'eth_getBlockByHash',
    },
    KLAYTN: {
        RPC_URL: 'https://klaytn.blockpi.network/v1/rpc/BLOCK_PI_KLAYTN_RPC_KEY',
        GAS_PRICE_METHOD: 'klay_gasPrice',
        BLOCK_DETAILS_BY_NUMBER_METHOD: 'klay_getBlockByNumber',
        BLOCK_NUMBER_METHOD: 'klay_blockNumber',
        TRANSACTION_DETAILS_BY_HASH_METHOD: 'klay_getTransactionByHash',
        BLOCK_DETAILS_BY_HASH_METHOD: 'klay_getBlockByHash',
    },
    BSC: {
        RPC_URL: 'https://bsc.blockpi.network/v1/rpc/BLOCK_PI_BSC_RPC_KEY',
        GAS_PRICE_METHOD: 'eth_gasPrice',
        BLOCK_DETAILS_BY_NUMBER_METHOD: 'eth_getBlockByNumber',
        BLOCK_NUMBER_METHOD: 'eth_blockNumber',
        TRANSACTION_DETAILS_BY_HASH_METHOD: 'eth_getTransactionByHash',
        BLOCK_DETAILS_BY_HASH_METHOD: 'eth_getBlockByHash',
    },
    ARBITRUM: {
        RPC_URL: 'https://arbitrum.blockpi.network/v1/rpc/BLOCK_PI_ARBITRUM_RPC_KEY',
        GAS_PRICE_METHOD: 'eth_gasPrice',
        BLOCK_DETAILS_BY_NUMBER_METHOD: 'eth_getBlockByNumber',
        BLOCK_NUMBER_METHOD: 'eth_blockNumber',
        TRANSACTION_DETAILS_BY_HASH_METHOD: 'eth_getTransactionByHash',
        BLOCK_DETAILS_BY_HASH_METHOD: 'eth_getBlockByHash',
    },
    OPTIMISM: {
        RPC_URL: 'https://optimism.blockpi.network/v1/rpc/BLOCK_PI_OPTIMISM_RPC_KEY',
        GAS_PRICE_METHOD: 'eth_gasPrice',
        BLOCK_DETAILS_BY_NUMBER_METHOD: 'eth_getBlockByNumber',
        BLOCK_NUMBER_METHOD: 'eth_blockNumber',
        TRANSACTION_DETAILS_BY_HASH_METHOD: 'eth_getTransactionByHash',
        BLOCK_DETAILS_BY_HASH_METHOD: 'eth_getBlockByHash',
    },
    SCROLL: {
        RPC_URL: 'https://scroll.blockpi.network/v1/rpc/BLOCK_PI_SCROLL_RPC_KEY',
        GAS_PRICE_METHOD: 'eth_gasPrice',
        BLOCK_DETAILS_BY_NUMBER_METHOD: 'eth_getBlockByNumber',
        BLOCK_NUMBER_METHOD: 'eth_blockNumber',
        TRANSACTION_DETAILS_BY_HASH_METHOD: 'eth_getTransactionByHash',
        BLOCK_DETAILS_BY_HASH_METHOD: 'eth_getBlockByHash',
    },
    GNOSIS: {
        RPC_URL: 'https://gnosis.blockpi.network/v1/rpc/BLOCK_PI_GNOSIS_RPC_KEY',
        GAS_PRICE_METHOD: 'eth_gasPrice',
        BLOCK_DETAILS_BY_NUMBER_METHOD: 'eth_getBlockByNumber',
        BLOCK_NUMBER_METHOD: 'eth_blockNumber',
        TRANSACTION_DETAILS_BY_HASH_METHOD: 'eth_getTransactionByHash',
        BLOCK_DETAILS_BY_HASH_METHOD: 'eth_getBlockByHash',
    },
    AVALANCHE: {
        RPC_URL: 'https://avalanche.blockpi.network/v1/rpc/BLOCK_PI_AVALANCHE_RPC_KEY',
        GAS_PRICE_METHOD: 'eth_gasPrice',
        BLOCK_DETAILS_BY_NUMBER_METHOD: 'eth_getBlockByNumber',
        BLOCK_NUMBER_METHOD: 'eth_blockNumber',
        TRANSACTION_DETAILS_BY_HASH_METHOD: 'eth_getTransactionByHash',
        BLOCK_DETAILS_BY_HASH_METHOD: 'eth_getBlockByHash',
    },
    FANTOM: {
        RPC_URL: 'https://fantom.blockpi.network/v1/rpc/BLOCK_PI_FANTOM_RPC_KEY',
        GAS_PRICE_METHOD: 'eth_gasPrice',
        BLOCK_DETAILS_BY_NUMBER_METHOD: 'eth_getBlockByNumber',
        BLOCK_NUMBER_METHOD: 'eth_blockNumber',
        TRANSACTION_DETAILS_BY_HASH_METHOD: 'eth_getTransactionByHash',
        BLOCK_DETAILS_BY_HASH_METHOD: 'eth_getBlockByHash',
    },
    CRONOS: {
        RPC_URL: 'https://cronos.blockpi.network/v1/rpc/BLOCK_PI_CRONOS_RPC_KEY',
        GAS_PRICE_METHOD: 'eth_gasPrice',
        BLOCK_DETAILS_BY_NUMBER_METHOD: 'eth_getBlockByNumber',
        BLOCK_NUMBER_METHOD: 'eth_blockNumber',
        TRANSACTION_DETAILS_BY_HASH_METHOD: 'eth_getTransactionByHash',
        BLOCK_DETAILS_BY_HASH_METHOD: 'eth_getBlockByHash',
    },
    OASYS: {
        RPC_URL: 'https://oasys.blockpi.network/v1/rpc/BLOCK_PI_OASYS_RPC_KEY',
        GAS_PRICE_METHOD: 'eth_gasPrice',
        BLOCK_DETAILS_BY_NUMBER_METHOD: 'eth_getBlockByNumber',
        BLOCK_NUMBER_METHOD: 'eth_blockNumber',
        TRANSACTION_DETAILS_BY_HASH_METHOD: 'eth_getTransactionByHash',
        BLOCK_DETAILS_BY_HASH_METHOD: 'eth_getBlockByHash',
    },
    METER: {
        RPC_URL: 'https://meter.blockpi.network/v1/rpc/BLOCK_PI_METER_RPC_KEY',
        GAS_PRICE_METHOD: 'eth_gasPrice',
        BLOCK_DETAILS_BY_NUMBER_METHOD: 'eth_getBlockByNumber',
        BLOCK_NUMBER_METHOD: 'eth_blockNumber',
        TRANSACTION_DETAILS_BY_HASH_METHOD: 'eth_getTransactionByHash',
        BLOCK_DETAILS_BY_HASH_METHOD: 'eth_getBlockByHash',
    },
    BASE: {
        RPC_URL: 'https://base.blockpi.network/v1/rpc/BLOCK_PI_BASE_RPC_KEY',
        GAS_PRICE_METHOD: 'eth_gasPrice',
        BLOCK_DETAILS_BY_NUMBER_METHOD: 'eth_getBlockByNumber',
        BLOCK_NUMBER_METHOD: 'eth_blockNumber',
        TRANSACTION_DETAILS_BY_HASH_METHOD: 'eth_getTransactionByHash',
        BLOCK_DETAILS_BY_HASH_METHOD: 'eth_getBlockByHash',
    },
    LINEA: {
        RPC_URL: 'https://linea.blockpi.network/v1/rpc/BLOCK_PI_LINEA_RPC_KEY',
        GAS_PRICE_METHOD: 'eth_gasPrice',
        BLOCK_DETAILS_BY_NUMBER_METHOD: 'eth_getBlockByNumber',
        BLOCK_NUMBER_METHOD: 'eth_blockNumber',
        TRANSACTION_DETAILS_BY_HASH_METHOD: 'eth_getTransactionByHash',
        BLOCK_DETAILS_BY_HASH_METHOD: 'eth_getBlockByHash',
    },
}
export const BLOCK_PI_RPC_KEY_MAPPING = {
    POLYGON: 'BLOCK_PI_POLYGON_RPC_KEY',
    ETHEREUM: 'BLOCK_PI_ETHEREUM_RPC_KEY',
    KLAYTN: 'BLOCK_PI_KLAYTN_RPC_KEY',
    BSC: 'BLOCK_PI_BSC_RPC_KEY',
    ARBITRUM: 'BLOCK_PI_ARBITRUM_RPC_KEY',
    OPTIMISM: 'BLOCK_PI_OPTIMISM_RPC_KEY',
    SCROLL: 'BLOCK_PI_SCROLL_RPC_KEY',
    GNOSIS: 'BLOCK_PI_GNOSIS_RPC_KEY',
    AVALANCHE: 'BLOCK_PI_AVALANCHE_RPC_KEY',
    FANTOM: 'BLOCK_PI_FANTOM_RPC_KEY',
    CRONOS: 'BLOCK_PI_CRONOS_RPC_KEY',
    OASYS: 'BLOCK_PI_OASYS_RPC_KEY',
    METER: 'BLOCK_PI_METER_RPC_KEY',
    BASE: 'BLOCK_PI_BASE_RPC_KEY',
    LINEA: 'BLOCK_PI_LINEA_RPC_KEY',
}

export const getNetworkConfig = (newtork: string) => {
    if (!newtork) return undefined;
    console.log({ newtork })
    newtork = newtork.toUpperCase();
    let networkConfig = BLOCK_PI_RPC_MAPPING[newtork];
    console.log("1-> ", { networkConfig })
    if (networkConfig && networkConfig.RPC_URL) {
        const replaceKey = BLOCK_PI_RPC_KEY_MAPPING[newtork]
        console.log({ replaceKey, key: configs[replaceKey] })
        networkConfig.RPC_URL = networkConfig.RPC_URL.replace(replaceKey, configs[replaceKey]);
    }
    return networkConfig;
}

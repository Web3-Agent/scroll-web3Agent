/**
 * Query keys to identify & invalidate queries
 * after a tx
 */
export const QueryKey = {
    BALANCE: 'balance', // native token (LYX) balance
    ASSETS_LIST: 'assets',
    ASSET_DATA: 'assetData',
    NFTS_LIST: 'listNfts',
    UP_METADATA: 'upMetadata',
    UP_PERMISSIONED: 'upPermissioned',
    TX_RECEIPT: 'txReceipt',
    VAULTS_LIST: 'vaults',
    LEGACY_ASSET_DATA: 'legacyAssetData',
};
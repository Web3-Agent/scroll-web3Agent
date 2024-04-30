
import web3 from '../../utils/web3';


/**
 * Queries for transaction receipt & returns status as well
 * as tx receipt, if available
 */
const getTxReceipt = async ({ hash }) => {
    const receipt = await web3.eth.getTransactionReceipt(hash);
    console.log({ receipt })
    let data: any = { status: 'pending' };

    if (receipt) {
        if (receipt.status) {
            data.status = 'success';
        } else {
            data.status = 'error';
        }
        data.from = receipt.from;
        data.to = receipt.to;
        data.gasUsed = receipt.gasUsed?.toString();
    }

    return data;
};

/**
 * Gets a tx receipts given tx hash but only executes a
 * network call if status was pending. Otherwise, tx receipt was
 * previously fetched & is stored in db
 */
export const useGetTxReceipt = (hash: string) => {
    return getTxReceipt({ hash })
};
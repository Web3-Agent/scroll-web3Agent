
import web3 from '../../utils/web3';


const getAddressBalance = async ({ address }) => {
    const wei = await web3.eth.getBalance(address);
    const lyx = parseFloat(web3.utils.fromWei(wei, 'ether')).toFixed(2);
    return { wei, lyx };
};

/**
 * Fetches native token balance of an address
 */
export const useGetBalance = ({ address }) => {
    return getAddressBalance({ address })
};

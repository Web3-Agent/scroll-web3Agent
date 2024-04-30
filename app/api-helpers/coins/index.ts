// import axiosHelper from "@app/api-helpers/axios/axiosHelper"
import { configs } from "@/configs"
import axiosHelper from "../axios/axiosHelper";

export const getAllCoins = async () => {
    try {
        const { data } = await axiosHelper(configs.COINGECKO_BASE_URL + '/api/v3/coins/list');
        return data
    } catch (error) {
        console.log({ error })
        return error
    }
}
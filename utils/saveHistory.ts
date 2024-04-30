import { NFTStorage } from 'nft.storage'
import { configs } from '../configs'

const apiKey = configs.NEXT_PUBLIC_NFT_STORAGE_API_KEY!
const client = new NFTStorage({ token: apiKey })
export async function storeJSON(payload: any) {
    const cid = await client.storeBlob(new Blob([JSON.stringify(payload)], { type: 'application/json' }))
    console.log('Stored JSON with CID:', cid)
    return cid
}
export async function fetchJSON(cid: string) {
    const response = await fetch(`https://ipfs.io/ipfs/${cid}`)
    const data = await response.json()
    console.log('Retrieved JSON data:', data)
    return data
}
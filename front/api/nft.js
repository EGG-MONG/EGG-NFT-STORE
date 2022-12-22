import { baseAPI } from "./core";

// 최대한 REST API 방식에 맞춰서 해보려고 노력 중

const query = "nft"

export const createNft = async (nftObj, blockHash, txHash) => {
    return await baseAPI.post(`/${query}`, {nftObj, blockHash, txHash});
}

// 기본 값 null로 null이 아닌 업데이트 항목만 객체로 만들어서 업데이트 필드에 넣는다.
// 매개변수가 3개를 넘을 경우 객체로 받는 편이 좋다 순서가 틀려서 값이 잘못 들어가는 등의 잘못을 방지하기 좋다. 
export const updateNft = async ({tokenId, state = null, owner = null, price = null, transaction = null, transfer = null}) => {
    return await baseAPI.put(`/${query}`, {tokenId, state, owner, price, transaction, transfer});
}

export const getNftAll = async () => {
    return await baseAPI.get(`/${query}`);
}
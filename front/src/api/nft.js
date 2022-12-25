import { baseAPI, API } from "./core";

// 최대한 REST API 방식에 맞춰서 해보려고 노력 중

const query = "nft"

export const add = async (nft, transaction, transfer) => {
    return await baseAPI.post(`/${query}`, {nft, transaction, transfer});
}

// 기본 값 null로 null이 아닌 업데이트 항목만 객체로 만들어서 업데이트 필드에 넣는다.
export const modify = async (tokenId, transaction, transfer) => {
    return await baseAPI.put(`/${query}`, {tokenId, transaction, transfer});
}

export const getAll = async () => {
    return await baseAPI.get(`/${query}`);
}

export const getNftJson = async (nftJon) => {
    return await API.get(nftJon);
}
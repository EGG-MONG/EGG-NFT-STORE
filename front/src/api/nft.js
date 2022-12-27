import { baseAPI, API } from "./core";

// 최대한 REST API 방식에 맞춰서 해보려고 노력 중

const query = "nft"

export const add = async (nft, transaction, transfer) => {
    return await baseAPI.post(`/${query}`, {nft, transaction, transfer});
}

export const modifyList = async (tokenId, transaction, transfer) => {
    return await baseAPI.put(`/${query}/list`, {tokenId, transaction, transfer});
}

export const modifySale = async (tokenId, transaction, transferTf, transferSale) => {
    return await baseAPI.put(`/${query}/sale`, {tokenId, transaction, transferTf, transferSale});
}

export const getAll = async () => {
    return await baseAPI.get(`/${query}`);
}

export const getNftJson = async (nftJon) => {
    return await API.get(nftJon);
}
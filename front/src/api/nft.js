import { baseAPI, API } from "./core";

// 최대한 REST API 방식에 맞춰서 해보려고 노력 중

const query = "nft"

export const add = async (_nftObj, _transactionObj, _transferObj) => {
    return await baseAPI.post(`/${query}`, {_nftObj, _transactionObj, _transferObj});
}

// 기본 값 null로 null이 아닌 업데이트 항목만 객체로 만들어서 업데이트 필드에 넣는다.
export const modify = async (_tokenId, _nft) => {
    return await baseAPI.put(`/${query}`, {_tokenId, _nft});
}

export const getAll = async () => {
    return await baseAPI.get(`/${query}`);
}

export const getTokenURI = async (_tokenURI) => {
    return await API.get(_tokenURI);
}
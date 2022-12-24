import { baseAPI, API } from "./core";

// 최대한 REST API 방식에 맞춰서 해보려고 노력 중

const query = "favorites"

// 생성과 업데이트를 구분할 수 없기에 add와 modify를 구분하지 않는다.
export const modify = async (_wallet, _favorites) => {
    return await baseAPI.put(`/${query}`, {_wallet, _favorites});
}

export const getAll = async (_wallet) => {
    return await baseAPI.get(`/${query}`, {_wallet});
}
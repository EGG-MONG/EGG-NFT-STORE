import { NftAPI, SUCCESS } from "../api";
import { LIST, ADD, MODIFY } from './common';
import produce from 'immer';

function getNftList() {

  return async (dispatch, getState) => {

    const result = await NftAPI.getNftAll();

    const nftList = result?.nftList;

    if (result?.ret === SUCCESS) {
      dispatch({ type: LIST, payload: { nftList } });
    }
  };
}

function addNft(_nftJsonObj, _transaction, _transfer){
  return async (dispatch, getState) => {
    const result = await NftAPI.addNft(_nftJsonObj, _transaction, _transfer);

    if (result?.ret === SUCCESS) {
      // dispatch({ type: LIST, payload: { nftList } });
    }
  }
}


export { getNftList, };

const init = {
    list : []
}

function nft(state = init, action) {
    const {type, payload} = action;
    switch (type) {
        case LIST:
            return produce(state, draft => {
              draft.list = payload.nftList;
            });
        case ADD:
            return produce(state, draft => {
              draft.list.push(payload.nft);
            });
        case MODIFY:
            return produce(state, draft => {
              draft.list.push(payload.nft);
            });
        default:
            return state;
    }
}

export default nft;
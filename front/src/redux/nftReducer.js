import { NftAPI, SUCCESS } from "../api";
import { NFT_LIST, NFT_ADD, NFT_MODIFY, NFT_MAKER } from './common';
import produce from 'immer';

function addNft(_tokenURI, _transaction, _transfer){
  return async (dispatch, getState) => {
    console.log({_tokenURI});
    // const nft = await NftAPI.getNftJson(_tokenURI);

    // console.log(nftJsonStr);

    let nft = await NftAPI.getNftJson(_tokenURI);
    console.log({nft});
    // nft스키마에서 사용하지 않는 dna, compiler 삭제
    nft = deleteNftAttr(nft);

    // nft스키마에 사용하는 속성 값 삽입
    nft = addNftAttr({_nft : nft, _tokenURI, _transaction, _transfer});
    console.log({nft});
    
    const result = await NftAPI.add(nft, _transaction, _transfer);

    if (result?.ret === SUCCESS) {
      dispatch({ type: NFT_ADD, payload: { nft : result.nft } });
    }
  }
}

function getNftList() {
  return async (dispatch, getState) => {

    const result = await NftAPI.getAll();

    if (result?.ret === SUCCESS) {
      const list = result?.list;
      dispatch({ type: NFT_LIST, payload: { list } });
    }
  };
}

function modifyNft(_tokenId, _transaction, _transfer){
  return async (dispatch, getState) => {
    const result = await NftAPI.modify(_tokenId, _transaction, _transfer);
    
    if (result?.ret === SUCCESS) {
      const nft = result.nft;
      dispatch({ type: NFT_MODIFY, payload: { nft } });
    }
  };
}

function deleteNftAttr(_nft){
  const nft = {..._nft};
  delete nft.dna;
  delete nft.compiler;
  return nft;
}

function addNftAttr({_nft, _tokenURI, _transaction, _transfer}){
  const nft = {
    ... _nft,
    tokenId : _transfer.tokenId,
    owner : _transfer.to,
    state : _transfer.state,
    price : _transfer.price,
    maker :  NFT_MAKER,
    uri : _tokenURI,
    transactions : [_transaction],
    transfers : [_transfer]
  };

  return nft;
}


export { addNft, getNftList, modifyNft};

const init = {
    list : []
}

function nft(state = init, action) {
    const {type, payload} = action;
    switch (type) {

        case NFT_ADD:
            return produce(state, draft => {
              draft.list.push(payload.nft);
            });
        case NFT_LIST:
            return produce(state, draft => {
              draft.list = payload.list;
            });
        case NFT_MODIFY:
            return produce(state, draft => {
              const nft = payload.nft;
              const list = draft.list.map(item => {
                if(item.tokenId === nft.tokenId) return nft
                else return item;
              });
              draft.list = list;
            });
        default:
            return state;
    }
}

export default nft;
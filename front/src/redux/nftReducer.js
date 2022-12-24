import { NftAPI, SUCCESS } from "../api";
import { LIST, ADD, MODIFY, MAKER } from './common';
import produce from 'immer';

function addNft(_tokenURI, _transaction, _transfer){
  return async (dispatch, getState) => {
    
    const nftJsonStr = await NftAPI.getTokenURI(_tokenURI);

    console.log({nftJsonStr});

    let nft = JSON.parse(nftJsonStr);

    // nft스키마에서 사용하지 않는 dna, compiler 삭제
    nft = deleteNftAttr(nft);

    // nft스키마에 사용하는 속성 값 삽입
    nft = addNftAttr({_nft : nft, _tokenURI, _transaction, _transfer});
    
    
    const result = await NftAPI.add(nft, _transaction, _transfer);

    if (result?.ret === SUCCESS) {
      dispatch({ type: ADD, payload: { nft } });
    }
  }
}

function getNftList() {
  return async (dispatch, getState) => {

    const result = await NftAPI.getAll();

    if (result?.ret === SUCCESS) {
      const list = result?.list;
      dispatch({ type: LIST, payload: { list } });
    }
  };
}

function modifyNft(_tokenId, _nft){
  return async (dispatch, getState) => {
    const result = await NftAPI.modify(_tokenId, _nft);
    
    if (result?.ret === SUCCESS) {
      const nft = result.nft;
      dispatch({ type: MODIFY, payload: { nft } });
    }
  };
}

function deleteNftAttr(_nft){
  const nft = {..._nft};
  delete nft.dna;
  delete nft.compiler;
  return nft;
}

function addNftAttr({_ntf, _tokenURI, _transaction, _transfer}){
  const nft = {..._ntf};

  nft.tokenId = _transfer.tokenId;
  nft.owner = _transfer.to;
  nft.state = _transfer.state;
  nft.price = _transfer.price;
  
  nft.maker = MAKER;

  nft.uri = _tokenURI;

  nft.transactions = [_transaction];

  nft.transfer = [_transfer];

  return nft;
}


export { addNft, getNftList, modifyNft};

const init = {
    list : []
}

function nft(state = init, action) {
    const {type, payload} = action;
    switch (type) {

        case ADD:
            return produce(state, draft => {
              draft.list.push(payload.nft);
            });
        case LIST:
            return produce(state, draft => {
              draft.list = payload.list;
            });
        case MODIFY:
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
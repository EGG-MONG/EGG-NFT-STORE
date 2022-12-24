import { FavoritesAPI, SUCCESS } from "../api";
import { LIST, MODIFY } from './common';
import produce from 'immer';



function addFavorites(_wallet, _favorites){
  return async (dispatch, getState) => {

    const result = await NftAPI.MODIFY(_wallet, _favorites);

    if (result?.ret === SUCCESS) {
      dispatch({ type: ADD, payload: { nft } });
    }
  }
}

function getFavoritesList() {
  return async (dispatch, getState) => {

    const result = await FavoritesAPI.getAll(_wallet);

    if (result?.ret === SUCCESS) {
      const { wallet, favorites } = result;
      dispatch({ type: LIST, payload: { wallet, favorites } });
    }
  };
}

function deleteFavorites(_wallet, _favorites){
  return async (dispatch, getState) => {

    const result = await FavoritesAPI.modify(_wallet, _favorites);
    
    if (result?.ret === SUCCESS) {
      const nft = result.nft;
      dispatch({ type: MODIFY, payload: { _wallet, _favorites } });
    }
  };
}

export { addFavorites, getFavoritesList, deleteFavorites};

const init = {
    wallet : null,
    favorites : []
}

function nft(state = init, action) {
    const {type, payload} = action;
    switch (type) {
        case LIST:
            return produce(state, draft => {
              draft.favorites = payload.favorites;
            });
        case ADD:
            return produce(state, draft => {
              draft.favorites.push(payload.nft);
            });
        case MODIFY:
            return produce(state, draft => {
              const nft = payload.nft;
              const favorites = draft.favorites.map(item => {
                if(item.tokenId === nft.tokenId) return nft
                else return item;
              });
              draft.favorites = favorites;
            });
        default:
            return state;
    }
}

export default nft;
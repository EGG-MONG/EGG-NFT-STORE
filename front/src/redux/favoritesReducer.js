import { FavoritesAPI, SUCCESS } from "../api";
import { FAVORITES_MODIFY, FAVORITES_LIST, } from "./common";
import produce from 'immer';

function addFavorite(_account, _favorites, _tokenId){
  return async (dispatch, getState) => {
    const favorites = _favorites;
    favorites.push(_tokenId);
    const result = await FavoritesAPI.modify(_account, favorites);

    if (result?.ret === SUCCESS) {
      dispatch({ type: FAVORITES_MODIFY, payload: { favorites } });
    }
  }
}

function getFavoritesList(_account) {
  return async (dispatch, getState) => {

    const result = await FavoritesAPI.getAll(_account);

    if (result?.ret === SUCCESS) {
      const { account, favorites } = result;
      dispatch({ type: FAVORITES_LIST, payload: { account, favorites } });
    }else{
      const account = _account;
      const favorites = [];
      dispatch({ type: FAVORITES_LIST, payload: { account, favorites } });
    }
  };
}

function deleteFavorites(_account, _favorites, _tokenId){
  return async (dispatch, getState) => {

    const favorites = _favorites.map(item => {
      if(item !== _tokenId) return item;
    })
    const result = await FavoritesAPI.modify(_account, favorites);
    
    if (result?.ret === SUCCESS) {
      dispatch({ type: FAVORITES_MODIFY, payload: { favorites } });
    }
  };
}

export { addFavorite, getFavoritesList, deleteFavorites};

const init = {
    account : null,
    favorites : []
}

function favorites(state = init, action) {
    const {type, payload} = action;
    switch (type) {
        case FAVORITES_MODIFY:
            return produce(state, draft => {
              draft.favorites = payload.favorites;
            });
        case FAVORITES_LIST:
            return produce(state, draft => {
              draft.account = payload.account;
              draft.favorites = payload.favorites;
            });
        default:
            return state;
    }
}

export default favorites;
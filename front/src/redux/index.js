import { combineReducers } from "redux";

import nft from "./nftReducer";
import contract from "./contractReducer";
import favorites from "./favoritesReducer";

import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage/session"; // session storage
// import storage from "redux-persist/lib/storage" // local storage

const persistConfig = {
    key: "react",
    storage,
    whitelist: ['nft', 'contract', 'favorites' ]
};

const rootReducer = combineReducers({ nft, contract, favorites});

export default persistReducer(persistConfig, rootReducer);
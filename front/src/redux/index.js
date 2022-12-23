import { combineReducers } from "redux";
import block from "./blockReducer";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage/session"; // session storage
// import storage from "redux-persist/lib/storage" // local storage

const persistConfig = {
    key: "react",
    storage,
    whitelist: ['block' ]
};

const rootReducer = combineReducers({ block, });

export default persistReducer(persistConfig, rootReducer);
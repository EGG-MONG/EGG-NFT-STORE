import { CONTRACT_GET, ACCOUT_CHANGE, EVENT_CHECK } from "./common";
import produce from "immer";
import Web3 from "web3/dist/web3.min";
import EggToken from "../contracts/EggToken.json";
import SaleContract from "../contracts/SaleContract.json";
import { addNft, modifyNft } from "./nftReducer";
import { ethers } from "ethers";

function getContract() {
  return async (dispatch, getState) => {
    // web3 객체
    const web3 = await new Web3(window.ethereum);
    console.log({ web3 });

    const [address] = await window.ethereum.request({
      method: "eth_requestAccounts",
    });

    // 지갑
    const { utils } = ethers;
    const account = utils.getAddress(address);
    console.log({ account });

    const networkId = await web3.eth.net.getId();
    // console.log({networkId});

    const eggCA = EggToken.networks[networkId].address;
    // console.log({eggCA});

    const saleCA = SaleContract.networks[networkId].address;
    console.log({ saleCA });

    const eggDeployed = new web3.eth.Contract(EggToken.abi, eggCA);
    // console.log({eggDeployed});

    const saleDeployed = new web3.eth.Contract(SaleContract.abi, saleCA);
    console.log({ saleDeployed });

    if (!getState().contract.eventCheck)
      eventSubscribe(dispatch, utils, web3, eggDeployed, saleDeployed);

    dispatch({
      type: CONTRACT_GET,
      payload: {
        web3,
        account,
        networkId,
        eggCA,
        eggDeployed,
        saleCA,
        saleDeployed,
      },
    });
  };
}

async function eventSubscribe(
  dispatch,
  utils,
  web3,
  eggDeployed,
  saleDeployed
) {
  console.log("eventSubscribe");
  await window.ethereum.on("accountsChanged", (accountArr) => {
    const account = utils.getAddress(accountArr[0]);
    console.log({ accountsChanged: account });
    dispatch({ type: ACCOUT_CHANGE, payload: { account } });
    // dispatch(getFavoritesList(account));
  });

  await window.ethereum.on("disconnect", (accountArr) => {
    const account = utils.getAddress(accountArr[0]);
    console.log({ disconnect: account });
    dispatch({ type: ACCOUT_CHANGE, payload: { account } });
    // dispatch(getFavoritesList(account));
  });

  // await eggDeployed.events.Minting(() => {
  // }).on('data', async function(event){
  //     console.log({event});
  //     const tokenURI = init.eggToken.metadataURI+"/"+event.returnValues.tokenId+".json";
  //     console.log({tokenURI});

  //     const transaction = await web3.eth.getTransaction(event.transactionHash);
  //     console.log({transaction});

  //     const { tokenId, state, price, from, to } = event.returnValues;

  //     const transfer = { id : event.id, tokenId, state, price, from, to };
  //     console.log({transfer});
  //     dispatch(addNft(tokenURI, transaction, transfer));
  // });

  dispatch({ type: EVENT_CHECK });
}

export { getContract };

const init = {
  web3: null,
  account: null,
  networkId: null,
  eggToken: {
    name: "Egg Token",
    symbol: "ETK",
    metadataURI: "http://3.36.72.252:8000/metadatas",
    CA: null,
    deployed: null,
  },
  saleContract: {
    // abi : null,
    CA: null,
    deployed: null,
  },
  eventCheck: false,
};

function contract(state = init, action) {
  const { type, payload } = action;
  switch (type) {
    case CONTRACT_GET:
      return produce(state, (draft) => {
        draft.web3 = payload.web3;
        draft.account = payload.account;
        draft.networkId = payload.networkId;

        draft.eggToken.CA = payload.eggCA;
        draft.eggToken.deployed = payload.eggDeployed;

        draft.saleContract.CA = payload.saleCA;
        draft.saleContract.deployed = payload.saleDeployed;
      });
    case ACCOUT_CHANGE:
      return produce(state, (draft) => {
        draft.account = payload.account;
      });
    case EVENT_CHECK:
      return produce(state, (draft) => {
        draft.eventCheck = true;
      });
    default:
      return state;
  }
}

export default contract;

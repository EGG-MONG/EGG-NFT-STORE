import styled from "styled-components";
import EggToken from "../contracts/EggToken.json";
import SaleContract from "../contracts/SaleContract.json";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getContract } from "../redux/contractReducer";

const Minting = (/*{ web3, account }*/) => {
  const dispatch = useDispatch();
  const web3 = useSelector((state) => state.contract.web3);
  const account = useSelector((state) => state.contract.account);
  const eggToken = useSelector((state) => state.contract.eggToken);
  const saleContract = useSelector((state) => state.contract.saleContract);
  

  // const [deployed, setDeployed] = useState(null);

  const minting = async () => {
    const result = await eggToken.deployed.methods.mintToken(saleContract.CA, 1).send({ from: account, value : 100 });
    console.log(result);
  };

  useEffect(() => async () => {
    // if (deployed) return;

    if(!eggToken.CA){
      dispatch(getContract());
    }

    console.log({web3, account});
    console.log({eggToken});
    console.log({saleContract});

    // const networkId = await web3.eth.net.getId();
    // console.log({networkId});
    // const CA = EggToken.networks[networkId].address;
    // console.log({CA});

    // const { abi } = EggToken;

    
    // const Deployed = new web3.eth.Contract(abi, CA);
    // console.log({Deployed});

    web3.eth.subscribe("logs", { address: eggToken.CA }).on("data", (log) => {
      const params = [{ type: "uint256", name: "count" }];
      const value = web3.eth.abi.decodeLog(params, log.data);

      //   console.log({ tokenId: value.tokenId });
      //   console.log({ state: value.state });
      //   console.log(value);
    });
  });

  return (
    <>
      <MintingArea>
        <img
          src="/Img/loading.gif"
          alt="loadingImg"
          onClick={minting}
          style={{ width: "700px", cursor: "pointer" }}
        />
        <Price>only 100wei</Price>
      </MintingArea>
    </>
  );
};

const MintingArea = styled.div`
  width: inherit;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-top: 1rem;
`;

const Price = styled.h1`
  font-size: 3rem;
  &:hover {
    color: plum;
  }
`;
export default Minting;

import styled from "styled-components";
import EggToken from "../contracts/EggToken.json";
import SaleContract from "../contracts/SaleContract.json";
import { useEffect, useState } from "react";

const Minting = ({ web3, account }) => {
  const [deployed, setDeployed] = useState(null);
  const [saleCA, setSaleCA] = useState(null);

  const minting = async () => {
    const result = await deployed.methods
      .mintToken(saleCA, 4)
      .send({ from: account, value: 100 });
  };

  useEffect(() => async () => {
    const networkId = await web3.eth.net.getId();

    const CA = EggToken.networks[networkId].address;

    const { abi } = EggToken;
    console.log(abi);
    
    const Deployed = new web3.eth.Contract(abi, CA);
    console.log(Deployed);
    setDeployed(Deployed);

    const saleCA = SaleContract.networks[networkId].address;
    // console.log({ saleCA });

    setSaleCA(saleCA);

    web3.eth.subscribe("logs", { address: CA }).on("data", (log) => {
      const params = [{ type: "uint8", name: "state" }];
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

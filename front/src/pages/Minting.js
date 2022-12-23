import styled from "styled-components";
import EggToken from "../contracts/EggToken.json";
import { useEffect, useState } from "react";

const Minting = ({ web3, account }) => {
  const [deployed, setDeployed] = useState(null);
  console.log(web3);

  const minting = async () => {
    const result = await deployed.methods.mintToken().send({ from: account });
    console.log(result);
  };

  useEffect(() => async () => {
    if (deployed) return;
    const networkId = await web3.eth.net.getId();

    const CA = EggToken.networks[networkId].address;
    console.log(CA);

    const { abi } = EggToken;

    const Deployed = new web3.eth.Contract(abi, CA);
    console.log(Deployed);

    web3.eth.subscribe("logs", { address: CA }).on("data", (log) => {
      const params = [{ type: "uint256", name: "count" }];
      const value = web3.eth.abi.decodeLog(params, log.data);
      console.log(value);
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
  margin-top: 2rem;
`;

export default Minting;

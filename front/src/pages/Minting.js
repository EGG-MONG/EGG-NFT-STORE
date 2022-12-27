import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import { getContract } from "../redux/contractReducer";
import { useState } from "react";
import Loading from "../components/Loading";
import { nftEvent } from "../func/eventProcessing";
import { addNft } from "../redux/nftReducer";

const Minting = (/*{ web3, account }*/) => {
  const [loading, setLoading] = useState(false);
  const [finish, setFinish] = useState(false);
  const [imgId, setImgId] = useState(0);

  const dispatch = useDispatch();
  const web3 = useSelector((state) => state.contract.web3);
  const account = useSelector((state) => state.contract.account);
  const eggToken = useSelector((state) => state.contract.eggToken);
  const saleContract = useSelector((state) => state.contract.saleContract);

  if (!eggToken.CA) {
    dispatch(getContract());
    return;
  }

  const minting = async () => {
    setLoading(true);
    setFinish(false);
    try {
      const tokenId = Math.floor(Math.random() * 100) + 1;
      const result = await eggToken.deployed.methods
        .mintToken(saleContract.CA, tokenId)
        .send({ from: account, value: 100 });
      setFinish(true);
      setImgId(result.events.Minting.returnValues.tokenId);
      setLoading(false);

      const { transaction, transfer } = await nftEvent(
        web3,
        result.events.Minting
      );
      const tokenURI = eggToken.metadataURI + "/" + tokenId + ".json";
      dispatch(addNft(tokenURI, transaction, transfer));
    } catch {
      alert("error!");
      window.location.replace("/");
    }
  };

  return (
    <>
      <MintingArea>
        {loading ? (
          <Loading />
        ) : (
          <>
            {finish ? (
              <>
                <SuccessMsg>Minting Success!</SuccessMsg>
                <MintedImg
                  src={`http://localhost:8000/images/${imgId}.png`}
                  alt="minted Img"
                />
              </>
            ) : (
              ""
            )}
            <Price onClick={minting}>only 100wei for minting</Price>
          </>
        )}
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
  cursor: pointer;
  font-size: 3rem;
  &:hover {
    color: plum;
  }
`;
const SuccessMsg = styled.h1`
  font-size: 3rem;
`;
const MintedImg = styled.img`
  width: 600px;
  height: 600px;
  border-radius: 1rem;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 2rem;
`;
export default Minting;

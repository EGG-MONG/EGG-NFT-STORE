const { NftService, TransactionService, TransferService } = require("../services");
const { SUCCESS, FAIL,  } = require("../config/respons");

module.exports.create = async (req, res) => {
    const {nft, transaction, transfer} = req.body;

    const nftResult = await NftService.create(nft);

    // 트랜잭션과 트랜스퍼는 각각의 콘트롤러에서 처리하는 것이 맞으나 시간관계 상 함께 처리해쬬
    const txResult = await TransactionService.create(transaction);
    const trResult = await TransferService.create(transfer);
    
    if(nftResult && txResult && trResult){
      res.send({ret : SUCCESS, nft});
    }else{
      res.send({ret : FAIL});
    }
};

module.exports.update = async (req, res) => {
  const { tokenId, transaction, transfer } = req.body;

  const nft = await NftService.get(tokenId);

  // 트랜젝션과 트랜스퍼 배열에 추가
  nft.transactions.push(transaction);
  nft.transfers.push(transfer);

  const nftResult = await NftService.create(nft);

  const txResult = await TransactionService.create(transaction);
  const trResult = await TransferService.create(transfer);

  console.log({nftResult, txResult, trResult});

  if(nftResult && txResult && trResult){
    res.send({ret : SUCCESS, nft});
  }else{
    res.send({ret : FAIL});
  }

}

module.exports.getList = async (req, res) => {

    const blockList = await NftService.getList();
    
    if(blockList){
      res.send({ret : SUCCESS,  blockList });
    }else{
      res.send({ret : FAIL});
    }
};
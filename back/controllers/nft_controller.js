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

module.exports.updateSale = async (req, res) => {
  console.log("==========================================================");
  console.log("updateSale()");
  const { tokenId, transaction, transferTf, transferSale } = req.body;

  const nft = await NftService.get(tokenId);
  const updateNft = {};

  updateNft.owner = transferTf.to;
  
  updateNft.price = transferTf.price;
  updateNft.state = transferTf.state;
    
  const txResult = await TransactionService.create(transaction);
  nft.transactions.push(txResult);
  updateNft.transactions = [...nft.transactions];
  


  nft.transfers.push(await TransferService.create(transferSale));
  nft.transfers.push(await TransferService.create(transferTf));

  updateNft.transfers = [...nft.transfers];

  const nftResult = await NftService.update(tokenId, updateNft);
  
  console.log("==========================================================");
  if(nftResult && txResult){
    res.send({ret : SUCCESS, nft : nftResult});
  }else{
    res.send({ret : FAIL, nft : nftResult});
  }

}

module.exports.updateList = async (req, res) => {
  console.log("==========================================================");
  console.log("updateList()");
  const { tokenId, transaction, transfer } = req.body;
  // console.log({ tokenId, transaction, transfer });

  const nft = await NftService.get(tokenId);
  const updateNft = {};

  updateNft.price = transfer.price;
  updateNft.state = transfer.state;
    
  const txResult = await TransactionService.create(transaction);
  nft.transactions.push(txResult);
  updateNft.transactions = [...nft.transactions];
  
  const trResult = await TransferService.create(transfer);
  nft.transfers.push(trResult);
  updateNft.transfers = [...nft.transfers];

  const nftResult = await NftService.update(tokenId, updateNft);

  console.log("==========================================================");
  if(nftResult && txResult && trResult){
    res.send({ret : SUCCESS, nft : nftResult});
  }else{
    res.send({ret : FAIL, nft : nftResult});
  }

}
// function arrPush(_arr, _item, key) {
//   const arr = [ ..._arr];
//   console.log({arrPush : arr});
//   const item = _item;

//   let isOverlap = false; 
//   arr.map((i) => {
//     if(i[key] == item[key]) isOverlap = true;
//   })
//   if(!isOverlap) arr.push(item);
//   console.log({arrPush : arr});
//   return arr;
// }

module.exports.getList = async (req, res) => {
    console.log("getList()");
    const list = await NftService.getList();
    console.log({list});
    if(list){
      res.send({ret : SUCCESS,  list });
    }else{
      res.send({ret : FAIL});
    }
};
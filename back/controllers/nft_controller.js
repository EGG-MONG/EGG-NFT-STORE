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
  console.log("update()");
  const { tokenId, transaction, transfer } = req.body;
  console.log({ tokenId, transaction, transfer });

  const nft = await NftService.get(tokenId);

  nft.price = transfer.price;
  nft.state = transfer.state;
  
  let txResult;
  if(nft.state == "Transfer"){
    nft.owner = transfer.to;
    txResult = true;
  }
  
  if(nft.state != "Transfer"){
    nft.transactions = arrPush(nft.transactions, transaction, "hash");
    txResult = await TransactionService.create(transaction);
  }

  // 트랜젝션과 트랜스퍼 배열에 추가
  nft.transfers = arrPush(nft.transfers, transfer, "id");
  const nftResult = await NftService.update(tokenId, nft);
  const trResult = await TransferService.create(transfer);

  console.log({nftResult, nft});
  
  console.log({state : transfer.state, nftResult, txResult, trResult});
  if(nftResult && txResult && trResult){
    res.send({ret : SUCCESS, nft : nftResult});
  }else{
    res.send({ret : FAIL, nft : nftResult});
  }

}

function arrPush(_arr, _item, key) {
  const arr = [ ..._arr];
  const item = _item;

  let isOverlap = false; 
  arr.map((i) => {
    if(i[key] == item[key]) isOverlap = true;
  })
  if(!isOverlap) arr.push(item);
  return arr;
}

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
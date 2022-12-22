const BlockService = require("../service/block_service");
const { SUCCESS, FAIL,  } = require("../config/respons");

module.exports.get = async (req, res) => {

    const { hash } = req.body;
  
    const block = await BlockService.get(hash);

    if(block){
      res.send({ret : SUCCESS,  block });
    }else{
      res.send({ret : FAIL});
    }
};

module.exports.getList = async (req, res) => {

    const blockList = await BlockService.getList();
    
    if(blockList){
      res.send({ret : SUCCESS,  blockList });
    }else{
      res.send({ret : FAIL});
    }
};
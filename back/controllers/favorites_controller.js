const { FavoritesService } = require("../services");
const { SUCCESS, FAIL,  } = require("../config/respons");

module.exports.insertOrUpdate = async (req, res) => {
    const { favorites } = req.body;
    const result = await FavoritesService.insertOrUpdate(favorites);

    if(favorites.favorites == result.favorites ){
      res.send({ret : SUCCESS});
    }else{
      res.send({ret : FAIL});
    }
};

module.exports.getList = async (req, res) => {

    const blockList = await FavoritesService.getList();
    
    if(blockList){
      res.send({ret : SUCCESS,  blockList });
    }else{
      res.send({ret : FAIL});
    }
};
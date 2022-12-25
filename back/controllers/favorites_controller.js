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
    const { account } = req.param;
    const favorites = await FavoritesService.getList( account );
    
    if(favorites){
      res.send({ret : SUCCESS,  favorites });
    }else{
      res.send({ret : FAIL});
    }
};
const { Nft } = require("../model/schema");

module.exports.create = async (nft) => {
  try {
    return await Nft.create(nft);
  } catch (error) {
    console.error(error);
    return false;
  }
};

module.exports.get = async (tokenId) => {
  try {
    // tokenId로 조회(tokenId는 unique)
    return Nft.findOne({ tokenId });
  } catch (error) {
    console.error(error);
    return false;
  }
};

module.exports.getList = async () => {
  try {
    // 전체조회해서 정렬을 _id 기준으로 역순
    return Nft.find().sort({ _id: -1 });
  } catch (error) {
    console.error(error);
    return false;
  }
};

module.exports.update = async (tokenId, nft) => {
  // console.log(nft);
  try {
    return await Nft.findOneAndUpdate(
      {
        tokenId
      },
      {
        nft
      }
    );
  } catch (error) {
    console.error(error);
    return false;
  }
};

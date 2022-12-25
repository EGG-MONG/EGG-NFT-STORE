const { Nft } = require("../model/schema");

module.exports.create = async (nft) => {
  try {
    await Nft.create(nft);
  } catch (error) {
    console.error(error);
    return false;
  }
};

module.exports.update = async (nft) => {
  // console.log(nft);
  try {
    await Nft.findOneAndUpdate(
      {
        tokenId: tokenId,
      },
      {
        $push: {
          nft: {
            tokenId: tokenId,
          },
        },
      },
      { new: true }
    );
  } catch (error) {
    console.error(error);
    return false;
  }
};

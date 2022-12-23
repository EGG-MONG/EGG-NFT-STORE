const { Nft } = require("../mongoose/schema");

module.exports.create = async (nft) => {
  try {
    await Nft.create(nft);
  } catch (error) {
    console.error(error);
    return false;
  }
};

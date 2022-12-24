const mongoose = require("mongoose");
const transactionSchema = require("./transactionSchema");
const transferSchema = require("./transferSchema");
const nftSchema = new mongoose.Schema(
  {
    tokenId : {type : Number, index : true, unique : true},
    name: String,
    owner: String,
    maker: String,
    description: String,
    image: String,
    edition: Number,
    date: Number,
    state: String,
    price: Number,
    attributes: [
      {
        trait_type: String,
        value: String,
        // 희귀도 백분위로 나타냄
        rare: Number,
      },
    ],
    transactions: [transactionSchema.schema],
    transfers: [transferSchema.schema],
    uri : String,
  },
  { timestamps: true }
);

module.exports = mongoose.model("Nft", nftSchema);

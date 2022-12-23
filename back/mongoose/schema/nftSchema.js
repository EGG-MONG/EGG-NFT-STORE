const mongoose = require("mongoose");
const transactionSchema = require("./transactionSchema");
const transferSchema = require("./transferSchema");
const nftSchema = new mongoose.Schema(
  {
    name: String,
    owner: String,
    maker: String,
    description: String,
    image: String,
    edition: Number,
    date: Number,
    state: String,
    price: Number,
    attribute: [
      {
        trait_type: String,
        value: String,
        // 희귀도 백분위로 나타냄
        rare: Number,
      },
    ],
    transactions: [transactionSchema.schema],
    transfer: [transferSchema.schema],
  },
  { timestamps: true }
);

module.exports = mongoose.model("Nft", nftSchema);

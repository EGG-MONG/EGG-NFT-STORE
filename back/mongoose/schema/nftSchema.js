const mongoose = require("mongoose");
const nftSchema = new mongoose.Schema({
  name: String,
  owner: String,
  maker: String,
  description: String,
  image: String,
  edition: Number,
  date: Number,
  attribute: [
    {
      trait_type: String,
      value: String,
    },
  ],
  transactions: [transactionSchema.schema],
  transfer: [transferSchema.schema],
});

module.exports = mongoose.model("Nft", nftSchema);

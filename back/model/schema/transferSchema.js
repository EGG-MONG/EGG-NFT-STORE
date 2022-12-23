const mongoose = require("mongoose");
const transferSchema = new mongoose.Schema(
  {
    tokenId : Number,
    transactionHash: String,
    type: String,
    price: Number,
    from: String,
    to: String,
  },
  { timestamps: true }
);
module.exports = mongoose.model("Transfer", transferSchema);

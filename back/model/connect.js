const mongoose = require("mongoose");
require("dotenv").config();

module.exports = () => {
  function connect() {
    mongoose.connect(
      // 여기에 로컬 IP가 아니라 퍼블릭 IP써줘야한다
      `mongodb://eggmong:${process.env.DATABASE_PASSWORD_DEV}@13.124.78.191:27017`,
      { dbName: "egg_nft_test" },
      function (err) {
        if (err) {
          console.error("mongodb connection error", err);
        }
        console.log("mongodb connected");
      }
    );
  }
  connect();
  mongoose.connection.on("disconnected", connect);
  require("./schema/blockSchema.js");
  require("./schema/transactionSchema.js");
  require("./schema/transferSchema");
  require("./schema/nftSchema");
  require("./schema/favoritesSchema");
};

const mongoose = require('mongoose');
require("dotenv").config();

module.exports = () => {
  function connect() {
    mongoose.connect(`mongodb://admin:${process.env.DATABASE_PASSWORD_DEV}@127.0.0.1:27017`, { dbName: 'egg_nft_test' }, function(err) {
      if (err) {
        console.error('mongodb connection error', err);
      }
      console.log('mongodb connected');
    });
  }
  connect();
  mongoose.connection.on('disconnected', connect);
  require('./schema/blockSchema.js');
  require('./schema/transactionSchema.js');
  require("./schema/transferSchema");
  require("./schema/nftSchema")
  require("./schema/favoritesSchema")
};
const mongoose = require('mongoose');
const transactionSchema = new mongoose.Schema({
    transactionIndex : {type : Number, index : true, unique : true},
    hash : {type : String, index : true, unique : true},
    nonce : Number,
    blockHash : String,
    blockNumber : Number,
    from : String,
    to : String,
    value : String,
    gas : Number,
    gasPrice : String,
    input : String,
    v : String,
    r : String,
    s : String,
});
module.exports = mongoose.model('Transaction', transactionSchema);
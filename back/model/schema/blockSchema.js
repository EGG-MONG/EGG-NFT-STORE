const mongoose = require('mongoose');
const transactionSchema = require('./transactionSchema');

const blockSchema = new mongoose.Schema({
    number: {type : Number, index : true, unique : true},
    hash : {type : String, index : true, unique : true},
    parentHash : String,
    mixHash : String,
    nonce : String,
    sha3Uncles : String,
    logsBloom : String,
    transactionsRoot : String,
    stateRoot : String,
    receiptsRoot : String,
    miner : String,
    difficulty : String,
    totalDifficulty : String,
    extraData : String,
    size : Number,
    gasLimit : Number,
    gasUsed : Number,
    timestamp : Number,
    transactions : [ transactionSchema.schema ],
    uncles : [ Object ]
});
module.exports = mongoose.model('Block', blockSchema);

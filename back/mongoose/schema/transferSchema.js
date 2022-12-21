const mongoose = require('mongoose');
const transferSchema = new mongoose.Schema({
    transactionHash : String,
    type : String,
    price : Number,
    from : String,
    to : String
});
module.exports = mongoose.model('Transfer', transferSchema);
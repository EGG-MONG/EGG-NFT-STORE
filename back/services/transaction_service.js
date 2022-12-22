const { Transaction } = require("../mongoose/schema");

module.exports.create = async (transaction) => {
    try {
        //           생성된 Transaction 객체 반환
        return await Transaction.create(transaction);
    } catch (error) {
        console.error(error);
        return false;
    }
}

module.exports.get = async (hash) => {
    try {
        // hash로 조회(hash는 unique)
        return Transaction.findOne({hash});
    } catch (error) {
        console.error(error);
        return false;
    }
}

module.exports.getList = async () => {
    try {
        // 전체조회해서 정렬을 _id 기준으로 역순
        return Transaction.find().sort({_id : -1});
    } catch (error) {
        console.error(error);
        return false;
    }
}
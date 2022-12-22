const { Block } = require("../mongoose/schema");

module.exports.create = async (block) => {
    try {
        await Block.create(block);
    } catch (error) {
        console.error(error);
        return false;
    }
}

module.exports.get = async (hash) => {
    try {
        // hash로 조회(hash는 unique)
        return Block.findOne({hash});
    } catch (error) {
        console.error(error);
        return false;
    }
}

module.exports.getList = async () => {
    try {
        // 전체조회해서 정렬을 _id 기준으로 역순
        return Block.find().sort({_id : -1});
    } catch (error) {
        console.error(error);
        return false;
    }
}
const { Transfer } = require("../model/schema");

module.exports.create = async (transfer) => {
  try {
    //           생성된 Transfer 객체를 반환한다.
    return await Transfer.create(transfer);
  } catch (error) {
    console.error(error);
    return false;
  }
};

module.exports.get = async (transactionHash) => {
  try {
    // hash로 조회(hash는 unique)
    return Transfer.findOne({ transactionHash });
  } catch (error) {
    console.error(error);
    return false;
  }
};

module.exports.getList = async () => {
  try {
    // 전체조회해서 정렬을 _id 기준으로 역순
    return Transfer.find().sort({ _id: -1 });
  } catch (error) {
    console.error(error);
    return false;
  }
};

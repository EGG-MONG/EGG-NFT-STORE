const { Favorites } = require("../model/schema");

module.exports.insertOrUpdate = async (account, favorites) => {
    try {
        //                                filter , update     
        return Favorites.findOneAndUpdate({account}, favorites, {
            new: true, // 적용된 문서 반환 옵션
            upsert: true // 문서가 있을경우 업데이트 없을 경우 생성
        });
    } catch (error) {
        console.error(error);
        return false;
    }
}

module.exports.getList = async (account) => {
    try {
        // 전체조회해서 정렬을 _id 기준으로 역순
        return Favorites.findOne({account}).exec();
    } catch (error) {
        console.error(error);
        return false;
    }
}

// module.exports.update = async (account, favorites) => {
//     try {
//         //                      filter , update     
//         return Favorites.update({account}, favorites);
//     } catch (error) {
//         console.error(error);
//         return false;
//     }
// }
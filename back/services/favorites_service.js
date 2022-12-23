const { Favorites } = require("../mongoose/schema");

module.exports.insertOrUpdate = async (favoritesObj) => {
    try {
        const { wallet, favorites } = favoritesObj;
        //                               filter , update     
        return Favorites.findOneAndUpdate(wallet, favorites, {
            new: true, // 적용된 문서 반환 옵션
            upsert: true // 문서가 있을경우 업데이트 없을 경우 생성
        });
    } catch (error) {
        console.error(error);
        return false;
    }
}

module.exports.getList = async () => {
    try {
        // 전체조회해서 정렬을 _id 기준으로 역순
        return Favorites.find();
    } catch (error) {
        console.error(error);
        return false;
    }
}


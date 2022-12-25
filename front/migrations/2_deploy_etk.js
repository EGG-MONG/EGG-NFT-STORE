const EggToken = artifacts.require("EggToken");

const SaleContract = artifacts.require("SaleContract");

module.exports = async function (deployer) {

    // 토큰 정보
    const name = "EggToken";
    const symbol = "ETK"
    const metadataURI = "http://localhost:8000/metadatas";

    // 토큰 먼저 배포
    await deployer.deploy(EggToken, name, symbol, metadataURI);

    // 배포된 인스턴스 가져오기
    const token = await EggToken.deployed();

    // EggToken.address 배포된 컨트랙트의 CA값이 저장되어 있다.
    const eggTokenCA = token.address;

    // 배포한 EggToken 컨트랙트의 CA 값을 매개변수로 전달해서 SaleContract 컨트랙트 배포
    await deployer.deploy(SaleContract, eggTokenCA);

    await SaleContract.deployed();
}
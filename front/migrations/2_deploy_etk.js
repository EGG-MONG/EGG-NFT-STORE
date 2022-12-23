const EggToken = artifacts.require("EggToken");

const SaleToken = artifacts.require("SaleToken");

module.exports = async function (deployer) {
    
    // 토큰 먼저 배포
    await deployer.deploy(EggToken, "Egg Token", "ETK", "");

    // 배포된 인스턴스 가져오기
    // SoonToken.address 배포된 컨트랙트의 CA 가져와짐 
    const token = await EggToken.deployed();

    // 배포한 SoonToken 컨트랙트의 CA 값을 매개변수로 전달해서 EthWap 컨트랙트 배포
    await deployer.deploy(SaleToken, token.address);

    await SaleToken.deployed();
}
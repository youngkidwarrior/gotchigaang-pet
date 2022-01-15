// deploy/00_deploy_your_contract.js

//const { ethers } = require("hardhat");

module.exports = async ({ getNamedAccounts, deployments }) => {
  const { deploy } = deployments;
  const { deployer } = await getNamedAccounts();

  const petterContract =await deploy("LazyPetter", {
    // Learn more about args here: https://www.npmjs.com/package/hardhat-deploy#deploymentsdeploy
    from: deployer,
    args: [
      "0x527a819db1eb0e34426297b03bae11F2f8B3A19E", // matic pokeme address https://docs.gelato.network/contract-addresses
      "0x86935F11C86623deC8a25696E1C19a8659CbF95d", // matic aavegotchi diamond https://github.com/aavegotchi/aavegotchi-contracts
    ],
    log: true,
  });

  const petterResolver = await deploy("LazyPetterResolver", {
    // Learn more about args here: https://www.npmjs.com/package/hardhat-deploy#deploymentsdeploy
    from: deployer,
    args: [ petterContract.address ],
    log: true,
  });

};
module.exports.tags = ["LazyPetterResolver", "LazyPetter"];
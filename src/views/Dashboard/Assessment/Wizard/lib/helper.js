const ethers = require("@nomiclabs/hardhat-ethers")
const hre = require("hardhat");



export async function impersonateAccount() {
    let address = "0x70997970C51812dc3A010C7d01b50e0d17dc79C8";
    await hre.network.provider.request({
      method: "hardhat_impersonateAccount",
      params: [address],
    });

    const signer = await ethers.provider.getSigner(address);
    signer.address = signer._address;

    return signer;
  }



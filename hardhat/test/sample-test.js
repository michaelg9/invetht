const { expect } = require("chai");
const { ethers } = require("hardhat");

const {
  AddressZero,
  MaxUint256,
  One,
  Two,
  Zero,
  WeiPerEther,
} = ethers.constants;

const impersonateAddress = async (address) => {
  const hre = require("hardhat");
  await hre.network.provider.request({
    method: "hardhat_impersonateAccount",
    params: [address],
  });

  const signer = await ethers.provider.getSigner(address);
  signer.address = signer._address;

  return signer;
};



describe("Babylon test", function () {
  let owner;
  let garden;
  let strategy;
  let controller;
  let keeper;
  let alice;
  let bob;

  beforeEach(async () => {
    [keeper, alice, bob] = await ethers.getSigners();
    controller = await ethers.getContractAt('IBabController', '0xD4a5b5fcB561dAF3aDF86F8477555B92FBa43b5F');
    owner = await impersonateAddress('0x97FcC2Ae862D03143b393e9fA73A32b563d57A6e');
    await controller.connect(owner).addKeeper(keeper.address);
    const gardens = await controller.getGardens();
    garden = await ethers.getContractAt("IGarden", gardens.slice(1)[0]);

    console.log(gardens)
  });

  it("can deposit to a garden", async () => {
    await garden.connect(alice).deposit(ethers.utils.parseEther("1.0"), 0, alice.address, AddressZero, {
        value: ethers.utils.parseEther("1.0"),
      });
  });



  // it("Should return the new greeting once it's changed", async function () {
  //   const Greeter = await ethers.getContractFactory("Greeter");
  //   const greeter = await Greeter.deploy("Hello, world!");
  //   await greeter.deployed();

  //   expect(await greeter.greet()).to.equal("Hello, world!");

  //   const setGreetingTx = await greeter.setGreeting("Hola, mundo!");

  //   // wait until the transaction is mined
  //   await setGreetingTx.wait();

  //   expect(await greeter.greet()).to.equal("Hola, mundo!");
  // });
});

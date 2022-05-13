import { ethers } from "ethers";

async function getGardenData(gardenContract: ethers.Contract) {
  //   const symbol = await gardenContract.symbol();
  //   const tokenURI = await gardenContract.tokenURI();

  const promises = [
    gardenContract.name(),
    gardenContract.privateGarden(),
    gardenContract.publicStrategists(),
    gardenContract.publicStewards(),
    gardenContract.controller(),
    gardenContract.creator(),
    gardenContract.reserveAsset(),
    gardenContract.verifiedCategory(),
    gardenContract.canMintNftAfter(),
    gardenContract.hardlockStartsAt(),
    gardenContract.totalContributors(),
    gardenContract.gardenInitializedAt(),
    gardenContract.minContribution(),
    gardenContract.depositHardlock(),
    gardenContract.minLiquidityAsset(),
    gardenContract.minStrategyDuration(),
    gardenContract.maxStrategyDuration(),
    gardenContract.reserveAssetRewardsSetAside(),
    gardenContract.absoluteReturns(),
    gardenContract.totalStake(),
    gardenContract.minVotesQuorum(),
    gardenContract.minVoters(),
    gardenContract.maxDepositLimit(),
    gardenContract.strategyCooldownPeriod(),
    gardenContract.getStrategies(),
    gardenContract.getFinalizedStrategies(),
    gardenContract.keeperDebt(),
    gardenContract.totalKeeperFees(),
    gardenContract.lastPricePerShare(),
    gardenContract.lastPricePerShareTS(),
    gardenContract.pricePerShareDecayRate(),
    gardenContract.pricePerShareDelta(),
  ];

  return Promise.all(promises).then((promises) => {
    return {
      name: promises[0],
      privateGarden: promises[1],
      publicStrategists: promises[2],
      publicStewards: promises[3],
      controller: promises[4],
      creator: promises[5],
      reserveAsset: promises[6],
      verifiedCategory: promises[7],
      canMintNftAfter: promises[8],
      hardlockStartsAt: promises[9],
      totalContributors: promises[10],
      gardenInitializedAt: promises[11],
      minContribution: promises[12],
      depositHardlock: promises[13],
      minLiquidityAsset: promises[14],
      minStrategyDuration: promises[15],
      maxStrategyDuration: promises[16],
      reserveAssetRewardsSetAside: promises[17],
      absoluteReturns: promises[18],
      totalStake: promises[19],
      minVotesQuorum: promises[20],
      minVoters: promises[21],
      maxDepositLimit: promises[22],
      strategyCooldownPeriod: promises[23],
      getStrategies: promises[24],
      getFinalizedStrategies: promises[25],
      keeperDebt: promises[26],
      totalKeeperFees: promises[27],
      lastPricePerShare: promises[28],
      lastPricePerShareTS: promises[29],
      pricePerShareDecayRate: promises[30],
      pricePerShareDelta: promises[31],
    };
  });
}

export { getGardenData };

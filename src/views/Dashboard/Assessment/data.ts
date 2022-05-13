import { ethers } from "ethers";

async function getGardenData(gardenContract: ethers.Contract) {
  const name = await gardenContract.name();
//   const symbol = await gardenContract.symbol();
//   const tokenURI = await gardenContract.tokenURI();

  const privateGarden = await gardenContract.privateGarden();
  const publicStrategists = await gardenContract.publicStrategists();
  const publicStewards = await gardenContract.publicStewards();
  const controller = await gardenContract.controller();
  const creator = await gardenContract.creator();

  const reserveAsset = await gardenContract.reserveAsset();

  const verifiedCategory = await gardenContract.verifiedCategory();

  const canMintNftAfter = await gardenContract.canMintNftAfter();

  const hardlockStartsAt = await gardenContract.hardlockStartsAt();

  const totalContributors = await gardenContract.totalContributors();

  const gardenInitializedAt = await gardenContract.gardenInitializedAt();

  const minContribution = await gardenContract.minContribution();

  const depositHardlock = await gardenContract.depositHardlock();

  const minLiquidityAsset = await gardenContract.minLiquidityAsset();

  const minStrategyDuration = await gardenContract.minStrategyDuration();

  const maxStrategyDuration = await gardenContract.maxStrategyDuration();

  const reserveAssetRewardsSetAside = await gardenContract.reserveAssetRewardsSetAside();

  const absoluteReturns = await gardenContract.absoluteReturns();

  const totalStake = await gardenContract.totalStake();

  const minVotesQuorum = await gardenContract.minVotesQuorum();

  const minVoters = await gardenContract.minVoters();

  const maxDepositLimit = await gardenContract.maxDepositLimit();

  const strategyCooldownPeriod = await gardenContract.strategyCooldownPeriod();

  const getStrategies = await gardenContract.getStrategies();

  const getFinalizedStrategies = await gardenContract.getFinalizedStrategies();

  const keeperDebt = await gardenContract.keeperDebt();

  const totalKeeperFees = await gardenContract.totalKeeperFees();

  const lastPricePerShare = await gardenContract.lastPricePerShare();

  const lastPricePerShareTS = await gardenContract.lastPricePerShareTS();

  const pricePerShareDecayRate = await gardenContract.pricePerShareDecayRate();

  const pricePerShareDelta = await gardenContract.pricePerShareDelta();

  return {
    name,
    // symbol,
    // tokenURI,
    privateGarden,
    publicStrategists,
    publicStewards,
    controller,
    creator,
    reserveAsset,
    verifiedCategory,
    canMintNftAfter,
    hardlockStartsAt,
    totalContributors,
    gardenInitializedAt,
    minContribution,
    depositHardlock,
    minLiquidityAsset,
    minStrategyDuration,
    maxStrategyDuration,
    reserveAssetRewardsSetAside,
    absoluteReturns,
    totalStake,
    minVotesQuorum,
    minVoters,
    maxDepositLimit,
    strategyCooldownPeriod,
    getStrategies,
    getFinalizedStrategies,
    keeperDebt,
    totalKeeperFees,
    lastPricePerShare,
    lastPricePerShareTS,
    pricePerShareDecayRate,
    pricePerShareDelta,
  };
}

export { getGardenData };

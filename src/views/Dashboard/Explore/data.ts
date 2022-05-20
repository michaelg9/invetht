import { ethers } from "ethers";

export type GardenDataType = Awaited<ReturnType<typeof getGardenData>>;

export const gardens = {
  fountain_eth: "0xB5bD20248cfe9480487CC0de0d72D0e19eE0AcB6",
  fountain_btc: "0x4C4Ad2790D2ea7D293B06896b09e1d102e6B2613",
  arkads: "0xd42B3A30ca89155d6C3499c81F0C4e5A978bE5c2",
  stable: "0x1D50c4F18D7af4fCe2Ea93c7942aae6260788596",
  forever_stables: "0x8174e96F7F7e14B252f20de1e5F932CB5a1a911c",
  stable_pebble: "0x3eeC6Ac8675ab1B4768f6032F0598e36Ac64f415",
};

export interface AssessmentState {
  walletValueETH: number;
  valueToInvest: number;
  valueRiskProfile: number;
  valueMarketReaction: number;
}

export function calculateRiskProfile(state: AssessmentState): number | null {
  if (state.valueRiskProfile === null || state.valueMarketReaction === null) {
    return null;
  }

  const riskProfile = state.valueRiskProfile + state.valueMarketReaction;

  return riskProfile;
}

export function getGardensByRiskProfile(riskProfile?: number): string[] {
  if (riskProfile == null) {
    return Object.values(gardens);
  }

  switch (riskProfile) {
    case 1:
    case 2:
    case 3:
      return [gardens.stable, gardens.forever_stables, gardens.fountain_btc];
    case 4:
      return [gardens.fountain_btc, gardens.fountain_eth, gardens.stable];
    case 5:
    case 6:
    case 7:
      return [gardens.fountain_eth, gardens.fountain_btc, gardens.stable];
    case 8:
    case 9:
      return [gardens.fountain_eth, gardens.fountain_btc, gardens.arkads];
    case 10:
    case 11:
    case 12:
      return [gardens.arkads, gardens.fountain_eth, gardens.fountain_btc];
    default:
      throw new Error("Invalid risk profile");
  }
}

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
      address: "",
    };
  });
}

export { getGardenData };

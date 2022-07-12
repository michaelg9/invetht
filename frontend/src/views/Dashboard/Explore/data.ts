import { ethers, utils } from "ethers";
import { IERC20Metadata } from "./interfaces";

export type GardenDataType = Awaited<ReturnType<typeof getGardenData>>;

export function formatUnits(n: utils.BigNumber, trimExp = 14, decimalUnits = 18) {
  //to given decimal places
  const trim = new utils.BigNumber(10).pow(trimExp);
  const num = trimExp ? n.sub(n.mod(trim)) : n;
  return utils.formatUnits(num, decimalUnits);
}

export const gardens = {
  fountain_eth: "0xB5bD20248cfe9480487CC0de0d72D0e19eE0AcB6",
  fountain_btc: "0x4C4Ad2790D2ea7D293B06896b09e1d102e6B2613",
  arkads: "0xd42B3A30ca89155d6C3499c81F0C4e5A978bE5c2",
  stable: "0x1D50c4F18D7af4fCe2Ea93c7942aae6260788596",
  forever_stables: "0x8174e96F7F7e14B252f20de1e5F932CB5a1a911c",
  stable_pebble: "0x3eeC6Ac8675ab1B4768f6032F0598e36Ac64f415",
  pickle_field: "0xA4E524391A878346A168AAbFA984b9b8f94A3Db4",
};

export interface AssessmentState {
  walletValueETH: number;
  valueToInvest: number;
  valueRiskProfile: number;
  valueMarketReaction: number;
}

export function calculateRiskProfile(state: AssessmentState): number | null {
  if (state.valueRiskProfile === null) {
    throw Error("Goal is not set");
  }

  const riskProfile = state.valueRiskProfile;

  return riskProfile;
}

export function getGardensByRiskProfile(riskProfile?: number): string[] {
  if (riskProfile == null) {
    return Object.values(gardens);
  }
  riskProfile = Math.floor(riskProfile / 3);
  switch (riskProfile) {
    case 1:
      return [gardens.stable, gardens.forever_stables, gardens.fountain_btc];
    case 2:
      return [gardens.fountain_eth, gardens.fountain_btc, gardens.pickle_field];
    case 3:
      return [gardens.arkads, gardens.fountain_eth, gardens.pickle_field];
    default:
      throw new Error("Invalid risk profile");
  }
}

async function getGardenData(gardenContract: ethers.Contract, library: any) {
  const reserveAssetAddress = gardenContract.reserveAsset();
  const reserveAssetContract = reserveAssetAddress.then((address: string) =>   new ethers.Contract(
    address,
    [
      ...IERC20Metadata.abi,
    ],
    library.getSigner()
  ));
  const reserveAssetSymbol = reserveAssetContract.then((c: ethers.Contract) => c.symbol());


  const promises = [
    gardenContract.name(),
    gardenContract.privateGarden(),
    gardenContract.publicStrategists(),
    gardenContract.publicStewards(),
    gardenContract.controller(),
    gardenContract.creator(),
    reserveAssetAddress,
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
    gardenContract.addressPromise,
    gardenContract.totalSupply(),
    gardenContract.symbol(),
    reserveAssetSymbol,
  ];

  return Promise.all(promises).then((promises) => {
    const totalSupply = promises[33];
    const lastPricePerShare = promises[28];
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
      lastPricePerShare,
      lastPricePerShareTS: promises[29],
      pricePerShareDecayRate: promises[30],
      pricePerShareDelta: promises[31],
      address: promises[32],
      totalSupply,
      symbol: promises[34],
      reserveAssetSymbol: promises[35],
      nav: lastPricePerShare.mul(totalSupply),
    };
  });
}

export { getGardenData };

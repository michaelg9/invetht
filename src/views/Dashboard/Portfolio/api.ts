import useApi from "hooks/useApi";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";

const LIST_BALANCES_API = (address: string) =>
  `https://api.ethplorer.io/getAddressInfo/${address}?apiKey=freekey`;

type BALANCES_RESPONSE = {
  address: string;
  ETH: {
    price: {
      rate: number;
      diff: number;
      diff7d: number;
      diff30d: number;
      ts: number;
      marketCapUsd: number;
      availableSupply: number;
      volume24h: number;
      volDiff1: number;
      volDiff7: number;
      volDiff30: number;
    };
    balance: number;
    rawBalance: string;
  };
  countTxs: number;
  tokens: [
    {
      tokenInfo: {
        address: string;
        name: string;
        symbol: string;
        totalSupply: string;
        lastUpdated: number;
        website: string;
        twitter: string;
        reddit: string;
        decimals: string;
        image: number;
        coingecko: string;
        price: {
          rate: number; // price in currency
          diff: number; // 1h difference
          diff7d: number;
          diff30d: number;
          ts: number;
          marketCapUsd: number;
          availableSupply: number;
          volume24h: number;
          volDiff1: number;
          volDiff7: number;
          volDiff30: number;
          bid: number;
          currency: string;
        };
      };
      balance: number;
      totalIn: number;
      totalOut: number;
      rawBalance: string;
    }
  ];
};
const WALLET_BALANCES_CACHE = (account: string) => ({
  lifetime: 5000 * 60, //cache for 5 mins
  key: `WALLET_BALANCES_${account}`,
}) as const;

export function useBalances(account: string | null | undefined) {
  return useApi<BALANCES_RESPONSE>(
    [account ? LIST_BALANCES_API(account) : ""],
    account ? WALLET_BALANCES_CACHE(account) : undefined
  );
}

const PRICE_HISTORY_API = (coin: string) =>
  `https://api.coingecko.com/api/v3/coins/${coin}/market_chart?vs_currency=USD&days=7&interval=daily`;

const PRICE_HISTORY_GRAPH_CACHE = (coin: string) =>
  ({
    lifetime: 5 * 1000 * 60 * 60, //cache for 5 hrs
    key: `PRICE_HISTORY_${coin}`,
  } as const);

type PRICE_HISTORY_RESPONSE = {
  prices: [number, number][];
};

export function usePriceHistory(coin: string) {
  return useApi<PRICE_HISTORY_RESPONSE>(
    [coin ? PRICE_HISTORY_API(coin) : ""],
    PRICE_HISTORY_GRAPH_CACHE(coin)
  );
}

const TOKEN_TX_API = (address: string) =>
  `https://api.etherscan.io/api?module=account&action=tokentx&address=${address}&sort=asc&offset=5&apikey=YourApiKeyToken`;

const TOKEN_TX_CACHE = (address: string) =>
  ({
    lifetime: 4 * 1000 * 60, //cache for 4 mins
    key: `TOKEN_TX_${address}`,
  } as const);

type TOKEN_TX_RESPONSE = {
  result: [
    {
      from: string;
      to: string;
      tokenName: string;
      tokenSymbol: string;
      tokenDecimal: string;
      value: string;
      timeStamp: string;
    }
  ];
};

export function useTokenTxHistory(address: string | null | undefined) {
  return useApi<TOKEN_TX_RESPONSE>(
    [address ? TOKEN_TX_API(address) : ""],
    address ? TOKEN_TX_CACHE(address) : undefined
  );
}

export function convertTxToTimeLineEntry(
  entry: TOKEN_TX_RESPONSE["result"][0],
  ownAddress: string
) {
  const value = Number(entry.value) / Math.pow(10, Number(entry.tokenDecimal));
  const isReceive = entry.to.toLowerCase() === ownAddress.toLowerCase();

  return {
    logo: isReceive ? FaArrowRight : FaArrowLeft,
    title: `${isReceive ? "Receive" : "Send"} ${value} ${entry.tokenSymbol}`,
    date: new Date(Number(entry.timeStamp) * 1000).toLocaleDateString(),
    color: isReceive ? "blue" : "orange",
  };
}

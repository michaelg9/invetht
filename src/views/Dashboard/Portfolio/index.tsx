import {
  Flex,
  Grid,
  SimpleGrid,
  useColorModeValue,
  Image,
  Spinner,
} from "@chakra-ui/react";
import { useWeb3React } from "@web3-react/core";
import { WalletIcon } from "components/Icons/Icons";
import MiniStatistics from "./components/MiniStatistics";
import TransactionsOverview from "./components/TransactionsOverview";
import BalanceOverview from "./components/BalanceOverview";
import {
  convertTxToTimeLineEntry,
  useBalances,
  usePriceHistory,
  useTokenTxHistory,
} from "./api";
import ReactApexChart from "react-apexcharts";
import { lineChartOptions } from "variables/charts";
import Holdings from "./components/Holdings";

export default function Dashboard() {
  const iconBoxInside = useColorModeValue("white", "white");
  const { account, active } = useWeb3React();
  const walletBalances = useBalances(account);
  const priceHistory = usePriceHistory("ethereum");
  const tokenTxs = useTokenTxHistory(account);
  const errors = [
    walletBalances.error,
    priceHistory.error,
    tokenTxs.error,
  ].filter((e) => e);
  const loading = [
    walletBalances.response,
    priceHistory.response,
    tokenTxs.response,
  ].filter((e) => !e);
  let initScreen = null;
  if (!active || !account) initScreen = <div>connect wallet</div>;
  else if (errors.length > 0) initScreen = <div>Error: {errors[0]}</div>;
  else if (loading.length > 0) initScreen = <Spinner />;
  if (initScreen) {
    return (
      <Flex flexDirection="column" pt={{ base: "120px", md: "75px" }}>
        {initScreen}
      </Flex>
    );
  }
  const { ETH, tokens = [] } = walletBalances.response!;
  const txs = Array.isArray(tokenTxs.response?.result) ? tokenTxs.response!.result : [];
  const listTimeWindow = "diff7d";
  const tokenDetails = tokens.map((t) => {
    const balance = t.balance / Math.pow(10, Number(t.tokenInfo.decimals));
    return {
      name: t.tokenInfo.name,
      weight: 0,
      balance,
      symbol: t.tokenInfo.symbol,
      diff1h: t.tokenInfo.price.diff,
      diff7d: t.tokenInfo.price.diff7d,
      diff30d: t.tokenInfo.price.diff30d,
      logo: (
        <Image
          src={`https://ethplorer.io/${t.tokenInfo.image}`}
          h={"24px"}
          w={"24px"}
          color={iconBoxInside}
        />
      ),
      value: balance * t.tokenInfo.price.rate,
      currency: t.tokenInfo.price.currency,
    };
  });
  if (ETH.balance > 0)
    tokenDetails.push({
      name: "Ether",
      weight: 0,
      balance: ETH.balance,
      symbol: "ETH",
      diff1h: ETH.price.diff,
      diff7d: ETH.price.diff7d,
      diff30d: ETH.price.diff30d,
      logo: (
        <Image
          src={`https://ethplorer.io/images/eth.png`}
          h={"24px"}
          w={"24px"}
          color={iconBoxInside}
        />
      ),
      value: ETH.balance * ETH.price.rate,
      currency: "USD",
    });
  const totalFunds = tokenDetails.reduce((acc, e) => acc + e.value, 0);
  tokenDetails.forEach(e => e.weight = e.value/totalFunds);
  return (
    <Flex flexDirection="column" pt={{ base: "120px", md: "75px" }}>
      <Grid
        templateColumns={{ sm: "1fr", lg: "2.5fr 1fr" }}
        templateRows={{ sm: "repeat(2, 1fr)", lg: "1fr" }}
        gap="24px"
        mb={{ lg: "26px" }}
      >
        <BalanceOverview
          title={"Wallet ETH Balance"}
          percentage={ETH.price.diff7d}
          chart={
            <ReactApexChart
              options={lineChartOptions as any}
              series={
                priceHistory.response
                  ? [
                      {
                        name: "USD Balance",
                        data: priceHistory.response.prices.map((e) => ({
                          x: e[0],
                          y: (e[1] * ETH.balance).toFixed(2),
                        })),
                      },
                    ]
                  : []
              }
              type="area"
              width="100%"
              height="100%"
            />
          }
        />
        <div>
          <SimpleGrid spacing="24px">
            <MiniStatistics
              title={"Funds invested"}
              amount={`${(totalFunds).toFixed(2)}USD`}
              percentage={ETH.price[listTimeWindow]}
              icon={<WalletIcon h={"24px"} w={"24px"} color={iconBoxInside} />}
            />
          </SimpleGrid>
        </div>
      </Grid>
      <Grid
        templateColumns={{ sm: "1fr", lg: "2.5fr 1fr" }}
        templateRows={{ sm: "1fr auto", md: "1fr", lg: "1fr" }}
        gap="24px"
      >
        <Holdings
          title={"Holdings"}
          // amount={"30"}
          captions={["Asset", "Weight", "1H", "7D", "30D", "Balance", "Value"]}
          data={tokenDetails}
        />
        <TransactionsOverview
          title={"Token Transactions Overview"}
          // amount={30}
          data={txs.map((e) => convertTxToTimeLineEntry(e, account!))}
        />
      </Grid>
    </Flex>
  );
}

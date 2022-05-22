import { InjectedConnector } from "@web3-react/injected-connector";
import { WalletConnectConnector } from "@web3-react/walletconnect-connector";
import { WalletLinkConnector } from "@web3-react/walletlink-connector";
import { INFURA_ID } from "variables/general";

const injected = new InjectedConnector({
  supportedChainIds: [1, 3, 4, 5, 42, 31337],
});

const walletconnect = new WalletConnectConnector({
  // rpcUrl: `https://mainnet.infura.io/v3/${INFURA_ID}`,
  bridge: "https://bridge.walletconnect.org",
  qrcode: true
});

const walletlink = new WalletLinkConnector({
  url: `https://mainnet.infura.io/v3/${INFURA_ID}`,
  appName: "web3-react-demo"
});

export default {
  injected: injected,
  walletConnect: walletconnect,
  coinbaseWallet: walletlink
} as const;

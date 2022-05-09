// import { ethers } from "ethers";
// import Web3Modal from "web3modal";
// import WalletConnect from "@walletconnect/client";
// // import CoinbaseWalletSDK from "@coinbase/wallet-sdk";

// function getProviderOptions() {
//   const infuraId = process.env.REACT_APP_INFURA_ID;
//   console.log(infuraId)
//   return {
//     walletconnect: {
//       package: WalletConnect,
//       options: {
//         infuraId: "",
//       }
//     },
//     torus: {
//       package: 'Torus'
//     },
//     coinbasewallet: {
//       package: 'CoinbaseWalletSDK',
//       options: {
//         appName: "Web3Modal Example App",
//         infuraId
//       }
//     }
//   };
// }

// const web3Modal = new Web3Modal({
//   // network: "mainnet", // optional
//   // cacheProvider: true, // optional
//   providerOptions: getProviderOptions() // required
// });

// const instancePromise = web3Modal.connect();

// instancePromise.then((instance) => {
//   const provider = new ethers.providers.Web3Provider(instance);
//   // const signer = provider.getSigner();
  
//   // Subscribe to accounts change
//   provider.on("accountsChanged", (accounts: string[]) => {
//     console.log(accounts);
//   });
  
//   // Subscribe to chainId change
//   provider.on("chainChanged", (chainId: number) => {
//     console.log(chainId);
//   });
  
//   // Subscribe to provider connection
//   provider.on("connect", (info: { chainId: number }) => {
//     console.log(info);
//   });
  
//   // Subscribe to provider disconnection
//   provider.on("disconnect", (error: { code: number; message: string }) => {
//     console.log(error);
//   });
//   return provider;
// }).catch(console.error);

// export { web3Modal, instancePromise };
export {};
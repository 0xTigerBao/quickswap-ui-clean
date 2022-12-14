import { Web3Provider } from '@ethersproject/providers';
import { InjectedConnector } from '@web3-react/injected-connector';
import { WalletConnectConnector } from '@web3-react/walletconnect-connector';
import { WalletLinkConnector } from './WalletLink';

import { ChainId } from '@uniswap/sdk';
import { NetworkConnector } from './NetworkConnector';
import { SafeAppConnector } from './SafeApp';

// const POLLING_INTERVAL = 12000;

const NETWORK_URL = process.env.REACT_APP_NETWORK_URL;

export const NETWORK_CHAIN_ID: number = parseInt(
  process.env.REACT_APP_CHAIN_ID ?? '1',
);

if (typeof NETWORK_URL === 'undefined') {
  throw new Error(
    `REACT_APP_NETWORK_URL must be a defined environment variable`,
  );
}

export const network = new NetworkConnector({
  urls: { [Number(ChainId.MAINNET)]: NETWORK_URL },
});

let networkLibrary: Web3Provider | undefined;
export function getNetworkLibrary(): Web3Provider {
  return (networkLibrary =
    networkLibrary ?? new Web3Provider(network.provider as any));
}

export const injected = new InjectedConnector({
  supportedChainIds: [ChainId.MAINNET, ChainId.TESTNET],
});

export const safeApp = new SafeAppConnector();

// mainnet only
export const walletconnect = new WalletConnectConnector({
  rpc: { [ChainId.MAINNET]: NETWORK_URL },
  bridge: 'https://bridge.walletconnect.org',
  qrcode: true,
});

// mainnet only
export const walletlink = new WalletLinkConnector({
  url: NETWORK_URL,
  appName: 'Uniswap',
  appLogoUrl:
    'https://mpng.pngfly.com/20181202/bex/kisspng-emoji-domain-unicorn-pin-badges-sticker-unicorn-tumblr-emoji-unicorn-iphoneemoji-5c046729264a77.5671679315437924251569.jpg',
  supportedChainIds: [ChainId.MAINNET, ChainId.TESTNET],
});

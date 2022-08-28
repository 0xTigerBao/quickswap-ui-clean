import { ChainId } from '@uniswap/sdk';
import MULTICALL_ABI from './abi.json';

const MULTICALL_NETWORKS: { [chainId in ChainId]: string } = {
  [ChainId.TESTNET]: '0x83338f05DbFE39815899E2aD22032B4ee96745Be', //TODO: CHANGE THIS
  [ChainId.MAINNET]: '',
};

export { MULTICALL_ABI, MULTICALL_NETWORKS };

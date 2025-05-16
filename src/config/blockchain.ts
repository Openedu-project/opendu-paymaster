import 'dotenv/config';
import { base, baseSepolia } from 'viem/chains';
import { defineChain, Chain } from 'viem';

const customBaseSepolia = defineChain({
  ...baseSepolia,
  rpcUrls: {
    default: {
      http: ['https://sepolia.base.org', 'https://base-sepolia-rpc.publicnode.com'],
    },
    public: {
      http: ['https://sepolia.base.org', 'https://base-sepolia-rpc.publicnode.com'],
    },
  },
});

const customBase = defineChain({
  ...base,
  rpcUrls: {
    default: {
      http: ['https://mainnet.base.org', 'https://base-mainnet.public.blastapi.io'],
    },
    public: {
      http: ['https://mainnet.base.org', 'https://base-mainnet.public.blastapi.io'],
    },
  },
});

const getChain = (isMain: boolean): Chain => {
  const chain = isMain ? customBase : customBaseSepolia;
  console.log(`Using ${isMain ? 'Base Mainnet' : 'Base Sepolia Testnet'} with chain ID: ${chain.id}`);
  return chain;
};

const getPaymasterRpcUrl = (isMain: boolean): string => {
  const apiKey = process.env.PAYMASTER_API_KEY || '';

  if (!apiKey) {
    return process.env.PAYMASTER_RPC_URL || '';
  }

  return isMain
    ? `https://api.developer.coinbase.com/rpc/v1/base/${apiKey}`
    : `https://api.developer.coinbase.com/rpc/v1/base-sepolia/${apiKey}`;
};

// Function to get the appropriate NFT contract address based on the network
const getNftContractAddress = (isMain: boolean): string => {
  return isMain
    ? process.env.NFT_CONTRACT_ADDRESS_MAINNET || '0xNULL'
    : process.env.NFT_CONTRACT_ADDRESS_TESTNET || '0x0f61205637D02A0799d981A4d9547751a74fB9fC';
};

export const blockchainConfig = {
  paymasterApiKey: process.env.PAYMASTER_API_KEY || '',
  paymasterRpcUrl: process.env.PAYMASTER_RPC_URL || '',
  privateKey: process.env.PRIVATE_KEY || '',
  defaultChain: getChain(false), 
  getChain,
  getPaymasterRpcUrl,
  getNftContractAddress,
};
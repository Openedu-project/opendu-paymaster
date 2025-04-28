import 'dotenv/config';
import { base, baseSepolia } from 'viem/chains';
import { defineChain, Chain } from 'viem';

// Use a custom Base Sepolia chain with a working RPC URL for testnet
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

// Use the Base mainnet chain for mainnet
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

// Default to testnet if not specified
const defaultIsMainnet = process.env.IS_MAIN === 'true';

// Function to get the appropriate chain based on the is_main parameter
const getChain = (isMain: boolean = defaultIsMainnet): Chain => {
  const chain = isMain ? customBase : customBaseSepolia;
  console.log(`Using ${isMain ? 'Base Mainnet' : 'Base Sepolia Testnet'} with chain ID: ${chain.id}`);
  return chain;
};

// Function to get the appropriate Paymaster RPC URL based on the is_main parameter
const getPaymasterRpcUrl = (isMain: boolean = defaultIsMainnet): string => {
  const apiKey = process.env.PAYMASTER_API_KEY || '';

  if (!apiKey) {
    return process.env.PAYMASTER_RPC_URL || '';
  }

  return isMain
    ? `https://api.developer.coinbase.com/rpc/v1/base/${apiKey}`
    : `https://api.developer.coinbase.com/rpc/v1/base-sepolia/${apiKey}`;
};

export const blockchainConfig = {
  paymasterApiKey: process.env.PAYMASTER_API_KEY || '',
  paymasterRpcUrl: process.env.PAYMASTER_RPC_URL || '',
  privateKey: process.env.PRIVATE_KEY || '',
  nftContractAddress: process.env.NFT_CONTRACT_ADDRESS || '0x0f61205637D02A0799d981A4d9547751a74fB9fC',
  defaultChain: getChain(),
  getChain,
  getPaymasterRpcUrl,
  defaultIsMainnet,
};
import 'dotenv/config';
import { base, baseSepolia } from 'viem/chains';
import { defineChain } from 'viem';

// Check if we're using mainnet or testnet
const isMainnet = process.env.IS_MAIN === 'true';

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

// Select the appropriate chain based on the environment
const selectedChain = isMainnet ? customBase : customBaseSepolia;

// Log which network we're using
console.log(`Using ${isMainnet ? 'Base Mainnet' : 'Base Sepolia Testnet'} with chain ID: ${selectedChain.id}`);

export const blockchainConfig = {
  paymasterRpcUrl: process.env.PAYMASTER_RPC_URL || '',
  privateKey: process.env.PRIVATE_KEY || '',
  nftContractAddress: process.env.NFT_CONTRACT_ADDRESS || '0x0f61205637D02A0799d981A4d9547751a74fB9fC',
  chain: selectedChain,
  isMainnet,
};
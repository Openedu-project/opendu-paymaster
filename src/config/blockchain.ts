import 'dotenv/config';
import { baseSepolia } from 'viem/chains';
import { defineChain } from 'viem';

// Use a custom Base Sepolia chain with a working RPC URL
// The standard baseSepolia chain's RPC URL (https://sepolia.base.org) seems to be unreachable
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

// The Coinbase Paymaster API expects the chain ID to be 84532 for Base Sepolia
// Make sure the chain ID in the baseSepolia object matches this value
console.log('Using Base Sepolia chain with ID:', customBaseSepolia.id);

export const blockchainConfig = {
  paymasterRpcUrl: process.env.PAYMASTER_RPC_URL || '',
  privateKey: process.env.PRIVATE_KEY || '',
  nftContractAddress: process.env.NFT_CONTRACT_ADDRESS || '0x0f61205637D02A0799d981A4d9547751a74fB9fC',
  chain: customBaseSepolia,
};
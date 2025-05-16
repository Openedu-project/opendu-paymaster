import { createPublicClient, http, Chain } from 'viem';
import { privateKeyToAccount } from 'viem/accounts';
import { toCoinbaseSmartAccount } from 'viem/account-abstraction';
import { config } from '../config';
import { abi } from '../constants/abi';
import { logger } from '../utils/logger';

// Create owner account from private key
const createOwnerAccount = (isMainnet: boolean = false) => {
  const privateKey = config.blockchain.getPrivateKey(isMainnet);
  if (!privateKey) {
    throw new Error(`Private key for ${isMainnet ? 'mainnet' : 'testnet'} is not configured`);
  }
  return privateKeyToAccount(`0x${privateKey}`);
};

// Create smart account
const createSmartAccount = async (
  chain?: Chain,
  paymasterRpcUrl?: string,
  isMainnet: boolean = false
) => {
  // Use provided chain or default
  const selectedChain = chain || config.blockchain.defaultChain;

  const selectedPaymasterRpcUrl = paymasterRpcUrl || config.blockchain.paymasterRpcUrl;

  const client = createPublicClient({
    chain: selectedChain,
    transport: http(selectedPaymasterRpcUrl),
  });

  const owner = createOwnerAccount(isMainnet);

  logger.info(`Creating smart account for owner: ${owner.address} on ${isMainnet ? 'mainnet' : 'testnet'}`);

  const account = await toCoinbaseSmartAccount({
    client,
    owners: [owner],
  });

  logger.info(`Smart account created: ${account.address}`);

  return account;
};

const checkMinterRole = async (
  accountAddress: string,
  chain?: Chain,
  paymasterRpcUrl?: string,
  isMainnet: boolean = false
) => {
  // Use provided chain or default
  const selectedChain = chain || config.blockchain.defaultChain;

  // Use provided paymaster RPC URL or default
  const selectedPaymasterRpcUrl = paymasterRpcUrl || config.blockchain.paymasterRpcUrl;

  const nftContractAddress = config.blockchain.getNftContractAddress(isMainnet);

  const client = createPublicClient({
    chain: selectedChain,
    transport: http(selectedPaymasterRpcUrl),
  });

  logger.info(`Checking if account ${accountAddress} is the owner of the contract`);

  try {
    const owner = await client.readContract({
      address: nftContractAddress as `0x${string}`,
      abi: abi,
      functionName: 'owner',
      args: [],
    }) as `0x${string}`;

    const isOwner = owner.toLowerCase() === accountAddress.toLowerCase();

    logger.info(`Contract owner: ${owner}`);
    logger.info(`Account ${accountAddress} is the owner: ${isOwner}`);

    return isOwner;
  } catch (error) {
    logger.error(`Error checking if account is owner: ${error}`);
    return false;
  }
};

export const accountService = {
  getSmartAccount: createSmartAccount,
  checkMinterRole,
};

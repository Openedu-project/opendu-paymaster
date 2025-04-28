import { createPublicClient, http } from 'viem';
import { privateKeyToAccount } from 'viem/accounts';
import { toCoinbaseSmartAccount } from 'viem/account-abstraction';
import { config } from '../config';
import { abi } from '../constants/abi';
import { logger } from '../utils/logger';

// Create public client
const client = createPublicClient({
  chain: config.blockchain.chain,
  transport: http(config.blockchain.paymasterRpcUrl),
});

// Create owner account from private key
const createOwnerAccount = () => {
  if (!config.blockchain.privateKey) {
    throw new Error('Private key is not configured');
  }
  return privateKeyToAccount(`0x${config.blockchain.privateKey}`);
};

// Create smart account
const createSmartAccount = async () => {
  const owner = createOwnerAccount();

  logger.info(`Creating smart account for owner: ${owner.address}`);

  const account = await toCoinbaseSmartAccount({
    client,
    owners: [owner],
  });

  logger.info(`Smart account created: ${account.address}`);

  return account;
};

const checkMinterRole = async (accountAddress: string) => {
  logger.info(`Checking if account ${accountAddress} is the owner of the contract`);

  try {
    const owner = await client.readContract({
      address: config.blockchain.nftContractAddress as `0x${string}`,
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

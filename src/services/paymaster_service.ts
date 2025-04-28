import { createBundlerClient } from 'viem/account-abstraction';
import { http, createPublicClient as createViemPublicClient } from 'viem';
import { config } from '../config';
import { accountService } from './account_service';
import { logger } from '../utils/logger';

// create bundler client
const createBundlerClientInstance = async () => {
  const account = await accountService.getSmartAccount();
  
  logger.info(`Creating bundler client for account: ${account.address}`);
  
  const publicClient = createViemPublicClient({
    chain: config.blockchain.chain,
    transport: http(config.blockchain.paymasterRpcUrl),
  });
  
  const bundlerClient = createBundlerClient({
    account,
    client: publicClient,
    transport: http(config.blockchain.paymasterRpcUrl),
    chain: config.blockchain.chain,
  });
  
  logger.info('Bundler client created successfully');
  
  return { bundlerClient, account };
};

export const paymasterService = {
  createBundlerClient: createBundlerClientInstance,
};

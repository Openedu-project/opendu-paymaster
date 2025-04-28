import { createBundlerClient } from 'viem/account-abstraction';
import { http, createPublicClient as createViemPublicClient, Chain } from 'viem';
import { config } from '../config';
import { accountService } from './account_service';
import { logger } from '../utils/logger';

// create bundler client
const createBundlerClientInstance = async (
  chain?: Chain,
  paymasterRpcUrl?: string
) => {
  // Use provided chain or default
  const selectedChain = chain || config.blockchain.defaultChain;

  // Use provided paymaster RPC URL or default
  const selectedPaymasterRpcUrl = paymasterRpcUrl || config.blockchain.paymasterRpcUrl;

  const account = await accountService.getSmartAccount();

  logger.info(`Creating bundler client for account: ${account.address}`);
  logger.info(`Using chain ID: ${selectedChain.id}`);
  logger.info(`Using paymaster RPC URL: ${selectedPaymasterRpcUrl}`);

  const publicClient = createViemPublicClient({
    chain: selectedChain,
    transport: http(selectedPaymasterRpcUrl),
  });

  const bundlerClient = createBundlerClient({
    account,
    client: publicClient,
    transport: http(selectedPaymasterRpcUrl),
    chain: selectedChain,
  });

  logger.info('Bundler client created successfully');

  return { bundlerClient, account };
};

export const paymasterService = {
  createBundlerClient: createBundlerClientInstance,
};

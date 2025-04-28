import { EstimateUserOperationGasParameters } from 'viem/account-abstraction';
import { createPublicClient, http } from 'viem';
import { config } from '../config';
import { abi } from '../constants/abi';
import { paymasterService } from './paymaster_service';
import { MintNFTRequest, MintNFTResponse } from '../dto/mint';
import { logger } from '../utils/logger';

const mintNFT = async (request: MintNFTRequest): Promise<MintNFTResponse> => {
  logger.info(`Minting NFT for receiver: ${request.receiver_address}, token URI: ${request.token_uri}`);

  try {
    const { bundlerClient, account } = await paymasterService.createBundlerClient();
    logger.info(`Using smart account: ${account.address}`);

    const publicClient = createPublicClient({
      chain: config.blockchain.chain,
      transport: http('https://base-sepolia-rpc.publicnode.com'),
    });

    logger.info(`Attempting to mint with smart account: ${account.address}`);

    try {
      const currentOwner = await publicClient.readContract({
        address: config.blockchain.nftContractAddress as `0x${string}`,
        abi,
        functionName: 'owner',
      }) as `0x${string}`;
      logger.info(`Current owner: ${currentOwner}`);

      if (currentOwner.toLowerCase() === account.address.toLowerCase()) {
        logger.info(`Smart account is the owner of the contract`);
      } else {
        logger.info(`Smart account is not the owner, but it might have the minter role`);
      }
    } catch (error) {
      logger.warn(`Could not check ownership: ${error}`);
      logger.info(`Proceeding with mint attempt anyway`);
    }

    account.userOperation = {
      estimateGas: async (userOperation) => {
        logger.info('Estimating gas for user operation');

        const estimate = await bundlerClient.estimateUserOperationGas(
          userOperation as EstimateUserOperationGasParameters
        );

        estimate.preVerificationGas = estimate.preVerificationGas * 2n;

        logger.info(`Gas estimate: ${JSON.stringify({
          callGasLimit: estimate.callGasLimit.toString(),
          verificationGasLimit: estimate.verificationGasLimit.toString(),
          preVerificationGas: estimate.preVerificationGas.toString(),
        })}`);

        return estimate;
      },
    };

    logger.info('Sending user operation to mint NFT');

    // Send user operation to mint NFT
    const userOpHash = await bundlerClient.sendUserOperation({
      account,
      calls: [
        {
          abi: abi,
          functionName: 'mint',
          to: config.blockchain.nftContractAddress as `0x${string}`,
          args: [
            request.receiver_address,
            request.token_uri,
          ],
        },
      ],
      paymaster: true,
    });

    logger.info(`User operation hash: ${userOpHash}`);

    // Wait for receipt
    logger.info('Waiting for user operation receipt');
    const receipt = await bundlerClient.waitForUserOperationReceipt({
      hash: userOpHash,
    });

    logger.info(`Transaction hash: ${receipt.receipt.transactionHash}`);
    logger.info(`✅ Transaction successfully sponsored!`);
    logger.info(`⛽ View sponsored UserOperation on blockscout: https://base-sepolia.blockscout.com/op/${receipt.userOpHash}`);
    logger.info(`🔍 View NFT mint on basescan: https://sepolia.basescan.org/address/${account.address}`);

    return {
      status: 'success',
      tx_hash: receipt.receipt.transactionHash,
      user_op_hash: receipt.userOpHash,
      block_number: receipt.receipt.blockNumber.toString(),
      block_hash: receipt.receipt.blockHash,
      timestamp: Date.now(),
    };
  } catch (error) {
    logger.error('Error minting NFT:', error);
    throw new Error('Failed to mint NFT');
  }
};

export const mintService = {
  mintNFT,
};

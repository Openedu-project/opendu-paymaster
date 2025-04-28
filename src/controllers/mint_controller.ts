import { Context } from 'hono';
import { mintService } from '../services';
import { ResponseUtil } from '../utils/response';
import { MintNFTRequest } from '../dto/mint';
import { z } from 'zod';
import { logger } from '../utils/logger';

export const mintController = {
  mintNFT: async (c: Context) => {
    try {
      const body = await c.req.json();
      
      // Validate request
      const schema = z.object({
        receiver_address: z.string().startsWith('0x'),
        token_uri: z.string().url(),
      });
      
      const result = schema.safeParse(body);
      if (!result.success) {
        logger.error(`Invalid request data: ${JSON.stringify(result.error)}`);
        return ResponseUtil.badRequest(c, 'Invalid request data', result.error.format());
      }
      
      const request: MintNFTRequest = result.data;
      
      // Call service to mint NFT
      const response = await mintService.mintNFT(request);
      
      return ResponseUtil.success(c, response);
    } catch (error) {
      logger.error('Error minting NFT:', error);
      return ResponseUtil.internalServerError(c, 'Failed to mint NFT');
    }
  }
};

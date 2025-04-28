export interface MintNFTRequest {
  receiver_address: string;
  token_uri: string;
}

export interface MintNFTResponse {
  status: string;
  tx_hash: string;
  user_op_hash: string;
  token_id?: string;
  block_number?: string;
  block_hash?: string;
  timestamp: number;
}

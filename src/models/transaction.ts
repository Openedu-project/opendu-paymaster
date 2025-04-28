export interface Transaction {
  id: string;
  tx_hash: string;
  user_op_hash: string;
  receiver_address: string;
  token_uri: string;
  token_id?: string;
  block_number?: string;
  block_hash?: string;
  status: 'pending' | 'success' | 'failed';
  error?: string;
  created_at: number;
  updated_at: number;
}

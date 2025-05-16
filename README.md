# OpenEdu Paymaster Service

A TypeScript microservice built with Bun and Hono to implement Account Abstraction functionality for the OpenEdu blockchain project. This service uses Coinbase Paymaster to sponsor gas fees for NFT minting on Base network.

## Features

- Account Abstraction (ERC-4337) support
- Gas fee sponsoring via Coinbase Paymaster
- NFT minting on Base network (both Mainnet and Sepolia Testnet)
- Dynamic network selection per request
- RESTful API with authentication
- CORS support for multiple origins

## API Endpoints

### Health Check

```
GET /api/v1/health
```

Response:
```json
{
  "code": 200,
  "message": "Success",
  "data": {
    "status": "ok",
    "timestamp": "2023-04-24T12:34:56.789Z",
    "service": "openedu-paymaster"
  }
}
```

### Mint NFT

```
POST /api/v1/mint-nft
Headers:
  X-API-Key: your_api_key_here
Body:
{
  "receiver_address": "0x7f4A3Fe909524CEa8C91fFdEf717C797581AE36D",
  "token_uri": "https://example.com/metadata.json",
  "is_main": false
}
```

Parameters:
- `receiver_address`: The Ethereum address that will receive the NFT
- `token_uri`: The URI pointing to the NFT metadata
- `is_main`: (Optional) Boolean flag to determine whether to use Base Mainnet (`true`) or Base Sepolia Testnet (`false`). Defaults to `false` if not provided.

Response:
```json
{
  "code": 200,
  "message": "Success",
  "data": {
    "status": "success",
    "tx_hash": "0xa18a01cd2202fa1a491d2344ab1a4786c5a701c7e031c17a74680e0769b60817",
    "user_op_hash": "0xffe65d94d66f697a1206ba35ebf01b2b17238ce97134acfb4ae278a32a8bddc4",
    "token_id": "123",
    "token_url": "https://sepolia.basescan.org/nft/0x0f61205637D02A0799d981A4d9547751a74fB9fC/123",
    "block_number": "12345678",
    "block_hash": "0xffe65d94d66f697a1206ba35ebf01b2b17238ce97134acfb4ae278a32a8bddc4",
    "timestamp": 1745496615323,
    "network": "Base Sepolia Testnet"
  }
}
```

## Project Setup

### Prerequisites

- [Bun](https://bun.sh/) version 1.0.0 or higher
- Coinbase Paymaster API Key
- Private key for the account that will be used to create the smart account
- NFT contract addresses for both mainnet and testnet

### Installation

1. Clone the repository:

```bash
git clone <repository-url>
cd openedu-paymaster
```

2. Install dependencies:

```bash
bun install
```

3. Create a `.env` file from the example:

```bash
cp .env.example .env
```

4. Update the `.env` file with your configuration:

```env
PORT=8088
PAYMASTER_API_KEY=your_paymaster_api_key_here
PRIVATE_KEY=your_private_key_without_0x_prefix
NFT_CONTRACT_ADDRESS_MAINNET=your_mainnet_nft_contract_address_here
NFT_CONTRACT_ADDRESS_TESTNET=your_testnet_nft_contract_address_here
API_KEY=your_api_key_here
ALLOWED_ORIGINS=https://your-frontend-domain.com
```

### Running the Service

Development mode:

```bash
bun dev
```

Production mode:

```bash
bun run build
bun start
```

## Deployment

### Railway.app

1. Fork this repository to your GitHub account
2. Create a new project on [Railway.app](https://railway.app)
3. Connect your GitHub repository
4. Add the following environment variables:

```env
API_KEY=your_api_key_here
PAYMASTER_API_KEY=your_paymaster_api_key
PRIVATE_KEY=your_private_key_without_0x_prefix
NFT_CONTRACT_ADDRESS_MAINNET=your_mainnet_nft_contract_address_here
NFT_CONTRACT_ADDRESS_TESTNET=your_testnet_nft_contract_address_here
ALLOWED_ORIGINS=https://your-frontend-domain.com
```

5. Deploy the project

The service will be automatically deployed and available at your Railway.app URL.

### Docker

1. Build the Docker image:

```bash
docker build -t openedu-paymaster .
```

2. Run the container:

```bash
docker run -p 8088:8088 \
  -e API_KEY=your_api_key_here \
  -e PAYMASTER_API_KEY=your_paymaster_api_key \
  -e PRIVATE_KEY=your_private_key_without_0x_prefix \
  -e NFT_CONTRACT_ADDRESS_MAINNET=your_mainnet_nft_contract_address_here \
  -e NFT_CONTRACT_ADDRESS_TESTNET=your_testnet_nft_contract_address_here \
  -e ALLOWED_ORIGINS=https://your-frontend-domain.com \
  openedu-paymaster
```

## Technical Details

### Architecture

The service follows a clean architecture pattern with the following layers:

- **API Routes**: Handle HTTP requests and responses
- **Controllers**: Process requests and call appropriate services
- **Services**: Contain business logic
- **Models**: Define data structures
- **DTOs**: Define data transfer objects
- **Middleware**: Handle cross-cutting concerns
- **Utils**: Provide utility functions
- **Config**: Centralized configuration management

### Technologies

- **Bun**: JavaScript runtime and package manager
- **TypeScript**: Programming language
- **Hono**: Web framework
- **Viem**: Ethereum library
- **Viem-AA**: Account Abstraction extension for Viem
- **Zod**: Schema validation

### Key Features

- **Network Selection**: Dynamic selection between Base Mainnet and Base Sepolia Testnet per request
- **Contract Address Management**: Separate contract addresses for mainnet and testnet environments
- **Token URL Generation**: Automatic generation of BaseScan URLs for viewing minted NFTs
- **CORS Configuration**: Flexible CORS configuration for multiple origins
- **Error Handling**: Comprehensive error handling and logging

## License

MIT

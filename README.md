# OpenEdu Paymaster Service

A TypeScript microservice built with Bun and Hono to implement Account Abstraction functionality for the OpenEdu blockchain project. This service uses Coinbase Paymaster to sponsor gas fees for NFT minting on Base network.

## Features

- Account Abstraction (ERC-4337) support
- Gas fee sponsoring via Coinbase Paymaster
- NFT minting on Base network
- RESTful API with authentication

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
POST /api/v1/mint
Headers:
  X-API-Key: your_api_key_here
Body:
{
  "receiver_address": "0x7f4A3Fe909524CEa8C91fFdEf717C797581AE36D",
  "token_uri": "https://example.com/metadata.json"
}
```

Response:
```json
{
  "code": 200,
  "message": "Success",
  "data": {
    "status": "success",
    "tx_hash": "0xa18a01cd2202fa1a491d2344ab1a4786c5a701c7e031c17a74680e0769b60817",
    "user_op_hash": "0xffe65d94d66f697a1206ba35ebf01b2b17238ce97134acfb4ae278a32a8bddc4",
    "block_number": "12345678",
    "block_hash": "0xffe65d94d66f697a1206ba35ebf01b2b17238ce97134acfb4ae278a32a8bddc4",
    "timestamp": 1745496615323
  }
}
```

## Project Setup

### Prerequisites

- [Bun](https://bun.sh/) version 1.0.0 or higher
- Base Sepolia RPC URL
- Coinbase Paymaster RPC URL
- Private key for the account that will be used to create the smart account

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
```
PORT=8080
PAYMASTER_RPC_URL=your_paymaster_rpc_url
PRIVATE_KEY=your_private_key_without_0x_prefix
NFT_CONTRACT_ADDRESS=0x0f61205637D02A0799d981A4d9547751a74fB9fC
API_KEY=your_api_key_here
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

### Technologies

- **Bun**: JavaScript runtime and package manager
- **TypeScript**: Programming language
- **Hono**: Web framework
- **Viem**: Ethereum library
- **Viem-AA**: Account Abstraction extension for Viem
- **Zod**: Schema validation

## License

MIT

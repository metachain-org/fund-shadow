# Fund Shadow - Decentralized Charity Platform

A fully homomorphic encryption (FHE) powered charity platform built on Sepolia testnet, enabling transparent and privacy-preserving charitable donations.

## Features

- **FHE-Encrypted Donations**: All donation amounts and sensitive data are encrypted using fully homomorphic encryption
- **Multi-Wallet Support**: Connect with Rainbow, MetaMask, and other popular wallets
- **Transparent Impact Tracking**: View real-time impact reports and fund utilization
- **Decentralized Verification**: Community-driven campaign verification system
- **Privacy-Preserving Analytics**: Analyze donation patterns without compromising user privacy

## Technology Stack

- **Frontend**: React 18, TypeScript, Vite
- **UI Components**: shadcn/ui, Tailwind CSS
- **Blockchain**: Ethereum Sepolia Testnet
- **Wallet Integration**: RainbowKit, Wagmi, Viem
- **Encryption**: FHEVM (Fully Homomorphic Encryption)
- **Smart Contracts**: Solidity with FHE support

## Getting Started

### Prerequisites

- Node.js 18+ and npm
- Git
- A Web3 wallet (MetaMask, Rainbow, etc.)

### Installation

```bash
# Clone the repository
git clone https://github.com/metachain-org/fund-shadow.git

# Navigate to the project directory
cd fund-shadow

# Install dependencies
npm install

# Start the development server
npm run dev
```

### Environment Configuration

Create a `.env.local` file in the root directory:

```env
NEXT_PUBLIC_CHAIN_ID=11155111
NEXT_PUBLIC_RPC_URL=https://sepolia.infura.io/v3/b18fb7e6ca7045ac83c41157ab93f990
NEXT_PUBLIC_WALLET_CONNECT_PROJECT_ID=2ec9743d0d0cd7fb94dee1a7e6d33475
NEXT_PUBLIC_INFURA_API_KEY=b18fb7e6ca7045ac83c41157ab93f990
NEXT_PUBLIC_RPC_URL=https://1rpc.io/sepolia
```

## Smart Contract Features

The platform includes a comprehensive smart contract system with:

- **Encrypted Campaign Management**: Create and manage charity campaigns with FHE-encrypted target amounts
- **Privacy-Preserving Donations**: Make donations without revealing exact amounts publicly
- **Impact Reporting**: Submit and verify impact reports with encrypted beneficiary data
- **Reputation System**: Track donor and charity reputation scores using FHE
- **Fund Withdrawal**: Secure fund withdrawal mechanisms for verified campaigns

## Development

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

### Project Structure

```
src/
├── components/          # Reusable UI components
├── pages/              # Application pages
├── hooks/              # Custom React hooks
├── lib/                # Utility functions
└── contracts/          # Smart contract interfaces
```

## Deployment

### Vercel Deployment

1. Connect your GitHub repository to Vercel
2. Configure environment variables in Vercel dashboard
3. Deploy automatically on push to main branch

### Manual Deployment

```bash
# Build the project
npm run build

# Deploy to your preferred hosting service
# The build output will be in the 'dist' directory
```

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Support

For support and questions, please open an issue in the GitHub repository or contact the development team.

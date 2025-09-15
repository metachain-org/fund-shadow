# Environment Configuration

This document explains how to configure environment variables for Fund Shadow.

## Required Environment Variables

Create a `.env.local` file in the project root with the following variables:

```env
# Blockchain Configuration
NEXT_PUBLIC_CHAIN_ID=11155111
NEXT_PUBLIC_RPC_URL=https://sepolia.infura.io/v3/YOUR_INFURA_KEY
NEXT_PUBLIC_WALLET_CONNECT_PROJECT_ID=YOUR_WALLETCONNECT_ID

# Optional: Additional RPC endpoints
NEXT_PUBLIC_INFURA_API_KEY=YOUR_INFURA_KEY
NEXT_PUBLIC_RPC_URL=https://1rpc.io/sepolia

# Vite Environment Variables (alternative naming)
VITE_WALLET_CONNECT_PROJECT_ID=YOUR_WALLETCONNECT_ID
VITE_RPC_URL=https://sepolia.infura.io/v3/YOUR_INFURA_KEY
```

## How to Get API Keys

### Infura API Key
1. Go to [infura.io](https://infura.io)
2. Create an account and log in
3. Create a new project
4. Copy the project ID from the project settings

### WalletConnect Project ID
1. Go to [cloud.walletconnect.com](https://cloud.walletconnect.com)
2. Create an account and log in
3. Create a new project
4. Copy the project ID from the project settings

## Security Notes

- Never commit `.env.local` to version control
- Use different API keys for development and production
- Rotate API keys regularly
- Keep your API keys secure and private

## Deployment

For production deployment, configure these environment variables in your hosting platform (Vercel, Netlify, etc.) rather than using a `.env.local` file.

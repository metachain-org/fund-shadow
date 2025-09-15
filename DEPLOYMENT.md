# Vercel Deployment Guide for Fund Shadow

This guide provides step-by-step instructions for deploying Fund Shadow to Vercel.

## Prerequisites

- GitHub account with access to the fund-shadow repository
- Vercel account (free tier available)
- Node.js 18+ installed locally (for testing)

## Step-by-Step Deployment

### 1. Create Vercel Account

1. Go to [vercel.com](https://vercel.com)
2. Click "Sign Up" and choose "Continue with GitHub"
3. Authorize Vercel to access your GitHub account

### 2. Import Project

1. In your Vercel dashboard, click "New Project"
2. Find and select the `metachain-org/fund-shadow` repository
3. Click "Import"

### 3. Configure Project Settings

#### Build Settings
- **Framework Preset**: Vite
- **Root Directory**: `./` (default)
- **Build Command**: `npm run build`
- **Output Directory**: `dist`
- **Install Command**: `npm install`

#### Environment Variables
Add the following environment variables in the Vercel dashboard:

```
NEXT_PUBLIC_CHAIN_ID=11155111
NEXT_PUBLIC_RPC_URL=https://sepolia.infura.io/v3/YOUR_INFURA_KEY
NEXT_PUBLIC_WALLET_CONNECT_PROJECT_ID=YOUR_WALLETCONNECT_ID
NEXT_PUBLIC_INFURA_API_KEY=YOUR_INFURA_KEY
NEXT_PUBLIC_RPC_URL=https://1rpc.io/sepolia
```

**To add environment variables:**
1. In your project settings, go to "Environment Variables"
2. Click "Add New"
3. Add each variable with the exact name and value above
4. Make sure to add them for all environments (Production, Preview, Development)

### 4. Deploy

1. Click "Deploy" to start the deployment process
2. Wait for the build to complete (usually 2-5 minutes)
3. Once deployed, you'll get a live URL (e.g., `https://fund-shadow-xxx.vercel.app`)

### 5. Custom Domain (Optional)

1. In your project settings, go to "Domains"
2. Click "Add Domain"
3. Enter your custom domain
4. Follow the DNS configuration instructions
5. Wait for DNS propagation (up to 24 hours)

## Post-Deployment Configuration

### 1. Update Contract Address

After deploying your smart contract to Sepolia testnet:

1. Update the `CONTRACT_ADDRESS` in `src/lib/contracts.ts`
2. Commit and push the changes
3. Vercel will automatically redeploy

### 2. Configure WalletConnect

1. Go to [WalletConnect Cloud](https://cloud.walletconnect.com)
2. Create a new project
3. Update the `NEXT_PUBLIC_WALLET_CONNECT_PROJECT_ID` environment variable in Vercel

### 3. Test the Application

1. Visit your deployed URL
2. Connect a wallet (MetaMask, Rainbow, etc.)
3. Switch to Sepolia testnet
4. Test the core functionality

## Environment-Specific Configurations

### Production Environment
- Use production RPC endpoints
- Set up proper error monitoring
- Configure analytics if needed

### Preview Environment
- Automatically created for pull requests
- Uses the same environment variables as production
- Perfect for testing before merging

### Development Environment
- For local development
- Uses local environment variables from `.env.local`

## Troubleshooting

### Common Issues

1. **Build Failures**
   - Check that all dependencies are in `package.json`
   - Ensure Node.js version is 18+
   - Check build logs in Vercel dashboard

2. **Environment Variables Not Working**
   - Verify variable names match exactly (case-sensitive)
   - Ensure variables are added to all environments
   - Redeploy after adding new variables

3. **Wallet Connection Issues**
   - Verify WalletConnect Project ID is correct
   - Check that the app is using HTTPS
   - Ensure RPC URLs are accessible

4. **Contract Interaction Failures**
   - Verify contract address is correct
   - Check that contract is deployed on Sepolia
   - Ensure user has Sepolia ETH for gas fees

### Performance Optimization

1. **Enable Edge Functions** (if needed)
2. **Configure CDN settings**
3. **Set up caching headers**
4. **Optimize images and assets**

## Monitoring and Analytics

### Vercel Analytics
1. Enable Vercel Analytics in project settings
2. Monitor performance metrics
3. Track user interactions

### Error Monitoring
Consider integrating:
- Sentry for error tracking
- LogRocket for session replay
- Google Analytics for user behavior

## Security Considerations

1. **Environment Variables**
   - Never commit sensitive keys to Git
   - Use Vercel's environment variable system
   - Rotate keys regularly

2. **HTTPS**
   - Vercel provides HTTPS by default
   - Ensure all external API calls use HTTPS

3. **Content Security Policy**
   - Configure CSP headers in `vercel.json`
   - Restrict external resource loading

## Maintenance

### Regular Updates
1. Keep dependencies updated
2. Monitor for security vulnerabilities
3. Update environment variables as needed

### Backup Strategy
1. Regular database backups (if applicable)
2. Export environment variables
3. Keep local copies of important configurations

## Support

For issues with:
- **Vercel**: Check [Vercel Documentation](https://vercel.com/docs)
- **Project-specific**: Create an issue in the GitHub repository
- **Smart Contract**: Check Sepolia testnet explorer

## Deployment Checklist

- [ ] Vercel account created
- [ ] Project imported from GitHub
- [ ] Environment variables configured
- [ ] Build settings verified
- [ ] Initial deployment successful
- [ ] Wallet connection tested
- [ ] Contract interaction tested
- [ ] Custom domain configured (if applicable)
- [ ] Analytics enabled
- [ ] Error monitoring set up

## Next Steps

After successful deployment:

1. **Deploy Smart Contract** to Sepolia testnet
2. **Update Contract Address** in the application
3. **Test All Features** thoroughly
4. **Set up Monitoring** and analytics
5. **Document API Endpoints** (if applicable)
6. **Create User Documentation**

Your Fund Shadow application should now be live and accessible to users worldwide!

// Contract interfaces and configurations for Fund Shadow
export const CONTRACT_ADDRESS = "0x0000000000000000000000000000000000000000"; // To be deployed
export const CONTRACT_ABI = [
  // Campaign Management
  {
    "inputs": [
      {"internalType": "string", "name": "_name", "type": "string"},
      {"internalType": "string", "name": "_description", "type": "string"},
      {"internalType": "bytes", "name": "_targetAmount", "type": "bytes"},
      {"internalType": "bytes", "name": "_targetAmountProof", "type": "bytes"},
      {"internalType": "uint256", "name": "_duration", "type": "uint256"},
      {"internalType": "string", "name": "_category", "type": "string"},
      {"internalType": "string", "name": "_imageHash", "type": "string"}
    ],
    "name": "createCampaign",
    "outputs": [{"internalType": "uint256", "name": "", "type": "uint256"}],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {"internalType": "uint256", "name": "campaignId", "type": "uint256"},
      {"internalType": "bytes", "name": "amount", "type": "bytes"},
      {"internalType": "bytes", "name": "_amountProof", "type": "bytes"},
      {"internalType": "string", "name": "message", "type": "string"}
    ],
    "name": "makeDonation",
    "outputs": [{"internalType": "uint256", "name": "", "type": "uint256"}],
    "stateMutability": "payable",
    "type": "function"
  },
  {
    "inputs": [
      {"internalType": "uint256", "name": "campaignId", "type": "uint256"},
      {"internalType": "bytes", "name": "beneficiariesReached", "type": "bytes"},
      {"internalType": "bytes", "name": "fundsUtilized", "type": "bytes"},
      {"internalType": "string", "name": "reportHash", "type": "string"},
      {"internalType": "string", "name": "description", "type": "string"}
    ],
    "name": "submitImpactReport",
    "outputs": [{"internalType": "uint256", "name": "", "type": "uint256"}],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  // View Functions
  {
    "inputs": [{"internalType": "uint256", "name": "campaignId", "type": "uint256"}],
    "name": "getCampaignInfo",
    "outputs": [
      {"internalType": "string", "name": "name", "type": "string"},
      {"internalType": "string", "name": "description", "type": "string"},
      {"internalType": "string", "name": "category", "type": "string"},
      {"internalType": "string", "name": "imageHash", "type": "string"},
      {"internalType": "bool", "name": "isActive", "type": "bool"},
      {"internalType": "bool", "name": "isVerified", "type": "bool"},
      {"internalType": "address", "name": "organizer", "type": "address"},
      {"internalType": "uint256", "name": "startTime", "type": "uint256"},
      {"internalType": "uint256", "name": "endTime", "type": "uint256"}
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [{"internalType": "uint256", "name": "donationId", "type": "uint256"}],
    "name": "getDonationInfo",
    "outputs": [
      {"internalType": "address", "name": "donor", "type": "address"},
      {"internalType": "uint256", "name": "timestamp", "type": "uint256"},
      {"internalType": "string", "name": "message", "type": "string"}
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [{"internalType": "address", "name": "donor", "type": "address"}],
    "name": "getDonorProfile",
    "outputs": [
      {"internalType": "string", "name": "name", "type": "string"},
      {"internalType": "string", "name": "bio", "type": "string"},
      {"internalType": "bool", "name": "isVerified", "type": "bool"}
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [{"internalType": "uint256", "name": "campaignId", "type": "uint256"}],
    "name": "getCampaignDonations",
    "outputs": [{"internalType": "uint256[]", "name": "", "type": "uint256[]"}],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [{"internalType": "address", "name": "donor", "type": "address"}],
    "name": "getDonorCampaigns",
    "outputs": [{"internalType": "uint256[]", "name": "", "type": "uint256[]"}],
    "stateMutability": "view",
    "type": "function"
  },
  // Events
  {
    "anonymous": false,
    "inputs": [
      {"indexed": true, "internalType": "uint256", "name": "campaignId", "type": "uint256"},
      {"indexed": true, "internalType": "address", "name": "organizer", "type": "address"},
      {"indexed": false, "internalType": "string", "name": "name", "type": "string"}
    ],
    "name": "CampaignCreated",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {"indexed": true, "internalType": "uint256", "name": "donationId", "type": "uint256"},
      {"indexed": true, "internalType": "uint256", "name": "campaignId", "type": "uint256"},
      {"indexed": true, "internalType": "address", "name": "donor", "type": "address"}
    ],
    "name": "DonationMade",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {"indexed": true, "internalType": "uint256", "name": "reportId", "type": "uint256"},
      {"indexed": true, "internalType": "uint256", "name": "campaignId", "type": "uint256"},
      {"indexed": true, "internalType": "address", "name": "reporter", "type": "address"}
    ],
    "name": "ImpactReported",
    "type": "event"
  }
] as const;

// Campaign categories
export const CAMPAIGN_CATEGORIES = [
  "Education",
  "Healthcare",
  "Environment",
  "Poverty Relief",
  "Disaster Relief",
  "Animal Welfare",
  "Arts & Culture",
  "Technology",
  "Community Development",
  "Research"
] as const;

// Contract interaction hooks
export interface CampaignData {
  id: number;
  name: string;
  description: string;
  category: string;
  imageHash: string;
  isActive: boolean;
  isVerified: boolean;
  organizer: string;
  startTime: bigint;
  endTime: bigint;
  targetAmount?: number;
  currentAmount?: number;
  donorCount?: number;
}

export interface DonationData {
  id: number;
  donor: string;
  timestamp: bigint;
  message: string;
  amount?: number;
}

export interface DonorProfile {
  name: string;
  bio: string;
  isVerified: boolean;
  totalDonated?: number;
  donationCount?: number;
  reputationScore?: number;
}

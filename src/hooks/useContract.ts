import { useReadContract, useWriteContract, useWaitForTransactionReceipt } from 'wagmi'
import { CONTRACT_ADDRESS, CONTRACT_ABI, CampaignData, DonationData, DonorProfile } from '@/lib/contracts'
import { useAccount } from 'wagmi'
import { useState } from 'react'

// Hook for reading campaign information
export function useCampaign(campaignId: number) {
  const { data, error, isLoading } = useReadContract({
    address: CONTRACT_ADDRESS,
    abi: CONTRACT_ABI,
    functionName: 'getCampaignInfo',
    args: [BigInt(campaignId)],
  })

  return {
    campaign: data as CampaignData | undefined,
    isLoading,
    error,
  }
}

// Hook for reading donation information
export function useDonation(donationId: number) {
  const { data, error, isLoading } = useReadContract({
    address: CONTRACT_ADDRESS,
    abi: CONTRACT_ABI,
    functionName: 'getDonationInfo',
    args: [BigInt(donationId)],
  })

  return {
    donation: data as DonationData | undefined,
    isLoading,
    error,
  }
}

// Hook for reading donor profile
export function useDonorProfile(donorAddress: string) {
  const { data, error, isLoading } = useReadContract({
    address: CONTRACT_ADDRESS,
    abi: CONTRACT_ABI,
    functionName: 'getDonorProfile',
    args: [donorAddress],
  })

  return {
    profile: data as DonorProfile | undefined,
    isLoading,
    error,
  }
}

// Hook for getting campaign donations
export function useCampaignDonations(campaignId: number) {
  const { data, error, isLoading } = useReadContract({
    address: CONTRACT_ADDRESS,
    abi: CONTRACT_ABI,
    functionName: 'getCampaignDonations',
    args: [BigInt(campaignId)],
  })

  return {
    donationIds: data as bigint[] | undefined,
    isLoading,
    error,
  }
}

// Hook for getting donor campaigns
export function useDonorCampaigns(donorAddress: string) {
  const { data, error, isLoading } = useReadContract({
    address: CONTRACT_ADDRESS,
    abi: CONTRACT_ABI,
    functionName: 'getDonorCampaigns',
    args: [donorAddress],
  })

  return {
    campaignIds: data as bigint[] | undefined,
    isLoading,
    error,
  }
}

// Hook for creating campaigns
export function useCreateCampaign() {
  const { writeContract, data: hash, error, isPending } = useWriteContract()
  const { isLoading: isConfirming, isSuccess: isConfirmed } = useWaitForTransactionReceipt({
    hash,
  })

  const createCampaign = async (
    name: string,
    description: string,
    targetAmount: string, // Encrypted amount as hex string
    targetAmountProof: string, // Proof as hex string
    duration: number,
    category: string,
    imageHash: string
  ) => {
    try {
      writeContract({
        address: CONTRACT_ADDRESS,
        abi: CONTRACT_ABI,
        functionName: 'createCampaign',
        args: [
          name,
          description,
          targetAmount,
          targetAmountProof,
          BigInt(duration),
          category,
          imageHash,
        ],
      })
    } catch (err) {
      console.error('Error creating campaign:', err)
    }
  }

  return {
    createCampaign,
    hash,
    error,
    isPending,
    isConfirming,
    isConfirmed,
  }
}

// Hook for making donations
export function useMakeDonation() {
  const { writeContract, data: hash, error, isPending } = useWriteContract()
  const { isLoading: isConfirming, isSuccess: isConfirmed } = useWaitForTransactionReceipt({
    hash,
  })

  const makeDonation = async (
    campaignId: number,
    amount: string, // Encrypted amount as hex string
    amountProof: string, // Proof as hex string
    message: string,
    value?: bigint // ETH value to send
  ) => {
    try {
      writeContract({
        address: CONTRACT_ADDRESS,
        abi: CONTRACT_ABI,
        functionName: 'makeDonation',
        args: [
          BigInt(campaignId),
          amount,
          amountProof,
          message,
        ],
        value,
      })
    } catch (err) {
      console.error('Error making donation:', err)
    }
  }

  return {
    makeDonation,
    hash,
    error,
    isPending,
    isConfirming,
    isConfirmed,
  }
}

// Hook for submitting impact reports
export function useSubmitImpactReport() {
  const { writeContract, data: hash, error, isPending } = useWriteContract()
  const { isLoading: isConfirming, isSuccess: isConfirmed } = useWaitForTransactionReceipt({
    hash,
  })

  const submitImpactReport = async (
    campaignId: number,
    beneficiariesReached: string, // Encrypted amount as hex string
    fundsUtilized: string, // Encrypted amount as hex string
    reportHash: string,
    description: string
  ) => {
    try {
      writeContract({
        address: CONTRACT_ADDRESS,
        abi: CONTRACT_ABI,
        functionName: 'submitImpactReport',
        args: [
          BigInt(campaignId),
          beneficiariesReached,
          fundsUtilized,
          reportHash,
          description,
        ],
      })
    } catch (err) {
      console.error('Error submitting impact report:', err)
    }
  }

  return {
    submitImpactReport,
    hash,
    error,
    isPending,
    isConfirming,
    isConfirmed,
  }
}

// Hook for updating donor profile
export function useUpdateDonorProfile() {
  const { writeContract, data: hash, error, isPending } = useWriteContract()
  const { isLoading: isConfirming, isSuccess: isConfirmed } = useWaitForTransactionReceipt({
    hash,
  })

  const updateProfile = async (
    name: string,
    bio: string,
    isVerified: boolean
  ) => {
    try {
      writeContract({
        address: CONTRACT_ADDRESS,
        abi: CONTRACT_ABI,
        functionName: 'updateDonorProfile',
        args: [
          name,
          bio,
          isVerified,
        ],
      })
    } catch (err) {
      console.error('Error updating profile:', err)
    }
  }

  return {
    updateProfile,
    hash,
    error,
    isPending,
    isConfirming,
    isConfirmed,
  }
}

// Hook for withdrawing funds
export function useWithdrawFunds() {
  const { writeContract, data: hash, error, isPending } = useWriteContract()
  const { isLoading: isConfirming, isSuccess: isConfirmed } = useWaitForTransactionReceipt({
    hash,
  })

  const withdrawFunds = async (campaignId: number) => {
    try {
      writeContract({
        address: CONTRACT_ADDRESS,
        abi: CONTRACT_ABI,
        functionName: 'withdrawFunds',
        args: [BigInt(campaignId)],
      })
    } catch (err) {
      console.error('Error withdrawing funds:', err)
    }
  }

  return {
    withdrawFunds,
    hash,
    error,
    isPending,
    isConfirming,
    isConfirmed,
  }
}

// Hook for contract events
export function useContractEvents() {
  const [events, setEvents] = useState<any[]>([])

  // This would typically use wagmi's useWatchContractEvent hook
  // For now, we'll return a placeholder
  return {
    events,
    setEvents,
  }
}

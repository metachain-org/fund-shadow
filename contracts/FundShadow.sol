// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import { SepoliaConfig } from "@fhevm/solidity/config/ZamaConfig.sol";
import { euint32, externalEuint32, euint8, ebool, FHE } from "@fhevm/solidity/lib/FHE.sol";

contract FundShadow is SepoliaConfig {
    using FHE for *;
    
    struct CharityCampaign {
        euint32 campaignId;
        euint32 targetAmount;
        euint32 currentAmount;
        euint32 donorCount;
        ebool isActive;
        ebool isVerified;
        string name;
        string description;
        address organizer;
        uint256 startTime;
        uint256 endTime;
        string category;
        string imageHash;
    }
    
    struct Donation {
        euint32 donationId;
        euint32 amount;
        address donor;
        uint256 timestamp;
        string message;
    }
    
    struct ImpactReport {
        euint32 reportId;
        euint32 beneficiariesReached;
        euint32 fundsUtilized;
        ebool isVerified;
        string reportHash;
        string description;
        address reporter;
        uint256 timestamp;
    }
    
    struct DonorProfile {
        euint32 totalDonated;
        euint32 donationCount;
        euint32 reputationScore;
        ebool isVerified;
        string name;
        string bio;
    }
    
    mapping(uint256 => CharityCampaign) public campaigns;
    mapping(uint256 => Donation) public donations;
    mapping(uint256 => ImpactReport) public impactReports;
    mapping(address => DonorProfile) public donorProfiles;
    mapping(address => euint32) public charityReputation;
    mapping(address => uint256[]) public donorCampaigns;
    mapping(uint256 => uint256[]) public campaignDonations;
    
    uint256 public campaignCounter;
    uint256 public donationCounter;
    uint256 public reportCounter;
    
    address public owner;
    address public verifier;
    euint32 public platformFee; // Fee percentage (0-100)
    
    event CampaignCreated(uint256 indexed campaignId, address indexed organizer, string name);
    event DonationMade(uint256 indexed donationId, uint256 indexed campaignId, address indexed donor);
    event ImpactReported(uint256 indexed reportId, uint256 indexed campaignId, address indexed reporter);
    event CampaignVerified(uint256 indexed campaignId, bool isVerified);
    event ReputationUpdated(address indexed user, uint32 reputation);
    event FundsWithdrawn(uint256 indexed campaignId, address indexed organizer, uint32 amount);
    
    constructor(address _verifier) {
        owner = msg.sender;
        verifier = _verifier;
        platformFee = FHE.asEuint32(5); // 5% platform fee
    }
    
    function createCampaign(
        string memory _name,
        string memory _description,
        externalEuint32 _targetAmount,
        bytes calldata _targetAmountProof,
        uint256 _duration,
        string memory _category,
        string memory _imageHash
    ) public returns (uint256) {
        require(bytes(_name).length > 0, "Campaign name cannot be empty");
        require(_duration > 0, "Duration must be positive");
        require(bytes(_category).length > 0, "Category cannot be empty");
        
        uint256 campaignId = campaignCounter++;
        
        // Convert external encrypted amount to internal
        euint32 internalTargetAmount = FHE.fromExternal(_targetAmount, _targetAmountProof);
        
        campaigns[campaignId] = CharityCampaign({
            campaignId: FHE.asEuint32(campaignId),
            targetAmount: internalTargetAmount,
            currentAmount: FHE.asEuint32(0),
            donorCount: FHE.asEuint32(0),
            isActive: FHE.asEbool(true),
            isVerified: FHE.asEbool(false),
            name: _name,
            description: _description,
            organizer: msg.sender,
            startTime: block.timestamp,
            endTime: block.timestamp + _duration,
            category: _category,
            imageHash: _imageHash
        });
        
        emit CampaignCreated(campaignId, msg.sender, _name);
        return campaignId;
    }
    
    function makeDonation(
        uint256 campaignId,
        externalEuint32 amount,
        bytes calldata _amountProof,
        string memory message
    ) public payable returns (uint256) {
        require(campaigns[campaignId].organizer != address(0), "Campaign does not exist");
        require(block.timestamp <= campaigns[campaignId].endTime, "Campaign has ended");
        
        uint256 donationId = donationCounter++;
        
        // Convert external encrypted amount to internal
        euint32 internalAmount = FHE.fromExternal(amount, _amountProof);
        
        donations[donationId] = Donation({
            donationId: FHE.asEuint32(donationId),
            amount: internalAmount,
            donor: msg.sender,
            timestamp: block.timestamp,
            message: message
        });
        
        // Update campaign totals
        campaigns[campaignId].currentAmount = FHE.add(campaigns[campaignId].currentAmount, internalAmount);
        campaigns[campaignId].donorCount = FHE.add(campaigns[campaignId].donorCount, FHE.asEuint32(1));
        
        // Update donor profile
        if (donorProfiles[msg.sender].donor == address(0)) {
            donorProfiles[msg.sender] = DonorProfile({
                totalDonated: internalAmount,
                donationCount: FHE.asEuint32(1),
                reputationScore: FHE.asEuint32(10),
                isVerified: FHE.asEbool(false),
                name: "",
                bio: ""
            });
        } else {
            donorProfiles[msg.sender].totalDonated = FHE.add(donorProfiles[msg.sender].totalDonated, internalAmount);
            donorProfiles[msg.sender].donationCount = FHE.add(donorProfiles[msg.sender].donationCount, FHE.asEuint32(1));
        }
        
        // Track donor campaigns
        donorCampaigns[msg.sender].push(campaignId);
        campaignDonations[campaignId].push(donationId);
        
        emit DonationMade(donationId, campaignId, msg.sender);
        return donationId;
    }
    
    function submitImpactReport(
        uint256 campaignId,
        euint32 beneficiariesReached,
        euint32 fundsUtilized,
        string memory reportHash,
        string memory description
    ) public returns (uint256) {
        require(campaigns[campaignId].organizer == msg.sender, "Only organizer can submit report");
        require(block.timestamp > campaigns[campaignId].endTime, "Campaign must be ended");
        
        uint256 reportId = reportCounter++;
        
        impactReports[reportId] = ImpactReport({
            reportId: FHE.asEuint32(reportId),
            beneficiariesReached: beneficiariesReached,
            fundsUtilized: fundsUtilized,
            isVerified: FHE.asEbool(false),
            reportHash: reportHash,
            description: description,
            reporter: msg.sender,
            timestamp: block.timestamp
        });
        
        emit ImpactReported(reportId, campaignId, msg.sender);
        return reportId;
    }
    
    function verifyCampaign(uint256 campaignId, ebool isVerified) public {
        require(msg.sender == verifier, "Only verifier can verify campaigns");
        require(campaigns[campaignId].organizer != address(0), "Campaign does not exist");
        
        campaigns[campaignId].isVerified = isVerified;
        emit CampaignVerified(campaignId, true); // Will be decrypted off-chain
    }
    
    function verifyImpactReport(uint256 reportId, ebool isVerified) public {
        require(msg.sender == verifier, "Only verifier can verify reports");
        require(impactReports[reportId].reporter != address(0), "Report does not exist");
        
        impactReports[reportId].isVerified = isVerified;
    }
    
    function updateDonorProfile(
        string memory name,
        string memory bio,
        ebool isVerified
    ) public {
        require(bytes(name).length > 0, "Name cannot be empty");
        
        if (donorProfiles[msg.sender].donor == address(0)) {
            donorProfiles[msg.sender] = DonorProfile({
                totalDonated: FHE.asEuint32(0),
                donationCount: FHE.asEuint32(0),
                reputationScore: FHE.asEuint32(0),
                isVerified: isVerified,
                name: name,
                bio: bio
            });
        } else {
            donorProfiles[msg.sender].name = name;
            donorProfiles[msg.sender].bio = bio;
            donorProfiles[msg.sender].isVerified = isVerified;
        }
    }
    
    function updateReputation(address user, euint32 reputation) public {
        require(msg.sender == verifier, "Only verifier can update reputation");
        require(user != address(0), "Invalid user address");
        
        if (donorProfiles[user].donor != address(0)) {
            donorProfiles[user].reputationScore = reputation;
        } else {
            charityReputation[user] = reputation;
        }
        
        emit ReputationUpdated(user, 0); // Will be decrypted off-chain
    }
    
    function withdrawFunds(uint256 campaignId) public {
        require(campaigns[campaignId].organizer == msg.sender, "Only organizer can withdraw");
        require(block.timestamp > campaigns[campaignId].endTime, "Campaign must be ended");
        
        // In a real implementation, this would decrypt the current amount
        // and transfer the funds minus platform fee
        campaigns[campaignId].isActive = FHE.asEbool(false);
        
        emit FundsWithdrawn(campaignId, msg.sender, 0); // Will be decrypted off-chain
    }
    
    function getCampaignInfo(uint256 campaignId) public view returns (
        string memory name,
        string memory description,
        string memory category,
        string memory imageHash,
        bool isActive,
        bool isVerified,
        address organizer,
        uint256 startTime,
        uint256 endTime
    ) {
        CharityCampaign storage campaign = campaigns[campaignId];
        return (
            campaign.name,
            campaign.description,
            campaign.category,
            campaign.imageHash,
            true, // FHE.decrypt(campaign.isActive) - will be decrypted off-chain
            false, // FHE.decrypt(campaign.isVerified) - will be decrypted off-chain
            campaign.organizer,
            campaign.startTime,
            campaign.endTime
        );
    }
    
    function getDonationInfo(uint256 donationId) public view returns (
        address donor,
        uint256 timestamp,
        string memory message
    ) {
        Donation storage donation = donations[donationId];
        return (
            donation.donor,
            donation.timestamp,
            donation.message
        );
    }
    
    function getImpactReportInfo(uint256 reportId) public view returns (
        bool isVerified,
        string memory reportHash,
        string memory description,
        address reporter,
        uint256 timestamp
    ) {
        ImpactReport storage report = impactReports[reportId];
        return (
            false, // FHE.decrypt(report.isVerified) - will be decrypted off-chain
            report.reportHash,
            report.description,
            report.reporter,
            report.timestamp
        );
    }
    
    function getDonorProfile(address donor) public view returns (
        string memory name,
        string memory bio,
        bool isVerified
    ) {
        DonorProfile storage profile = donorProfiles[donor];
        return (
            profile.name,
            profile.bio,
            false // FHE.decrypt(profile.isVerified) - will be decrypted off-chain
        );
    }
    
    function getCampaignDonations(uint256 campaignId) public view returns (uint256[] memory) {
        return campaignDonations[campaignId];
    }
    
    function getDonorCampaigns(address donor) public view returns (uint256[] memory) {
        return donorCampaigns[donor];
    }
    
    function setPlatformFee(externalEuint32 newFee, bytes calldata _feeProof) public {
        require(msg.sender == owner, "Only owner can set platform fee");
        
        euint32 internalFee = FHE.fromExternal(newFee, _feeProof);
        platformFee = internalFee;
    }
    
    function setVerifier(address newVerifier) public {
        require(msg.sender == owner, "Only owner can set verifier");
        require(newVerifier != address(0), "Invalid verifier address");
        
        verifier = newVerifier;
    }
}

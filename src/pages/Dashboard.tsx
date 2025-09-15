import { useState, useEffect } from "react"
import { Header } from "@/components/Header"
import { ProjectCard, Project } from "@/components/ProjectCard"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { useAccount } from 'wagmi'
import { 
  Shield, 
  Users, 
  Vote, 
  DollarSign, 
  TrendingUp,
  Lock
} from "lucide-react"
import heroImage from "@/assets/hero-charity-voting.jpg"

// Mock data - in real app this would come from blockchain/backend
const mockProjects: Project[] = [
  {
    id: "1",
    title: "Clean Water Initiative - Rural Uganda",
    description: "Install 15 clean water wells in underserved communities, providing access to safe drinking water for over 3,000 residents.",
    category: "Water & Sanitation",
    requestedAmount: 45000,
    currentVotes: 24,
    totalVoters: 50,
    timeRemaining: "5 days",
    status: "active"
  },
  {
    id: "2", 
    title: "Emergency Food Relief - Syria",
    description: "Provide emergency food packages to 500 displaced families affected by recent natural disasters in northern Syria.",
    category: "Emergency Relief",
    requestedAmount: 32000,
    currentVotes: 31,
    totalVoters: 50,
    timeRemaining: "3 days",
    status: "active"
  },
  {
    id: "3",
    title: "Education Support - Ghana Schools",
    description: "Supply educational materials, books, and digital learning tools to 8 primary schools serving 1,200 children.",
    category: "Education",
    requestedAmount: 28000,
    currentVotes: 42,
    totalVoters: 50,
    timeRemaining: "1 week",
    status: "active"
  },
  {
    id: "4",
    title: "Medical Equipment - Bangladesh Clinic",
    description: "Purchase essential medical equipment including ultrasound machine and laboratory instruments for rural health clinic.",
    category: "Healthcare", 
    requestedAmount: 67000,
    currentVotes: 18,
    totalVoters: 50,
    timeRemaining: "2 weeks",
    status: "active"
  }
]

export default function Dashboard() {
  const { isConnected } = useAccount()
  const [userVotes, setUserVotes] = useState<Record<string, 'yes' | 'no' | 'abstain'>>({})
  const [totalFunds] = useState(850000) // Mock total funds available
  const [activeProposals] = useState(mockProjects.length)
  const [totalVoters] = useState(50)

  const handleVote = (projectId: string, vote: 'yes' | 'no' | 'abstain') => {
    setUserVotes(prev => ({
      ...prev,
      [projectId]: vote
    }))
    
    // In real app, this would submit to blockchain/backend
    console.log(`Voted ${vote} on project ${projectId}`)
  }

  if (!isConnected) {
    return (
      <div className="min-h-screen">
        <Header />
        <main className="container mx-auto px-6 py-12">
          <div className="text-center space-y-8 max-w-4xl mx-auto">
            <div className="relative rounded-2xl overflow-hidden">
              <img 
                src={heroImage} 
                alt="Charitable voting platform" 
                className="w-full h-64 object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-primary/80 to-transparent" />
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center text-white space-y-4">
                  <h2 className="text-4xl font-bold">Transparent Charity Governance</h2>
                  <p className="text-lg opacity-90">Vote privately on which projects receive funding</p>
                </div>
              </div>
            </div>

            <div className="space-y-6">
              <div className="grid md:grid-cols-3 gap-6">
                <Card className="text-center shadow-card">
                  <CardHeader className="pb-3">
                    <div className="mx-auto p-3 gradient-charity rounded-full w-fit">
                      <Lock className="h-6 w-6 text-white" />
                    </div>
                  </CardHeader>
                  <CardContent>
                    <CardTitle className="text-lg mb-2">Private Voting</CardTitle>
                    <p className="text-sm text-muted-foreground">
                      Your votes are confidential and only revealed in aggregate
                    </p>
                  </CardContent>
                </Card>

                <Card className="text-center shadow-card">
                  <CardHeader className="pb-3">
                    <div className="mx-auto p-3 gradient-primary rounded-full w-fit">
                      <Shield className="h-6 w-6 text-white" />
                    </div>
                  </CardHeader>
                  <CardContent>
                    <CardTitle className="text-lg mb-2">Transparent Impact</CardTitle>
                    <p className="text-sm text-muted-foreground">
                      Track funding allocation and project outcomes publicly
                    </p>
                  </CardContent>
                </Card>

                <Card className="text-center shadow-card">
                  <CardHeader className="pb-3">
                    <div className="mx-auto p-3 bg-accent rounded-full w-fit">
                      <Users className="h-6 w-6 text-white" />
                    </div>
                  </CardHeader>
                  <CardContent>
                    <CardTitle className="text-lg mb-2">Community Driven</CardTitle>
                    <p className="text-sm text-muted-foreground">
                      Donors collectively decide which projects get funded
                    </p>
                  </CardContent>
                </Card>
              </div>

              <div className="space-y-4">
                <h3 className="text-xl font-semibold">Connect Your Wallet to Start Voting</h3>
                <p className="text-muted-foreground max-w-2xl mx-auto">
                  Connect your wallet to participate in confidential charity governance. 
                  Your voting power is determined by your donation history and stake in the platform.
                </p>
                <p className="text-sm text-accent font-medium">
                  Use the "Connect Wallet" button in the top navigation to get started
                </p>
              </div>
            </div>
          </div>
        </main>
      </div>
    )
  }

  return (
    <div className="min-h-screen">
      <Header />
      
      <main className="container mx-auto px-6 py-8">
        {/* Stats Overview */}
        <div className="mb-8">
          <div className="grid md:grid-cols-4 gap-4 mb-6">
            <Card className="shadow-card">
              <CardContent className="p-4">
                <div className="flex items-center gap-3">
                  <div className="p-2 gradient-primary rounded-lg">
                    <DollarSign className="h-5 w-5 text-white" />
                  </div>
                  <div>
                    <div className="text-2xl font-bold">${totalFunds.toLocaleString()}</div>
                    <div className="text-sm text-muted-foreground">Available Funds</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="shadow-card">
              <CardContent className="p-4">
                <div className="flex items-center gap-3">
                  <div className="p-2 gradient-charity rounded-lg">
                    <Vote className="h-5 w-5 text-white" />
                  </div>
                  <div>
                    <div className="text-2xl font-bold">{activeProposals}</div>
                    <div className="text-sm text-muted-foreground">Active Proposals</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="shadow-card">
              <CardContent className="p-4">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-accent rounded-lg">
                    <Users className="h-5 w-5 text-white" />
                  </div>
                  <div>
                    <div className="text-2xl font-bold">{totalVoters}</div>
                    <div className="text-sm text-muted-foreground">Eligible Voters</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="shadow-card">
              <CardContent className="p-4">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-vote-yes rounded-lg">
                    <TrendingUp className="h-5 w-5 text-white" />
                  </div>
                  <div>
                    <div className="text-2xl font-bold">{Object.keys(userVotes).length}</div>
                    <div className="text-sm text-muted-foreground">Your Votes</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Active Proposals */}
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold">Active Funding Proposals</h2>
            <Badge variant="outline" className="text-sm">
              <Shield className="h-3 w-3 mr-1" />
              All votes are private
            </Badge>
          </div>

          <div className="grid lg:grid-cols-2 gap-6">
            {mockProjects.map((project) => (
              <ProjectCard
                key={project.id}
                project={project}
                onVote={handleVote}
                hasVoted={project.id in userVotes}
                userVote={userVotes[project.id]}
              />
            ))}
          </div>
        </div>
      </main>
    </div>
  )
}
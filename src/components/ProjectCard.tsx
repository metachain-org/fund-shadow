import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Users, DollarSign, Clock, Shield } from "lucide-react"
import { useState } from "react"

export interface Project {
  id: string
  title: string
  description: string
  category: string
  requestedAmount: number
  currentVotes: number
  totalVoters: number
  timeRemaining: string
  status: 'active' | 'ended' | 'funded'
  image?: string
}

interface ProjectCardProps {
  project: Project
  onVote: (projectId: string, vote: 'yes' | 'no' | 'abstain') => void
  hasVoted?: boolean
  userVote?: 'yes' | 'no' | 'abstain'
}

export function ProjectCard({ project, onVote, hasVoted, userVote }: ProjectCardProps) {
  const [selectedVote, setSelectedVote] = useState<'yes' | 'no' | 'abstain' | null>(null)
  
  const votingPercentage = project.totalVoters > 0 ? (project.currentVotes / project.totalVoters) * 100 : 0

  const handleVote = (vote: 'yes' | 'no' | 'abstain') => {
    if (hasVoted) return
    setSelectedVote(vote)
    onVote(project.id, vote)
  }

  return (
    <Card className="shadow-card hover:shadow-governance transition-all duration-300 bg-card/80 backdrop-blur-sm">
      <CardHeader className="space-y-4">
        <div className="flex items-start justify-between">
          <div className="space-y-2">
            <Badge variant="secondary" className="text-xs">
              {project.category}
            </Badge>
            <CardTitle className="text-lg leading-tight">{project.title}</CardTitle>
          </div>
          <Badge 
            variant={project.status === 'active' ? 'default' : 'outline'}
            className={project.status === 'active' ? 'gradient-charity text-white' : ''}
          >
            {project.status}
          </Badge>
        </div>
        
        <p className="text-sm text-muted-foreground leading-relaxed">
          {project.description}
        </p>
      </CardHeader>

      <CardContent className="space-y-6">
        {/* Funding & Participation Stats */}
        <div className="grid grid-cols-3 gap-4">
          <div className="flex items-center gap-2">
            <DollarSign className="h-4 w-4 text-accent" />
            <div>
              <div className="text-sm font-semibold">${project.requestedAmount.toLocaleString()}</div>
              <div className="text-xs text-muted-foreground">Requested</div>
            </div>
          </div>
          
          <div className="flex items-center gap-2">
            <Users className="h-4 w-4 text-primary" />
            <div>
              <div className="text-sm font-semibold">{project.currentVotes}</div>
              <div className="text-xs text-muted-foreground">Votes Cast</div>
            </div>
          </div>
          
          <div className="flex items-center gap-2">
            <Clock className="h-4 w-4 text-muted-foreground" />
            <div>
              <div className="text-sm font-semibold">{project.timeRemaining}</div>
              <div className="text-xs text-muted-foreground">Remaining</div>
            </div>
          </div>
        </div>

        {/* Voting Progress */}
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Participation</span>
            <span className="font-medium">{Math.round(votingPercentage)}%</span>
          </div>
          <Progress value={votingPercentage} className="h-2" />
        </div>

        {/* Voting Buttons */}
        {project.status === 'active' && (
          <div className="space-y-3">
            {hasVoted ? (
              <div className="flex items-center justify-center gap-2 p-3 bg-accent/10 rounded-lg border border-accent/20">
                <Shield className="h-4 w-4 text-accent" />
                <span className="text-sm font-medium text-accent">
                  Vote recorded privately • Your choice: {userVote?.toUpperCase()}
                </span>
              </div>
            ) : (
              <>
                <div className="text-xs text-muted-foreground text-center mb-2">
                  Your vote is private and will only be revealed in aggregate
                </div>
                <div className="grid grid-cols-3 gap-2">
                  <Button
                    variant="vote-yes"
                    size="sm"
                    onClick={() => handleVote('yes')}
                    disabled={hasVoted}
                  >
                    Fund
                  </Button>
                  <Button
                    variant="vote-no"
                    size="sm"
                    onClick={() => handleVote('no')}
                    disabled={hasVoted}
                  >
                    Deny
                  </Button>
                  <Button
                    variant="vote-abstain"
                    size="sm"
                    onClick={() => handleVote('abstain')}
                    disabled={hasVoted}
                  >
                    Abstain
                  </Button>
                </div>
              </>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  )
}
import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { Progress } from '@/components/ui/progress'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Textarea } from '@/components/ui/textarea'
import {
  Users,
  Plus,
  Mail,
  Phone,
  MapPin,
  Star,
  Clock,
  CheckCircle,
  AlertCircle,
  Settings,
  MoreHorizontal,
  Edit,
  Trash2,
  UserPlus
} from 'lucide-react'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'

interface Agent {
  id: string
  name: string
  email: string
  department: string
  specialties: string[]
  isActive: boolean
  maxTickets: number
  currentTickets: number
  totalResolved: number
  avgResolutionTime: number
  customerSatisfaction: number
  slaCompliance: number
  avatar?: string
  phone?: string
  location?: string
}

export function AgentsPage() {
  const [showAddAgent, setShowAddAgent] = useState(false)
  const [selectedAgent, setSelectedAgent] = useState<Agent | null>(null)

  // Mock data - in real app this would come from API
  const agents: Agent[] = [
    {
      id: 'agent_1',
      name: 'John Smith',
      email: 'john.smith@company.com',
      department: 'Technical Support',
      specialties: ['Technical Support', 'Bug Reports', 'API Issues'],
      isActive: true,
      maxTickets: 15,
      currentTickets: 12,
      totalResolved: 156,
      avgResolutionTime: 4.2,
      customerSatisfaction: 4.8,
      slaCompliance: 96,
      phone: '+1 (555) 123-4567',
      location: 'New York, NY'
    },
    {
      id: 'agent_2',
      name: 'Sarah Johnson',
      email: 'sarah.johnson@company.com',
      department: 'Technical Support',
      specialties: ['Technical Support', 'Feature Requests', 'Mobile Issues'],
      isActive: true,
      maxTickets: 12,
      currentTickets: 8,
      totalResolved: 203,
      avgResolutionTime: 3.8,
      customerSatisfaction: 4.6,
      slaCompliance: 94,
      phone: '+1 (555) 234-5678',
      location: 'San Francisco, CA'
    },
    {
      id: 'agent_3',
      name: 'Mike Wilson',
      email: 'mike.wilson@company.com',
      department: 'Billing',
      specialties: ['Billing', 'Account Issues', 'Payments'],
      isActive: true,
      maxTickets: 10,
      currentTickets: 6,
      totalResolved: 89,
      avgResolutionTime: 2.1,
      customerSatisfaction: 4.9,
      slaCompliance: 98,
      phone: '+1 (555) 345-6789',
      location: 'Chicago, IL'
    },
    {
      id: 'agent_4',
      name: 'Lisa Chen',
      email: 'lisa.chen@company.com',
      department: 'Customer Success',
      specialties: ['General Inquiry', 'Account Issues', 'Onboarding'],
      isActive: false,
      maxTickets: 8,
      currentTickets: 0,
      totalResolved: 67,
      avgResolutionTime: 5.2,
      customerSatisfaction: 4.7,
      slaCompliance: 92,
      phone: '+1 (555) 456-7890',
      location: 'Austin, TX'
    }
  ]

  const getInitials = (name: string) => {
    return name.split(' ').map(n => n[0]).join('').toUpperCase()
  }

  const getWorkloadColor = (current: number, max: number) => {
    const percentage = (current / max) * 100
    if (percentage >= 90) return 'text-red-600'
    if (percentage >= 70) return 'text-yellow-600'
    return 'text-green-600'
  }

  const getSatisfactionColor = (rating: number) => {
    if (rating >= 4.5) return 'text-green-600'
    if (rating >= 4.0) return 'text-yellow-600'
    return 'text-red-600'
  }

  const activeAgents = agents.filter(agent => agent.isActive)
  const inactiveAgents = agents.filter(agent => !agent.isActive)

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Agents</h1>
          <p className="text-gray-600 mt-1">
            Manage your support team and track their performance.
          </p>
        </div>
        <Dialog open={showAddAgent} onOpenChange={setShowAddAgent}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="w-4 h-4 mr-2" />
              Add Agent
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add New Agent</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="name">Full Name</Label>
                  <Input id="name" placeholder="John Doe" />
                </div>
                <div>
                  <Label htmlFor="email">Email</Label>
                  <Input id="email" type="email" placeholder="john@company.com" />
                </div>
              </div>
              <div>
                <Label htmlFor="department">Department</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select department" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="technical">Technical Support</SelectItem>
                    <SelectItem value="billing">Billing</SelectItem>
                    <SelectItem value="success">Customer Success</SelectItem>
                    <SelectItem value="sales">Sales</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="specialties">Specialties</Label>
                <Textarea 
                  id="specialties" 
                  placeholder="Enter specialties separated by commas"
                  rows={3}
                />
              </div>
              <div>
                <Label htmlFor="maxTickets">Max Concurrent Tickets</Label>
                <Input id="maxTickets" type="number" defaultValue="10" />
              </div>
              <div className="flex justify-end space-x-2">
                <Button variant="outline" onClick={() => setShowAddAgent(false)}>
                  Cancel
                </Button>
                <Button>Add Agent</Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Agents</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{agents.length}</div>
            <p className="text-xs text-muted-foreground">
              {activeAgents.length} active
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Avg Satisfaction</CardTitle>
            <Star className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {(agents.reduce((sum, agent) => sum + agent.customerSatisfaction, 0) / agents.length).toFixed(1)}
            </div>
            <p className="text-xs text-muted-foreground">
              Out of 5.0
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Avg Resolution Time</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {(agents.reduce((sum, agent) => sum + agent.avgResolutionTime, 0) / agents.length).toFixed(1)}h
            </div>
            <p className="text-xs text-muted-foreground">
              Average across all agents
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">SLA Compliance</CardTitle>
            <CheckCircle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {Math.round(agents.reduce((sum, agent) => sum + agent.slaCompliance, 0) / agents.length)}%
            </div>
            <p className="text-xs text-muted-foreground">
              Team average
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Active Agents */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Users className="w-5 h-5" />
            Active Agents ({activeAgents.length})
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {activeAgents.map((agent) => (
              <Card key={agent.id} className="relative">
                <CardContent className="pt-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center space-x-3">
                      <Avatar>
                        <AvatarFallback>{getInitials(agent.name)}</AvatarFallback>
                      </Avatar>
                      <div>
                        <h3 className="font-semibold text-gray-900">{agent.name}</h3>
                        <p className="text-sm text-gray-600">{agent.department}</p>
                      </div>
                    </div>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="sm">
                          <MoreHorizontal className="w-4 h-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem onClick={() => setSelectedAgent(agent)}>
                          <Settings className="w-4 h-4 mr-2" />
                          View Details
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <Edit className="w-4 h-4 mr-2" />
                          Edit Agent
                        </DropdownMenuItem>
                        <DropdownMenuItem className="text-red-600">
                          <Trash2 className="w-4 h-4 mr-2" />
                          Deactivate
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>

                  <div className="space-y-3">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-600">Workload</span>
                      <span className={getWorkloadColor(agent.currentTickets, agent.maxTickets)}>
                        {agent.currentTickets}/{agent.maxTickets}
                      </span>
                    </div>
                    <Progress 
                      value={(agent.currentTickets / agent.maxTickets) * 100} 
                      className="h-2"
                    />

                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <span className="text-gray-600">Resolved</span>
                        <div className="font-semibold">{agent.totalResolved}</div>
                      </div>
                      <div>
                        <span className="text-gray-600">Avg Time</span>
                        <div className="font-semibold">{agent.avgResolutionTime}h</div>
                      </div>
                    </div>

                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-600">Satisfaction</span>
                      <div className={`flex items-center gap-1 ${getSatisfactionColor(agent.customerSatisfaction)}`}>
                        <Star className="w-4 h-4 fill-current" />
                        <span className="font-semibold">{agent.customerSatisfaction}</span>
                      </div>
                    </div>

                    <div className="flex flex-wrap gap-1 mt-3">
                      {agent.specialties.slice(0, 2).map((specialty, index) => (
                        <Badge key={index} variant="secondary" className="text-xs">
                          {specialty}
                        </Badge>
                      ))}
                      {agent.specialties.length > 2 && (
                        <Badge variant="secondary" className="text-xs">
                          +{agent.specialties.length - 2} more
                        </Badge>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Inactive Agents */}
      {inactiveAgents.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <AlertCircle className="w-5 h-5 text-gray-400" />
              Inactive Agents ({inactiveAgents.length})
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {inactiveAgents.map((agent) => (
                <div key={agent.id} className="flex items-center justify-between p-3 border rounded-lg bg-gray-50">
                  <div className="flex items-center space-x-3">
                    <Avatar>
                      <AvatarFallback className="bg-gray-300">{getInitials(agent.name)}</AvatarFallback>
                    </Avatar>
                    <div>
                      <h4 className="font-medium text-gray-900">{agent.name}</h4>
                      <p className="text-sm text-gray-600">{agent.department}</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Badge variant="secondary">Inactive</Badge>
                    <Button variant="outline" size="sm">
                      <UserPlus className="w-4 h-4 mr-1" />
                      Reactivate
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Agent Detail Modal */}
      <Dialog open={!!selectedAgent} onOpenChange={() => setSelectedAgent(null)}>
        <DialogContent className="max-w-2xl">
          {selectedAgent && (
            <>
              <DialogHeader>
                <DialogTitle className="flex items-center gap-3">
                  <Avatar className="w-10 h-10">
                    <AvatarFallback>{getInitials(selectedAgent.name)}</AvatarFallback>
                  </Avatar>
                  <div>
                    <div>{selectedAgent.name}</div>
                    <div className="text-sm font-normal text-gray-600">{selectedAgent.department}</div>
                  </div>
                </DialogTitle>
              </DialogHeader>
              
              <div className="space-y-6">
                {/* Contact Info */}
                <div>
                  <h3 className="font-semibold mb-3">Contact Information</h3>
                  <div className="space-y-2 text-sm">
                    <div className="flex items-center gap-2">
                      <Mail className="w-4 h-4 text-gray-400" />
                      <span>{selectedAgent.email}</span>
                    </div>
                    {selectedAgent.phone && (
                      <div className="flex items-center gap-2">
                        <Phone className="w-4 h-4 text-gray-400" />
                        <span>{selectedAgent.phone}</span>
                      </div>
                    )}
                    {selectedAgent.location && (
                      <div className="flex items-center gap-2">
                        <MapPin className="w-4 h-4 text-gray-400" />
                        <span>{selectedAgent.location}</span>
                      </div>
                    )}
                  </div>
                </div>

                {/* Performance Metrics */}
                <div>
                  <h3 className="font-semibold mb-3">Performance Metrics</h3>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="p-3 border rounded-lg">
                      <div className="text-sm text-gray-600">Total Resolved</div>
                      <div className="text-2xl font-bold">{selectedAgent.totalResolved}</div>
                    </div>
                    <div className="p-3 border rounded-lg">
                      <div className="text-sm text-gray-600">Avg Resolution Time</div>
                      <div className="text-2xl font-bold">{selectedAgent.avgResolutionTime}h</div>
                    </div>
                    <div className="p-3 border rounded-lg">
                      <div className="text-sm text-gray-600">Customer Satisfaction</div>
                      <div className="text-2xl font-bold flex items-center gap-1">
                        <Star className="w-5 h-5 fill-current text-yellow-500" />
                        {selectedAgent.customerSatisfaction}
                      </div>
                    </div>
                    <div className="p-3 border rounded-lg">
                      <div className="text-sm text-gray-600">SLA Compliance</div>
                      <div className="text-2xl font-bold">{selectedAgent.slaCompliance}%</div>
                    </div>
                  </div>
                </div>

                {/* Specialties */}
                <div>
                  <h3 className="font-semibold mb-3">Specialties</h3>
                  <div className="flex flex-wrap gap-2">
                    {selectedAgent.specialties.map((specialty, index) => (
                      <Badge key={index} variant="secondary">
                        {specialty}
                      </Badge>
                    ))}
                  </div>
                </div>

                {/* Current Workload */}
                <div>
                  <h3 className="font-semibold mb-3">Current Workload</h3>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Active Tickets</span>
                      <span className={getWorkloadColor(selectedAgent.currentTickets, selectedAgent.maxTickets)}>
                        {selectedAgent.currentTickets} / {selectedAgent.maxTickets}
                      </span>
                    </div>
                    <Progress 
                      value={(selectedAgent.currentTickets / selectedAgent.maxTickets) * 100} 
                      className="h-2"
                    />
                  </div>
                </div>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}
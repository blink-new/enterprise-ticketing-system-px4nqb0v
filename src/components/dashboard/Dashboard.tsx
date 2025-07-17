import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Progress } from '@/components/ui/progress'
import {
  Ticket,
  Clock,
  CheckCircle,
  AlertTriangle,
  TrendingUp,
  Users,
  Timer,
  Target
} from 'lucide-react'

export function Dashboard() {
  // Mock data - in real app this would come from API
  const stats = {
    total: 156,
    new: 24,
    inProgress: 45,
    pending: 18,
    resolved: 52,
    closed: 17,
    overdue: 8
  }

  const recentTickets = [
    {
      id: 'TKT-001',
      title: 'Login issues with mobile app',
      customer: 'John Smith',
      priority: 'high',
      status: 'new',
      createdAt: '2 hours ago',
      slaStatus: 'on-track'
    },
    {
      id: 'TKT-002',
      title: 'Billing discrepancy in invoice',
      customer: 'Sarah Johnson',
      priority: 'medium',
      status: 'in_progress',
      createdAt: '4 hours ago',
      slaStatus: 'at-risk'
    },
    {
      id: 'TKT-003',
      title: 'Feature request: Dark mode',
      customer: 'Mike Wilson',
      priority: 'low',
      status: 'pending',
      createdAt: '1 day ago',
      slaStatus: 'on-track'
    }
  ]

  const agentPerformance = [
    { name: 'John Smith', tickets: 12, resolved: 10, satisfaction: 4.8 },
    { name: 'Sarah Johnson', tickets: 15, resolved: 13, satisfaction: 4.6 },
    { name: 'Mike Wilson', tickets: 8, resolved: 7, satisfaction: 4.9 },
    { name: 'Lisa Chen', tickets: 10, resolved: 9, satisfaction: 4.7 }
  ]

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'critical': return 'bg-red-100 text-red-800'
      case 'high': return 'bg-orange-100 text-orange-800'
      case 'medium': return 'bg-blue-100 text-blue-800'
      case 'low': return 'bg-gray-100 text-gray-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'new': return 'bg-purple-100 text-purple-800'
      case 'in_progress': return 'bg-blue-100 text-blue-800'
      case 'pending': return 'bg-yellow-100 text-yellow-800'
      case 'resolved': return 'bg-green-100 text-green-800'
      case 'closed': return 'bg-gray-100 text-gray-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  const getSlaStatusColor = (status: string) => {
    switch (status) {
      case 'on-track': return 'text-green-600'
      case 'at-risk': return 'text-yellow-600'
      case 'breached': return 'text-red-600'
      default: return 'text-gray-600'
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
        <p className="text-gray-600 mt-1">
          Welcome back! Here's what's happening with your tickets today.
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Tickets</CardTitle>
            <Ticket className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.total}</div>
            <p className="text-xs text-muted-foreground">
              +12% from last month
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">New Tickets</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.new}</div>
            <p className="text-xs text-muted-foreground">
              +3 since yesterday
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Resolved Today</CardTitle>
            <CheckCircle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">18</div>
            <p className="text-xs text-muted-foreground">
              +5% from yesterday
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">SLA Breaches</CardTitle>
            <AlertTriangle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-600">{stats.overdue}</div>
            <p className="text-xs text-muted-foreground">
              -2 from yesterday
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Tickets */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Ticket className="w-5 h-5" />
              Recent Tickets
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentTickets.map((ticket) => (
                <div key={ticket.id} className="flex items-center justify-between p-4 border rounded-lg">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="font-medium text-sm">{ticket.id}</span>
                      <Badge className={getPriorityColor(ticket.priority)}>
                        {ticket.priority}
                      </Badge>
                      <Badge className={getStatusColor(ticket.status)}>
                        {ticket.status.replace('_', ' ')}
                      </Badge>
                    </div>
                    <h4 className="font-medium text-gray-900 mb-1">{ticket.title}</h4>
                    <p className="text-sm text-gray-600">
                      {ticket.customer} • {ticket.createdAt}
                    </p>
                  </div>
                  <div className="text-right">
                    <div className={`text-sm font-medium ${getSlaStatusColor(ticket.slaStatus)}`}>
                      {ticket.slaStatus === 'on-track' && 'On Track'}
                      {ticket.slaStatus === 'at-risk' && 'At Risk'}
                      {ticket.slaStatus === 'breached' && 'Breached'}
                    </div>
                    <Button variant="outline" size="sm" className="mt-2">
                      View
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Agent Performance */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Users className="w-5 h-5" />
              Agent Performance
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {agentPerformance.map((agent, index) => (
                <div key={index} className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">{agent.name}</span>
                    <span className="text-sm text-gray-600">{agent.resolved}/{agent.tickets}</span>
                  </div>
                  <Progress value={(agent.resolved / agent.tickets) * 100} className="h-2" />
                  <div className="flex items-center justify-between text-xs text-gray-600">
                    <span>Satisfaction: {agent.satisfaction}/5</span>
                    <span>{Math.round((agent.resolved / agent.tickets) * 100)}% resolved</span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Timer className="w-5 h-5" />
              Avg Response Time
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">2.4 hours</div>
            <p className="text-sm text-green-600 mt-1">
              <TrendingUp className="w-4 h-4 inline mr-1" />
              15% faster than last week
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Target className="w-5 h-5" />
              SLA Compliance
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">94.2%</div>
            <Progress value={94.2} className="mt-2" />
            <p className="text-sm text-gray-600 mt-1">
              Target: 95%
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <CheckCircle className="w-5 h-5" />
              Resolution Rate
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">87%</div>
            <p className="text-sm text-green-600 mt-1">
              <TrendingUp className="w-4 h-4 inline mr-1" />
              +3% from last month
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Progress } from '@/components/ui/progress'
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  Area,
  AreaChart
} from 'recharts'
import {
  TrendingUp,
  TrendingDown,
  Clock,
  CheckCircle,
  AlertTriangle,
  Users,
  Star,
  Target,
  Calendar,
  BarChart3
} from 'lucide-react'

export function AnalyticsPage() {
  // Mock data - in real app this would come from API
  const ticketVolumeData = [
    { month: 'Jan', tickets: 120, resolved: 115 },
    { month: 'Feb', tickets: 135, resolved: 128 },
    { month: 'Mar', tickets: 148, resolved: 142 },
    { month: 'Apr', tickets: 162, resolved: 155 },
    { month: 'May', tickets: 178, resolved: 170 },
    { month: 'Jun', tickets: 156, resolved: 148 }
  ]

  const resolutionTimeData = [
    { week: 'Week 1', avgTime: 4.2 },
    { week: 'Week 2', avgTime: 3.8 },
    { week: 'Week 3', avgTime: 4.1 },
    { week: 'Week 4', avgTime: 3.6 },
    { week: 'Week 5', avgTime: 3.9 },
    { week: 'Week 6', avgTime: 3.4 }
  ]

  const priorityDistribution = [
    { name: 'Low', value: 35, color: '#6b7280' },
    { name: 'Medium', value: 40, color: '#3b82f6' },
    { name: 'High', value: 20, color: '#f59e0b' },
    { name: 'Critical', value: 5, color: '#ef4444' }
  ]

  const categoryData = [
    { category: 'Technical Support', tickets: 45, resolved: 42, percentage: 93 },
    { category: 'Billing', tickets: 28, resolved: 27, percentage: 96 },
    { category: 'Feature Request', tickets: 22, resolved: 18, percentage: 82 },
    { category: 'Bug Report', tickets: 35, resolved: 33, percentage: 94 },
    { category: 'Account Issues', tickets: 18, resolved: 17, percentage: 94 },
    { category: 'General Inquiry', tickets: 12, resolved: 12, percentage: 100 }
  ]

  const agentPerformanceData = [
    { name: 'John Smith', resolved: 42, satisfaction: 4.8, sla: 96 },
    { name: 'Sarah Johnson', resolved: 38, satisfaction: 4.6, sla: 94 },
    { name: 'Mike Wilson', resolved: 35, satisfaction: 4.9, sla: 98 },
    { name: 'Lisa Chen', resolved: 28, satisfaction: 4.7, sla: 92 }
  ]

  const slaComplianceData = [
    { month: 'Jan', compliance: 92 },
    { month: 'Feb', compliance: 94 },
    { month: 'Mar', compliance: 91 },
    { month: 'Apr', compliance: 95 },
    { month: 'May', compliance: 93 },
    { month: 'Jun', compliance: 96 }
  ]

  const getPerformanceColor = (value: number, threshold: number) => {
    return value >= threshold ? 'text-green-600' : 'text-red-600'
  }

  const getTrendIcon = (current: number, previous: number) => {
    if (current > previous) {
      return <TrendingUp className="w-4 h-4 text-green-600" />
    } else if (current < previous) {
      return <TrendingDown className="w-4 h-4 text-red-600" />
    }
    return null
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Analytics</h1>
          <p className="text-gray-600 mt-1">
            Track performance metrics and gain insights into your support operations.
          </p>
        </div>
        <div className="flex items-center space-x-2">
          <Select defaultValue="30days">
            <SelectTrigger className="w-40">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="7days">Last 7 days</SelectItem>
              <SelectItem value="30days">Last 30 days</SelectItem>
              <SelectItem value="90days">Last 90 days</SelectItem>
              <SelectItem value="1year">Last year</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Avg Response Time</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">2.4h</div>
            <div className="flex items-center text-xs text-green-600 mt-1">
              {getTrendIcon(2.4, 2.8)}
              <span className="ml-1">15% faster than last month</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Resolution Rate</CardTitle>
            <CheckCircle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">94.2%</div>
            <div className="flex items-center text-xs text-green-600 mt-1">
              {getTrendIcon(94.2, 91.8)}
              <span className="ml-1">+2.4% from last month</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Customer Satisfaction</CardTitle>
            <Star className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">4.7/5</div>
            <div className="flex items-center text-xs text-green-600 mt-1">
              {getTrendIcon(4.7, 4.5)}
              <span className="ml-1">+0.2 from last month</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">SLA Compliance</CardTitle>
            <Target className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">96%</div>
            <div className="flex items-center text-xs text-green-600 mt-1">
              {getTrendIcon(96, 93)}
              <span className="ml-1">+3% from last month</span>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Ticket Volume Trend */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BarChart3 className="w-5 h-5" />
              Ticket Volume Trend
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <AreaChart data={ticketVolumeData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Area 
                  type="monotone" 
                  dataKey="tickets" 
                  stackId="1"
                  stroke="#3b82f6" 
                  fill="#3b82f6" 
                  fillOpacity={0.6}
                  name="Total Tickets"
                />
                <Area 
                  type="monotone" 
                  dataKey="resolved" 
                  stackId="2"
                  stroke="#10b981" 
                  fill="#10b981" 
                  fillOpacity={0.6}
                  name="Resolved"
                />
              </AreaChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Resolution Time Trend */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Clock className="w-5 h-5" />
              Average Resolution Time
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={resolutionTimeData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="week" />
                <YAxis />
                <Tooltip formatter={(value) => [`${value}h`, 'Avg Time']} />
                <Line 
                  type="monotone" 
                  dataKey="avgTime" 
                  stroke="#f59e0b" 
                  strokeWidth={3}
                  dot={{ fill: '#f59e0b', strokeWidth: 2, r: 4 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Priority Distribution */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <AlertTriangle className="w-5 h-5" />
              Priority Distribution
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={250}>
              <PieChart>
                <Pie
                  data={priorityDistribution}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={100}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {priorityDistribution.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip formatter={(value) => [`${value}%`, 'Percentage']} />
              </PieChart>
            </ResponsiveContainer>
            <div className="space-y-2 mt-4">
              {priorityDistribution.map((item, index) => (
                <div key={index} className="flex items-center justify-between text-sm">
                  <div className="flex items-center gap-2">
                    <div 
                      className="w-3 h-3 rounded-full" 
                      style={{ backgroundColor: item.color }}
                    />
                    <span>{item.name}</span>
                  </div>
                  <span className="font-medium">{item.value}%</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Category Performance */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BarChart3 className="w-5 h-5" />
              Category Performance
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {categoryData.map((category, index) => (
                <div key={index} className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">{category.category}</span>
                    <div className="flex items-center gap-2 text-sm">
                      <span className="text-gray-600">
                        {category.resolved}/{category.tickets}
                      </span>
                      <Badge 
                        className={category.percentage >= 95 ? 'bg-green-100 text-green-800' : 
                                  category.percentage >= 90 ? 'bg-yellow-100 text-yellow-800' : 
                                  'bg-red-100 text-red-800'}
                      >
                        {category.percentage}%
                      </Badge>
                    </div>
                  </div>
                  <Progress value={category.percentage} className="h-2" />
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Agent Performance */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Users className="w-5 h-5" />
            Agent Performance Comparison
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={agentPerformanceData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="resolved" fill="#3b82f6" name="Tickets Resolved" />
            </BarChart>
          </ResponsiveContainer>
          
          <div className="mt-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {agentPerformanceData.map((agent, index) => (
              <div key={index} className="p-4 border rounded-lg">
                <h4 className="font-medium text-gray-900 mb-2">{agent.name}</h4>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Resolved:</span>
                    <span className="font-medium">{agent.resolved}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Satisfaction:</span>
                    <span className={`font-medium ${getPerformanceColor(agent.satisfaction, 4.5)}`}>
                      {agent.satisfaction}/5
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">SLA:</span>
                    <span className={`font-medium ${getPerformanceColor(agent.sla, 95)}`}>
                      {agent.sla}%
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* SLA Compliance Trend */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Target className="w-5 h-5" />
            SLA Compliance Trend
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={250}>
            <LineChart data={slaComplianceData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis domain={[85, 100]} />
              <Tooltip formatter={(value) => [`${value}%`, 'SLA Compliance']} />
              <Line 
                type="monotone" 
                dataKey="compliance" 
                stroke="#10b981" 
                strokeWidth={3}
                dot={{ fill: '#10b981', strokeWidth: 2, r: 4 }}
              />
            </LineChart>
          </ResponsiveContainer>
          <div className="mt-4 p-4 bg-gray-50 rounded-lg">
            <div className="flex items-center justify-between text-sm">
              <span className="text-gray-600">Target SLA Compliance:</span>
              <span className="font-medium">95%</span>
            </div>
            <div className="flex items-center justify-between text-sm mt-1">
              <span className="text-gray-600">Current Month:</span>
              <span className="font-medium text-green-600">96%</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
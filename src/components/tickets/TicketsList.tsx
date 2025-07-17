import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import {
  Search,
  Filter,
  MoreHorizontal,
  Eye,
  Edit,
  MessageSquare,
  Clock,
  User,
  Mail,
  Calendar,
  AlertCircle,
  CheckCircle,
  XCircle
} from 'lucide-react'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'

interface Ticket {
  id: string
  title: string
  customer: string
  customerEmail: string
  priority: 'low' | 'medium' | 'high' | 'critical'
  status: 'new' | 'in_progress' | 'pending' | 'resolved' | 'closed'
  assignedAgent?: string
  createdAt: string
  updatedAt: string
  slaStatus: 'on-track' | 'at-risk' | 'breached'
  category: string
  description?: string
}

export function TicketsList() {
  const [searchTerm, setSearchTerm] = useState('')
  const [statusFilter, setStatusFilter] = useState('all')
  const [priorityFilter, setPriorityFilter] = useState('all')
  const [selectedTicket, setSelectedTicket] = useState<Ticket | null>(null)
  const [newComment, setNewComment] = useState('')

  // Mock data - in real app this would come from API
  const tickets: Ticket[] = [
    {
      id: 'TKT-001',
      title: 'Login issues with mobile app',
      customer: 'John Smith',
      customerEmail: 'john.smith@email.com',
      priority: 'high',
      status: 'new',
      assignedAgent: 'Sarah Johnson',
      createdAt: '2024-01-15T10:30:00Z',
      updatedAt: '2024-01-15T10:30:00Z',
      slaStatus: 'on-track',
      category: 'Technical Support',
      description: 'User cannot log in to the mobile application. Getting error message "Invalid credentials" even with correct password.'
    },
    {
      id: 'TKT-002',
      title: 'Billing discrepancy in invoice #12345',
      customer: 'Sarah Johnson',
      customerEmail: 'sarah.j@company.com',
      priority: 'medium',
      status: 'in_progress',
      assignedAgent: 'Mike Wilson',
      createdAt: '2024-01-14T14:20:00Z',
      updatedAt: '2024-01-15T09:15:00Z',
      slaStatus: 'at-risk',
      category: 'Billing',
      description: 'Invoice shows incorrect amount charged. Expected $99 but was charged $149.'
    },
    {
      id: 'TKT-003',
      title: 'Feature request: Dark mode support',
      customer: 'Mike Wilson',
      customerEmail: 'mike.w@startup.io',
      priority: 'low',
      status: 'pending',
      assignedAgent: 'John Smith',
      createdAt: '2024-01-13T16:45:00Z',
      updatedAt: '2024-01-14T11:30:00Z',
      slaStatus: 'on-track',
      category: 'Feature Request',
      description: 'Would like to see dark mode support added to the application for better user experience.'
    },
    {
      id: 'TKT-004',
      title: 'Data export functionality not working',
      customer: 'Lisa Chen',
      customerEmail: 'lisa.chen@corp.com',
      priority: 'critical',
      status: 'resolved',
      assignedAgent: 'Sarah Johnson',
      createdAt: '2024-01-12T09:00:00Z',
      updatedAt: '2024-01-15T08:45:00Z',
      slaStatus: 'on-track',
      category: 'Bug Report',
      description: 'Export to CSV function returns empty file. Affects all data export operations.'
    }
  ]

  const filteredTickets = tickets.filter(ticket => {
    const matchesSearch = ticket.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         ticket.customer.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         ticket.id.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = statusFilter === 'all' || ticket.status === statusFilter
    const matchesPriority = priorityFilter === 'all' || ticket.priority === priorityFilter
    
    return matchesSearch && matchesStatus && matchesPriority
  })

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'critical': return 'bg-red-100 text-red-800 border-red-200'
      case 'high': return 'bg-orange-100 text-orange-800 border-orange-200'
      case 'medium': return 'bg-blue-100 text-blue-800 border-blue-200'
      case 'low': return 'bg-gray-100 text-gray-800 border-gray-200'
      default: return 'bg-gray-100 text-gray-800 border-gray-200'
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'new': return 'bg-purple-100 text-purple-800 border-purple-200'
      case 'in_progress': return 'bg-blue-100 text-blue-800 border-blue-200'
      case 'pending': return 'bg-yellow-100 text-yellow-800 border-yellow-200'
      case 'resolved': return 'bg-green-100 text-green-800 border-green-200'
      case 'closed': return 'bg-gray-100 text-gray-800 border-gray-200'
      default: return 'bg-gray-100 text-gray-800 border-gray-200'
    }
  }

  const getSlaIcon = (status: string) => {
    switch (status) {
      case 'on-track': return <CheckCircle className="w-4 h-4 text-green-600" />
      case 'at-risk': return <AlertCircle className="w-4 h-4 text-yellow-600" />
      case 'breached': return <XCircle className="w-4 h-4 text-red-600" />
      default: return <Clock className="w-4 h-4 text-gray-600" />
    }
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  const handleStatusChange = (ticketId: string, newStatus: string) => {
    // In real app, this would update via API
    console.log(`Updating ticket ${ticketId} status to ${newStatus}`)
  }

  const handleAddComment = () => {
    if (!newComment.trim() || !selectedTicket) return
    
    // In real app, this would save via API
    console.log(`Adding comment to ticket ${selectedTicket.id}: ${newComment}`)
    setNewComment('')
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900">All Tickets</h1>
        <p className="text-gray-600 mt-1">
          Manage and track all support tickets in one place.
        </p>
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <Input
                  placeholder="Search tickets, customers, or ticket IDs..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            <div className="flex gap-2">
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-40">
                  <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="new">New</SelectItem>
                  <SelectItem value="in_progress">In Progress</SelectItem>
                  <SelectItem value="pending">Pending</SelectItem>
                  <SelectItem value="resolved">Resolved</SelectItem>
                  <SelectItem value="closed">Closed</SelectItem>
                </SelectContent>
              </Select>
              
              <Select value={priorityFilter} onValueChange={setPriorityFilter}>
                <SelectTrigger className="w-40">
                  <SelectValue placeholder="Priority" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Priority</SelectItem>
                  <SelectItem value="critical">Critical</SelectItem>
                  <SelectItem value="high">High</SelectItem>
                  <SelectItem value="medium">Medium</SelectItem>
                  <SelectItem value="low">Low</SelectItem>
                </SelectContent>
              </Select>
              
              <Button variant="outline">
                <Filter className="w-4 h-4 mr-2" />
                More Filters
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Tickets Table */}
      <Card>
        <CardHeader>
          <CardTitle>
            {filteredTickets.length} Tickets
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Ticket</TableHead>
                <TableHead>Customer</TableHead>
                <TableHead>Priority</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Agent</TableHead>
                <TableHead>SLA</TableHead>
                <TableHead>Updated</TableHead>
                <TableHead className="w-12"></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredTickets.map((ticket) => (
                <TableRow key={ticket.id}>
                  <TableCell>
                    <div>
                      <div className="font-medium">{ticket.id}</div>
                      <div className="text-sm text-gray-600 max-w-xs truncate">
                        {ticket.title}
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div>
                      <div className="font-medium">{ticket.customer}</div>
                      <div className="text-sm text-gray-600">{ticket.customerEmail}</div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge className={getPriorityColor(ticket.priority)}>
                      {ticket.priority}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Badge className={getStatusColor(ticket.status)}>
                      {ticket.status.replace('_', ' ')}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div className="text-sm">
                      {ticket.assignedAgent || 'Unassigned'}
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-1">
                      {getSlaIcon(ticket.slaStatus)}
                      <span className="text-sm capitalize">
                        {ticket.slaStatus.replace('-', ' ')}
                      </span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="text-sm text-gray-600">
                      {formatDate(ticket.updatedAt)}
                    </div>
                  </TableCell>
                  <TableCell>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="sm">
                          <MoreHorizontal className="w-4 h-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem onClick={() => setSelectedTicket(ticket)}>
                          <Eye className="w-4 h-4 mr-2" />
                          View Details
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <Edit className="w-4 h-4 mr-2" />
                          Edit Ticket
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <MessageSquare className="w-4 h-4 mr-2" />
                          Add Comment
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Ticket Detail Modal */}
      <Dialog open={!!selectedTicket} onOpenChange={() => setSelectedTicket(null)}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          {selectedTicket && (
            <>
              <DialogHeader>
                <DialogTitle className="flex items-center gap-2">
                  <span>{selectedTicket.id}</span>
                  <Badge className={getPriorityColor(selectedTicket.priority)}>
                    {selectedTicket.priority}
                  </Badge>
                  <Badge className={getStatusColor(selectedTicket.status)}>
                    {selectedTicket.status.replace('_', ' ')}
                  </Badge>
                </DialogTitle>
              </DialogHeader>
              
              <div className="space-y-6">
                {/* Ticket Info */}
                <div>
                  <h3 className="text-lg font-semibold mb-2">{selectedTicket.title}</h3>
                  <p className="text-gray-600 mb-4">{selectedTicket.description}</p>
                  
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div className="flex items-center gap-2">
                      <User className="w-4 h-4 text-gray-400" />
                      <span className="text-gray-600">Customer:</span>
                      <span className="font-medium">{selectedTicket.customer}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Mail className="w-4 h-4 text-gray-400" />
                      <span className="text-gray-600">Email:</span>
                      <span className="font-medium">{selectedTicket.customerEmail}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Calendar className="w-4 h-4 text-gray-400" />
                      <span className="text-gray-600">Created:</span>
                      <span className="font-medium">{formatDate(selectedTicket.createdAt)}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <User className="w-4 h-4 text-gray-400" />
                      <span className="text-gray-600">Assigned:</span>
                      <span className="font-medium">{selectedTicket.assignedAgent || 'Unassigned'}</span>
                    </div>
                  </div>
                </div>

                {/* Status Update */}
                <div className="border-t pt-4">
                  <Label htmlFor="status-update">Update Status</Label>
                  <div className="flex gap-2 mt-2">
                    <Select 
                      value={selectedTicket.status} 
                      onValueChange={(value) => handleStatusChange(selectedTicket.id, value)}
                    >
                      <SelectTrigger className="w-48">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="new">New</SelectItem>
                        <SelectItem value="in_progress">In Progress</SelectItem>
                        <SelectItem value="pending">Pending</SelectItem>
                        <SelectItem value="resolved">Resolved</SelectItem>
                        <SelectItem value="closed">Closed</SelectItem>
                      </SelectContent>
                    </Select>
                    <Button>Update</Button>
                  </div>
                </div>

                {/* Add Comment */}
                <div className="border-t pt-4">
                  <Label htmlFor="new-comment">Add Comment</Label>
                  <Textarea
                    id="new-comment"
                    placeholder="Add a comment or update..."
                    value={newComment}
                    onChange={(e) => setNewComment(e.target.value)}
                    className="mt-2"
                    rows={3}
                  />
                  <div className="flex justify-end mt-2">
                    <Button onClick={handleAddComment} disabled={!newComment.trim()}>
                      <MessageSquare className="w-4 h-4 mr-2" />
                      Add Comment
                    </Button>
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
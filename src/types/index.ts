export interface Ticket {
  id: string
  title: string
  description?: string
  status: 'new' | 'in_progress' | 'pending' | 'resolved' | 'closed'
  priority: 'low' | 'medium' | 'high' | 'critical'
  category?: string
  customerName?: string
  customerEmail: string
  assignedAgentId?: string
  createdAt: string
  updatedAt: string
  resolvedAt?: string
  closedAt?: string
  slaResponseDue?: string
  slaResolutionDue?: string
  userId: string
}

export interface Agent {
  id: string
  name: string
  email: string
  department?: string
  specialties: string[]
  isActive: boolean
  maxTickets: number
  currentTickets: number
  createdAt: string
  userId: string
}

export interface TicketComment {
  id: string
  ticketId: string
  authorName: string
  authorEmail: string
  content: string
  isInternal: boolean
  createdAt: string
  userId: string
}

export interface AssignmentRule {
  id: string
  name: string
  conditions: Record<string, any>
  agentId?: string
  priority: number
  isActive: boolean
  createdAt: string
  userId: string
}

export interface TicketStats {
  total: number
  new: number
  inProgress: number
  pending: number
  resolved: number
  closed: number
  overdue: number
}

export interface AgentPerformance {
  agentId: string
  agentName: string
  totalTickets: number
  resolvedTickets: number
  avgResolutionTime: number
  customerSatisfaction: number
  slaCompliance: number
}
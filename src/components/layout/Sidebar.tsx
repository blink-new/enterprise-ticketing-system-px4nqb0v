import { useState } from 'react'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import {
  LayoutDashboard,
  Ticket,
  Plus,
  Users,
  BarChart3,
  Settings,
  Menu,
  X,
  Bell,
  Search
} from 'lucide-react'

interface SidebarProps {
  currentPage: string
  onPageChange: (page: string) => void
  className?: string
}

export function Sidebar({ currentPage, onPageChange, className }: SidebarProps) {
  const [isCollapsed, setIsCollapsed] = useState(false)

  const navigation = [
    {
      id: 'dashboard',
      name: 'Dashboard',
      icon: LayoutDashboard,
      badge: null
    },
    {
      id: 'tickets',
      name: 'All Tickets',
      icon: Ticket,
      badge: '24'
    },
    {
      id: 'create-ticket',
      name: 'Create Ticket',
      icon: Plus,
      badge: null
    },
    {
      id: 'agents',
      name: 'Agents',
      icon: Users,
      badge: null
    },
    {
      id: 'analytics',
      name: 'Analytics',
      icon: BarChart3,
      badge: null
    },
    {
      id: 'settings',
      name: 'Settings',
      icon: Settings,
      badge: null
    }
  ]

  return (
    <div className={cn(
      'flex flex-col h-full bg-white border-r border-gray-200 transition-all duration-300',
      isCollapsed ? 'w-16' : 'w-64',
      className
    )}>
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-gray-200">
        {!isCollapsed && (
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
              <Ticket className="w-5 h-5 text-white" />
            </div>
            <div>
              <h1 className="text-lg font-semibold text-gray-900">TicketPro</h1>
              <p className="text-xs text-gray-500">Enterprise</p>
            </div>
          </div>
        )}
        <Button
          variant="ghost"
          size="sm"
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="p-2"
        >
          {isCollapsed ? <Menu className="w-4 h-4" /> : <X className="w-4 h-4" />}
        </Button>
      </div>

      {/* Quick Actions */}
      {!isCollapsed && (
        <div className="p-4 border-b border-gray-200">
          <div className="flex space-x-2">
            <Button size="sm" className="flex-1">
              <Plus className="w-4 h-4 mr-1" />
              New
            </Button>
            <Button variant="outline" size="sm">
              <Search className="w-4 h-4" />
            </Button>
            <Button variant="outline" size="sm">
              <Bell className="w-4 h-4" />
            </Button>
          </div>
        </div>
      )}

      {/* Navigation */}
      <nav className="flex-1 p-4 space-y-2">
        {navigation.map((item) => {
          const Icon = item.icon
          const isActive = currentPage === item.id
          
          return (
            <Button
              key={item.id}
              variant={isActive ? 'default' : 'ghost'}
              className={cn(
                'w-full justify-start',
                isCollapsed ? 'px-2' : 'px-3',
                isActive && 'bg-blue-600 text-white hover:bg-blue-700'
              )}
              onClick={() => onPageChange(item.id)}
            >
              <Icon className={cn('w-5 h-5', isCollapsed ? '' : 'mr-3')} />
              {!isCollapsed && (
                <>
                  <span className="flex-1 text-left">{item.name}</span>
                  {item.badge && (
                    <Badge variant="secondary" className="ml-auto">
                      {item.badge}
                    </Badge>
                  )}
                </>
              )}
            </Button>
          )
        })}
      </nav>

      {/* User Info */}
      {!isCollapsed && (
        <div className="p-4 border-t border-gray-200">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center">
              <span className="text-sm font-medium text-gray-700">JD</span>
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-gray-900 truncate">John Doe</p>
              <p className="text-xs text-gray-500 truncate">Administrator</p>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
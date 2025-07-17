import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Switch } from '@/components/ui/switch'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Textarea } from '@/components/ui/textarea'
import { Badge } from '@/components/ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Alert, AlertDescription } from '@/components/ui/alert'
import {
  Settings,
  Mail,
  Bell,
  Users,
  Shield,
  Clock,
  Zap,
  Save,
  Plus,
  Trash2,
  Edit,
  CheckCircle,
  AlertCircle
} from 'lucide-react'

export function SettingsPage() {
  const [emailNotifications, setEmailNotifications] = useState(true)
  const [slackNotifications, setSlackNotifications] = useState(false)
  const [autoAssignment, setAutoAssignment] = useState(true)
  const [saveStatus, setSaveStatus] = useState<'idle' | 'saving' | 'saved'>('idle')

  const handleSave = async () => {
    setSaveStatus('saving')
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000))
    setSaveStatus('saved')
    setTimeout(() => setSaveStatus('idle'), 2000)
  }

  const slaSettings = [
    { priority: 'Critical', response: '1', resolution: '4', color: 'bg-red-100 text-red-800' },
    { priority: 'High', response: '2', resolution: '8', color: 'bg-orange-100 text-orange-800' },
    { priority: 'Medium', response: '4', resolution: '24', color: 'bg-blue-100 text-blue-800' },
    { priority: 'Low', response: '8', resolution: '72', color: 'bg-gray-100 text-gray-800' }
  ]

  const assignmentRules = [
    {
      id: 1,
      name: 'Critical Technical Issues',
      conditions: 'Priority = Critical AND Category = Technical Support',
      assignTo: 'John Smith',
      isActive: true
    },
    {
      id: 2,
      name: 'Billing Issues',
      conditions: 'Category = Billing',
      assignTo: 'Mike Wilson',
      isActive: true
    },
    {
      id: 3,
      name: 'General Technical',
      conditions: 'Category = Technical Support',
      assignTo: 'Sarah Johnson',
      isActive: false
    }
  ]

  const emailTemplates = [
    {
      id: 1,
      name: 'Ticket Created',
      subject: 'Your support ticket has been created - #{ticketId}',
      trigger: 'On ticket creation',
      isActive: true
    },
    {
      id: 2,
      name: 'Status Update',
      subject: 'Update on your support ticket #{ticketId}',
      trigger: 'On status change',
      isActive: true
    },
    {
      id: 3,
      name: 'Ticket Resolved',
      subject: 'Your support ticket has been resolved - #{ticketId}',
      trigger: 'On ticket resolution',
      isActive: true
    }
  ]

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Settings</h1>
          <p className="text-gray-600 mt-1">
            Configure your ticketing system preferences and rules.
          </p>
        </div>
        <Button onClick={handleSave} disabled={saveStatus === 'saving'}>
          {saveStatus === 'saving' ? (
            <>
              <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
              Saving...
            </>
          ) : (
            <>
              <Save className="w-4 h-4 mr-2" />
              Save Changes
            </>
          )}
        </Button>
      </div>

      {/* Save Status */}
      {saveStatus === 'saved' && (
        <Alert className="border-green-200 bg-green-50">
          <CheckCircle className="h-4 w-4 text-green-600" />
          <AlertDescription className="text-green-800">
            Settings saved successfully!
          </AlertDescription>
        </Alert>
      )}

      <Tabs defaultValue="general" className="space-y-6">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="general">General</TabsTrigger>
          <TabsTrigger value="notifications">Notifications</TabsTrigger>
          <TabsTrigger value="sla">SLA Rules</TabsTrigger>
          <TabsTrigger value="assignment">Assignment</TabsTrigger>
          <TabsTrigger value="templates">Templates</TabsTrigger>
        </TabsList>

        {/* General Settings */}
        <TabsContent value="general" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Settings className="w-5 h-5" />
                General Settings
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <Label htmlFor="company-name">Company Name</Label>
                  <Input id="company-name" defaultValue="Acme Corporation" />
                </div>
                <div>
                  <Label htmlFor="support-email">Support Email</Label>
                  <Input id="support-email" type="email" defaultValue="support@acme.com" />
                </div>
              </div>

              <div>
                <Label htmlFor="business-hours">Business Hours</Label>
                <div className="grid grid-cols-2 gap-4 mt-2">
                  <Select defaultValue="9">
                    <SelectTrigger>
                      <SelectValue placeholder="Start time" />
                    </SelectTrigger>
                    <SelectContent>
                      {Array.from({ length: 24 }, (_, i) => (
                        <SelectItem key={i} value={i.toString()}>
                          {i.toString().padStart(2, '0')}:00
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <Select defaultValue="17">
                    <SelectTrigger>
                      <SelectValue placeholder="End time" />
                    </SelectTrigger>
                    <SelectContent>
                      {Array.from({ length: 24 }, (_, i) => (
                        <SelectItem key={i} value={i.toString()}>
                          {i.toString().padStart(2, '0')}:00
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div>
                <Label htmlFor="timezone">Timezone</Label>
                <Select defaultValue="utc-5">
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="utc-8">Pacific Time (UTC-8)</SelectItem>
                    <SelectItem value="utc-7">Mountain Time (UTC-7)</SelectItem>
                    <SelectItem value="utc-6">Central Time (UTC-6)</SelectItem>
                    <SelectItem value="utc-5">Eastern Time (UTC-5)</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="auto-assignment">Auto-Assignment</Label>
                  <p className="text-sm text-gray-600">
                    Automatically assign tickets based on rules
                  </p>
                </div>
                <Switch
                  id="auto-assignment"
                  checked={autoAssignment}
                  onCheckedChange={setAutoAssignment}
                />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Notifications */}
        <TabsContent value="notifications" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Bell className="w-5 h-5" />
                Notification Settings
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="email-notifications">Email Notifications</Label>
                    <p className="text-sm text-gray-600">
                      Send email notifications for ticket updates
                    </p>
                  </div>
                  <Switch
                    id="email-notifications"
                    checked={emailNotifications}
                    onCheckedChange={setEmailNotifications}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="slack-notifications">Slack Notifications</Label>
                    <p className="text-sm text-gray-600">
                      Send notifications to Slack channels
                    </p>
                  </div>
                  <Switch
                    id="slack-notifications"
                    checked={slackNotifications}
                    onCheckedChange={setSlackNotifications}
                  />
                </div>
              </div>

              {emailNotifications && (
                <div className="border-t pt-6">
                  <h3 className="font-medium mb-4">Email Configuration</h3>
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="smtp-server">SMTP Server</Label>
                      <Input id="smtp-server" placeholder="smtp.gmail.com" />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="smtp-port">Port</Label>
                        <Input id="smtp-port" placeholder="587" />
                      </div>
                      <div>
                        <Label htmlFor="smtp-security">Security</Label>
                        <Select defaultValue="tls">
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="none">None</SelectItem>
                            <SelectItem value="tls">TLS</SelectItem>
                            <SelectItem value="ssl">SSL</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="smtp-username">Username</Label>
                        <Input id="smtp-username" placeholder="your-email@company.com" />
                      </div>
                      <div>
                        <Label htmlFor="smtp-password">Password</Label>
                        <Input id="smtp-password" type="password" placeholder="••••••••" />
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {slackNotifications && (
                <div className="border-t pt-6">
                  <h3 className="font-medium mb-4">Slack Configuration</h3>
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="slack-webhook">Webhook URL</Label>
                      <Input id="slack-webhook" placeholder="https://hooks.slack.com/..." />
                    </div>
                    <div>
                      <Label htmlFor="slack-channel">Default Channel</Label>
                      <Input id="slack-channel" placeholder="#support" />
                    </div>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        {/* SLA Rules */}
        <TabsContent value="sla" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Clock className="w-5 h-5" />
                SLA Configuration
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {slaSettings.map((sla, index) => (
                  <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex items-center gap-3">
                      <Badge className={sla.color}>
                        {sla.priority}
                      </Badge>
                      <div>
                        <div className="font-medium">Priority: {sla.priority}</div>
                        <div className="text-sm text-gray-600">
                          Response: {sla.response}h • Resolution: {sla.resolution}h
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Input 
                        className="w-20" 
                        defaultValue={sla.response}
                        placeholder="Hours"
                      />
                      <span className="text-sm text-gray-600">h response</span>
                      <Input 
                        className="w-20" 
                        defaultValue={sla.resolution}
                        placeholder="Hours"
                      />
                      <span className="text-sm text-gray-600">h resolution</span>
                      <Button variant="outline" size="sm">
                        <Edit className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Assignment Rules */}
        <TabsContent value="assignment" className="space-y-6">
          <Card>
            <CardHeader className="flex items-center justify-between">
              <CardTitle className="flex items-center gap-2">
                <Users className="w-5 h-5" />
                Assignment Rules
              </CardTitle>
              <Button>
                <Plus className="w-4 h-4 mr-2" />
                Add Rule
              </Button>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {assignmentRules.map((rule) => (
                  <div key={rule.id} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="font-medium">{rule.name}</span>
                        <Badge variant={rule.isActive ? 'default' : 'secondary'}>
                          {rule.isActive ? 'Active' : 'Inactive'}
                        </Badge>
                      </div>
                      <div className="text-sm text-gray-600 mb-1">
                        Conditions: {rule.conditions}
                      </div>
                      <div className="text-sm text-gray-600">
                        Assign to: {rule.assignTo}
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Switch defaultChecked={rule.isActive} />
                      <Button variant="outline" size="sm">
                        <Edit className="w-4 h-4" />
                      </Button>
                      <Button variant="outline" size="sm">
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Email Templates */}
        <TabsContent value="templates" className="space-y-6">
          <Card>
            <CardHeader className="flex items-center justify-between">
              <CardTitle className="flex items-center gap-2">
                <Mail className="w-5 h-5" />
                Email Templates
              </CardTitle>
              <Button>
                <Plus className="w-4 h-4 mr-2" />
                Add Template
              </Button>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {emailTemplates.map((template) => (
                  <div key={template.id} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="font-medium">{template.name}</span>
                        <Badge variant={template.isActive ? 'default' : 'secondary'}>
                          {template.isActive ? 'Active' : 'Inactive'}
                        </Badge>
                      </div>
                      <div className="text-sm text-gray-600 mb-1">
                        Subject: {template.subject}
                      </div>
                      <div className="text-sm text-gray-600">
                        Trigger: {template.trigger}
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Switch defaultChecked={template.isActive} />
                      <Button variant="outline" size="sm">
                        <Edit className="w-4 h-4" />
                      </Button>
                      <Button variant="outline" size="sm">
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>

              <div className="border-t pt-6 mt-6">
                <h3 className="font-medium mb-4">Template Variables</h3>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4 text-sm">
                  <div className="p-3 bg-gray-50 rounded-lg">
                    <code className="font-mono text-blue-600">#{ticketId}</code>
                    <p className="text-gray-600 mt-1">Ticket ID</p>
                  </div>
                  <div className="p-3 bg-gray-50 rounded-lg">
                    <code className="font-mono text-blue-600">#{customerName}</code>
                    <p className="text-gray-600 mt-1">Customer Name</p>
                  </div>
                  <div className="p-3 bg-gray-50 rounded-lg">
                    <code className="font-mono text-blue-600">#{ticketTitle}</code>
                    <p className="text-gray-600 mt-1">Ticket Title</p>
                  </div>
                  <div className="p-3 bg-gray-50 rounded-lg">
                    <code className="font-mono text-blue-600">#{agentName}</code>
                    <p className="text-gray-600 mt-1">Assigned Agent</p>
                  </div>
                  <div className="p-3 bg-gray-50 rounded-lg">
                    <code className="font-mono text-blue-600">#{status}</code>
                    <p className="text-gray-600 mt-1">Ticket Status</p>
                  </div>
                  <div className="p-3 bg-gray-50 rounded-lg">
                    <code className="font-mono text-blue-600">#{priority}</code>
                    <p className="text-gray-600 mt-1">Ticket Priority</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
<template>
  <div class="space-y-6">
    <div>
      <h1 class="text-3xl font-heading font-bold">Support</h1>
      <p class="text-muted-foreground">Get help and contact our support team</p>
    </div>

    <div class="flex flex-col gap-3">
      <Card>
        <CardHeader>
          <CardTitle class="font-heading">Contact Support</CardTitle>
          <CardDescription>Get in touch with our support team</CardDescription>
        </CardHeader>
        <CardContent>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div class="space-y-4">
              <div class="flex items-start gap-4">
                <div class="p-3 rounded-full bg-primary/10">
                  <ILucideMail class="h-5 w-5 text-primary" />
                </div>
                <div>
                  <h3 class="font-medium">Email Support</h3>
                  <p class="text-sm text-muted-foreground">support@jawbli.dz</p>
                  <p class="text-xs text-muted-foreground mt-1">Response within 24 hours</p>
                </div>
              </div>

              <div class="flex items-start gap-4">
                <div class="p-3 rounded-full bg-primary/10">
                  <ILucidePhone class="h-5 w-5 text-primary" />
                </div>
                <div>
                  <h3 class="font-medium">Phone Support</h3>
                  <p class="text-sm text-muted-foreground">+213 123 456 789</p>
                  <p class="text-xs text-muted-foreground mt-1">Mon-Fri, 9am-5pm (Algiers time)</p>
                </div>
              </div>

              <div class="flex items-start gap-4">
                <div class="p-3 rounded-full bg-primary/10">
                  <ILucideMessageSquare class="h-5 w-5 text-primary" />
                </div>
                <div>
                  <h3 class="font-medium">Live Chat</h3>
                  <p class="text-sm text-muted-foreground">Available now</p>
                  <p class="text-xs text-muted-foreground mt-1">Chat with an agent directly</p>
                </div>
              </div>
            </div>

            <div>
              <h3 class="font-medium mb-4">Submit a Request</h3>
              <form @submit.prevent="submitSupportRequest">
                <div class="space-y-4">
                  <Label for="requestType">Request Type</Label>
                  <Select v-model="supportRequest.type">
                    <SelectTrigger>
                      <SelectValue placeholder="Select request type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="technical">Technical Issue</SelectItem>
                      <SelectItem value="billing">Billing Question</SelectItem>
                      <SelectItem value="account">Account Issue</SelectItem>
                      <SelectItem value="feature">Feature Request</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>

                  <Label for="requestSubject">Subject</Label>
                  <Input
                    id="requestSubject"
                    v-model="supportRequest.subject"
                    placeholder="Briefly describe your issue"
                  />

                  <Label for="requestMessage">Description</Label>
                  <Textarea
                    id="requestMessage"
                    v-model="supportRequest.message"
                    placeholder="Please provide detailed information about your issue..."
                    rows="4"
                  />

                  <Label for="requestPriority">Priority</Label>
                  <Select v-model="supportRequest.priority">
                    <SelectTrigger>
                      <SelectValue placeholder="Select priority" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="low">Low</SelectItem>
                      <SelectItem value="medium">Medium</SelectItem>
                      <SelectItem value="high">High</SelectItem>
                      <SelectItem value="urgent">Urgent</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div class="mt-6 flex justify-end">
                  <Button type="submit">Submit Request</Button>
                </div>
              </form>
            </div>
          </div>
        </CardContent>
      </Card>

      <!-- Support Tickets -->
      <Card class="mt-6">
        <CardHeader>
          <CardTitle class="font-heading">Support Tickets</CardTitle>
          <CardDescription>View and manage your support requests</CardDescription>
        </CardHeader>
        <CardContent>
          <div class="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Ticket ID</TableHead>
                  <TableHead>Subject</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Priority</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead class="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                <TableRow v-for="ticket in supportTickets" :key="ticket.id">
                  <TableCell class="font-medium">#{{ ticket.id }}</TableCell>
                  <TableCell>{{ ticket.subject }}</TableCell>
                  <TableCell>
                    <Badge :variant="getStatusVariant(ticket.status)">
                      {{ ticket.status }}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Badge :variant="getPriorityVariant(ticket.priority)">
                      {{ ticket.priority }}
                    </Badge>
                  </TableCell>
                  <TableCell>{{ formatDate(ticket.date) }}</TableCell>
                  <TableCell class="text-right">
                    <Button variant="ghost" size="sm" @click="viewTicket(ticket.id)"> View </Button>
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Badge } from '@/components/ui/badge'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { useToast } from '@/composables/useToast'

const { showSuccess, showError } = useToast()

// Support request form
const supportRequest = ref({
  type: 'technical',
  subject: '',
  message: '',
  priority: 'medium',
})

// Support tickets
const supportTickets = [
  {
    id: 'TKT-001',
    subject: 'Issue with order notifications',
    status: 'open',
    priority: 'high',
    date: new Date(2023, 10, 15),
  },
  {
    id: 'TKT-002',
    subject: 'Billing question about subscription',
    status: 'closed',
    priority: 'medium',
    date: new Date(2023, 10, 10),
  },
  {
    id: 'TKT-003',
    subject: 'Feature request: Multi-language support',
    status: 'pending',
    priority: 'low',
    date: new Date(2023, 10, 5),
  },
]

// Submit support request
const submitSupportRequest = () => {
  if (!supportRequest.value.subject.trim() || !supportRequest.value.message.trim()) {
    showError('Please provide both a subject and message')
    return
  }

  showSuccess('Your support request has been submitted. We will get back to you soon.')
  console.log('Support request submitted:', supportRequest.value)

  // Reset form
  supportRequest.value = {
    type: 'technical',
    subject: '',
    message: '',
    priority: 'medium',
  }
}

// View ticket
const viewTicket = (id: string) => {
  showSuccess(`Viewing ticket: ${id}`)
  console.log(`Viewing ticket: ${id}`)
}

// Format date
const formatDate = (date: Date) => {
  return new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  }).format(date)
}

// Get status variant for badge
const getStatusVariant = (status: string) => {
  switch (status) {
    case 'open':
      return 'default'
    case 'closed':
      return 'secondary'
    case 'pending':
      return 'outline'
    default:
      return 'outline'
  }
}

// Get priority variant for badge
const getPriorityVariant = (priority: string) => {
  switch (priority) {
    case 'urgent':
      return 'destructive'
    case 'high':
      return 'default'
    case 'medium':
      return 'secondary'
    case 'low':
      return 'outline'
    default:
      return 'outline'
  }
}
</script>

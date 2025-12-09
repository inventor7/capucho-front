<template>
  <div class="space-y-6">
    <div>
      <h1 class="text-3xl font-heading font-bold">Billing</h1>
      <p class="text-muted-foreground">Manage your subscription and billing information</p>
    </div>

    <div class="grid grid-cols-1 lg:grid-cols-4 gap-6">
      <!-- Sidebar navigation -->
      <div class="lg:col-span-1">
        <div class="border rounded-lg">
          <div class="p-4 border-b">
            <h2 class="font-semibold">Settings</h2>
          </div>
          <div class="p-2">
            <nav class="space-y-1">
              <RouterLink
                to="/settings"
                :class="[
                  $route.path === '/settings' ? 'bg-primary/10 text-primary' : 'hover:bg-muted',
                  'flex items-center gap-2 px-3 py-2 rounded-md text-sm font-medium transition-colors',
                ]"
              >
                <ILucideSettings class="h-4 w-4" />
                Profile
              </RouterLink>
              <RouterLink
                to="/settings/store"
                :class="[
                  $route.path === '/settings/store'
                    ? 'bg-primary/10 text-primary'
                    : 'hover:bg-muted',
                  'flex items-center gap-2 px-3 py-2 rounded-md text-sm font-medium transition-colors',
                ]"
              >
                <ILucideStore class="h-4 w-4" />
                Store
              </RouterLink>
              <RouterLink
                to="/settings/business-hours"
                :class="[
                  $route.path === '/settings/business-hours'
                    ? 'bg-primary/10 text-primary'
                    : 'hover:bg-muted',
                  'flex items-center gap-2 px-3 py-2 rounded-md text-sm font-medium transition-colors',
                ]"
              >
                <ILucideClock class="h-4 w-4" />
                Business Hours
              </RouterLink>
              <RouterLink
                to="/settings/delivery-zone"
                :class="[
                  $route.path === '/settings/delivery-zone'
                    ? 'bg-primary/10 text-primary'
                    : 'hover:bg-muted',
                  'flex items-center gap-2 px-3 py-2 rounded-md text-sm font-medium transition-colors',
                ]"
              >
                <ILucideMapPin class="h-4 w-4" />
                Delivery Zones
              </RouterLink>
              <RouterLink
                to="/settings/billing"
                :class="[
                  $route.path === '/settings/billing'
                    ? 'bg-primary/10 text-primary'
                    : 'hover:bg-muted',
                  'flex items-center gap-2 px-3 py-2 rounded-md text-sm font-medium transition-colors',
                ]"
              >
                <ILucideCreditCard class="h-4 w-4" />
                Billing
              </RouterLink>
              <RouterLink
                to="/settings/limits"
                :class="[
                  $route.path === '/settings/limits'
                    ? 'bg-primary/10 text-primary'
                    : 'hover:bg-muted',
                  'flex items-center gap-2 px-3 py-2 rounded-md text-sm font-medium transition-colors',
                ]"
              >
                <ILucideBarChart3 class="h-4 w-4" />
                Limits
              </RouterLink>
              <RouterLink
                to="/settings/feedback"
                :class="[
                  $route.path === '/settings/feedback'
                    ? 'bg-primary/10 text-primary'
                    : 'hover:bg-muted',
                  'flex items-center gap-2 px-3 py-2 rounded-md text-sm font-medium transition-colors',
                ]"
              >
                <ILucideMessageCircle class="h-4 w-4" />
                Feedback
              </RouterLink>
              <RouterLink
                to="/settings/support"
                :class="[
                  $route.path === '/settings/support'
                    ? 'bg-primary/10 text-primary'
                    : 'hover:bg-muted',
                  'flex items-center gap-2 px-3 py-2 rounded-md text-sm font-medium transition-colors',
                ]"
              >
                <ILucideHelpCircle class="h-4 w-4" />
                Support
              </RouterLink>
            </nav>
          </div>
        </div>
      </div>

      <!-- Main content -->
      <div class="lg:col-span-3">
        <!-- Current Plan -->
        <Card>
          <CardHeader>
            <CardTitle class="font-heading">Current Plan</CardTitle>
            <CardDescription>Your current subscription and features</CardDescription>
          </CardHeader>
          <CardContent>
            <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div class="border rounded-lg p-6">
                <h3 class="text-xl font-bold mb-2">Starter Plan</h3>
                <p class="text-3xl font-bold mb-4">Free</p>
                <ul class="space-y-2 mb-6">
                  <li class="flex items-center">
                    <ILucideCheck class="h-4 w-4 text-green-500 mr-2" />
                    <span>100 messages/month</span>
                  </li>
                  <li class="flex items-center">
                    <ILucideCheck class="h-4 w-4 text-green-500 mr-2" />
                    <span>Basic chatbot</span>
                  </li>
                  <li class="flex items-center">
                    <ILucideCheck class="h-4 w-4 text-green-500 mr-2" />
                    <span>Standard support</span>
                  </li>
                  <li class="flex items-center text-muted-foreground">
                    <ILucideX class="h-4 w-4 mr-2" />
                    <span>Advanced analytics</span>
                  </li>
                  <li class="flex items-center text-muted-foreground">
                    <ILucideX class="h-4 w-4 mr-2" />
                    <span>Priority support</span>
                  </li>
                </ul>
                <Button class="w-full" @click="upgradePlan">Upgrade Plan</Button>
              </div>

              <div class="border rounded-lg p-6">
                <h3 class="text-xl font-bold mb-2">Pro Plan</h3>
                <p class="text-3xl font-bold mb-4">
                  $29<span class="text-lg text-muted-foreground">/month</span>
                </p>
                <ul class="space-y-2 mb-6">
                  <li class="flex items-center">
                    <ILucideCheck class="h-4 w-4 text-green-500 mr-2" />
                    <span>1000 messages/month</span>
                  </li>
                  <li class="flex items-center">
                    <ILucideCheck class="h-4 w-4 text-green-500 mr-2" />
                    <span>Advanced chatbot</span>
                  </li>
                  <li class="flex items-center">
                    <ILucideCheck class="h-4 w-4 text-green-500 mr-2" />
                    <span>Priority support</span>
                  </li>
                  <li class="flex items-center">
                    <ILucideCheck class="h-4 w-4 text-green-500 mr-2" />
                    <span>Advanced analytics</span>
                  </li>
                  <li class="flex items-center text-muted-foreground">
                    <ILucideX class="h-4 w-4 mr-2" />
                    <span>Custom integrations</span>
                  </li>
                </ul>
                <Button variant="outline" class="w-full" @click="upgradePlan"
                  >Upgrade to Pro</Button
                >
              </div>

              <div class="border rounded-lg p-6">
                <h3 class="text-xl font-bold mb-2">Enterprise Plan</h3>
                <p class="text-3xl font-bold mb-4">
                  $99<span class="text-lg text-muted-foreground">/month</span>
                </p>
                <ul class="space-y-2 mb-6">
                  <li class="flex items-center">
                    <ILucideCheck class="h-4 w-4 text-green-500 mr-2" />
                    <span>Unlimited messages</span>
                  </li>
                  <li class="flex items-center">
                    <ILucideCheck class="h-4 w-4 text-green-500 mr-2" />
                    <span>Custom chatbot</span>
                  </li>
                  <li class="flex items-center">
                    <ILucideCheck class="h-4 w-4 text-green-500 mr-2" />
                    <span>24/7 dedicated support</span>
                  </li>
                  <li class="flex items-center">
                    <ILucideCheck class="h-4 w-4 text-green-500 mr-2" />
                    <span>Advanced analytics</span>
                  </li>
                  <li class="flex items-center">
                    <ILucideCheck class="h-4 w-4 text-green-500 mr-2" />
                    <span>Custom integrations</span>
                  </li>
                </ul>
                <Button variant="outline" class="w-full" @click="contactSales"
                  >Contact Sales</Button
                >
              </div>
            </div>
          </CardContent>
        </Card>

        <!-- Payment Methods -->
        <Card class="mt-6">
          <CardHeader>
            <CardTitle class="font-heading">Payment Methods</CardTitle>
            <CardDescription>Manage your payment information</CardDescription>
          </CardHeader>
          <CardContent>
            <div class="flex justify-between items-center mb-6">
              <h3 class="font-medium">Saved Payment Methods</h3>
              <Button type="button" variant="outline" @click="addPaymentMethod">
                <ILucidePlus class="h-4 w-4 mr-2" />
                Add Payment Method
              </Button>
            </div>

            <div v-if="paymentMethods.length === 0" class="text-center py-8 text-muted-foreground">
              <ILucideCreditCard class="h-12 w-12 mx-auto mb-3" />
              <p>No payment methods saved. Add a payment method to upgrade your plan.</p>
            </div>

            <div v-else class="space-y-4">
              <div
                v-for="(method, index) in paymentMethods"
                :key="index"
                class="p-4 border rounded-lg flex justify-between items-center"
              >
                <div class="flex items-center gap-4">
                  <div class="p-3 rounded-lg bg-muted">
                    <ILucideCreditCard class="h-6 w-6" />
                  </div>
                  <div>
                    <div class="font-medium">{{ method.type }} ending in {{ method.last4 }}</div>
                    <div class="text-sm text-muted-foreground">
                      Expires {{ method.expMonth }}/{{ method.expYear }}
                    </div>
                  </div>
                </div>
                <div class="flex gap-2">
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    @click="editPaymentMethod(index)"
                  >
                    Edit
                  </Button>
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    @click="removePaymentMethod(index)"
                  >
                    Remove
                  </Button>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <!-- Billing History -->
        <Card class="mt-6">
          <CardHeader>
            <CardTitle class="font-heading">Billing History</CardTitle>
            <CardDescription>View your past invoices and payments</CardDescription>
          </CardHeader>
          <CardContent>
            <div class="rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Date</TableHead>
                    <TableHead>Description</TableHead>
                    <TableHead>Amount</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead class="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow v-for="invoice in invoices" :key="invoice.id">
                    <TableCell>{{ formatDate(invoice.date) }}</TableCell>
                    <TableCell>{{ invoice.description }}</TableCell>
                    <TableCell>{{ formatCurrency(invoice.amount) }}</TableCell>
                    <TableCell>
                      <Badge :variant="getStatusVariant(invoice.status)">
                        {{ invoice.status }}
                      </Badge>
                    </TableCell>
                    <TableCell class="text-right">
                      <Button variant="ghost" size="sm" @click="viewInvoice(invoice.id)">
                        View
                      </Button>
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>

    <!-- Payment Method Dialog -->
    <Dialog v-model:open="showPaymentDialog">
      <DialogTrigger as-child>
        <div class="hidden"></div>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{{
            editingPaymentIndex !== null ? 'Edit Payment Method' : 'Add Payment Method'
          }}</DialogTitle>
          <DialogDescription>
            {{
              editingPaymentIndex !== null
                ? 'Update your payment information'
                : 'Add a new payment method'
            }}
          </DialogDescription>
        </DialogHeader>
        <div class="space-y-4 py-4">
          <div>
            <Label for="cardNumber">Card Number</Label>
            <Input
              id="cardNumber"
              v-model="currentPayment.cardNumber"
              placeholder="1234 5678 9012 3456"
            />
          </div>
          <div class="grid grid-cols-2 gap-4">
            <div>
              <Label for="expDate">Expiry Date</Label>
              <Input id="expDate" v-model="currentPayment.expDate" placeholder="MM/YY" />
            </div>
            <div>
              <Label for="cvc">CVC</Label>
              <Input id="cvc" v-model="currentPayment.cvc" placeholder="123" />
            </div>
          </div>
          <div>
            <Label for="cardholderName">Cardholder Name</Label>
            <Input
              id="cardholderName"
              v-model="currentPayment.cardholderName"
              placeholder="John Doe"
            />
          </div>
        </div>
        <DialogFooter>
          <Button type="button" variant="outline" @click="closePaymentDialog"> Cancel </Button>
          <Button type="button" @click="savePaymentMethod">
            {{ editingPaymentIndex !== null ? 'Update' : 'Add' }}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Badge } from '@/components/ui/badge'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
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

// Mock subscription data
const subscription = {
  plan: 'starter',
  status: 'active',
  periodEnd: new Date(2024, 11, 31), // December 31, 2024
}

// Payment methods
const paymentMethods = ref([
  {
    id: 'pm-1',
    type: 'Visa',
    last4: '4242',
    expDate: '11',
    expMonth: '12',
    expYear: '2025',
    cardholderName: 'Ahmed Benali',
  },
  {
    id: 'pm-2',
    type: 'Mastercard',
    last4: '1234',
    expDate: '11',
    expMonth: '06',
    expYear: '2024',
    cardholderName: 'Ahmed Benali',
  },
])

// Billing history
const invoices = [
  {
    id: 'inv-1',
    date: new Date(2023, 10, 15),
    description: 'Pro Plan Subscription',
    amount: 29.99,
    status: 'paid',
  },
  {
    id: 'inv-2',
    date: new Date(2023, 9, 15),
    description: 'Pro Plan Subscription',
    amount: 29.99,
    status: 'paid',
  },
  {
    id: 'inv-3',
    date: new Date(2023, 8, 15),
    description: 'Pro Plan Subscription',
    amount: 29.99,
    status: 'paid',
  },
]

// Payment method dialog
const showPaymentDialog = ref(false)
const editingPaymentIndex = ref<number | null>(null)
const currentPayment = ref({
  id: '',
  type: 'Visa',
  cardNumber: '',
  expMonth: '',
  expYear: '',
  expDate: '',
  cvc: '',
  cardholderName: '',
})

// Upgrade plan function
const upgradePlan = () => {
  showSuccess('Plan upgrade process initiated')
  console.log('Upgrading plan')
}

// Contact sales function
const contactSales = () => {
  showSuccess('Sales team will contact you soon')
  console.log('Contacting sales')
}

// Add payment method
const addPaymentMethod = () => {
  editingPaymentIndex.value = null
  currentPayment.value = {
    id: `pm-${Date.now()}`,
    type: 'Visa',
    cardNumber: '',
    expMonth: '',
    expYear: '',
    expDate: '',
    cvc: '',
    cardholderName: '',
  }
  showPaymentDialog.value = true
}

// Edit payment method
const editPaymentMethod = (index: number) => {
  editingPaymentIndex.value = index
  const method = paymentMethods.value[index]
  if (!method) return
  currentPayment.value = {
    id: method.id,
    type: method.type,
    cardNumber: `**** **** **** ${method.last4}`,
    expMonth: method.expMonth,
    expYear: method.expYear,
    expDate: `${method.expMonth}/${method.expYear}`,
    cvc: '',
    cardholderName: method.cardholderName,
  }
  showPaymentDialog.value = true
}

// Remove payment method
const removePaymentMethod = (index: number) => {
  paymentMethods.value.splice(index, 1)
  showSuccess('Payment method removed')
}

// Save payment method
const savePaymentMethod = () => {
  if (
    !currentPayment.value.cardNumber ||
    !currentPayment.value.expDate ||
    !currentPayment.value.cvc
  ) {
    showError('Please fill in all required fields')
    return
  }

  if (editingPaymentIndex.value) {
    // Update existing payment method
    const last4 = currentPayment.value.cardNumber.slice(-4)
    const [expMonth, expYear] = currentPayment.value.expDate.split('/')
    paymentMethods.value[editingPaymentIndex.value] = {
      ...paymentMethods.value[editingPaymentIndex.value],
      id: paymentMethods.value[editingPaymentIndex.value]?.id || '',
      type: paymentMethods.value[editingPaymentIndex.value]?.type || '',
      last4: last4,
      expDate: currentPayment.value.expDate,
      expMonth: expMonth || '',
      expYear: expYear || '',
      cardholderName: currentPayment.value.cardholderName,
    }
    showSuccess('Payment method updated')
  } else {
    // Add new payment method
    const last4 = currentPayment.value.cardNumber.slice(-4)
    const [expMonth, expYear] = currentPayment.value.expDate.split('/')
    paymentMethods.value.push({
      id: currentPayment.value.id || `pm-${Date.now()}`, // Generate ID if not provided
      type: currentPayment.value.type,
      last4: last4,
      expDate: currentPayment.value.expDate,
      expMonth: expMonth || '',
      expYear: expYear || '',
      cardholderName: currentPayment.value.cardholderName,
    })
    showSuccess('Payment method added')
  }

  closePaymentDialog()
}

// Close payment dialog
const closePaymentDialog = () => {
  showPaymentDialog.value = false
  editingPaymentIndex.value = null
}

// View invoice
const viewInvoice = (id: string) => {
  showSuccess(`Viewing invoice ${id}`)
  console.log(`Viewing invoice: ${id}`)
}

// Format date
const formatDate = (date: Date) => {
  return new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  }).format(date)
}

// Format currency
const formatCurrency = (amount: number) => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(amount)
}

// Get status variant for badge
const getStatusVariant = (status: string) => {
  switch (status) {
    case 'paid':
      return 'default'
    case 'pending':
      return 'secondary'
    case 'failed':
      return 'destructive'
    default:
      return 'outline'
  }
}
</script>

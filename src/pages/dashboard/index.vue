<template>
  <div class="space-y-6">
    <div>
      <h1 class="text-3xl font-heading font-bold">Dashboard</h1>
      <p class="text-muted-foreground">
        Welcome back! Here's what's happening with your store today.
      </p>
    </div>

    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      <Card v-for="(stat, index) in stats" :key="index">
        <CardContent class="px-6 py-3">
          <div class="flex items-center justify-between">
            <div>
              <p class="text-sm font-medium text-muted-foreground">{{ stat.title }}</p>
              <p class="text-2xl font-bold">{{ stat.value }}</p>
            </div>
            <div class="p-3 rounded-full bg-foreground">
              <component :is="stat.icon" class="h-6 w-6" :class="stat.color" />
            </div>
          </div>
          <div class="flex items-center mt-4">
            <Badge class="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300">
              <ILucideArrowUp class="h-3 w-3 mr-1" />
              {{ stat.change }}
            </Badge>
            <p class="text-sm text-muted-foreground ml-2">from last month</p>
          </div>
        </CardContent>
      </Card>
    </div>

    <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <Card class="lg:col-span-2">
        <CardHeader>
          <CardTitle class="font-heading">Recent Orders</CardTitle>
          <CardDescription>You made 265 sales this month.</CardDescription>
        </CardHeader>
        <CardContent>
          <div class="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Order</TableHead>
                  <TableHead>Customer</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead>Amount</TableHead>
                  <TableHead>Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                <TableRow v-for="order in recentOrders" :key="order.id">
                  <TableCell class="font-medium">{{ order.id }}</TableCell>
                  <TableCell>{{ order.customer }}</TableCell>
                  <TableCell>{{ order.date }}</TableCell>
                  <TableCell>{{ order.amount }}</TableCell>
                  <TableCell>
                    <Badge
                      :class="{
                        'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300':
                          order.status === 'Delivered',
                        'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300':
                          order.status === 'Processing',
                        'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300':
                          order.status === 'Pending',
                        'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300':
                          order.status === 'Shipped',
                      }"
                    >
                      {{ order.status }}
                    </Badge>
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle class="font-heading">Top Products</CardTitle>
          <CardDescription>Your best selling products</CardDescription>
        </CardHeader>
        <CardContent>
          <div class="space-y-4">
            <div v-for="(product, index) in topProducts" :key="index" class="flex items-center">
              <div class="w-10 h-10 rounded-md bg-muted shrink-0 mr-4"></div>
              <div class="flex-1 min-w-0">
                <p class="font-medium truncate">{{ product.name }}</p>
                <p class="text-sm text-muted-foreground">{{ product.sales }} sales</p>
              </div>
              <div class="text-right">
                <p class="font-medium">{{ product.revenue }}</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>

    <Tabs defaultValue="overview" class="space-y-6">
      <TabsList>
        <TabsTrigger value="overview">Overview</TabsTrigger>
        <TabsTrigger value="analytics">Analytics</TabsTrigger>
        <TabsTrigger value="reports">Reports</TabsTrigger>
      </TabsList>

      <TabsContent value="overview" class="space-y-6">
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle class="font-heading">Monthly Revenue</CardTitle>
            </CardHeader>
            <CardContent class="items-center">
              <div class="flex items-center justify-center h-[300px] bg-muted/20 rounded-md">
                <p class="text-muted-foreground">Revenue chart would be displayed here</p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle class="font-heading">Customer Growth</CardTitle>
            </CardHeader>
            <CardContent class="items-center">
              <div class="flex items-center justify-center h-[300px] bg-muted/20 rounded-md">
                <p class="text-muted-foreground">Customer growth chart would be displayed here</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </TabsContent>

      <TabsContent value="analytics">
        <Card>
          <CardHeader>
            <CardTitle class="font-heading">Analytics</CardTitle>
            <CardDescription>Advanced analytics for your store</CardDescription>
          </CardHeader>
          <CardContent>
            <div class="flex items-center justify-center h-[300px] bg-muted/20 rounded-md">
              <p class="text-muted-foreground">Analytics would be displayed here</p>
            </div>
          </CardContent>
        </Card>
      </TabsContent>

      <TabsContent value="reports">
        <Card>
          <CardHeader>
            <CardTitle class="font-heading">Reports</CardTitle>
            <CardDescription>Generate and view reports</CardDescription>
          </CardHeader>
          <CardContent>
            <div class="flex items-center justify-center h-[300px] bg-muted/20 rounded-md">
              <p class="text-muted-foreground">Reports would be displayed here</p>
            </div>
          </CardContent>
        </Card>
      </TabsContent>
    </Tabs>
  </div>
</template>
<script setup lang="ts">
import { DollarSign, Package, ShoppingCart, Users2 } from 'lucide-vue-next'

const stats = [
  {
    title: 'Total Revenue',
    value: '$45,231.89',
    change: '+20.1%',
    icon: DollarSign,
    color: 'text-green-600',
  },
  {
    title: 'Subscriptions',
    value: '+2350',
    change: '+180.1%',
    icon: Package,
    color: 'text-blue-600',
  },
  {
    title: 'Sales',
    value: '+12,234',
    change: '+19%',
    icon: ShoppingCart,
    color: 'text-purple-600',
  },
  { title: 'Active Now', value: '+573', change: '+201', icon: Users2, color: 'text-orange-600' },
]

const recentOrders = [
  {
    id: '#ORD-001',
    customer: 'Ahmed Benali',
    date: '2023-11-28',
    amount: '$249.99',
    status: 'Delivered',
  },
  {
    id: '#ORD-002',
    customer: 'Leila Kadi',
    date: '2023-11-27',
    amount: '$399.99',
    status: 'Processing',
  },
  {
    id: '#ORD-003',
    customer: 'Karim Hadj',
    date: '2023-11-26',
    amount: '$199.99',
    status: 'Pending',
  },
  {
    id: '#ORD-004',
    customer: 'Yasmine Amrani',
    date: '2023-11-25',
    amount: '$599.99',
    status: 'Delivered',
  },
  {
    id: '#ORD-005',
    customer: 'Mohammed Ali',
    date: '2023-11-24',
    amount: '$1,299.99',
    status: 'Shipped',
  },
]

const topProducts = [
  { name: 'Walnut Dining Table', sales: 124, revenue: '$15,588' },
  { name: 'Oak Bookshelf', sales: 98, revenue: '$6,392' },
  { name: 'Cherry Wood Bed Frame', sales: 85, revenue: '$7,495' },
  { name: 'Mahogany Coffee Table', sales: 72, revenue: '$2,596' },
  { name: 'Walnut TV Stand', sales: 64, revenue: '$2,250' },
]

definePage({
  meta: {
    title: 'Dashboard - Jawbli Admin',
    description: 'Monitor your store performance, track orders, and manage your business.',
  },
})
</script>

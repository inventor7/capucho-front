<template>
  <div class="space-y-6">
    <div>
      <h1 class="text-3xl font-heading font-bold">Feedback</h1>
      <p class="text-muted-foreground">Share your thoughts and help us improve</p>
    </div>

    <div class="grid grid-cols-2 gap-6">
      <Card>
        <CardHeader>
          <CardTitle class="font-heading">Send Feedback</CardTitle>
          <CardDescription>Share your thoughts about our platform</CardDescription>
        </CardHeader>
        <CardContent>
          <form @submit.prevent="submitFeedback">
            <div class="space-y-4">
              <Label for="feedbackType">Feedback Type</Label>
              <Select v-model="feedback.type">
                <SelectTrigger>
                  <SelectValue placeholder="Select feedback type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="suggestion">Suggestion</SelectItem>
                  <SelectItem value="bug">Bug Report</SelectItem>
                  <SelectItem value="compliment">Compliment</SelectItem>
                  <SelectItem value="complaint">Complaint</SelectItem>
                </SelectContent>
              </Select>

              <div>
                <Label for="rating">Rating</Label>
                <div class="flex gap-1">
                  <button
                    v-for="star in 5"
                    :key="star"
                    type="button"
                    class="text-2xl focus:outline-none"
                    @click="feedback.rating = star"
                  >
                    <span
                      :class="[
                        star <= feedback.rating ? 'text-yellow-400' : 'text-muted-foreground',
                        'hover:text-yellow-400',
                      ]"
                    >
                      ★
                    </span>
                  </button>
                </div>
                <p class="text-sm text-muted-foreground mt-1">
                  {{ getRatingText(feedback.rating) }}
                </p>
              </div>

              <Label for="subject">Subject</Label>
              <Input
                id="subject"
                v-model="feedback.subject"
                placeholder="Briefly describe your feedback"
              />

              <Label for="message">Message</Label>
              <Textarea
                id="message"
                v-model="feedback.message"
                placeholder="Please provide detailed feedback..."
                rows="5"
              />

              <Label for="email">Contact Email (Optional)</Label>
              <Input
                id="email"
                v-model="feedback.email"
                type="email"
                placeholder="Enter your email if you'd like a response"
              />
            </div>

            <div class="mt-6 flex justify-end">
              <Button type="submit">Send Feedback</Button>
            </div>
          </form>
        </CardContent>
      </Card>
      <!-- Recent Feedback -->
      <Card class="">
        <CardHeader>
          <CardTitle class="font-heading">Recent Feedback</CardTitle>
          <CardDescription>Your recent feedback submissions</CardDescription>
        </CardHeader>
        <CardContent>
          <div v-if="recentFeedback.length === 0" class="text-center py-8 text-muted-foreground">
            <ILucideMessageCircle class="h-12 w-12 mx-auto mb-3" />
            <p>You haven't submitted any feedback yet.</p>
          </div>

          <div v-else class="space-y-4">
            <div v-for="item in recentFeedback" :key="item.id" class="p-4 border rounded-lg">
              <div class="flex justify-between items-start">
                <div class="flex-1">
                  <div class="flex items-center gap-2">
                    <h4 class="font-medium">{{ item.subject }}</h4>
                    <Badge variant="outline">{{ item.type }}</Badge>
                  </div>
                  <p class="text-sm text-muted-foreground mt-1">{{ item.message }}</p>
                  <div class="flex items-center gap-4 mt-2 text-sm">
                    <span>{{ formatDate(item.date) }}</span>
                    <div class="flex">
                      <span
                        v-for="star in 5"
                        :key="star"
                        :class="[star <= item.rating ? 'text-yellow-400' : 'text-muted-foreground']"
                      >
                        ★
                      </span>
                    </div>
                  </div>
                </div>
                <Button variant="outline" size="sm" @click="viewFeedback(item.id)"> View </Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
      <!-- Feature Requests -->
      <Card class="col-span-2">
        <CardHeader>
          <CardTitle class="font-heading">Feature Requests</CardTitle>
          <CardDescription>Vote on features you'd like to see</CardDescription>
        </CardHeader>
        <CardContent>
          <div class="space-y-4">
            <div
              v-for="(request, index) in featureRequests"
              :key="request.id"
              class="p-4 border rounded-lg flex justify-between items-start"
            >
              <div class="flex-1">
                <div class="flex items-center gap-2">
                  <h4 class="font-medium">{{ request.title }}</h4>
                  <Badge :variant="getFeatureStatusVariant(request.status)">
                    {{ request.status }}
                  </Badge>
                </div>
                <p class="text-sm text-muted-foreground mt-1">{{ request.description }}</p>
                <div class="flex items-center gap-4 mt-2 text-sm">
                  <div class="flex items-center gap-1">
                    <ILucideThumbsUp class="h-4 w-4" />
                    <span>{{ request.votes }}</span>
                  </div>
                  <span>Requested by {{ request.requester }}</span>
                </div>
              </div>
              <Button variant="outline" size="sm" @click="toggleVote(index)">
                {{ request.userVoted ? 'Unvote' : 'Vote' }}
              </Button>
            </div>
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
import { useToast } from '@/composables/useToast'

const { showSuccess, showError } = useToast()

// Feedback form data
const feedback = ref({
  type: 'suggestion',
  rating: 5,
  subject: '',
  message: '',
  email: '',
})

// Feature requests
const featureRequests = ref([
  {
    id: 'fr-1',
    title: 'Mobile App',
    description: 'Develop a mobile app for iOS and Android to manage orders on the go',
    status: 'planned',
    votes: 124,
    requester: 'Ahmed Benali',
    userVoted: false,
  },
  {
    id: 'fr-2',
    title: 'Advanced Analytics',
    description: 'Add more detailed analytics and reporting features',
    status: 'in-progress',
    votes: 89,
    requester: 'Leila Mansouri',
    userVoted: true,
  },
  {
    id: 'fr-3',
    title: 'Multi-language Support',
    description: 'Add support for Arabic and French languages',
    status: 'planned',
    votes: 67,
    requester: 'Karim Hadj',
    userVoted: false,
  },
  {
    id: 'fr-4',
    title: 'Inventory Management',
    description: 'Better inventory tracking and management tools',
    status: 'considering',
    votes: 45,
    requester: 'Amina Khelif',
    userVoted: false,
  },
])

// Recent feedback
const recentFeedback = [
  {
    id: 'f-1',
    type: 'suggestion',
    subject: 'Better search functionality',
    message: 'It would be great to have advanced search filters for products',
    rating: 4,
    date: new Date(2023, 10, 15),
  },
  {
    id: 'f-2',
    type: 'bug',
    subject: 'Order status not updating',
    message: "Sometimes the order status doesn't update in real-time",
    rating: 3,
    date: new Date(2023, 10, 10),
  },
]

// Submit feedback
const submitFeedback = () => {
  if (!feedback.value.subject.trim() || !feedback.value.message.trim()) {
    showError('Please provide both a subject and message')
    return
  }

  showSuccess('Thank you for your feedback!')
  console.log('Feedback submitted:', feedback.value)

  // Reset form
  feedback.value = {
    type: 'suggestion',
    rating: 5,
    subject: '',
    message: '',
    email: '',
  }
}

// Toggle vote on feature request
const toggleVote = (index: number) => {
  const request = featureRequests.value[index]

  if (!request?.votes) return
  if (request.userVoted) {
    request.votes--
    request.userVoted = false
  } else {
    request.votes++
    request.userVoted = true
  }
}

// Get rating text
const getRatingText = (rating: number) => {
  const texts = ['', 'Terrible', 'Poor', 'Average', 'Good', 'Excellent']
  return texts[rating] || ''
}

// Get feature status variant
const getFeatureStatusVariant = (status: string) => {
  switch (status) {
    case 'planned':
      return 'default'
    case 'in-progress':
      return 'secondary'
    case 'completed':
      return 'destructive'
    case 'considering':
      return 'outline'
    default:
      return 'outline'
  }
}

// Format date
const formatDate = (date: Date) => {
  return new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  }).format(date)
}

// View feedback
const viewFeedback = (id: string) => {
  showSuccess(`Viewing feedback: ${id}`)
  console.log(`Viewing feedback: ${id}`)
}
</script>

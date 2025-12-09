<template>
  <Card class="mt-6">
    <CardHeader>
      <CardTitle class="font-heading">Helpful Resources</CardTitle>
      <CardDescription>Documentation and guides to help you get started</CardDescription>
    </CardHeader>
    <CardContent>
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <div
          class="p-4 border rounded-lg hover:bg-muted/50 transition-colors cursor-pointer"
          @click="openResource('getting-started')"
        >
          <div class="flex items-center gap-3 mb-2">
            <div class="p-2 rounded-lg bg-primary/10">
              <ILucideBookOpen class="h-5 w-5 text-primary" />
            </div>
            <h3 class="font-medium">Getting Started</h3>
          </div>
          <p class="text-sm text-muted-foreground">
            Learn how to set up your store and start selling
          </p>
        </div>

        <div
          class="p-4 border rounded-lg hover:bg-muted/50 transition-colors cursor-pointer"
          @click="openResource('chatbot-setup')"
        >
          <div class="flex items-center gap-3 mb-2">
            <div class="p-2 rounded-lg bg-primary/10">
              <ILucideBot class="h-5 w-5 text-primary" />
            </div>
            <h3 class="font-medium">Chatbot Setup</h3>
          </div>
          <p class="text-sm text-muted-foreground">
            Configure your AI chatbot to handle customer inquiries
          </p>
        </div>

        <div
          class="p-4 border rounded-lg hover:bg-muted/50 transition-colors cursor-pointer"
          @click="openResource('integration')"
        >
          <div class="flex items-center gap-3 mb-2">
            <div class="p-2 rounded-lg bg-primary/10">
              <ILucideLink class="h-5 w-5 text-primary" />
            </div>
            <h3 class="font-medium">Integration Guide</h3>
          </div>
          <p class="text-sm text-muted-foreground">
            Connect your store with other platforms and services
          </p>
        </div>

        <div
          class="p-4 border rounded-lg hover:bg-muted/50 transition-colors cursor-pointer"
          @click="openResource('troubleshooting')"
        >
          <div class="flex items-center gap-3 mb-2">
            <div class="p-2 rounded-lg bg-primary/10">
              <ILucideWrench class="h-5 w-5 text-primary" />
            </div>
            <h3 class="font-medium">Troubleshooting</h3>
          </div>
          <p class="text-sm text-muted-foreground">Solutions to common technical issues</p>
        </div>

        <div
          class="p-4 border rounded-lg hover:bg-muted/50 transition-colors cursor-pointer"
          @click="openResource('api-docs')"
        >
          <div class="flex items-center gap-3 mb-2">
            <div class="p-2 rounded-lg bg-primary/10">
              <ILucideCode class="h-5 w-5 text-primary" />
            </div>
            <h3 class="font-medium">API Documentation</h3>
          </div>
          <p class="text-sm text-muted-foreground">
            For developers looking to integrate with our API
          </p>
        </div>

        <div
          class="p-4 border rounded-lg hover:bg-muted/50 transition-colors cursor-pointer"
          @click="openResource('best-practices')"
        >
          <div class="flex items-center gap-3 mb-2">
            <div class="p-2 rounded-lg bg-primary/10">
              <ILucideLightbulb class="h-5 w-5 text-primary" />
            </div>
            <h3 class="font-medium">Best Practices</h3>
          </div>
          <p class="text-sm text-muted-foreground">Tips to optimize your store performance</p>
        </div>
      </div>
    </CardContent>
  </Card>
</template>

<script setup lang="ts">
const { showSuccess } = useToast()

const openResource = (resource: string) => {
  showSuccess(`Opening ${resource.replace('-', ' ')} guide`)
  console.log(`Opening resource: ${resource}`)
}
</script>

<style scoped></style>

<template>
  <div class="space-y-6">
    <UpdatesBundlesHeader />

    <UpdatesBundlesTable
      :items="filteredItems"
      :is-loading="isFetching"
      @delete-item="handleDelete"
      @update-item="handleUpdate"
      @refresh="refetch"
    />
  </div>
</template>

<script setup lang="ts">
definePage({
  meta: {
    title: 'Updates & Bundles - CapGO Updater',
    description: 'Manage app updates and bundles',
    category: 'updates-bundles',
    hideFromSearch: false,
  },
})

// State
const searchTerm = ref('')
const filterType = ref('all')
const filterChannel = ref('all')
const filterPlatform = ref('all')

// Get data using composables
const { data: items, refetch, isFetching } = useUpdatesBundlesQuery()
const { data: channels } = useChannelsQuery()

const compareSemver = (v1: string, v2: string): number => {
  const parts1 = v1.split('.').map((p) => parseInt(p) || 0)
  const parts2 = v2.split('.').map((p) => parseInt(p) || 0)
  const maxLen = Math.max(parts1.length, parts2.length)
  for (let i = 0; i < maxLen; i++) {
    const p1 = parts1[i] ?? 0
    const p2 = parts2[i] ?? 0
    if (p1 > p2) return 1
    if (p1 < p2) return -1
  }
  return 0
}

const processedItems = computed(() => {
  if (!items.value) return []

  const result = [...items.value].map((item) => ({
    ...item,
    is_active_for: [] as string[],
  }))

  const allChannels = channels.value || []

  allChannels.forEach((channel) => {
    const channelItems = result.filter((i) => i.channel === channel.name && i.active)

    if (!channelItems.length) return

    const latest = channelItems.reduce((best, current) => {
      if (!best) return current
      return compareSemver(current.version_name, best.version_name) > 0 ? current : best
    }, channelItems[0]!)

    if (latest && !latest.is_active_for.includes(channel.name)) {
      latest.is_active_for.push(channel.name)
    }
  })

  return result.sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime())
})

// Filter items based on search and filters
const filteredItems = computed(() => {
  return processedItems.value.filter((item) => {
    const matchesSearch =
      item.version_name.toLowerCase().includes(searchTerm.value.toLowerCase()) ||
      item.channel.toLowerCase().includes(searchTerm.value.toLowerCase()) ||
      (item.release_notes?.toLowerCase().includes(searchTerm.value.toLowerCase()) ?? false)

    const matchesType = filterType.value === 'all' || item.type === filterType.value
    const matchesChannel = filterChannel.value === 'all' || item.channel === filterChannel.value
    const matchesPlatform = filterPlatform.value === 'all' || item.platform === filterPlatform.value
    return matchesSearch && matchesType && matchesChannel && matchesPlatform
  })
})

const handleDelete = async (id: string, type: 'bundle' | 'native') => {
  // In a real implementation, you would call the appropriate delete mutation
  // For now, we'll just trigger a refetch
  console.log('iddd', id, type)
  await refetch()
}

const handleUpdate = async (item: UpdateOrBundle) => {
  console.log('Update item:', item)
  await refetch()
}
</script>

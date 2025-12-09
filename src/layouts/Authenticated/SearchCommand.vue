<template>
  <CommandDialog v-model:open="isOpen" @update:open="handleOpenChange">
    <CommandInput
      :placeholder="
        placeholder || t('404.search_placeholder')
      "
      @keypress.enter="handleSearchSubmit"
      @keydown.escape="handleEscape"
      ref="searchInputRef"
    />
    <CommandList :class="props.maxHeightClass">
      <CommandEmpty>
        {{ t('404.no_results', 'No results found. Try a different search term.') }}
      </CommandEmpty>
      <CommandGroup :heading="t('404.main_sections', 'Main Sections')">
        <CommandItem
          v-for="item in filteredItems"
          :key="item.url"
          :value="item.title + ' ' + item.description"
          @select="() => handleItemSelect(item)"
        >
          <div class="flex flex-col items-start">
            <span class="font-medium">{{ item.title }}</span>
            <span class="text-xs text-muted-foreground">{{ item.description }}</span>
          </div>
          <CommandShortcut v-if="item.shortcut">
            {{ item.shortcut }}
          </CommandShortcut>
        </CommandItem>
      </CommandGroup>
    </CommandList>
  </CommandDialog>
</template>

<script setup lang="ts">
import CommandDialog from '@/components/ui/command/CommandDialog.vue'
import CommandEmpty from '@/components/ui/command/CommandEmpty.vue'
import CommandGroup from '@/components/ui/command/CommandGroup.vue'
import CommandInput from '@/components/ui/command/CommandInput.vue'
import CommandItem from '@/components/ui/command/CommandItem.vue'
import CommandList from '@/components/ui/command/CommandList.vue'
import CommandShortcut from '@/components/ui/command/CommandShortcut.vue'
import { useToast } from '@/composables/useToast'
import { computed, nextTick, onMounted, onUnmounted, ref, watch } from 'vue'
import { useI18n } from 'vue-i18n'
import { useRouter } from 'vue-router'

interface Props {
  placeholder?: string
  maxHeightClass?: string
}

const router = useRouter()
const { t } = useI18n()
const { showToast } = useToast()

// Use props with proper typing
const props = withDefaults(defineProps<Props>(), {
  placeholder: undefined,
  maxHeightClass: 'max-h-64',
})

// State for dialog open/close
const isOpen = ref(false)

// Reference to the search input
const searchInputRef = ref()

// Function to extract searchable items from route metadata
const extractSearchableItems = () => {
  const routes = router.getRoutes()
  const searchableItems = []
  const uniqueItemsMap = new Map() // To track unique items and avoid duplicates

  // Define routes to exclude from search
  const excludedRoutes = ['Path', 'index', 'auth', 'auth.login', 'auth.register'] // 404 page and auth pages

  for (const route of routes) {
    // Skip excluded routes
    if (excludedRoutes.some((excluded) => route.name?.toString().includes(excluded))) {
      continue
    }

    // Skip routes with specific meta properties that indicate they shouldn't be searchable
    if (route.meta?.noSearch || route.meta?.hideFromSearch) {
      continue
    }

    // Skip dynamic routes with parameters (like [id], [...path])
    if (route.path.includes(':') || (route.path.includes('[') && route.path.includes(']'))) {
      continue
    }

    // Skip auth-related routes that might be private
    if (route.path.startsWith('/auth') || route.path === '/') {
      continue
    }

    // Extract title and description from route meta or use path-based fallbacks
    let title = route.meta?.title || (route.name ? String(route.name) : route.path)
    let description =
      route.meta?.description ||
      route.meta?.subtitle ||
      t(`routes.${route.name ? String(route.name) : ''}.description`, '')

    // If no title found in meta, try to create one from the path
    if (!title || title === route.path) {
      // Convert path to a more readable format
      title = route.path
        .replace(/^\//, '') // Remove leading slash
        .replace(/-/g, ' ') // Replace hyphens with spaces
        .replace(/\//g, ' > ') // Replace slashes with arrows for nested routes
        .split(' > ')
        .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
        .join(' > ')

      // If

      if (!route.meta?.title) {
        const i18nTitle = t(`routes.${route.name ? String(route.name) : ''}`, '')
        if (i18nTitle && !i18nTitle.includes('routes.')) {
          title = i18nTitle
        } else {
          // Try common sections
          const commonTitle = t(`${route.path.replace(/^\//, '').replace(/\//g, '.')}.title`, '')
          if (commonTitle && !commonTitle.includes('.')) {
            title = commonTitle
          }
        }
      }
    }

    // If no description found, try to get from i18n
    if (!description || typeof description !== 'string') {
      description = t(`routes.${route.name ? String(route.name) : ''}.description`, '')
      if (typeof description === 'string' && description.includes('routes.')) {
        description = t(`${route.path.replace(/^\//, '').replace(/\//g, '.')}.description`, '')
        if (typeof description === 'string' && description.includes('routes.')) {
          description = t(`${route.path.replace(/^\//, '').replace(/\//g, '.')}s.description`, '') // for plural forms
          if (typeof description === 'string' && description.includes('routes.')) {
            description = t('routes.default_description', 'Navigate to this page')
          }
        }
      }
    }

    // Ensure description is a string
    if (typeof description !== 'string') {
      description = t('routes.default_description', 'Navigate to this page')
    }

    // Create a unique identifier for the route to avoid duplicates
    const uniqueId = route.path // Use the path as a unique identifier
    if (uniqueItemsMap.has(uniqueId)) {
      continue // Skip if already added
    }

    // Create a shortcut based on the first letter of the title
    const shortcut = typeof title === 'string' ? title.charAt(0).toUpperCase() : ''

    const item = {
      title,
      description,
      url: route.path,
      shortcut,
      category: route.meta?.category || route.path.split('/')[1] || 'general',
      routeName: route.name?.toString(),
    }

    // Add to the map to track uniqueness
    uniqueItemsMap.set(uniqueId, item)
    searchableItems.push(item)
  }

  return searchableItems
}

// Define all searchable items dynamically from route metadata
const allSearchableItems = computed(() => {
  return extractSearchableItems()
})

// Search functionality
const searchQuery = ref('')

const filteredItems = computed(() => {
  if (!searchQuery.value || !searchQuery.value.trim()) {
    return allSearchableItems.value
  }

  const query = typeof searchQuery.value === 'string' ? searchQuery.value.toLowerCase() : ''
  return allSearchableItems.value.filter((item) => {
    const itemTitle = typeof item.title === 'string' ? item.title.toLowerCase() : ''
    const itemDescription =
      typeof item.description === 'string' ? item.description.toLowerCase() : ''
    const itemUrl = item.url && typeof item.url === 'string' ? item.url.toLowerCase() : ''

    return (
      itemTitle.includes(query) ||
      itemDescription.includes(query) ||
      (itemUrl && itemUrl.includes(query))
    )
  })
})

// Watch for changes in search query to maintain focus
watch(searchQuery, async () => {
  await nextTick()
  // Keep focus on input after search results update
  if (isOpen.value && searchInputRef.value?.$el) {
    searchInputRef.value.$el.focus()
  }
})

// Handle opening the command palette
const openCommandPalette = () => {
  isOpen.value = true
  // Focus search input after component is mounted
  nextTick(() => {
    if (searchInputRef.value?.$el) {
      searchInputRef.value.$el.focus()
    }
  })
}

// Handle closing the command palette
const closeCommandPalette = () => {
  isOpen.value = false
  searchQuery.value = ''
}

// Handle open state changes
const handleOpenChange = (open: boolean) => {
  isOpen.value = open
  if (!open) {
    searchQuery.value = ''
  }
}

// Handle Escape key press
const handleEscape = () => {
  closeCommandPalette()
}

// Listen for '/' key press to open command palette globally
onMounted(() => {
  const handleKeyPress = (e: KeyboardEvent) => {
    // Only open if not already focused on an input element and not in an input field
    if (e.key === '/' && !['INPUT', 'TEXTAREA'].includes((e.target as HTMLElement).tagName)) {
      e.preventDefault()
      openCommandPalette()
    }
    // Also handle Ctrl+K or Cmd+K to open the command palette
    if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
      e.preventDefault()
      openCommandPalette()
    }
  }

  window.addEventListener('keydown', handleKeyPress)

  // Cleanup event listener
  onUnmounted(() => {
    window.removeEventListener('keydown', handleKeyPress)
  })
})

// Handle item selection
const handleItemSelect = (item: any) => {
  try {
    if (item.action === 'add' && item.url) {
      // For actions like "Add Product", we might need to handle specially
      // For now, navigate to the main page
      router.push(item.url)
    } else if (item.url) {
      router.push(item.url)
    }
  } catch (error) {
    showToast(t('404.navigation_error', 'Error navigating to page'), 'error')
    console.error('Navigation error:', error)
  } finally {
    // Close the command palette after selection
    closeCommandPalette()
  }
}

// Handle search submit with Enter key
const handleSearchSubmit = () => {
  if (filteredItems.value.length > 0) {
    handleItemSelect(filteredItems.value[0])
  }
}

// Expose methods for external use
defineExpose({
  openCommandPalette,
  closeCommandPalette,
  isOpen,
  searchInputRef,
  searchQuery,
  filteredItems,
  allSearchableItems,
})
</script>

<template>
  <Dialog v-model:open="isOpen">
    <DialogContent class="sm:max-w-lg">
      <DialogHeader>
        <DialogTitle>Import Environment Variables</DialogTitle>
        <DialogDescription>
          Paste your .env file content or upload a file to import multiple variables at once.
        </DialogDescription>
      </DialogHeader>

      <div class="space-y-4">
        <!-- Tabs for paste vs upload -->
        <Tabs :defaultValue="'paste'" class="w-full">
          <TabsList class="grid w-full grid-cols-2">
            <TabsTrigger value="paste">Paste Content</TabsTrigger>
            <TabsTrigger value="upload">Upload File</TabsTrigger>
          </TabsList>

          <TabsContent value="paste" class="space-y-3">
            <Textarea
              v-model="pasteContent"
              placeholder="API_URL=https://api.example.com
FEATURE_FLAG=true
SECRET_KEY=abc123"
              class="h-48 font-mono text-sm"
            />
          </TabsContent>

          <TabsContent value="upload" class="space-y-3">
            <div
              class="flex flex-col items-center justify-center h-32 border-2 border-dashed rounded-lg cursor-pointer hover:border-primary/50 transition-colors"
              @click="triggerFileInput"
              @drop.prevent="handleDrop"
              @dragover.prevent
            >
              <ILucideUpload class="size-8 text-muted-foreground mb-2" />
              <p class="text-sm text-muted-foreground">Click or drop .env file here</p>
              <input
                ref="fileInputRef"
                type="file"
                accept=".env,.txt"
                class="hidden"
                @change="handleFileSelect"
              />
            </div>
          </TabsContent>
        </Tabs>

        <div v-if="parsedVars.length > 0" class="space-y-3">
          <div class="flex items-center justify-between">
            <Label class="text-sm font-medium">Preview ({{ parsedVars.length }} variables)</Label>
            <div class="flex gap-2">
              <Button variant="ghost" size="sm" @click="selectAll">Select All</Button>
              <Button variant="ghost" size="sm" @click="deselectAll">Deselect All</Button>
            </div>
          </div>

          <ScrollArea class="h-48 border rounded-md">
            <div class="p-2 space-y-1">
              <div
                v-for="(v, i) in parsedVars"
                :key="i"
                class="flex items-center gap-2 p-2 rounded hover:bg-muted/50"
              >
                <Checkbox :checked="v.selected" @update:checked="v.selected = $event" />
                <div class="flex-1 font-mono text-xs truncate">
                  <span class="text-primary font-medium">{{ v.key }}</span>
                  <span class="text-muted-foreground">=</span>
                  <span class="text-muted-foreground"
                    >{{ v.value.substring(0, 30) }}{{ v.value.length > 30 ? '...' : '' }}</span
                  >
                </div>
                <Checkbox v-model:checked="v.is_secret" class="opacity-60" title="Mark as secret" />
                <ILucideEyeOff class="size-3 text-muted-foreground" />
              </div>
            </div>
          </ScrollArea>
        </div>

        <div v-if="parseError" class="text-sm text-destructive">
          {{ parseError }}
        </div>
      </div>

      <DialogFooter>
        <Button variant="outline" @click="isOpen = false">Cancel</Button>
        <Button @click="handleImport" :disabled="isImporting || selectedVars.length === 0">
          <ILucideLoader v-if="isImporting" class="size-4 mr-2 animate-spin" />
          Import {{ selectedVars.length }} Variable{{ selectedVars.length !== 1 ? 's' : '' }}
        </Button>
      </DialogFooter>
    </DialogContent>
  </Dialog>
</template>

<script setup lang="ts">
import {
  useParseEnvContentMutation,
  useBulkCreateEnvVarsMutation,
} from '@/modules/settings/composables/useEnvVarsQuery'
import { toast } from 'vue-sonner'
import { useQueryClient } from '@tanstack/vue-query'

interface ParsedVar {
  key: string
  value: string
  selected: boolean
  is_secret: boolean
}

const props = defineProps<{
  environment: string
}>()

const emit = defineEmits<{
  imported: []
}>()

const isOpen = defineModel<boolean>('open', { default: false })

const pasteContent = ref('')
const parsedVars = ref<ParsedVar[]>([])
const parseError = ref('')
const isImporting = ref(false)
const fileInputRef = ref<HTMLInputElement | null>(null)

const queryClient = useQueryClient()
const { mutateAsync: parseContent } = useParseEnvContentMutation()
const { mutateAsync: bulkCreate } = useBulkCreateEnvVarsMutation()

const selectedVars = computed(() => parsedVars.value.filter((v) => v.selected))

watch(pasteContent, async (content) => {
  if (!content.trim()) {
    parsedVars.value = []
    return
  }
  try {
    const result = await parseContent(content)
    parseError.value = ''
    parsedVars.value = result.variables.map((v: { key: string; value: string }) => ({
      ...v,
      selected: true,
      is_secret:
        v.key.toLowerCase().includes('secret') ||
        v.key.toLowerCase().includes('key') ||
        v.key.toLowerCase().includes('password') ||
        v.key.toLowerCase().includes('token'),
    }))
  } catch {
    parseError.value = 'Failed to parse content'
  }
})

const triggerFileInput = () => {
  fileInputRef.value?.click()
}

const handleFileSelect = async (e: Event) => {
  const file = (e.target as HTMLInputElement).files?.[0]
  if (file) await readFile(file)
}

const handleDrop = async (e: DragEvent) => {
  const file = e.dataTransfer?.files?.[0]
  if (file) await readFile(file)
}

const readFile = async (file: File) => {
  const text = await file.text()
  pasteContent.value = text
}

const selectAll = () => {
  parsedVars.value.forEach((v) => (v.selected = true))
}

const deselectAll = () => {
  parsedVars.value.forEach((v) => (v.selected = false))
}

const handleImport = async () => {
  if (selectedVars.value.length === 0) return

  isImporting.value = true
  try {
    const result = await bulkCreate({
      variables: selectedVars.value.map((v) => ({
        key: v.key,
        value: v.value,
        is_secret: v.is_secret,
      })),
      environment: props.environment,
    })
    toast.success(`Imported ${result.created} variables`)
    await queryClient.invalidateQueries({ queryKey: ['env-vars'] })
    isOpen.value = false
    pasteContent.value = ''
    parsedVars.value = []
    emit('imported')
  } catch (error: any) {
    toast.error(error.message || 'Failed to import variables')
  } finally {
    isImporting.value = false
  }
}
</script>

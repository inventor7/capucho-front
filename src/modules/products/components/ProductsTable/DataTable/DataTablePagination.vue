<script setup lang="ts">
import type { Table } from '@tanstack/vue-table'

interface DataTablePaginationProps {
  table: Table<any>
}

defineProps<DataTablePaginationProps>()

const pageSizeOptions = tableConfig.defaults.pageSizeOptions
</script>

<template>
  <div class="flex flex-col sm:flex-row items-center justify-between gap-4 px-2">
    <!-- Selection info -->
    <div class="flex-1 text-sm text-muted-foreground">
      <template v-if="table.getFilteredSelectedRowModel().rows.length > 0">
        {{ table.getFilteredSelectedRowModel().rows.length }} of
        {{ table.getFilteredRowModel().rows.length }} row(s) selected
      </template>
      <template v-else> {{ table.getFilteredRowModel().rows.length }} total row(s) </template>
    </div>

    <div class="flex flex-col sm:flex-row items-center gap-6 lg:gap-8">
      <!-- Rows per page -->
      <div class="flex items-center space-x-2">
        <p class="text-sm font-medium whitespace-nowrap">Rows per page</p>
        <Select
          :model-value="`${table.getState().pagination.pageSize}`"
          @update:model-value="table.setPageSize(Number($event))"
        >
          <SelectTrigger class="h-8 w-[70px]">
            <SelectValue :placeholder="`${table.getState().pagination.pageSize}`" />
          </SelectTrigger>
          <SelectContent side="top">
            <SelectItem v-for="pageSize in pageSizeOptions" :key="pageSize" :value="`${pageSize}`">
              {{ pageSize }}
            </SelectItem>
          </SelectContent>
        </Select>
      </div>

      <!-- Page info -->
      <div class="flex items-center justify-center text-sm font-medium whitespace-nowrap">
        Page {{ table.getState().pagination.pageIndex + 1 }} of
        {{ table.getPageCount() }}
      </div>

      <!-- Navigation buttons -->
      <div class="flex items-center space-x-2">
        <!-- First page -->
        <Button
          variant="outline"
          size="icon"
          class="hidden h-8 w-8 lg:flex"
          :disabled="!table.getCanPreviousPage()"
          @click="table.setPageIndex(0)"
        >
          <span class="sr-only">Go to first page</span>
          <ILucideChevronsLeft class="h-4 w-4" />
        </Button>

        <!-- Previous page -->
        <Button
          variant="outline"
          size="icon"
          class="h-8 w-8"
          :disabled="!table.getCanPreviousPage()"
          @click="table.previousPage()"
        >
          <span class="sr-only">Go to previous page</span>
          <ILucideChevronLeft class="h-4 w-4" />
        </Button>

        <!-- Page numbers (show current and surrounding pages) -->
        <div class="hidden sm:flex items-center gap-1">
          <template
            v-for="pageIndex in [
              Math.max(0, table.getState().pagination.pageIndex - 1),
              table.getState().pagination.pageIndex,
              Math.min(table.getPageCount() - 1, table.getState().pagination.pageIndex + 1),
            ]"
            :key="pageIndex"
          >
            <Button
              v-if="pageIndex >= 0 && pageIndex < table.getPageCount()"
              variant="outline"
              size="icon"
              class="h-8 w-8"
              :class="{
                'bg-primary text-primary-foreground':
                  pageIndex === table.getState().pagination.pageIndex,
              }"
              @click="table.setPageIndex(pageIndex)"
            >
              {{ pageIndex + 1 }}
            </Button>
          </template>
        </div>

        <!-- Next page -->
        <Button
          variant="outline"
          size="icon"
          class="h-8 w-8"
          :disabled="!table.getCanNextPage()"
          @click="table.nextPage()"
        >
          <span class="sr-only">Go to next page</span>
          <ILucideChevronRight class="h-4 w-4" />
        </Button>

        <!-- Last page -->
        <Button
          variant="outline"
          size="icon"
          class="hidden h-8 w-8 lg:flex"
          :disabled="!table.getCanNextPage()"
          @click="table.setPageIndex(table.getPageCount() - 1)"
        >
          <span class="sr-only">Go to last page</span>
          <ILucideChevronsRight class="h-4 w-4" />
        </Button>
      </div>

      <!-- Go to page input -->
      <div class="hidden lg:flex items-center space-x-2">
        <span class="text-sm font-medium whitespace-nowrap">Go to:</span>
        <Input
          type="number"
          :min="1"
          :max="table.getPageCount()"
          :model-value="table.getState().pagination.pageIndex + 1"
          @update:model-value="
            (value) => {
              const page = value ? Number(value) - 1 : 0
              table.setPageIndex(page)
            }
          "
          class="h-8 w-16"
        />
      </div>
    </div>
  </div>
</template>

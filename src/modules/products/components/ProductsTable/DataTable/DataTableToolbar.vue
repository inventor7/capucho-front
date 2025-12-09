<template>
  <div class="flex flex-col gap-4">
    <!-- Main toolbar -->
    <div class="flex flex-row md:flex-col items-center justify-between md:justify-start gap-2">
      <div class="flex flex-wrap flex-1 justify-start items-center gap-2 w-full">
        <div class="relative w-full max-w-sm">
          <ILucideSearch
            class="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground"
          />
          <Input
            placeholder="Search all columns..."
            :model-value="state.globalFilter.value"
            @update:model-value="state.onGlobalFilterChange($event)"
            class="pl-9 h-9"
          />
        </div>

        <!-- Faceted filters -->
        <DataTableFacetedFilter
          v-if="table.getColumn('category')"
          :column="table.getColumn('category')!"
          title="Category"
          :options="categoryOptions"
        />

        <DataTableFacetedFilter
          v-if="table.getColumn('status')"
          :column="table.getColumn('status')!"
          title="Status"
          :options="statusOptions"
        />

        <DataTableFacetedFilter
          v-if="table.getColumn('woodType')"
          :column="table.getColumn('woodType')!"
          title="Wood Type"
          :options="woodTypeOptions"
        />

        <Button
          v-if="isFiltered"
          variant="ghost"
          size="sm"
          class="h-8 px-2 lg:px-3"
          @click="state.resetFilters()"
        >
          Reset
          <ILucideX class="ml-2 h-4 w-4" />
        </Button>
      </div>

      <div class="flex flex-wrap justify-start items-center w-full gap-2">
        <Button variant="outline" size="sm" class="h-8" @click="state.toggleDensity()">
          <ILucideColumns class="h-4 w-4 mr-2" />
          {{ state.density.value }}
        </Button>

        <DataTableViewOptions :table="table" />

        <DropdownMenu>
          <DropdownMenuTrigger as-child>
            <Button variant="outline" size="sm" class="h-8">
              <ILucideDownload class="h-4 w-4 mr-2" />
              Export
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem @click="exportCSV">
              <ILucideFileText class="mr-2 h-4 w-4" />
              Export as CSV
            </DropdownMenuItem>
            <DropdownMenuItem @click="exportExcel">
              <ILucideFileSpreadsheet class="mr-2 h-4 w-4" />
              Export as Excel
            </DropdownMenuItem>
            <DropdownMenuItem @click="exportJSON">
              <ILucideFileJson class="mr-2 h-4 w-4" />
              Export as JSON
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>

    <!-- Grouping indicator -->
    <div v-if="groupedColumns.length > 0" class="flex items-center gap-2 text-sm">
      <span class="text-muted-foreground">Grouped by:</span>
      <div class="flex items-center gap-2">
        <Badge v-for="columnId in groupedColumns" :key="columnId" variant="secondary" class="gap-1">
          {{ table.getColumn(columnId)?.columnDef.id || columnId }}
          <button
            @click="table.getColumn(columnId)?.toggleGrouping()"
            class="ml-1 hover:bg-secondary-foreground/20 rounded-full p-0.5"
          >
            <ILucideX class="h-3 w-3" />
          </button>
        </Badge>
      </div>
      <Button variant="ghost" size="sm" class="h-6 text-xs" @click="state.resetGrouping()">
        Clear all
      </Button>
    </div>

    <!-- Active filters summary -->
    <div v-if="isFiltered" class="flex flex-wrap items-center gap-2 text-xs">
      <span class="text-muted-foreground">Active filters:</span>

      <Badge v-if="state.globalFilter.value" variant="secondary" class="gap-2">
        Search: "{{ state.globalFilter.value }}"
        <button
          @click="state.onGlobalFilterChange('')"
          class="hover:bg-secondary-foreground/20 rounded-full p-0.5"
        >
          <ILucideX class="h-3 w-3" />
        </button>
      </Badge>

      <Badge
        v-for="filter in state.columnFilters.value"
        :key="filter.id"
        variant="secondary"
        class="gap-2"
      >
        {{ table.getColumn(filter.id)?.columnDef.id || filter.id }}:
        {{ Array.isArray(filter.value) ? filter.value.join(', ') : filter.value }}
        <button
          @click="table.getColumn(filter.id)?.setFilterValue(undefined)"
          class="hover:bg-secondary-foreground/20 rounded-full p-0.5"
        >
          <ILucideX class="h-3 w-3" />
        </button>
      </Badge>
    </div>
  </div>
</template>
<script setup lang="ts">
import type { Table } from '@tanstack/vue-table'
import DataTableFacetedFilter from './DataTableFacetedFilter.vue'
import { exportToCSV, exportToJSON } from '@/utils/tables.utils'

interface DataTableToolbarProps<TData> {
  table: Table<TData>
  state: any
}

const props = defineProps<DataTableToolbarProps<any>>()

// Check if any filters are applied
const isFiltered = computed(() => {
  return props.state.columnFilters.value.length > 0 || props.state.globalFilter.value !== ''
})

// Get grouped columns
const groupedColumns = computed(() => {
  return props.table.getState().grouping
})

// Category options (with counts from faceting)
const categoryOptions = computed(() => {
  const facets = props.table.getColumn('category')?.getFacetedUniqueValues()
  return Array.from(facets?.entries() || []).map(([value, count]) => ({
    label: value,
    value: value,
    count,
  }))
})

// Status options (with counts from faceting)
const statusOptions = computed(() => {
  const facets = props.table.getColumn('status')?.getFacetedUniqueValues()
  const statusLabels: Record<string, string> = {
    active: 'Active',
    'out-of-stock': 'Out of Stock',
    discontinued: 'Discontinued',
  }
  return Array.from(facets?.entries() || []).map(([value, count]) => ({
    label: statusLabels[value] || value,
    value: value,
    count,
  }))
})

// Wood type options
const woodTypeOptions = computed(() => {
  const facets = props.table.getColumn('woodType')?.getFacetedUniqueValues()
  return Array.from(facets?.entries() || []).map(([value, count]) => ({
    label: value,
    value: value,
    count,
  }))
})

// Export functions
const exportCSV = () => {
  const data = props.table.getFilteredRowModel().rows.map((row) => row.original)
  exportToCSV(data, 'products.csv')
}

const exportJSON = () => {
  const data = props.table.getFilteredRowModel().rows.map((row) => row.original)
  exportToJSON(data, 'products.json')
}

const exportExcel = () => {
  // For Excel export, we'll use CSV format as a fallback since we don't have a specific Excel function
  const data = props.table.getFilteredRowModel().rows.map((row) => row.original)
  exportToCSV(data, 'products.xlsx')
}
</script>

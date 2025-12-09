# 🚀 Quick Reference Guide

## Common Operations

### Accessing Table State

```typescript
// Get all selected rows
const selectedRows = table.getFilteredSelectedRowModel().rows.map(r => r.original)

// Get current page rows
const currentPageRows = table.getRowModel().rows

// Get filtered rows
const filteredRows = table.getFilteredRowModel().rows

// Get grouped rows
const groupedRows = table.getGroupedRowModel().rows

// Get pagination state
const { pageIndex, pageSize } = table.getState().pagination

// Get sorting state
const sorting = table.getState().sorting

// Get filter state
const filters = table.getState().columnFilters
const globalFilter = table.getState().globalFilter
```

### Modifying Table State

```typescript
// Clear all filters
table.resetColumnFilters()
table.setGlobalFilter('')

// Clear all sorting
table.resetSorting()

// Clear selection
table.resetRowSelection()

// Set page size
table.setPageSize(20)

// Go to page
table.setPageIndex(0)

// Toggle column visibility
table.getColumn('columnId')?.toggleVisibility()

// Pin column
table.getColumn('columnId')?.pin('left') // or 'right' or false

// Group by column
table.getColumn('columnId')?.toggleGrouping()
```

### Working with Rows

```typescript
// Select row
row.toggleSelected()

// Pin row
row.pin('top') // or 'bottom' or false

// Expand row
row.toggleExpanded()

// Get row data
const data = row.original

// Check if row is selected
const isSelected = row.getIsSelected()

// Check if row is grouped
const isGrouped = row.getIsGrouped()

// Get sub rows (for grouping)
const subRows = row.subRows
```

### Working with Columns

```typescript
// Get column
const column = table.getColumn('columnId')

// Sort column
column?.toggleSorting() // Toggle asc/desc
column?.toggleSorting(false) // Force asc
column?.toggleSorting(true) // Force desc

// Filter column
column?.setFilterValue('value')
column?.setFilterValue(['value1', 'value2']) // Multi-select

// Get faceted values (unique values with counts)
const facets = column?.getFacetedUniqueValues()

// Get min/max values
const [min, max] = column?.getFacetedMinMaxValues() || []

// Toggle visibility
column?.toggleVisibility()

// Pin column
column?.pin('left') // or 'right' or false

// Resize column
column?.getSize() // Current size
column?.resetSize() // Reset to default
```

### Programmatic Actions

```typescript
// Select all on current page
table.toggleAllPageRowsSelected()

// Select all rows
table.toggleAllRowsSelected()

// Get selection count
const count = table.getFilteredSelectedRowModel().rows.length

// Export selected rows
const selectedData = table.getFilteredSelectedRowModel().rows.map(r => r.original)
exportToCSV(selectedData, 'selected-items.csv')

// Reset everything
table.resetSorting()
table.resetColumnFilters()
table.resetGlobalFilter()
table.resetRowSelection()
table.resetColumnVisibility()
table.resetColumnOrder()
table.resetColumnSizing()
table.resetGrouping()
table.resetExpanded()
```

## Column Definition Cheat Sheet

```typescript
{
  // Basic
  id: 'uniqueId',
  accessorKey: 'dataProperty',
  header: 'Display Name',
  
  // Or dynamic header
  header: ({ column }) => h(DataTableColumnHeader, { column, title: 'Name' }),
  
  // Cell rendering
  cell: ({ row }) => row.getValue('columnId'),
  
  // Or custom cell
  cell: ({ row }) => h('div', { class: 'custom' }, row.original.value),
  
  // Features
  enableSorting: true,
  enableHiding: true,
  enableGrouping: true,
  enablePinning: true,
  enableColumnFilter: true,
  enableGlobalFilter: true,
  enableResizing: true,
  
  // Sizing
  size: 150,           // Default size
  minSize: 50,         // Minimum size
  maxSize: 500,        // Maximum size
  
  // Filtering
  filterFn: 'fuzzy',   // Filter function
  // Options: 'auto', 'includesString', 'includesStringSensitive',
  // 'equalsString', 'arrIncludes', 'arrIncludesAll', 'arrIncludesSome',
  // 'equals', 'weakEquals', 'inNumberRange', 'fuzzy'
  
  // Sorting
  sortingFn: 'alphanumeric', // Sort function
  // Options: 'auto', 'alphanumeric', 'alphanumericCaseSensitive',
  // 'text', 'textCaseSensitive', 'datetime', 'basic'
  
  // Grouping
  aggregationFn: 'sum', // Aggregation function
  // Options: 'sum', 'min', 'max', 'extent', 'mean', 'median',
  // 'unique', 'uniqueCount', 'count'
  
  // Custom render for grouped cell
  aggregatedCell: ({ getValue }) => `Total: ${getValue()}`,
  
  // Metadata (for custom features)
  meta: {
    filterVariant: 'select', // 'text', 'select', 'range'
    faceted: true,
    headerClass: 'text-center',
    cellClass: 'font-bold',
  },
}
```

## State Persistence

```typescript
// Save state to localStorage
const saveState = () => {
  const state = {
    sorting: table.getState().sorting,
    columnFilters: table.getState().columnFilters,
    columnVisibility: table.getState().columnVisibility,
    columnOrder: table.getState().columnOrder,
    columnPinning: table.getState().columnPinning,
    columnSizing: table.getState().columnSizing,
    pagination: table.getState().pagination,
  }
  localStorage.setItem('table-state', JSON.stringify(state))
}

// Load state from localStorage
const loadState = () => {
  const saved = localStorage.getItem('table-state')
  if (saved) {
    const state = JSON.parse(saved)
    table.setSorting(state.sorting)
    table.setColumnFilters(state.columnFilters)
    table.setColumnVisibility(state.columnVisibility)
    table.setColumnOrder(state.columnOrder)
    table.setColumnPinning(state.columnPinning)
    table.setColumnSizing(state.columnSizing)
    table.setPagination(state.pagination)
  }
}

// Auto-save on change
watch(
  () => table.getState(),
  () => saveState(),
  { deep: true }
)
```

## URL Sync

```typescript
// Sync filters to URL
watch(
  () => table.getState().columnFilters,
  (filters) => {
    const params = new URLSearchParams()
    filters.forEach(f => params.set(f.id, String(f.value)))
    router.push({ query: Object.fromEntries(params) })
  }
)

// Load filters from URL
onMounted(() => {
  const params = new URLSearchParams(window.location.search)
  const filters: ColumnFiltersState = []
  params.forEach((value, key) => {
    filters.push({ id: key, value })
  })
  table.setColumnFilters(filters)
})
```

## Server-Side Integration

```typescript
// Watch for state changes
watch(
  () => ({
    pagination: table.getState().pagination,
    sorting: table.getState().sorting,
    filters: table.getState().columnFilters,
  }),
  async (newState) => {
    loading.value = true
    
    try {
      const response = await fetchData({
        page: newState.pagination.pageIndex + 1,
        pageSize: newState.pagination.pageSize,
        sort: newState.sorting.map(s => ({
          field: s.id,
          order: s.desc ? 'desc' : 'asc',
        })),
        filters: newState.filters.map(f => ({
          field: f.id,
          value: f.value,
        })),
      })
      
      data.value = response.data
      // If server returns total count
      table.setPageCount(Math.ceil(response.total / newState.pagination.pageSize))
    } catch (error) {
      console.error('Failed to fetch data:', error)
    } finally {
      loading.value = false
    }
  },
  { deep: true }
)
```

## Custom Hooks

```typescript
// Custom selection hook
export const useTableSelection = <T>(table: any) => {
  const selectedRows = computed(() => 
    table.getFilteredSelectedRowModel().rows.map((r: any) => r.original as T)
  )
  
  const selectedCount = computed(() => selectedRows.value.length)
  
  const isAllSelected = computed(() => 
    table.getIsAllPageRowsSelected()
  )
  
  const clearSelection = () => table.resetRowSelection()
  
  return {
    selectedRows,
    selectedCount,
    isAllSelected,
    clearSelection,
  }
}

// Usage
const { selectedRows, selectedCount, clearSelection } = useTableSelection<Product>(table)
```

## Common Patterns

### Searchable Select Filter

```typescript
{
  accessorKey: 'category',
  header: ({ column }) => h(DataTableColumnHeader, { column, title: 'Category' }),
  cell: ({ row }) => row.getValue('category'),
  filterFn: (row, id, value) => value.includes(row.getValue(id)),
  meta: {
    filterVariant: 'select',
    faceted: true,
  },
}
```

### Range Filter

```typescript
{
  accessorKey: 'price',
  header: ({ column }) => h(DataTableColumnHeader, { column, title: 'Price' }),
  cell: ({ row }) => formatCurrency(row.getValue('price')),
  filterFn: 'inNumberRange',
  meta: {
    filterVariant: 'range',
  },
}
```

### Multi-Select Filter with Icons

```typescript
{
  accessorKey: 'status',
  header: ({ column }) => h(DataTableColumnHeader, { column, title: 'Status' }),
  cell: ({ row }) => {
    const status = row.getValue('status')
    return h(Badge, { variant: statusVariant[status] }, () => status)
  },
  filterFn: (row, id, value) => value.includes(row.getValue(id)),
  meta: {
    filterVariant: 'select',
    faceted: true,
    options: [
      { value: 'active', label: 'Active', icon: ILucideCheckCircle },
      { value: 'inactive', label: 'Inactive', icon: ILucideXCircle },
    ],
  },
}
```

### Expandable Rows

```typescript
{
  id: 'expander',
  header: () => null,
  cell: ({ row }) => {
    return row.getCanExpand() ? (
      h(Button, {
        variant: 'ghost',
        size: 'sm',
        onClick: () => row.toggleExpanded(),
      }, () => h(row.getIsExpanded() ? ILucideChevronDown : ILucideChevronRight))
    ) : null
  },
}
```

## Performance Tips

1. **Memoize expensive computations**
   ```typescript
   const expensiveData = computed(() => {
     return data.value.map(item => ({
       ...item,
       calculated: expensiveCalculation(item)
     }))
   })
   ```

2. **Use virtualization for large datasets**
   ```typescript
   import { useVirtualizer } from '@tanstack/vue-virtual'
   ```

3. **Debounce search inputs**
   ```typescript
   const debouncedSearch = debounce((value) => {
     table.setGlobalFilter(value)
   }, 300)
   ```

4. **Lazy load images**
   ```vue
   <img :src="url" loading="lazy" />
   ```

5. **Use shallow refs for large arrays**
   ```typescript
   const data = shallowRef<Product[]>([])
   ```
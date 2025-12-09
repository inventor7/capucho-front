// config/table.config.ts
/**
 * Global table configuration
 * Enable/disable features based on your needs
 */
export const tableConfig = {
  features: {
    // Core features
    sorting: true,
    filtering: true,
    pagination: true,
    selection: true,

    // Advanced features
    aggregating: true, // Enable aggregation functionality
    columnOrdering: true,
    columnPinning: true,
    columnSizing: true,
    columnVisibility: true,
    columnFiltering: true,
    globalFiltering: true,
    fuzzyFiltering: true,
    columnFaceting: true,
    globalFaceting: true,
    grouping: true,
    expanding: true,
    rowPinning: true,
    virtualization: true, // Enable for large datasets (10k+ rows)

    // UI features
    bulkActions: true,
    columnReorder: true,
    resizableColumns: true,
    stickyHeader: true,
    zebra: true, // Zebra striping
    density: true, // Table density (compact, normal, comfortable)
  },

  defaults: {
    pageSize: 10,
    pageSizeOptions: [10, 20, 30, 40, 50, 100, 200],
    density: 'normal' as 'compact' | 'normal' | 'comfortable',
    enableMultiSort: true,
    enableSortingRemoval: true,
    manualPagination: false, // Set to true for server-side pagination
    manualSorting: false, // Set to true for server-side sorting
    manualFiltering: false, // Set to true for server-side filtering
  },

  // Fuzzy filter config
  fuzzyFilter: {
    threshold: 0.3, // Lower = stricter matching
  },

  // Aggregation settings
  aggregation: {
    enable: true,
    defaultFunction: 'sum', // Default aggregation function for numeric columns
    allowedFunctions: ['sum', 'min', 'max', 'mean', 'count', 'unique', 'uniqueCount', 'original'],
  },

  // Virtualization settings
  virtualization: {
    enabled: false,
    overscan: 10, // Number of items to render outside visible area
    itemSize: 56, // Default item size for estimation
  },
}

export type TableConfig = typeof tableConfig
